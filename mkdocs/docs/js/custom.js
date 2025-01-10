const link_icon = ' <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2m6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.75.75 0 0 1-1.042-.018.75.75 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1"></path></svg></span>';

const regex = new RegExp('<a href="(.*?)"( \b[^>]*)>(.*?)<\/a>');

function externalLinkIcons() {
	const site_url = window.location.origin;

	const page_content = document.querySelector("pagecontent");

	if (!page_content) return;
	
	page_content.querySelectorAll("a[href]").forEach(link => {
		const href = link.getAttribute('href');

		if (href.startsWith("http") && !href.startsWith(site_url)) {
			link.setAttribute("target", "_blank");

			if (link.className != "") return;

			for (node of link.childNodes) {
				console.log(node.nodeName)
				if (node.constructor.name == 'Text' /* || node.nodeName == 'ABBR' */) {
					link.innerHTML = link.innerHTML + link_icon;
					break;
				}
			}
		}
	});
}

function versionLinks() {
	if (window.location.href.includes("umineko")) {
		var u_sc = document.querySelector("a[href^='https://github.com/Witch-Love/umineko-scripting-tr/releases/']");

		if (u_sc) {
			fetch('https://api.github.com/repos/Witch-Love/umineko-scripting-tr/releases/latest')
				.then(response => response.json())
				.then(data => {
					const latestVersion = data.tag_name;
					u_sc.innerHTML = u_sc.innerHTML + " (" + latestVersion + ")";
				})
				.catch(error => console.error("Error fetching Umineko script data:", error));
		}

		var u_fi = document.querySelector("a[href^='https://github.com/Witch-Love/umineko-scripting-tr-files/releases/']");

		if (u_fi) {
			fetch('https://api.github.com/repos/Witch-Love/umineko-scripting-tr-files/releases/latest')
				.then(response => response.json())
				.then(data => {
					const latestVersion = data.tag_name;
					u_fi.innerHTML = u_fi.innerHTML + " (" + latestVersion + ")";
				})
				.catch(error => console.error("Error fetching Umineko graphics data:", error));
		}
	} else if (window.location.href.includes("higurashi")) {
		var h_scAll = document.querySelectorAll("a[href^='https://github.com/Witch-Love/higurashi-scripting-tr/releases/']");

		h_scAll.forEach(h_sc => {
			if (h_sc){
				fetch('https://api.github.com/repos/Witch-Love/higurashi-scripting-tr/releases/latest')
				.then(response => response.json())
				.then(data => {
					const latestVersion = data.tag_name;
					h_sc.innerHTML = h_sc.innerHTML + " (" + latestVersion + ")";
				})
				.catch(error => console.error("Error fetching Higurashi script data:", error));
			}
		});
	}
}

function openModal(val) {
	if (val) {
		document.documentElement.classList.remove('no-scroll');
	} else {
		document.documentElement.classList.add('no-scroll');
	}
}

function imageModals() {
	var modal = document.getElementById("modalElement");
	var modalImage = document.getElementById("modalImage");
	var modalCaption = document.getElementById("modalCaption");
	var modalCloseButton = document.getElementById("modalClose");
	if (!modal || !modalImage || !modalCaption || !modalCloseButton) return;
	
	modal.onclick = function(e) {
		if (!e.target.matches('.modal-content')) {
			modal.style.display = "none";
			openModal(true);
		}
	}
	modalCloseButton.onclick = function() {
		modal.style.display = "none";
		openModal(true);
	}

	var img = Array.from(document.getElementsByTagName("img"));
	img.forEach((el) => {
		if (el.getAttribute("modal") != "true") return;
		
		el.addEventListener("click", function() {
			modal.style.display = "block";
			modalImage.src = this.src;
			modalCaption.innerHTML = this.alt;
			openModal(false);
		  })
	})
	
	

}

document.addEventListener('keydown', (e) => {
	if (e.key != 'Escape') return;

	var modal = document.getElementById("modalElement");
	if (!modal) return;

	modal.style.display = "none";
	openModal(true);
})

document$.subscribe(externalLinkIcons);
document$.subscribe(versionLinks);
document$.subscribe(imageModals);