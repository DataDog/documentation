import connectPagination from 'instantsearch.js/es/connectors/pagination/connectPagination';

const renderPagination = (renderOptions) => {
    const {
        pages,
        isFirstPage,
        isLastPage,
        currentRefinement,
        nbHits,
        refine,
        createURL,
        widgetParams
    } = renderOptions;
    const { isNotSearchPage, container, scrollTo } = widgetParams;

    if (isNotSearchPage) {
        return;
    }

    const countDiv = document.querySelector('#count');
    if (countDiv) {
        countDiv.innerText = `${nbHits} results`;
    }

    container.innerHTML = `
    <ul class="ais-Pagination-list">
      <li class="ais-Pagination-item ${isFirstPage ? 'ais-Pagination-item--disabled' : ''}">
        ${
            isFirstPage
                ? `<p>
                  Prev
                </p>`
                : `<a 
                  href="${createURL(currentRefinement - 1)}#pagetitle"
                  data-value="${currentRefinement - 1}"
                >
                  Prev
                </a>`
        }
      </li>

      ${pages
          .map(
              (page) => `
            <li class="ais-Pagination-item ${page === currentRefinement ? 'active' : ''}">
                ${
                    page === currentRefinement
                        ? `<p>${page + 1}</p>`
                        : `<a
                    href="${createURL(page)}"
                    data-value="${page}"
                >
                    ${page + 1}
                </a>`
                }
            </li>
            `
          )
          .join('')}

      <li class="ais-Pagination-item ${isLastPage ? 'ais-Pagination-item--disabled' : ''}">
      ${
          isLastPage
              ? `<p>
              Next
            </p>`
              : `<a 
                href="${createURL(currentRefinement + 1)}#pagetitle"
                data-value="${currentRefinement + 1}"
              >
                Next
              </a>`
      }
      </li>
  `;

    [...container.querySelectorAll('a')].forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            refine(event.currentTarget.dataset.value);
            scrollTo.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

export const customPagination = connectPagination(renderPagination);
