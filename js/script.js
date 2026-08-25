/* =========================================================
   D'LEON DESIGNS
   SITE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const siteHeader =
    document.getElementById("siteHeader");

  const menuToggle =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");

  const currentYear =
    document.getElementById("currentYear");

  const revealElements =
    document.querySelectorAll(".reveal");


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function openMenu() {

    if (!menuToggle || !mobileMenu) {
      return;
    }

    mobileMenu.classList.add("open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Cerrar menú"
    );

  }


  function closeMenu() {

    if (!menuToggle || !mobileMenu) {
      return;
    }

    mobileMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Abrir menú"
    );

  }


  function toggleMenu() {

    if (!mobileMenu) {
      return;
    }

    const isOpen =
      mobileMenu.classList.contains("open");

    if (isOpen) {

      closeMenu();

    } else {

      openMenu();

    }

  }


  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
      "click",
      toggleMenu
    );


    /* Close after selecting a mobile navigation link */

    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


    /* Close if user clicks outside menu */

    document.addEventListener(
      "click",
      (event) => {

        const clickedInsideMenu =
          mobileMenu.contains(event.target);

        const clickedToggle =
          menuToggle.contains(event.target);

        if (
          mobileMenu.classList.contains("open") &&
          !clickedInsideMenu &&
          !clickedToggle
        ) {

          closeMenu();

        }

      }
    );


    /* Escape key closes menu */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          mobileMenu.classList.contains("open")
        ) {

          closeMenu();

          menuToggle.focus();

        }

      }
    );

  }


  /* =======================================================
     CLOSE MOBILE MENU AFTER RESIZE
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 1100 &&
        mobileMenu &&
        mobileMenu.classList.contains("open")
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     STICKY HEADER SCROLL EFFECT
  ======================================================= */

  function updateHeader() {

    if (!siteHeader) {
      return;
    }

    if (window.scrollY > 25) {

      siteHeader.classList.add("scrolled");

    } else {

      siteHeader.classList.remove("scrolled");

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* =======================================================
     REVEAL ANIMATIONS
  ======================================================= */

  if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    /*
      Fallback for browsers without
      IntersectionObserver support.
    */

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     SAFETY FALLBACK FOR ABOVE-THE-FOLD CONTENT
  ======================================================= */

  window.setTimeout(() => {

    revealElements.forEach((element) => {

      const position =
        element.getBoundingClientRect();

      if (
        position.top <
        window.innerHeight
      ) {

        element.classList.add("visible");

      }

    });

  }, 200);


});
