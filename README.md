# Live Validator JS

**live-validator-js** is a simple and flexible JavaScript library for real-time form validation. Users can define validation schemas for their form inputs, and the library provides immediate feedback on input as users type.

## Features

- Define validation rules for each form field.
- Real-time error message display.
- Change input styles based on validation results.
- Easy to integrate into any project.

## Installation

1. **Clone or Download** the repository.
2. Include the `src/FormValidator.js` file in your project.

## Usage

### Basic Example

1. Include the **`FormValidator.js`** file in your HTML.

```html
<script type="module" src="src/FormValidator.js"></script>
```

2. Define your validation schema and bind it to your form.

```html
<form id="myForm">
    <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
        <div class="error" id="usernameError"></div>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        <div class="error" id="emailError"></div>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <div class="error" id="passwordError"></div>
    </div>
    <button type="submit">Submit</button>
</form>

<script type="module">
    import FormValidator from './src/FormValidator.js';

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

    const form = document.getElementById('myForm');
    const validator = new FormValidator(schema);

    // Bind live validation to input fields
    validator.bindLiveValidation(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (validator.validateAndDisplay(data, form)) {
            alert('Form is valid! Submitting...');
            // Proceed with form submission (e.g., AJAX request)
        }
    });
</script>
```

### Validation Rules

- **required**: The field cannot be empty.
- **minLength:X**: The field value must have at least X characters.
- **maxLength:X**: The field value must have no more than X characters.
- **email**: The field value must be a valid email format.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Testing

### Setting Up Testing

1. **Install Jest**: Ensure you have Jest installed for running tests.

```bash
npm install --save-dev jest
```

### Test File

Create a test file in the **`tests`** directory:

#### **`tests/FormValidator.test.js`**

```javascript
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
```

### Running Tests

Run the tests using Jest:

```bash
npx jest
```

## Contributing

Feel free to submit pull requests or create issues if you find any bugs or have suggestions for improvements.

## Acknowledgements

This library was inspired by various form validation libraries and is built to be simple and effective for real-time validation needs.
```

### Summary

This README provides a comprehensive guide to the **live-validator-js** package, covering installation, usage, validation rules, testing, and contributing. The included test cases ensure that your library's functionality is validated, which is crucial for production-grade libraries.

If you have further requirements or modifications, feel free to ask!