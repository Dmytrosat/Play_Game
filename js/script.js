// Play game
// Press the "start" button, the game starts, the task is generated
// The user can enter the answer, the "check" button should appear
// By clicking the "check" button, we compare the user's input with the answer
// Output the results and the correct value by replacing the button with "start again".

const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0);
    return randomNum;
}

const getTask = () => {
    const symbol = (Math.random() > 0.5) ? "+" : "-";
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`;
    gameState.rightAnswer = eval(task);
    return task;
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess;
}

const gameElements = document.getElementById("my_game").children;
const title = gameElements[0];
const userTask = gameElements[1];
const userAnswer = gameElements[2];
const btnGame = gameElements[3];

const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}

const startGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = "Game started!"
        userAnswer.value = null;
        userTask.innerText = getTask();
        userAnswer.hidden = false;
    } else {
        const isRight = gameState.rightAnswer == userAnswer.value;
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer;
        title.innerText = "You" + ((isRight) ? " won!" : " lost!");
    }
    toggleGameState()
    btnGame.innerText = (gameState.taskInProcess) ? "Audit!" : "Start over!";
}

btnGame.addEventListener("click", startGameFunc);
userAnswer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        startGameFunc();
    } else if (e.key === "Escape") {
        userAnswer.blur();
    }
});

const choosedEl = document.querySelectorAll(".choosed_block-container > div");
const counterE1 = document.querySelector(".choosed_block span")

const choosedState = {
    countElements: 0,
    setCountValue(value) {
        this.countElements += value;
        counterE1.innerText = this.countElements
    }
}

const eventFunc = (e) => {
    if (e.target.className === "") {
        e.target.className = "choosed_element";
        choosedState.setCountValue(1);
    } else {
        e.target.className = "";
        choosedState.setCountValue(-1);
    }
}


for (let i = 0; i < choosedEl.length; i++) {
    choosedEl[i].addEventListener("click", eventFunc)
}

const postBlock = document.querySelector(".posts_block-container");
const showPostsBTN = document.querySelector(".posts_block button");

const func = () => 5;


function addPost(title, body) {
    const postTitle = document.createElement("h3");
    const postBody = document.createElement("span");
    const postItem = document.createElement("p");

    postTitle.innerText = title;
    postBody.innerText = body;

    postItem.append(postTitle, postBody);
    postBlock.append(postItem);
}

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            for (el of data) {
                addPost(el.title, el.body)
            }
        })
        .catch(err => console.log(err.message))
}
getPosts()