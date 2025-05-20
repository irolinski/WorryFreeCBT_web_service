export const validateNameInput = (name: string): boolean => {
  const regex = /^[\p{L}\-\s]+$/u;
  return regex.test(name) || !name;
};

export const validateEmailInput = (email: string): boolean => {
  const regex = /^[\p{L} @\-_\.]+$/u;
  return regex.test(email.trim()) || !email;
};

export const validateMessageInput = (message: string): boolean => {
  const regex = /^[\p{L} @\-_\.!?;:,%*\(\)+=-_\/<>\s]+$/u;
  return regex.test(message.trim()) || !message;
};

export const validateStringLength = (
  string: string,
  lengthMin: number,
  lengthMax: number
) => {
  if (string.length > lengthMax || string.length < lengthMin) {
    return false;
  } else {
    return true;
  }
};
