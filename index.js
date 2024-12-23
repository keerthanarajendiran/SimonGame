window.onload = function () {
  document.getElementsByClassName("parent-container")[0].addEventListener('click', (e) => { handleClick(e) })
}

// Initialize variables
let colorsArr = ["green", "red", "yellow", "blue"];
let nextColor = "";
let colorOrderCount = 0;
let orderArr = [];
let levelCount = 0;
let isGameFinished = false;

//reset variables
const resetVariables = () => {
  nextColor = "";
  colorOrderCount = 0;
  orderArr = [];
  isGameFinished = true;
  levelCount = 0;
}

// update title
const updateTitleText = (text) => {
  document.getElementById("title-text").textContent = text;
}

//add color effects
const addEffect = (ele, className, timer1, timer2) => {
  setTimeout(() => {
    ele.classList.add(className);
  }, timer1)

  setTimeout(() => {
    ele.classList.remove(className);
  }, timer2);
}

//Fetch Next Random Color
const fecthNextRandomColor = (currentColorVal) => {
  let flag = true;
  while (flag) {
    random = Math.floor(Math.random() * (colorsArr.length - 1 - 0 + 1)) + 0;
    if (currentColorVal != colorsArr[random]) {
      flag = false;
    }
  }
  return colorsArr[random];
};


// Game Finished
const gameFinished = () => {
  resetVariables();
  addEffect(document.getElementsByTagName("body")[0], "body-color", 0, 100);
  updateTitleText("Game Over, Press Any Key to Restart");
};


const handleClick = (e) => {
  // Fetch target element id
  let color_id = e.target.id;

  //check if level 1
  if (orderArr.length == 0) {
    orderArr.push(color_id);
    nextColor = orderArr[colorOrderCount];
    levelCount++;
    updateTitleText(`Level ${levelCount}`);
    if (isGameFinished) {
      isGameFinished = false;
    }
  } else {
    if (nextColor == color_id) {
      colorOrderCount++;
      if (colorOrderCount == orderArr.length) {
        levelCount++;
        colorOrderCount = 0;
        let newColor = fecthNextRandomColor(color_id);

        addEffect(document.getElementById(newColor), "pop", 300, 800);

        orderArr.push(newColor);

        updateTitleText(`Level ${levelCount}`);
      }
      nextColor = orderArr[colorOrderCount];
    } else {
      gameFinished();
    }
  }
}
