// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!
// 랜덤번호가 > 유저번호 Up!
// Reset버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.

const $gamePlay = document.querySelector("#game-play");
const $userInput = document.querySelector("#user-input");
const $answer = document.querySelector("#answer");
const $resetButton = document.querySelector("#reset-button");
const $countDown = document.querySelector("#count-down");
const $view = document.querySelector("#header > .header-image >#view");

let randomNumber = 0;
let count = parseInt(prompt("몇번의 기회를 주고 싶니?")) || 3;
let gameOver = false;
let userValueArray = [];
let footerComment = [
  "술",
  " ",
  "이",
  " ",
  "들",
  " ",
  "어",
  " ",
  "간",
  " ",
  "다",
  " ",
  "쭈",
  " ",
  "욱",
  " ",
  "쭉",
  " ",
  "~",
  " ",
  "~",
];
let footerIndex = 0;
setInterval(function () {
  document.querySelector("#comment").innerHTML += footerComment[footerIndex];
  footerIndex++;
  document.querySelector("#comment").style.fontStyle = "italic";
  document.querySelector("#comment").style.fontSize = "1.5rem";
  document.querySelector("#comment").style.color = "lightcoral";
  if (footerIndex >= footerComment.length + 1) {
    document.querySelector("#comment").innerHTML = "";
    footerIndex = 0;
  }
}, 200);

$gamePlay.addEventListener("click", gameplay);
$resetButton.addEventListener("click", reset);
$userInput.addEventListener("focus", () => {
  $userInput.value = "";
});

function computerQuiz() {
  randomNumber = Math.floor(Math.random() * 100) + 1; // 1부터 100까지 랜덤의 수
  $countDown.textContent = `정답 남은 횟수: ${count}`;
  console.log(randomNumber);
}
function answerView(message) {
  $answer.textContent = `정답은 : ${message}`;
}
function changeImage(number) {
  $view.style.backgroundImage = `url("img/image${number}.jpg")`;
}
function gameplay() {
  if (gameOver) return;
  let userValue = parseInt($userInput.value);
  if ($userInput.value === "" || Number.isNaN(userValue)) {
    answerView("숫자 입력하셈!");
    return;
  }
  if (userValue > 100 || userValue < 1) {
    answerView("1과 100 사이에 있다~ 조심해!");
    return;
  }
  if (userValueArray.includes(userValue)) {
    answerView("했던거 또 하는거 아니야~");
    return;
  }

  count--;
  $countDown.textContent = `정답 남은 횟수: ${count}`;
  if (userValue > randomNumber) {
    // 유저의 점수가 랜덤숫자보다 클 때
    changeImage(2);
    answerView("숫자Down!");
  } else if (userValue < randomNumber) {
    // 유저의 점수가 랜덤숫자보다 작을 때
    changeImage(1);
    answerView("숫자Up!");
  } else if (userValue === randomNumber) {
    // 정답일 때
    changeImage(3);
    answerView("너 운좋다~~!");
    $gamePlay.disabled = true;
  }
  userValueArray.push(userValue);
  if (count < 1) {
    changeImage(4);
    $answer.innerHTML = "Game Over";
    gameOver = true;
  }
  if (gameOver) {
    $gamePlay.disabled = true;
  }
}
function reset() {
  let input = prompt("몇번의 기회를 주고 싶니?");
  count = input === null ? 3 : parseInt(input) || 3;
  changeImage(0);
  $countDown.textContent = `정답 남은 횟수: ${count}`;
  userValueArray = [];
  answerView("");
  $userInput.value = "";
  $gamePlay.disabled = false;
  computerQuiz();
  gameOver = false;
}
computerQuiz(); // 게임 랜덤숫자 형성 함수. 이벤트함수 이전에 먼저 실행된다.
