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

  const enableLightMode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
  };
  const disableLightMode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightmode', null);
  };

  if (lightmode === "active") enableLightMode();

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

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header", "./components/header.html");
    loadComponent("footer", "./components/footer.html");
  });

 

  // navigations covering content on scroll
  const navigationHeight = document.querySelector('.navbar').offsetHeight;
  document.documentElement.style.setProperty(
    "--scroll-padding", `${navigationHeight}px`
  );
  