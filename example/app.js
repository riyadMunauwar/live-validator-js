// Create an instance of ValidateEase
const validator = new LiveValidator();

// Define the validation schema
validator.defineSchema('registrationForm', {
    'username': {
        rules: [
            { type: 'required', message: 'Username is required.' },
            { type: 'minLength', value: 3, message: 'Username must be at least 3 characters long.' },
            { type: 'maxLength', value: 20, message: 'Username must not exceed 20 characters.' },
            { type: 'pattern', value: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores.' }
        ],
        errorElement: '#username-error'
    },
    'email': {
        rules: [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' }
        ],
        errorElement: '#email-error'
    }
});

// Initialize live validation
validator.initLiveValidation('registrationForm');

// Add form submission handler
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validator.validateForm('registrationForm')) {
        console.log('Form is valid. Submitting...');
        // Here you would typically send the form data to your server
        alert('Form submitted successfully!');
    } else {
        console.log('Form is invalid. Please correct the errors.');
    }
});