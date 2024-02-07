"use strict";
let score = 20;
let highScore = 0;
// create the random number
let secret = Math.trunc(Math.random() * 20) + 1;
const displayMsg = document.querySelector(".message");
const displayScore = document.querySelector(".score");
const displayHScore = document.querySelector(".highscore");
const userNumber = document.querySelector(".number");
let successAudio = new Audio("./succ.mp3");
let losingAudio = new Audio("./loseSound.mp3")
let winner = document.querySelector(".winner");
//make messages changes when trying enter un valid number 
let msgs = ["ادخل رقم بين 1 الى 20 فقط .. متتعبنيش معاك","ما قولنا ام 1 ل 20 يخى","حرام عليك اموت نفسى يمكن ترتاح قولت زفت 1 ل 20 بس"]
let random = Math.ceil(Math.random() * msgs.length) - 1;

// check the stored high score if it exit in local storage and assign it to highscore
let storedHScore = Number(localStorage.getItem("highscore"));
storedHScore ? (highScore = storedHScore) : highScore;
displayHScore.textContent = highScore;
// checking function
function checking() {
  const guess = Number(document.querySelector(".guess").value);
  if (guess < 1 || guess > 20 || guess == '') {
    displayMsg.textContent = msgs[random];
    random = Math.ceil(Math.random() * msgs.length) - 1 ;
  } else if (!(score <= 0)) {
    // when user win
    if (guess === secret) {
      successAudio.play();
      winner.classList.remove("hidden")
      document.body.style.backgroundColor = "green";
      userNumber.style.width = "30rem";
      displayMsg.textContent = "كسبت  مبروووك";
      userNumber.textContent = secret;
      score * 10 > highScore ? (highScore = score * 10) : highScore;
      localStorage.setItem("highscore", String(highScore));
      displayHScore.textContent = highScore;
    }
    // when user high
    else if (guess > secret) {
      score--;
      displayScore.textContent = score;

      displayMsg.textContent = "قربت بس اقل من كده شوية";
    }
    // when user low
    else if (guess < secret) {
      score--;
      displayScore.textContent = score;
      displayMsg.textContent = "قربت بس اعلى من كده شوية";
    }
  }
  // lose game
  else {
    document.body.style.backgroundColor = "red";
    userNumber.textContent = secret;
    displayMsg.textContent = "للاسف خسرت .. اضغط على زرار اللعب مرة اخرى";
    userNumber.style.width = "30rem";
    losingAudio.play();
  }
}
// reset function
function resetData() {
  secret = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayScore.textContent = score;
  userNumber.textContent = "?";
  document.body.style.backgroundColor = "#222";
  document.querySelector(".guess").value = "";
  displayMsg.textContent = "ابدا تخمين";
  userNumber.style.width = "15rem";
  winner.classList.add("hidden");
successAudio.pause();
losingAudio.pause();

}
// check btn
document.querySelector(".check").addEventListener("click", function(){checking()});

// again btn
document.querySelector(".again").addEventListener("click",function(){resetData()});
