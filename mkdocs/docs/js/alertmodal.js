function initModalElement() {
	document.body.insertAdjacentHTML(
		'beforeend',
		`<div id="modal" class="md-modal md-typeset">
			<div class="md-modal__overlay" onclick="bounceModal()"></div>

			<div class="md-modal__dialog">
				<div class="md-modal__header">
					<h3 id="modal-title">Modal Title</h3>
				</div>

				<div id="modal-body" class="md-modal__body">
					Modal text
				</div>

				<div class="md-modal__footer">
					<button class="md-button md-button--primary" onclick="closeModal()">Kapat</button>
				</div>
			</div>
		</div>`,
	);
}

function openModal(title = 'Bilgi', body = '') {
	const modal = document.getElementById('modal');

	document.getElementById('modal-title').innerHTML = title;
	document.getElementById('modal-body').innerHTML = body;

	modal.classList.add('md-modal--show');
}

function closeModal() {
	const modal = document.getElementById('modal');

	modal.classList.remove('md-modal--show');
}

function bounceModal() {
	const dialog = document.querySelector('.md-modal__dialog');

	dialog.style.animation = 'none';
	dialog.offsetHeight;

	dialog.style.animation = 'modal-bounce 200ms ease';
}

document.addEventListener('DOMContentLoaded', initModalElement);
