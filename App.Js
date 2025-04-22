const movies = [
  {
    title: "O Incrível Hulk",
    image: "220ba00a4da641890776cdd8ef9a9253.webp",
    description: "Bruce Banner busca cura para sua condição que o transforma no Hulk...",
    releaseDate: "13 de junho de 2008",
    director: "Louis Leterrier",
    studio: "Marvel Studios"
  },
  {
    title: "Wall-E",
    image: "20139182.webp",
    description: "Num futuro distante, um pequeno robô de limpeza chamado Wall-E embarca em uma aventura...",
    releaseDate: "27 de junho de 2008",
    director: "Andrew Stanton",
    studio: "Pixar Animation Studios"
  },
  {
    title: "Homem de Ferro 3",
    image: "big-poster-filme-homem-de-ferro-3-lo03-tamanho-90x60-cm-homem-de-ferro-3.webp",
    description: "Tony Stark enfrenta um inimigo cujo alcance não conhece limites...",
    releaseDate: "26 de abril de 2013",
    director: "Shane Black",
    studio: "Marvel Studios"
  },
  {
    title: "Soul",
    image: "soul-poster-scaled.jpg",
    description: "Joe Gardner é um professor de música que descobre o verdadeiro significado da vida...",
    releaseDate: "25 de dezembro de 2020",
    director: "Pete Docter",
    studio: "Pixar Animation Studios"
  },
  {
    title: "X-Men Origins: Wolverine",
    image: "X-Men_Origins_Wolverine.jpg",
    description: "A origem de Wolverine e sua rivalidade com Victor Creed...",
    releaseDate: "1 de maio de 2009",
    director: "Gavin Hood",
    studio: "20th Century Fox"
  },
  {
    title: "Minecraft: The Movie",
    image: "1973597620-minecraftthemoviever3xlg.webp",
    description: "Um adolescente e seus amigos descobrem um mundo diferente e precisam salvar ele das forças do mal.",
    releaseDate: "4 de abril de 2025",
    director: "Jared Hess",
    studio: "Warner Bros."
  },
  {
    title: "Oppenheimer",
    image: "Oppenheimer_poster.jpg",
    description: "A história do físico J. Robert Oppenheimer e a criação da bomba atômica.",
    releaseDate: "20 de julho de 2023",
    director: "Christopher Nolan",
    studio: "Universal Pictures"
  },
  {
    title: "Coringa 2",
    image: "2020845703-gkldmr0xsauuok7.webp",
    description: "A continuação da história de Arthur Fleck com Harley Quinn.",
    releaseDate: "3 de outubro de 2024",
    director: "Todd Phillips",
    studio: "Warner Bros."
  },
  {
    title: "Uncharted",
    image: "867820221026-uau-posters-uncharted-filmes-3.jpg",
    description: "O jovem Nathan Drake embarca em sua primeira aventura em busca de um tesouro lendário.",
    releaseDate: "17 de fevereiro de 2022",
    director: "Ruben Fleischer",
    studio: "Sony Pictures"
  },
  {
    title: "Superman",
    image: "superman-movie-2025-poster-v0-d3ix39go81vd1.webp",
    description: "Clark Kent assume seu destino como Superman para proteger o mundo de ameaças.",
    releaseDate: "10 de Julho de 2025",
    director: "Gunn e Peter Safran",
    studio: "DC Studios"
  },
  {
    title: "Halloween",
    image: "merza_halloween.jpg",
    description: "Michael Myers escapa do sanatório e retorna à sua cidade natal para cometer novos crimes.",
    releaseDate: "25 de outubro de 1978",
    director: "John Carpenter",
    studio: "Compass International Pictures"
  },
  {
    title: "Elementos",
    image: "0132283.webp",
    description: "Em uma cidade onde fogo, água, terra e ar convivem, uma jovem do elemento fogo e um rapaz do elemento água descobrem que têm mais em comum do que imaginam.",
    releaseDate: "15 de junho de 2023",
    director: "Peter Sohn",
    studio: "Pixar Animation Studios"
  }
];

// Função de pesquisa
document.getElementById('searchBtn').addEventListener('click', function () {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
  renderMovies(filteredMovies);
});


function renderMovies(movieList) {
  const container = document.getElementById("card-container");
  container.innerHTML = ""; 
  movieList.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-md-3 col-sm-6 mb-4 d-flex";
    const card = document.createElement("div");
    card.className = "card text-white h-100 w-100";
    card.style.backgroundColor = "#0d1b2a";
    card.style.cursor = "pointer";
    card.style.border = "1px solid #1b263b";
    
    card.innerHTML = `
      <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
      </div>
    `;
    card.addEventListener("click", () => showMovieDetailsFromBanner(movie.title));
    col.appendChild(card);
    container.appendChild(col);
  });
}


function showMovieDetailsFromBanner(movieTitle) {
  window.location.href = `index.html?movie=${encodeURIComponent(movieTitle)}`;
}


window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieTitle = urlParams.get('movie');
  if (movieTitle) {
    const movie = movies.find(m => m.title === movieTitle);
    if (movie) {
      showMovieDetails(movie);
    }
  } else {
    renderMovies(movies);
  }
};


function showMovieDetails(movie) {
  const container = document.getElementById('card-container');
  container.innerHTML = `
    <div class="text-center">
      <h2 class="mb-3">${movie.title}</h2>
      <img src="${movie.image}" class="img-fluid mb-3" style="max-width: 300px; height: auto;">
      <p>${movie.description}</p>
      <p><strong>Lançamento:</strong> ${movie.releaseDate}</p>
      <p><strong>Diretor:</strong> ${movie.director}</p>
      <p><strong>Estúdio:</strong> ${movie.studio}</p>
      <button class="btn btn-primary mt-3" onclick="window.location.href='index.html'">Voltar</button>
    </div>
  `;
}
