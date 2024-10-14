import FormValidator from '../src/FormValidator.js';

describe('FormValidator', () => {
    const schema = {
        username: {
            inputSelector: '#username',
            errorSelector: '#usernameError',
            rules: ['required', 'minLength:3', 'maxLength:15'],
        },
        email: {
            inputSelector: '#email',
            errorSelector: '#emailError',
            rules: ['required', 'email'],
        },
        password: {
            inputSelector: '#password',
            errorSelector: '#passwordError',
            rules: ['required', 'minLength:6'],
        }
    };

    let validator;

    beforeEach(() => {
        validator = new FormValidator(schema);
    });

    test('should validate required fields', () => {
        const formData = {
            username: '',
            email: '',
            password: '',
        };
        const isValid = validator.validate(formData);
        expect(isValid).toBe(false);
        expect(validator.errors).toHaveProperty('username');
        expect(validator.errors).toHaveProperty('email');
        expect(validator.errors).toHaveProperty('password');
    });

    test('should validate email format', () => {
        const formData = {
            username: 'user',
            email: 'invalid-email',
            password: 'password123',
        };
        const isValid = validator.validate(formData);
        expect(isValid).toBe(false);
        expect(validator.errors).toHaveProperty('email');
    });

    test('should validate minLength rule', () => {
        const formData = {
            username: 'us',
            email: 'user@example.com',
            password: 'pass',
        };
        const isValid = validator.validate(formData);
        expect(isValid).toBe(false);
        expect(validator.errors).toHaveProperty('username');
        expect(validator.errors).toHaveProperty('password');
    });

    test('should pass validation with correct input', () => {
        const formData = {
            username: 'validuser',
            email: 'valid@example.com',
            password: 'validpass123',
        };
        const isValid = validator.validate(formData);
        expect(isValid).toBe(true);
    });
});
