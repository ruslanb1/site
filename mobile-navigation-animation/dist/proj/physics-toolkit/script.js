document.addEventListener('DOMContentLoaded', function() {
    // Проверка ответов
    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const answerField = this.closest('.answer-field');
            const input = answerField.querySelector('.answer-input');
            const resultIcon = answerField.querySelector('.result-icon');
            const correctAnswer = parseFloat(input.dataset.correct);
            const userAnswer = parseFloat(input.value);
            
            if (isNaN(userAnswer)) {
                resultIcon.textContent = '✗';
                resultIcon.className = 'result-icon incorrect';
                resultIcon.title = 'Введите число!';
                return;
            }
            
            // Допустимая погрешность 1%
            if (Math.abs(userAnswer - correctAnswer) <= correctAnswer * 0.01) {
                resultIcon.textContent = '✓';
                resultIcon.className = 'result-icon correct';
                resultIcon.title = 'Верный ответ!';
            } else {
                resultIcon.textContent = '✗';
                resultIcon.className = 'result-icon incorrect';
                resultIcon.title = 'Неверный ответ';
            }
        });
    });
    
    // Проверка по нажатию Enter
    document.querySelectorAll('.answer-input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.nextElementSibling.nextElementSibling.click();
            }
        });
    });
});