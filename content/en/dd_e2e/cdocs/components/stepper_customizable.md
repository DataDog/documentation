---
title: Stepper test (customizable page)
draft: true
private: true
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-prog_lang-pills-label" 
    class="cdoc-filter-label"
  >Programming Language</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="prog_lang" 
      data-option-id="javascript"
      aria-selected="true"
      tabIndex="0"
    >JavaScript</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="python"
      aria-selected="false"
      tabIndex="0"
    >Python</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="ruby"
      aria-selected="false"
      tabIndex="0"
    >Ruby</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="go"
      aria-selected="false"
      tabIndex="0"
    >Go</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="java"
      aria-selected="false"
      tabIndex="0"
    >Java</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-database-pills-label" 
    class="cdoc-filter-label"
  >Database</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="database" 
      data-option-id="postgres"
      aria-selected="true"
      tabIndex="0"
    >Postgres</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="database" 
      data-option-id="mysql"
      aria-selected="false"
      tabIndex="0"
    >MySQL</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="database" 
      data-option-id="mongo_db"
      aria-selected="false"
      tabIndex="0"
    >MongoDB</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
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
      >JavaScript</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-prog_lang-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="prog_lang" 
      data-option-id="javascript"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >JavaScript</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="python"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Python</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="ruby"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Ruby</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="go"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Go</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="java"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Java</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-database-dropdown-label" 
    class="cdoc-filter-label"
  >Database</p><div 
    id="cdoc-dropdown-database" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-database-dropdown-label">
      <span 
        id="cdoc-dropdown-database-label" 
        class="cdoc-btn-label"
      >Postgres</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-database-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="database" 
      data-option-id="postgres"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Postgres</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="database" 
      data-option-id="mysql"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >MySQL</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="database" 
      data-option-id="mongo_db"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >MongoDB</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article><h2 id="overview">Overview</h2><p>This is a test page used to verify stepper scroll behavior on a customizable page. Because the page defines <code>content_filters</code>, it renders the sticky Cdocs filter bar below the header. When you navigate between steps, the new step title must scroll clear of both the header and the sticky filter bar.</p><p>The first step is intentionally long so that advancing to the next step forces a scroll, letting you confirm the title lands below the sticky region.</p><h2 id="stepper-component">Stepper component</h2><div class="stepper stepper--collapsed" id="stepper-1" data-step-count="3" role="region" aria-label="Step-by-step guide"><div class="stepper__steps" id="stepper-1-steps" role="list"><div class="stepper__step stepper__step--first" id="stepper-1-step-1" data-step-index="0" role="listitem" aria-labelledby="stepper-1-step-1-title"><div class="stepper__step-heading"><h3 class="stepper__step-title" id="stepper-1-step-1-title">Install the database</h3><div class="stepper__viz-controls" id="stepper-stepper-1-viz-controls"><button class="stepper__btn stepper__show-all-btn" aria-controls="stepper-1-steps" title="Expand all"><img class="stepper__btn-icon" src="http://localhost:1313/images/icons/expand-mdi.svg" alt="Expand all"/><span class="stepper__btn-label">Expand all</span></button><button class="stepper__btn stepper__collapse-btn" aria-controls="stepper-1-steps" title="Collapse all" data-hidden="true"><img class="stepper__btn-icon" src="http://localhost:1313/images/icons/collapse-mdi.svg" alt="Collapse all"/><span class="stepper__btn-label">Collapse all</span></button></div></div><div class="stepper__step-content"><p>Run the following command to install FakeDB:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">curl -fsSL https://fakedb.example.com/install.sh <span class="p">|</span> bash
</span></span></code></pre></div></div></div><p>After the installation completes, verify that FakeDB is running:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">fakedb --version
</span></span></code></pre></div></div></div><h3 id="system-requirements-2">System requirements</h3><p>Before you install FakeDB, make sure your system meets the following requirements:</p><ul><li><strong>Operating system</strong>: Linux (kernel 4.15+), macOS 12+, or Windows 10+</li><li><strong>CPU</strong>: x86_64 or ARM64</li><li><strong>Memory</strong>: At least 2 GB of available RAM</li><li><strong>Disk space</strong>: At least 500 MB of free disk space for the binary and initial data directory</li><li><strong>Network</strong>: Outbound access to <code>fakedb.example.com</code> on port 443 during installation</li></ul><h3 id="what-the-installer-does-2">What the installer does</h3><p>The one-line installer performs the following steps:</p><ol><li>Downloads the latest stable FakeDB binary for your platform</li><li>Verifies the download signature using GPG</li><li>Copies the binary to <code>/usr/local/bin/fakedb</code></li><li>Creates the default data directory at <code>~/.fakedb/data</code></li><li>Writes a default configuration file to <code>~/.fakedb/fakedb.conf</code></li><li>Registers FakeDB as a systemd service (Linux) or launchd agent (macOS)</li></ol><h3 id="manual-installation-2">Manual installation</h3><p>If you prefer to install FakeDB without running the one-line installer, download the binary directly:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">curl -fsSL https://releases.fakedb.example.com/v2.4.1/fakedb-linux-amd64.tar.gz -o fakedb.tar.gz
</span></span><span class="line"><span class="cl">tar -xzf fakedb.tar.gz
</span></span><span class="line"><span class="cl">sudo mv fakedb /usr/local/bin/fakedb
</span></span><span class="line"><span class="cl">sudo chmod +x /usr/local/bin/fakedb
</span></span></code></pre></div></div></div><p>Verify the installation:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">fakedb --version
</span></span><span class="line"><span class="cl"><span class="c1"># Expected output: fakedb version 2.4.1 (build 20240315)</span>
</span></span></code></pre></div></div></div><h3 id="troubleshooting-installation-issues-2">Troubleshooting installation issues</h3><p><strong>Permission denied when running the installer</strong></p><p>If you see a <code>Permission denied</code> error, run the installer with <code>sudo</code>:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">sudo bash -c <span class="s2">&#34;</span><span class="k">$(</span>curl -fsSL https://fakedb.example.com/install.sh<span class="k">)</span><span class="s2">&#34;</span>
</span></span></code></pre></div></div></div><p><strong>GPG verification failed</strong></p><p>If GPG verification fails, your keyring may be outdated. Update it:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">gpg --keyserver hkps://keys.openpgp.org --recv-keys FAKEDB_KEY_ID
</span></span></code></pre></div></div></div><p><strong>Port already in use</strong></p><p>If port 5432 is already in use by another process, identify the process:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">sudo lsof -i :5432
</span></span></code></pre></div></div></div><p>You can then either stop the conflicting process or configure FakeDB to use a different port in the next step.</p></div><div class="stepper__nav stepper-1-nav"><button class="stepper__btn stepper__next-btn" data-stepper-id="stepper-1" aria-label="Go to next step">Next</button></div></div><div class="stepper__step" id="stepper-1-step-2" data-step-index="1" role="listitem" aria-labelledby="stepper-1-step-2-title" data-hidden="true"><h3 class="stepper__step-title" id="stepper-1-step-2-title">Configure the database</h3><div class="stepper__step-content"><p>Create a configuration file for FakeDB:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-yaml"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl"><span class="nt">fakedb</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">host</span><span class="p">:</span><span class="w"> </span><span class="l">localhost</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">port</span><span class="p">:</span><span class="w"> </span><span class="m">5432</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">database</span><span class="p">:</span><span class="w"> </span><span class="l">mydb</span><span class="w">
</span></span></span></code></pre></div></div></div></div><div class="stepper__nav stepper-1-nav"><button class="stepper__btn stepper__prev-btn" data-stepper-id="stepper-1" aria-label="Go to previous step">Previous</button><button class="stepper__btn stepper__next-btn" data-stepper-id="stepper-1" aria-label="Go to next step">Next</button></div></div><div class="stepper__step" id="stepper-1-step-3" data-step-index="2" role="listitem" aria-labelledby="stepper-1-step-3-title" data-hidden="true"><h3 class="stepper__step-title" id="stepper-1-step-3-title">Connect to the database</h3><div class="stepper__step-content"><p>Start the FakeDB service and open a connection:</p><div class="code-snippet-wrapper"><div class="code-filename-wrapper d-flex justify-content-end"></div><div class="code-snippet "><div class="code-button-wrapper position-absolute"><button class="btn text-primary js-copy-button">Copy</button></div><div class="cdoc-code-snippet cdoc-language-shell"><pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">fakedb start
</span></span><span class="line"><span class="cl">fakedb connect --host localhost --port <span class="m">5432</span> --database mydb
</span></span></code></pre></div></div></div></div><div class="stepper__nav stepper-1-nav"><button class="stepper__btn stepper__prev-btn" data-stepper-id="stepper-1" aria-label="Go to previous step">Previous</button><button class="stepper__btn stepper__finish-btn" data-stepper-id="stepper-1" aria-label="Finish all steps">Finish</button></div></div><div class="stepper__finished" id="stepper-stepper-1-finished" role="status" aria-live="polite" data-hidden="true"><p>You're all set. Happy databasing!</p></div></div><div class="stepper__reset" id="stepper-stepper-1-reset"><button class="stepper__btn stepper__reset-btn" aria-controls="stepper-1-steps">Start over</button></div></div></article></div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{"prog_lang":{"config":{"trait_id":"prog_lang","option_group_id":"dd_e2e_backend_prog_lang_options","label":"Programming Language"},"defaultValsByOptionGroupId":{"dd_e2e_backend_prog_lang_options":"javascript"}},"database":{"config":{"trait_id":"database","option_group_id":"dd_e2e_database_options","label":"Database"},"defaultValsByOptionGroupId":{"dd_e2e_database_options":"postgres"}}},"defaultValsByTraitId":{"prog_lang":"javascript","database":"postgres"},"optionGroupsById":{"dd_e2e_backend_prog_lang_options":[{"default":true,"id":"javascript","label":"JavaScript"},{"id":"python","label":"Python"},{"id":"ruby","label":"Ruby"},{"id":"go","label":"Go"},{"id":"java","label":"Java"}],"dd_e2e_database_options":[{"default":true,"id":"postgres","label":"Postgres"},{"id":"mysql","label":"MySQL"},{"id":"mongo_db","label":"MongoDB"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>