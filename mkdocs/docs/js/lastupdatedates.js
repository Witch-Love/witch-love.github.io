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
			release_notes: data.body ?? '',
		};
	} catch (error) {
		console.error('Error fetching Github release data:', error);
	}
	return {};
}

async function replaceLastUpdateInfo(githubRepo) {
	const elements = [...document.querySelectorAll('code')];
	const dateElement = elements.find(
		(el) => el.textContent.trim() == `<LAST_UPDATE_SCRIPTS>`,
	);
	const versionElement = elements.find(
		(el) => el.textContent.trim() == `<LAST_UPDATE_VERSION>`,
	);
	const releaseNotesElement = elements.find(
		(el) => el.textContent.trim() == `<LAST_UPDATE_RELEASE_NOTES>`,
	);

	if (!dateElement || !versionElement || !releaseNotesElement) return;

	dateElement.textContent = 'Tarih bilgisi alınıyor...';
	versionElement.textContent = 'Sürüm bilgisi alınıyor...';
	releaseNotesElement.textContent = 'Sürüm notları alınıyor...';

	const data = await getLastPublishedRelease(githubRepo);

	if (data.version) {
		versionElement.textContent = data.version;
	} else {
		versionElement.style.color = '#FF0000';
		versionElement.textContent = 'Sürüm bilgisi alınırken hata!';
	}

	if (data.publish) {
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
	} else {
		dateElement.style.color = '#FF0000';
		dateElement.textContent = 'Tarih bilgisi alınırken hata!';
	}

	if (data.release_notes) {
		releaseNotesElement.style.color = 'var(--md-code-hl-keyword-color)';
		releaseNotesElement.textContent = data.release_notes;
	} else {
		releaseNotesElement.style.color = '#FF0000';
		releaseNotesElement.textContent =
			'Sürüm notları alınırken hata!\nİnternet bağlantınızı kontrol edin ve sayfayı yenileyin.';
	}
}

function initLastUpdateDates() {
	if (location.pathname.startsWith('/umineko/tr-installation')) {
		replaceLastUpdateInfo('umineko-scripting-tr');
	} else if (location.pathname.startsWith('/higurashi/installation')) {
		replaceLastUpdateInfo('higurashi-scripting-tr');
	}
}

document$.subscribe(initLastUpdateDates);
