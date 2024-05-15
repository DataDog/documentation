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
  // Find all the <mark> matches sort them numerically and then return a custom object containing start & end indexes
  let matches = [...content.matchAll(new RegExp('<mark>(.*?)<\\/mark>(?! <mark>)', 'gm'))]
    .sort((a, b) => a[0].length - b[0].length)
    .map(m => {return { "start": m.index, "end": m.index + m[0].length}})
    .reverse();
  if(matches.length) {
    const first = matches[0];
    // slice with our matched highlight in the middle somewhere
    let start = (first.start < 0) ? 0 : first.start;
    let end = start + length;
    if(end > content.length) {
      start = start - (end - content.length);
      if(start < 0) start = 0
      end = start + length;
    }
    // if start or end is in a highlighted word <mark> and slicing is breaking the html tag then fix it.
    matches.forEach((match) => {
      // we are trying to truncate during a match, set to end of match.
      if(end > match.start && end < match.end) {
        end = match.end;
      }
    });
    return `${content.slice(start, end).trim()} ...`;
  } else {
    // no highlighted words lets just truncate it normally..
    return truncateContent(content, length);
  }
};
