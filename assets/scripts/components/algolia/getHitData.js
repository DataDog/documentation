import { replaceSpecialCharacters } from "../../helpers/string";

export function getHitData(hit, searchQuery = '') {
    const title = hit.title ? hit.title : hit.type;
    const cleanRelPermalink =
        hit.language == 'en' ? hit.relpermalink : hit.relpermalink.replace(`/${hit.language}/`, '');

    const matchingWordsArray = getFilteredMatchingWords(searchQuery).map(word => replaceSpecialCharacters(word))
    const joinedMatchingWordsFromSearch = matchingWordsArray.join('|');
    const regexQry = new RegExp(`(${joinedMatchingWordsFromSearch})`, 'gi');
    let highlightedTitle = (hit._highlightResult.title.value || title);
    let highlightedContent = (hit._highlightResult.content.value || '');
    
    // Avoid overwriting <mark> element which sometimes already exists in title/content returned by Algolia.
    if (searchQuery) {
      highlightedTitle = highlightedTitle.includes('<mark>') ? highlightedTitle : highlightedTitle.replace(regexQry, '<mark>$1</mark>');
      highlightedContent = highlightedContent.includes('<mark>') ? highlightedContent : highlightedContent.replace(regexQry, '<mark>$1</mark>');
    }

    return {
        relpermalink: cleanRelPermalink,
        category: hit.category ? hit.category : 'Documentation',
        subcategory: hit.subcategory ? hit.subcategory : title,
        title: highlightedTitle,
        section_header: hit.section_header || null,
        content: highlightedContent,
        content_snippet: hit._snippetResult ? hit._snippetResult.content.value : '',
        content_snippet_match_level: hit._snippetResult ? hit._snippetResult.content.matchLevel : ''
    };
}

/* 
    Returns array of matching words from user search query,
    filtering out short/common terms that may cause inaccurate highlighting
*/
const getFilteredMatchingWords = (searchQuery) => {
    const stopWords = ['the', 'and', 'for']
    return searchQuery.split(' ').filter(word => word.length > 2 && !stopWords.includes(word))
}
