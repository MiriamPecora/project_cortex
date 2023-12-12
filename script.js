const colorNames = ["Rosso", "Blu", "Verde", "Giallo", "Nero", "Rosa"];
const correctWords = [
  { word: "Rosso", style: "color: red;" },
  { word: "Blu", style: "color: blue;" },
  { word: "Verde", style: "color: green;" },
  { word: "Giallo", style: "color: yellow;" },
  { word: "Nero", style: "color: black;" },
  { word: "Rosa", style: "color: pink;" },
];

let selectedColorNames = [];
const selectedCorrectWord = correctWords[Math.floor(Math.random() * correctWords.length)];

let randomColorsWithStyle = [];
let isArrayValid;
do {
  randomColorsWithStyle = [];

  do {
    shuffleArray(colorNames);
    selectedColorNames = colorNames.slice(0, 5);
  } while (selectedColorNames.includes(selectedCorrectWord.word));

  console.log(selectedColorNames, "colori selezionati");
  isArrayValid = selectedColorNames.every(function(colorName, index) {
    randomColorsWithStyle.push({ word: colorName, style: correctWords[index].style },);

    if(randomColorsWithStyle[index].word == correctWords[index].word){
      return false;
    }else{
      return true;
    }
  });

} while (!isArrayValid);


let isTimerOn = false;
function startGame(){
  if(!document.getElementById("startBtn").hidden){
    document.getElementById("startBtn").hidden = true;
  }

  let wordsContainer = document.getElementById("words_container");

  if(isPlayerDefeated()){
    return;
  }

  wordsContainer.innerHTML = "";

  if(randomColorsWithStyle.length < 6){
    randomColorsWithStyle.push(selectedCorrectWord);
  }

  drawColorsInHtml();

  if(!isTimerOn){
    startTimer();
  }
  
  isTimerOn = true;
}

function isPlayerDefeated(){
  if(+document.getElementById("score").textContent == -3){
    document.getElementById("startBtn").hidden = false;
    document.getElementById("words_container").innerHTML = "";
    document.getElementById("score").textContent = 0;
    document.getElementById("timer").textContent = 5;
    isTimerOn = false;
    return true;
  }else{
    return false;
  }
}

function drawColorsInHtml(){
  document.getElementById("words_container").innerHTML = "";

  shuffleArray(randomColorsWithStyle);

  randomColorsWithStyle.forEach((color, index) => {
    document.getElementById("words_container").innerHTML +=
    `<button class="colorName" onclick="selectColor(${index})" style="`+ color.style + `;">` + color.word + `</button>`;
  });
}

function selectColor(index){
  let selectedColor = randomColorsWithStyle[index];

  let scoreSpan = document.getElementById("score");
  let oldScore = scoreSpan.textContent;
  let newScore;

  if(selectedColor.word == selectedCorrectWord.word){
    newScore = +oldScore + 1;
  }else{
    newScore = +oldScore - 1;
  }

  scoreSpan.textContent = newScore;
  document.getElementById("timer").textContent = 5;

  drawColorsInHtml();
}

function startTimer() {
  let timer = document.getElementById("timer");
  let oldTime = timer.textContent;

  function updateTimer() {
    setTimeout(() => {
      oldTime = timer.textContent;
  
      if (+oldTime > 0) {
        if(isPlayerDefeated()){
          console.log("check ogni secondo");
          return;
        };
        timer.textContent = +oldTime - 1;
        console.log(oldTime, "old time");
        updateTimer(); // Chiamata ricorsiva per continuare l'aggiornamento
      } else {
        // Il timer è scaduto, diminuisci il punteggio di 1
        if(isPlayerDefeated()){
          console.log("return");
          return;
        };
        console.log("timer");
        decreaseScoreByOne();
        timer.textContent = 5;
        drawColorsInHtml();
        updateTimer();
      }
    }, 1000);
  }

  console.log("prima della chiamata del timer");
  updateTimer(); // Avvia il processo di aggiornamento
}

function decreaseScoreByOne() {
  let scoreSpan = document.getElementById("score");
  let oldScore = scoreSpan.textContent;
  let newScore = +oldScore - 1;
  scoreSpan.textContent = newScore;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
