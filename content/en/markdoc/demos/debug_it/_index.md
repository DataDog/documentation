---
title: 'DebugIt: A Fake Debugging Library'
---
<div id="cdoc-selector"><div><div class="cdoc-dropdown-container"><p class="cdoc-filter-label">Language</p><div class="cdoc-dropdown">
    <button data-filter-id="prog_lang" class="cdoc-dropdown-btn" type="button">
      <span class="cdoc-btn-label">Python</span>
      <div class="cdoc-chevron cdoc-down"></div>
      <div class="cdoc-chevron cdoc-up"></div>
    </button>
    <div id="cdoc-dropdown-options-list-prog_lang" class="cdoc-dropdown-options-list cdoc-hide"><a class="cdoc-dropdown-option cdoc-filter__option selected" data-filter-id="prog_lang" data-option-id="python">Python</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="prog_lang" data-option-id="go">Go</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="prog_lang" data-option-id="javascript">JavaScript</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="prog_lang" data-option-id="ruby">Ruby</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="prog_lang" data-option-id="java">Java</a></div></div></div><div class="cdoc-dropdown-container"><p class="cdoc-filter-label">Operating system</p><div class="cdoc-dropdown">
    <button data-filter-id="os" class="cdoc-dropdown-btn" type="button">
      <span class="cdoc-btn-label">Linux</span>
      <div class="cdoc-chevron cdoc-down"></div>
      <div class="cdoc-chevron cdoc-up"></div>
    </button>
    <div id="cdoc-dropdown-options-list-os" class="cdoc-dropdown-options-list cdoc-hide"><a class="cdoc-dropdown-option cdoc-filter__option selected" data-filter-id="os" data-option-id="linux">Linux</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="os" data-option-id="windows">Windows</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="os" data-option-id="mac_os">MacOS</a></div></div></div><div class="cdoc-dropdown-container"><p class="cdoc-filter-label">Database</p><div class="cdoc-dropdown">
    <button data-filter-id="database" class="cdoc-dropdown-btn" type="button">
      <span class="cdoc-btn-label">Postgres</span>
      <div class="cdoc-chevron cdoc-down"></div>
      <div class="cdoc-chevron cdoc-up"></div>
    </button>
    <div id="cdoc-dropdown-options-list-database" class="cdoc-dropdown-options-list cdoc-hide"><a class="cdoc-dropdown-option cdoc-filter__option selected" data-filter-id="database" data-option-id="postgres">Postgres</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="database" data-option-id="mysql">MySQL</a><a class="cdoc-dropdown-option cdoc-filter__option " data-filter-id="database" data-option-id="sql_server">SQL Server</a></div></div></div><hr /></div></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    DebugIt is a powerful debugging library designed to streamline the debugging
    process for developers. With DebugIt, you can easily log errors, warnings,
    and debug messages, allowing for efficient troubleshooting and debugging of
    your applications.
  </p>
  <h2 id="setup">Setup</h2>
  <h3 id="install-the-debugit-library">Install the DebugIt library</h3>
  <div class="cdoc__toggleable" data-if="30">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-shell">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">pip install debugit
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="31">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-shell">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">npm install debugit
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="32">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-shell">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">mvn install debugit
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="33">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-shell">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">gem install debugit
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="34">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-shell">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">go get debugit
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h3 id="add-the-debugit-library-to-your-path">
    Add the DebugIt library to your path
  </h3>
  <div class="cdoc__toggleable cdoc__hidden" data-if="40">
    <div class="cdoc__toggleable" data-if="35">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl">setx PYTHONPATH <span class="s2">&#34;%PYTHONPATH%;C:\path\to\your\library\directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="36">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">set</span> <span class="nv">CLASSPATH</span><span class="o">=</span>%CLASSPATH%<span class="p">;</span>C:<span class="se">\p</span>ath<span class="se">\t</span>o<span class="se">\y</span>our<span class="se">\l</span>ibrary<span class="se">\d</span>irectory
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="37">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl">setx GOPATH <span class="s2">&#34;%GOPATH%;C:\path\to\your\library\directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="38">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">set</span> <span class="nv">RUBYLIB</span><span class="o">=</span>%RUBYLIB%<span class="p">;</span>C:<span class="se">\p</span>ath<span class="se">\t</span>o<span class="se">\y</span>our<span class="se">\l</span>ibrary<span class="se">\d</span>irectory
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="39">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">set</span> <span class="nv">NODE_PATH</span><span class="o">=</span>%NODE_PATH%<span class="p">;</span>C:<span class="se">\p</span>ath<span class="se">\t</span>o<span class="se">\y</span>our<span class="se">\l</span>ibrary<span class="se">\d</span>irectory
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable" data-if="46">
    <div class="cdoc__toggleable" data-if="41">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl">sudo <span class="nb">export</span> <span class="nv">PYTHONPATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$PYTHONPATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="42">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl">sudo <span class="nb">export</span> <span class="nv">CLASSPATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$CLASSPATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="43">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl">sudo <span class="nb">export</span> <span class="nv">GOPATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$GOPATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="44">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl">sudo <span class="nb">export</span> <span class="nv">RUBYLIB</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$RUBYLIB</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="45">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl">sudo <span class="nb">export</span> <span class="nv">NODE_PATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$NODE_PATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="52">
    <div class="cdoc__toggleable" data-if="47">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">PYTHONPATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$PYTHONPATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="48">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">CLASSPATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$CLASSPATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="49">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">GOPATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$GOPATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="50">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">RUBYLIB</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$RUBYLIB</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="51">
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-shell">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">NODE_PATH</span><span class="o">=</span><span class="s2">&#34;</span><span class="nv">$NODE_PATH</span><span class="s2">:/path/to/your/library/directory&#34;</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h3 id="create-the-database-table">Create the database table</h3>
  <div class="cdoc__toggleable cdoc__hidden" data-if="53">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-sql">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">CREATE</span><span class="w"> </span><span class="k">TABLE</span><span class="w"> </span><span class="n">debug_it_errors</span><span class="w"> </span><span class="p">(</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">id</span><span class="w"> </span><span class="nb">INT</span><span class="w"> </span><span class="n">AUTO_INCREMENT</span><span class="w"> </span><span class="k">PRIMARY</span><span class="w"> </span><span class="k">KEY</span><span class="p">,</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="k">timestamp</span><span class="w"> </span><span class="k">TIMESTAMP</span><span class="w"> </span><span class="k">DEFAULT</span><span class="w"> </span><span class="k">CURRENT_TIMESTAMP</span><span class="p">,</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">error_message</span><span class="w"> </span><span class="nb">TEXT</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">);</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable" data-if="54">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-sql">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">CREATE</span><span class="w"> </span><span class="k">TABLE</span><span class="w"> </span><span class="n">debug_it_errors</span><span class="w"> </span><span class="p">(</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">id</span><span class="w"> </span><span class="nb">SERIAL</span><span class="w"> </span><span class="k">PRIMARY</span><span class="w"> </span><span class="k">KEY</span><span class="p">,</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="k">timestamp</span><span class="w"> </span><span class="k">TIMESTAMP</span><span class="w"> </span><span class="k">DEFAULT</span><span class="w"> </span><span class="k">CURRENT_TIMESTAMP</span><span class="p">,</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">error_message</span><span class="w"> </span><span class="nb">TEXT</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">);</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="55">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-sql">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">CREATE</span><span class="w"> </span><span class="k">TABLE</span><span class="w"> </span><span class="n">debug_it_errors</span><span class="w"> </span><span class="p">(</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">id</span><span class="w"> </span><span class="nb">INT</span><span class="w"> </span><span class="k">IDENTITY</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="k">PRIMARY</span><span class="w"> </span><span class="k">KEY</span><span class="p">,</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="k">timestamp</span><span class="w"> </span><span class="n">DATETIME</span><span class="w"> </span><span class="k">DEFAULT</span><span class="w"> </span><span class="k">CURRENT_TIMESTAMP</span><span class="p">,</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">error_message</span><span class="w"> </span><span class="n">NVARCHAR</span><span class="p">(</span><span class="k">MAX</span><span class="p">)</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">);</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"30":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"python"},"v":true,"r":"30"},"31":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"javascript"},"v":false,"r":"31"},"32":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"java"},"v":false,"r":"32"},"33":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"ruby"},"v":false,"r":"33"},"34":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"go"},"v":false,"r":"34"},"35":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"python"},"v":true,"r":"35"},"36":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"java"},"v":false,"r":"36"},"37":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"go"},"v":false,"r":"37"},"38":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"ruby"},"v":false,"r":"38"},"39":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"javascript"},"v":false,"r":"39"},"40":{"m":"F","n":"e","p":{"0":{"m":"V","p":["os"],"v":"linux"},"1":"windows"},"v":false,"r":"40"},"41":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"python"},"v":true,"r":"41"},"42":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"java"},"v":false,"r":"42"},"43":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"go"},"v":false,"r":"43"},"44":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"ruby"},"v":false,"r":"44"},"45":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"javascript"},"v":false,"r":"45"},"46":{"m":"F","n":"e","p":{"0":{"m":"V","p":["os"],"v":"linux"},"1":"linux"},"v":true,"r":"46"},"47":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"python"},"v":true,"r":"47"},"48":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"java"},"v":false,"r":"48"},"49":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"go"},"v":false,"r":"49"},"50":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"ruby"},"v":false,"r":"50"},"51":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"python"},"1":"javascript"},"v":false,"r":"51"},"52":{"m":"F","n":"e","p":{"0":{"m":"V","p":["os"],"v":"linux"},"1":"mac_os"},"v":false,"r":"52"},"53":{"m":"F","n":"e","p":{"0":{"m":"V","p":["database"],"v":"postgres"},"1":"mysql"},"v":false,"r":"53"},"54":{"m":"F","n":"e","p":{"0":{"m":"V","p":["database"],"v":"postgres"},"1":"postgres"},"v":true,"r":"54"},"55":{"m":"F","n":"e","p":{"0":{"m":"V","p":["database"],"v":"postgres"},"1":"sql_server"},"v":false,"r":"55"}},    filtersManifest: {"filtersById":{"prog_lang":{"config":{"display_name":"Language","id":"prog_lang","options_source":"debugit_programming_lang_options"},"defaultValsByOptionsSetId":{"debugit_programming_lang_options":"python"}},"os":{"config":{"display_name":"Operating system","id":"os","options_source":"debugit_os_options"},"defaultValsByOptionsSetId":{"debugit_os_options":"linux"}},"database":{"config":{"display_name":"Database","id":"database","options_source":"debugit_database_options"},"defaultValsByOptionsSetId":{"debugit_database_options":"postgres"}}},"defaultValsByFilterId":{"prog_lang":"python","os":"linux","database":"postgres"},"optionSetsById":{"debugit_programming_lang_options":[{"display_name":"Python","default":true,"id":"python"},{"display_name":"Go","id":"go"},{"display_name":"JavaScript","id":"javascript"},{"display_name":"Ruby","id":"ruby"},{"display_name":"Java","id":"java"}],"debugit_os_options":[{"display_name":"Linux","default":true,"id":"linux"},{"display_name":"Windows","id":"windows"},{"display_name":"MacOS","id":"mac_os"}],"debugit_database_options":[{"display_name":"Postgres","default":true,"id":"postgres"},{"display_name":"MySQL","id":"mysql"},{"display_name":"SQL Server","id":"sql_server"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>