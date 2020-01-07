$(document).ready(function () {
  // determine from the url the language if we can
  var sPageURL = decodeURIComponent(window.location.search.substring(1));
  var sURLVariables = sPageURL.split('&');
  var lang = sURLVariables.filter(function (item) {
    return item.split('=')[0] === 'lang';
  }).map(function (item) {
    return item.split('=')[1];
  }).toString();

  // set a default
  if (lang === '') lang = 'bash';

  // click the language nav we want
  $('.codenav [data-lang="' + lang + '"]').click();
});
