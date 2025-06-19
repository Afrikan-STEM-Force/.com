window.addEventListener('DOMContentLoaded', event => {
    // Shrink navbar on scroll
    const navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };
    document.addEventListener('scroll', navbarShrink);

    // Smooth scrolling for nav links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scrollspy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Initialize EmailJS
    emailjs.init("jqJE1ffervnm4dJ-z"); // Replace with your actual EmailJS public key

    // Enforce numeric-only input for phone field
    document.getElementById('phone').addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

    //zip codes etc
     const phoneInput = document.querySelector("#phone");
  const dialCodeSpan = document.getElementById("dial-code");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    nationalMode: true, // User enters national number only
    geoIpLookup: callback => {
      fetch("https://ipinfo.io/json?token=your_token_here")
        .then(resp => resp.json())
        .then(resp => callback(resp.country))
        .catch(() => callback("us"));
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });

  phoneInput.addEventListener("countrychange", function () {
    const selectedDialCode = iti.getSelectedCountryData().dialCode;
    dialCodeSpan.textContent = `+${selectedDialCode}`;
  });
    // Validate form inputs
    function validateForm(formData) {
        const { name, email, phone, message } = formData;
        if (!name || !email || !phone || !message) {
            alert("Please fill in all required fields.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        return true;
    }

    // Show success or error message
    function showFeedbackMessage(success) {
        const successMsg = document.getElementById('submitSuccessMessage');
        const errorMsg = document.getElementById('submitErrorMessage');
        if (success) {
            successMsg.classList.remove('d-none');
            errorMsg.classList.add('d-none');
            successMsg.scrollIntoView({ behavior: 'smooth' });
        } else {
            successMsg.classList.add('d-none');
            errorMsg.classList.remove('d-none');
            errorMsg.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Submit button click handler
    document.getElementById('submitButton').addEventListener('click', function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            institution: document.getElementById('institution').value.trim(),
            location: document.getElementById('location').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim(),
        };

        const formattedPhone = iti.getNumber(); // e.g. "+233541234567"'
        const fullPhone = `${dialCodeSpan.textContent}${phoneInput.value}`;

        console.log("Form Data Collected:", formData);

        if (!validateForm(formData)) return;

        emailjs.send("service_6vfh60m", "template_amm1rca", formData)
            .then((response) => {
                console.log("Email sent successfully:", response.status, response.text);
                showFeedbackMessage(true);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
                showFeedbackMessage(false);
            });
    });

    // Collapse responsive navbar after link click
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.forEach(responsiveNavItem => {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox
    new SimpleLightbox({ elements: '#gallery a.gallery-box' });

    // Trigger shrink on load
    navbarShrink();
});
