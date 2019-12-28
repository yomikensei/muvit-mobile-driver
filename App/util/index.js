export const currencyFormatter = (amount, decimalPlace = 0) => {
  const amountNotUndefined = Number(amount) || 0;
  const amountInString = `${amountNotUndefined.toFixed(decimalPlace)}`;
  return amountInString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
