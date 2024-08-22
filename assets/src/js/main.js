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
    if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 992) {
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
})();
