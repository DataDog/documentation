/* eslint-disable */
import algoliasearch from 'algoliasearch';
import configDocs from './config/config-docs';

const siteEnv = document.querySelector('html').dataset.env;
let indexName = '';

if (window.location.href.indexOf('/search/') > -1) {
  console.log("in search js");
  
  if (siteEnv === 'preview' || siteEnv === 'development') {
    indexName = 'docsearch_docs_preview';
  } else if (siteEnv === 'live') {
    indexName = 'docsearch_docs_prod';
  }
  
  const client = algoliasearch(
      configDocs.live.algoliaConfig.appId,
      configDocs.live.algoliaConfig.apiKey
  );
  const results = new RegExp('[?&]' + 's' + '=([^&#]*)').exec(
      window.location.href
  );
  
  let query = '';
  try {
      query = results[1];
  } catch (e) {}

  let lang = 'en';
  if (window.location.pathname.indexOf('/fr/') > -1) {
      lang = 'fr';
  }
  if (window.location.pathname.indexOf('/ja/') > -1) {
      lang = 'ja';
  }

  function getTitle(hit) {
      let title = '';
      title = hit['hierarchy']['lvl0'];
      if (hit['hierarchy'].hasOwnProperty('lvl1')) {
          if (hit['hierarchy']['lvl1'] !== null)
              title += ` &raquo; ${hit['hierarchy']['lvl1']}`;
      }
      if (hit['hierarchy'].hasOwnProperty('lvl2')) {
          if (hit['hierarchy']['lvl2'] !== null)
              title += ` &raquo; ${hit['hierarchy']['lvl2']}`;
      }
      if (hit['hierarchy'].hasOwnProperty('lvl3')) {
          if (hit['hierarchy']['lvl3'] !== null)
              title += ` &raquo; ${hit['hierarchy']['lvl3']}`;
      }
      return title;
  }

  // get results from algolia
  client.search(
      [
          {
              indexName,
              query: decodeURIComponent(query),
              params: {
                  hitsPerPage: 200,
                  attributesToRetrieve: '*',
                  facetFilters: [`language:${lang}`]
              }
          }
      ],
      function (err, results) {
          if (!err) {
              // format and populate results
              $('#tipue_search_input').val(decodeURIComponent(query));
              const hits = results['results'][0]['hits'];
              let formatted_results = '';
              if (hits.length) {
                  $('#tipue_search_content').prepend(
                      `<div id="tipue_search_results_count">${hits.length} results</div>`
                  );
                  for (const i in hits) {
                      const hit = hits[i];
                      formatted_results += '<div class="hit">';
                      formatted_results += `${
                          '<div class="tipue_search_content_title">' +
                          '<a href="'
                      }${hit['url']}">${getTitle(hit)}</a></div>`;
                      formatted_results += `${
                          '<div class="tipue_search_content_url">' +
                          '<a href="'
                      }${hit['url']}">${hit['url'].replace(
                          'https://docs.datadoghq.com',
                          ''
                      )}</a></div>`;
                      const text = hit._snippetResult.content.value;
                      formatted_results += `<div class="tipue_search_content_text">${text}</div>`;
                      formatted_results += '</div>';
                  }
              } else {
                  $('#tipue_search_content').prepend(
                      `<div id="tipue_search_results_count">${hits.length} results</div>`
                  );
              }
              $('#tipue_search_content .content').html(formatted_results);

              // load pagination
              if (hits.length) {
                  let current_page = 1;
                  const num_page_links_to_display = 9;
                  const items_per_page = 7;
                  let page_nums = [];
                  let btn_next = document.getElementById('btn_next');
                  let btn_prev = document.getElementById('btn_prev');
                  let btn_more;
                  let btn_less;
                  const listing_table = document.getElementsByClassName(
                      'content'
                  )[0];
                  const page_navigation = document.getElementsByClassName(
                      'page_navigation'
                  )[0];
                  let page_span = document.getElementById('page');

                  function numPages() {
                      return Math.ceil(hits.length / items_per_page);
                  }

                  function initPageNums() {
                      const count = Math.min(
                          numPages(),
                          num_page_links_to_display
                      );
                      page_nums = [];
                      for (let i = 1; i < count + 1; i++) {
                          page_nums.push(i);
                      }
                  }

                  function prevPage() {
                      if (current_page > 1) {
                          current_page--;
                          if (current_page < page_nums[0]) {
                              less(null);
                          } else {
                              addHistory(current_page);
                              changePage(current_page);
                          }
                      }
                  }

                  function nextPage() {
                      if (current_page < numPages()) {
                          current_page++;
                          if (
                              current_page >
                              page_nums[page_nums.length - 1]
                          ) {
                              more(null);
                          } else {
                              addHistory(current_page);
                              changePage(current_page);
                          }
                      }
                  }

                  function less(e) {
                      if (e) e.preventDefault();
                      // get last in range
                      const first = page_nums[0];
                      const last = page_nums[page_nums.length - 1];
                      page_nums = [];
                      for (
                          let i = first - num_page_links_to_display;
                          i < first;
                          i++
                      ) {
                          page_nums.push(i);
                      }
                      current_page = page_nums[page_nums.length - 1];
                      addHistory(current_page);
                      changePage(current_page);
                      return false;
                  }

                  function more(e) {
                      if (e) e.preventDefault();
                      // get last in range
                      const last = page_nums[page_nums.length - 1];
                      // go from next number to num_page_links_to_display or however many are left
                      const remaining_pages = numPages() - last;
                      const count = Math.min(
                          remaining_pages,
                          num_page_links_to_display
                      );
                      page_nums = [];
                      for (
                          let i = last + 1;
                          i < last + (count + 1);
                          i++
                      ) {
                          page_nums.push(i);
                      }
                      current_page = page_nums[0];
                      addHistory(current_page);
                      changePage(current_page);
                      return false;
                  }

                  function cleanHandlers() {
                      if (btn_next) {
                          btn_next.removeEventListener(
                              'click',
                              btnHandler
                          );
                      }
                      if (btn_prev) {
                          btn_prev.removeEventListener(
                              'click',
                              btnHandler
                          );
                      }
                      const pagebtns = document.getElementsByClassName(
                          'page-num'
                      );
                      for (let i = 0; i < pagebtns.length; i++) {
                          pagebtns[i].removeEventListener(
                              'click',
                              btnHandlerPage
                          );
                      }
                      if (btn_more) {
                          btn_more.removeEventListener('click', more);
                      }
                      if (btn_less) {
                          btn_less.removeEventListener('click', less);
                      }
                  }

                  function btnHandler(e) {
                      e.preventDefault();
                      if (e.target.getAttribute('id') === 'btn_prev') {
                          prevPage();
                      } else if (
                          e.target.getAttribute('id') === 'btn_next'
                      ) {
                          nextPage();
                      }
                      return false;
                  }

                  function btnHandlerPage(e) {
                      e.preventDefault();
                      let page = parseInt(
                          e.target.getAttribute('data-pagenum')
                      );
                      if (page > numPages()) {
                          page = numPages();
                      } else if (page <= 0) {
                          page = 1;
                      }
                      current_page = page;
                      addHistory(current_page);
                      changePage(current_page);
                      return false;
                  }

                  function setHandlers() {
                      // remove any existing handlers
                      btn_next = document.getElementById('btn_next');
                      btn_prev = document.getElementById('btn_prev');
                      if (btn_prev) {
                          btn_prev.addEventListener('click', btnHandler);
                      }
                      if (btn_next) {
                          btn_next.addEventListener('click', btnHandler);
                      }
                      const pagebtns = document.getElementsByClassName(
                          'page-num'
                      );
                      if (pagebtns) {
                          for (let i = 0; i < pagebtns.length; i++) {
                              pagebtns[i].addEventListener(
                                  'click',
                                  btnHandlerPage
                              );
                          }
                      }
                      btn_more = document.getElementsByClassName(
                          'more'
                      )[0];
                      btn_less = document.getElementsByClassName(
                          'less'
                      )[0];
                      if (btn_more) {
                          btn_more.addEventListener('click', more);
                      }
                      if (btn_less) {
                          btn_less.addEventListener('click', less);
                      }
                  }

                  function setNavigation() {
                      let html = '';
                      let cls = '';
                      cleanHandlers();
                      html +=
                          '<a class="mr-1 btn btn-sm-tag btn-outline-secondary" href="#" id="btn_prev">Prev</a>';
                      if (page_nums[0] > 1) {
                          html +=
                              '<a class="mr-1 btn btn-sm-tag btn-outline-secondary less" href="#">...</a>';
                      }
                      for (let i = 0; i < page_nums.length; i++) {
                          cls =
                              current_page === page_nums[i]
                                  ? 'active'
                                  : '';
                          html += `<a class="mr-1 page-num btn btn-sm-tag btn-outline-secondary ${cls}" href="#" data-pagenum="${page_nums[i]}">${page_nums[i]}</a>`;
                      }
                      if (page_nums[page_nums.length - 1] < numPages()) {
                          html +=
                              '<a class="mr-1 btn btn-sm-tag btn-outline-secondary more" href="#">...</a>';
                      }
                      html +=
                          '<a class="mr-1 btn btn-sm-tag btn-outline-secondary" href="#" id="btn_next">Next</a>';
                      if (page_navigation) {
                          page_navigation.innerHTML = html;
                      }
                      setHandlers();
                  }

                  window.onpopstate = function (event) {
                      if (event.state) {
                          current_page = event.state.page;
                          changePage(current_page);
                      }
                  };

                  function addHistory(page) {
                      let pageName = `?s=${query}`;
                      if (page !== 1) pageName += `&p=${page}`;
                      window.history.pushState({ page }, '', pageName);
                  }

                  function changePage(page) {
                      page_span = document.getElementById('page');

                      // Validate page
                      if (page < 1) page = 1;
                      if (page > numPages()) page = numPages();

                      if (listing_table) {
                          listing_table.innerHTML = '';
                      }

                      // output our slice of formatted results
                      for (
                          let i = (page - 1) * items_per_page;
                          i < page * items_per_page && i < hits.length;
                          i++
                      ) {
                          let formatted_results = '';
                          formatted_results += '<div class="hit row">';
                          formatted_results += '<div class="col-12">';

                          formatted_results += `${
                              '<div class="tipue_search_content_title">' +
                              '<a href="'
                          }${hits[i]['url']}">${getTitle(
                              hits[i]
                          )}</a></div>`;
                          const text =
                              hits[i]._snippetResult.content.value;
                          formatted_results += `<div class="tipue_search_content_text">${text}</div>`;

                          formatted_results += '</div>';
                          formatted_results += '</div>';
                          if (listing_table) {
                              listing_table.innerHTML += formatted_results;
                          }
                      }
                      if (page_span) {
                          page_span.innerHTML = `${page}/${numPages()}`;
                      }

                      setNavigation();

                      // set previous and next buttons class
                      if (btn_prev) {
                          btn_prev.classList[
                              page === 1 ? 'add' : 'remove'
                          ]('disabled');
                      }
                      if (btn_next) {
                          btn_next.classList[
                              page === numPages() ? 'add' : 'remove'
                          ]('disabled');
                      }

                      // set active button class
                      const pagebtns = document.getElementsByClassName(
                          'page-num'
                      );
                      for (let i = 0; i < pagebtns.length; i++) {
                          const page = parseInt(
                              pagebtns[i].getAttribute('data-pagenum')
                          );
                          pagebtns[i].classList[
                              current_page === page ? 'add' : 'remove'
                          ]('active');
                      }

                      // scroll to top only if there is no hash
                      if (!window.location.hash) {
                          $('html, body').scrollTop(0);
                      }
                  }

                  // init page nums
                  initPageNums();

                  // set initial page
                  const searchParams = new URLSearchParams(
                      window.location.search
                  );
                  if (searchParams.get('p') !== null)
                      current_page = parseInt(searchParams.get('p'));
                      window.history.replaceState({ page: current_page }, '', '');
                  changePage(current_page);
              }
          } else {
              const content = document.getElementsByClassName(
                  'content'
              )[0];
              if (content) {
                  content.innerHTML = '0 results';
              }
          }
      }
  );
}