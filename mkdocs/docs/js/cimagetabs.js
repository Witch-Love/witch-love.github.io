function initCImageTabs() {
	const tabs = document.querySelectorAll('.cimg-tabs img');
	const contents = document.querySelectorAll('.cimg-tabs .content');

	function show(tab) {
		playClick?.();
		contents.forEach((c) => (c.style.display = 'none'));
		tabs.forEach((t) => t.classList.remove('active'));

		document.querySelector(
			`.cimg-tabs .content[data-tab="${tab}"]`,
		).style.display = 'block';
		document
			.querySelector(`.cimg-tabs img[data-tab="${tab}"]`)
			.classList.add('active');
	}

	// default
	show(1);

	tabs.forEach((img) => {
		img.onclick = () => show(img.dataset.tab);
	});
}

document$.subscribe(initCImageTabs);
