const itensMenu = document.getElementById('itensMenu');
const botaoMenu = document.querySelector('.navbar-toggle');

function clickMenu() {
  itensMenu.classList.toggle('active');
  console.log('Menu toggled');
}

// Fecha o menu ao clicar fora dele ou do botão
document.addEventListener('click', function(event) {
  const clicouForaMenu = !itensMenu.contains(event.target);
  const clicouForaBotao = !botaoMenu.contains(event.target);
  
  if (itensMenu.classList.contains('active') && clicouForaMenu && clicouForaBotao) {
    itensMenu.classList.remove('active');
    console.log('Menu fechado ao clicar fora');
  }
});

