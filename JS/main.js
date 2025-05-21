window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    const navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    
    // Shrink the navbar on scroll
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
                    top: targetSection.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Bootstrap scrollspy initialization
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    //form handler
    // Initialize EmailJS with your public key
emailjs.init("jqJE1ffervnm4dJ-z");

// Function to validate form inputs
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

// Function to show feedback messages
function showFeedbackMessage(success) {
    const successMsg = document.getElementById('submitSuccessMessage');
    const errorMsg = document.getElementById('submitErrorMessage');

    if (success) {
        successMsg.classList.remove('d-none');
        errorMsg.classList.add('d-none');
        successMsg.scrollIntoView({ behavior: 'smooth' }); // scroll to it
    } else {
        successMsg.classList.add('d-none');
        errorMsg.classList.remove('d-none');
        errorMsg.scrollIntoView({ behavior: 'smooth' }); // scroll to error
    }
}

// Add event listener to the submit button
document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        institution: document.getElementById('institution').value.trim(),
        location: document.getElementById('location').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim(),
    };

    // Log form data for debugging (remove in production)
    console.log("Form Data Collected:", formData);

    // Validate form data
    if (!validateForm(formData)) {
        return;
    }

    // Send data via EmailJS
    emailjs.send("service_6vfh60m", "template_amm1rca", formData)
        .then((response) => {
            console.log("Email sent successfully:", response); // Log success response
            showFeedbackMessage(true); // Show success message
        })
        .catch((error) => {
            console.error("Error sending email:", error); // Log error response
            showFeedbackMessage(false); // Show error message
        });
});


    // Collapse the responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.forEach(responsiveNavItem => {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for gallery items
    new SimpleLightbox({
        elements: '#gallery a.gallery-box'
    });

    // Trigger navbar shrink on page load (if necessary)
    navbarShrink();

    // Form validation (uncomment if needed)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', event => {
            const inputs = document.querySelectorAll('input[required], textarea[required]');
            let valid = true;

            inputs.forEach(input => {
                if (!input.value) {
                    valid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!valid) {
                event.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }
});
