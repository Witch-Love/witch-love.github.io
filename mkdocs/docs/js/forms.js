function fillFormValue(elementId, fillValue, makeReadOnly) {
	const el = document.getElementById(elementId);

	if (el && fillValue) {
		el.value = fillValue;
		el.readOnly = makeReadOnly;
		return true;
	}
	return false;
}

let isSubmitting = false;
async function formHandler(e, submitFunction) {
	e.preventDefault();

	if (isSubmitting) return;

	isSubmitting = true;

	const form = e.target;
	const formData = Object.fromEntries(new FormData(form));

	const res = await submitFunction(formData);

	if (res) {
		form.reset();
	}

	isSubmitting = false;
}

function cleanVersion(version) {
	if (!version) return;

	return version.replace(/8\.3b\s/g, '');
}

function initVersionCheck() {
	const form = document.getElementById('checkversion');

	if (!form) return;

	const urlParams = new URL(location.href).searchParams;

	window.history.replaceState(null, '', location.pathname);

	const isFilled = fillFormValue(
		'currentversion',
		cleanVersion(urlParams.get('currentversion')),
		true,
	);

	form.addEventListener('submit', async (e) =>
		formHandler(e, submitVersionCheck),
	);

	if (isFilled) form.requestSubmit();
}

async function getLatestVersionData() {
	const res = await fetch(
		'https://api.github.com/repos/Witch-Love/umineko-scripting-tr/releases/latest',
	);

	const data = await res.json();

	data.tag_name = data.tag_name.replace('z', 'r');

	return data;
}

async function submitVersionCheck(formData) {
	if (!formData.currentversion) {
		openModal('Hata!', 'Versiyon alanı boş bırakılamaz.');
		return false;
	}

	try {
		const latest = await getLatestVersionData();

		if (formData.currentversion.includes(latest.tag_name)) {
			openModal('Türkçe Yama Sürüm Kontrolü', 'Son sürüme sahipsin.');
		} else {
			openModal(
				`Türkçe Yama Sürüm Kontrolü`,
				'Türkçe oyun versiyonunuz güncel değil!<br />Lütfen <a href="/umineko/tr-installation/" onclick="closeModal()">Türkçe Yama</a> sayfasından yeni sürümü yükleyin.<br /><br />' +
					`Mevcut Sürümün: <code>${formData.currentversion}</code><br />En Güncel Sürüm: <code><a href="${latest.html_url}" target="_blank">${latest.tag_name}</a></code>`,
			);
		}
	} catch (error) {
		openModal(
			'Türkçe Yama Sürüm Kontrolü',
			'Sürüm kontrolü yapılırken bir hata oluştu!<br />Lütfen daha sonra tekrar dene.',
		);
	}
	return false;
}

async function getLineNumbers(ep, ch, text) {
	const res = await fetch(
		`https://raw.githubusercontent.com/Witch-Love/umineko-scripting-tr/master/story/ep${ep}/tr/umi${ep}_${ch}.txt`,
	);

	if (!res.ok) throw new Error();

	const inputText = text.split('\n')[0];
	const inputLineCount = text.split('\n').length;

	const data = await res.text();
	const lines = data.split('\n');

	const foundIndex = lines.findIndex((line) => line == inputText);

	if (foundIndex == -1) return;

	return Array.from({ length: inputLineCount }, (_, i) => foundIndex + i);
}

async function getTexts(ep, ch, lineNumbers, language) {
	const res = await fetch(
		`https://raw.githubusercontent.com/Witch-Love/umineko-scripting-tr/master/story/ep${ep}/${language}/umi${ep}_${ch}.txt`,
	);

	if (!res.ok) throw new Error();

	const data = await res.text();
	const lines = data.split('\n');

	const result = lineNumbers
		.map((n) => lines[n])
		.filter((v) => v !== undefined);

	return result.join('\n');
}

async function getAlternativeText(chapterData, text, language) {
	try {
		const { ep, ch } = parseEpisodeChapter(chapterData);
		const lineNumbers = await getLineNumbers(ep, ch, text);

		if (!lineNumbers) {
			openModal(
				'Hata!',
				'Yazı, script içinde bulunamadı.<br />Burada olduğunu düşündüğün hata çoktan düzeltilmiş olabilir!',
			);
			return;
		}

		const alternativeText = await getTexts(ep, ch, lineNumbers, language);
		let url = `https://github.com/Witch-Love/umineko-scripting-tr/blob/master/story/ep${ep}/${language}/umi${ep}_${ch}.txt#L${lineNumbers[0] + 1}`;
		if (lineNumbers.length > 1)
			url += `-L${lineNumbers[lineNumbers.length - 1] + 1}`;

		showAlternativeText(alternativeText, url);
	} catch (error) {
		console.error(error);
		openModal(
			'Hata!',
			'Yazı alınırken bir hata oluştu!<br />Lütfen Daha sonra tekrar dene!',
		);
	}
}

function parseEpisodeChapter(chapterData) {
	// chapter -> 1_op, 5_10, 3_tea, 6_ura...
	const splitted = chapterData.split('_');

	let ep = splitted[0];
	let ch = splitted[1].replace(/^0+/, '');

	const teaIndex = {
		1: 18,
		2: 19,
		3: 19,
		4: 20,
		5: 16,
		6: 19,
		7: 19,
		8: 17,
	}[Number(ep)];

	if (!teaIndex) return { ep, ch };
	if (ch == 'tea') return { ep, ch: String(teaIndex) };
	if (ch == 'ura') return { ep, ch: String(teaIndex + 1) };

	return { ep, ch };
}

function showAlternativeText(text, url) {
	const inputElement = document.getElementById('show-text');

	if (!inputElement) throw new Error();

	inputElement.classList.remove('hidden');
	inputElement.value = text;

	document.getElementById('show-text-a-wrapper').classList.remove('hidden');
	document.getElementById('show-text-a').href = url;
}

function initReport() {
	const form = document.getElementById('report');

	if (!form) return;

	const urlParams = new URL(location.href).searchParams;

	window.history.replaceState(null, '', location.pathname);

	const chapterData = urlParams.get('chapter');
	let text = urlParams.get('text');

	fillFormValue('chapter', chapterData, true);
	fillFormValue('version', cleanVersion(urlParams.get('version')), true);
	if (text) text = text.replace(/``/g, '`\n`');
	fillFormValue('ingametext', text, true);

	fillFormValue('discord', localStorage.getItem('reportDiscord'), false);
	fillFormValue('email', localStorage.getItem('reportEmail'), false);

	form.addEventListener('submit', async (e) => formHandler(e, submitReport));

	if (chapterData && text) {
		const buttonDiv = document.getElementById('show-alternatives');
		const ingameText = document.getElementById('ingametext-wrapper');
		if (!buttonDiv || !ingameText) return;

		buttonDiv.classList.remove('hidden');
		ingameText.classList.remove('hidden');

		const showEn = document.getElementById('show-en');
		const showJp = document.getElementById('show-jp');

		showEn?.addEventListener('click', () =>
			getAlternativeText(chapterData, text, 'en'),
		);
		showJp?.addEventListener('click', () =>
			getAlternativeText(chapterData, text, 'jp'),
		);
	}
}

async function submitReport(formData) {
	if (formData.ingametext) {
		formData.message = formData.message
			? formData.ingametext + '\n\n' + formData.message
			: formData.ingametext;
		delete formData.ingametext;
	}

	if (!formData.chapter || !formData.message) {
		openModal('Uyarı', 'Chapter ve mesaj alanları boş bırakılamaz.');
		return false;
	}

	const json = JSON.stringify(formData);

	localStorage.setItem('reportDiscord', formData.discord ?? '');
	localStorage.setItem('reportEmail', formData.email ?? '');

	try {
		const res = await fetch('https://api.witch-love.com/report', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: json,
		});

		const data = await res.json();

		if (!res.ok) throw new Error();

		openModal(
			'Hata bildirimin gönderildi!',
			'Yardımın için çok teşekkür ederiz!<br /><br /><strong>Bildirim kodun:</strong><pre><code><span style="color:var(--md-code-hl-number-color);">' +
				data.id +
				'</span></code></pre>Düzeltilen hataların bildirim kodları bir sonraki güncelleme notlarına eklenir!<br />Discord veya Email adresini paylaşmadıysan hatanı bu kod ile takip edebilirsin.',
		);

		return true;
	} catch (error) {
		openModal(
			'Hata!',
			'Hata bildirimi gönderilirken bir sorun oluştu!<br />Lütfen daha sonra tekrar dene.',
		);
	}
	return false;
}

document$.subscribe(initReport);
document$.subscribe(initVersionCheck);
