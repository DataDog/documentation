---
title: Shortcode tests
---

<div id="markdoc-chooser"></div>
<div id="markdoc-content"><article>
  <h2>Shortcode tests</h2>
  <h3>img</h3>
  <!-- prettier-ignore -->
  {{< img src="account_management/api-key.png" alt="Navigate to the API Keys page for your organization in Datadog" style="width:80%;" >}}
  <h3>region-param</h3>
  <h4>Body copy</h4>
  {{< region-param key="dd_site" >}}
  <h4>Code</h4>
  {{< region-param key="dd_site" code="true" >}}
  <h3>site-region</h3>
  <h4>Selected region (us)</h4>
  <p>Something should show up here:</p>
  <div class="d-none site-region-container" data-region="us">
    <p>This is the content for the US region only.</p>
  </div>
  <h4>Nonselected region (eu)</h4>
  <p>Nothing should show up here:</p>
  <div class="d-none site-region-container" data-region="eu">
    <p>This is the content for the EU region only.</p>
  </div>
  <h3>tabs and tab</h3>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="tab-1"
        class="tab-pane fade"
        role="tabpanel"
        title="Tab 1"
      >
        <p>This is the content for Tab 1.</p>
      </div>
      <div
        data-lang="tab-2"
        class="tab-pane fade"
        role="tabpanel"
        title="Tab 2"
      >
        <p>This is the content for Tab 2.</p>
      </div>
    </div>
  </div>
</article>
</div>
  <script>    clientRenderer.initialize({        pagePrefsConfig: undefined,        prefOptionsConfig: {},        selectedValsByPrefId: {},        ifFunctionsByRef: {}    });  </script>  
