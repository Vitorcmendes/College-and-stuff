document.addEventListener('DOMContentLoaded', () => {

  const imagens = [
    'CPW1images/imagemsuperior2.jpg',
    'CPW1images/imgcarrossel2original.png',
    'CPW1images/imgcarrossel3.png',
    'CPW1images/imagembanner1.png'
  ];

  let indice = 0;

  const imagem = document.getElementById('imagemcarrossel');
  setInterval(() => {
    imagem.style.opacity = 0;
    setTimeout(() => {
      indice = (indice + 1) % imagens.length;
      imagem.src = imagens[indice];
      imagem.style.opacity = 1;
    }, 500);
  }, 5000);

  
  
});