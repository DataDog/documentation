import { replaceSpecialCharacters } from "../../helpers/string";

export function getHitData(hit, searchQuery = '') {
    const title = hit.title ? hit.title : hit.type;
    const cleanRelPermalink =
        hit.language == 'en' ? hit.relpermalink : hit.relpermalink.replace(`/${hit.language}/`, '');

    const matchingWordsArray = getFilteredMatchingWords(searchQuery).map(word => replaceSpecialCharacters(word))
    const joinedMatchingWordsFromSearch = matchingWordsArray.join('|');
    const regexQry = new RegExp(`(${joinedMatchingWordsFromSearch})`, 'gi');
    const highlightedTitle = (hit._highlightResult.title.value || title);
    const highlightedContent = (hit._highlightResult.content.value || '');

    return {
        relpermalink: cleanRelPermalink,
        category: hit.category ? hit.category : 'Documentation',
        subcategory: hit.subcategory ? hit.subcategory : title,
        title: handleHighlightingSearchResultContent(highlightedTitle, regexQry),
        section_header: hit.section_header || null,
        content: handleHighlightingSearchResultContent(highlightedContent, regexQry),
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

/*
    Manually add <mark> element when applicable as relevant content isn't always highlighted in title/content.
 */
const handleHighlightingSearchResultContent = (string, regex) => {
    if (string.includes('<mark>')) return string

    if (string.search(regex) > 0) {
        return string.replace(regex, '<mark>$1</mark>')
    }
    
    return string
}
