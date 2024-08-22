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
  const collapseDropdown = (dropdown) => {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    dropdown.classList.remove("active");
    dropdownMenu.style.maxHeight = null;
  };

  // toggle dropdowns function
  const toggleDropdown = (dropdown) => {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    if (dropdown.classList.contains("active")) {
      collapseDropdown(dropdown);
    } else {
      // close any active dropdowns
      select(".navbar .dropdown.active", true).forEach((activeDropdown) => {
        collapseDropdown(activeDropdown);
      });
    }
    dropdown.classList.add("active");
    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
  };

  on("click", ".navbar", (e) => {
    if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 992) {
      e.preventDefault();
      const dropdown = e.target.closest(".dropdown");
      if (e.target.getAttribute("data-toggle") === "dropdown-menu") {
        toggleDropdown(dropdown);
      } else if (e.target.getAttribute("data-toggle") === "nested-dropdown") {
        const nestedDropdown = e.target.closest(".nested-dropdown");
        const nestedDropdownMenu = nestedDropdown.querySelector(
          ".nested-dropdown-menu"
        );

        if (nestedDropdown.classList.contains("active")) {
          nestedDropdown.classList.remove("active");
          nestedDropdownMenu.style.maxHeight = null;
        } else {
          nestedDropdown.classList.add("active");
          nestedDropdownMenu.style.maxHeight =
            nestedDropdownMenu.scrollHeight + "px";
          /*adjust the parent dropdown to 
          expand when the nested 
          dropmenu is toggled 
        */
          const parentDropdownMenu = dropdown.querySelector(".dropdown-menu");
          parentDropdownMenu.style.maxHeight =
            parentDropdownMenu.scrollHeight + "px";
        }
      }
    }
  });
})();
