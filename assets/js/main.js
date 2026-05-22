const introPortal = document.getElementById("introPortal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  document.body.classList.remove("intro-lock");
  introPortal?.remove();
} else {
  window.addEventListener("load", () => {
    window.setTimeout(() => {
      document.body.classList.remove("intro-lock");
      introPortal?.remove();
    }, 3100);
  });
}

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "收起导航" : "展开导航");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "展开导航");
  }
});

const revealTargets = document.querySelectorAll([
  ".section-head",
  ".feature-chip",
  ".detail-card",
  ".arch-card",
  ".folk-card",
  ".video-card",
  ".timeline-item",
  ".mural-frame",
  ".treasure-photo"
].join(","));

if ("IntersectionObserver" in window) {
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-3d");
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .16, rootMargin: "0px 0px -8% 0px" });

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const tiltTargets = document.querySelectorAll(".feature-chip, .detail-card, .arch-card, .folk-card, .video-card");
  tiltTargets.forEach((element) => {
    element.classList.add("tilt-3d");
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      element.classList.add("is-tilting");
      element.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
    });
    element.addEventListener("pointerleave", () => {
      element.classList.remove("is-tilting");
      element.style.transform = "";
    });
  });
}

const canvas = document.getElementById("dust");
const ctx = canvas?.getContext("2d");

if (!reduceMotion && canvas && ctx) {
  const particles = [];
  let width = 0;
  let height = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles.length = 0;
    const count = Math.min(56, Math.floor(width / 22));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 2.2,
        vx: .08 + Math.random() * .24,
        vy: -.04 + Math.random() * .08,
        alpha: .14 + Math.random() * .28
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy + Math.sin((p.x + p.y) * .01) * .05;
      if (p.x > width + 8) p.x = -8;
      if (p.y < -8) p.y = height + 8;
      ctx.beginPath();
      ctx.fillStyle = `rgba(214, 168, 79, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  animate();
}
