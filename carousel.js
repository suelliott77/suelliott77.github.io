document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const cards = carousel.querySelectorAll(".carousel-card");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    let index = 0;

    /* ---------- CREATE DOTS ---------- */
    cards.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
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
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
    });

    /* ---------- INIT ---------- */
    updateCarousel();
  });
});
