document.addEventListener("DOMContentLoaded", () => {
  // Quotes' section / Carousel
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

  // Career path: displaying description when scrolling
  const descriptionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { transform: "translateX(-0.625rem)", opacity: 0 },
              { transform: "translateX(0)", opacity: 1 },
            ],
            {
              duration: 400,
              fill: "forwards",
            }
          );
          descriptionObserver.unobserve(entry.target);
        }
      }
    },
    {
      root: null,
      rootMargin: "0% 0% -35%",
    }
  );

  const descriptionElements = document.querySelectorAll(".content-step");
  for (const description of descriptionElements) {
    descriptionObserver.observe(description);
  }

  // "Opening" animation in introduction
  setTimeout(() => {
    const squareEdges = document.querySelectorAll(".square");
    const introContent = document.querySelector(".content");

    for (const square of squareEdges) {
      square.classList.add("active");
    }

    function handleTransition(event) {
      if (event.propertyName === "transform") {
        introContent.classList.add("active");
        squareEdges[0].removeEventListener("transitionend", handleTransition);
      }
    }

    squareEdges[0].addEventListener("transitionend", handleTransition);

    introContent.addEventListener(
      "transitionend",
      () => {
        document
          .querySelectorAll("section:not(.intro)")
          .forEach((section) => section.classList.add("active"));
      },
      { once: true }
    );
  }, 500);
});
