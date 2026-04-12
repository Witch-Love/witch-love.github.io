async function getLastPublishedDate(githubRepo) {
	try {
		const res = await fetch(
			`https://api.github.com/repos/Witch-Love/${githubRepo}/releases/latest`,
		);

		if (!res.ok) return;

		const data = await res.json();

		return data.published_at ? new Date(data.published_at) : undefined;
	} catch (error) {
		console.error('Error fetching Github release data:', error);
	}
}

async function replaceLastUpdateDate(githubRepo) {
	let dateElement = [...document.querySelectorAll('code')].find(
		(el) => el.textContent.trim() == '<Tarih>',
	);

	if (!dateElement) return;

	const lastPublished = await getLastPublishedDate(githubRepo);

	if (!lastPublished) return;

	dateElement.textContent = lastPublished.toLocaleDateString('tr-TR', {
		year: 'numeric',
		month: 'long',
		weekday: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
}

function initLastUpdateDates() {
	if (location.pathname.startsWith('/umineko/tr-installation')) {
		replaceLastUpdateDate('umineko-scripting-tr');
	} else if (location.pathname.startsWith('/higurashi/installation')) {
		replaceLastUpdateDate('higurashi-scripting-tr');
	}
}

document$.subscribe(initLastUpdateDates);
