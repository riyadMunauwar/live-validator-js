// LiveValidator: A flexible form validation library with live validation
// Version 1.1.0

class LiveValidator {
    constructor() {
      this.schemas = {};
      this.forms = {};
    }
  
    // Define a schema for a form
    defineSchema(formId, schema) {
      this.schemas[formId] = schema;
    }
  
    // Initialize live validation for a form
    initLiveValidation(formId, options = {}) {
      const form = document.getElementById(formId);
      if (!form) {
        console.error(`Form with id "${formId}" not found`);
        return;
      }
  
      const schema = this.schemas[formId];
      if (!schema) {
        console.error(`No schema defined for form with id "${formId}"`);
        return;
      }
  
      this.forms[formId] = { form, options };
  
      for (const fieldId in schema) {
        const field = document.getElementById(fieldId);
        if (field) {
          field.addEventListener('input', () => this.validateField(formId, fieldId));
          field.addEventListener('blur', () => this.validateField(formId, fieldId));
        }
      }
  
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(formId)) {
          e.preventDefault();
        }
      });
    }
  
    // Validate a single field
    validateField(formId, fieldId) {
      const schema = this.schemas[formId];
      const field = document.getElementById(fieldId);
      const rules = schema[fieldId].rules;
      const errorElement = document.querySelector(schema[fieldId].errorElement);
      
      let fieldIsValid = true;
      let errorMessage = '';
  
      for (const rule of rules) {
        const validationResult = this.validateRule(field.value, rule);
        if (!validationResult.isValid) {
          fieldIsValid = false;
          errorMessage = validationResult.message;
          break;
        }
      }
  
      this.updateFieldStatus(field, fieldIsValid, schema[fieldId].fieldElement);
      this.updateErrorMessage(errorElement, errorMessage);
  
      return fieldIsValid;
    }
  
    // Validate entire form
    validateForm(formId) {
      const schema = this.schemas[formId];
      if (!schema) {
        console.error(`No schema defined for form with id "${formId}"`);
        return false;
      }
  
      let isValid = true;
  
      for (const fieldId in schema) {
        isValid = this.validateField(formId, fieldId) && isValid;
      }
  
      return isValid;
    }
  
    // Validate a single rule
    validateRule(value, rule) {
      switch (rule.type) {
        case 'required':
          return { 
            isValid: value.trim() !== '', 
            message: rule.message || 'This field is required.' 
          };
        case 'minLength':
          return { 
            isValid: value.length >= rule.value, 
            message: rule.message || `Minimum length is ${rule.value} characters.` 
          };
        case 'maxLength':
          return { 
            isValid: value.length <= rule.value, 
            message: rule.message || `Maximum length is ${rule.value} characters.` 
          };
        case 'pattern':
          return { 
            isValid: rule.value.test(value), 
            message: rule.message || 'Invalid format.' 
          };
        case 'custom':
          return rule.validate(value);
        default:
          console.error(`Unknown rule type: ${rule.type}`);
          return { isValid: true, message: '' };
      }
    }
  
    // Update field status (visual feedback)
    updateFieldStatus(field, isValid, fieldElement) {
      if (fieldElement) {
        const element = document.querySelector(fieldElement);
        if (element) {
          element.classList.remove('valid', 'invalid');
          element.classList.add(isValid ? 'valid' : 'invalid');
        }
      } else {
        field.classList.remove('valid', 'invalid');
        field.classList.add(isValid ? 'valid' : 'invalid');
      }
    }
  
    // Update error message
    updateErrorMessage(errorElement, message) {
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
      }
    }
  }
  
  // Export the library
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = LiveValidator;
  } else {
    window.LiveValidator = LiveValidator;
  }