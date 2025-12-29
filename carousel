document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".carousel-card");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const dotsContainer = document.querySelector(".carousel-dots");

  let index = 0;

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

  const dots = document.querySelectorAll(".carousel-dot");

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
