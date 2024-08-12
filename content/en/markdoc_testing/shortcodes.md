---
title: Shortcodes Demo
---
<div id="markdoc-chooser"></div>
<div id="markdoc-content">
  <article>
    <h2><code>img</code> shortcode</h2>
    <p>An image should appear below:</p>
    <!-- prettier-ignore -->
    {{< img src="account_management/api-key.png" alt="Navigate to the API Keys page for your organization in Datadog" style="width:80%;" >}}
    <h2><code>region-param</code> shortcode</h2>
    <h3>Body copy</h3>
    <p>The user's DD site should be displayed below:</p>
    {{< region-param key="dd_site" >}}
    <p>
      It can also be displayed inline: The user's DD site is {{< region-param
      key="dd_site" >}}.
    </p>
    <h3>Code</h3>
    {{< region-param key="dd_site" code="true" >}}
    <h2><code>site-region</code> shortcode</h2>
    <h3>Selected region (us)</h3>
    <p>Something should show up here:</p>
    <div class="d-none site-region-container" data-region="us">
      <p>This is the content for the US region only.</p>
    </div>
    <h3>Nonselected region (eu)</h3>
    <p>Nothing should show up here:</p>
    <div class="d-none site-region-container" data-region="eu">
      <p>This is the content for the EU region only.</p>
    </div>
    <h2><code>tabs</code> and <code>tab</code> shortcodes</h2>
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
    <h2>Code blocks</h2>
    <h3>Plain code fence</h3>
    <pre data-language="javascript">
// Function to compute the product of p1 and p2
function myFunction(p1, p2) {
  return p1 * p2;
}
</pre
    >
    <h3><code>code</code> shortcode</h3>
    <p>TODO</p>
  </article>
</div>
<script>
  clientRenderer.initialize({
    pagePrefsConfig: undefined,
    prefOptionsConfig: {},
    selectedValsByPrefId: {},
    ifFunctionsByRef: {},
  });
</script>
