lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {
  // ================= STICKY HEADER =================
  const header = document.getElementById("header");

  const handleHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle("glass-effect", window.scrollY > 50);
  };

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  // ================= MOBILE MENU =================
  const mobileBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // ================= TYPING EFFECT =================
  const typingElement = document.getElementById("typing-effect");
  if (typingElement && typeof Typed !== "undefined") {
    new Typed("#typing-effect", {
      strings: [
        "Python Developer",
        "Full Stack Developer",
        "AI / ML Enthusiast",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });
  }

  // ================= SCROLL REVEAL =================
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("visible"));
  }

  // ================= RESUME DROPDOWN =================
  const resumeBtn = document.getElementById("resumeBtn");
  const resumeMenu = document.getElementById("resumeMenu");

  if (resumeBtn && resumeMenu) {
    resumeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      resumeMenu.classList.toggle("hidden");
    });

    resumeMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      resumeMenu.classList.add("hidden");
    });
  }

  // ================= SKILLS TAB SWITCH =================
  const tabs = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".skills-panel");

  if (tabs.length > 0 && panels.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");

        const panel = document.getElementById(`${tab.dataset.tab}-panel`);
        if (panel) {
          panel.classList.add("active");
        }
      });
    });
  }

  // ================= CANVAS PARTICLES =================
  const canvas = document.getElementById("c");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let animationId = null;

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const particles = [];
  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 70 : 140;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset(true);
      this.size = Math.random() * 2 + 0.5;
      this.density = Math.random() * 30 + 10;
    }

    reset(initial = false) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.baseX = this.x;
      this.baseY = this.y;

      if (!initial) {
        this.size = Math.random() * 2 + 0.5;
        this.density = Math.random() * 30 + 10;
      }
    }

    update() {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < 140) {
        const force = (140 - dist) / 140;
        this.x -= (dx / dist) * force * this.density * 0.03;
        this.y -= (dy / dist) * force * this.density * 0.03;
      } else {
        this.x += (this.baseX - this.x) * 0.02;
        this.y += (this.baseY - this.y) * 0.02;
      }
    }

    draw() {
      const glowDistance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
      const glow = Math.max(1 - glowDistance / 200, 0);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size + glow * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(120,130,255,${0.35 + glow * 0.8})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawSpotlight() {
    const gradient = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      1,
    );
    gradient.addColorStop(0, "rgba(19, 62, 150, 0.22)");
    gradient.addColorStop(1, "rgba(2, 12, 57, 0.10)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    drawSpotlight();
    animationId = window.requestAnimationFrame(animate);
  }

  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function handleTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }

  function handleResize() {
    resizeCanvas();
    initParticles();
  }

  resizeCanvas();
  initParticles();
  animate();

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else if (!animationId) {
      animate();
    }
  });
});
