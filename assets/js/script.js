// Add a class to the navbar when the user scrolls past a certain point
const navEL = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 56) {
        navEL.classList.add("navbar-scrolled");
    } else if (window.scrollY < 56) {
        navEL.classList.remove("navbar-scrolled");
    }
});
// Enhanced JavaScript for  Form Handling, and Animations


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition > sectionTop - window.innerHeight + sectionHeight / 3) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});
