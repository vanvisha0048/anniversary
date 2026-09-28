const questions = [

{
question:
"จำได้ไหมว่าเราเจอกันครั้งแรกที่ไหน?",

answers: [
  "ที่โรงแรม",
  "ที่คาเฟ่",
  "ที่บ้าน",
  "ในห้าง"
],

correct: 0

},

{
question:
"ของขวัญอะไรที่เธอให้เค้าครั้งแรก?",

answers: [
  "ดอกไม้",
  "ตุ๊กตา",
  "ช็อกโกแลต",
  "จดหมาย"
],

correct: 0

},

{
question:
"ทริปแรกที่เราไปเที่ยวด้วยกันคือที่ไหน?",

answers: [
  "เชียงใหม่",
  "กาญจนบุรี",
  "ทะเล",
  "กรุงเทพฯ"
],

correct: 1

},

{
question:
"ครั้งแรกที่เค้าเดินทางไปหาเธอ เค้าไปคนเดียวใช่ไหม?",

answers: [
  "ใช่",
  "ไม่ใช่",
  "จำไม่ได้",
  "ไปกับเพื่อน"
],

correct: 0

},

{
question:
"สถานที่ไหนที่เราไปเที่ยวด้วยกันตอนที่เธอไปบ้านเค้า",

answers: [
  "ทะเล",
  "ภูเขา",
  "คาเฟ่",
  "สวนสนุก"
],

correct: 0

},

{
question:
"เราเคยไปเที่ยวกับครอบครัวของเธอที่ไหน?",

answers: [
  "มุกดาหาร",
  "ขอนแก่น",
  "นครพนม",
  "อุดรธานี"
],

correct: 0

},

{
question:
"ถ้าย้อนกลับไปวันแรก เธอจะเลือกเจอเค้าอีกไหม?",

answers: [
  "เลือกแน่นอน ♡",
  "ขอคิดก่อน",
  "ไม่แน่ใจ",
  "ไม่เลือก"
],

correct: 0,

forced: true

}

];

let currentQuestion = 0;
let score = 0;
let answered = false;

let soundEnabled = true;

let audioContext = null;

/* =========================
ELEMENTS
========================= */

const questionText =
document.getElementById(
"questionText"
);

const answers =
document.getElementById(
"answers"
);

const questionCounter =
document.getElementById(
"questionCounter"
);

const progressText =
document.getElementById(
"progressText"
);

const progressFill =
document.getElementById(
"progressFill"
);

const bigNumber =
document.getElementById(
"bigNumber"
);

const scoreElement =
document.getElementById(
"score"
);

const answerMessage =
document.getElementById(
"answerMessage"
);

const questionCard =
document.getElementById(
"questionCard"
);

const resultScreen =
document.getElementById(
"resultScreen"
);

const finalScore =
document.getElementById(
"finalScore"
);

const resultTitle =
document.getElementById(
"resultTitle"
);

const resultText =
document.getElementById(
"resultText"
);

const secretMessage =
document.getElementById(
"secretMessage"
);

const playAgain =
document.getElementById(
"playAgain"
);

const resultBack =
document.getElementById(
"resultBack"
);

const backBtn =
document.getElementById(
"backBtn"
);

const soundBtn =
document.getElementById(
"soundBtn"
);

/* =========================
AUDIO ENGINE
ไม่ต้องใช้ MP3
========================= */

function getAudioContext() {

if (!audioContext) {

const AudioContext =
  window.AudioContext ||
  window.webkitAudioContext;

if (!AudioContext) {
  return null;
}

audioContext =
  new AudioContext();

}

if (
audioContext.state ===
"suspended"
) {

audioContext.resume();

}

return audioContext;
}

function tone(
frequency,
duration,
type = "sine",
volume = 0.08,
delay = 0
) {

if (!soundEnabled) return;

const ctx =
getAudioContext();

if (!ctx) return;

const oscillator =
ctx.createOscillator();

const gain =
ctx.createGain();

oscillator.type = type;

oscillator.frequency.value =
frequency;

gain.gain.setValueAtTime(
0,
ctx.currentTime + delay
);

gain.gain.linearRampToValueAtTime(
volume,
ctx.currentTime +
delay +
0.02
);

gain.gain.exponentialRampToValueAtTime(
0.001,
ctx.currentTime +
delay +
duration
);

oscillator.connect(gain);

gain.connect(ctx.destination);

oscillator.start(
ctx.currentTime + delay
);

oscillator.stop(
ctx.currentTime +
delay +
duration +
0.03
);
}

/* =========================
SOUND EFFECTS
========================= */

function playCorrectSound() {

tone(
659.25,
0.18,
"sine",
0.07
);

tone(
783.99,
0.22,
"sine",
0.08,
0.08
);

}

function playWrongSound() {

tone(
220,
0.18,
"triangle",
0.055
);

tone(
174.61,
0.22,
"triangle",
0.045,
0.08
);

}

function playClickSound() {

tone(
520,
0.07,
"sine",
0.035
);

}

function playLoveSound() {

tone(
523.25,
0.2,
"sine",
0.06
);

tone(
659.25,
0.2,
"sine",
0.07,
0.09
);

tone(
783.99,
0.35,
"sine",
0.08,
0.18
);

}

function playFinalSound() {

tone(
523.25,
0.2,
"sine",
0.05
);

tone(
659.25,
0.2,
"sine",
0.06,
0.12
);

tone(
783.99,
0.25,
"sine",
0.07,
0.24
);

tone(
1046.5,
0.5,
"sine",
0.08,
0.38
);

}

/* =========================
LOAD QUESTION
========================= */

function loadQuestion() {

const question =
questions[currentQuestion];

answered = false;

question.wrongAttempts = 0;

questionText.textContent =
question.question;

bigNumber.textContent =
String(
currentQuestion + 1
).padStart(2, "0");

questionCounter.textContent =
`${String(
      currentQuestion + 1
    ).padStart(2, "0")} / ${String(
      questions.length
    ).padStart(2, "0")}`;

progressText.textContent =
`${String(
      currentQuestion + 1
    ).padStart(2, "0")} — ${String(
      questions.length
    ).padStart(2, "0")}`;

progressFill.style.width =
`${
      (
        (currentQuestion + 1) /
        questions.length
      ) * 100
    }%`;

answerMessage.textContent =
"";

answerMessage.style.animation =
"none";

answers.innerHTML =
"";

question.answers.forEach(
(answer, index) => {

  const button =
    document.createElement(
      "button"
    );

  button.className =
    "answer-btn";

  button.textContent =
    answer;

  button.type =
    "button";

  button.addEventListener(
    "click",
    () => {

      selectAnswer(
        index,
        button
      );

    }
  );

  answers.appendChild(
    button
  );

}

);

}

/* =========================
SELECT ANSWER
========================= */

function selectAnswer(
index,
button
) {

if (answered) {
return;
}

const question =
questions[currentQuestion];

/* =========================
FORCED QUESTION
========================= */

if (
question.forced &&
index !== question.correct
) {

question.wrongAttempts =
  (question.wrongAttempts || 0) +
  1;


const allButtons =
  document.querySelectorAll(
    ".answer-btn"
  );

const correctButton =
  allButtons[
    question.correct
  ];


/*
  ยิ่งเลือกผิด
  ปุ่มถูกยิ่งใหญ่
*/

const scale =
  Math.min(
    1 +
    (
      question.wrongAttempts *
      0.22
    ),

    2.8
  );


correctButton.classList.add(
  "forced-correct"
);

correctButton.style.setProperty(
  "--forced-scale",
  scale
);


/*
  ทำปุ่มอื่นเล็กลง
*/

allButtons.forEach(
  (btn, btnIndex) => {

    if (
      btnIndex !==
      question.correct
    ) {

      btn.classList.add(
        "forced-other"
      );

    }

  }
);


/*
  เสียงกวน ๆ
*/

playWrongSound();


/*
  ข้อความแกล้ง
*/

const messages = [

  "คิดดี ๆ นะ ♡",

  "แน่ใจเหรอ 👀",

  "ลองเลือกใหม่สิ",

  "ยังจะเลือกอันอื่นอีกเหรอ 555",

  "ปุ่มนี้น่ะ...เลือกได้จริงเหรอ 😌",

  "เลือกแน่นอนเถอะ ♡",

  "เค้ารอคำตอบอยู่นะ 😂",

  "เอ้าาา กดปุ่มใหญ่ ๆ นั่นสิ ♡"

];


answerMessage.textContent =
  messages[
    Math.min(
      question.wrongAttempts - 1,
      messages.length - 1
    )
  ];


answerMessage.style.animation =
  "none";

void answerMessage.offsetWidth;

answerMessage.style.animation =
  "messagePop .3s ease";


return;

}

/* =========================
NORMAL ANSWER
========================= */

answered = true;

const allButtons =
document.querySelectorAll(
".answer-btn"
);

allButtons.forEach(
(btn) => {

  btn.classList.add(
    "disabled"
  );

}

);

/* =========================
CORRECT
========================= */

if (
index === question.correct
) {

score++;

scoreElement.textContent =
  score;

button.classList.add(
  "correct"
);


/*
  ถ้าเป็นข้อสุดท้าย
*/

if (question.forced) {

  playLoveSound();

  answerMessage.textContent =
    "เลือกถูกแล้วนะ ♡ เค้ารู้อยู่แล้ว";

} else {

  playCorrectSound();

  answerMessage.textContent =
    "ถูกต้อง ♡ จำเรื่องของเราเก่งจัง";

}

}

/* =========================
WRONG
========================= */

else {

button.classList.add(
  "wrong"
);

allButtons[
  question.correct
].classList.add(
  "correct"
);

playWrongSound();

answerMessage.textContent =
  "เกือบแล้วนะ ♡";

}

setTimeout(
nextQuestion,
900
);

}

/* =========================
NEXT QUESTION
========================= */

function nextQuestion() {

if (
currentQuestion <
questions.length - 1
) {

currentQuestion++;

questionCard.style.animation =
  "none";

void questionCard.offsetWidth;

questionCard.style.animation =
  "cardIn .55s ease";

loadQuestion();

return;

}

showResult();

}

/* =========================
RESULT
========================= */

function showResult() {

finalScore.textContent =
`${score} / ${questions.length}`;

secretMessage.classList.remove(
"show"
);

if (
score === questions.length
) {

resultTitle.textContent =
  "จำเรื่องของเราได้ทุกอย่างเลย ♡";

resultText.textContent =
  "เก่งที่สุดเลยนะ";


setTimeout(
  () => {

    secretMessage.classList.add(
      "show"
    );

  },
  500
);

}

else if (
score >= 5
) {

resultTitle.textContent =
  "เก่งมากเลย ♡";
}

else if (
score >= 3
) {

resultTitle.textContent =
  "เกือบครบแล้ว ♡";

resultText.textContent =
  "บางเรื่องอาจลืมไปบ้าง แต่ความทรงจำของเรายังอยู่";

}

else {

resultTitle.textContent =
  "เกมจบแล้ว ♡";

resultText.textContent =
  "ไม่เป็นไรนะ ไว้เราไปสร้างความทรงจำใหม่กัน";

}

resultScreen.classList.add(
"show"
);

setTimeout(
() => {

  playFinalSound();

},
300

);

}

/* =========================
RESTART
========================= */

function restartGame() {

currentQuestion = 0;

score = 0;

answered = false;

scoreElement.textContent =
"0";

resultScreen.classList.remove(
"show"
);

secretMessage.classList.remove(
"show"
);

loadQuestion();

}

/* =========================
BACK MENU
========================= */

function goBack() {

window.location.href =
"menu.html";

}

/* =========================
SOUND TOGGLE
========================= */

if (soundBtn) {

soundBtn.addEventListener(
"click",
() => {

  soundEnabled =
    !soundEnabled;


  if (soundEnabled) {

    soundBtn.textContent =
      "🔊";

    soundBtn.classList.remove(
      "muted"
    );

    playClickSound();

  }

  else {

    soundBtn.textContent =
      "🔇";

    soundBtn.classList.add(
      "muted"
    );

  }

}

);

}

/* =========================
BUTTON EVENTS
========================= */

if (playAgain) {

playAgain.addEventListener(
"click",
() => {

  playClickSound();

  restartGame();

}

);

}

if (resultBack) {

resultBack.addEventListener(
"click",
() => {

  playClickSound();

  goBack();

}

);

}

if (backBtn) {

backBtn.addEventListener(
"click",
() => {

  playClickSound();

  goBack();

}

);

}

/* =========================
ESC
========================= */

document.addEventListener(
"keydown",
(event) => {

if (
  event.key === "Escape"
) {

  goBack();

}

}
);

/* =========================
START GAME
========================= */

loadQuestion();
