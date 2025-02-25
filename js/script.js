document.addEventListener('DOMContentLoaded', () => {
    // Remove loading overlay
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
  
    document.addEventListener("DOMContentLoaded", () => {
      const menuHamburguer = document.querySelector(".menu-hamburguer");
      const menuMobile = document.querySelector(".menu-mobile");
    
      menuHamburguer.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que o clique se propague para o documento
        menuMobile.classList.toggle("active");
        menuHamburguer.classList.toggle("active");
      });
    
      // Fecha o menu se clicar fora do container do menu e do menu mobile
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".menu-container") && !e.target.closest(".menu-mobile")) {
          menuMobile.classList.remove("active");
          menuHamburguer.classList.remove("active");
        }
      });
    });
    
  
    // Atualizar contador do carrinho
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.length;
      });
    };
    updateCartCount();
  
    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetID = anchor.getAttribute('href');
        const target = document.querySelector(targetID);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  
    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    const nextBtn = document.querySelector('.slider-controls .next');
    const prevBtn = document.querySelector('.slider-controls .prev');
  
    const showSlide = (index) => {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
      });
    };
  
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  
    // Auto slide a cada 5 segundos
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  
    // Observer para animação de reveal dos produtos
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.product-card').forEach(card => {
      observer.observe(card);
    });
  
    // Countdown Timer para Promo Banner
    const countdownElements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };
  
    // Definindo a data-alvo (exemplo: 7 dias a partir de agora)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
  
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        Object.values(countdownElements).forEach(el => el.textContent = '00');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
  
      countdownElements.days.textContent = String(days).padStart(2, '0');
      countdownElements.hours.textContent = String(hours).padStart(2, '0');
      countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
      countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
    };
  
    updateCountdown();
    setInterval(updateCountdown, 1000);
  
    // Modal Quick View
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');
  
    if (modalOverlay && closeModal) {
      closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }
  });
  