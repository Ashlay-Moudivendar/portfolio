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

  setTimeout(() => {
    const descriptionElements = document.querySelectorAll(".content-step");
    for (const description of descriptionElements) {
      descriptionObserver.observe(description);
    }
  }, 1700);

  // "Opening" animation in introduction
  setTimeout(() => {
    const squareEdges = document.querySelectorAll(".square");
    const introContent = document.querySelector(".content");
    const smartphoneQuery = window.matchMedia("(max-width: 767.97px)");

    for (const square of squareEdges) {
      square.classList.add("active");
    }

    function handleTransition(event) {
      if (event.propertyName === "transform") {
        introContent.classList.add("active");
        squareEdges[0].removeEventListener("transitionend", handleTransition);
        if (smartphoneQuery.matches) {
          squareEdges.forEach((square) => (square.style.display = "none"));
        }
      }
    }

    squareEdges[0].addEventListener("transitionend", handleTransition);

    introContent.addEventListener(
      "transitionend",
      () => {
        document.querySelectorAll("section:not(.intro)").forEach((section) => section.classList.add("active"));
      },
      { once: true }
    );
  }, 500);

  // Show project's detail
  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (isTouchDevice) {
    document.querySelectorAll(".project").forEach((project, index) => {
      const hideProjectDetail = (event) => {
        if (!project.contains(event.target)) {
          project.classList.remove("project-active");
          project.querySelector("div").classList.remove("project-active");
          document.removeEventListener("touchstart", hideProjectDetail);
        }
      };

      project.addEventListener("click", () => {
        if (!project.classList.contains("project-active")) {
          project.classList.add("project-active");
          project.querySelector("div").classList.add("project-active");
          document.addEventListener("touchstart", hideProjectDetail);
        }
      });
    });
  }
});

// Opening navigation/menu for small screen
const openMenu = () => {
  const menu = document.querySelector("nav");
  if (menu.classList.contains("nav-active")) {
    removeOverlay();
  } else {
    menu.classList.add("nav-active");
    const heightMenu = document.querySelector("header").offsetHeight;
    const overlay = document.querySelector(".overlay");
    overlay.style.top = heightMenu + "px";
    document.querySelector(".overlay").style.display = "block";
    addOverlayListeners();
  }
};

const removeOverlay = () => {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector("nav").classList.remove("nav-active");
};

const addOverlayListeners = () => {
  document.querySelectorAll("nav a").forEach((listener) => listener.addEventListener("click", removeOverlay));
  document.querySelector(".overlay").addEventListener("touchstart", removeOverlay);
};

// Click logo : scroll to top

const scrollToTop = () => {
  if (document.querySelector("nav").classList.contains("nav-active")) {
    removeOverlay();
  }
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
