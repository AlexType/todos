export function pluralForm(count: number, forms: [string, string, string]): string {
  if (!forms || forms.length !== 3) {
    throw new Error('Неверный формат вариантов склонения. Должно быть 3 формы');
  }

  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 19) {
    return forms[2];
  }

  if (lastOne === 1) {
    return forms[0];
  }

  if (lastOne >= 2 && lastOne <= 4) {
    return forms[1];
  }

  return forms[2];
}
