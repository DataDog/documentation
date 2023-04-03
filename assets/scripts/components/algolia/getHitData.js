export function getHitData(hit) {
    const title = hit.title ? hit.title : hit.type;

    return {
        link: hit.full_url,
        category: hit.category ? hit.category : 'Documentation',
        subcategory: hit.subcategory ? hit.subcategory : title,
        title: hit.section_header ? hit.section_header : title,
        content: hit._highlightResult.content.value
    };
}
