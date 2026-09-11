'use strict';

/* ------------------------------------------------
   Navbar scroll
------------------------------------------------ */
const navbar = document.getElementById('navbar');

function onNavbarScroll() {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
}

window.addEventListener('scroll', onNavbarScroll, { passive: true });

/* ------------------------------------------------
   Hamburger menu
------------------------------------------------ */
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu   = document.getElementById('mobile-menu');

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', function () {
    const isOpen = hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    hamburgerBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburgerBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

/* ------------------------------------------------
   Intersection Observer — reveal animations
------------------------------------------------ */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

revealElements.forEach(function (el) { revealObserver.observe(el); });

/* ------------------------------------------------
   FAQ accordion
------------------------------------------------ */
document.querySelectorAll('.faq-item').forEach(function (item) {
  const btn = item.querySelector('.faq-question');
  if (btn) {
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Fechar todos
      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) {
          otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Abrir o clicado (se estava fechado)
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  }
});

/* ------------------------------------------------
   Smooth scroll para âncoras
------------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = navbar ? navbar.offsetHeight + 16 : 86;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ------------------------------------------------
   Ativar itens já visíveis no carregamento
------------------------------------------------ */
window.addEventListener('load', function () {
  onNavbarScroll();
  setTimeout(function () {
    revealElements.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
  }, 120);
});
