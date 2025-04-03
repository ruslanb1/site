// Функция для динамической подстройки высоты
function adjustEmbeds() {
    const embeds = document.querySelectorAll('.responsive-embed object');
    
    // Размеры для разных устройств
    const breakpoints = {
        mobile: 480,
        tablet: 768,
        desktop: 1024
    };
    
    const width = window.innerWidth;
    let aspectRatio;
    
    if (width < breakpoints.mobile) {
        aspectRatio = 1;       // Квадрат для мобильных
    } else if (width < breakpoints.tablet) {
        aspectRatio = 4/3;    // 4:3 для планшетов
    } else {
        aspectRatio = 16/9;   // 16:9 для десктопов
    }
    
    embeds.forEach(embed => {
        const containerWidth = embed.offsetWidth;
        const newHeight = containerWidth / aspectRatio;
        
        // Ограничения по высоте
        const minHeight = 300;
        const maxHeight = 800;
        const finalHeight = Math.min(maxHeight, Math.max(minHeight, newHeight));
        
        embed.style.height = `${finalHeight}px`;
        
        // Отправляем сообщение о resize вложенным страницам
        if (embed.contentDocument) {
            embed.contentWindow.postMessage({
                type: 'resize',
                width: containerWidth,
                height: finalHeight
            }, '*');
        }
    });
}

// Инициализация
window.addEventListener('load', () => {
    adjustEmbeds();
    
    // Ресиза после загрузки всех ресурсов
    window.addEventListener('load', adjustEmbeds, true);
    
    // Обработчик для сообщений от вложенных страниц
    window.addEventListener('message', (e) => {
        if (e.data.type === 'resizeRequest') {
            adjustEmbeds();
        }
    });
});

// Оптимизированный ресайз
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(adjustEmbeds, 100);
});