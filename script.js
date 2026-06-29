const gameCards = document.querySelectorAll(".game-card");
const carouselTrack = document.querySelector("#carouselTrack");
const carouselDots = document.querySelectorAll(".dot");

let currentSlide = 0;
const slideCount = carouselDots.length;

setInterval(showNextSlide, 6500);

function showNextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  carouselDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlide);
  });
}

gameCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const link = card.getAttribute("href");

    if (link === "#") {
      event.preventDefault();
    }

    gameCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
  });
});

// Carrossel de Imagens
const imagesTrack = document.querySelector("#imagesTrack");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
let imageScroll = 0;
const imageWidth = 150 + 12; // largura da imagem + gap

prevBtn.addEventListener("click", () => {
  imageScroll = Math.max(0, imageScroll - imageWidth);
  imagesTrack.scrollLeft = imageScroll;
});

nextBtn.addEventListener("click", () => {
  imageScroll += imageWidth;
  imagesTrack.scrollLeft = imageScroll;
});

// Player de Música
const audioPlayer = document.querySelector("#audioPlayer");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const nextSongBtn = document.querySelector("#nextSongBtn");
const progress = document.querySelector("#progress");
const progressBar = document.querySelector(".progress-bar");
const songName = document.querySelector("#songName");

const songs = [
  {
    src: "assets/City Of Gamers- 5 In 1 Lofi Hip Hop _ Lofi Jazz _ Ambient _ Vaporwave _ Synthwave Mix (4 Hours) - Shipleash (youtube).mp3",
    name: "Cidade de Gamers"
  },
  {
    src: "assets/Musica para estudar e jogar(Músicas LO-FI) - Rafael Gomes (youtube).mp3",
    name: "Música para Estudar e Jogar"
  },
  {
    src: "assets/No Copyright Lo-Fi Music 2022 🎵 LoFi hiphop mix & Chillhop 🎵 Chill lofi mix to study_relax to #14 - Stomp's Playlist (youtube).mp3",
    name: "Lo-Fi Mix #14"
  }
];

let currentSongIndex = 0;

playBtn.addEventListener("click", () => {
  audioPlayer.play();
});

pauseBtn.addEventListener("click", () => {
  audioPlayer.pause();
});

nextSongBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  audioPlayer.play();
});

function loadSong() {
  audioPlayer.src = songs[currentSongIndex].src;
  songName.textContent = songs[currentSongIndex].name;
}

audioPlayer.addEventListener("timeupdate", () => {
  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.style.width = percent + "%";
});

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
});

// Auto-próxima quando a música termina
audioPlayer.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  audioPlayer.play();
});

// === SISTEMA DE LOGIN ===
const loginModal = document.querySelector("#loginModal");
const mainContent = document.querySelector("#mainContent");
const loginForm = document.querySelector("#loginForm");
const changePasswordForm = document.querySelector("#changePasswordForm");
const loginBox = document.querySelector(".login-box");
const changePasswordBox = document.querySelector("#changePasswordBox");
const forgotPasswordBtn = document.querySelector("#forgotPasswordBtn");
const backToLoginBtn = document.querySelector("#backToLoginBtn");
const createAccountBtn = document.querySelector("#createAccountBtn");
const createAccountForm = document.querySelector("#createAccountForm");
const backToLoginFromCreateBtn = document.querySelector("#backToLoginFromCreateBtn");
const createAccountBox = document.querySelector("#createAccountBox");

// Usuários armazenados (localStorage)
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {
  "admin": "admin123",
  "user": "user123"
};

// Verificar se usuário está logado
function verificarLogin() {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  if (usuarioLogado) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
  } else {
    loginModal.style.display = "flex";
    mainContent.style.display = "none";
  }
}

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (usuarios[username] && usuarios[username] === password) {
    localStorage.setItem("usuarioLogado", username);
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    loginForm.reset();
    
    // Mostrar mensagem de sucesso
    alert("Bem-vindo, " + username + "!");
  } else {
    alert("Usuário ou senha incorretos!");
  }
});

// Mostrar tela de alterar senha
forgotPasswordBtn.addEventListener("click", () => {
  loginBox.style.display = "none";
  changePasswordBox.style.display = "block";
});

// Voltar para login
backToLoginBtn.addEventListener("click", () => {
  changePasswordBox.style.display = "none";
  loginBox.style.display = "block";
  changePasswordForm.reset();
});

// Alterar Senha
changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userEmail = document.querySelector("#userEmail").value;
  const newPassword = document.querySelector("#newPassword").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("As senhas não conferem!");
    return;
  }

  if (usuarios[userEmail]) {
    usuarios[userEmail] = newPassword;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Senha alterada com sucesso!");
    changePasswordBox.style.display = "none";
    loginBox.style.display = "block";
    changePasswordForm.reset();
  } else {
    alert("Usuário não encontrado!");
  }
});

// Logout (opcional - adicionar botão de logout no menu)
function logout() {
  localStorage.removeItem("usuarioLogado");
  loginForm.reset();
  changePasswordForm.reset();
  createAccountForm.reset();
  loginBox.style.display = "block";
  changePasswordBox.style.display = "none";
  createAccountBox.style.display = "none";
  verificarLogin();
}

// Mostrar tela de criar conta
createAccountBtn.addEventListener("click", () => {
  loginBox.style.display = "none";
  createAccountBox.style.display = "block";
});

// Voltar para login (criar conta)
backToLoginFromCreateBtn.addEventListener("click", () => {
  createAccountBox.style.display = "none";
  loginBox.style.display = "block";
  createAccountForm.reset();
});

// Criar nova conta
createAccountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUsername = document.querySelector("#newUsername").value;
  const newEmail = document.querySelector("#newEmail").value;
  const createPassword = document.querySelector("#createPassword").value;
  const confirmCreatePassword = document.querySelector("#confirmCreatePassword").value;

  // Validações
  if (createPassword !== confirmCreatePassword) {
    alert("As senhas não conferem!");
    return;
  }

  if (createPassword.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres!");
    return;
  }

  if (usuarios[newUsername]) {
    alert("Este usuário já existe!");
    return;
  }

  // Criar nova conta
  usuarios[newUsername] = createPassword;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Conta criada com sucesso! Faça login com seus dados.");
  
  // Limpar e voltar para login
  createAccountBox.style.display = "none";
  loginBox.style.display = "block";
  createAccountForm.reset();
});

// Inicializar verificação de login
verificarLogin();

// === CHATBOT (GROQCLOUD) ===
const chatToggle = document.querySelector("#chatToggle");
const chatPanel = document.querySelector("#chatPanel");
const chatCloseBtn = document.querySelector("#chatCloseBtn");
const chatConfigBtn = document.querySelector("#chatConfigBtn");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");

// Chave API pré-configurada (fornecida pelo usuário)
localStorage.setItem("groqApiKey", "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");

// Corrige configurações comuns: se o endpoint foi preenchido com a chave (ex: "gsk_..."), corrige e avisa
(function sanitizeGroqConfig(){
  const ep = localStorage.getItem('groqEndpoint');
  const key = localStorage.getItem('groqApiKey');
  if (ep && ep.startsWith('gsk_')) {
    // Usuário provavelmente colocou a chave no campo de endpoint
    localStorage.setItem('groqApiKey', ep);
    localStorage.removeItem('groqEndpoint');
    alert('Detectei que o endpoint contém uma chave (gsk_...). Mudei para a configuração de API Key e limpei o endpoint. Por favor, abra ⚙️ e cole a URL do endpoint GroqCloud (ex.: https://seu-endpoint.groqcloud.com/v1).');
  } else if (ep && !ep.startsWith('http')) {
    // Endpoint parece inválido (não começa com http)
    alert('Atenção: o endpoint salvo não parece começar com "http". Verifique em ⚙️ que você salvou a URL correta do endpoint.');
  }
})();

function openChat() {
  chatPanel.style.display = "flex";
  chatPanel.setAttribute("aria-hidden", "false");
  chatInput.focus();
}

function closeChat() {
  chatPanel.style.display = "none";
  chatPanel.setAttribute("aria-hidden", "true");
}

chatToggle.addEventListener("click", () => {
  if (chatPanel.style.display === "flex") closeChat(); else openChat();
});

chatCloseBtn.addEventListener("click", closeChat);

chatConfigBtn.addEventListener("click", () => {
  const currentEndpoint = localStorage.getItem("groqEndpoint") || "";
  const currentKey = localStorage.getItem("groqApiKey") || "";
  const endpoint = prompt("Insira a URL do endpoint GroqCloud:", currentEndpoint);
  if (endpoint !== null) localStorage.setItem("groqEndpoint", endpoint);
  const key = prompt("Insira sua API Key GroqCloud (Bearer):", currentKey);
  if (key !== null) localStorage.setItem("groqApiKey", key);
  alert("Configurações salvas. Feche e reabra o chat para usar.");
});

function addMessage(role, text) {
  const el = document.createElement("div");
  el.className = `chat-message ${role}`;
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function parseGroqData(data) {
  if (!data) return '(Resposta inválida)';

  // novo formato: chat completion { choices: [{ message: { role, content } }] }
  if (data.choices && Array.isArray(data.choices) && data.choices.length) {
    const ch = data.choices[0];
    if (ch.message) {
      if (typeof ch.message.content === 'string') return ch.message.content;
      if (typeof ch.message === 'string') return ch.message;
      // suportar estrutura alternativa
      if (ch.message.content?.text) return ch.message.content.text;
    }
    if (ch.text) return ch.text;
    if (ch.content) return ch.content;
  }

  if (data.output) {
    if (typeof data.output === 'string') return data.output;
    if (Array.isArray(data.output)) return data.output.map(o => o.text || JSON.stringify(o)).join('\n');
    if (data.output.text) return data.output.text;
  }

  if (data.result) return typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
  if (data.message) return typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
  if (data.text) return data.text;

  // último recurso
  try { return JSON.stringify(data); } catch (e) { return String(data); }
}

async function sendToGroq(message) {
  const endpoint = localStorage.getItem("groqEndpoint");
  const apiKey = localStorage.getItem("groqApiKey");
  if (!endpoint || !apiKey) throw new Error("Endpoint ou API key não configurados.");
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  const payloadCandidates = [
    { input: message },
    { prompt: message },
    { text: message },
    { query: message },
    { messages: [{ role: 'user', content: message }] }
  ];

  // Tenta POSTs com diferentes formatos até um sucesso ou erro irreversível
  for (const payload of payloadCandidates) {
    let res;
    try {
      res = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(payload) });
    } catch (err) {
      throw new Error(`Falha na requisição POST: ${err.message}`);
    }

    // Se o servidor não aceita POST, tenta GET fallback (mantendo comportamento anterior)
    if (res.status === 405) {
      const url = endpoint + (endpoint.includes('?') ? '&' : '?') + 'input=' + encodeURIComponent(message);
      try {
        const getRes = await fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${apiKey}` } });
        if (!getRes.ok) {
          const txt = await getRes.text().catch(() => '(sem corpo)');
          throw new Error(`GET falhou: ${getRes.status} ${txt}`);
        }
        const dataGet = await getRes.json().catch(() => null);
        return parseGroqData(dataGet);
      } catch (err) {
        throw new Error(`POST 405 e GET falhou: ${err.message}`);
      }
    }

   
    if (res.ok) {
      const data = await res.json().catch(() => null);
      return parseGroqData(data);
    }

    // Se erro 400 e o corpo indicar propriedade não suportada, tenta próximo formato
    if (res.status === 400) {
      const bodyText = await res.text().catch(() => '');
      // Se o servidor reclamar que "model" está faltando, solicita ao usuário e reenvia com model
      if (bodyText && /property\s*'?model'?\s*.*missing|property\s*'?model'?\s*is missing/i.test(bodyText)) {
        let model = localStorage.getItem('groqModel') || '';
        if (!model) {
          model = prompt('O endpoint requer o campo "model". Informe o model id (ex: gpt-4o-mini):', '');
          if (model) localStorage.setItem('groqModel', model);
        }
        if (model) {
          // tenta reenviar o mesmo payload agora incluindo model
          try {
            const resWithModel = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(Object.assign({}, payload, { model })) });
            if (resWithModel.ok) {
              const data = await resWithModel.json().catch(() => null);
              return parseGroqData(data);
            }
            const txt = await resWithModel.text().catch(() => '(sem corpo)');
            throw new Error(`Requisição com model falhou: ${resWithModel.status} ${txt}`);
          } catch (err) {
            throw new Error(`Falha ao reenviar com model: ${err.message}`);
          }
        }
        // se não informou model, tenta próximo payload
        continue;
      }
      if (bodyText && /unsupported|unsupported property|property 'input' is unsupported/i.test(bodyText)) {
        // tenta próximo payload
        continue;
      }
      throw new Error(`Erro na requisição: ${res.status} ${bodyText}`);
    }

    // Outros erros: aborta
    const otherText = await res.text().catch(() => '(sem corpo)');
    throw new Error(`Erro na requisição: ${res.status} ${otherText}`);
  }

  // Se esgotou os formatos
  throw new Error('Nenhum formato de payload foi aceito pelo endpoint. Verifique a documentação do GroqCloud.');
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage('user', text);
  chatInput.value = '';

  
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-message bot';
  typingEl.textContent = '...';
  chatMessages.appendChild(typingEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const reply = await sendToGroq(text);
    typingEl.textContent = reply;
  } catch (err) {
    typingEl.textContent = 'Erro: ' + (err.message || 'falha na requisição');
  }
});

// Atalho para abrir chat com Ctrl+K
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openChat();
  }
});

