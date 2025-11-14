window.addEventListener('DOMContentLoaded', () => {

    // Navbar shrink
    const navbarShrink = () => {
        const navbarCollapsible = document.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        navbarCollapsible.classList.toggle('navbar-shrink', window.scrollY > 0);
    };
    document.addEventListener('scroll', navbarShrink);
    navbarShrink();

    // Collapse navbar on link click (mobile fix)
    const navbarToggler = document.querySelector('.navbar-toggler');
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(item => {
        item.addEventListener('click', () => {
            if (getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //Typewriter effect
    function typeWriterEffect(element, speed = 70) {
    const text = element.getAttribute('data-text');
    element.textContent = "";
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // ✅ Remove the cursor after typing finishes
            element.style.borderRight = "none";
        }
    }
    type();
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriterEffect(entry.target);
                observer.unobserve(entry.target);
            }            
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.typewriter-text').forEach(el => observer.observe(el));

    document.addEventListener("DOMContentLoaded", () => {
  const gallerySection = document.querySelector("#moving-gallery");
  const rows = document.querySelectorAll(".image-row");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start the animations when in view
          rows[0].classList.add("animate-left");
          rows[1].classList.add("animate-right");
          rows[2].classList.add("animate-left");
        } else {
          // Stop when out of view
          rows.forEach((row) => {
            row.classList.remove("animate-left", "animate-right");
          });
        }
      });
    },
    { threshold: 0.3 } // activate when 30% of section is visible
  );

  observer.observe(gallerySection);
});

// === Initiatives Moving Gallery Observer ===
const gallerySection = document.querySelector('.moving-gallery-section');
const galleryRows = gallerySection.querySelectorAll('.image-row');

// add animation classes once on load
galleryRows.forEach((row, i) => {
  row.classList.add(i % 2 === 0 ? 'animate-left' : 'animate-right');
});

const galleryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gallerySection.classList.add('active');
      galleryRows.forEach(row => row.style.animationPlayState = 'running');
    } else {
      galleryRows.forEach(row => row.style.animationPlayState = 'paused');
    }
  });
}, { threshold: 0.3 });

galleryObserver.observe(gallerySection);


        // ✅ PEEK-BOT RANDOM POP EFFECT
    // ---------------------------

    const peekSection = document.querySelector(".peekbot-section");
    const bot = document.querySelector(".peek-bot");

    let botActive = false;   // replaces isActive
    let botPopping = false;  // replaces popping

    const peekObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        botActive = true;
        startBotPop();
        } else {
        botActive = false;
        bot.classList.remove("visible");
        }
    });
    }, { threshold: 0.5 });

    peekObserver.observe(peekSection);


    // ✅ Random pop loop (renamed safely)
    function startBotPop() {
    if (botPopping) return;
    botPopping = true;

    function popCycle() {
        if (!botActive) {
        botPopping = false;
        return;
        }

        bot.classList.add("visible");

        setTimeout(() => {
        bot.classList.remove("visible");

        const delay = Math.random() * 3000 + 2000;

        setTimeout(popCycle, delay);
        }, Math.random() * 5000 + 3000);
    }

    popCycle();
    }

// === ROVERBOT WALK ANIMATION OBSERVER (LOOP + PAUSE WHEN NOT VISIBLE) ===
const roverBot = document.querySelector(".roverbot");
const footer = document.querySelector("footer");

const roverObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Footer visible → start walking
            roverBot.style.animationPlayState = "running";
            roverBot.style.opacity = "1";
        } else {
            // Footer not visible → pause walking
            roverBot.style.animationPlayState = "paused";
        }
    });
}, { threshold: 0.2 });

roverObserver.observe(footer);

    // intl-tel-input setup
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "auto",
        geoIpLookup: callback => {
            fetch("https://ipinfo.io/json?token=YOUR_TOKEN_HERE")
                .then(resp => resp.json())
                .then(resp => callback(resp.country))
                .catch(() => callback("us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    // Allow only digits (preserving plugin formatting)
    phoneInput.addEventListener('input', () => {
        let digits = phoneInput.value.replace(/[^\d\s\-\(\)\+]/g, ''); 
        phoneInput.value = digits;
    });

    // Form submit
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            institution: document.getElementById('institution').value.trim(),
            location: document.getElementById('location').value.trim(),
            phone: iti.getNumber(), // formatted full number with country code
            message: document.getElementById('message').value.trim(),
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert("Please fill in all required fields.");
            return;
        }

        // Corrected email validation regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!iti.isValidNumber()) {
            alert("Please enter a valid phone number.");
            return;
        }

        // ✅ Send to EmailJS
            emailjs.send("service_6vfh60m", "template_amm1rca", formData)
        .then(() => {
            document.getElementById('submitSuccessMessage').classList.remove('d-none');
            form.reset();
            iti.setCountry("auto");
        })
        .catch((err) => {
            console.error(err);
            document.getElementById('submitErrorMessage').classList.remove('d-none');
        });


    });

    // SimpleLightbox init
    new SimpleLightbox({ elements: '#gallery a.gallery-box' });
});
