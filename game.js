
console.log("game js connected");



const wordList = [
  "duck", "dog", "cockatoo", "kangaroo", "parrot", "shetland pony", "hamster", "swan", "rabbit",
  "goose", "mouse", "rain worm", "worm", "alpaca", "leopard", "lioness", "squirrel", "guinea pig",
  "elephant", "giraffe", "rhinoceros", "hippopotamus", "penguin", "cow", "polar bear", "chicken",
  "camel", "caribou", "chameleon", "chimpanzee", "caterpillar", "butterfly", "chinchilla",
  "crocodile", "crane", "crab", "coyote", "deer", "dolphin", "sperm whale", "dragonfly",
  "eagle", "reindeer", "eland", "falcon", "ferret", "frog", "goldfinch", "goose", "grasshopper",
  "grouse", "hawk", "hedgehog", "herring", "hummingbird", "hyena", "impala", "jaguar", "jellyfish",
  "komodo dragon", "kudu", "lemur", "locust", "lobster", "magpie", "mammoth", "mandrill", "monkey",
  "mongoose", "mosquito", "narwhal", "nightingale", "opossum", "otter", "ostrich", "oyster",
  "panther"
  ];
var numWords = wordList.length;
var digit, numLetters;
var wrds, wrd, typeFld;
var scoreFld = "";
var looseLetters;
var i, score, t;
var timed;
var score = 0;
var countDown_start = 30;
var countDown = countDown_start;

function init() {
  document.querySelector("#myBtn").disabled = false;
}

function selectWord() {
  digit = Math.floor(Math.random() * numWords);
  document.querySelector("#typeField").innerHTML = "";
  i = 0;
}

function startGame() {
  selectWord();
  document.querySelector("#scoreField").innerHTML = "";
  document.querySelector("#timer").innerHTML = "";
  showWord();
  document.querySelector("#myBtn").disabled = true;
  startTime();
  score = 0;
  countDown = countDown_start;
}

function startTime() {
  var timed = document.querySelector("#timer");
  var t = setInterval(function() {
    timed.innerHTML = "<br>" + countDown + " s";
    countDown -= 1;
    if (countDown < 0) {
      timed.innerHTML = "<br>STOP TYPING!";
      endGame();
      clearInterval(t);
    }
  }, 1000);
}

function showWord() {
  wrds = document.querySelector("#words");
  wrd = wordList[digit].toUpperCase();
  looseLetters = wrd.split("");
  numLetters = looseLetters.length;
  wrds.innerHTML = wrd;
  document.addEventListener("keyup", processKey);
}

function processKey(evt) {
  var typeLetter = evt.key.toUpperCase();
  checkWord(typeLetter);
}

function checkWord(tLet) {
  typeFld = document.querySelector("#typeField");
  scoreFld = document.querySelector("#scoreField");
  if (tLet === looseLetters[i]) {
    typeFld.innerHTML += tLet;
    i += 1;
  }
  if (i === numLetters && tLet === "ENTER") {
    score += 1;
    if (score === 1) {
      scoreFld.innerHTML =
        "You typed <span>&nbsp;" + score + "&nbsp;</span> word sofar!";
    } else {
      scoreFld.innerHTML =
        "You typed <span>&nbsp;" + score + "&nbsp;</span> words sofar!";
    }
    selectWord();
    showWord();
  }
}

function endGame() {
  document.removeEventListener("keyup", processKey);
  document.querySelector("#scoreField").innerHTML =
    "Your final score is: <span>&nbsp;" +
    score +
    "&nbsp;</span> words in " +
    countDown_start +
    " seconds !!";
  document.querySelector("#myBtn").innerText = "Start again";
  init();
}
