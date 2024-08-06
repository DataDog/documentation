import { replaceSpecialCharacters } from "../../helpers/string";
import { truncateContent, truncateContentAtHighlight } from "../../helpers/truncateContent";

export function getHitData(hit, searchQuery = '') {
    const title = hit.title ? hit.title : hit.type;
    const cleanRelPermalink =
        hit.language == 'en' ? hit.relpermalink : hit.relpermalink.replace(`/${hit.language}/`, '');

    const matchingWordsArray = getFilteredMatchingWords(searchQuery).map(word => replaceSpecialCharacters(word))
    const joinedMatchingWordsFromSearch = matchingWordsArray.join('|');
    const regexQry = new RegExp(`(${joinedMatchingWordsFromSearch})`, 'gi');
    const highlightTitle = (hit._highlightResult.title.value || title);
    const highlightContent = (hit._highlightResult.content.value || '');

    return {
        relpermalink: cleanRelPermalink,
        category: hit.category ? hit.category : 'Documentation',
        subcategory: hit.subcategory ? hit.subcategory : title,
        title: handleHighlightingSearchResultContent(highlightTitle, regexQry),
        section_header: hit.section_header || null,
        highlighted_content: handleHighlightingSearchResultContent(highlightContent, regexQry)
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

/*
    Produces a snippet to be displayed in the search results.
    section_header missing in the hit object means this result is for a full page,
    highlighted search term found in the first 180 characters likely means "Overview"
    or a similar section which should have relevant information for the end user.
 */
export const getSnippetForDisplay = (hit, isSearchPage) => {
    const characterLimit = isSearchPage ? 300 : 180
    let snippet = truncateContentAtHighlight(hit.highlighted_content, characterLimit)

    if (!hit.section_header) {
        snippet = truncateContent(hit.highlighted_content, characterLimit)
        
        if (!snippet.includes('<mark>')) {
            snippet = truncateContentAtHighlight(hit.highlighted_content, characterLimit)
        }
    }

    return snippet
}
