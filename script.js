/* AK DIGITAL SERVICES — interactions */
(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader.classList.add("hide"), 350);
  });

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = safeGet("ak-theme");
  if (savedTheme === "dark") root.setAttribute("data-theme", "dark");

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      safeSet("ak-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      safeSet("ak-theme", "dark");
    }
  });

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("navbar");
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle("scrolled", scrolled);
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".n[data-count]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString("en-IN");
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString("en-IN") + "+";
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Service filter tabs ---------- */
  const tabs = document.querySelectorAll(".tab-btn");
  const cards = document.querySelectorAll(".service-card");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(open => {
        open.classList.remove("open");
        open.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    const name = data.get("name");
    const service = data.get("service");
    formNote.textContent = `Thanks ${name}! Your request for "${service}" has been noted — we'll call you shortly.`;
    formNote.style.color = "var(--success)";
    form.reset();
  });

  /* ---------- Save Contact (VCF) ---------- */
  document.getElementById("saveContactBtn").addEventListener("click", () => {
    const vcf = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Kumar;Ankush;;;",
      "FN:AK Digital Services (Ankush Kumar)",
      "ORG:AK Digital Services",
      "TITLE:Digital Service Centre",
      "TEL;TYPE=CELL:+91 9693496128",
      "EMAIL:akdigitalsupport@gmail.com",
      "ADR;TYPE=WORK:;;Ballia;Begusarai;Bihar;851211;India",
      "URL:https://akdigitalservices.in",
      "END:VCARD"
    ].join("\n");
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AK-Digital-Services.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  /* ---------- Share Website ---------- */
  document.getElementById("shareBtn").addEventListener("click", async () => {
    const shareData = {
      title: "AK Digital Services",
      text: "AK Digital Services — AEPS banking, government certificates, travel booking & more in Ballia, Begusarai.",
      url: window.location.href
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (e) {
        prompt("Copy this link:", shareData.url);
      }
    }
  });

  /* ---------- Service Worker (PWA, optional) ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => { /* no-op if not served */ });
    });
  }
})();
