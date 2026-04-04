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

function playAudio(audio, volume = 0.05) {
	audioElement.volume = volume;
	if (lastAudio == audio) return;
	if ((audioElement.paused || audioElement.ended) && !isAudioAllowed())
		return;

	audioElement.src = audio;
	lastAudio = audio;
	audioElement.play();
	audioButton.innerHTML = ICON.PLAYING;
	console.log('Background music started');
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
	lastAudio = 'notset';
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
	if (location.pathname.includes('umineko')) {
		const u_sc = document.querySelector(
			"a[href^='https://github.com/Witch-Love/umineko-scripting-tr/releases/']",
		);

		if (u_sc) {
			fetch(
				'https://api.github.com/repos/Witch-Love/umineko-scripting-tr/releases/latest',
			)
				.then((response) => response.json())
				.then((data) => {
					const latestVersion = data.tag_name;
					const publishedAt = data.published_at
						? new Date(data.published_at)
						: undefined;
					u_sc.innerHTML =
						u_sc.innerHTML + ' (' + latestVersion + ')';
					replaceLastUpdateDate(publishedAt);
				})
				.catch((error) =>
					console.error('Error fetching Umineko script data:', error),
				);
		}

		const u_fi = document.querySelector(
			"a[href^='https://github.com/Witch-Love/umineko-scripting-tr-files/releases/']",
		);

		if (u_fi) {
			fetch(
				'https://api.github.com/repos/Witch-Love/umineko-scripting-tr-files/releases/latest',
			)
				.then((response) => response.json())
				.then((data) => {
					const latestVersion = data.tag_name;
					u_fi.innerHTML =
						u_fi.innerHTML + ' (' + latestVersion + ')';
				})
				.catch((error) =>
					console.error(
						'Error fetching Umineko graphics data:',
						error,
					),
				);
		}
	} else if (location.pathname.includes('higurashi')) {
		const h_scAll = document.querySelectorAll(
			"a[href^='https://github.com/Witch-Love/higurashi-scripting-tr/releases/']",
		);

		h_scAll.forEach((h_sc) => {
			if (h_sc) {
				fetch(
					'https://api.github.com/repos/Witch-Love/higurashi-scripting-tr/releases/latest',
				)
					.then((response) => response.json())
					.then((data) => {
						const latestVersion = data.tag_name;
						const publishedAt = data.published_at
							? new Date(data.published_at)
							: undefined;
						h_sc.innerHTML =
							h_sc.innerHTML + ' (' + latestVersion + ')';
						replaceLastUpdateDate(publishedAt);
					})
					.catch((error) =>
						console.error(
							'Error fetching Higurashi script data:',
							error,
						),
					);
			}
		});
	}
}

const delay = (millis) =>
	new Promise((resolve, _) => {
		setTimeout((_) => resolve(), millis);
	});

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
document$.subscribe(putExternalLinkIcons);
document$.subscribe(versionLinks);
