export const truncateContent = (content, length) => {
    if (content.length > length) {
        return `${content.slice(0, length)} ...`;
    } else {
        return content;
    }
};

export const truncateContentAtHighlight = (content, length) => {
  /*
    Find the first largest highlight match and slice the content so this is visible in the snippet.
  */
  let new_content = content;
  let matches = [...content.matchAll(new RegExp('<mark>(.*?)<\\/mark>(?! <mark>)', 'gm'))]
    .sort(m => m[0].length)
    .map(m => m.index)
    .reverse();
  if(matches.length) {
    const first = matches[0];
    // slice with our matched highlight in the middle somewhere
    let start = first;
    if(start < 0) start = 0
    let end = start + length;
    if(end > content.length) {
      start = start - (end - content.length);
      if(start < 0) start = 0
      end = length;
    }
    new_content = `${content.slice(start, end).trim()} ...`;
  } else {
    // no highlighted words lets just truncate it normally..
    new_content = truncateContent(content, length);
  }
  return new_content;
};
