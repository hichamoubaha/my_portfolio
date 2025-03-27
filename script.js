document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button")
    const mobileMenu = document.getElementById("mobile-menu")
  
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
  
      // Toggle icon between bars and X
      const icon = mobileMenuButton.querySelector("i")
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-link")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
        const icon = mobileMenuButton.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      })
    })
  
    // Skills Filter
    const skillFilters = document.querySelectorAll(".skill-filter")
    const skillCards = document.querySelectorAll(".skill-card")
  
    skillFilters.forEach((filter) => {
      filter.addEventListener("click", function () {
        // Remove active class from all filters
        skillFilters.forEach((f) => f.classList.remove("active"))
  
        // Add active class to clicked filter
        this.classList.add("active")
  
        const category = this.getAttribute("data-filter")
  
        // Show/hide skill cards based on category
        skillCards.forEach((card) => {
          if (category === "all") {
            card.style.display = "flex"
          } else if (card.getAttribute("data-category") === category) {
            card.style.display = "flex"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle")
    const htmlElement = document.documentElement
    const themeIcon = themeToggle.querySelector("i")
  
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      htmlElement.classList.add("dark")
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    }
  
    themeToggle.addEventListener("click", () => {
      htmlElement.classList.toggle("dark")
  
      // Toggle icon between moon and sun
      if (themeIcon.classList.contains("fa-moon")) {
        themeIcon.classList.remove("fa-moon")
        themeIcon.classList.add("fa-sun")
        localStorage.setItem("theme", "dark")
      } else {
        themeIcon.classList.remove("fa-sun")
        themeIcon.classList.add("fa-moon")
        localStorage.setItem("theme", "light")
      }
    })
  
    // Form Submission
    const contactForm = document.getElementById("contact-form")
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value
  
      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return
      }
  
      // In a real application, you would send this data to a server
      // For demo purposes, we'll just show an alert
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`)
  
      // Reset form
      contactForm.reset()
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          // Offset for fixed header
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        // Offset for fixed header
        const headerHeight = document.querySelector("header").offsetHeight
  
        if (pageYOffset >= sectionTop - headerHeight - 100) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("text-indigo-600")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("text-indigo-600")
        }
      })
    })
  
    // Animation on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll(".project-card, .skill-card, .timeline-item")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll(".project-card, .skill-card, .timeline-item")
    animatedElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    })
  
    // Run animation on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
  })
  
  