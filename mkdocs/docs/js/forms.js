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

function initVersionCheck() {
	const form = document.getElementById('checkversion');

	if (!form) return;

	const urlParams = new URL(location.href).searchParams;

	const isFilled = fillFormValue(
		'currentversion',
		urlParams.get('currentversion'),
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
		const finalCurrentVersion = formData.currentversion.replace(
			/8\.3b\s/g,
			'',
		);
		const latest = await getLatestVersionData();

		if (finalCurrentVersion.includes(latest.tag_name)) {
			openModal('Türkçe Yama Sürüm Kontrolü', 'Son sürüme sahipsin.');
		} else {
			openModal(
				`Türkçe Yama Sürüm Kontrolü`,
				'Türkçe oyun versiyonunuz güncel değil!<br />Lütfen <a href="/umineko/tr-installation/" onclick="closeModal()">Türkçe Yama</a> sayfasından yeni sürümü yükleyin.<br /><br />' +
					`Mevcut Sürümün: <code>${finalCurrentVersion}</code><br />En Güncel Sürüm: <code><a href="${latest.html_url}" target="_blank">${latest.tag_name}</a></code>`,
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

function initReport() {
	const form = document.getElementById('report');

	if (!form) return;

	const urlParams = new URL(location.href).searchParams;

	fillFormValue('chapter', urlParams.get('chapter'), true);
	fillFormValue('version', urlParams.get('version'), true);
	fillFormValue('message', urlParams.get('text'), false);

	form.addEventListener('submit', async (e) => formHandler(e, submitReport));
}

async function submitReport(formData) {
	if (!formData.chapter || !formData.message) {
		openModal('Uyarı', 'Chapter ve mesaj alanları boş bırakılamaz.');
		return false;
	}

	const json = JSON.stringify(formData);

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
				'</span></code></pre>Düzeltilen hataların bildirim kodları bir sonraki güncelleme notlarına eklenir!<br />E-mail adresini paylaşmadıysan hatanı bu kod ile takip edebilirsin.',
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
