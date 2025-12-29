document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const cards = carousel.querySelectorAll(".carousel-card");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    let index = 0;

    // Create dots
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

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove("active"));
      dots[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % cards.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + cards.length) % cards.length;
      updateCarousel();
    });
  });
});
