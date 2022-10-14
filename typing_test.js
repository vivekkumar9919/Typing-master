




//Random Quotes Api URL
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
let accuracy=0;

//Display random quotes
const renderNewQuote = async () => {
    //Fetch 
    const response = await fetch(quoteApiUrl);

    //Store
    let data = await response.json();


    quote = data.content;

    //Array of characters in the quote
    let arr = quote.split("").map((value) => {
        //wrap the characters in a span tag
        return "<span class='quote-chars'>" + value + "</span>";
    });
    //join array for displaying
    quoteSection.innerHTML += arr.join("");
};

//Logic for comparing input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    //Create an array from received span tags
    quoteChars = Array.from(quoteChars);

    //array of user input characters
    let userInputChars = userInput.value.split("");

    //loop through each character in quote
    quoteChars.forEach((char, index) => {
       
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        //If user hasn't entered anything or backspaced
        else if (userInputChars[index] == null) {
     
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        //If user enter wrong character
        else {
           
            if (!char.classList.contains("fail")) {
                
                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
        //Returns true if all the characters are entered correctly
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
        //End test if all characters are correct
        if (check) {
            displayResult();
        }
    });
});

//Update Timer on screen
function updateTimer() {
    if (time == 0) {
     
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

//Sets timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

//End Test
const displayResult = () => {

    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText =
        (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
        accuracy = Math.round(
            ((userInput.value.length - mistakes) / userInput.value.length) * 100
            ) ;
            document.getElementById("accuracy").innerText =accuracy + " %";
            console.log(accuracy);

            if(accuracy>50) {
                congru();
            }
            else {
                sorry();
            }
};

const sorry=()=>{
    document.getElementById('level1').style.display='none';
    document.getElementById('status').innerText="Sorry !";
    document.getElementById('status').style.color="red"
    document.getElementById('textBelow').innerText="OOPS! You can not clear Level1"
}

const congru=()=>{
    document.getElementById('status').innerText="Congratulations!";
    document.getElementById('level1').style.display='none';
    document.getElementById('status').style.color="Green";
    document.getElementById('gotolevel2').style.display='block'
    document.getElementById('textBelow').innerText="Amazing ! Level UP"
}

//Start Test
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};