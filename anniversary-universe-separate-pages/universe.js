/* =========================
   PRIVATE CHAT
========================= */

const messages = [
  ".message-one",
  ".message-two",
  ".message-three",
  ".message-four",
  ".message-five",
  ".message-six",
  ".message-seven"
];

const delayTime = [
  1500,
  5000,
  9000,
  13000,
  17000,
  21000,
  25000
];


/* =========================
   HIDE MESSAGES
========================= */

messages.forEach((selector) => {

  const message = document.querySelector(selector);

  if (message) {
    message.style.opacity = "0";
    message.style.visibility = "hidden";
  }

});


/* =========================
   SHOW MESSAGES
========================= */

messages.forEach((selector, index) => {

  setTimeout(() => {

    const message = document.querySelector(selector);

    if (!message) return;

    message.style.visibility = "visible";
    message.classList.add("chat-show");

  }, delayTime[index]);

});


/* =========================
   TYPING
========================= */

const typingRow = document.querySelector(".typing-row");

if (typingRow) {

  typingRow.style.opacity = "0";
  typingRow.style.visibility = "hidden";

  setTimeout(() => {

    typingRow.style.visibility = "visible";
    typingRow.classList.add("chat-show");

  }, 25000);

}


/* =========================
   OPEN MENU
   แสดงหลังข้อความทั้งหมดจบ
========================= */

const menuRow = document.querySelector(".menu-open-row");
const openMenu = document.querySelector(".open-menu");

if (menuRow) {

  // ซ่อนปุ่มก่อน
  menuRow.style.opacity = "0";
  menuRow.style.visibility = "hidden";

  /*
    ข้อความสุดท้ายเริ่มที่ 25,000 ms
    animation ของข้อความใช้ประมาณ 750 ms
    ดังนั้นให้ปุ่มขึ้นหลังจากนั้น
  */

  setTimeout(() => {

    menuRow.style.visibility = "visible";
    menuRow.classList.add("menu-show");

  }, 26000);

}


/* =========================
   GO TO MENU
========================= */

if (openMenu) {

  openMenu.addEventListener("click", () => {

    document.body.classList.add("page-leaving");

    setTimeout(() => {

      window.location.href = "menu.html";

    }, 450);

  });

}

