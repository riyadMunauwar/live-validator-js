class FormValidator {
    constructor(schema) {
        this.schema = schema;
        this.errors = {};
    }

    validate(formData) {
        this.errors = {}; // Reset errors for each validation
        for (const [field, rules] of Object.entries(this.schema)) {
            const value = formData[field];
            const errorMessages = [];

            for (const rule of rules.rules) {
                const error = this.validateRule(value, rule);
                if (error) {
                    errorMessages.push(error);
                }
            }

            if (errorMessages.length > 0) {
                this.errors[field] = errorMessages;
            }
        }

        return Object.keys(this.errors).length === 0; // Returns true if no errors
    }

    validateRule(value, rule) {
        const [ruleName, ...params] = rule.split(':');
        switch (ruleName) {
            case 'required':
                return value ? null : 'This field is required.';
            case 'minLength':
                return value.length >= params[0] ? null : `Minimum length is ${params[0]}.`;
            case 'maxLength':
                return value.length <= params[0] ? null : `Maximum length is ${params[0]}.`;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? null : 'Invalid email format.';
            // Add more validation rules as needed
            default:
                return null;
        }
    }

    displayErrors(formElement) {
        this.clearErrors(formElement);

        for (const [field, errorMessages] of Object.entries(this.errors)) {
            const errorElement = document.querySelector(this.schema[field].errorSelector);
            if (errorElement) {
                errorElement.innerHTML = errorMessages.join('<br>');
                errorElement.style.display = 'block'; // Show error messages
            }

            const inputElement = document.querySelector(this.schema[field].inputSelector);
            if (inputElement) {
                inputElement.style.borderColor = 'red'; // Change border color to red on error
            }
        }
    }

    clearErrors(formElement) {
        for (const field in this.schema) {
            const errorElement = document.querySelector(this.schema[field].errorSelector);
            if (errorElement) {
                errorElement.innerHTML = '';
                errorElement.style.display = 'none'; // Hide error messages
            }

            const inputElement = document.querySelector(this.schema[field].inputSelector);
            if (inputElement) {
                inputElement.style.borderColor = ''; // Reset border color
            }
        }
    }

    validateAndDisplay(formData, formElement) {
        const isValid = this.validate(formData);
        if (!isValid) {
            this.displayErrors(formElement);
        } else {
            this.clearErrors(formElement);
        }
        return isValid;
    }

    bindLiveValidation(formElement) {
        for (const field in this.schema) {
            const inputElement = document.querySelector(this.schema[field].inputSelector);
            if (inputElement) {
                inputElement.addEventListener('input', () => {
                    const formData = new FormData(formElement);
                    const data = Object.fromEntries(formData);
                    this.validateAndDisplay(data, formElement);
                });
            }
        }
    }
}
