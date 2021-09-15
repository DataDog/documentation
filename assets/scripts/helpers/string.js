export const stringToTitleCase = (string) => {
  if(string.length <= 0) return string;
  return string.split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(' ');
}
