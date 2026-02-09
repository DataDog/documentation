---
title: Synthetic Monitoring API Template Variables
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-protocol-pills-label" 
    class="cdoc-filter-label"
  >Protocol</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="protocol" 
      data-option-id="http"
      aria-selected="true"
      tabIndex="0"
    >HTTP</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="dns"
      aria-selected="false"
      tabIndex="0"
    >DNS</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="ssl"
      aria-selected="false"
      tabIndex="0"
    >SSL</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="websocket"
      aria-selected="false"
      tabIndex="0"
    >WebSocket</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="udp"
      aria-selected="false"
      tabIndex="0"
    >UDP</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="tcp"
      aria-selected="false"
      tabIndex="0"
    >TCP</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="icmp"
      aria-selected="false"
      tabIndex="0"
    >ICMP</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="grpc"
      aria-selected="false"
      tabIndex="0"
    >gRPC</button></div><div class="cdoc-pills-container"><p 
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
      data-option-id="test_metadata"
      aria-selected="false"
      tabIndex="0"
    >Test Metadata</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="device_info"
      aria-selected="false"
      tabIndex="0"
    >Device Information</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="execution_results"
      aria-selected="false"
      tabIndex="0"
    >Execution Results</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="failed_step_info"
      aria-selected="false"
      tabIndex="0"
    >Failed Step Information</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="local_global_variables"
      aria-selected="false"
      tabIndex="0"
    >Local & Global Variables</button><button
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
    id="cdoc-protocol-dropdown-label" 
    class="cdoc-filter-label"
  >Protocol</p><div 
    id="cdoc-dropdown-protocol" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-protocol-dropdown-label">
      <span 
        id="cdoc-dropdown-protocol-label" 
        class="cdoc-btn-label"
      >HTTP</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-protocol-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="protocol" 
      data-option-id="http"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >HTTP</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="dns"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >DNS</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="ssl"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >SSL</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="websocket"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >WebSocket</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="udp"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >UDP</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="tcp"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >TCP</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="icmp"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >ICMP</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="grpc"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >gRPC</a></div></div></div><div class="cdoc-dropdown-container"><p 
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
      data-option-id="test_metadata"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Test Metadata</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="device_info"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Device Information</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="execution_results"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Execution Results</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="failed_step_info"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Failed Step Information</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="local_global_variables"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Local & Global Variables</a><a 
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
    This page provides template variables available for API tests, organized by
    protocol type.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="Protocol is HTTP"
    data-if="205"
  >
    <p>HTTP-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Protocol is DNS"
    data-if="206"
  >
    <p>DNS-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Protocol is SSL"
    data-if="207"
  >
    <p>SSL-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Protocol is WebSocket"
    data-if="208"
  >
    <p>WebSocket-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Protocol is UDP"
    data-if="209"
  >
    <p>UDP-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Protocol is TCP"
    data-if="210"
  >
    <p>TCP-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Protocol is ICMP"
    data-if="211"
  >
    <p>ICMP-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Protocol is gRPC"
    data-if="212"
  >
    <p>gRPC-specific template variables content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable"
    data-description="Variables is Test execution"
    data-if="213"
  >
    <p>Test execution variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Test Metadata"
    data-if="214"
  >
    <p>Test metadata variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Device Information"
    data-if="215"
  >
    <p>Device information variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Execution Results"
    data-if="216"
  >
    <p>Execution results variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Failed Step Information"
    data-if="217"
  >
    <p>Failed step information variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Local & Global Variables"
    data-if="218"
  >
    <p>Local &amp; Global variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Extracted"
    data-if="219"
  >
    <p>Extracted variables-specific content goes here.</p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Step"
    data-if="220"
  >
    <p>Step variables-specific content goes here.</p>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"205":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"http"},"v":true,"r":"205"},"206":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"dns"},"v":false,"r":"206"},"207":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"ssl"},"v":false,"r":"207"},"208":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"websocket"},"v":false,"r":"208"},"209":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"udp"},"v":false,"r":"209"},"210":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"tcp"},"v":false,"r":"210"},"211":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"icmp"},"v":false,"r":"211"},"212":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http"},"1":"grpc"},"v":false,"r":"212"},"213":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"execution"},"v":true,"r":"213"},"214":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"test_metadata"},"v":false,"r":"214"},"215":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"device_info"},"v":false,"r":"215"},"216":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"execution_results"},"v":false,"r":"216"},"217":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"failed_step_info"},"v":false,"r":"217"},"218":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"local_global_variables"},"v":false,"r":"218"},"219":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"extracted"},"v":false,"r":"219"},"220":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"step"},"v":false,"r":"220"}},    filtersManifest: {"filtersByTraitId":{"protocol":{"config":{"trait_id":"protocol","option_group_id":"synthetics_protocol_options","label":"Protocol"},"defaultValsByOptionGroupId":{"synthetics_protocol_options":"http"}},"synthetics_variables":{"config":{"trait_id":"synthetics_variables","option_group_id":"synthetics_variables_options","label":"Variables"},"defaultValsByOptionGroupId":{"synthetics_variables_options":"execution"}}},"defaultValsByTraitId":{"protocol":"http","synthetics_variables":"execution"},"optionGroupsById":{"synthetics_protocol_options":[{"default":true,"id":"http","label":"HTTP"},{"id":"dns","label":"DNS"},{"id":"ssl","label":"SSL"},{"id":"websocket","label":"WebSocket"},{"id":"udp","label":"UDP"},{"id":"tcp","label":"TCP"},{"id":"icmp","label":"ICMP"},{"id":"grpc","label":"gRPC"}],"synthetics_variables_options":[{"default":true,"id":"execution","label":"Test execution"},{"id":"test_metadata","label":"Test Metadata"},{"id":"device_info","label":"Device Information"},{"id":"execution_results","label":"Execution Results"},{"id":"failed_step_info","label":"Failed Step Information"},{"id":"local_global_variables","label":"Local & Global Variables"},{"id":"extracted","label":"Extracted"},{"id":"step","label":"Step"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>