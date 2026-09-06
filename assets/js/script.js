// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded',
function () {
  // Select all FAQ question elements
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling; // Get the corresponding answer element
      const toggle = this.querySelector('.faq-toggle'); // Get the toggle icon
      
      // Close other open answers
      document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
          item.classList.remove('show');
          item.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
        }
      });
      
      // Toggle current answer
      answer.classList.toggle('show');
      toggle.textContent = answer.classList.contains('show') ? '−' : '+';
    });
  });
});


// Load Header and Footer components dynamically
function loadComponent(id, filePath) {
  fetch(filePath)
  .then(response => {
    if (!response.ok) throw new Error(`Could not load ${filePath}`);
    return response.text();
  })
  .then(data => {
    document.getElementById(id).innerHTML = data;
    
    // If loading header, initialize header-specific logic
    if (id === "header") {
    let navEL = document.querySelector("header");
    // Add or remove navbar-scrolled class using IntersectionObserver for performance
    let scrollWatcher = document.createElement('div');
    scrollWatcher.setAttribute('data-scroll-watcher', '');
    scrollWatcher.style.position = 'absolute';
    scrollWatcher.style.top = '56px';
    scrollWatcher.style.width = '1px';
    scrollWatcher.style.height = '1px';
    document.body.prepend(scrollWatcher);

    const navObserver = new IntersectionObserver((entries) => {
      navEL.classList.toggle("navbar-scrolled", !entries[0].isIntersecting);
    }, { rootMargin: "0px" });
    
    navObserver.observe(scrollWatcher);

    // --- Bootstrap Dropdown Arrow Icon Toggle ---
    const dropdownLinks = document.querySelectorAll('.dropdown-toggle-custom');
    dropdownLinks.forEach(link => {
      const arrowIcon = link.querySelector('.dropdown-icon');
      link.addEventListener('show.bs.dropdown', function () {
      if (arrowIcon) arrowIcon.classList.replace('bi-caret-down-fill', 'bi-caret-up-fill');
      });
      link.addEventListener('hide.bs.dropdown', function () {
      if (arrowIcon) arrowIcon.classList.replace('bi-caret-up-fill', 'bi-caret-down-fill');
      });
    });

    // --- Lightmode Toggle Logic ---
    let lightmode = localStorage.getItem('lightmode');
    const themeSwitch = document.getElementById('theme-switch');

    // Enable light mode
    const enableLightMode = () => {
      document.body.classList.add('lightmode');
      localStorage.setItem('lightmode', 'active');
    };
    // Disable light mode
    const disableLightMode = () => {
      document.body.classList.remove('lightmode');
      localStorage.setItem('lightmode', null);
    };

    // Set initial light mode state
    if (lightmode === "active") enableLightMode();

    // Toggle light mode on switch click
    if (themeSwitch) {
      themeSwitch.addEventListener('click', () =>  {
      lightmode = localStorage.getItem('lightmode');
      lightmode !== "active" ? enableLightMode() : disableLightMode();
      });
    }
    }

  })
  .catch(error => console.error("Error loading component:", error));
}

// Set up IntersectionObserver for scroll-triggered CSS animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  animatedElements.forEach(el => animationObserver.observe(el));
}

// Load header and footer on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header", "./components/header.html");
  loadComponent("footer", "./components/footer.html");
  initScrollAnimations();
});


// Set scroll padding to prevent navigation bar from covering content
const navigationHeight = document.querySelector('.navbar').offsetHeight;
document.documentElement.style.setProperty(
  "--scroll-padding", `${navigationHeight}px`
);