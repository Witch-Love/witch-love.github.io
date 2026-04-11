const audioElement = document.createElement('audio');
const audioClickElement = document.createElement('audio');
const audioButton = document.createElement('button');
let lastAudio = 'notset';

const ICON = {
	MUTED: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2025 Fonticons, Inc.--><path d="M48 352h48l134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8V66.8c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160H48c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48m319-177c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0"/></svg>',
	PLAYING:
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2025 Fonticons, Inc.--><path d="M533.6 32.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8c54.2 44 88.7 111 88.7 186.2s-34.5 142.2-88.7 186.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C598.5 426.7 640 346.2 640 256S598.5 85.2 533.6 32.5M473.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C475.3 170.7 496 210.9 496 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C393.1 227.6 400 241 400 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c21.5-17.7 35.4-44.5 35.4-74.6s-13.9-56.9-35.4-74.5M80 352h48l134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8V66.8c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L128 160H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48"/></svg>',
	PAUSED: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2025 Fonticons, Inc.--><path d="M96 352H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48h48L230.1 40.8c6.4-5.7 14.6-8.8 23.1-8.8 19.2 0 34.8 15.6 34.8 34.8v378.4c0 19.2-15.6 34.8-34.8 34.8-8.5 0-16.7-3.1-23.1-8.8z"/></svg>',
	LINK: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2m6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.75.75 0 0 1-1.042-.018.75.75 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1"></path></svg>',
};

const isAudioAllowed = () => localStorage.getItem('allowAudio') !== 'false';

function playClick() {
	audioClickElement.play();
}

async function playAudio(audio, volume = 0.05) {
	audioElement.volume = volume;
	if (lastAudio == audio) return;
	if ((audioElement.paused || audioElement.ended) && !isAudioAllowed())
		return;

	audioElement.src = audio;
	lastAudio = audio;
	await audioElement.play();
	audioButton.innerHTML = ICON.PLAYING;
	console.log('Background music started');

	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: 'Background Music',
			artist: 'Witch Love',
			artwork: [
				{ src: '/img/logo.png', sizes: '575x575', type: 'image/png' },
			],
		});
		navigator.mediaSession.setActionHandler('play', continueAudio);
		navigator.mediaSession.setActionHandler('pause', pauseAudio);
		navigator.mediaSession.setActionHandler('stop', pauseAudio);
	}
}

function disableAudio() {
	audioElement.pause();
	lastAudio = 'notset';
	localStorage.setItem('allowAudio', 'false');
	audioButton.innerHTML = ICON.MUTED;
}

function enableAudio() {
	localStorage.setItem('allowAudio', 'true');
}

function pauseAudio() {
	audioElement.pause();
	audioButton.innerHTML = ICON.PAUSED;
}

function continueAudio() {
	audioElement.play();
	audioButton.innerHTML = ICON.PLAYING;
}

function audioMain() {
	audioElement.src = '';
	audioElement.loop = true;
	audioElement.autoplay = false;
	audioElement.hidden = true;
	audioElement.volume = 0.05;
	audioElement.preload = 'none';
	document.body.insertAdjacentElement('afterbegin', audioElement);

	audioClickElement.src = '/sound/click.mp3';
	audioClickElement.loop = false;
	audioClickElement.autoplay = false;
	audioClickElement.hidden = true;
	audioClickElement.volume = 0.035;
	audioClickElement.preload = 'auto';
	document.body.insertAdjacentElement('afterbegin', audioClickElement);

	const header = document.querySelector("div[class^='md-header__title']");
	if (header) {
		const divEl = document.createElement('div');
		divEl.classList = 'md-header__option';
		audioButton.classList = 'md-header__button md-icon';
		audioButton.ariaLabel = 'Müziği aç/kapa';
		audioButton.innerHTML = isAudioAllowed() ? ICON.PAUSED : ICON.MUTED;
		header.insertAdjacentElement('afterend', divEl);
		divEl.appendChild(audioButton);

		document.addEventListener('click', (e) => {
			const el = e.target?.closest('a');
			if (!el) return;

			playClick();
		});

		audioButton.addEventListener('click', () => {
			playClick();
			if (isAudioAllowed()) {
				disableAudio();
			} else {
				enableAudio();
			}
		});
	}

	const applyAudio = () => {
		if (!isAudioAllowed()) return;

		if (location.pathname === '/') {
			playAudio('/sound/rain.mp3', 0.01);
		} else if (location.pathname.startsWith('/umineko/')) {
			playAudio('/sound/umineko.mp3', 0.035);
		} else if (location.pathname.startsWith('/higurashi/')) {
			playAudio('/sound/higurashi.mp3', 0.015);
		} else {
			playAudio('/sound/clock.mp3', 0.02);
		}
	};

	document.addEventListener('click', applyAudio);
	window.addEventListener('locationchange', applyAudio);
}

const originalPush = history.pushState;
history.pushState = function (...args) {
	originalPush.apply(this, args);
	window.dispatchEvent(new Event('locationchange'));
};

window.addEventListener('popstate', () =>
	window.dispatchEvent(new Event('locationchange')),
);

function putExternalLinkIcons() {
	const site_url = location.origin;

	const page_content = document.querySelector('pagecontent');

	if (!page_content) return;

	page_content.querySelectorAll('a[href]').forEach((link) => {
		const href = link.getAttribute('href');

		if (
			href.startsWith('http') &&
			(!href.startsWith(site_url) ||
				link.getAttribute('target') == '_blank')
		) {
			link.setAttribute('target', '_blank');

			if (link.className != '') return;

			for (node of link.childNodes) {
				if (node.constructor.name == 'Text' || node.nodeName != 'IMG') {
					link.innerHTML +=
						' <span class="twemoji">' + ICON.LINK + '</span>';
					break;
				}
			}
		}
	});
}

function replaceLastUpdateDate(newDate) {
	let dateElement = [...document.querySelectorAll('code')].find(
		(el) => el.textContent.trim() == '<Tarih>',
	);

	if (!newDate || !dateElement) return;

	dateElement.textContent = newDate.toLocaleDateString('tr-TR', {
		year: 'numeric',
		month: 'long',
		weekday: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
}

function versionLinks() {
	if (location.pathname.startsWith('/umineko/tr-installation')) {
		fetch(
			'https://api.github.com/repos/Witch-Love/umineko-scripting-tr/releases/latest',
		)
			.then((response) => response.json())
			.then((data) => {
				const publishedAt = data.published_at
					? new Date(data.published_at)
					: undefined;
				replaceLastUpdateDate(publishedAt);
			})
			.catch((error) =>
				console.error('Error fetching Umineko script data:', error),
			);
	} else if (location.pathname.startsWith('/higurashi/installation')) {
		fetch(
			'https://api.github.com/repos/Witch-Love/higurashi-scripting-tr/releases/latest',
		)
			.then((response) => response.json())
			.then((data) => {
				const publishedAt = data.published_at
					? new Date(data.published_at)
					: undefined;
				replaceLastUpdateDate(publishedAt);
			})
			.catch((error) =>
				console.error('Error fetching Higurashi script data:', error),
			);
	}
}

function checkVersion() {
	if (!location.pathname.startsWith('/umineko/checkversion')) return;

	const submitBtn = document.getElementById('submit-checkversion');
	if (!submitBtn) return;

	const reportParams = new URL(location.href).searchParams;
	const currentVersionEl = document.getElementById('currentversion');

	if (currentVersionEl) {
		const query = reportParams.get('currentversion');
		if (query) {
			currentVersionEl.value = query;
			currentVersionEl.readOnly = true;
		}
	}

	const form = document.getElementById('checkversion');

	if (form) {
		form.addEventListener('submit', async (e) => {
			e.preventDefault();

			const data = Object.fromEntries(new FormData(form));

			if (!data.currentversion) {
				alert('Versiyon alanı boş bırakılamaz.');
				return;
			}

			submitBtn.disabled = true;

			try {
				const latest = await getLatestVersion();

				if (data.currentversion.includes(latest)) {
					showAlert('Türkçe oyun versiyonu güncel!', 10000);
				} else {
					showAlert(
						'Türkçe oyun versiyonu güncel değil!<br />Yeni sürümü yükleyin.',
						10000,
					);
				}
			} catch (error) {
				showAlert(
					'Versiyon kontrolü yapılırken bir hata oluştu!<br />Lütfen daha sonra tekrar dene.',
					10000,
				);
			}

			submitBtn.disabled = false;
		});
	}
}

async function getLatestVersion() {
	const res = await fetch(
		'https://api.github.com/repos/Witch-Love/umineko-scripting-tr/releases/latest',
	);

	const data = await res.json();

	const latestVersion = data.tag_name.replace('z', 'r');

	return latestVersion;
}

function report() {
	if (!location.pathname.startsWith('/umineko/contributing/report')) return;

	const submitBtn = document.getElementById('submit-report');
	if (!submitBtn) return;

	const reportParams = new URL(location.href).searchParams;
	const chapterEl = document.getElementById('chapter');
	const versionEl = document.getElementById('version');
	const messageEl = document.getElementById('message');

	if (chapterEl) {
		const query = reportParams.get('chapter');
		if (query) {
			chapterEl.value = query;
			chapterEl.readOnly = true;
		}
	}
	if (versionEl) {
		const query = reportParams.get('version');
		if (query) {
			versionEl.value = query;
			versionEl.readOnly = true;
		}
	}
	if (messageEl) {
		const query = reportParams.get('text');
		if (query) {
			messageEl.value = query;
		}
	}

	const form = document.getElementById('report');

	if (form) {
		form.addEventListener('submit', async (e) => {
			e.preventDefault();

			const data = Object.fromEntries(new FormData(form));

			if (!data.chapter || !data.message) {
				showAlert('Chapter ve mesaj alanları boş bırakılamaz.', 10000);
				return;
			}

			submitBtn.disabled = true;

			const json = JSON.stringify(data);

			try {
				const res = await fetch('https://api.witch-love.com/report', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: json,
				});

				const data = await res.json();

				if (res.ok) {
					showAlert(
						'Hata bildirimin gönderildi.<br />Yardımın için çok teşekkür ederiz!<br /><br />Bildirim kodun:<br /><strong>' +
							data.id +
							'</strong><br /><br />Düzeltilen hataların kodları güncelleme notlarına eklenir.',
						30000,
					);
					form.reset();
				} else {
					throw new Error();
				}
			} catch (error) {
				showAlert(
					'Hata bildirimi gönderilirken bir sorun oluştu!<br />Lütfen daha sonra tekrar dene.',
					10000,
				);
			}

			submitBtn.disabled = false;
		});
	}
}

const delay = (millis) =>
	new Promise((resolve, _) => {
		setTimeout((_) => resolve(), millis);
	});

let alertTimeout;
let alertStart;
let alertDuration;

function showAlert(message, duration = 3000) {
	const el = document.getElementById('alert');
	const text = document.getElementById('alert-text');
	const bar = el.querySelector('.md-alert__bar');

	text.innerHTML = message;

	el.classList.remove('md-alert--hidden');
	el.classList.add('md-alert--show');

	alertStart = Date.now();
	alertDuration = duration;

	bar.style.transition = 'none';
	bar.style.transform = 'scaleX(1)';

	requestAnimationFrame(() => {
		bar.style.transition = `transform ${duration}ms linear`;
		bar.style.transform = 'scaleX(0)';
	});

	clearTimeout(alertTimeout);
	alertTimeout = setTimeout(closeAlert, duration);
}

function closeAlert() {
	const el = document.getElementById('alert');
	el.classList.remove('md-alert--show');
	el.classList.add('md-alert--hidden');

	clearTimeout(alertTimeout);
}

document.addEventListener('DOMContentLoaded', () => {
	var {
		OverlayScrollbars,
		ScrollbarsHidingPlugin,
		SizeObserverPlugin,
		ClickScrollPlugin,
	} = OverlayScrollbarsGlobal;

	const osInstance = OverlayScrollbars(document.body, {
		scrollbars: {
			theme: 'os-theme-light',
		},
	});
});
document.addEventListener('DOMContentLoaded', audioMain);
document.addEventListener('DOMContentLoaded', () => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		`<div class="md-alert-wrapper">
		<div id="alert" class="md-alert md-alert--hidden">
			<div class="md-alert__content">
				<span id="alert-text">Mesaj</span>
				<button class="md-alert__close" onclick="closeAlert()">×</button>
			</div>

			<div class="md-alert__progress">
				<div class="md-alert__bar"></div>
			</div>
		</div>
	</div>`,
	);
});
document$.subscribe(putExternalLinkIcons);
document$.subscribe(versionLinks);
document$.subscribe(report);
document$.subscribe(checkVersion);
