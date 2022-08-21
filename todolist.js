const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
// 쿼리셀렉터 : html에서 필요한 것들을 얻는다.

const TODOS_LS = "toDos";

let toDos = []; //처음엔 빈칸 목록 추가할때마다 array에 저장되도록

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode; //li의 부모 찾는 메서드
  toDoList.removeChild(li); //그러나 새로고침하면 다시 나타남
  //filter: array의 모든 아이템을 통해 함수를 실행하고, true인 아이템들만 가지고 새로운 array를 만들어줌.
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); //string into number
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  //toDos를 가져와서 로컬에 저장하는 역할 펑션
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  // 입력할때마다 한줄씩 생김
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1; //li에 id부여, 나중에 삭제할때 지정가능하게

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);

  span.innerText = text; //파라미터, submit function에서 옴
  li.appendChild(delBtn);
  li.appendChild(span); //부모 노드에 자식 노드를 1개만 추가하는 메서드
  li.id = newId; //li에 id부여, 나중에 삭제할때 지정가능하게
  toDoList.appendChild(li);

  //2번째영상 시작 투두리스트를 array에 저장
  const toDoObj = {
    text: text,
    id: newId, //li에 id부여, 나중에 삭제할 때 지정가능하게
  }; //local storage에 저장하기 위함임
  toDos.push(toDoObj);
  saveToDos(); //push한 후에 로컬에서 호출할것
  //자바스크립트는 localstorage에 있는 모든 데이터를 string으로 저장하려고 하기 때문에, object(호출값)를 string이 되도록 해줘야 저장할 수 있다.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  //   엔터눌렀을 때 투두 생성 삭제 가능하도록 보여지게
  toDoInput.value = "";
}

//toDos를 가져온 뒤 parse통해서 object로 변환해서 자바스크립트가 활용할 수 있게 하고, 이전에 만든 함수paintToDo를 통해 화면에 보여지도록 함.
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos); //로컬저장위해 string으로 바꾼것을 후에 자바스크립트가 활용하도록 object로 다시 바꿈
    parseToDos.forEach(function someting(toDo) {
      //array에 담긴 것들 각각 한번씩 함수를 실행시켜주는 메서드
      paintToDo(toDo.text);
    });
  }
}

//init 사용 이유? 가독성, 전역객체를 보호
function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}

init();

//3번째 영상
//1.local storage에서 todos의 li지우기 (delbtn) 후에 지운 내용 저장. 2.최종적으로 html에서도 내용 삭제

//filter와 forEach의 쓰임새를 잘 알자!
//list에 있는 모든 item을 위한 함수를 실행시키
