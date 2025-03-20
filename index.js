/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}


document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navItems = document.querySelector(".nav__items");

  const toggleMenu = (event) => {
      event.preventDefault(); // Verhindert unerwünschte Doppelklick-Effekte auf Mobile
      navItems.classList.toggle("active");
      document.body.classList.toggle("menu-open"); // Sperrt den Hintergrund, wenn Menü offen ist
  };

  // Event-Listener für Click und Touch
  mobileMenu.addEventListener("click", toggleMenu);
  mobileMenu.addEventListener("touchend", toggleMenu, { passive: false });

  // Falls ein Link im Menü angeklickt wird, soll sich das Menü schließen
  document.querySelectorAll(".nav__items a").forEach(link => {
      link.addEventListener("click", () => {
          navItems.classList.remove("active");
          document.body.classList.remove("menu-open");
      });
  });
});






const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, header"); // Hero-Bereich (header) einbeziehen
  const navLinks = document.querySelectorAll(".nav__link");

  function changeActiveLink() {
      let scrollPosition = window.scrollY;

      sections.forEach((section) => {
          let sectionTop = section.offsetTop - 200; // Kleiner Puffer für bessere Erkennung
          let sectionHeight = section.offsetHeight;
          let sectionId = section.getAttribute("id");

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              navLinks.forEach((link) => {
                  link.classList.remove("active");
                  if (link.getAttribute("href") === `#${sectionId}`) {
                      link.classList.add("active");
                  }
              });
          }
      });

      // Falls der Nutzer ganz oben ist, soll kein anderer Menü-Element aktiv sein
      if (scrollPosition < 100) {
          navLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === "#top") { // #top als aktiven Bereich setzen
                  link.classList.add("active");
              }
          });
      }
  }

  window.addEventListener("scroll", changeActiveLink);
});