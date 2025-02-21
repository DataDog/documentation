---
title: Description List
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="example">Example</h2>
  <dl>
    <dt>Service</dt>
    <dd>
      Services are the building blocks of modern microservice architectures -
      broadly a service groups together endpoints, queries, or jobs for the
      purposes of building your application.
    </dd>
    <dt>Resource</dt>
    <dd>
      Resources represent a particular domain of a customer application - they
      are typically an instrumented web endpoint, database query, or background
      job.
    </dd>
    <dt>
      <code
        >clusterChecksRunner.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution</code
      >
    </dt>
    <dd>Required. A list of node selector terms. The terms are ORed.</dd>
    <dt><code>site</code></dt>
    <dd>
      Set the site of the Datadog intake for Agent data. Defaults to
      <code>datadoghq.com</code>.
    </dd>
  </dl>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>