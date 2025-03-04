// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  const backToTop = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
      backToTop.classList.add("active")
    } else {
      navbar.classList.remove("scrolled")
      backToTop.classList.remove("active")
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler")
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      }
    })
  })

  // Active nav link on scroll
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      const navbarHeight = document.querySelector(".navbar").offsetHeight

      if (window.scrollY >= sectionTop - navbarHeight - 50) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For demonstration, we'll just log it and show an alert
      console.log("Form submitted:", { name, email, subject, message })

      // Show success message (in a real application, you'd do this after successful AJAX)
      alert("Thank you for your message! I will get back to you soon.")

      // Reset form
      contactForm.reset()
    })
  }

  // 3D Tilt Effect for cards
  const tiltElements = document.querySelectorAll(".skill-card, .project-card, .testimonial-card")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = x / rect.width
      const yPercent = y / rect.height

      const maxTilt = 10
      const tiltX = (0.5 - yPercent) * maxTilt
      const tiltY = (xPercent - 0.5) * maxTilt

      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    })
  })

  // Parallax effect
  const parallaxElements = document.querySelectorAll(".parallax-element")

  window.addEventListener("scroll", () => {
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5
      const yPos = -(window.scrollY * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".skill-card, .project-card, .testimonial-card, .contact-info, .contact-form",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate-in")
      }
    })
  }

  // Set initial state for animation
  document
    .querySelectorAll(".skill-card, .project-card, .testimonial-card, .contact-info, .contact-form")
    .forEach((element) => {
      element.classList.add("animate-ready")
    })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle")
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")

      // Save preference to localStorage
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled")
      } else {
        localStorage.setItem("darkMode", "disabled")
      }
    })

    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark")
    }
  }

  // Progress bar animation
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll(".progress-bar")

    progressBars.forEach((bar) => {
      const value = bar.getAttribute("aria-valuenow") + "%"
      bar.style.width = "0%"

      setTimeout(() => {
        bar.style.width = value
      }, 100)
    })
  }

  // Run progress bar animation when skills section is in view
  const skillsSection = document.getElementById("skills")
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgressBars()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(skillsSection)
  }
})

