export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    // At least 8 characters
    return password.length >= 8;
  };
  
  export const validateRequired = (value) => {
    return value && value.trim() !== '';
  };
  
  export const validatePhoneNumber = (phone) => {
    // Basic phone validation (10-11 digits)
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phone.replace(/\D/g, ''));
  };
  
  // Form validation helper
  export const validateForm = (fields, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const value = fields[field];
      const fieldRules = rules[field];
      
      if (fieldRules.required && !validateRequired(value)) {
        errors[field] = `${field} is required`;
      }
      
      if (fieldRules.email && !validateEmail(value)) {
        errors[field] = 'Invalid email format';
      }
      
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = `Must be at least ${fieldRules.minLength} characters`;
      }
    });
    
    return errors;
  };