/* =========================
   MEMORIES
========================= */

const memories = [

  {
    image: "images/timeline1.png",
    title: "เจอกันครั้งแรก",
    description: "จำได้ว่าตอนนั้นเกร็งและตื่นเต้นมาก ๆ",
    date: "15.12.2025",
    chapter: "CHAPTER ONE"
  },

  {
    image: "images/timeline2.jpg",
    title: "ดอกไม้ช่อแรก",
    description: "เป็นการได้ดอกไม้ช่อแรกจากเธอที่แปลกมากๆ555",
    date: "15.12.2025",
    chapter: "CHAPTER TWO"
  },

  {
    image: "images/timeline4.jpg",
    title: "เที่ยวด้วยกันครั้งแรก",
    description: "ทริปกาญจนบุรีไปเที่ยวกับเธอครั้งแรก ก็พาเธอไปลำบากเลย",
    date: "28.02.2026",
    chapter: "CHAPTER THREE"
  },

  {
    image: "images/timeline5.jpg",
    title: "ไปหาเธอครั้งแรก",
    description: "เดินทางไกลโดยที่ไม่เคยไปครั้งแรกเพื่อไปหาเธอ",
    date: "27.03.2026",
    chapter: "CHAPTER FOUR"
  },

  {
    image: "images/timeline7.jpg",
    title: "แฟนไปเที่ยวบ้าน",
    description: "เธอนั่งเครื่องมาหาช่วงใกล้วันเกิด",
    date: "12.05.2026",
    chapter: "CHAPTER FIVE"
  },

  {
    image: "images/timeline8.jpg",
    title: "ทะเล ทะใจจ",
    description: "เที่ยวทะเลที่บ้านเราครั้งแรกด้วยกัน",
    date: "13.05.2026",
    chapter: "CHAPTER SIX"
  },

  {
    image: "images/timeline9.jpg",
    title: "เที่ยวกับครอบครัวเธอ",
    description: "พาเธอพาไปเที่ยวมุกดาหาร",
    date: "28.07.2026",
    chapter: "CHAPTER SEVEN"
  }

];


let currentIndex = 0;

let changeTimer = null;

let autoTimer = null;


/* =========================
   ELEMENTS
========================= */

const diary =
  document.getElementById("diary");

const backBtn =
  document.getElementById("backBtn");

const endScreen =
  document.getElementById("endScreen");

const endBackBtn =
  document.getElementById("endBackBtn");

const mainImage =
  document.getElementById("mainImage");

const photoArea =
  document.getElementById("photoArea");

const photoNumber =
  document.getElementById("photoNumber");

const photoCaption =
  document.getElementById("photoCaption");

const memoryChapter =
  document.getElementById("memoryChapter");

const memoryDate =
  document.getElementById("memoryDate");

const memoryTitle =
  document.getElementById("memoryTitle");

const memoryDescription =
  document.getElementById("memoryDescription");

const counter =
  document.getElementById("counter");

const memoryPoints =
  document.getElementById("memoryPoints");

const reelProgress =
  document.getElementById("reelProgress");

const heartRunner =
  document.getElementById("heartRunner");

const timelineNumbers =
  document.getElementById("timelineNumbers");

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxCaption =
  document.getElementById("lightboxCaption");

const lightboxClose =
  document.getElementById("lightboxClose");

const memoryContent =
  document.querySelector(".memory-content");


/* =========================
   CREATE TIMELINE POINTS
========================= */

memories.forEach(
  (memory, index) => {

    /* จุด */

    const point =
      document.createElement("button");

    point.type =
      "button";

    point.className =
      "reel-point";

    point.dataset.index =
      index;

    point.setAttribute(
      "aria-label",
      `เปิดความทรงจำ ${index + 1}`
    );


    point.addEventListener(
      "click",
      () => {

        showMemory(index);

        restartAutoPlay();

      }
    );


    memoryPoints.appendChild(point);


    /* เลข */

    const number =
      document.createElement("span");

    number.textContent =
      String(index + 1)
        .padStart(2, "0");

    timelineNumbers.appendChild(
      number
    );

  }
);


/* =========================
   SHOW MEMORY
========================= */

function showMemory(index) {

  index =
    Math.max(
      0,
      Math.min(
        index,
        memories.length - 1
      )
    );


  currentIndex =
    index;


  const memory =
    memories[index];


  const number =
    String(index + 1)
      .padStart(2, "0");


  if (changeTimer) {

    clearTimeout(
      changeTimer
    );

  }


  /* fade รูปเก่า */

  mainImage.classList.add(
    "changing"
  );


  memoryContent.classList.remove(
    "animate"
  );


  changeTimer =
    setTimeout(() => {


      /* IMAGE */

      mainImage.src =
        memory.image;

      mainImage.alt =
        memory.title;


      /* TEXT */

      memoryChapter.textContent =
        memory.chapter;

      memoryDate.textContent =
        memory.date;

      memoryTitle.textContent =
        memory.title;

      memoryDescription.textContent =
        memory.description;


      /* PHOTO */

      photoNumber.textContent =
        number;

      photoCaption.textContent =
        "our little moment";


      /* COUNTER */

      counter.textContent =
        `${number} / ${String(memories.length).padStart(2, "0")}`;


      /* TIMELINE */

      updateTimeline(index);


      /* TEXT ANIMATION */

      void memoryContent.offsetWidth;

      memoryContent.classList.add(
        "animate"
      );


      /* IMAGE IN */

      requestAnimationFrame(() => {

        mainImage.classList.remove(
          "changing"
        );

      });


    }, 260);

}


/* =========================
   UPDATE TIMELINE
========================= */

function updateTimeline(index) {

  const points =
    document.querySelectorAll(
      ".reel-point"
    );


  const numbers =
    document.querySelectorAll(
      ".timeline-numbers span"
    );


  points.forEach(
    (point, pointIndex) => {

      point.classList.toggle(
        "active",
        pointIndex === index
      );

      point.classList.toggle(
        "passed",
        pointIndex < index
      );

    }
  );


  numbers.forEach(
    (number, numberIndex) => {

      number.classList.toggle(
        "active",
        numberIndex === index
      );

    }
  );


  const progress =
    memories.length <= 1
      ? 0
      : index /
        (memories.length - 1);


  reelProgress.style.width =
    `${progress * 100}%`;


  /* หัวใจวิ่ง */

  heartRunner.style.left =
    `${progress * 100}%`;

}


/* =========================
   AUTO PLAY
========================= */

function startAutoPlay() {

  clearInterval(
    autoTimer
  );


  autoTimer =
    setInterval(() => {

      if (
        currentIndex <
        memories.length - 1
      ) {

        showMemory(
          currentIndex + 1
        );

      } else {

        clearInterval(
          autoTimer
        );

        setTimeout(
          openEnd,
          1800
        );

      }

    }, 4500);

}


/* =========================
   RESTART AUTO PLAY
========================= */

function restartAutoPlay() {

  clearInterval(
    autoTimer
  );


  startAutoPlay();

}


/* =========================
   LIGHTBOX
========================= */

photoArea.addEventListener(
  "click",
  () => {

    const memory =
      memories[currentIndex];


    lightboxImage.src =
      memory.image;

    lightboxImage.alt =
      memory.title;

    lightboxCaption.textContent =
      `${memory.title} · ${memory.date}`;


    lightbox.classList.add(
      "show"
    );

  }
);


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener(
  "click",
  event => {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);


function closeLightbox() {

  lightbox.classList.remove(
    "show"
  );

}


/* =========================
   END
========================= */

function openEnd() {

  diary.classList.remove(
    "show"
  );


  setTimeout(() => {

    diary.style.display =
      "none";

    endScreen.classList.add(
      "show"
    );

  }, 450);

}


/* =========================
   BACK
========================= */

function goBackToMenu() {

  window.location.href =
    "menu.html";

}


backBtn.addEventListener(
  "click",
  goBackToMenu
);


endBackBtn.addEventListener(
  "click",
  goBackToMenu
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      lightbox.classList.contains(
        "show"
      )
    ) {

      if (
        event.key === "Escape"
      ) {

        closeLightbox();

      }

      return;

    }

  }
);


/* =========================
   TOUCH SWIPE
========================= */

let touchStartX = 0;

let touchEndX = 0;


diary.addEventListener(
  "touchstart",
  event => {

    touchStartX =
      event.changedTouches[0]
        .screenX;

  },
  {
    passive: true
  }
);


diary.addEventListener(
  "touchend",
  event => {

    touchEndX =
      event.changedTouches[0]
        .screenX;


    const distance =
      touchEndX -
      touchStartX;


    if (
      Math.abs(distance) < 50
    ) {

      return;

    }


    if (distance < 0) {

      if (
        currentIndex <
        memories.length - 1
      ) {

        showMemory(
          currentIndex + 1
        );

        restartAutoPlay();

      }

    } else {

      if (
        currentIndex > 0
      ) {

        showMemory(
          currentIndex - 1
        );

        restartAutoPlay();

      }

    }

  },
  {
    passive: true
  }
);


/* =========================
   INITIAL
========================= */

diary.classList.add(
  "show"
);


showMemory(0);


/* เริ่มวิ่งอัตโนมัติ */

setTimeout(() => {

  startAutoPlay();

}, 1800);