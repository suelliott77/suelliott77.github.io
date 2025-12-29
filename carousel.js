document.addEventListener("DOMContentLoaded", () => {
  const AUTO_PLAY_DELAY = 3500; // ms

  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const cards = carousel.querySelectorAll(".carousel-card");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    let index = 0;
    let autoPlayInterval;

    /* ---------- CREATE DOTS ---------- */
    cards.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
        restartAutoplay();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    /* ---------- CORE UPDATE ---------- */
    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }

    /* ---------- CONTROLS ---------- */
    function nextSlide() {
      index = (index + 1) % cards.length;
      updateCarousel();
    }

    function prevSlide() {
      index = (index - 1 + cards.length) % cards.length;
      updateCarousel();
    }

    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoplay();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoplay();
    });

    /* ---------- AUTOPLAY ---------- */
    /*function startAutoplay() {
      autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
    }

    function stopAutoplay() {
      clearInterval(autoPlayInterval);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }*/

    /* ---------- PAUSE ON HOVER ---------- */
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    /* ---------- INIT ---------- */
    updateCarousel();
    startAutoplay();
  });
});
