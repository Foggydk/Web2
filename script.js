// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Закрытие мобильного меню после клика
            const navMenu = document.querySelector('nav ul');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Мобильное меню
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', function () {
        const navMenu = document.querySelector('nav ul');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
}

// Модальные окна для портфолио
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');

// Открытие модальных окон
portfolioItems.forEach(item => {
    item.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Закрытие модальных окон
closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Закрытие модальных окон по клику вне контента
modals.forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Валидация формы
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Валидация имени
        if (name === '') {
            isValid = false;
            showError('name', 'Пожалуйста, введите ваше имя');
        } else {
            removeError('name');
        }

        // Валидация email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            isValid = false;
            showError('email', 'Пожалуйста, введите ваш email');
        } else if (!emailPattern.test(email)) {
            isValid = false;
            showError('email', 'Пожалуйста, введите корректный email');
        } else {
            removeError('email');
        }

        // Валидация сообщения
        if (message === '') {
            isValid = false;
            showError('message', 'Пожалуйста, введите ваше сообщение');
        } else {
            removeError('message');
        }

        if (isValid) {
            // В реальном проекте здесь был бы код для отправки данных на сервер
            alert('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.');
            this.reset();
        }
    });
}

// Функция показа ошибок