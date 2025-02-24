function generateRandomNameFromLetters(minLength = 5, maxLength = 10) {
  const characters = 'abcdefghijklmnopqrstuvwxyz'; // You can add uppercase if needed

  const nameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength; // Length between min and max

  let randomName = '';
  for (let i = 0; i < nameLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    randomName += characters.charAt(randomIndex);
  }

  return randomName.charAt(0).toUpperCase() + randomName.slice(1);
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'long',
    year: '2-digit',
  });
};

export {
  formatDate,
  generateRandomNameFromLetters,
};