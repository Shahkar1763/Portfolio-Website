/* =========================================================
   PERSONAL PORTFOLIO — MAIN JAVASCRIPT
   Author: Muhammad Ali
   Table of Contents:
   1. Sticky Navbar on Scroll
   2. Mobile Hamburger Menu
   3. Dark / Light Mode Toggle
   4. Typing Animation (Hero Section)
   5. Active Navigation Link on Scroll
   6. Fade-in on Scroll (Intersection Observer)
   7. Animated Skill Progress Bars
   8. Animated Statistics Counter
   9. Testimonials Slider
   10. Contact Form Validation
   11. Scroll To Top Button
   12. Current Year in Footer
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. STICKY NAVBAR ON SCROLL
     Adds a background/shadow to the navbar once the user
     scrolls past the top of the page.
     ========================================================= */
  const navbar = document.getElementById("navbar");

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll();


  /* =========================================================
     2. MOBILE HAMBURGER MENU
     Toggles the mobile navigation menu open/closed and
     closes it automatically when a link is clicked.
     ========================================================= */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav__link");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    const icon = navToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
      const icon = navToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });


  /* =========================================================
     3. DARK / LIGHT MODE TOGGLE
     Saves the user's preference in localStorage so it
     persists between visits.
     ========================================================= */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const body = document.body;

  // Load saved theme on page load
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");

    // Swap icon between moon (light mode) and sun (dark mode)
    themeIcon.classList.toggle("fa-moon", !isDark);
    themeIcon.classList.toggle("fa-sun", isDark);

    // Save preference
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  });


  /* =========================================================
     4. TYPING ANIMATION (HERO SECTION)
     Cycles through a list of job titles/roles, typing and
     deleting each one character by character.
     ========================================================= */
  const typingText = document.getElementById("typingText");
  const rolesToType = [
    "Full Stack Developer",
    "Frontend Developer",
    "AI Engineer",
    "Computer Vision Enthusiast",
    "UI/UX Focused Coder"
  ];

  let roleIndex = 0;      // which word we're on
  let charIndex = 0;      // which character of the word we're on
  let isDeleting = false; // are we typing or deleting?

  function typeEffect() {
    const currentRole = rolesToType[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    // Typing speed vs deleting speed
    let typeSpeed = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of the word before deleting
      typeSpeed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % rolesToType.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingText) {
    typeEffect();
  }


  /* =========================================================
     5. ACTIVE NAVIGATION LINK ON SCROLL
     Highlights the nav link that matches the section
     currently in view.
     ========================================================= */
  const sections = document.querySelectorAll("section[id]");

  function highlightActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");
      const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

      if (!link) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav__link").forEach((l) => l.classList.remove("active-link"));
        link.classList.add("active-link");
      }
    });
  }
  window.addEventListener("scroll", highlightActiveLink);


  /* =========================================================
     6. FADE-IN ON SCROLL (Intersection Observer)
     Reveals elements with the .fade-in class as they enter
     the viewport. Also triggers skill bars & counters once
     their parent sections become visible.
     ========================================================= */
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));


  /* =========================================================
     7. ANIMATED SKILL PROGRESS BARS
     Fills each skill bar to its target percentage once the
     Skills section scrolls into view.
     ========================================================= */
  const skillsSection = document.getElementById("skills");
  const skillFills = document.querySelectorAll(".skill-bar__fill");
  let skillsAnimated = false;

  function animateSkillBars() {
    skillFills.forEach((fill) => {
      const targetWidth = fill.getAttribute("data-width");
      fill.style.width = targetWidth + "%";
    });
  }

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          animateSkillBars();
          skillsAnimated = true;
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }


  /* =========================================================
     8. ANIMATED STATISTICS COUNTER
     Counts up each number from 0 to its target value once
     the Statistics section is scrolled into view.
     ========================================================= */
  const statNumbers = document.querySelectorAll(".stat-number");
  let statsAnimated = false;

  function animateCounters() {
    statNumbers.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const duration = 1500; // total animation time in ms
      const frameRate = 16;  // ~60fps
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counterInterval = setInterval(() => {
        frame++;
        // Ease-out effect for a smoother finish
        const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
        const currentValue = Math.round(target * progress);
        counter.textContent = currentValue;

        if (frame === totalFrames) {
          counter.textContent = target;
          clearInterval(counterInterval);
        }
      }, frameRate);
    });
  }

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            animateCounters();
            statsAnimated = true;
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(statsSection);
  }


  /* =========================================================
     9. TESTIMONIALS SLIDER
     A simple, dependency-free slider with next/prev buttons
     and clickable dots. Auto-advances every 6 seconds.
     ========================================================= */
  const track = document.getElementById("testimonialTrack");
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  let currentSlide = 0;
  let autoSlideInterval;

  // Build the dots dynamically based on number of slides
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll(".testimonial-dots span");

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  if (track && slides.length > 0) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });

    startAutoSlide();
  }


  /* =========================================================
     10. CONTACT FORM VALIDATION
     Simple client-side validation with inline error messages.
     Since there is no backend, we simulate a successful send.
     ========================================================= */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const subjectError = document.getElementById("subjectError");
      const messageError = document.getElementById("messageError");

      // Reset previous errors
      [nameError, emailError, subjectError, messageError].forEach((el) => (el.textContent = ""));
      formSuccess.classList.remove("show");

      // Validate name
      if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Please enter your full name.";
        isValid = false;
      }

      // Validate email with a simple regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      // Validate subject
      if (subjectInput.value.trim().length < 3) {
        subjectError.textContent = "Subject must be at least 3 characters.";
        isValid = false;
      }

      // Validate message
      if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Message should be at least 10 characters.";
        isValid = false;
      }

      if (isValid) {
        // In a real project, you'd send this data to a server here.
        formSuccess.classList.add("show");
        contactForm.reset();

        // Hide the success message after a few seconds
        setTimeout(() => formSuccess.classList.remove("show"), 5000);
      }
    });
  }


  /* =========================================================
     11. SCROLL TO TOP BUTTON
     Shows the button after scrolling down, scrolls smoothly
     back to the top when clicked.
     ========================================================= */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* =========================================================
     12. CURRENT YEAR IN FOOTER
     Automatically updates the copyright year.
     ========================================================= */
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
