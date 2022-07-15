function fieldLimit(splitDate) {
  const day = splitDate[0];
  const month = splitDate[1];
  const year = splitDate[2];

  return [
    (day < 1 || day > 31), 
    (month < 1 || month > 12), 
    (year < 1 || year.length !== 4),
  ].every((value) => !value);
}

function smellyLint(splitDate) {
  const lengthMonthDay = splitDate
    .slice(0, 2)
    .every((value) => value.length === 2);

  if (!lengthMonthDay) return 0;

  return fieldLimit(splitDate);
}

module.exports = (date) => {
  // Sim, esta é minha verificação de data.
  // Vai lá copiar o regex que você nem entende como funciona!
  const splitDate = date.split('/');

  if (splitDate.length !== 3) return 0;

  const isANumb = splitDate.every((e) => Number.isInteger(+e));

  if (!isANumb) return 0;
  
  return smellyLint(splitDate);
};
