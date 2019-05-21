import 'normalize.css/normalize.css';
import '../styles/index.scss';

const apiUrl = 'https://apilayer.net/api/check';
const apiKey = 'ce6809af39e8e5d2516ed3d80010a84e';

const form = document.querySelector('#email-form');
const input = form.querySelector('input[name=email]');
const button = form.querySelector('input[type=submit]');
const notifier = form.querySelector('.notifier');

const messages = {
	invalid: 'Invalid format',
	valid: 'Valid format'
}

form.addEventListener('submit', e => {
	e.preventDefault();

	setButtonstate(false);

	fetch(apiUrl+`?access_key=${apiKey}&email=${input.value}`)
	.then(response => response.json())
	.then(data => {
		const message = data.format_valid ? messages.valid : messages.invalid;
		const type = data.format_valid ? 'success' : 'error';

		setButtonstate(true);
		notify(message, type);		
	});
});

input.addEventListener('keyup', e => {
	if(e.keyCode !== 13) {
		setButtonstate(input.value !== '');
	}
});


function notify(msg, type) {
	let className;

	switch(type) {
		case 'error':
			className = 'notifier_state_error';
		break;
		case 'success':
			className = 'notifier_state_success';
		break;
	}

	notifier.innerHTML = msg;
	notifier.className = `notifier ${className}`;
}

function setButtonstate(enabled) {
	if(enabled) {
		button.removeAttribute("disabled");
	} else {
		button.setAttribute("disabled", "disabled");
	}
}
