---
title: Tabs demo
---

<div id="markdoc-chooser"><div><div class="markdoc-pref__container"><div class="markdoc-pref__label">Color</div><div class="markdoc-pref__pill " data-pref-id="color" data-option-id="red">Red</div><div class="markdoc-pref__pill " data-pref-id="color" data-option-id="yellow">Yellow</div><div class="markdoc-pref__pill selected" data-pref-id="color" data-option-id="blue">Blue</div></div><hr /></div></div>
<div id="markdoc-content"><article>
  <h2>Example</h2>
  <p>Usually there's a little bit of text here, introducing the tabs.</p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="tab-1"
        class="tab-pane fade"
        role="tabpanel"
        title="Tab 1"
      >
        <div class="alert alert-info markdoc-alert">
          <p>
            Tabs can contain other Markdoc tags, like this alert. They could
            even contain other tabs, in theory! (Don't do that.)
          </p>
        </div>
        <h3>Customization demo</h3>
        <div class="markdoc__toggleable" data-if="15">
          <p>The selected color is <strong>blue</strong>.</p>
        </div>
        <div class="markdoc__toggleable markdoc__hidden" data-if="16">
          <p>The selected color is <strong>yellow</strong>.</p>
        </div>
        <div class="markdoc__toggleable markdoc__hidden" data-if="17">
          <p>The selected color is <strong>red</strong>.</p>
        </div>
        <h3>Partial demo</h3>
        <p>Tabs can include partials, such as these two:</p>
        <p>
          This content is in a partial. It includes a link to
          <a href="https://www.datadoghq.com">Datadog</a>.
        </p>
        <p>
          This content is in a partial. It includes a link to
          <a href="https://www.google.com">Google</a>.
        </p>
        <h3>Links</h3>
        <p>
          Links in Markdoc tabs behave the same as any other link on the page.
          There's no need to keep separate lists of links inside each tab.
          Example link: <a href="https://markdoc.dev/docs">Markdoc docs</a>. Tab
          2 contains the second example link.
        </p>
      </div>
      <div
        data-lang="tab-2"
        class="tab-pane fade"
        role="tabpanel"
        title="Tab 2"
      >
        <p>This is the content for Tab 2.</p>
        <p>
          Example link:
          <a href="https://www.typescriptlang.org/docs">TypeScript docs</a>.
        </p>
      </div>
    </div>
  </div>
</article>
</div>
  <script>    clientRenderer.initialize({        pagePrefsConfig: [{"n":"Color","i":"color","o":"primary_color_options"}],        prefOptionsConfig: {"primary_color_options":[{"n":"Red","i":"red"},{"n":"Yellow","i":"yellow"},{"n":"Blue","d":true,"i":"blue"}]},        selectedValsByPrefId: {"color":"blue"},        ifFunctionsByRef: {"15":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"blue"},"v":true,"r":"15"},"16":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"yellow"},"v":false,"r":"16"},"17":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"red"},"v":false,"r":"17"}}    });  </script>  
