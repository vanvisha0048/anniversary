const menuCards = document.querySelectorAll(".menu-card");
const backButton = document.getElementById("backButton");


/* =========================
   MENU CARD CLICK
========================= */

menuCards.forEach((card) => {

  card.addEventListener("click", (event) => {

    event.preventDefault();

    const destination = card.getAttribute("href");

    if (!destination) {
      return;
    }

    document.body.classList.add("menu-leaving");

    setTimeout(() => {

      window.location.href = destination;

    }, 300);

  });

});


/* =========================
   BACK
========================= */

if (backButton) {

  backButton.addEventListener("click", () => {

    if (window.history.length > 1) {

      window.history.back();

    } else {

      window.location.href = "index.html";

    }

  });

}

