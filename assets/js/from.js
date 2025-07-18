// Form handling and validation
class FormHandler {
  constructor() {
    // Select the form element by its ID
    this.form = document.querySelector('#applicationForm');
    // API endpoint for form submission
    this.apiUrl = 'https://alliances.lerionjakenwauda.com/form-api.php';
    
    // Initialize form handler if form exists
    if (this.form) {
      this.init();
    }
  }

  // Initialize all form features and event listeners
  init() {
    this.setupEventListeners();
    this.initializeDomainPreview();
    this.initializeSocialMediaToggle();
    this.initializeTermsModal();
    this.initializeCaptcha();
  }

  // Set up all event listeners for form fields and UI elements
  setupEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    });

    // Real-time validation for all input, textarea, and select fields
    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => {
        this.validateField(field);
      });
      
      field.addEventListener('input', () => {
        this.clearFieldError(field);
      });
    });

    // Domain name and TLD inputs for live preview
    const domainNameInput = this.form.querySelector('#domainName');
    const tldSelect = this.form.querySelector('#tld');
    
    if (domainNameInput && tldSelect) {
      domainNameInput.addEventListener('input', () => this.updateDomainPreview());
      tldSelect.addEventListener('change', () => this.updateDomainPreview());
    }

    // Social media usage toggle
    const socialMediaToggles = this.form.querySelectorAll('input[name="socialMediaUsage"]');
    socialMediaToggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        this.toggleSocialMediaFields(e.target.value === 'yes');
      });
    });

    // Terms and conditions modal
    const termsLink = this.form.querySelector('#termsLink');
    const termsModal = document.querySelector('#termsModal');
    const termsClose = document.querySelector('#termsClose');
    
    if (termsLink && termsModal) {
      termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showTermsModal();
      });
    }
    
    if (termsClose) {
      termsClose.addEventListener('click', () => {
        this.hideTermsModal();
      });
    }

    // Close modal when clicking outside
    if (termsModal) {
      termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) {
          this.hideTermsModal();
        }
      });
    }
  }

  initializeDomainPreview() {
    const domainPreview = this.form.querySelector('.domain-preview');
    if (domainPreview) {
      domainPreview.textContent = 'yourbusiness.com';
    }
  }

  updateDomainPreview() {
    const domainName = this.form.querySelector('#domainName').value.trim();
    const tld = this.form.querySelector('#tld').value;
    const domainPreview = this.form.querySelector('.domain-preview');
    
    if (domainPreview) {
      if (domainName) {
        domainPreview.textContent = `${domainName}${tld}`;
      } else {
        domainPreview.textContent = `yourbusiness${tld}`;
      }
    }
  }

  initializeSocialMediaToggle() {
    const socialMediaToggle = this.form.querySelector('input[name="socialMediaUsage"]:checked');
    if (socialMediaToggle) {
      this.toggleSocialMediaFields(socialMediaToggle.value === 'yes');
    } else {
      // Default to hidden
      this.toggleSocialMediaFields(false);
    }
  }

  toggleSocialMediaFields(show) {
    const socialMediaFields = this.form.querySelector('.social-media-fields');
    if (socialMediaFields) {
      if (show) {
        socialMediaFields.classList.add('show');
        // Clear any previous values when showing
        socialMediaFields.querySelectorAll('input, textarea').forEach(input => {
          input.value = '';
        });
      } else {
        socialMediaFields.classList.remove('show');
        // Clear values when hiding
        socialMediaFields.querySelectorAll('input, textarea').forEach(input => {
          input.value = '';
        });
      }
    }
  }

  initializeTermsModal() {
    // Modal is already in HTML, just ensure it's hidden initially
    const termsModal = document.querySelector('#termsModal');
    if (termsModal) {
      termsModal.classList.remove('show');
    }
  }

  showTermsModal() {
    const termsModal = document.querySelector('#termsModal');
    if (termsModal) {
      termsModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  hideTermsModal() {
    const termsModal = document.querySelector('#termsModal');
    if (termsModal) {
      termsModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  initializeCaptcha() {
    // Wait for Cloudflare Turnstile to load
    if (typeof turnstile !== 'undefined') {
      turnstile.ready(() => {
        console.log('Cloudflare Turnstile is ready');
      });
    } else {
      // If turnstile is not loaded yet, wait for it
      window.addEventListener('load', () => {
        if (typeof turnstile !== 'undefined') {
          turnstile.ready(() => {
            console.log('Cloudflare Turnstile is ready');
          });
        }
      });
    }
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.required && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }

    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }

    // Phone validation
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
      }
    }

    // Domain name validation
    if (fieldName === 'domainName' && value) {
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/;
      if (!domainRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid domain name.';
      }
    }

    // Company size validation
    if (fieldName === 'companySize' && value) {
      const size = parseInt(value);
      if (isNaN(size) || size < 1 || size > 10000) {
        isValid = false;
        errorMessage = 'Please enter a valid company size (1-10,000).';
      }
    }

    // Website traffic validation
    if (fieldName === 'monthlyTraffic' && value) {
      const traffic = parseInt(value);
      if (isNaN(traffic) || traffic < 0) {
        isValid = false;
        errorMessage = 'Please enter a valid monthly traffic number.';
      }
    }

    // Social media validation (optional fields)
    if (fieldName.includes('social') && value) {
      // Validate social media URLs if provided
      if (fieldName === 'facebook' || fieldName === 'linkedin') {
        try {
          new URL(value);
        } catch {
          isValid = false;
          errorMessage = 'Please enter a valid URL.';
        }
      }
    }

    this.showFieldError(field, isValid, errorMessage);
    return isValid;
  }

  showFieldError(field, isValid, message) {
    const errorElement = field.parentNode.querySelector('.error-message');
    
    if (!isValid) {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
      }
    } else {
      this.clearFieldError(field);
    }
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }

  validateForm() {
    let isValid = true;
    const requiredFields = this.form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    // Check CAPTCHA
    const captchaResponse = this.getCaptchaResponse();
    if (!captchaResponse) {
      isValid = false;
      this.showFormError('Please complete the CAPTCHA verification.');
      return false;
    }

    // Check terms agreement
    const termsAgreed = this.form.querySelector('#termsAgreed').checked;
    if (!termsAgreed) {
      isValid = false;
      this.showFormError('You must agree to the terms and conditions.');
      return false;
    }

    return isValid;
  }

  getCaptchaResponse() {
    // For Cloudflare Turnstile, we need to get the response token
    // The token is automatically added to the form when CAPTCHA is completed
    const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]');
    return turnstileResponse ? turnstileResponse.value : null;
  }

  showFormError(message) {
    // Remove existing error messages
    this.clearFormErrors();
    
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.parentNode.insertBefore(errorDiv, submitButton);
    }
  }

  clearFormErrors() {
    const errorMessages = this.form.querySelectorAll('.error');
    errorMessages.forEach(error => {
      if (!error.classList.contains('error-message')) {
        error.remove();
      }
    });
  }

  async handleFormSubmission() {
    // Clear previous errors
    this.clearFormErrors();

    // Validate form
    if (!this.validateForm()) {
      return;
    }
      // Check domain availability before submitting
    const domainName = this.form.querySelector('#domainName').value.trim();
    const available = await checkDomainAvailability(domainName);
    if (!available) {
      const errorElement = this.form.querySelector('#domainName').parentNode.querySelector('.error-message');
      errorElement.textContent = 'Domain not available. Please choose another.';
      errorElement.classList.add('show');
      return;
    }

    
    // Show loading state
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Submitting...';

    try {
      // Prepare form data
      const formData = new FormData(this.form);
      
      // Add CAPTCHA response
      const captchaResponse = this.getCaptchaResponse();
      if (captchaResponse) {
        formData.append('cf-turnstile-response', captchaResponse);
      }

      // Submit to API
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData
      });

      let result;
      try {
        result = await response.json();
      } catch (e) {
        // If response is not JSON, treat as success
        if (response.ok) {
          this.showSuccessMessage('Application submitted successfully!');
          this.form.reset();
          this.initializeDomainPreview();
          this.toggleSocialMediaFields(false);
          return;
        } else {
          throw new Error('Invalid response format');
        }
      }

    //   Get social media usage value
    const socialMediaUsage = this.form.querySelector('input[name="socialMediaUsage"]:checked')?.value;

    // Show appropriate message
    if (socialMediaUsage === 'yes') {
      this.showSuccessMessage('Congratulations! You have been accepted into the program. You will receive a confirmation email shortly.');
    } else if (socialMediaUsage === 'no') {
      this.showRejectionMessage('Thank you for your interest, but unfortunately you were not accepted into the program at this time.');
    } else {
      this.showFormError('Please answer the social media usage question.');
      return;
    }
        // Reset the form
    // this.form.reset();
    // this.initializeDomainPreview();
    // this.toggleSocialMediaFields(false);

      if (response.ok && result.success) {
        this.showSuccessMessage(result.message || 'Application submitted successfully!');
        this.form.reset();
        this.initializeDomainPreview();
        this.toggleSocialMediaFields(false);
      } else {
        this.showFormError(result.message || 'Failed to submit application. Please try again.');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormError('An error occurred while submitting your application. Please try again.');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }


  }

  showSuccessMessage(message) {
    // Remove existing messages
    this.clearFormErrors();
    
    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.innerHTML = `
      <h4>Application Submitted Successfully!</h4>
      <p>${message}</p>
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>You will receive a confirmation email shortly</li>
        <li>Our team will review your application within 2-3 business days</li>
        <li>We will contact you with further instructions</li>
      </ul>
    `;
    
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.parentNode.insertBefore(successDiv, submitButton);
    }

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

  }

   showRejectionMessage(message) {
    // Remove existing messages
    this.clearFormErrors();
    // Create and show rejection message
    const rejectDiv = document.createElement('div');
    rejectDiv.className = 'error';
    rejectDiv.innerHTML = `
      <h4>Application Not Accepted</h4>
      <p>${message}</p>
    `;
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.parentNode.insertBefore(rejectDiv, submitButton);
    }
    // Scroll to message
    rejectDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormHandler();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormHandler;
} 

// Defer loading of Cloudflare Turnstile until after site has loaded
window.addEventListener('load', function() {
  var turnstileScript = document.createElement('script');
  turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  turnstileScript.async = true;
  turnstileScript.defer = true;
  document.body.appendChild(turnstileScript);
}); 