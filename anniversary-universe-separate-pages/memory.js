const stories =
document.querySelectorAll(".memory-story");

const nextButton =
document.getElementById("nextStory");

const nextText =
document.getElementById("nextText");

const progressCurrent =
document.getElementById("progressCurrent");

const progressBar =
document.getElementById("progressBar");

const memoryEnding =
document.getElementById("memoryEnding");

const backButton =
document.getElementById("backButton");

const backToMenu =
document.getElementById("backToMenu");

let currentStory = 0;
let isChanging = false;

/* =========================
SHOW STORY
========================= */

function showStory(index) {

if (isChanging) return;

if (
index < 0 ||
index >= stories.length
) {
return;
}

isChanging = true;

const current =
stories[currentStory];

current.style.opacity = "0";

current.style.transform =
"translateY(-12px) rotate(-2deg)";

setTimeout(() => {


current.classList.remove("active");

current.style.opacity = "";
current.style.transform = "";


currentStory = index;


const next =
  stories[currentStory];


next.classList.add("active");


progressCurrent.textContent =
  String(currentStory + 1).padStart(2, "0");


progressBar.style.width =
  `${((currentStory + 1) / stories.length) * 100}%`;


if (
  currentStory ===
  stories.length - 1
) {

  nextText.textContent =
    "จบเรื่องราวของเรา";

} else {

  nextText.textContent =
    "เรื่องราวต่อไป";

}


window.scrollTo({
  top: 0,
  behavior: "smooth"
});


setTimeout(() => {

  isChanging = false;

}, 650);


}, 350);

}

/* =========================
NEXT
========================= */

nextButton.addEventListener(
"click",
() => {


if (
  currentStory <
  stories.length - 1
) {

  showStory(
    currentStory + 1
  );

  return;
}


stories[currentStory]
  .classList
  .remove("active");


nextButton.parentElement.style.display =
  "none";


memoryEnding.classList.add(
  "show"
);


progressCurrent.textContent =
  "♡";


progressBar.style.width =
  "100%";


window.scrollTo({
  top: 0,
  behavior: "smooth"
});


}
);

/* =========================
BACK TO MENU
========================= */

function goToMenu() {

document.body.style.opacity =
"0";

document.body.style.transition =
"opacity .35s ease";

setTimeout(() => {


window.location.href =
  "menu.html";


}, 350);

}

backButton.addEventListener(
"click",
goToMenu
);

backToMenu.addEventListener(
"click",
goToMenu
);

/* =========================
KEYBOARD
========================= */

document.addEventListener(
"keydown",
(event) => {


if (
  event.key === "ArrowRight"
) {

  if (
    currentStory <
    stories.length - 1
  ) {

    showStory(
      currentStory + 1
    );

  }

}


if (
  event.key === "ArrowLeft"
) {

  if (
    currentStory > 0
  ) {

    showStory(
      currentStory - 1
    );

  }

}


}
);
