document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".quote-wrapper");
  const buttons = document.querySelectorAll(".quote-nav button");

  let index = 0;
  const interval = 10000;
  let intervalID;

  function updateSlide(i) {
    index = i;
    wrapper.style.transform = `translateX(-${50 * i}%)`;
    buttons.forEach((btn, idx) => {
      btn.style.backgroundColor = idx == i ? "#232ED1" : "transparent";
    });
  }

  function startAutoSlide() {
    intervalID = setInterval(() => {
      updateSlide(index == 1 ? 0 : 1);
    }, interval);
  }

  startAutoSlide();

  document.getElementById("next").addEventListener("click", () => {
    clearInterval(intervalID);
    updateSlide(1);
    startAutoSlide();
  });

  document.getElementById("prev").addEventListener("click", () => {
    clearInterval(intervalID);
    updateSlide(0);
    startAutoSlide();
  });
});
