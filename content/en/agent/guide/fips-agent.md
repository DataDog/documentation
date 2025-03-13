---
title: Datadog FIPS Agent
further_reading:
  - link: /agent/configuration/fips-compliance
    tag: Documentation
    text: Datadog FIPS Compliance
algolia:
  rank: 80
  tags:
    - fips
    - fips proxy
    - compliance
    - fedramp
    - govcloud
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-os-pills-label" 
    class="cdoc-filter-label"
  >Operating System</p><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="os" 
      data-option-id="windows"
      aria-selected="false"
      tabIndex="0"
    >Windows</button><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="os" 
      data-option-id="linux"
      aria-selected="true"
      tabIndex="0"
    >Linux</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-os-dropdown-label" 
    class="cdoc-filter-label"
  >Operating System</p><div 
    id="cdoc-dropdown-os" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-os-dropdown-label">
      <span 
        id="cdoc-dropdown-os-label" 
        class="cdoc-btn-label"
      >Linux</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-os-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="os" 
      data-option-id="windows"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Windows</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="os" 
      data-option-id="linux"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Linux</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <p>
    {{&lt; callout btn_hidden=&quot;true&quot; header=&quot;Try the
    Preview!&quot;&gt;}} The FIPS Agent is in Preview. {{&lt; /callout &gt;}}
  </p>
  <p>
    {{&lt; site-region region=&quot;us,us3,us5,eu,ap1&quot; &gt;}} &lt;div
    class=&quot;alert alert-warning&quot;&gt;The FIPS Agent is available only in
    the US1-FED region.&lt;/a&gt;&lt;/div&gt; {{&lt; /site-region &gt;}}
  </p>
  <p>
    The FIPS Agent is a flavor of the Datadog Agent that natively supports
    Federal Information Processing Standards (FIPS) compliance. The FIPS Agent
    replaces the
    <a href="/agent/configuration/fips-compliance/">FIPS proxy</a> and includes
    limited support for integrations that need to collect observability data
    that is external to the host.
  </p>
  <p>
    <strong
      >The Datadog FIPS Agent is in Preview and has not been fully audited.
      Install and test the Agent only on hosts that are not critical to
      production workloads. For production workloads, see
      <a href="/agent/configuration/fips-compliance/">Datadog FIPS Compliance</a
      >.</strong
    >
  </p>
  <h2 id="requirements">Requirements</h2>
  <p><strong>Operating system requirements</strong>:</p>
  <div class="cdoc__toggleable" data-if="0">
    <ul>
      <li>A non-containerized Linux host.</li>
      <li>
        Your Linux OS must be in FIPS-compliant mode. See your OS vendor's
        documentation on what steps are required to meet this requirement.
      </li>
      <li>FIPS-compliant storage backing the host file system.</li>
    </ul>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="1">
    <ul>
      <li>A non-containerized Windows host.</li>
      <li>
        Windows must be in
        <a href="/agent/basic_agent_usage/windows/#uninstall-the-agent"
          >FIPS-compliant mode</a
        >.
      </li>
      <li>FIPS-compliant storage backing the host file system.</li>
    </ul>
  </div>
  <p>
    <strong>General requirements</strong> In addition to the Operating System
    (OS) requirements above:
  </p>
  <ul>
    <li>
      You must have access to a FIPS-compliant Datadog environment (US1-FED or
      GovCloud).
    </li>
    <li>The FIPS Agent is only available on Agent versions 7.63 and above.</li>
  </ul>
  <h2 id="installation">Installation</h2>
  <div class="cdoc__toggleable" data-if="2">
    <p>
      The Datadog FIPS Agent is in Preview and has not been fully audited.
      Install and test the Agent only on hosts that are not critical to
      production workloads.
    </p>
    <ol>
      <li>
        <p>
          Remove any <code>fips-proxy</code> installations on the host by
          uninstalling the <code>datadog-fips-proxy</code> package with your OS
          package manager. For example:
        </p>
        <p><strong>Red Hat</strong></p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-sh">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl">sudo yum remove datadog-fips-proxy
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p><strong>Ubuntu/Debian</strong></p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-sh">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl">sudo apt-get remove datadog-fips-proxy
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          Ensure that the Agent's configuration file does not contain any
          <a href="/agent/configuration/fips-compliance/">FIPS proxy</a>
          settings. FIPS proxy settings use the <code>fips.*</code> prefix.
        </p>
      </li>
      <li>
        <p>
          Use the
          <a href="/agent/guide/how-do-i-uninstall-the-agent/"
            >instructions for your OS</a
          >
          to uninstall the Datadog Agent.
        </p>
      </li>
      <li>
        <p>Install the Agent with FIPS support.</p>
        <p>
          <strong>Note:</strong> FIPS support is only available on Agent
          versions 7.63.0 and above:
        </p>
        <ol>
          <li>
            <p>
              If you're using the Agent install script, specify the
              <code>DD_AGENT_FLAVOR=&quot;datadog-fips-agent&quot;</code>
              environment variable in your installation command. For example:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-sh">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="nv">DD_SITE</span><span class="o">=</span><span class="s2">&#34;ddog-gov.com&#34;</span> <span class="nv">DD_API_KEY</span><span class="o">=</span><span class="s2">&#34;MY_API_KEY&#34;</span> <span class="nv">DD_AGENT_FLAVOR</span><span class="o">=</span><span class="s2">&#34;datadog-fips-agent&#34;</span> … bash -c <span class="s2">&#34;</span><span class="k">$(</span>curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh<span class="k">)</span><span class="s2">&#34;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              If you're installing with a package,
              <a
                href="/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/"
                >follow the instructions</a
              >
              to install the latest <code>datadog-fips-agent</code> package
              available for your platform.
            </p>
          </li>
          <li>
            <p>
              Add <code>GOFIPS=1</code> to your Datadog environment variables,
              reload all service units, and restart the Datadog Agent service
              (<code>datadog-agent.service</code>). For example, if your host is
              using systemd:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-sh">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="nb">echo</span> <span class="s2">&#34;GOFIPS=1&#34;</span> <span class="p">|</span> sudo tee -a /etc/datadog-agent/environment
</span></span><span class="line"><span class="cl">systemctl daemon-reload
</span></span><span class="line"><span class="cl">systemctl restart <span class="s1">&#39;datadog-agent*&#39;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              Run the <code>datadog-agent status</code> command and make sure
              you see <code>FIPS Mode: enabled</code> in the status output.
            </p>
            <p>
              {{&lt; img src=&quot;/agent/fips-linux.png&quot; alt=&quot;Your
              image description&quot; style=&quot;width:100%;&quot; &gt;}}
            </p>
          </li>
        </ol>
      </li>
    </ol>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="3">
    <p>
      The Datadog FIPS Agent is in preview and has not been fully audited.
      Install and test the Agent only on hosts that are not critical to
      production workloads.
    </p>
    <ol>
      <li>
        <p>
          Follow the
          <a href="/agent/basic_agent_usage/windows/#uninstall-the-agent"
            >Windows instructions</a
          >
          to uninstall the Datadog Agent.
        </p>
      </li>
      <li>
        <p>
          Run the command below to install the FIPS Agent, replacing
          <code>MY_API_KEY</code> with your API key:
        </p>
        <p>
          <strong>Note:</strong> FIPS support is only available on Agent
          versions 7.63.0 and above:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-powershell">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="nb">Start-Process</span> <span class="n">-Wait</span> <span class="n">msiexec</span> <span class="n">-ArgumentList</span> <span class="s1">&#39;/qn /i &#34;https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-fips-agent-7.63.0-rc.7-fips-preview-2.msi&#34; APIKEY=&#34;MY_API_KEY&#34; SITE=&#34;ddog-gov.com&#34;&#39;</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To install a different preview version of the FIPS Agent, search the
          <a href="/agent/configuration/fips-compliance/"
            >list of stable Agent versions</a
          >
          for <code>datadog-fips-agent</code> and replace the MSI in the command
          above with your desired version.
        </p>
      </li>
      <li>
        <p>
          Run the Agent <code>status</code> command and make sure you see
          <code>FIPS Mode: enabled</code> in the status output.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-powershell">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="p">&amp;</span> <span class="s2">&#34;</span><span class="nv">$env:ProgramFiles</span><span class="s2">\Datadog\Datadog Agent\bin\agent.exe&#34;</span> <span class="n">status</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          {{&lt; img src=&quot;/agent/fips-powershell.png&quot; alt=&quot;Your
          image description&quot; style=&quot;width:100%;&quot; &gt;}}
        </p>
      </li>
    </ol>
    <p>
      <strong>Note</strong>: The program name for the FIPS Agent in
      <strong>Add or Remove Programs</strong> is &quot;Datadog FIPS Agent.&quot;
    </p>
  </div>
  <h2 id="further-reading">Further reading</h2>
  <p>{{&lt; partial name=&quot;whats-next/whats-next.html&quot; &gt;}}</p>
<h2>Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/agent/configuration/fips-compliance"><span class="w-100 d-flex justify-content-between "><span class="text">Datadog FIPS Compliance</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["os"],"v":"linux"},"1":"linux"},"v":true,"r":"0"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["os"],"v":"linux"},"1":"windows"},"v":false,"r":"1"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["os"],"v":"linux"},"1":"linux"},"v":true,"r":"2"},"3":{"m":"F","n":"e","p":{"0":{"m":"V","p":["os"],"v":"linux"},"1":"windows"},"v":false,"r":"3"}},    filtersManifest: {"filtersByTraitId":{"os":{"config":{"trait_id":"os","option_group_id":"os_options","label":"Operating System"},"defaultValsByOptionGroupId":{"os_options":"linux"}}},"defaultValsByTraitId":{"os":"linux"},"optionGroupsById":{"os_options":[{"id":"windows","label":"Windows"},{"default":true,"id":"linux","label":"Linux"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>