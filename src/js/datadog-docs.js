(function () {

  var DD_docs = {};

  DD_docs.metricsGuidePage = function () {
    $('.lang-tab').click(function (e) {
      var el = $(this);
      var lang = el.attr('lang');
      $('.' + lang + '-lang-tab').tab('show');
    });
  };

  DD_docs.apiPage = function () {

    // When language buttons are clicked, show all the code snippets
    // from that language.
    $('.lang-btn').click(function (e) {
      var el = $(this);

      // Find the element currently in the view port
      var scrollElement;
      $('div.int-anchor').each(function () {
        if ($(this).offset().top >= window.scrollY) {
          scrollElement = $(this);
          return false;
        }
      });

      // Highlight the active button.
      $('.lang-btn').removeClass('active');
      el.addClass('active');

      // Show this language's code blocks and language-specific elements
      var lang = el.attr('lang');
      $('.code-block').hide();
      $('.code-block-' + lang).fadeIn();
      $('.lang-specific').hide();
      $('.lang-specific-' + lang).fadeIn();

      // Scroll to the element that was in the viewport (ie retain location).
      $('html, body').scrollTop(scrollElement.offset().top);

      // Add the language selection to the current URL.
      if (history.pushState) {
        url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');
        history.pushState(null, null, url + '?lang=' + lang + window.location.hash)
      }
    });

  };

  // Export to global scope.
  window.DD_docs = DD_docs;

})();


$(document).ready(function () {

  var header;
  var subheading;
  var subsubheading;

  var toc = window.Datadog.toc;
  var tocdepth = window.Datadog.tocdepth;

  headings = {

    'init': function () {

      this.h1s = $('.main h1');
      this.h2s = $('.main h2');
      this.h3s = $('.main h3');
      this.h4s = $('.main h4');
      this.listHeadings();
      this.setHeadings();

    },
    'listHeadings': function () {
      //console.log('h1s', this.h1s.length);
      // console.log('h2s', this.h2s.length);
      // console.log('h3s', this.h3s.length);
      // console.log('h4s', this.h4s.length);
    },
    'setHeadings': function () {
      header = '';
      subheading = '';
      subsubheading = '';

      if (this.h2s.length && this.h3s.length && this.h4s.length) {
        header = 'h2';
        subheading = 'h3';
        subsubheading = 'h4';
      } else {
        if (this.h2s.length > 0 && this.h3s.length == 0 && this.h4s.length == 0) {
          header = 'h2';
        } else if (this.h2s.length > 0 && this.h3s.length > 0) {
          header = 'h2';
          subheading = 'h3';
        } else if (this.h2s.length == 0 && this.h3s.length > 0) {
          header = 'h3';
          if (this.h4s.length) {
            subheading = 'h4';
          }
        } else if (this.h2s.length == 0 && this.h3s.length == 0 && this.h4s.length > 0) {
          header = 'h4';
          if (this.h5s.length) {
            subheading = 'h5';
          }
        }
      }

      if (parseInt(tocdepth) == 1) {
        subheading = '';
      }

      if (header !== '') {
        this.initToc(header, subheading, subsubheading);
      }

    },
    'initToc': function (header, subheading, subsubheading) {

      this.header = header;
      this.subheading = subheading;
      this.subsubheading = subsubheading;

      // console.log(header);
      // console.log(subheading);

      if (this.header.length > 0 || this.subheading.length > 0) {
        $('body').tocible({
          heading: this.header, //[selector], the first level heading
          subheading: this.subheading, //[selector], the second level heading
          subsubheading: this.subsubheading,
          reference: '#toc-box', //[selector], reference element for horizontal positioning
          title: 'Table of Contents', //[selector or string], title of the menu
          hash: false, //[boolean], setting true will enable URL hashing on click
          //offsetTop: 300, //[number], spacing/margin above the menu
          speed: 10, //[number or string ('slow' & 'fast')], duration of the animation when jumping to the clicked content
          collapsible: false, //[boolean], enabling true will auto collapse sub level heading not being scrolled into
          maxWidth: null //[number], set max-width of the navigation menu
        });
      }
    }
  };

  $('table').each(function () {
    if (!$(this).hasClass('table')) {
      $(this).addClass('table');
    }
  });

  $('h2, h3, h4, h5').each(function () {
    var id = $(this).attr('id') || $(this).parent().attr('href') || '';
    if (id.indexOf('#') == -1) {
      id = '#' + id;
    }
    var iconfa = '<i class="fa fa-link" aria-hidden="true"></i>';
    var iconglyph = '<span class="glyphicon glyphicon-link" aria-hidden="true"></span>';
    var markup = '<a class="header-link" href="' + id + '">' + iconglyph + '</a>';
    if (!$(this).hasClass('linked-header') && id.length > 1) {
      $(this).addClass('linked-header');
      $(this).prepend(markup);
    }
  });

  if (toc) {
    headings.init();
  }

  // algolia search
  // search.addWidget(
  // instantsearch.widgets.infiniteHits({
  //   container: '#tipue_search_content',
  //   templates: {
  //     empty: 'No results',
  //     item: '<strong>Hit {{objectID}}</strong>: {{{_highlightResult.name.value}}}'
  //   },
  //   hitsPerPage: 3
  // })
  var client = algoliasearch("EOIG7V0A2O", 'bf60de88836cb62a73509ef075542065');
  client.search([{
    indexName: 'docs_english',
    query: "docker",
    params: {
      hitsPerPage: 1000
    }
  }], function (err, results) {
    if (!err) {
      var hits = results['results'][0]['hits'];
      var formatted_results = "";
      if (hits.length) {
        formatted_results += '<div id="tipue_search_results_count">'+hits.length+' results</div>';
        for (var i in hits) {
          var hit = hits[i];
          formatted_results += '<div class="tipue_search_content_title">' +
            '<a href="' + hit["URL"] + '">' + hit["title"] + '</a></div>';
          formatted_results += '<div class="tipue_search_content_url">' +
            '<a href="' + hit["URL"] + '">' + hit["URL"] + '</a></div>';
          // limit results to two sentences
          var text = hit['_highlightResult']['body']['value'].replace(hit['title'], '');
          var text_limit = text.split('.', 2).join('.').length + 1;
          formatted_results += '<div class="tipue_search_content_text">' +
            text.slice(0, text_limit) + '</div>';
        }
      } else {
        formatted_results += '<div id="tipue_search_results_count">'+hits.length+' results</div>';
      }
      $('#tipue_search_content').html(formatted_results);

    }
  });

});

// Allow language selection via URL GET parameter.
$(window).load(function () {
  if (s = window.location.search.match(/lang=[^&]+/gi)) {
    lang = s[0].replace(/lang=/gi, '');
    $('div[lang="' + lang + '"]').click();
  }
});
