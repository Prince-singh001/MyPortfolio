/* ===============================
   PORTFOLIO MAIN JAVASCRIPT
   Modern + Responsive + Attractive
================================= */

(() => {
  "use strict";

  /* ===============================
     SAFE LUCIDE ICON INIT
  ================================= */

  const initIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  /* ===============================
     DOM READY
  ================================= */

  document.addEventListener("DOMContentLoaded", () => {
    initIcons();

    /* ===============================
       STICKY HEADER
    ================================= */

    const header = document.getElementById("header");

    const handleHeaderScroll = () => {
      if (!header) return;

      const isScrolled = window.scrollY > 40;
      header.classList.toggle("glass-effect", isScrolled);
      header.classList.toggle("header-scrolled", isScrolled);
    };

    handleHeaderScroll();
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });

    /* ===============================
       MOBILE MENU
    ================================= */

    const mobileBtn = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const closeMobileMenu = () => {
      if (!mobileMenu || !mobileBtn) return;

      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("menu-open");
      mobileBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-active");
    };

    const openMobileMenu = () => {
      if (!mobileMenu || !mobileBtn) return;

      mobileMenu.classList.remove("hidden");
      requestAnimationFrame(() => {
        mobileMenu.classList.add("menu-open");
      });

      mobileBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-active");
    };

    if (mobileBtn && mobileMenu) {
      mobileBtn.setAttribute("aria-label", "Toggle navigation menu");
      mobileBtn.setAttribute("aria-expanded", "false");

      mobileBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = !mobileMenu.classList.contains("hidden");

        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });

      mobileLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
      });

      document.addEventListener("click", (event) => {
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedButton = mobileBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {
          closeMobileMenu();
        }
      });

      window.addEventListener(
        "resize",
        () => {
          if (window.innerWidth >= 768) {
            closeMobileMenu();
          }
        },
        { passive: true },
      );

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMobileMenu();
        }
      });
    }

    /* ===============================
       SMOOTH ACTIVE NAV LINK
    ================================= */

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        closeMobileMenu();
      });
    });

    const sections = document.querySelectorAll("section[id]");

    if (
      sections.length &&
      navLinks.length &&
      "IntersectionObserver" in window
    ) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute("id");

            navLinks.forEach((link) => {
              const isActive = link.getAttribute("href") === `#${id}`;
              link.classList.toggle("active-link", isActive);
            });
          });
        },
        {
          root: null,
          threshold: 0.45,
        },
      );

      sections.forEach((section) => navObserver.observe(section));
    }

    /* ===============================
       TYPING EFFECT
    ================================= */

    const typingElement = document.getElementById("typing-effect");

    if (typingElement && typeof window.Typed !== "undefined") {
      new window.Typed("#typing-effect", {
        strings: [
          "Python Developer",
          "Full Stack Developer",
          "Frontend Developer",
          "Backend Developer",
          "AI / ML Enthusiast",
        ],
        typeSpeed: 55,
        backSpeed: 28,
        backDelay: 1300,
        startDelay: 300,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    } else if (typingElement) {
      typingElement.textContent = "Python Developer";
    }

    /* ===============================
       SCROLL REVEAL ANIMATION
    ================================= */

    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length > 0 && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      reveals.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
        revealObserver.observe(item);
      });
    } else {
      reveals.forEach((item) => item.classList.add("visible"));
    }

    /* ===============================
       RESUME DROPDOWN
    ================================= */

    const resumeBtn = document.getElementById("resumeBtn");
    const resumeMenu = document.getElementById("resumeMenu");

    const closeResumeMenu = () => {
      if (!resumeMenu || !resumeBtn) return;

      resumeMenu.classList.add("hidden");
      resumeMenu.classList.remove("resume-open");
      resumeBtn.setAttribute("aria-expanded", "false");
    };

    if (resumeBtn && resumeMenu) {
      resumeBtn.setAttribute("aria-haspopup", "true");
      resumeBtn.setAttribute("aria-expanded", "false");

      resumeBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = !resumeMenu.classList.contains("hidden");

        if (isOpen) {
          closeResumeMenu();
        } else {
          resumeMenu.classList.remove("hidden");
          requestAnimationFrame(() => {
            resumeMenu.classList.add("resume-open");
          });
          resumeBtn.setAttribute("aria-expanded", "true");
        }
      });

      resumeMenu.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      document.addEventListener("click", closeResumeMenu);

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeResumeMenu();
        }
      });
    }

    /* ===============================
       SKILLS TAB SWITCH
    ================================= */

    const tabs = document.querySelectorAll(".tab-button");
    const panels = document.querySelectorAll(".skills-panel");

    if (tabs.length > 0 && panels.length > 0) {
      tabs.forEach((tab) => {
        tab.setAttribute("role", "tab");

        tab.addEventListener("click", () => {
          const tabName = tab.dataset.tab;
          const panel = document.getElementById(`${tabName}-panel`);

          if (!panel) return;

          tabs.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-selected", "false");
          });

          panels.forEach((item) => {
            item.classList.remove("active");
          });

          tab.classList.add("active");
          tab.setAttribute("aria-selected", "true");
          panel.classList.add("active");
        });
      });
    }

    /* ===============================
       SKILL BAR ANIMATION
    ================================= */

    const skillBars = document.querySelectorAll(".skill-bar-fill");

    if (skillBars.length > 0 && "IntersectionObserver" in window) {
      const skillObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const bar = entry.target;
            const width = bar.dataset.width || bar.style.width || "0%";

            bar.style.width = "0%";

            requestAnimationFrame(() => {
              bar.style.transition = "width 1.1s ease";
              bar.style.width = width;
            });

            observer.unobserve(bar);
          });
        },
        {
          threshold: 0.4,
        },
      );

      skillBars.forEach((bar) => skillObserver.observe(bar));
    }

    /* ===============================
       BACK TO TOP BUTTON OPTIONAL
    ================================= */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
      const toggleBackToTop = () => {
        backToTop.classList.toggle("show", window.scrollY > 450);
      };

      toggleBackToTop();

      window.addEventListener("scroll", toggleBackToTop, { passive: true });

      backToTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }

    /* ===============================
       RESPONSIVE CANVAS PARTICLES
    ================================= */

    const canvas = document.getElementById("c");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let animationId = null;
    let particles = [];
    let devicePixelRatioValue = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    };

    const getParticleCount = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 420) return 45;
      if (screenWidth <= 768) return 70;
      if (screenWidth <= 1024) return 105;

      return 145;
    };

    const getConnectDistance = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 420) return 80;
      if (screenWidth <= 768) return 95;

      return 120;
    };

    const resizeCanvas = () => {
      devicePixelRatioValue = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * devicePixelRatioValue);
      canvas.height = Math.floor(height * devicePixelRatioValue);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        devicePixelRatioValue,
        0,
        0,
        devicePixelRatioValue,
        0,
        0,
      );
    };

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.baseX = this.x;
        this.baseY = this.y;

        this.size = Math.random() * 2.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.22;
        this.speedY = (Math.random() - 0.5) * 0.22;
        this.density = Math.random() * 28 + 12;
        this.alpha = Math.random() * 0.35 + 0.25;

        if (!initial) {
          this.x = Math.random() > 0.5 ? -10 : width + 10;
          this.y = Math.random() * height;
        }
      }

      update() {
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        if (this.baseX < -20 || this.baseX > width + 20) {
          this.speedX *= -1;
        }

        if (this.baseY < -20 || this.baseY > height + 20) {
          this.speedY *= -1;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);
        const radius = window.innerWidth <= 768 ? 105 : 150;

        if (mouse.active && distance > 0 && distance < radius) {
          const force = (radius - distance) / radius;
          this.x -= (dx / distance) * force * this.density * 0.045;
          this.y -= (dy / distance) * force * this.density * 0.045;
        } else {
          this.x += (this.baseX - this.x) * 0.025;
          this.y += (this.baseY - this.y) * 0.025;
        }
      }

      draw() {
        const distance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        const glow = mouse.active ? Math.max(1 - distance / 190, 0) : 0;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + glow * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${this.alpha + glow * 0.55})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      const count = getParticleCount();
      particles = [];

      for (let i = 0; i < count; i += 1) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = getConnectDistance();

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacity * 0.16})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const drawSpotlight = () => {
      if (!mouse.active) return;

      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        window.innerWidth <= 768 ? 160 : 230,
      );

      gradient.addColorStop(0, "rgba(56, 189, 248, 0.18)");
      gradient.addColorStop(0.45, "rgba(139, 92, 246, 0.09)");
      gradient.addColorStop(1, "rgba(2, 12, 57, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      drawSpotlight();

      animationId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!animationId) {
        animate();
      }
    };

    const stopAnimation = () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (event) => {
      if (!event.touches || event.touches.length === 0) return;

      mouse.x = event.touches[0].clientX;
      mouse.y = event.touches[0].clientY;
      mouse.active = true;
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    let resizeTimer = null;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 160);
    };

    resizeCanvas();
    initParticles();
    startAnimation();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });
  });
})();
