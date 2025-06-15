const API_URL = "http://localhost:3000"; // json-server URL

let filmes = [];
let usuarios = [];

// Elementos do DOM
const loginForm = document.getElementById("login-form");
const inputUsuario = document.getElementById("inputUsuario");
const inputSenha = document.getElementById("inputSenha");
const divBoasVindas = document.getElementById("boas-vindas");
const btnLogout = document.getElementById("btnLogout");
const cardsContainer = document.getElementById("cards-filmes");
const buscaInput = document.getElementById("busca");

// Carregar usuários e filmes do servidor
async function carregarDados() {
  try {
    const [respUsuarios, respFilmes] = await Promise.all([
      fetch(`${API_URL}/usuarios`),
      fetch(`${API_URL}/filmes`),
    ]);
    if (!respUsuarios.ok || !respFilmes.ok) throw new Error("Erro ao carregar dados");

    usuarios = await respUsuarios.json();
    filmes = await respFilmes.json();

    exibirFilmes(filmes);
    checarLogin();
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

// Exibir filmes em cards
function exibirFilmes(lista) {
  cardsContainer.innerHTML = "";

  if (lista.length === 0) {
    cardsContainer.innerHTML = "<p class='text-center text-white'>Nenhum filme encontrado.</p>";
    return;
  }

  lista.forEach(filme => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

    card.innerHTML = `
      <div class="card h-100 bg-dark text-white shadow" style="cursor:pointer">
        <img src="${filme.imagemCard}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${filme.titulo}</h5>
          <button class="btn btn-outline-light mt-auto" data-id="${filme.id}">Ver detalhes</button>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);

    // Evento para abrir modal/carrossel com detalhes
    card.querySelector("button").addEventListener("click", () => abrirDetalhes(filme));
  });
}

// Abrir modal com detalhes e carrossel
function abrirDetalhes(filme) {
  // Criar modal dinâmico Bootstrap
  const modalId = "modalDetalhes";

  // Remover modal antigo se existir
  const antigoModal = document.getElementById(modalId);
  if (antigoModal) antigoModal.remove();

  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = modalId;
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "modalLabel");
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">${filme.titulo}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          <p>${filme.descricao}</p>
          <p><strong>Lançamento:</strong> ${filme.dataLancamento}</p>
          <p><strong>Diretor:</strong> ${filme.diretor}</p>
          <p><strong>Estúdio:</strong> ${filme.estudio}</p>

          <div id="carouselDetalhes" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${filme.imagensCarrossel.map((img, i) => `
                <div class="carousel-item ${i === 0 ? "active" : ""}">
                  <img src="${img}" class="d-block w-100 rounded" alt="Imagem ${i + 1}">
                </div>
              `).join('')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Próximo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Mostrar modal via Bootstrap
  const modalBootstrap = new bootstrap.Modal(modal);
  modalBootstrap.show();

  // Remover modal do DOM ao fechar para evitar acúmulo
  modal.addEventListener("hidden.bs.modal", () => {
    modal.remove();
  });
}

// Checar login no localStorage e mostrar ou ocultar formulários/boas-vindas
function checarLogin() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuarioLogado) {
    loginForm.style.display = "none";
    divBoasVindas.style.display = "block";
    divBoasVindas.textContent = `Bem-vindo, ${usuarioLogado.nome}!`;
    btnLogout.style.display = "inline-block";
  } else {
    loginForm.style.display = "block";
    divBoasVindas.style.display = "none";
    btnLogout.style.display = "none";
  }
}

// Login - verifica credenciais
async function login(event) {
  event.preventDefault();

  const usuarioInput = inputUsuario.value.trim();
  const senhaInput = inputSenha.value.trim();

  if (!usuarioInput || !senhaInput) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  try {
    // Busca usuário na lista local
    const usuario = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInput);

    if (!usuario) {
      alert("Usuário ou senha incorretos.");
      return;
    }

    // Salvar no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    checarLogin();

    // Limpar formulário
    loginForm.reset();

  } catch (error) {
    console.error("Erro no login:", error);
  }
}

// Logout - limpa localStorage e atualiza interface
function logout() {
  localStorage.removeItem("usuarioLogado");
  checarLogin();
}

// Busca filmes por título ou diretor
function buscarFilmes() {
  const termo = buscaInput.value.trim().toLowerCase();

  const filtrados = filmes.filter(filme =>
    filme.titulo.toLowerCase().includes(termo) ||
    filme.diretor.toLowerCase().includes(termo)
  );

  exibirFilmes(filtrados);
}

// Eventos
loginForm.addEventListener("submit", login);
btnLogout.addEventListener("click", logout);
buscaInput.addEventListener("input", buscarFilmes);

// Inicialização
carregarDados();
