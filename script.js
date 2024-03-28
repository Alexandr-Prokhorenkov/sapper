import { getRandomBombs } from "./components/random.js";

const BOMBS = { //делаем объект с количеством бомб выставляемых в зависимости от size
  6: 8,
  10: 20,
  12: 40
}
let size;
const button = document.querySelector(".btn");
const select = document.querySelector("#select");
const element = document.querySelector('#elem');

const createCell = (num) => {
  const td = document.createElement("td");
  const content = document.createElement('span');
  const cover = document.createElement('div');
  content.innerText = num === -1 ? '💣' : num !== 0 ? num : '';
  if(content.textContent=== '💣') {
    td.classList.add('bomb')
  }
  if(content.textContent==1) {
    content.classList.add('bomb-count-1')
  }
  if(content.textContent==2) {
    content.classList.add('bomb-count-2')
  }
  if(content.textContent==3) {
    content.classList.add('bomb-count-3')
  }
  if(content.textContent>=4) {
    content.classList.add('bomb-count-4')
  }

  content.classList.add('shadow')
  cover.classList.add('cover');
  cover.appendChild(content);
  td.appendChild(cover);
  td.classList.add("grey", "cell");
  let flag = true
  td.addEventListener('contextmenu', function(event){
    event.preventDefault()
    if(flag===true) {
      td.innerHTML = '🚩'
      flag = false
    }
    else {
      td.innerHTML = '';
        flag = true;
    }
    })

  td.addEventListener('click', function(){
    if(td.classList.contains('bomb')) {
      alert('GAME OVER')
    const tdAll = document.querySelectorAll('td')
    tdAll.forEach((elem) =>{
      elem.classList.remove('cell')
    })
    const spanAll = document.querySelectorAll('span')
    spanAll.forEach((elem) =>{
      elem.classList.remove('shadow')
    })

    }
    td.classList.remove('cell')
    content.classList.remove('shadow')
  })
  return td
}

const createTable = (field, size) => {
  const table = document.createElement("table");
  let tr;
  for(let i = 0; i < field.length; i++) {
    if(i % size === 0) {
      if(tr) table.appendChild(tr);
      tr = document.createElement("tr");
      tr.appendChild(createCell(field[i]))
      table.appendChild(tr);
      continue;
    } 
    tr.appendChild(createCell(field[i]));
  }
  return table
}

select.addEventListener("change", function () {
  size = Number(this.value);
});

const getField = (bombsIndex, size) => { //создаем функцию по формированию поля
  const result = new Array(size**2).fill(0);  //создаем массив с полем заполняем его 0

  bombsIndex.forEach((v, _) => result[v] = -1 ); // формируем массив result из set'a *?????

  for(let i = 0; i < result.length; i++) { //проходися циклом по массиву result
    if(!bombsIndex.has(i)) continue; //если мы не натыкаемся на бомбу продолжаем
    const isRight = (i + 1) % size === 0; //тут понятно делим число само на себя либо на себя*2 итд
    const isLeft = i % size === 0; //тут по сути тоже самое мы делим либо 0 / size либо size/size Либо size*2/size итд но сама форма записи непонятна
    const isTop = i - size < 0; // тут ясненько
    const isButtom = i + size >= result.length; //тут все понятно непонятно зачем + перед i
    if(!isLeft && result[i - 1] !== -1) { //тут непонятно мы пишем что если мы не слева и ячейка с права без бомбы мы увеличиваем левое значение на единицу ???
      result[i - 1]++
    }
    if(!isRight && result[i + 1] !== -1) {
      result[i + 1]++
    }
    if(!isTop) {
      const index = i - size //вот тут непонимаю если мы вверху и проверяем нижние элементы то они будут i + size
      if(result[index] !== -1) result[index]++;
      if(!isRight && result[index + 1] !==-1) result[index + 1]++;
      if(!isLeft && result[index - 1] !== -1) result[index - 1]++;
    }
    if(!isButtom) {
      const index = i + size; //а тут соотвественно i - size 
      if(result[index] !== -1) result[index]++;
      if(!isRight && result[index + 1] !== -1) result[index + 1]++;
      if(!isLeft && result[index -1 ] !== -1) result[index - 1]++;
    }
  }

  return result;
}

button.addEventListener("click", function () {
  const existingTable = document.querySelector('table');
  if(existingTable) {
    existingTable.remove()
  }
    const bombsIndex = getRandomBombs(1, size**2, BOMBS[size]);
    const field = getField(bombsIndex, size);
    let table = createTable(field, size)
    element.appendChild(table)
}
);


// setFlag(isFlagged) {
//   this.isFlagged = isFlagged;
//   this.boxElem.innerHTML = isFlagged ? "🚩" : "";
// }


// this.boxElem.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
//   this.setFlag(true);
// });