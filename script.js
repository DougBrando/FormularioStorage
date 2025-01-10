        // Função para carregar dados do armazenamento
        function carregarDados() {
            const nome = localStorage.getItem('nome') || sessionStorage.getItem('nome') || getCookie('nome');
            const sobreNome = localStorage.getItem('sobreNome') || sessionStorage.getItem('sobreNome') || getCookie('sobreNome');
            const idade = localStorage.getItem('idade') || sessionStorage.getItem('idade') || getCookie('idade');
            const senha = localStorage.getItem('senha') || sessionStorage.getItem('senha') || getCookie('senha');
            const tema = localStorage.getItem('tema') || sessionStorage.getItem('tema') || getCookie('tema');

            if (nome) document.querySelector('#nome').value = nome;
            if (sobreNome) document.querySelector('#sobreNome').value = sobreNome;
            if (idade) document.querySelector('#idade').value = idade; // Corrigido para #idade
            if (senha) document.querySelector('#senha').value = senha;
            if (tema) mudarTema(tema);
        }

        // Função para validar a senha usando regex
        function validarSenha() {
            const senha = document.querySelector('#senha').value;
            const feedback = document.querySelector('#feedback');
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (senha === "") {
                feedback.textContent = "Por favor, digite sua senha.";
                feedback.style.color = "orange"; // Cor para indicar que o usuário deve digitar
            } else {
                if (regex.test(senha)) {
                    feedback.textContent = "Senha válida!";
                    feedback.style.color = "green";
                } else {
                    feedback.textContent = "Senha inválida! Deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.";
                    feedback.style.color = "red";
                }
                feedback.style.display = "block";
            }
        }

        // Função para mudar o tema
        function mudarTema(tema) {
            const body = document.body;
            if (tema === 'escuro') {
                body.classList.remove('claro');
                body.classList.add('escuro');
            } else {
                body.classList.remove('escuro');
                body.classList.add('claro');
            }
        }

        // Função para armazenar dados
        function armazenarDados() {
            const guarda = document.querySelector('#guarda').value;
            const nome = document.querySelector('#nome').value;
            const sobreNome = document.querySelector('#sobreNome').value;
            const idade = document.querySelector('#idade').value; // Corrigido para #idade
            const senha = document.querySelector('#senha').value;
            const tema = document.querySelector('#tema').value;

            if (guarda === 'local') {
                localStorage.setItem('nome', nome);
                localStorage.setItem('sobreNome', sobreNome);
                localStorage.setItem('idade', idade);
                localStorage.setItem('senha', senha);
                localStorage.setItem('tema', tema);
                alert('Dados armazenados na memória local.');
            } else if (guarda === 'session') {
                sessionStorage.setItem('nome', nome);
                sessionStorage.setItem('sobreNome', sobreNome);
                sessionStorage.setItem('idade', idade);
                sessionStorage.setItem('senha', senha);
                sessionStorage.setItem('tema', tema);
                alert('Dados armazenados na memória de sessão.');
            } else if (guarda === 'cookies') {
                setCookie('nome', nome, 7);
                setCookie('sobreNome', sobreNome, 7);
                setCookie('idade', idade, 7);
                setCookie('senha', senha, 7);
                setCookie('tema', tema, 7);
                alert('Dados armazenados em cookies.');
            }
        }

        // Função para definir cookies
        function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        // Função para obter cookies
        function getCookie(cname) {
            const name = cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        // Evento de mudança de tema
        document.querySelector('#tema').addEventListener('change', (event) => {
            mudarTema(event.target.value);
        });

        // Evento de envio do formulário
        document.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            armazenarDados();
        });

        // Carregar dados ao iniciar
        carregarDados();
