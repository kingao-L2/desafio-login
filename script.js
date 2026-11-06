document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  // Substitua a URL abaixo pelo endpoint real da sua API, se houver
  const API_URL = 'https://reqres.in/api/login'; 

  messageDiv.className = 'message hidden';
  messageDiv.textContent = '';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: usernameInput, // ReqRes usa o campo 'email'
        password: passwordInput
      })
    });

    const data = await response.json();

    if (response.ok && (data.access_token || data.token)) {
      const token = data.access_token || data.token;
      
      // Salva o token no localStorage se necessário
      localStorage.setItem('access_token', token);

      messageDiv.textContent = `Login realizado com sucesso! Access Token: ${token}`;
      messageDiv.className = 'message success';
    } else {
      messageDiv.textContent = data.error || 'Falha ao autenticar. Verifique suas credenciais.';
      messageDiv.className = 'message error';
    }
  } catch (error) {
    messageDiv.textContent = 'Erro ao conectar com o servidor.';
    messageDiv.className = 'message error';
  }
});