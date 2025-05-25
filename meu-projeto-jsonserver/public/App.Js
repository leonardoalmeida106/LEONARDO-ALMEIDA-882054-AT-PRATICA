let movies = [];

async function carregarDados(endpoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`);
        if (!response.ok) throw new Error("Erro ao buscar dados de " + endpoint);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

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

function showMovieDetails(movie) {
    const container = document.getElementById('card-container');
    let carouselItems = movie.carouselImages.map((img, index) => {
        return `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${movie.title}">
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="text-center">
            <h2 class="mb-3">${movie.title}</h2>
            <img src="${movie.image}" class="img-fluid mb-3" style="max-width: 300px; height: auto;">
            <p>${movie.description}</p>
            <p><strong>Lançamento:</strong> ${movie.releaseDate}</p>
            <p><strong>Diretor:</strong> ${movie.director}</p>
            <p><strong>Estúdio:</strong> ${movie.studio}</p>

            <div id="carouselImages" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                <div class="carousel-inner shadow rounded-3">
                    ${carouselItems}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>

            <button class="btn btn-primary mt-3" onclick="window.location.href='index.html'">Voltar</button>
        </div>
    `;
}

window.onload = async function () {
    movies = await carregarDados("movies");
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
