function gerarSenha() {
  const tamanho = parseInt(document.getElementById("tamanho").value);
  const usarMaiusculas = document.getElementById("maiusculas").checked;
  const usarMinusculas = document.getElementById("minusculas").checked;
  const usarNumeros = document.getElementById("numeros").checked;
  const usarSimbolos = document.getElementById("simbolos").checked;

  const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const simbolos = "!@#$%^&*()_+[]{}|;:,.<>?";

  let caracteres = "";
  if (usarMaiusculas) caracteres += letrasMaiusculas;
  if (usarMinusculas) caracteres += letrasMinusculas;
  if (usarNumeros) caracteres += numeros;
  if (usarSimbolos) caracteres += simbolos;

  if (!caracteres) {
    alert("Selecione pelo menos uma opção.");
    return;
  }

  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const rand = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[rand];
  }

  document.getElementById("senha").value = senha;

  mostrarForca(senha);
  salvarSenha(senha);
  mostrarSenhasSalvas();
}

function mostrarForca(senha) {
  const forca = document.getElementById("forcaSenha");
  let nivel = 0;

  if (senha.length >= 8) nivel++;
  if (/[A-Z]/.test(senha)) nivel++;
  if (/[0-9]/.test(senha)) nivel++;
  if (/[^A-Za-z0-9]/.test(senha)) nivel++;

  const cores = ["red", "orange", "yellow", "lightgreen", "green"];
  forca.innerHTML = `<span style="width: ${nivel * 25}%; background: ${cores[nivel]};"></span>`;
}

function copiarSenha() {
  const campo = document.getElementById("senha");
  campo.select();
  document.execCommand("copy");
  alert("Senha copiada!");
}

function salvarSenha(senha) {
  let senhas = JSON.parse(localStorage.getItem("senhas")) || [];
  senhas.unshift(senha);
  if (senhas.length > 5) senhas = senhas.slice(0, 5);
  localStorage.setItem("senhas", JSON.stringify(senhas));
}

function mostrarSenhasSalvas() {
  const lista = document.getElementById("lista-senhas");
  lista.innerHTML = "";

  const senhas = JSON.parse(localStorage.getItem("senhas")) || [];
  senhas.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    lista.appendChild(li);
  });
}

// Tema claro/escuro
const botaoTema = document.getElementById("toggle-tema");
const corpo = document.body;

botaoTema.addEventListener("click", () => {
  corpo.classList.toggle("dark");
  const modo = corpo.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("tema", modo);
  atualizarTextoBotao(modo);
});

function atualizarTextoBotao(modo) {
  botaoTema.textContent = modo === "dark" ? "Modo Claro" : "Modo Escuro";
}

// Carregar configurações ao iniciar
window.onload = () => {
  const temaSalvo = localStorage.getItem("tema") || "light";
  if (temaSalvo === "dark") corpo.classList.add("dark");
  atualizarTextoBotao(temaSalvo);
  mostrarSenhasSalvas();
};
