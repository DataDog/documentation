---
title: Synthetic Monitoring Template Variables
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-platform-pills-label" 
    class="cdoc-filter-label"
  >Test Type</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="platform" 
      data-option-id="browser"
      aria-selected="true"
      tabIndex="0"
    >Browser</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="mobile"
      aria-selected="false"
      tabIndex="0"
    >Mobile</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="multistep"
      aria-selected="false"
      tabIndex="0"
    >Multistep API</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-synthetics_variables-pills-label" 
    class="cdoc-filter-label"
  >Variables</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="synthetics_variables" 
      data-option-id="execution"
      aria-selected="true"
      tabIndex="0"
    >Test execution</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="result"
      aria-selected="false"
      tabIndex="0"
    >Result</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="local"
      aria-selected="false"
      tabIndex="0"
    >Local</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="global"
      aria-selected="false"
      tabIndex="0"
    >Global</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="extracted"
      aria-selected="false"
      tabIndex="0"
    >Extracted</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="step"
      aria-selected="false"
      tabIndex="0"
    >Step</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-platform-dropdown-label" 
    class="cdoc-filter-label"
  >Test Type</p><div 
    id="cdoc-dropdown-platform" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-platform-dropdown-label">
      <span 
        id="cdoc-dropdown-platform-label" 
        class="cdoc-btn-label"
      >Browser</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="browser"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Browser</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="mobile"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Mobile</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="multistep"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Multistep API</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-synthetics_variables-dropdown-label" 
    class="cdoc-filter-label"
  >Variables</p><div 
    id="cdoc-dropdown-synthetics_variables" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-synthetics_variables-dropdown-label">
      <span 
        id="cdoc-dropdown-synthetics_variables-label" 
        class="cdoc-btn-label"
      >Test execution</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-synthetics_variables-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="synthetics_variables" 
      data-option-id="execution"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Test execution</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="result"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Result</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="local"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Local</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="global"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Global</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="extracted"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Extracted</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="step"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Step</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    Template variables allow you to insert dynamic values from your test results
    and configuration into Synthetic Monitoring notification messages.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="Test Type is Browser"
    data-if="219"
  >
    <p>Browser-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Test Type is Mobile"
    data-if="220"
  >
    <p>Mobile-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Test Type is Multistep API"
    data-if="221"
  >
    <p>Multistep API-specific content goes here.</p>
  </div>
  <h2 id="valid-traits-and-their-values--option-ids">
    Valid traits and their values (option IDs)
  </h2>
  <p>
    For reference, here's a list of all the traits available on this page, and
    the valid values for each trait.
  </p>
  <p>
    You can use this table to populate the <code>equals</code> function in your
    <code>if</code> tags: <code>equals(&lt;TRAIT&gt;, &lt;VALUE&gt;)</code>.
    Example: <code>equals($platform, &quot;browser&quot;)</code>. For details on
    using <code>if</code> tags, see the
    <a
      href="https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)"
      >relevant section of the Tags Reference for Markdoc</a
    >.
  </p>
  <table>
    <thead>
      <tr>
        <th>Trait</th>
        <th>Valid values</th>
        <th>Equals function to use in <code>if</code> tag</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="3"><code>platform</code></td>
        <td><code>browser</code></td>
        <td><code>equals($platform, &quot;browser&quot;)</code></td>
      </tr>
      <tr>
        <td><code>mobile</code></td>
        <td><code>equals($platform, &quot;mobile&quot;)</code></td>
      </tr>
      <tr>
        <td><code>multistep</code></td>
        <td><code>equals($platform, &quot;multistep&quot;)</code></td>
      </tr>
    </tbody>
  </table>
  <div
    class="cdoc__toggleable"
    data-description="Variables is Test execution"
    data-if="222"
  >
    <p>Test execution variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Result"
    data-if="223"
  >
    <p>Result variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Local"
    data-if="224"
  >
    <p>Local variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Global"
    data-if="225"
  >
    <p>Global variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Extracted"
    data-if="226"
  >
    <p>Extracted variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Step"
    data-if="227"
  >
    <p>Step variables-specific content goes here.</p>
  </div>
  <h2 id="valid-traits-and-their-values--option-ids">
    Valid traits and their values (option IDs)
  </h2>
  <p>
    For reference, here's a list of all the traits available on this page, and
    the valid values for each trait.
  </p>
  <p>
    You can use this table to populate the <code>equals</code> function in your
    <code>if</code> tags: <code>equals(&lt;TRAIT&gt;, &lt;VALUE&gt;)</code>.
    Example: <code>equals($synthetics_variables, &quot;execution&quot;)</code>.
    For details on using <code>if</code> tags, see the
    <a
      href="https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)"
      >relevant section of the Tags Reference for Markdoc</a
    >.
  </p>
  <table>
    <thead>
      <tr>
        <th>Trait</th>
        <th>Valid values</th>
        <th>Equals function to use in <code>if</code> tag</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="6"><code>synthetics_variables</code></td>
        <td><code>execution</code></td>
        <td>
          <code>equals($synthetics_variables, &quot;execution&quot;)</code>
        </td>
      </tr>
      <tr>
        <td><code>result</code></td>
        <td><code>equals($synthetics_variables, &quot;result&quot;)</code></td>
      </tr>
      <tr>
        <td><code>local</code></td>
        <td><code>equals($synthetics_variables, &quot;local&quot;)</code></td>
      </tr>
      <tr>
        <td><code>global</code></td>
        <td><code>equals($synthetics_variables, &quot;global&quot;)</code></td>
      </tr>
      <tr>
        <td><code>extracted</code></td>
        <td>
          <code>equals($synthetics_variables, &quot;extracted&quot;)</code>
        </td>
      </tr>
      <tr>
        <td><code>step</code></td>
        <td><code>equals($synthetics_variables, &quot;step&quot;)</code></td>
      </tr>
    </tbody>
  </table>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"219":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"219"},"220":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"220"},"221":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"221"},"222":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"execution"},"v":true,"r":"222"},"223":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"result"},"v":false,"r":"223"},"224":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"local"},"v":false,"r":"224"},"225":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"global"},"v":false,"r":"225"},"226":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"extracted"},"v":false,"r":"226"},"227":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"step"},"v":false,"r":"227"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"synthetics_test_type_options","label":"Test Type"},"defaultValsByOptionGroupId":{"synthetics_test_type_options":"browser"}},"synthetics_variables":{"config":{"trait_id":"synthetics_variables","option_group_id":"synthetics_variables_options","label":"Variables"},"defaultValsByOptionGroupId":{"synthetics_variables_options":"execution"}}},"defaultValsByTraitId":{"platform":"browser","synthetics_variables":"execution"},"optionGroupsById":{"synthetics_test_type_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"mobile","label":"Mobile"},{"id":"multistep","label":"Multistep API"}],"synthetics_variables_options":[{"default":true,"id":"execution","label":"Test execution"},{"id":"result","label":"Result"},{"id":"local","label":"Local"},{"id":"global","label":"Global"},{"id":"extracted","label":"Extracted"},{"id":"step","label":"Step"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>