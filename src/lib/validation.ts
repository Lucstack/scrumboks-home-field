// Simple email validation utility
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simple phone validation - very lenient, just checks for basic phone structure
export const isValidPhone = (phone: string): boolean => {
  // Remove all spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

  // Check if it has at least 10 digits and contains only numbers and + at the start
  const phoneRegex = /^(\+)?[0-9]{10,15}$/;
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
};
