---
title: Table
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="markdown-table--commonmark-table">
    Markdown table (CommonMark table)
  </h2>
  <table>
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><em>italic</em></td>
        <td><code>code</code></td>
        <td><strong>bold</strong></td>
      </tr>
      <tr>
        <td><a href="https://www.google.com">link</a></td>
        <td>Row 2</td>
        <td>Row 2</td>
      </tr>
      <tr>
        <td>Row 3</td>
        <td>Row 3</td>
        <td><i class="icon-check-bold"></i></td>
      </tr>
    </tbody>
  </table>
  <h2 id="markdoc-table">Markdoc table</h2>
  <p>
    Use Markdoc tables to create more complex tables with code blocks, bulleted
    lists, cells spanning multiple rows and columns, and other elements.
  </p>
  <h3 id="simple-example">Simple example</h3>
  <p>
    You wouldn't really need to use a Markdoc table for simple content like
    this, but it gives an idea of how the entries map to rows and columns.
  </p>
  <table>
    <thead>
      <tr>
        <th>Header Col 1</th>
        <th>Header Col 2</th>
        <th>Header Col 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1 Col 1</td>
        <td>Row 1 Col 2</td>
        <td>Row 1 Col 3</td>
      </tr>
      <tr>
        <td>Row 2 Col 1</td>
        <td>Row 2 Col 2</td>
        <td>Row 2 Col 3</td>
      </tr>
    </tbody>
  </table>
  <h3 id="complex-example">Complex example</h3>
  <table>
    <thead>
      <tr>
        <th>Foo</th>
        <th>Bar</th>
        <th>Baz</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-ruby">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="nb">puts</span> <span class="s2">&#34;Some code here.&#34;</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>Bulleted list in table</li>
            <li>Second item in bulleted list</li>
          </ul>
        </td>
        <td>Text in a table</td>
      </tr>
      <tr>
        <td>
          <p>A sentence that isn't very long.</p>
          <p>Another short sentence.</p>
        </td>
        <td><p>Test 2</p></td>
        <td><p>Test 3</p></td>
      </tr>
      <tr>
        <td>
          <div class="alert alert-danger">
            <p>An alert in a table?? Let's not.</p>
          </div>
        </td>
        <td colspan="2">A cell that spans two columns</td>
      </tr>
    </tbody>
  </table>
  <h2 id="indented-tables">Indented tables</h2>
  <ol>
    <li>This is item one.</li>
    <li>
      This is item two. It comes with a CommonMark table:
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><em>italic</em></td>
            <td><code>code</code></td>
            <td><strong>bold</strong></td>
          </tr>
          <tr>
            <td><a href="https://www.google.com">link</a></td>
            <td>Row 2</td>
            <td>Row 2</td>
          </tr>
          <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td><i class="icon-check-bold"></i></td>
          </tr>
        </tbody>
      </table>
    </li>
    <li>
      This is item three. It has a Markdoc table:
      <table>
        <thead>
          <tr>
            <th>Header Col 1</th>
            <th>Header Col 2</th>
            <th>Header Col 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1 Col 1</td>
            <td>Row 1 Col 2</td>
            <td>Row 1 Col 3</td>
          </tr>
          <tr>
            <td>Row 2 Col 1</td>
            <td>Row 2 Col 2</td>
            <td>Row 2 Col 3</td>
          </tr>
        </tbody>
      </table>
    </li>
  </ol>
</article>
</div>
<div x-init='const initPage = () => clientFiltersManager.initialize({}); if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>