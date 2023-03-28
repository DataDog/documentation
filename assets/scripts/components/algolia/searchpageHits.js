import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';

const renderHits = (renderOptions, isFirstRender) => {
    const addAttributesToEmptyElements = () => {
        aisHits.classList.add('ais-Hits');
        aisHitsList.classList.add('ais-Hits-list');
    };

    const appendEmptyElements = () => {
        container.appendChild(aisHits);
        aisHits.appendChild(aisHitsList);
    };

    const addHitsToEmptyElements = () => {
        container.querySelector('.ais-Hits-list').innerHTML = joinedListItemsHTML;
    };

    const truncateContent = (content, length) => {
        if (content.length > length) {
            return `${content.slice(0, length)} ...`;
        } else {
            return content;
        }
    };

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray) => {
        return hitsArray
            .map((item) => {
                const link = item.full_url;
                const hitData = item._highlightResult;
                const title = item.title;
                const subcategory = item.subcategory ? item.subcategory : title;
                const sectionHeader = item.section_header ? item.section_header : null;
                const content = hitData.content.value;
                let category = item.category ? item.category : 'Documentation';

                const displayTitle = sectionHeader ? sectionHeader : title;
                const displayContent = truncateContent(content, 100);

                return `
                    <li class="ais-Hits-item">
                        <a href="${link}" target="_blank" rel="noopener noreferrer">
                            <div class="ais-Hits-row">
                                <p class="ais-Hits-category">${category}</p>
                                <span class="ais-Hits-category-spacer">&#187;</span>   
                                <p class="ais-Hits-subcategory">${subcategory}</p>
                                <span class="ais-Hits-category-spacer">&#187;</span>
                                <p class="ais-Hits-title">${displayTitle}</p>
                            </div>
                            <div class="ais-Hits-row">
                                <p class="ais-Hits-content">${displayContent}</p>
                            </div>
                        </a>
                    </li>
                `;
            })
            .join('');
    };

    const { widgetParams, hits } = renderOptions;
    const { container } = widgetParams;

    const joinedListItemsHTML = generateJoinedHits(hits, null);

    const aisHits = document.createElement('div');
    const aisHitsList = document.createElement('ol');

    if (isFirstRender) {
        addAttributesToEmptyElements();
        appendEmptyElements();
        return;
    } else {
        addHitsToEmptyElements();
    }
};

export const searchpageHits = connectHits(renderHits);
