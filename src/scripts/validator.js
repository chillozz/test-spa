/**
 * Eemail validator class.
 * Validate email based on https://mailboxlayer.com API service.
 *
 * @class Validator
 */
export default class Validator {

	/**
	 * Constructs new Validator.
	 *
	 * @param {string} apiKey
	 * @param {HTMLElement} form
	 */
	constructor(apiKey, form) {
		this.apiKey = apiKey;
		this.form = form;

		this.apiUrl = 'https://apilayer.net/api/check';
		this.input = this.form.querySelector('input[name=email]');
		this.button = this.form.querySelector('input[type=submit]');
		this.notifier = this.form.querySelector('.notifier');
		this.messages = {
			invalid: 'Invalid format',
			valid: 'Valid format'
		};

		this.bindEvents();
	} 

	/**
	 * Binds events on form and input.
	 *
	 * @method
	 * @returns void
	 */
	bindEvents() {
		this.form.addEventListener('submit', e => {
			e.preventDefault();

			this.setButtonstate(false);
			this.fetchData().then(() => { this.setButtonstate(true); });
		});

		this.form.addEventListener('keyup', e => {
			if(e.keyCode !== 13) {
				this.setButtonstate(this.input.value !== '');
			}
		});
	}

	/**
	 * Data requests to API service.
	 *
	 * @method
	 * @returns {Promise}
	 */
	fetchData() {
		return fetch(this.apiUrl+`?access_key=${this.apiKey}&email=${this.input.value}`)
			.then(response => response.json())
			.then(data => {
				const message = data.format_valid ? this.messages.valid : this.messages.invalid;
				const type = data.format_valid ? 'success' : 'error';

				this.notify(message, type);		
			});
	}

	/**
	 * Validation results notificator.
	 *
	 * @method
	 * @param {string} msg
	 * @param {string} type
	 * @returns void
	 */
	notify(msg, type) {
		let className;

		switch(type) {
			case 'error':
				className = 'notifier_state_error';
			break;
			case 'success':
				className = 'notifier_state_success';
			break;
		}

		this.notifier.innerHTML = msg;
		this.notifier.className = `notifier ${className}`;
	}

	/**
	 * Sets form button state "enabled" or "disabled".
	 *
	 * @method
	 * @param {Boolean} enabled
	 * @returns void
	 */
	setButtonstate(enabled) {
		if(enabled) {
			this.button.removeAttribute("disabled");
		} else {
			this.button.setAttribute("disabled", "disabled");
		}
	}
}