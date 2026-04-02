---
title: Sticky data test
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-prog_lang-pills-label" 
    class="cdoc-filter-label"
  >Programming Language</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="prog_lang" 
      data-option-id="swift"
      aria-selected="true"
      tabIndex="0"
    >Swift</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="kotlin"
      aria-selected="false"
      tabIndex="0"
    >Kotlin</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="java"
      aria-selected="false"
      tabIndex="0"
    >Java</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-prog_lang-dropdown-label" 
    class="cdoc-filter-label"
  >Programming Language</p><div 
    id="cdoc-dropdown-prog_lang" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-prog_lang-dropdown-label">
      <span 
        id="cdoc-dropdown-prog_lang-label" 
        class="cdoc-btn-label"
      >Swift</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-prog_lang-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="prog_lang" 
      data-option-id="swift"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Swift</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="kotlin"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Kotlin</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="java"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Java</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article><h2 id="overview">Overview</h2><p>This page tests whether users navigating from the <a href="/dd_e2e/cdocs/integration/content_filtering">content filtering test page</a> will</p><ul><li>see their selection on the content filtering test page persist here, when it is available</li><li>see the default selection replace their previous selection, when their previous selection is not available</li></ul><h2 id="currently-selected-filters">Currently selected filters</h2><div class="cdoc__toggleable" data-description="Programming Language is Swift" data-if=cdocs-ref-144><p>The selected programming language is Swift.</p></div><div class="cdoc__toggleable cdoc__hidden" data-description="Programming Language is Kotlin" data-if=cdocs-ref-145><p>The selected programming language is Kotlin.</p></div><div class="cdoc__toggleable cdoc__hidden" data-description="Programming Language is Java" data-if=cdocs-ref-146><p>The selected programming language is Java.</p></div></article></div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"cdocs-ref-144":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"swift"},"1":"swift"},"v":true,"r":"cdocs-ref-144"},"cdocs-ref-145":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"swift"},"1":"kotlin"},"v":false,"r":"cdocs-ref-145"},"cdocs-ref-146":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"swift"},"1":"java"},"v":false,"r":"cdocs-ref-146"}},    filtersManifest: {"filtersByTraitId":{"prog_lang":{"config":{"trait_id":"prog_lang","option_group_id":"dd_e2e_mobile_prog_lang_options","label":"Programming Language"},"defaultValsByOptionGroupId":{"dd_e2e_mobile_prog_lang_options":"swift"}}},"defaultValsByTraitId":{"prog_lang":"swift"},"optionGroupsById":{"dd_e2e_mobile_prog_lang_options":[{"default":true,"id":"swift","label":"Swift"},{"id":"kotlin","label":"Kotlin"},{"id":"java","label":"Java"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>