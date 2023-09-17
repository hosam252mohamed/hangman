let letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters-container");
lettersArray.forEach((letter, i) => {
  let span = document.createElement("span");
  span.innerHTML = letter;
  span.className = "letter";
  lettersContainer.appendChild(span);
});

let categories = {
  people: [
    "Noah",
    "Daniel",
    "Oscar",
    "Amelia",
    "Benjamin",
    "Samuel",
    "Albert",
    "Andrew",
  ],
  countries: [
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegowina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
  ],
  food: [
    "Chicken",
    "Bread",
    "Cheese",
    "Pasta",
    "Pizza",
    "Meat",
    "Apple",
    "Pancakes",
  ],
};

let ourCat = Object.keys(categories);
let randomCat = Math.floor(Math.random() * ourCat.length);

let randomCatChosen = ourCat[randomCat];
document.querySelector(".category span").innerHTML = randomCatChosen;

let catItems = categories[randomCatChosen];
let catItemRand = Math.floor(Math.random() * catItems.length);
let catItemValue = catItems[catItemRand].toUpperCase();
let catItemValueArr = Array.from(catItemValue);

let guessWord = document.querySelector(".guess-word-container");

catItemValueArr.forEach((char) => {
  let span = document.createElement("span");
  if (char === " ") {
    span.innerHTML = "-";
    span.className = "white-space";
  }
  guessWord.appendChild(span);
});

guessWordSpans = document.querySelectorAll(".guess-word-container span");
let wrongAttempts = 1;
let rightLetters = 0;

lettersContainer.addEventListener("click", (e) => {
  let status = false;
  if (e.target.className === "letter") {
    e.target.classList.add("clicked");
    catItemValueArr.forEach((letter, chosenIndex) => {
      if (e.target.innerHTML === letter) {
        guessWordSpans.forEach((span, index) => {
          if (chosenIndex === index) {
            span.innerHTML = letter;
            rightLetters++;
          }
        });
        status = true;
        document.querySelector(".correct-sound").play();
        if (rightLetters === catItemValueArr.length) {
          setTimeout(() => {
            winGame();
          }, 500);
        }
      }
    });
    if (status === false) {
      document.querySelector(".wrong-sound").play();
      document.querySelector(".draw").classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts === 8) {
        lettersContainer.classList.add("no-more");
        setTimeout(() => {
          endGame();
        }, 500);
      }
      wrongAttempts++;
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  div.className = "end";
  let span = document.createElement("span");
  span.innerHTML = "Game Over";
  div.append(span);
  document.body.append(div);
  document.querySelector(".lose-sound").play();
}

function winGame() {
  let div = document.createElement("div");
  div.className = "win";
  let span = document.createElement("span");
  span.innerHTML = "Gongrats! You Survived";
  div.append(span);
  document.body.append(div);
  document.querySelector(".win-sound").play();
}
