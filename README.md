
# Lerion Alliance Program Website

This is the website for the Lerion Jake Nwauda Digital Innovations Alliance Program. It's basically a platform where businesses can apply to join our exclusive partnership program and get access to premium digital services.

## What This Project Does

The main goal is to showcase our alliance program and make it super easy for businesses to apply. We have:
- A clean, modern landing page that explains what we do
- An application form that collects all the info we need
- FAQ section to answer common questions
- Contact page for getting in touch
- About page telling our story

## Tech Stack

I built this using:
- **HTML5** for structure
- **CSS3** with custom variables and glassmorphism effects
- **Vanilla JavaScript** for interactivity
- **Bootstrap 5** for responsive grid and components
- **Cloudflare Turnstile** for CAPTCHA protection
- **Google Fonts** (Inter) for typography

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local server (like Live Server in VS Code) for testing

### Installation
1. Clone or download this repo
2. Open the project folder in your code editor
3. Start a local server (I use Live Server extension)
4. Open `index.html` in your browser

### Testing the Form
The application form (`apply.html`) has some cool features:
- **Domain preview**: Type a domain name and see it update in real-time
- **Social media toggle**: Choose yes/no to show/hide social media fields
- **Real-time validation**: Get instant feedback on form fields
- **CAPTCHA protection**: Cloudflare Turnstile keeps bots out

## Performance & Security Features

### Image Optimization
I made sure the site loads fast by:
- Compressing all images to reduce file sizes
- Using WebP format where possible (with JPEG fallbacks)
- Adding `loading="lazy"` to images below the fold
- Optimizing SVGs for icons

### HTTPS Security
- All form submissions go through HTTPS
- External resources (fonts, scripts) load over HTTPS
- No mixed content warnings here!

### Smooth Animations
I added some subtle animations to make the site feel more polished:
- **Fade-up effects**: Sections animate in as you scroll
- **Smooth transitions**: Buttons and cards have hover effects
- **Loading states**: Form submission shows loading indicators

## Challenges I Ran Into

### Safari's Picky About Glassmorphism
Safari browser was being a pain with the glassmorphism effects. Sometimes the backdrop-filter just wouldn't work, or it'd look totally different than in Chrome. I ended up adding fallbacks and testing with different blur settings. Still not perfect, but it works well enough.

### CAPTCHA Setup Headaches
Getting the Cloudflare Turnstile widget to show up was tricky. 
At first, I forgot to include the script, then I used the wrong site key.
 The widget just wouldn't appear! After some trial and error, I figured out the script needs to load after the form, and the site key has to be exactly right.

### JavaScript Timing Issues
Loading the header and footer dynamically with JavaScript caused some problems. The theme switch and dropdown toggles wouldn't work because the elements weren't in the DOM when the scripts ran. I solved this by moving all the related JS inside the load callback.

### Cross-Browser Testing
Making sure everything works in Chrome, Firefox, Safari, and Edge took way longer than expected. The form validation, domain preview, and social media toggles all needed tweaking to work consistently.

### Mobile Performance
The site was loading slowly on mobile, mostly because of large images. I compressed everything and added lazy loading, which helped a lot.

### HTTPS Mixed Content
Had some mixed content warnings because some resources were loading over HTTP. Fixed that by updating all URLs to use HTTPS.



## Custom Features

## Custom Features

### Form Validation
Built a custom validation system that checks fields in real-time and shows helpful error messages. It validates emails, phone numbers, domain names, and required fields.

### Theme Toggle
Added a dark/light mode toggle that saves the user's preference in localStorage. The theme switch is in the header and works across all pages.

### FAQ Accordion
The FAQ section uses custom JavaScript to expand/collapse answers with smooth animations. Only one answer can be open at a time.

### Dropdown Navigation
The navigation dropdowns have custom arrow icons that rotate when opened/closed. Uses Bootstrap's dropdown system with custom styling.

## File Structure

```
├── index.html              # Landing page
├── apply.html              # Application form
├── about.html              # About us page
├── contact.html            # Contact page
├── faq.html               # FAQ page
├── alliance-program.html   # Program details
├── components/
│   ├── header.html        # Navigation header
│   └── footer.html        # Site footer
├── assets/
│   ├── css/
│   │   ├── style.css      # Main styles
│   │   ├── utility.css    # Utility classes
│   │   ├── variable.css   # CSS variables
│   │   └── media_queue.css # Media queries
│   ├── js/
│   │   ├── script.js      # Main JavaScript
│   │   └── from.js        # Form handling
│   └── images/            # Optimized images
└── Readme                 # This file
```

## Future Improvements

If I had more time, I'd probably:
- Add more animations and micro-interactions
- Implement a blog section
- Add user accounts for alliance members
- Create an admin panel for managing applications
- Add more accessibility features
- Implement PWA features for mobile

## Contact

If you have questions about this project or want to join the alliance program, hit me up at info@lerionjakenwauda.com

---


