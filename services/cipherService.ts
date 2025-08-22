
// Caesar Cipher function
export const caesarCipher = (text: string, shift: number, encrypt: boolean = true): string => {
  if (shift < 0) {
    return caesarCipher(text, shift + 26, encrypt);
  }

  let output = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.match(/[a-z]/i)) {
      const code = text.charCodeAt(i);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + (encrypt ? shift : 26 - shift)) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + (encrypt ? shift : 26 - shift)) % 26) + 97);
      }
    }
    output += char;
  }
  return output;
};

// XOR Cipher function
export const xorCipher = (text: string, key: string): string => {
  if (key.length === 0) return text;
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
};
