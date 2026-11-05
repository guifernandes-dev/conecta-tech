// Selecionar os elementos HTML
const body = document.body;
const themeButton = document.getElementById("botaoTema");
const emailInput = document.getElementById("email");
const emailMessage = document.getElementById("mensagemEmail");
const areaSelect = document.getElementById("area");
const areaMessage = document.getElementById("mensagemArea");
const form = document.getElementById("formInscricao");
const participantsList = document.getElementById("listaParticipantes");
const contador = document.getElementById("contador");

const REGEX_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{3,})+$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Criar um Array para armazenar os dados das inscrições

// DESAFIO 1 — Evento de clique
// Ao clicar no botão, alterne o tema da página.
// Dica: classList
themeButton.addEventListener("click", (event) => {
  body.classList.toggle("dark-mode");
  event.target.textContent = body.classList.contains("dark-mode") ? "☀️ Modo claro" : "🌙 Modo escuro";
});

// DESAFIO 2 — Evento de input
// Acompanhe a digitação do e-mail.
// Se o conteúdo tiver "@", apresente uma mensagem positiva.
// Caso contrário, apresente uma orientação.
emailInput.addEventListener("input", () => {
  if (REGEX_EMAIL.test(emailInput.value)) {
    emailMessage.textContent = "E-mail válido!";
  } else {
    emailMessage.textContent = "Por favor, insira um e-mail válido.";
  }
});

// DESAFIO 3 — Evento de change
// Quando a pessoa escolher uma área,
// mostre a opção selecionada na mensagem.
areaSelect.addEventListener("change", (event) => {
  const target = event.target;
  if (target.value === "") {
    areaMessage.textContent = "Por favor, selecione uma área.";
    return;
  }
  areaMessage.textContent = `Área selecionada: ${target.value}`;
});

// DESAFIO 4 — Evento de submit
// Capture os dados e crie um cartão para a pessoa inscrita.
function capturaValores(event) {
  const dados = Object.fromEntries(new FormData(event.target));

  Object.keys(dados).forEach((key) => {
    dados[key] = dados[key].trim();
  });
  const erro = verificaCampos(dados);
  if (erro) {
    return { message: erro };
  }
  return dados;
};

//passos

// a) Capture os valores dos campos.
// Dica: use .value e .trim().
// E verifique se os campos estão preenchidos
function verificaCampos(dados) {
  switch (true) {
    case !REGEX_NOME.test(dados.nome):
      return "Por favor, preencha o nome corretamente.";  
    case recuperaInscritos()
      .map(inscricao => inscricao.email)
      .includes(dados.email):
      return "Este e-mail já foi cadastrado.";
    case !REGEX_EMAIL.test(dados.email):
      return "Por favor, preencha o e-mail corretamente.";
    case !dados.area:
      return "Por favor, selecione uma área de interesse.";
    default:
      return null;
  }
};

// b) Adicione os valores aos arrays usando push().
function recuperaInscritos() {
  return JSON.parse(localStorage.getItem("inscricoes") || "[]");
}

function adicionaInscricao(dados) {
  const inscricoes = recuperaInscritos();
  inscricoes.push(dados);
  localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const response = capturaValores(event);
  if (response.message) {
    alert(response.message);
    return;
  }
  adicionaInscricao(response);
  atualizaParticipantes();
});

// c) Crie um elemento article para representar o cartão.
// Dica: use createElement

// d) Crie os elementos para mostrar:
// - O nome
// - A área de interesse

// e) Adicione as classes CSS necessárias usando classList

// f) Insira os textos nos elementos

// g) Adicione os elementos criados ao cartão com appendChild().
function criaCartao(inscrito) {
  const card = document.createElement("article");
  const nome = document.createElement("h3");
  const area = document.createElement("p");

  nome.textContent = inscrito.nome;
  area.textContent = inscrito.area;

  card.classList.add("participante-card");
  area.classList.add("area-card");

  card.appendChild(nome);
  card.appendChild(area);

  return card;
}

// h) Adicione o cartão à lista de participantes.

// i) Atualize o contador de inscrições usando length.
function atualizaParticipantes() {
  participantsList.innerHTML = "";
  const inscricoes = recuperaInscritos();
  inscricoes.forEach((inscrito) => {
    const card = criaCartao(inscrito);
    participantsList.appendChild(card);
  });
  contador.textContent = inscricoes.length;
}

atualizaParticipantes();
