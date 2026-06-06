
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



  document.addEventListener("DOMContentLoaded", () => {
    initIcons();



    const header = document.getElementById("header");
    const backToTop = document.getElementById("backToTop");
    const mobileBtn = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const resumeBtn = document.getElementById("resumeBtn");
    const resumeMenu = document.getElementById("resumeMenu");

    let handleCanvasResize = null;



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

    const closeResumeMenu = () => {
      if (!resumeMenu || !resumeBtn) return;
      resumeMenu.classList.add("hidden");
      resumeMenu.classList.remove("resume-open");
      resumeBtn.setAttribute("aria-expanded", "false");
    };

    /* ===============================
       UNIFIED GLOBAL EVENT LISTENERS
    ================================= */

    // 1. Scroll Events (Sticky Header & Back to Top Toggle)
    const handleScroll = () => {
      if (header) {
        const isScrolled = window.scrollY > 40;
        header.classList.toggle("glass-effect", isScrolled);
        header.classList.toggle("header-scrolled", isScrolled);
      }
      if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 450);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Resize Events (Mobile Menu Close & Canvas Resize Throttler)
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
      if (handleCanvasResize) {
        handleCanvasResize();
      }
    }, { passive: true });

    document.addEventListener("click", (event) => {
      // Close mobile menu if click is outside mobile menu and button
      if (mobileMenu && mobileBtn && !mobileMenu.classList.contains("hidden")) {
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedButton = mobileBtn.contains(event.target);
        if (!clickedInsideMenu && !clickedButton) {
          closeMobileMenu();
        }
      }

      // Close resume menu if click is outside resume menu and button
      if (resumeMenu && resumeBtn && !resumeMenu.classList.contains("hidden")) {
        const clickedInsideResume = resumeMenu.contains(event.target);
        const clickedResumeButton = resumeBtn.contains(event.target);
        if (!clickedInsideResume && !clickedResumeButton) {
          closeResumeMenu();
        }
      }
    });

    // 4. Document Keydown Events (Escape key to close active menus)
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        closeResumeMenu();
      }
    });


    if (mobileBtn && mobileMenu) {
      mobileBtn.setAttribute("aria-label", "Toggle navigation menu");
      mobileBtn.setAttribute("aria-expanded", "false");

      mobileBtn.addEventListener("click", () => {
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
    }



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
          "AI / ML Engineer",
          "Python Developer",
          "Full Stack Developer",
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
       RESUME DROPDOWN SETUP
    ================================= */

    if (resumeBtn && resumeMenu) {
      resumeBtn.setAttribute("aria-haspopup", "true");
      resumeBtn.setAttribute("aria-expanded", "false");

      resumeBtn.addEventListener("click", () => {
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

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }


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
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;

        this.baseX = randomX;
        this.baseY = randomY;

        if (initial) {
          this.x = randomX;
          this.y = randomY;
        } else {
          this.x = Math.random() > 0.5 ? -10 : width + 10;
          this.y = Math.random() * height;
        }

        this.size = Math.random() * 2.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.22;
        this.speedY = (Math.random() - 0.5) * 0.22;
        this.density = Math.random() * 28 + 12;
        this.alpha = Math.random() * 0.35 + 0.25;
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

    handleCanvasResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 160);
    };

    resizeCanvas();
    initParticles();
    startAnimation();

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

    /* ===============================
       CERTIFICATE LIGHTBOX
    ================================= */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxContent = document.getElementById("lightbox-content");

    const certificateCards = document.querySelectorAll("#certificates .glass-effect");
    let currentCertIndex = 0;
    const certificatesData = [];

    certificateCards.forEach((card, index) => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      const viewBtn = card.querySelector("a");

      if (img && title && viewBtn) {
        const titleText = title.textContent.trim();
        const imgSrc = img.getAttribute("src") || viewBtn.getAttribute("href");
        
        certificatesData.push({
          imgSrc: imgSrc,
          titleText: titleText,
        });

        // Open lightbox on button click
        viewBtn.addEventListener("click", (e) => {
          e.preventDefault();
          openLightbox(index);
        });
      }
    });

    const openLightbox = (index) => {
      if (!lightbox || !lightboxImg || !lightboxTitle) return;
      currentCertIndex = index;
      updateLightboxContent();
      
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
      
      requestAnimationFrame(() => {
        lightbox.classList.remove("opacity-0");
        if (lightboxContent) {
          lightboxContent.classList.remove("scale-95");
          lightboxContent.classList.add("scale-100");
        }
      });
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.add("opacity-0");
      if (lightboxContent) {
        lightboxContent.classList.remove("scale-100");
        lightboxContent.classList.add("scale-95");
      }
      
      setTimeout(() => {
        lightbox.classList.remove("flex");
        lightbox.classList.add("hidden");
        document.body.style.overflow = "";
      }, 300);
    };

    const updateLightboxContent = () => {
      const cert = certificatesData[currentCertIndex];
      if (!cert || !lightboxImg || !lightboxTitle) return;
      
      lightboxImg.style.opacity = "0";
      setTimeout(() => {
        lightboxImg.setAttribute("src", cert.imgSrc);
        lightboxTitle.textContent = cert.titleText;
        lightboxImg.style.opacity = "1";
      }, 150);
    };

    const nextCert = () => {
      currentCertIndex = (currentCertIndex + 1) % certificatesData.length;
      updateLightboxContent();
    };

    const prevCert = () => {
      currentCertIndex = (currentCertIndex - 1 + certificatesData.length) % certificatesData.length;
      updateLightboxContent();
    };

    if (lightbox) {
      if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
      if (lightboxNext) lightboxNext.addEventListener("click", nextCert);
      if (lightboxPrev) lightboxPrev.addEventListener("click", prevCert);
      
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("hidden")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextCert();
        if (e.key === "ArrowLeft") prevCert();
      });
    }
  });
})();
