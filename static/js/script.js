/**
 * Prince Singh — Portfolio Core Scripts
 * Modular, Accessible, and High-Performance Vanilla JavaScript
 */

(() => {
  "use strict";

  /* ==========================================================================
     1. SAFE LUCIDE ICON INITIALIZATION
     ========================================================================== */
  const initIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    initIcons();

    /* ==========================================================================
       2. ELEMENT REFERENCES
       ========================================================================== */
    const header = document.getElementById("header");
    const backToTop = document.getElementById("backToTop");
    const mobileBtn = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuIcon = document.getElementById("mobile-menu-icon");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    // Theme toggles
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeToggleIcon = document.getElementById("theme-toggle-icon");
    const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");
    const mobileThemeToggleIcon = document.getElementById("mobile-theme-toggle-icon");
    const mobileThemeToggleText = document.getElementById("mobile-theme-toggle-text");
    const mobileQuickThemeBtn = document.getElementById("mobile-theme-toggle-quick");
    const mobileQuickThemeIcon = document.getElementById("mobile-quick-theme-icon");

    // Resume Dropdown
    const resumeBtn = document.getElementById("resumeBtn");
    const resumeMenu = document.getElementById("resumeMenu");

    // Motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ==========================================================================
       3. THEME MANAGEMENT (DARK / LIGHT)
       ========================================================================== */
    const updateThemeUI = (theme) => {
      const isLight = theme === "light";
      const iconName = isLight ? "sun" : "moon";

      if (themeToggleIcon) themeToggleIcon.setAttribute("data-lucide", iconName);
      if (mobileThemeToggleIcon) mobileThemeToggleIcon.setAttribute("data-lucide", iconName);
      if (mobileQuickThemeIcon) mobileQuickThemeIcon.setAttribute("data-lucide", iconName);
      if (mobileThemeToggleText) {
        mobileThemeToggleText.textContent = isLight ? "Light Mode" : "Dark Mode";
      }

      initIcons();
    };

    const setTheme = (theme) => {
      if (theme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
      updateThemeUI(theme);
    };

    const toggleTheme = () => {
      const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
      setTheme(currentTheme === "light" ? "dark" : "light");
    };

    // Initialize theme UI
    const initialTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
    updateThemeUI(initialTheme);

    if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener("click", toggleTheme);
    if (mobileQuickThemeBtn) mobileQuickThemeBtn.addEventListener("click", toggleTheme);

    /* ==========================================================================
       4. MOBILE MENU DRAWER
       ========================================================================== */
    const openMobileMenu = () => {
      if (!mobileMenu || !mobileBtn) return;
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      requestAnimationFrame(() => {
        mobileMenu.classList.add("menu-open");
      });
      mobileBtn.setAttribute("aria-expanded", "true");
      if (mobileMenuIcon) mobileMenuIcon.setAttribute("data-lucide", "x");
      document.body.style.overflow = "hidden";
      initIcons();
    };

    const closeMobileMenu = () => {
      if (!mobileMenu || !mobileBtn) return;
      mobileMenu.classList.remove("menu-open");
      mobileBtn.setAttribute("aria-expanded", "false");
      if (mobileMenuIcon) mobileMenuIcon.setAttribute("data-lucide", "menu");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (!mobileMenu.classList.contains("menu-open")) {
          mobileMenu.classList.remove("flex");
          mobileMenu.classList.add("hidden");
        }
      }, 250);
      initIcons();
    };

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("menu-open");
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

    /* ==========================================================================
       5. RESUME DROPDOWN
       ========================================================================== */
    const openResumeMenu = () => {
      if (!resumeMenu || !resumeBtn) return;
      resumeMenu.classList.remove("hidden");
      requestAnimationFrame(() => {
        resumeMenu.classList.add("resume-open");
      });
      resumeBtn.setAttribute("aria-expanded", "true");
    };

    const closeResumeMenu = () => {
      if (!resumeMenu || !resumeBtn) return;
      resumeMenu.classList.remove("resume-open");
      resumeBtn.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        if (!resumeMenu.classList.contains("resume-open")) {
          resumeMenu.classList.add("hidden");
        }
      }, 200);
    };

    if (resumeBtn && resumeMenu) {
      resumeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = resumeMenu.classList.contains("resume-open");
        if (isOpen) {
          closeResumeMenu();
        } else {
          openResumeMenu();
        }
      });
    }

    /* Global Click & Keyboard Listener for Dropdowns and Menus */
    document.addEventListener("click", (e) => {
      if (resumeMenu && !resumeMenu.contains(e.target) && e.target !== resumeBtn) {
        closeResumeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
        closeResumeMenu();
      }
    });

    /* ==========================================================================
       6. STICKY HEADER & BACK TO TOP
       ========================================================================== */
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (header) {
        header.classList.toggle("header-scrolled", scrollY > 30);
      }
      if (backToTop) {
        backToTop.classList.toggle("show", scrollY > 400);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ==========================================================================
       7. ACTIVE NAVIGATION ON SCROLL & SMOOTH CLICK
       ========================================================================== */
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    if (sections.length && navLinks.length && "IntersectionObserver" in window) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const currentId = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const href = link.getAttribute("href");
              const isMatch = href === `#${currentId}`;
              link.classList.toggle("active-link", isMatch);
            });
          });
        },
        { threshold: 0.35 }
      );

      sections.forEach((sec) => navObserver.observe(sec));
    }

    /* Smooth anchor links click */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    /* ==========================================================================
       8. TYPED.JS INITIALIZATION
       ========================================================================== */
    const typingElement = document.getElementById("typing-effect");
    if (typingElement && typeof window.Typed !== "undefined") {
      new window.Typed("#typing-effect", {
        strings: [
          "AI / ML Engineer",
          "Python Developer",
          "Machine Learning Developer",
          "Computer Vision Developer",
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        startDelay: 300,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    } else if (typingElement) {
      typingElement.textContent = "AI / ML Engineer";
    }

    /* ==========================================================================
       9. PROJECT CATEGORY FILTERING
       ========================================================================== */
    const tabButtons = document.querySelectorAll(".project-tab-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (tabButtons.length && projectCards.length) {
      tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.dataset.filter;

          // Update active button
          tabButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          // Filter cards
          projectCards.forEach((card) => {
            const categories = card.dataset.category ? card.dataset.category.split(" ") : [];
            const matches = filter === "all" || categories.includes(filter);

            if (matches) {
              card.classList.remove("is-hidden");
              requestAnimationFrame(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              });
            } else {
              card.style.opacity = "0";
              card.style.transform = "translateY(16px)";
              setTimeout(() => {
                card.classList.add("is-hidden");
              }, 250);
            }
          });
        });
      });
    }

    /* ==========================================================================
       10. CERTIFICATE LIGHTBOX MODAL
       ========================================================================== */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxContent = document.getElementById("lightbox-content");

    const certCards = document.querySelectorAll(".cert-card-wrap");
    const certificatesData = [];
    let currentCertIndex = 0;

    certCards.forEach((card, index) => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      const trigger = card.querySelector(".cert-lightbox-trigger");

      if (img && title && trigger) {
        certificatesData.push({
          imgSrc: img.getAttribute("src"),
          title: title.textContent.trim(),
        });

        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          openLightbox(index);
        });

        // Also allow clicking thumbnail
        const thumbWrap = card.querySelector(".relative");
        if (thumbWrap) {
          thumbWrap.style.cursor = "pointer";
          thumbWrap.addEventListener("click", () => {
            openLightbox(index);
          });
        }
      }
    });

    const updateLightbox = () => {
      const data = certificatesData[currentCertIndex];
      if (!data || !lightboxImg || !lightboxTitle) return;

      lightboxImg.style.opacity = "0";
      setTimeout(() => {
        lightboxImg.src = data.imgSrc;
        lightboxTitle.textContent = data.title;
        lightboxImg.style.opacity = "1";
      }, 120);
    };

    const openLightbox = (index) => {
      if (!lightbox) return;
      currentCertIndex = index;
      updateLightbox();

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
      }, 250);
    };

    if (lightbox) {
      if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
      if (lightboxPrev) {
        lightboxPrev.addEventListener("click", () => {
          currentCertIndex = (currentCertIndex - 1 + certificatesData.length) % certificatesData.length;
          updateLightbox();
        });
      }
      if (lightboxNext) {
        lightboxNext.addEventListener("click", () => {
          currentCertIndex = (currentCertIndex + 1) % certificatesData.length;
          updateLightbox();
        });
      }

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("hidden")) {
          if (e.key === "Escape") closeLightbox();
          if (e.key === "ArrowLeft") {
            currentCertIndex = (currentCertIndex - 1 + certificatesData.length) % certificatesData.length;
            updateLightbox();
          }
          if (e.key === "ArrowRight") {
            currentCertIndex = (currentCertIndex + 1) % certificatesData.length;
            updateLightbox();
          }
        }
      });
    }

    /* ==========================================================================
       11. 3D TILT EFFECT (HERO CARD)
       ========================================================================== */
    const heroCard = document.getElementById("hero-3d-card");
    if (heroCard && !prefersReducedMotion) {
      const handleTiltMove = (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        const rotateX = ((height / 2 - y) / (height / 2)) * 8;
        const rotateY = ((x - width / 2) / (width / 2)) * 8;

        heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      };

      const handleTiltLeave = () => {
        heroCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      };

      heroCard.addEventListener("mousemove", handleTiltMove, { passive: true });
      heroCard.addEventListener("mouseleave", handleTiltLeave, { passive: true });
    }

    /* ==========================================================================
       12. HERO PROFILE PARTICLES CANVAS
       ========================================================================== */
    const profileCanvas = document.getElementById("hero-profile-particles");
    if (profileCanvas && !prefersReducedMotion) {
      const pCtx = profileCanvas.getContext("2d");
      if (pCtx) {
        let pWidth = 0;
        let pHeight = 0;
        let pParticles = [];
        let pAnimId = null;

        const resizeProfile = () => {
          const parent = profileCanvas.parentElement;
          if (!parent) return;
          pWidth = parent.clientWidth || 320;
          pHeight = parent.clientHeight || 400;
          profileCanvas.width = pWidth;
          profileCanvas.height = pHeight;
        };

        class ProfileParticle {
          constructor() {
            this.reset();
          }
          reset() {
            this.x = Math.random() * pWidth;
            this.y = Math.random() * pHeight;
            this.size = Math.random() * 2 + 0.6;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.alpha = Math.random() * 0.4 + 0.2;
            this.color = Math.random() > 0.5 ? "56, 189, 248" : "96, 165, 250";
          }
          update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > pWidth) this.vx *= -1;
            if (this.y < 0 || this.y > pHeight) this.vy *= -1;
          }
          draw() {
            pCtx.beginPath();
            pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            pCtx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            pCtx.fill();
          }
        }

        const initProfileParticles = () => {
          pParticles = [];
          for (let i = 0; i < 30; i++) {
            pParticles.push(new ProfileParticle());
          }
        };

        const renderProfile = () => {
          pCtx.clearRect(0, 0, pWidth, pHeight);
          pParticles.forEach((p) => {
            p.update();
            p.draw();
          });
          pAnimId = requestAnimationFrame(renderProfile);
        };

        resizeProfile();
        initProfileParticles();
        renderProfile();

        window.addEventListener("resize", () => {
          resizeProfile();
          initProfileParticles();
        }, { passive: true });
      }
    }

    /* ==========================================================================
       13. INTERACTIVE GLOBAL BACKGROUND CANVAS (#c)
       ========================================================================== */
    const canvas = document.getElementById("c");
    if (canvas && !prefersReducedMotion) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let width = 0;
        let height = 0;
        let particles = [];
        let animId = null;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const mouse = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          active: false,
        };

        const getCount = () => {
          const w = window.innerWidth;
          if (w < 640) return 40;
          if (w < 1024) return 65;
          return 90;
        };

        const getDistance = () => (window.innerWidth < 768 ? 90 : 120);

        const resize = () => {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        class Particle {
          constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = (Math.random() - 0.5) * 0.25;
            this.alpha = Math.random() * 0.35 + 0.15;
          }
          update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
          }
          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            const isLight = document.documentElement.classList.contains("light");
            const color = isLight ? "59, 130, 246" : "56, 189, 248";
            ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
            ctx.fill();
          }
        }

        const initParticles = () => {
          particles = [];
          const count = getCount();
          for (let i = 0; i < count; i++) {
            particles.push(new Particle());
          }
        };

        const connect = () => {
          const maxDist = getDistance();
          const isLight = document.documentElement.classList.contains("light");
          const strokeRgb = isLight ? "37, 99, 235" : "96, 165, 250";

          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const dist = Math.hypot(dx, dy);

              if (dist < maxDist) {
                const opacity = (1 - dist / maxDist) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(${strokeRgb}, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          }
        };

        const loop = () => {
          ctx.clearRect(0, 0, width, height);
          particles.forEach((p) => {
            p.update();
            p.draw();
          });
          connect();
          animId = requestAnimationFrame(loop);
        };

        resize();
        initParticles();
        loop();

        let resizeTimer = null;
        window.addEventListener("resize", () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            resize();
            initParticles();
          }, 150);
        }, { passive: true });

        document.addEventListener("visibilitychange", () => {
          if (document.hidden) {
            cancelAnimationFrame(animId);
            animId = null;
          } else if (!animId) {
            loop();
          }
        });
      }
    }

    /* ==========================================================================
       14. SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      reveals.forEach((el, index) => {
        el.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
        revealObserver.observe(el);
      });
    } else {
      reveals.forEach((el) => el.classList.add("visible"));
    }
  });
})();
