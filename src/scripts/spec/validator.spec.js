import Validator from '../validator.js';

describe('validator', () => {

    const createInstance = () => {
        document.body.innerHTML = [
            '<form id="email-form" class="form">',
            '<fieldset class="form__field">',
            '<p class="notifier">Enter email address</p>',
            '<input class="form__input" type="text" name="email" autocomplete="off" placeholder="Type your email here..." />',
            '</fieldset>',
            '<fieldset class="form__footer">',
            '<input class="button" type="submit" value="Validate" disabled="disabled" />',
            '</fieldset>',
            '</form>',
        ].join('');

        const form = document.querySelector('#email-form');

        return new Validator('testApiKey', form);
    };

    it('Should initialize instance', () => {
        const validator = createInstance();

        expect(validator).to.be.an('object');
        expect(validator.apiKey).to.equal('testApiKey');
    });

    it('Should request data from API', (done) => {
        const validator = createInstance();

        validator.fetchData();
    });

    context('#notify', () => {
        it('Should show success notification', () => {
            const validator = createInstance();

            validator.notify('success message', 'success');

            expect(validator.notifier.textContent).to.equal('success message');
            expect(validator.notifier.className).to.equal('notifier notifier_state_success');
        });

        it('Should show error notification', () => {
            const validator = createInstance();

            validator.notify('error message', 'error');

            expect(validator.notifier.textContent).to.equal('error message');
            expect(validator.notifier.className).to.equal('notifier notifier_state_error');
        });
    });

    context('#setButtonstate', () => {
        it('Should button enabled', () => {
            const validator = createInstance();

            validator.setButtonstate(true);

            expect(validator.button.getAttribute('disabled')).to.be.null;
        });

        it('Should button disabled', () => {
            const validator = createInstance();

            validator.setButtonstate(false);

            expect(validator.button.getAttribute('disabled')).to.equal('disabled');
        });
    });
});