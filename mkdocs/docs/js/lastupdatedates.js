async function getLastPublishedRelease(githubRepo) {
	try {
		const res = await fetch(
			`https://api.github.com/repos/Witch-Love/${githubRepo}/releases/latest`,
		);

		if (!res.ok) return;

		const data = await res.json();

		return {
			publish: data.published_at
				? new Date(data.published_at)
				: undefined,
			version: data.tag_name
				? data.tag_name.replace('z', 'r')
				: undefined,
		};
	} catch (error) {
		console.error('Error fetching Github release data:', error);
	}
}

async function replaceLastUpdateDate(githubRepo, replaceText) {
	let dateElement = [...document.querySelectorAll('code')].find(
		(el) => el.textContent.trim() == `<${replaceText}>`,
	);
	let versionElement = [...document.querySelectorAll('code')].find(
		(el) => el.textContent.trim() == `<LAST_UPDATE_VERSION>`,
	);

	if (!dateElement) return;

	dateElement.textContent = 'Tarih bilgisi alınıyor...';
	if (versionElement)
		versionElement.textContent = 'Sürüm bilgisi alınıyor...';

	const data = await getLastPublishedRelease(githubRepo);

	if (data.version) {
		versionElement.textContent = data.version;
	} else {
		versionElement.style.color = '#FF0000';
		dateElement.textContent =
			'Sürüm bilgisi alınırken hata! Sayfayı yenileyin.';
	}

	if (!data.publish) {
		dateElement.style.color = '#FF0000';
		dateElement.textContent =
			'Tarih bilgisi alınırken hata! Sayfayı yenileyin.';
		return;
	}

	dateElement.textContent = data.publish.toLocaleDateString('tr-TR', {
		year: 'numeric',
		month: 'long',
		weekday: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	if (timeago) {
		const relativeDate = timeago.format(data.publish, 'tr');

		const timeagoEl = document.createElement('span');
		timeagoEl.style.color = 'var(--md-code-hl-string-color)';
		timeagoEl.textContent = ' (' + relativeDate + ')';

		dateElement.insertAdjacentElement('beforeend', timeagoEl);
	}
}

function initLastUpdateDates() {
	if (location.pathname.startsWith('/umineko/tr-installation')) {
		replaceLastUpdateDate(
			'umineko-scripting-tr',
			'UMINEKO_LAST_UPDATE_SCRIPTS',
		);
	} else if (location.pathname.startsWith('/higurashi/installation')) {
		replaceLastUpdateDate(
			'higurashi-scripting-tr',
			'HIGURASHI_LAST_UPDATE_SCRIPTS',
		);
	}
}

document$.subscribe(initLastUpdateDates);
