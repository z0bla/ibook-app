// Function to simulate network delay
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function validatePassword(password: string): string | null {
  const minLength = 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*]/.test(password);

  if (password.length < minLength) {
    return "Password must be at least 8 characters long.";
  }

  if (!hasLowercase) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!hasUppercase) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!hasDigit) {
    return "Password must contain at least one digit.";
  }

  if (!hasSpecialCharacter) {
    return "Password must contain at least one special characters.";
  }

  return null;
}
