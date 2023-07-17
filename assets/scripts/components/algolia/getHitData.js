export function getHitData(hit, qry = '') {
    const title = hit.title ? hit.title : hit.type;
    const cleanRelPermalink =
        hit.language == 'en' ? hit.relpermalink : hit.relpermalink.replace(`/${hit.language}/`, '');
    const orMatches = qry.split(' ').filter(word => word).join('|');
    const regexQry = new RegExp(`(${orMatches})`, 'gi');
    let highlightedTitle = (hit._highlightResult.title.value || title);
    let highlightedContent = (hit._highlightResult.content.value || '');
    if(qry) {
      highlightedTitle = highlightedTitle.replace(regexQry, '<mark>$1</mark>');
      highlightedContent = highlightedContent.replace(regexQry, '<mark>$1</mark>');
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
