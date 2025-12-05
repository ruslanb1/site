		// Full list of configuration options available here:
				// https://github.com/hakimel/reveal.js#configuration
				// Full list of configuration options available here:
		// https://github.com/hakimel/reveal.js#configuration
		Reveal.initialize({
		controls: true,
		history: true,
		slideNumber: "c",
		center: true,

		// Transition style
		transition: 'fade',

		// Добавляем эффект "rotate"
		transitionEffect: 'rotate',

		// PDF exporting properties
		pdfSeparateFragments: false,
		pdfMaxPagesPerSlide: 1,

		// MathJax user-defined functions
		mathjax2: {
			//mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
			config: "TeX-AMS_HTML-full",
			TeX: {
			Macros: {
				R: "\\mathbb{R}",
				C: "\\mathbb{C}",
				N: "\\mathbb{N}",
				Z: "\\mathbb{Z}",
				Q: "\\mathbb{Q}",
				Re: "{\\mbox{Re}}\\,",
				Im: "{\\mbox{Im}}\\,",
				arg: "{\\mbox{arg}}\\,",
				Arg: "{\\mbox{Arg}}\\,",
				Log: "\\mbox{Log}\\,",
				Int: "\\mbox{Int}\\,",
				ra: "\\rightarrow",
				ds: "\\displaystyle",
				res: "\\mbox{res}\\,",
				conj: ["{\\overline{#1}}", 1],
				abs: ["{\\left|#1\\right|}", 1],
				sabs: ["{\\left|#1\\right|}", 1],
				snorm: ["{\\|#1\\|}", 1],
				norm: ["{\\|#1\\|}", 1],
				pd: "\\boldsymbol{\\cdot}",
				epsilon: "\\varepsilon",
				vre: "\\varepsilon",
				Ra: "\\Rightarrow",
				bs: "\\blacksquare",
				nec: "{\\boxed{\\Rightarrow}}",
				suf: "{\\boxed{\\Leftarrow}}",
				coloneqq: "{\\,:=\\,}",
			}
			}
		},

		menu: { // Menu works best with font-awesome installed
			themes: [
			//{ name: 'Black', theme: 'revealjs/dist/theme/black.css' },
			{ name: 'White', theme: 'revealjs/dist/theme/white.css' },
			//{ name: 'Night', theme: 'revealjs/dist/theme/night.css' },
			//{ name: 'Simple', theme: 'revealjs/dist/theme/simple.css' },
			],
			transitions: false,
			markers: true,
			hideMissingTitles: true,
			custom: [{
			title: 'Info',
			icon: '<i class="fa fa-info"></i>',
			src: 'about.html'
			}]
		},

		chalkboard: {
			// src: "chalkboard/chalkboard.json",
			boardmarkerWidth: 4,
			chalkWidth: 3,
			// storage: "chalkboard-demo",
			// background: ['rgb(250,250,250)', path + 'revealjs/third-party-plugin/chalkboard/img/blackdoard.png'],
			grid: { color: 'rgb(50,50,10,0.5)', distance: 80, width: 1 },
			// grid: false,
			chalkEffect: 0.4,
			colorButtons: 5
		},

		customcontrols: {
			controls: [
			{
				id: 'toggle-overview',
				title: 'Обзор переключения (O)',
				icon: '<i class="fa fa-th"></i>',
				action: 'Reveal.toggleOverview();'
			},
			{
				icon: '<i class="fa fa-pen-square"></i>',
				title: 'Доска (B)',
				action: 'RevealChalkboard.toggleChalkboard();'
			},
			{
				icon: '<i class="fa fa-pen"></i>',
				title: 'Toggle notes canvas (C)',
				action: 'RevealChalkboard.toggleNotesCanvas();'
			}
			]
		},

		// подключаем плагины
		plugins: [
			RevealCustomControls,
			RevealMath.MathJax2,
			RevealMenu,
			RevealChalkboard,
			RevealHighlight,
			RevealZoom,
			RevealSearch,
			Appearance
		],
		});

		


/* 
The follwing function is to include an HTML file in the slides
Source: https://www.w3schools.com/howto/howto_html_include.asp
*/

function includeHTML() {
	let z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("include-html");
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
					}
					if (this.status == 404) {
						elmnt.innerHTML = "Page not found.";
					}
					/*remove the attribute, and call this function once more:*/
					elmnt.removeAttribute("include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/*exit the function:*/
			return;
		}
	}
};
document.addEventListener('DOMContentLoaded', function() {
	// Получаем ссылки на элементы лайтбокса
	const lightboxOverlay = document.getElementById('general-lightbox');
	const lightboxContentContainer = document.getElementById('lightbox-content-container');
	// Ищем кнопку закрытия по правильному классу
	const closeButton = lightboxOverlay.querySelector('.close-button');

	// Функция для открытия лайтбокса
	function openLightbox(contentHtml, backgroundUrl = null) {
		// Очищаем предыдущий контент
		lightboxContentContainer.innerHTML = '';

		// Вставляем новый контент
		lightboxContentContainer.innerHTML = contentHtml;

		// Применяем фоновое изображение, если указано
		if (backgroundUrl) {
			lightboxContentContainer.style.backgroundImage = `url('${backgroundUrl}')`;
			lightboxContentContainer.style.backgroundRepeat = 'repeat'; // Или 'no-repeat'
			lightboxContentContainer.style.backgroundSize = 'auto'; // Или 'cover', 'contain'
			lightboxContentContainer.style.backgroundPosition = 'center';
		} else {
			lightboxContentContainer.style.backgroundImage = ''; // Убираем фон, если его нет
		}

		// Показываем лайтбокс, добавляя класс 'active'
		lightboxOverlay.classList.add('active');

		// Опционально: Отключаем прокрутку страницы под лайтбоксом
		document.body.style.overflow = 'hidden';
	}

	// Функция для закрытия лайтбокса
	function closeLightbox() {
		// Скрываем лайтбокс, удаляя класс 'active'
		lightboxOverlay.classList.remove('active');
		// Очищаем контент и фон после закрытия (опционально)
		// setTimeout(() => { // Можно добавить задержку, чтобы очистка происходила после анимации скрытия
		lightboxContentContainer.innerHTML = '';
		lightboxContentContainer.style.backgroundImage = '';
		// }, 300); // Задержка в миллисекундах, соответствует длительности transition

		// Опционально: Включаем прокрутку страницы обратно
		document.body.style.overflow = '';
	}

	// Находим все элементы с классом 'modal-image'
	const modalImages = document.querySelectorAll('.modal-image');

	// Добавляем слушатель клика к каждому 'modal-image'
	modalImages.forEach(image => {
		image.addEventListener('click', function(event) {
			event.preventDefault(); // Предотвращаем действие по умолчанию (если изображение находится в ссылке)

			// Получаем URL изображения из data-preview-image или src
			const imageUrl = this.getAttribute('data-preview-image') || this.getAttribute('src');
			// Получаем URL фонового изображения из data-bg
			const backgroundUrl = this.getAttribute('data-bg');

			// Проверяем, что есть URL изображения перед попыткой открытия
			if (imageUrl) {
				// Создаем HTML для изображения внутри лайтбокса
				const contentHtml = `<img src="${imageUrl}" alt="Увеличенное изображение">`;

				// Открываем лайтбокс с этим контентом и фоном
				openLightbox(contentHtml, backgroundUrl);
			} else {
				console.warn('Изображение с классом .modal-image не имеет атрибутов src или data-preview-image');
			}
		});
	});

	// Добавляем слушатель клика к кнопке закрытия
	closeButton.addEventListener('click', closeLightbox);

	// Добавляем слушатель клика по оверлею для закрытия (если клик вне контента)
	lightboxOverlay.addEventListener('click', function(event) {
		// Проверяем, был ли клик именно по самому оверлею, а не по его дочерним элементам (контенту)
		if (event.target === lightboxOverlay) {
			closeLightbox();
		}
	});

	// Добавляем слушатель нажатия клавиши Esc для закрытия
	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
			closeLightbox();
		}
	});

	// Добавляем обработчик для Reveal.js, чтобы закрывать лайтбокс при смене слайда
	// Убедитесь, что Reveal.js доступен (инициализирован)
	if (window.Reveal) {
		Reveal.on('slidechanged', function(event) {
			// Проверяем, открыт ли лайтбокс, и если да, закрываем его
			if (lightboxOverlay.classList.contains('active')) {
				closeLightbox();
			}
		});
	} else {
		console.warn('Reveal.js не найден. Обработчик slidechanged для лайтбокса не будет работать.');
	}

});
