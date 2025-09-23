
document.addEventListener('DOMContentLoaded', () => {

  const input = document.getElementById('musicabuscada');
  const output = document.getElementById('cifra');

  const musicasDisponiveis = [
    "epitafio",
    "segredos",
    "trevo (tu)",
    "velha infancia",
    "igual a voce",
    "trem-bala"
    // ...adicione quantas quiser
  ];

  const fuse = new Fuse(musicasDisponiveis, {
    includeScore: true,
    threshold: 0.4,
  });

  function mostrarSugestoes(lista) {
    let ul = document.getElementById("sugestoes");
    if (!ul) {
      ul = document.createElement("ul");
      ul.id = "sugestoes";
      const rect = input.getBoundingClientRect();

      Object.assign(ul.style, {
        position: "absolute",
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        listStyle: "none",
        margin: "4px 0 0 0",
        padding: "0",
        maxHeight: "200px",
        overflowY: "auto",
        zIndex: 1000,
      });
      input.parentElement.appendChild(ul);
    }

    ul.innerHTML = "";

    lista.slice(0, 6).forEach(({ item }) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.style.padding = "6px 10px";
      li.style.cursor = "pointer";
      li.addEventListener("mousedown", () => {
        input.value = item;
        ul.innerHTML = "";
        buscarCifra(item);
      });
      ul.appendChild(li);
    });

    if (!lista.length) {
      ul.innerHTML = "<li style='padding:6px 10px'>Nenhum resultado</li>";
    }
  }

  input.addEventListener("input", () => {
    const termo = input.value.trim();
    if (!termo) {
      mostrarSugestoes([]);
      return;
    }
    const resultados = fuse.search(termo);
    mostrarSugestoes(resultados);
  });

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

  function ehPar(numero) {
    return numero % 2 === 0;
  }

  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      buscarCifra(input.value.trim());
    }
  });


const dadosAnuncios = {
  anuncio1: {
    link: "https://www.mercadolivre.com.br/",
    imagens: [
      'CPW1images/anuncio1/Ad1.png',
      'CPW1images/anuncio1/Ad1-1.png',
      'CPW1images/anuncio1/Ad1-2.png'
    ]
  },
  anuncio2: {
    link: "https://www.motorola.com.br/smartphone-motorola-razr-50-5g/p?idsku=1595",
    imagens: [
      'CPW1images/anuncio2/Ad2.png',
      'CPW1images/anuncio2/Ad2-1.png',
      'CPW1images/anuncio2/Ad2-2.png'
    ]
  },
  anuncio3: {
    link: "https://shop.samsung.com/br/galaxy-s25-edge-512gb/p",
    imagens: [
      'CPW1images/anuncio3/Ad3.png',
      'CPW1images/anuncio3/Ad3-1.png',
      'CPW1images/anuncio3/Ad3-2.png'
    ]
  },
  anuncio4: {
    link: "https://www.netshoes.com.br/?campaign=gglepqbdg&gad_source=1&gad_campaignid=21741521022&gbraid=0AAAAADje7YZ4jqNKws4g6sgqhl2PRV7Pr&gclid=Cj0KCQjw097CBhDIARIsAJ3-nxdPL5bYFllWJibt62WQcOYRdLfPU5IR7_qWjZZzg0l3Z3an14JEDUsaAjpOEALw_wcB&gclsrc=aw.ds",
    imagens: [
      'CPW1images/anuncio4/Ad4.png',
      'CPW1images/anuncio4/Ad4-1.png',
      'CPW1images/anuncio4/Ad4-2.png'
    ]
  }
};

  let indiceAtualAnuncio1 = 0;
  let intervaloAnuncio1 = null;

  function iniciarCarrosselAnuncio(idDiv, dados) {
  const container = document.getElementById(idDiv);
  const imagens = dados.imagens;
  const link = dados.link;

  container.innerHTML = `
    <a href="${link}" target="_blank">
      <img id="img-${idDiv}" src="${imagens[0]}" 
           style="width: 100%; height: 100%; object-fit: contain; display: block;">
    </a>
  `;

  let indice = 0;
  setInterval(() => {
    indice = (indice + 1) % imagens.length;
    const img = document.getElementById(`img-${idDiv}`);
    if (img) {
      img.src = imagens[indice];
    }
  }, 2000);
}

  function buscarCifra(nomeMusica) {
    const caminho = `${nomeMusica}.txt`;
    console.log('Buscando arquivo:', caminho);

    fetch(caminho)
      .then(response => {
        if (!response.ok) throw new Error('Arquivo não encontrado');
        return response.text();
      })
      .then(texto => {
        const linhas = texto.split('\n');
        let resultadoFormatado = '';

        const infomusica = linhas.slice(0, 3);
        document.getElementById('titulomusica').textContent = infomusica[0];
        document.getElementById('compositormusica').textContent = "Compositor: " + infomusica[1];
        document.getElementById('interpretemusica').textContent = "Intérprete: " + infomusica[2];

        resultadoFormatado = linhas.slice(3).map((linha, index) => {
          const classe = ehPar(index) ? 'linha-par' : 'linha-impar';
          return criarLinhaComPopups(linha, classe, index);
        }).join('');

        output.innerHTML = resultadoFormatado;
        iniciarCarrosselAnuncio('imganuncio1', dadosAnuncios.anuncio1);
        iniciarCarrosselAnuncio('imganuncio2', dadosAnuncios.anuncio2);
        iniciarCarrosselAnuncio('imganuncio3', dadosAnuncios.anuncio3);
        iniciarCarrosselAnuncio('imganuncio4', dadosAnuncios.anuncio4);
      })
      .catch(error => {
        output.textContent = `Erro: ${error.message}`;
      });
  }

  function normalizarNomeAcorde(nome) {
  return nome
    .normalize("NFD")               // Remove acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas
    .replace(/#/g, "X")
    .replace(/\//g, "-")             // Substitui sustenido (#) por X
    .replace(/[^\w\-]/g, "")          // Remove caracteres especiais
    // .toUpperCase();                 // Deixa tudo em maiúsculas (opcional)
}

function criarLinhaComPopups(linha, classe, index) {
  // Se for linha ímpar (letra da música), apenas retorna a linha crua
  if (index % 2 !== 0) {
    return `<pre class="${classe}">${linha}</pre>`;
  }

  // Se for linha par (cifra), aplica os spans com pop-up
  const regex = /(\S+)|(\s+)/g;
  let resultado = '';
  let match;

  while ((match = regex.exec(linha)) !== null) {
    const [texto] = match;

    if (/\S/.test(texto)) {
      const nomeArquivo = `CPW1images/acordes/${normalizarNomeAcorde(texto)}.png`;
      resultado += `<span class="acorde-pop"
                        onmouseover="mostrarImagemPopup('${nomeArquivo}', this)"
                        onmouseout="esconderImagemPopup()">${texto}</span>`;
    } else {
      resultado += texto;
    }
  }

  return `<pre class="${classe}">${resultado}</pre>`;
}

  const botaoSalvar = document.getElementById('botaosalvarcifra');
  const icone = document.getElementById('iconecifra');
  let favoritado = false;

  botaoSalvar.addEventListener('click', () => {
    favoritado = !favoritado;
    if (favoritado) {
      icone.classList.remove('fa-regular');
      icone.classList.add('fa-solid');
       icone.style.color = 'rgb(4, 50, 80)'; //' rgb(77, 253, 23)';
    } else {
      icone.classList.remove('fa-solid');
      icone.classList.add('fa-regular');
      icone.style.color = 'black';
    }
  });

  window.mostrarImagemPopup = function (caminho, elemento) {
    const popup = document.getElementById('popup-imagem-acorde');
    popup.innerHTML = `<img src="${caminho}" alt="Acorde">`;
    popup.style.display = 'block';

    const rect = elemento.getBoundingClientRect();
    popup.style.top = `${rect.top + window.scrollY - 110}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
  };

  window.esconderImagemPopup = function () {
    const popup = document.getElementById('popup-imagem-acorde');
    popup.style.display = 'none';
  };

  const faixaOpcoes = document.getElementById('faixaopcoes');

  // Cria placeholder para evitar "pulo" do layout
  const placeholder = document.createElement('div');
  placeholder.style.height = `${faixaOpcoes.offsetHeight}px`;
  placeholder.style.display = 'none';
  faixaOpcoes.parentNode.insertBefore(placeholder, faixaOpcoes);

  // 30vh convertido para pixels
  const alturaApresentacao = window.innerHeight * 0.3;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= alturaApresentacao) {
      if (!faixaOpcoes.classList.contains('fixo-topo')) {
        faixaOpcoes.classList.add('fixo-topo');
        placeholder.style.display = 'block';
      }
    } else {
      if (faixaOpcoes.classList.contains('fixo-topo')) {
        faixaOpcoes.classList.remove('fixo-topo');
        placeholder.style.display = 'none';
      }
    }
  });

  
});