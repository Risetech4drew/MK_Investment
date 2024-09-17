(function () {
  // element selector helper function
  // selector helper function
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // eventlistener helper function
  const on = (type, el, listener, all = false) => {
    let targetEl = select(el, all);
    if (targetEl) {
      if (all) {
        targetEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        targetEl.addEventListener(type, listener);
      }
    }
  };

  // mobile nav toggle
  on("click", ".ham", (e) => {
    const hamburger = select(".ham");
    const navbar = select(".navbar");
    hamburger.classList.toggle("active");
    navbar.classList.toggle("navbar-active");
  });

  // mobile nav dropdown menu
  const collapseDropdown = () => {
    const navbar = select(".navbar");
    navbar
      .querySelector(".dropdown.active .dropdown-menu")
      .removeAttribute("style");
    navbar.querySelector(".dropdown.active").classList.remove("active");
  };

  on("click", ".navbar", (e) => {
    const navbar = select(".navbar");
    if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 1024) {
      e.preventDefault();

      const menuDropdown = e.target.parentElement;

      if (menuDropdown.classList.contains("active")) {
        collapseDropdown();
      } else {
        if (navbar.querySelector(".dropdown.active")) {
          collapseDropdown();
        }

        menuDropdown.classList.add("active");
        const dropdownMenu = menuDropdown.querySelector(".dropdown-menu");
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
      }
    }
  });

  class TypeWritter {
    constructor(textElement, words, wait = 3000) {
      this.textElement = textElement;
      this.words = words;
      this.txt = "";
      this.wait = parseInt(wait, 10);
      this.wordIndex = 0;
      this.type();
      this.isDeleting = false;
    }
    type() {
      // getting current index
      const current = this.wordIndex % this.words.length;
      // get word from the current index
      const fullTxt = this.words[current];
      // check if deleting
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      }
      // adding char
      else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      // inserting text into the DOM
      this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      let typeSpeed = 100;

      if (this.isDeleting) {
        typeSpeed /= 2;
      }
      // if word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        // setting isDeleting to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // move to the next word
        this.wordIndex++;
        // pause abit before type starts
        typeSpeed = 100;
      }
      setTimeout(() => this.type(), typeSpeed);
    }
  }

  function initTypeWritter() {
    if (select(".typewriter-text")) {
      const textElement = document.querySelector(".typewriter-text");
      const words = JSON.parse(textElement.getAttribute("data-words"));
      const wait = textElement.getAttribute("data-wait");

      new TypeWritter(textElement, words, wait);
    }
  }

  initTypeWritter();

  class CollapseManager {
    static instance = null;

    constructor() {
      if (CollapseManager.instance) {
        return CollapseManager.instance;
      }
      CollapseManager.instance = this;

      this.collapseElements = document.querySelectorAll(".collapse-content");
      this.toggleButtons = document.querySelectorAll(".collapse-toggle");
      this.init();
    }

    init() {
      this.removeExistingListeners();
      this.addEventListeners();
      this.setInitialStates();
      this.handleResize();
    }

    removeExistingListeners() {
      this.toggleButtons.forEach((button) => {
        button.removeEventListener("click", this.toggleCollapseHandler);
      });
      window.removeEventListener("resize", this.handleResize);
    }

    addEventListeners() {
      this.toggleButtons.forEach((button) => {
        button.addEventListener("click", this.toggleCollapseHandler);
      });
      window.addEventListener("resize", () => this.handleResize());
    }

    setInitialStates() {
      this.collapseElements.forEach((element) => {
        const maxHeight = element.dataset.collapseMaxHeight || 100;
        element.style.setProperty("--max-height", `${maxHeight}px`);
      });
    }

    toggleCollapseHandler = (event) => {
      const button = event.currentTarget;
      const targetId = button.dataset.collapseToggle;
      const target = document.querySelector(
        `[data-collapse-target="${targetId}"]`
      );

      // For debugging
      console.log("Button clicked");

      if (target) {
        target.classList.toggle("collapsed");
        button.textContent = target.classList.contains("collapsed")
          ? "Read More"
          : "Read Less";
      } else {
        console.error(
          `No element found with data-collapse-target="${targetId}"`
        );
      }
    };

    handleResize = () => {
      const isMobile = window.innerWidth < 768;
      this.collapseElements.forEach((element) => {
        element.classList.toggle("collapsed", isMobile);
      });

      this.toggleButtons.forEach((button) => {
        button.style.display = isMobile ? "inline-block" : "none";
        button.textContent = "Read More";
      });
    };
  }

  // Ensure the manager is only initialized once when the DOM is ready
  let collapseManager;
  document.addEventListener("DOMContentLoaded", () => {
    collapseManager = new CollapseManager();
  });
  // scrollToTop
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const toggleScrollToTopBtn = () => {
    if (window.scrollY > 200) {
      scrollToTopBtn.classList.remove("opacity-0", "invisible");
      scrollToTopBtn.classList.add("opacity-100");
    } else {
      scrollToTopBtn.classList.remove("opacity-100");
      scrollToTopBtn.classList.add("opacity-0", "invisible");
    }
  };
  window.addEventListener("scroll", toggleScrollToTopBtn);
  toggleScrollToTopBtn();

  // set current time for video
  const videoTimeControl = () => {
    const video = document.getElementById("companyVideo");
    video.addEventListener("loadedmetadata", function () {
      // Set the current time to 0.02 seconds
      video.currentTime = 2;
      console.log(video.currentTime);
    });
  };

  videoTimeControl();
})();
