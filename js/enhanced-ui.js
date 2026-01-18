// ===========================
// ENHANCED UI SCRIPT FOR SUISAI PRO
// Scroll to Top Button & Navigation Enhancement
// ===========================

// Создание кнопки "Наверх"
function createScrollToTopButton() {
    // Проверяем, не существует ли уже кнопка
    if (document.getElementById('scrollToTop')) {
        return;
    }
    
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Прокрутить наверх');
    button.setAttribute('title', 'Наверх');
    
    document.body.appendChild(button);
    
    // Обработчик клика
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Показываем/скрываем кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
}

// Плавная прокрутка для якорных ссылок
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Игнорируем пустые якоря
            if (href === '#' || href === '') {
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Добавление валидации к полям формы
function initFormValidation() {
    const dayInput = document.querySelector('input[placeholder="дд"]');
    const monthInput = document.querySelector('input[placeholder="мм"]');
    const yearInput = document.querySelector('input[placeholder="гггг"]');
    
    if (dayInput) {
        dayInput.setAttribute('required', 'required');
        dayInput.setAttribute('min', '1');
        dayInput.setAttribute('max', '31');
    }
    
    if (monthInput) {
        monthInput.setAttribute('required', 'required');
        monthInput.setAttribute('min', '1');
        monthInput.setAttribute('max', '12');
    }
    
    if (yearInput) {
        yearInput.setAttribute('required', 'required');
        yearInput.setAttribute('min', '1900');
        yearInput.setAttribute('max', '2050');
    }
}

// Улучшение навигационного меню
function enhanceNavigation() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Добавляем эффект при прокрутке
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 12px rgba(107, 70, 193, 0.4)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(107, 70, 193, 0.3)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Анимация появления карточек
function animateCards() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        createScrollToTopButton();
        initSmoothScroll();
        initFormValidation();
        enhanceNavigation();
        animateCards();
    });
} else {
    // DOM уже загружен
    createScrollToTopButton();
    initSmoothScroll();
    initFormValidation();
    enhanceNavigation();
    animateCards();
}

// Экспорт для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createScrollToTopButton,
        initSmoothScroll,
        initFormValidation,
        enhanceNavigation,
        animateCards
    };
}
