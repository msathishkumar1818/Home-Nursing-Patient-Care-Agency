/* =========================================================
   Amara Home Care — main.js
   Dark mode + RTL persistence, mobile menu, home dropdown,
   page loader, scroll reveal, animated counters, contact form.
   ========================================================= */

(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- 1. THEME (Dark Mode) ---------- */
  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark");
    });
  }

  var savedTheme = localStorage.getItem("amara-theme");
  if (!savedTheme) {
    savedTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  applyTheme(savedTheme);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var isDark = root.classList.contains("dark");
    var next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("amara-theme", next);
  });

  /* ---------- 2. DIRECTION (RTL / LTR) ---------- */
  function applyDir(dir) {
    root.setAttribute("dir", dir);
    root.setAttribute("lang", dir === "rtl" ? "ar" : "en");
    var labels = document.querySelectorAll("[data-dir-label]");
    labels.forEach(function (el) {
      el.textContent = dir === "rtl" ? "LTR" : "RTL";
    });
  }

  var savedDir = localStorage.getItem("amara-dir") || "ltr";
  applyDir(savedDir);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-dir-toggle]");
    if (!btn) return;
    var current = root.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
    var next = current === "rtl" ? "ltr" : "rtl";
    applyDir(next);
    localStorage.setItem("amara-dir", next);
  });

  /* ---------- 3. MOBILE MENU ---------- */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.getElementById("mobile-menu");
  var menuIconOpen = document.querySelector("[data-menu-icon-open]");
  var menuIconClose = document.querySelector("[data-menu-icon-close]");

  function setMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle("open", open);
    if (menuToggle) menuToggle.setAttribute("aria-expanded", open);
    if (menuIconOpen) menuIconOpen.classList.toggle("hidden", open);
    if (menuIconClose) menuIconClose.classList.toggle("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.contains("open");
      setMenu(!isOpen);
    });
  }

  /* mobile "Home" sub-dropdown */
  var mobileHomeToggle = document.querySelector("[data-mobile-home-toggle]");
  var mobileHomePanel = document.querySelector("[data-mobile-home-panel]");
  if (mobileHomeToggle && mobileHomePanel) {
    mobileHomeToggle.addEventListener("click", function () {
      var isHidden = mobileHomePanel.classList.contains("hidden");
      mobileHomePanel.classList.toggle("hidden", !isHidden);
      mobileHomeToggle.querySelector("[data-chevron]").classList.toggle("rotate-180", isHidden);
    });
  }

  /* desktop dropdown keyboard support (Esc to close) */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setMenu(false);
      document.activeElement && document.activeElement.blur();
    }
  });

  /* ---------- 4. PAGE LOADER ---------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("page-loader");
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add("hide");
    }, 350);
  });
  // Safety fallback in case 'load' is slow to fire
  setTimeout(function () {
    var loader = document.getElementById("page-loader");
    if (loader) loader.classList.add("hide");
  }, 2500);

  /* ---------- 5. SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- 6. ANIMATED COUNTERS ---------- */
  var counters = document.querySelectorAll("[data-counter]");
  if ("IntersectionObserver" in window && counters.length) {
    var countIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-counter"));
          var suffix = el.getAttribute("data-suffix") || "";
          var duration = 1400;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var val = target * eased;
            el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          countIo.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) {
      countIo.observe(el);
    });
  }

  /* ---------- 7. CONTACT / INQUIRY FORM VALIDATION ---------- */
  var form = document.getElementById("care-inquiry-form");
  if (form) {
    var successBox = document.getElementById("form-success");

    function validateField(field) {
      var value = field.value.trim();
      var valid = true;

      if (field.hasAttribute("required") && !value) valid = false;

      if (valid && field.type === "email" && value) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      if (valid && field.getAttribute("data-type") === "phone" && value) {
        valid = /^[0-9+()\-\s]{7,20}$/.test(value);
      }
      field.classList.toggle("invalid", !valid);
      return valid;
    }

    form.querySelectorAll(".field-input, select[required]").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll(".field-input[required], select[required]");
      var allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        var firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      form.classList.add("hidden");
      if (successBox) successBox.classList.remove("hidden");
    });
  }

  /* ---------- 8. FOOTER YEAR ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 9. BACK TO TOP ---------- */
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    var toggleBackToTop = function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 400);
    };
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
