const gameCards = document.querySelectorAll(".game-card");
const carouselTrack = document.querySelector("#carouselTrack");
const carouselDots = document.querySelectorAll(".dot");

let currentSlide = 0;
const slideCount = carouselDots.length;

setInterval(showNextSlide, 6500);

function showNextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  carouselDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlide);
  });
}

gameCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const link = card.getAttribute("href");

    if (link === "#") {
      event.preventDefault();
    }

    gameCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
  });
});
