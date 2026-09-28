const audio =
  document.getElementById("audio");

const musicPage =
  document.getElementById("musicPage");

const playBtn =
  document.getElementById("playBtn");

const playIcon =
  document.getElementById("playIcon");

const progressArea =
  document.getElementById("progressArea");

const progressBar =
  document.getElementById("progressBar");

const currentTime =
  document.getElementById("currentTime");

const duration =
  document.getElementById("duration");

const restartBtn =
  document.getElementById("restartBtn");

const muteBtn =
  document.getElementById("muteBtn");

const backBtn =
  document.getElementById("backBtn");


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const secondsLeft =
    Math.floor(seconds % 60);

  return `${minutes}:${String(secondsLeft).padStart(2, "0")}`;
}


/* =========================
   PLAY / PAUSE
========================= */

playBtn.addEventListener(
  "click",
  () => {

    if (audio.paused) {

      audio.play()
        .then(() => {

          setPlaying(true);

        })
        .catch(() => {

          alert(
            "ไม่สามารถเปิดเพลงได้ ♡\nตรวจสอบว่าไฟล์เพลงอยู่ที่ images/our-song.mp3"
          );

        });

    } else {

      audio.pause();

      setPlaying(false);

    }

  }
);


/* =========================
   PLAYING STATE
========================= */

function setPlaying(isPlaying) {

  if (isPlaying) {

    playIcon.textContent = "Ⅱ";

    musicPage.classList.add(
      "playing"
    );

  } else {

    playIcon.textContent = "▶";

    musicPage.classList.remove(
      "playing"
    );

  }

}


/* =========================
   LOAD SONG
========================= */

audio.addEventListener(
  "loadedmetadata",
  () => {

    duration.textContent =
      formatTime(audio.duration);

  }
);


/* =========================
   UPDATE PROGRESS
========================= */

audio.addEventListener(
  "timeupdate",
  () => {

    currentTime.textContent =
      formatTime(audio.currentTime);


    if (!audio.duration) {
      return;
    }


    const percent =
      (audio.currentTime /
        audio.duration) * 100;


    progressBar.style.width =
      `${percent}%`;

  }
);


/* =========================
   SEEK
========================= */

progressArea.addEventListener(
  "click",
  event => {

    if (!audio.duration) {
      return;
    }


    const rect =
      progressArea.getBoundingClientRect();


    const position =
      event.clientX - rect.left;


    const percent =
      position / rect.width;


    audio.currentTime =
      percent * audio.duration;

  }
);


/* =========================
   RESTART
========================= */

restartBtn.addEventListener(
  "click",
  () => {

    audio.currentTime = 0;


    if (audio.paused) {

      audio.play()
        .then(() => {

          setPlaying(true);

        })
        .catch(() => {});

    }

  }
);


/* =========================
   MUTE
========================= */

muteBtn.addEventListener(
  "click",
  () => {

    audio.muted =
      !audio.muted;


    muteBtn.textContent =
      audio.muted
        ? "×"
        : "♫";

  }
);


/* =========================
   SONG END
========================= */

audio.addEventListener(
  "ended",
  () => {

    setPlaying(false);

    progressBar.style.width =
      "0%";

    currentTime.textContent =
      "0:00";

  }
);


/* =========================
   BACK
========================= */

backBtn.addEventListener(
  "click",
  () => {

    window.location.href =
      "menu.html";

  }
);