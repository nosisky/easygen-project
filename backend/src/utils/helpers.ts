export const isPasswordComplex = (password: string): boolean => {
  const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return complexityRegex.test(password);
};
