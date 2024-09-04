const stringToTitleCase = (string) => {
  if(string.length <= 0) return string;

  const allCapWords = ['CSM', 'SIEM']
  let openParens = false;

  return string.split(' ')
    .map(word => {
      if(word.startsWith('(')) openParens = true   
      if(allCapWords.some(cap => word.toLowerCase().includes(cap.toLowerCase()))) return word.toUpperCase();
      if(word.endsWith(')')){
          openParens = false 
          return word.toLowerCase() 
      } 
      if (openParens) return word.toLowerCase()
      return word[0].toUpperCase() + word.substr(1).toLowerCase()
    }).join(' ');
}

const truncateString = (string, characterMax, addEllipsis) => {
  if (string.length <= characterMax) {
    return string;
  }

  const trimmed = addEllipsis ? `${string.substring(0, characterMax - 3)}...` : string.substring(0, characterMax);

  return trimmed;
};

const replaceSpecialCharacters = (string) => {
  return string.replace(/[^a-zA-Z0-9 ]/, '')    
}

export { stringToTitleCase, truncateString, replaceSpecialCharacters };
