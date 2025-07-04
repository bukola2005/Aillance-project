// FAQ Accordion functionality
        document.addEventListener('DOMContentLoaded', function() {
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

//    Load Header Here and footer
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header", "./components/header.html");
    loadComponent("footer", "./components/footer.html");
  });
  AOS.refresh();
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
        }
      })
      .catch(error => console.error("Error loading component:", error));
  }


  // navigations covering content on scroll

  const navigationHeight = document.querySelector('.navbar').offsetHeight;
  document.documentElement.style.setProperty(
    "--scroll-padding", `${navigationHeight}px`
  );
// // AOS (Animate On Scroll) Initialization
//  // initialize AOS
AOS.init({
    duration: 800,  
    offset: 100,   
    once: false  
  });
