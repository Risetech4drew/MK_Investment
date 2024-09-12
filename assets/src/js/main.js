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
})();
