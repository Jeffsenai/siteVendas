document.addEventListener('DOMContentLoaded', () => {
  // Remove overlay de carregamento
  const overlayCarregamento = document.querySelector('.overlay-carregamento');
  if (overlayCarregamento) {
    overlayCarregamento.style.display = 'none';
  }

  // Menu hamburguer
  const menuHamburguer = document.querySelector('.menu-hamburguer');
  const menuPrincipal = document.querySelector('.menu-principal');

  if (menuHamburguer && menuPrincipal) {
    menuHamburguer.addEventListener('click', () => {
      menuHamburguer.classList.toggle('active');
      menuPrincipal.classList.toggle('active');
    });

    // Fechar menu ao clicar fora (somente se não for dentro do nav)
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.container-navegacao')) {
        menuHamburguer.classList.remove('active');
        menuPrincipal.classList.remove('active');
      }
    });
  }

  // Atualizar contador do carrinho
  const atualizarContadorCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    document.querySelectorAll('.contador-carrinho').forEach(el => {
      el.textContent = carrinho.length;
    });
  };
  atualizarContadorCarrinho();

  // Smooth Scroll para links internos (se houver)
  document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', (e) => {
      e.preventDefault();
      const targetID = ancora.getAttribute('href');
      const alvo = document.querySelector(targetID);
      if (alvo) {
        alvo.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Slider Hero
  const slides = document.querySelectorAll('.slider-heroi .slide');
  let slideAtual = 0;
  const btnProximo = document.querySelector('.controles-slider .next');
  const btnAnterior = document.querySelector('.controles-slider .prev');

  const mostrarSlide = (indice) => {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === indice);
    });
  };

  if (btnProximo && btnAnterior && slides.length > 0) {
    btnProximo.addEventListener('click', () => {
      slideAtual = (slideAtual + 1) % slides.length;
      mostrarSlide(slideAtual);
    });

    btnAnterior.addEventListener('click', () => {
      slideAtual = (slideAtual - 1 + slides.length) % slides.length;
      mostrarSlide(slideAtual);
    });

    // Auto slide a cada 5 segundos
    setInterval(() => {
      slideAtual = (slideAtual + 1) % slides.length;
      mostrarSlide(slideAtual);
    }, 5000);
  }

  // Observer para revelar produtos ao entrar na tela
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.cartao-produto').forEach(card => {
    observer.observe(card);
  });

  // Contagem Regressiva (Exemplo: 7 dias a partir de agora)
  const diasEl = document.getElementById('days');
  const horasEl = document.getElementById('hours');
  const minutosEl = document.getElementById('minutes');
  const segundosEl = document.getElementById('seconds');

  if (diasEl && horasEl && minutosEl && segundosEl) {
    const dataAlvo = new Date();
    dataAlvo.setDate(dataAlvo.getDate() + 7);

    const atualizarContador = () => {
      const agora = new Date();
      const diferenca = dataAlvo - agora;
      if (diferenca <= 0) {
        diasEl.textContent = '00';
        horasEl.textContent = '00';
        minutosEl.textContent = '00';
        segundosEl.textContent = '00';
        return;
      }
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
      const segundos = Math.floor((diferenca / 1000) % 60);

      diasEl.textContent = String(dias).padStart(2, '0');
      horasEl.textContent = String(horas).padStart(2, '0');
      minutosEl.textContent = String(minutos).padStart(2, '0');
      segundosEl.textContent = String(segundos).padStart(2, '0');
    };

    atualizarContador();
    setInterval(atualizarContador, 1000);
  }

  // Modal de Visualização Rápida
  const overlayModal = document.querySelector('.overlay-modal');
  const botaoFechar = document.querySelector('.fechar-modal');

  if (overlayModal && botaoFechar) {
    botaoFechar.addEventListener('click', () => {
      overlayModal.classList.remove('active');
    });
    overlayModal.addEventListener('click', (e) => {
      if (e.target === overlayModal) {
        overlayModal.classList.remove('active');
      }
    });
  }
});
