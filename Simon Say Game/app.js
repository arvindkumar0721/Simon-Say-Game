let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;

let h2 = document.querySelector("h2");
let btns = ["red", "purple", "green", "yellow"];

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 300);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log(gameSeq);

    gameFlash(randomBtn);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnClick);
}

function btnClick() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.id;
    userSeq.push(userColor);

    console.log(userSeq);

    checkAnswer();
}

function checkAnswer() {
    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        console.log("success");

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
            userSeq = [];
        }
    } else {
        h2.innerHTML = `Game Over, Your Score: <b>${level}</b> <br> Press Any Key to Restart`;
        console.log("wrong");

        let body = document.querySelector("body");
        body.style.backgroundColor = "red";

        setTimeout(function () {
            body.style.backgroundColor = "#5ddedeff";
        }, 300);

        reset();
    }
}

function reset() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}
