document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Dinâmico (Muda cor ao rolar) ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Animação de Scroll (Intersection Observer) ---
    // Seleciona todos os elementos que tem a classe 'hidden'
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Se o elemento estiver visível na tela
            if (entry.isIntersecting) {
                // Adiciona a classe 'show' que traz a opacidade e posição correta
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 // Ativa quando 10% do elemento estiver visível
    });

    // Manda o observador vigiar todos os elementos ocultos
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 3. Efeito de Digitação no Título ---
    const textElement = document.querySelector('.typing-effect');
    const words = ["Edição de Vídeo", "Motion Graphics", "Color Grading"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Apagando
            textElement.textContent = currentWord.substring(0, charIndex--);
        } else {
            // Escrevendo
            textElement.textContent = currentWord.substring(0, charIndex++);
        }

        // Velocidade de digitação
        let typeSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && charIndex === currentWord.length + 1) {
            // Palavra completa, espera um pouco antes de apagar
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Palavra apagada totalmente, passa para a próxima
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Inicia o efeito de digitação
    typeEffect();
});

function liberarBotao() {
    // Busca o botão pelo ID e remove o bloqueio
    const botao = document.getElementById("btnEnviar");
    botao.removeAttribute("disabled");
}

function onSubmit(token) {
    document.getElementById("demo-form").submit();
  }
