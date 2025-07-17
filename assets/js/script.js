 // FAQ Accordion functionality
 document.addEventListener('DOMContentLoaded',
function () {
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    const toggle = this.querySelector('.faq-toggle');
                    
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


// Load Header Here and footer
function loadComponent(id, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load ${filePath}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      
    if (id === "header") {
  let navEL = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 56) {
      navEL.classList.add("navbar-scrolled");
    } else {
      navEL.classList.remove("navbar-scrolled");
    }
  });




  // ✅ FINAL DROPDOWN FIX
  const dropdownLinks = document.querySelectorAll('.dropdown-toggle-custom');

  dropdownLinks.forEach(link => {
    const arrowIcon = link.querySelector('.dropdown-icon');
    const href = link.getAttribute('href');

    // Track dropdown open state manually
    let isOpen = false;

    // Setup Bootstrap dropdown manually
    const dropdown = new bootstrap.Dropdown(link);

    link.addEventListener('click', function (e) {
      e.preventDefault(); // always stop Bootstrap default

      if (!isOpen) {
        dropdown.show(); // first click → open
        isOpen = true;
      } else {
        // second click → go to link
        if (href && href !== '#') {
          window.location.href = href;
        }
      }
    });

    // Listen for outside click to reset state
    document.addEventListener('click', function (event) {
      if (!link.contains(event.target)) {
        isOpen = false;
      }
    });

    // Handle arrow icon
    link.addEventListener('shown.bs.dropdown', function () {
      if (arrowIcon) arrowIcon.classList.replace('bi-caret-down-fill', 'bi-caret-up-fill');
    });

    link.addEventListener('hidden.bs.dropdown', function () {
      if (arrowIcon) arrowIcon.classList.replace('bi-caret-up-fill', 'bi-caret-down-fill');
      isOpen = false;
    });
  });
}

   })
    .catch(error => console.error("Error loading component:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header", "./components/header.html");
    loadComponent("footer", "./components/footer.html");
  });

 

  // navigations covering content on scroll
  const navigationHeight = document.querySelector('.navbar').offsetHeight;
  document.documentElement.style.setProperty(
    "--scroll-padding", `${navigationHeight}px`
  );
  

let lightmode = localStorage.getItem('lightmode');
const themeSwitch = document.getElementById('theme-switch');

const enableLightMode = () => {
  document.body.classList.add('lightmode');
  localStorage.setItem('lightmode', 'active');
};
const disableLightMode = () => {
  document.body.classList.remove('lightmode');
  localStorage.setItem('lightmode', null);
};

if (lightmode === "active") enableLightMode();

themeSwitch.addEventListener('click', () =>  {
  lightmode = localStorage.getItem('lightmode');
  lightmode !== "active" ? enableLightMode() : disableLightMode();
});