document.addEventListener('DOMContentLoaded', () => {
  // Remove overlay de carregamento
  const overlay = document.querySelector('.overlay-carregamento');
  if (overlay) {
    overlay.style.display = 'none';
  }
  
  // Menu Hamburguer – Toggling do menu mobile
  const menuHamburguer = document.querySelector('.menu-hamburguer');
  const menuMobile = document.querySelector('.menu-mobile');
  
  if (menuHamburguer && menuMobile) {
    menuHamburguer.addEventListener('click', (e) => {
      e.stopPropagation();
      menuMobile.classList.toggle('active');
      menuHamburguer.classList.toggle('active');
    });
  
    // Fecha o menu mobile se clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.container-navegacao') && !e.target.closest('.menu-mobile')) {
        menuMobile.classList.remove('active');
        menuHamburguer.classList.remove('active');
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
  });
  