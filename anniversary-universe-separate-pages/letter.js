const pieces = document.querySelectorAll(".puzzle-piece");

const puzzleBoard =
  document.getElementById("puzzleBoard");

const completeHeart =
  document.getElementById("completeHeart");

const hiddenLetter =
  document.getElementById("hiddenLetter");

const puzzleStatus =
  document.getElementById("puzzleStatus");

const puzzleHint =
  document.getElementById("puzzleHint");

const backButton =
  document.getElementById("backButton");


let completedPieces = 0;
let opened = false;


/* =========================
   CLICK PUZZLE PIECE
========================= */

pieces.forEach((piece) => {

  piece.addEventListener("click", () => {

    if (
      piece.classList.contains("completed") ||
      opened
    ) {
      return;
    }

    piece.classList.add("completed");

    completedPieces++;

    createSpark(piece);

    if (completedPieces < 4) {

      puzzleStatus.textContent =
        `เจอแล้ว ${completedPieces}/4 ชิ้น ♡`;

    }

    if (completedPieces === 4) {

      completePuzzle();

    }

  });

});


/* =========================
   COMPLETE PUZZLE
========================= */

function completePuzzle() {

  opened = true;

  puzzleHint.classList.add("hide");

  puzzleStatus.textContent =
    "หัวใจของเรากลับมาครบแล้ว ♡";


  setTimeout(() => {

    completeHeart.classList.add("show");

  }, 250);


  setTimeout(() => {

    completeHeart.classList.remove("show");

  }, 1050);


  setTimeout(() => {

    hiddenLetter.classList.add("show");

    puzzleStatus.textContent =
      "นี่คือสิ่งที่อยากบอกเธอ ♡";

  }, 1250);

}


/* =========================
   SPARK EFFECT
========================= */

function createSpark(piece) {

  const spark =
    document.createElement("span");

  spark.className =
    "puzzle-spark";

  const symbols = [
    "✦",
    "♡",
    "✧",
    "·"
  ];

  spark.textContent =
    symbols[completedPieces - 1] || "✦";


  const boardRect =
    puzzleBoard.getBoundingClientRect();

  const pieceRect =
    piece.getBoundingClientRect();


  spark.style.left =
    `${pieceRect.left - boardRect.left + pieceRect.width / 2}px`;

  spark.style.top =
    `${pieceRect.top - boardRect.top + pieceRect.height / 2}px`;


  puzzleBoard.appendChild(spark);


  setTimeout(() => {
    spark.remove();
  }, 900);

}


/* =========================
   BACK TO MENU
========================= */

backButton.addEventListener("click", () => {

  document.body.style.opacity = "0";

  setTimeout(() => {

    window.location.href =
      "menu.html";

  }, 350);

});