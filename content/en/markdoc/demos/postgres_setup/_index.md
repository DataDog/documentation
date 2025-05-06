---
title: Postgres Integration Setup
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-postgres_version-pills-label" 
    class="cdoc-filter-label"
  >Postgres version</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="postgres_version" 
      data-option-id="gte_10_x_x"
      aria-selected="true"
      tabIndex="0"
    >10+</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="postgres_version" 
      data-option-id="lte_9_6_x"
      aria-selected="false"
      tabIndex="0"
    >9.6 and below</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-agent_version-pills-label" 
    class="cdoc-filter-label"
  >Agent version</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="agent_version" 
      data-option-id="7_x_x"
      aria-selected="true"
      tabIndex="0"
    >7</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="agent_version" 
      data-option-id="6_x_x"
      aria-selected="false"
      tabIndex="0"
    >6</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="agent_version" 
      data-option-id="5_x_x"
      aria-selected="false"
      tabIndex="0"
    >5</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-agent_host-pills-label" 
    class="cdoc-filter-label"
  >Agent host</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="agent_host" 
      data-option-id="self_hosted"
      aria-selected="true"
      tabIndex="0"
    >Self-hosted</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="agent_host" 
      data-option-id="kubernetes"
      aria-selected="false"
      tabIndex="0"
    >Kubernetes</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="agent_host" 
      data-option-id="docker"
      aria-selected="false"
      tabIndex="0"
    >Docker</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="agent_host" 
      data-option-id="ecs"
      aria-selected="false"
      tabIndex="0"
    >ECS</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-postgres_version-dropdown-label" 
    class="cdoc-filter-label"
  >Postgres version</p><div 
    id="cdoc-dropdown-postgres_version" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-postgres_version-dropdown-label">
      <span 
        id="cdoc-dropdown-postgres_version-label" 
        class="cdoc-btn-label"
      >10+</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-postgres_version-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="postgres_version" 
      data-option-id="gte_10_x_x"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >10+</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="postgres_version" 
      data-option-id="lte_9_6_x"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >9.6 and below</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-agent_version-dropdown-label" 
    class="cdoc-filter-label"
  >Agent version</p><div 
    id="cdoc-dropdown-agent_version" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-agent_version-dropdown-label">
      <span 
        id="cdoc-dropdown-agent_version-label" 
        class="cdoc-btn-label"
      >7</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-agent_version-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="agent_version" 
      data-option-id="7_x_x"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >7</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="agent_version" 
      data-option-id="6_x_x"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >6</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="agent_version" 
      data-option-id="5_x_x"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >5</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-agent_host-dropdown-label" 
    class="cdoc-filter-label"
  >Agent host</p><div 
    id="cdoc-dropdown-agent_host" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-agent_host-dropdown-label">
      <span 
        id="cdoc-dropdown-agent_host-label" 
        class="cdoc-btn-label"
      >Self-hosted</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-agent_host-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="agent_host" 
      data-option-id="self_hosted"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Self-hosted</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="agent_host" 
      data-option-id="kubernetes"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Kubernetes</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="agent_host" 
      data-option-id="docker"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Docker</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="agent_host" 
      data-option-id="ecs"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >ECS</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <div class="alert alert-info">
    <p>
      This is a test page. For comparison, see
      <a href="/markdoc_testing/demo_pages/postgres_integration_setup_control"
        >the vanilla Markdown version</a
      >.
    </p>
  </div>
  <h2 id="overview">Overview</h2>
  <p>
    The Postgres integration provides health and performance metrics for your
    Postgres database in near real-time. Visualize these metrics with the
    provided dashboard and create monitors to alert your team on PostgreSQL
    states.
  </p>
  <p>
    Enable
    <a href="https://docs.datadoghq.com/database_monitoring/"
      >Database Monitoring</a
    >
    (DBM) for enhanced insights into query performance and database health. In
    addition to the standard integration, Datadog DBM provides query-level
    metrics, live and historical query snapshots, wait event analysis, database
    load, query explain plans, and blocking query insights.
  </p>
  <h2 id="setup">Setup</h2>
  <div class="alert alert-info">
    <p>
      This page describes the standard Postgres Agent integration. If you are
      looking for the Database Monitoring product for Postgres, see
      <a href="https://docs.datadoghq.com/database_monitoring"
        >Datadog Database Monitoring</a
      >.
    </p>
  </div>
  <h3 id="installation">Installation</h3>
  <p>
    The PostgreSQL check is packaged with the Agent. To start gathering your
    PostgreSQL metrics and logs,
    <a href="https://app.datadoghq.com/account/settings/agent/latest"
      >install the Agent</a
    >.
  </p>
  <div class="cdoc__toggleable cdoc__hidden" data-if="58">
    <div class="cdoc__toggleable cdoc__hidden" data-if="56">
      <h3 id="running-agent-v5-on-kubernetes">
        Running Agent v5 on Kubernetes
      </h3>
      <p>This isn't a real section, it's here to test the dynamic TOC.</p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="57">
      <h3 id="running-agent-v6-on-kubernetes">
        Running Agent v6 on Kubernetes
      </h3>
      <p>This isn't a real section, it's here to test the dynamic TOC.</p>
    </div>
  </div>
  <h3 id="configuration">Configuration</h3>
  <p>
    <strong>Note</strong>: To install Database Monitoring for PostgreSQL, select
    your hosting solution in the
    <a href="https://docs.datadoghq.com/database_monitoring/#postgres"
      >Database Monitoring documentation</a
    >
    for instructions.
  </p>
  <p>
    Proceed with the following steps in this guide only if you are installing
    the standard integration alone.
  </p>
  <h4 id="prepare-postgres">Prepare Postgres</h4>
  <p>
    To get started with the standard PostgreSQL integration, create a read-only
    <code>datadog</code> user with proper access to your PostgreSQL server.
    Start <code>psql</code> on your PostgreSQL database.
  </p>
  <div class="cdoc__toggleable" data-if="59">
    <p>For PostgreSQL version 10 and above, run:</p>
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
          ><code><span class="line"><span class="cl"><span class="k">create</span><span class="w"> </span><span class="k">user</span><span class="w"> </span><span class="n">datadog</span><span class="w"> </span><span class="k">with</span><span class="w"> </span><span class="n">password</span><span class="w"> </span><span class="s1">&#39;&lt;PASSWORD&gt;&#39;</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">grant</span><span class="w"> </span><span class="n">pg_monitor</span><span class="w"> </span><span class="k">to</span><span class="w"> </span><span class="n">datadog</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">grant</span><span class="w"> </span><span class="k">SELECT</span><span class="w"> </span><span class="k">ON</span><span class="w"> </span><span class="n">pg_stat_database</span><span class="w"> </span><span class="k">to</span><span class="w"> </span><span class="n">datadog</span><span class="p">;</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="60">
    <p>For PostgreSQL versions below 10, run:</p>
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
          ><code><span class="line"><span class="cl"><span class="k">create</span><span class="w"> </span><span class="k">user</span><span class="w"> </span><span class="n">datadog</span><span class="w"> </span><span class="k">with</span><span class="w"> </span><span class="n">password</span><span class="w"> </span><span class="s1">&#39;&lt;PASSWORD&gt;&#39;</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">grant</span><span class="w"> </span><span class="k">SELECT</span><span class="w"> </span><span class="k">ON</span><span class="w"> </span><span class="n">pg_stat_database</span><span class="w"> </span><span class="k">to</span><span class="w"> </span><span class="n">datadog</span><span class="p">;</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <p>To verify the permissions are correct, run the following command:</p>
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
        ><code><span class="line"><span class="cl"><span class="n">psql</span><span class="w"> </span><span class="o">-</span><span class="n">h</span><span class="w"> </span><span class="n">localhost</span><span class="w"> </span><span class="o">-</span><span class="n">U</span><span class="w"> </span><span class="n">datadog</span><span class="w"> </span><span class="n">postgres</span><span class="w"> </span><span class="o">-</span><span class="k">c</span><span class="w"> </span><span class="err">\</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="s2">&#34;select * from pg_stat_database LIMIT(1);&#34;</span><span class="w"> </span><span class="err">\</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="o">&amp;&amp;</span><span class="w"> </span><span class="n">echo</span><span class="w"> </span><span class="o">-</span><span class="n">e</span><span class="w"> </span><span class="s2">&#34;\e[0;32mPostgres connection - OK\e[0m&#34;</span><span class="w"> </span><span class="err">\</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="o">||</span><span class="w"> </span><span class="n">echo</span><span class="w"> </span><span class="o">-</span><span class="n">e</span><span class="w"> </span><span class="s2">&#34;\e[0;31mCannot connect to Postgres\e[0m&#34;</span><span class="w">
</span></span></span></code></pre>
      </div>
    </div>
  </div>
  <p>
    When it prompts for a password, enter the one used in the first command.
  </p>
  <div class="cdoc__toggleable cdoc__hidden" data-if="61">
    <p>
      For PostgreSQL versions 9.6 and below, run the following and create a
      <code>SECURITY DEFINER</code> to read from <code>pg_stat_activity</code>.
    </p>
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
          ><code><span class="line"><span class="cl"><span class="k">CREATE</span><span class="w"> </span><span class="k">FUNCTION</span><span class="w"> </span><span class="n">pg_stat_activity</span><span class="p">()</span><span class="w"> </span><span class="k">RETURNS</span><span class="w"> </span><span class="k">SETOF</span><span class="w"> </span><span class="n">pg_catalog</span><span class="p">.</span><span class="n">pg_stat_activity</span><span class="w"> </span><span class="k">AS</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="err">$$</span><span class="w"> </span><span class="k">SELECT</span><span class="w"> </span><span class="o">*</span><span class="w"> </span><span class="k">from</span><span class="w"> </span><span class="n">pg_catalog</span><span class="p">.</span><span class="n">pg_stat_activity</span><span class="p">;</span><span class="w"> </span><span class="err">$$</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">LANGUAGE</span><span class="w"> </span><span class="k">sql</span><span class="w"> </span><span class="k">VOLATILE</span><span class="w"> </span><span class="k">SECURITY</span><span class="w"> </span><span class="k">DEFINER</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">CREATE</span><span class="w"> </span><span class="k">VIEW</span><span class="w"> </span><span class="n">pg_stat_activity_dd</span><span class="w"> </span><span class="k">AS</span><span class="w"> </span><span class="k">SELECT</span><span class="w"> </span><span class="o">*</span><span class="w"> </span><span class="k">FROM</span><span class="w"> </span><span class="n">pg_stat_activity</span><span class="p">();</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">grant</span><span class="w"> </span><span class="k">SELECT</span><span class="w"> </span><span class="k">ON</span><span class="w"> </span><span class="n">pg_stat_activity_dd</span><span class="w"> </span><span class="k">to</span><span class="w"> </span><span class="n">datadog</span><span class="p">;</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <p>
    <strong>Note</strong>: When generating custom metrics that require querying
    additional tables, you may need to grant the <code>SELECT</code> permission
    on those tables to the <code>datadog</code> user. Example:
    <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Check the
    <a href="https://docs.datadoghq.com/integrations/postgres/?tab=host#faq"
      >FAQ section</a
    >
    for more information.
  </p>
  <div class="cdoc__toggleable" data-if="65">
    <h4 id="host">Host</h4>
    <p>To configure this check for an Agent running on a host:</p>
    <h5 id="metric-collection">Metric collection</h5>
    <ol>
      <li>
        <p>
          Edit the <code>postgres.d/conf.yaml</code> file to point to your
          <code>host</code> / <code>port</code> and set the masters to monitor.
          See the
          <a
            href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example"
            >sample postgres.d/conf.yaml</a
          >
          for all available configuration options.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-yaml">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="nt">init_config</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">instances</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="c">## @param host - string - required</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="c">## The hostname to connect to.</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="c">## NOTE: Even if the server name is &#34;localhost&#34;, the agent connects to</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="c">## PostgreSQL using TCP/IP, unless you also provide a value for the sock key.</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="c">#</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span>- <span class="nt">host</span><span class="p">:</span><span class="w"> </span><span class="l">localhost</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## @param port - integer - required</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## Port to use when connecting to PostgreSQL.</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">port</span><span class="p">:</span><span class="w"> </span><span class="m">5432</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## @param user - string - required</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## Datadog Username created to connect to PostgreSQL.</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">username</span><span class="p">:</span><span class="w"> </span><span class="l">datadog</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## @param pass - string - required</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## Password associated with the Datadog user.</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">password</span><span class="p">:</span><span class="w"> </span><span class="s2">&#34;&lt;PASSWORD&gt;&#34;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## @param dbname - string - optional - default: postgres</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## Name of the PostgresSQL database to monitor.</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">## Note: If omitted, the default system postgres database is queried.</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">dbname</span><span class="p">:</span><span class="w"> </span><span class="s2">&#34;&lt;DB_NAME&gt;&#34;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c"># @param disable_generic_tags - boolean - optional - default: false</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c"># The integration will stop sending server tag as is redundant with host tag</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">disable_generic_tags</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
</span></span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          To collect relation metrics, connect the Agent to every logical
          database. These databases can be discovered automatically, or each one
          can be listed explicitly in the configuration.
        </p>
        <ul>
          <li>
            To discover logical databases automatically on a given instance,
            enable autodiscovery on that instance:
          </li>
        </ul>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-yaml">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="nt">instances</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span>- <span class="nt">host</span><span class="p">:</span><span class="w"> </span><span class="l">localhost</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">port</span><span class="p">:</span><span class="w"> </span><span class="m">5432</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">database_autodiscovery</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span><span class="nt">enabled</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span><span class="c"># Optionally, set the include field to specify</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span><span class="c"># a set of databases you are interested in discovering</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span><span class="nt">include</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span>- <span class="l">mydb.*</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span>- <span class="l">example.*</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">relations</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span>- <span class="nt">relation_regex</span><span class="p">:</span><span class="w"> </span><span class="l">.*</span><span class="w">
</span></span></span></code></pre>
            </div>
          </div>
        </div>
        <ul>
          <li>
            Alternatively, you can list each logical database as an instance in
            the configuration:
          </li>
        </ul>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-yaml">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="nt">instances</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span>- <span class="nt">host</span><span class="p">:</span><span class="w"> </span><span class="l">example-service-primary.example-host.com</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">port</span><span class="p">:</span><span class="w"> </span><span class="m">5432</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">username</span><span class="p">:</span><span class="w"> </span><span class="l">datadog</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">password</span><span class="p">:</span><span class="w"> </span><span class="s1">&#39;&lt;PASSWORD&gt;&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">relations</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span>- <span class="nt">relation_name</span><span class="p">:</span><span class="w"> </span><span class="l">products</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span>- <span class="nt">relation_name</span><span class="p">:</span><span class="w"> </span><span class="l">external_seller_products</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span>- <span class="nt">host</span><span class="p">:</span><span class="w"> </span><span class="l">example-service-replica-1.example-host.com</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">port</span><span class="p">:</span><span class="w"> </span><span class="m">5432</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">username</span><span class="p">:</span><span class="w"> </span><span class="l">datadog</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">password</span><span class="p">:</span><span class="w"> </span><span class="s1">&#39;&lt;PASSWORD&gt;&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">relations</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span>- <span class="nt">relation_regex</span><span class="p">:</span><span class="w"> </span><span class="l">inventory_.*</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="nt">relkind</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">          </span>- <span class="l">r</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">          </span>- <span class="l">i</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span>- <span class="nt">host</span><span class="p">:</span><span class="w"> </span><span class="l">example-service-replica-2.example-host.com</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">port</span><span class="p">:</span><span class="w"> </span><span class="m">5432</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">username</span><span class="p">:</span><span class="w"> </span><span class="l">datadog</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">password</span><span class="p">:</span><span class="w"> </span><span class="s1">&#39;&lt;PASSWORD&gt;&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">relations</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">      </span>- <span class="nt">relation_regex</span><span class="p">:</span><span class="w"> </span><span class="l">.*</span><span class="w">
</span></span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          <a
            href="https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent"
            >Restart the Agent</a
          >.
        </p>
      </li>
    </ol>
    <h5 id="trace-collection">Trace collection</h5>
    <p>
      Datadog APM integrates with Postgres to see the traces across your
      distributed system. Trace collection is enabled by default in the Datadog
      Agent v6+. To start collecting traces:
    </p>
    <ol>
      <li>
        <a href="https://docs.datadoghq.com/tracing/send_traces/"
          >Enable trace collection in Datadog</a
        >.
      </li>
      <li>
        <a href="https://docs.datadoghq.com/tracing/setup/"
          >Instrument your application that makes requests to Postgres</a
        >.
      </li>
    </ol>
    <h5 id="log-collection">Log collection</h5>
    <div class="cdoc__toggleable cdoc__hidden" data-if="62">
      <div class="alert alert-warning">
        <p>
          PostgreSQL logs are not available for Agent versions &lt;6.0. Upgrade
          to a newer Agent version to collect logs.
        </p>
      </div>
    </div>
    <div class="cdoc__toggleable" data-if="64">
      <p>
        PostgreSQL default logging is to <code>stderr</code>, and logs do not
        include detailed information. It is recommended to log into a file with
        additional details specified in the log line prefix. See the PostgreSQL
        documentation on<a
          href="https://www.postgresql.org/docs/11/runtime-config-logging.html"
          >Error Reporting and Logging</a
        >
        for more information.
      </p>
      <ol>
        <li>
          <p>
            Logging is configured within the file
            <code>/etc/postgresql/&lt;VERSION&gt;/main/postgresql.conf</code>.
            For regular log results, including statement outputs, uncomment the
            following parameters in the log section:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-undefined">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">  logging_collector = on
</span></span><span class="line"><span class="cl">  log_directory = &#39;pg_log&#39;  # directory where log files are written,
</span></span><span class="line"><span class="cl">                            # can be absolute or relative to PGDATA
</span></span><span class="line"><span class="cl">  log_filename = &#39;pg.log&#39;   # log file name, can include pattern
</span></span><span class="line"><span class="cl">  log_statement = &#39;all&#39;     # log all queries
</span></span><span class="line"><span class="cl">  #log_duration = on
</span></span><span class="line"><span class="cl">  log_line_prefix= &#39;%m [%p] %d %a %u %h %c &#39;
</span></span><span class="line"><span class="cl">  log_file_mode = 0644
</span></span><span class="line"><span class="cl">  ## For Windows
</span></span><span class="line"><span class="cl">  #log_destination = &#39;eventlog&#39;
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>
            To gather detailed duration metrics and make them searchable in the
            Datadog interface, they should be configured inline with the
            statement themselves. See below for the recommended configuration
            differences from above. <strong>Note</strong>: Both
            <code>log_statement</code> and <code>log_duration</code> options are
            commented out. See
            <a
              href="https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com"
              >Logging statement/duration on the same line</a
            >
            for discussion on this topic.
          </p>
          <p>
            This config logs all statements. To reduce the output based on
            duration, set the <code>log_min_duration_statement</code> value to
            the desired minimum duration (in milliseconds):
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-undefined">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">  log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
</span></span><span class="line"><span class="cl">                                    # and their durations, &gt; 0 logs only
</span></span><span class="line"><span class="cl">                                    # statements running at least this number
</span></span><span class="line"><span class="cl">                                    # of milliseconds
</span></span><span class="line"><span class="cl">  #log_statement = &#39;all&#39;
</span></span><span class="line"><span class="cl">  #log_duration = on
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>
            Collecting logs is disabled by default in the Datadog Agent, enable
            it in your <code>datadog.yaml</code> file:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-yaml">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="nt">logs_enabled</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
</span></span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>
            Add and edit this configuration block to your
            <code>postgres.d/conf.yaml</code> file to start collecting your
            PostgreSQL logs:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-yaml">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="nt">logs</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span>- <span class="nt">type</span><span class="p">:</span><span class="w"> </span><span class="l">file</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">path</span><span class="p">:</span><span class="w"> </span><span class="s2">&#34;&lt;LOG_FILE_PATH&gt;&#34;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">source</span><span class="p">:</span><span class="w"> </span><span class="l">postgresql</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">service</span><span class="p">:</span><span class="w"> </span><span class="s2">&#34;&lt;SERVICE_NAME&gt;&#34;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#To handle multi line that starts with yyyy-mm-dd use the following pattern</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#log_processing_rules:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#  - type: multi_line</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c">#    name: new_log_start_with_date</span><span class="w">
</span></span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            Change the <code>service</code> and <code>path</code> parameter
            values to configure for your environment. See the
            <a
              href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example"
              >sample postgres.d/conf.yaml</a
            >
            for all available configuration options.
          </p>
        </li>
        <li>
          <p>
            <a
              href="https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent"
              >Restart the Agent</a
            >.
          </p>
        </li>
      </ol>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="69">
    <h4 id="docker">Docker</h4>
    <p>To configure this check for an Agent running on a container:</p>
    <h5 id="metric-collection">Metric collection</h5>
    <p>
      Set
      <a href="https://docs.datadoghq.com/agent/docker/integrations/?tab=docker"
        >Autodiscovery Integrations Templates</a
      >
      as Docker labels on your application container:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-yaml">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="l">LABEL &#34;com.datadoghq.ad.check_names&#34;=&#39;[&#34;postgres&#34;]&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="l">LABEL &#34;com.datadoghq.ad.init_configs&#34;=&#39;[{}]&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="l">LABEL &#34;com.datadoghq.ad.instances&#34;=&#39;[{&#34;host&#34;:&#34;%%host%%&#34;, &#34;port&#34;:5432,&#34;username&#34;:&#34;datadog&#34;,&#34;password&#34;:&#34;&lt;PASSWORD&gt;&#34;}]&#39;</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <h5 id="log-collection">Log collection</h5>
    <p>
      Collecting logs is disabled by default in the Datadog Agent. To enable it,
      see
      <a
        href="https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation"
        >Docker Log Collection</a
      >.
    </p>
    <p>
      Then, set
      <a
        href="https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations"
        >Log Integrations</a
      >
      as Docker labels:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-yaml">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="l">LABEL &#34;com.datadoghq.ad.logs&#34;=&#39;[{&#34;source&#34;:&#34;postgresql&#34;,&#34;service&#34;:&#34;postgresql&#34;}]&#39;</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <h5 id="trace-collection">Trace collection</h5>
    <div class="cdoc__toggleable cdoc__hidden" data-if="66">
      <div class="alert alert-warning">
        <p>
          Trace collection for containerized apps is not available for Agent
          versions &lt;6.0. Upgrade to a newer Agent version to collect traces.
        </p>
      </div>
    </div>
    <div class="cdoc__toggleable" data-if="68">
      <p>
        APM for containerized apps is supported on Agent v6+ but requires extra
        configuration to begin collecting traces.
      </p>
      <p>Required environment variables on the Agent container:</p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;DD_API_KEY&gt;</code></td>
            <td><code>api_key</code></td>
          </tr>
          <tr>
            <td><code>&lt;DD_APM_ENABLED&gt;</code></td>
            <td>true</td>
          </tr>
          <tr>
            <td><code>&lt;DD_APM_NON_LOCAL_TRAFFIC&gt;</code></td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
      <p>
        See
        <a href="https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux"
          >Tracing Docker Applications</a
        >
        for a complete list of available environment variables and
        configuration.
      </p>
      <p>
        Then,
        <a
          href="https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations"
          >instrument your application container that makes requests to
          Postgres</a
        >
        and set <code>DD_AGENT_HOST</code> to the name of your Agent container.
      </p>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="74">
    <h4 id="kubernetes">Kubernetes</h4>
    <p>To configure this check for an Agent running on Kubernetes:</p>
    <h5 id="metric-collection">Metric collection</h5>
    <p>
      Set
      <a
        href="https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes"
        >Autodiscovery Integrations Templates</a
      >
      as pod annotations on your application container. Aside from this,
      templates can also be configured with
      <a
        href="https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration"
        >a file, a configmap, or a key-value store</a
      >.
    </p>
    <p><strong>Annotations v1</strong> (for Datadog Agent &lt; v7.36)</p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-yaml">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nt">apiVersion</span><span class="p">:</span><span class="w"> </span><span class="l">v1</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">kind</span><span class="p">:</span><span class="w"> </span><span class="l">Pod</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">metadata</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">name</span><span class="p">:</span><span class="w"> </span><span class="l">postgres</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">annotations</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">ad.datadoghq.com/postgresql.check_names</span><span class="p">:</span><span class="w"> </span><span class="s1">&#39;[&#34;postgres&#34;]&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">ad.datadoghq.com/postgresql.init_configs</span><span class="p">:</span><span class="w"> </span><span class="s1">&#39;[{}]&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">ad.datadoghq.com/postgresql.instances</span><span class="p">:</span><span class="w"> </span><span class="p">|</span><span class="sd">
</span></span></span><span class="line"><span class="cl"><span class="sd">      [
</span></span></span><span class="line"><span class="cl"><span class="sd">        {
</span></span></span><span class="line"><span class="cl"><span class="sd">          &#34;host&#34;: &#34;%%host%%&#34;,
</span></span></span><span class="line"><span class="cl"><span class="sd">          &#34;port&#34;:&#34;5432&#34;,
</span></span></span><span class="line"><span class="cl"><span class="sd">          &#34;username&#34;:&#34;datadog&#34;,
</span></span></span><span class="line"><span class="cl"><span class="sd">          &#34;password&#34;:&#34;&lt;PASSWORD&gt;&#34;
</span></span></span><span class="line"><span class="cl"><span class="sd">        }
</span></span></span><span class="line"><span class="cl"><span class="sd">      ]</span><span class="w">      
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">spec</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">containers</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span>- <span class="nt">name</span><span class="p">:</span><span class="w"> </span><span class="l">postgres</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable" data-if="70">
      <p><strong>Annotations v2</strong> (for Datadog Agent v7.36+)</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-yaml">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nt">apiVersion</span><span class="p">:</span><span class="w"> </span><span class="l">v1</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">kind</span><span class="p">:</span><span class="w"> </span><span class="l">Pod</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">metadata</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">name</span><span class="p">:</span><span class="w"> </span><span class="l">postgres</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">annotations</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">ad.datadoghq.com/postgres.checks</span><span class="p">:</span><span class="w"> </span><span class="p">|</span><span class="sd">
</span></span></span><span class="line"><span class="cl"><span class="sd">      {
</span></span></span><span class="line"><span class="cl"><span class="sd">        &#34;postgres&#34;: {
</span></span></span><span class="line"><span class="cl"><span class="sd">          &#34;init_config&#34;: {},
</span></span></span><span class="line"><span class="cl"><span class="sd">          &#34;instances&#34;: [
</span></span></span><span class="line"><span class="cl"><span class="sd">            {
</span></span></span><span class="line"><span class="cl"><span class="sd">              &#34;host&#34;: &#34;%%host%%&#34;,
</span></span></span><span class="line"><span class="cl"><span class="sd">              &#34;port&#34;:&#34;5432&#34;,
</span></span></span><span class="line"><span class="cl"><span class="sd">              &#34;username&#34;:&#34;datadog&#34;,
</span></span></span><span class="line"><span class="cl"><span class="sd">              &#34;password&#34;:&#34;&lt;PASSWORD&gt;&#34;
</span></span></span><span class="line"><span class="cl"><span class="sd">            }
</span></span></span><span class="line"><span class="cl"><span class="sd">          ]
</span></span></span><span class="line"><span class="cl"><span class="sd">        }
</span></span></span><span class="line"><span class="cl"><span class="sd">      }</span><span class="w">      
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">spec</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">containers</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span>- <span class="nt">name</span><span class="p">:</span><span class="w"> </span><span class="l">postgres</span><span class="w">
</span></span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <h5 id="log-collection">Log collection</h5>
    <p>
      Collecting logs is disabled by default in the Datadog Agent. To enable it,
      see
      <a
        href="https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup"
        >Kubernetes Log Collection</a
      >.
    </p>
    <p>
      Then, set
      <a
        href="https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations"
        >Log Integrations</a
      >
      as pod annotations. This can also be configured with
      <a
        href="https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration"
        >a file, a configmap, or a key-value store</a
      >.
    </p>
    <p><strong>Annotations v1/v2</strong></p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-yaml">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nt">apiVersion</span><span class="p">:</span><span class="w"> </span><span class="l">v1</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">kind</span><span class="p">:</span><span class="w"> </span><span class="l">Pod</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">metadata</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">name</span><span class="p">:</span><span class="w"> </span><span class="l">postgres</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">annotations</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">ad.datadoghq.com/postgres.logs</span><span class="p">:</span><span class="w"> </span><span class="s1">&#39;[{&#34;source&#34;:&#34;postgresql&#34;,&#34;service&#34;:&#34;&lt;SERVICE_NAME&gt;&#34;}]&#39;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="nt">spec</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">containers</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span>- <span class="nt">name</span><span class="p">:</span><span class="w"> </span><span class="l">postgres</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <h5 id="trace-collection">Trace collection</h5>
    <div class="cdoc__toggleable cdoc__hidden" data-if="71">
      <div class="alert alert-warning">
        <p>
          Trace collection for containerized apps is not supported for Agent
          versions &lt;6.0. Upgrade to a newer Agent version to collect traces.
        </p>
      </div>
    </div>
    <div class="cdoc__toggleable" data-if="73">
      <p>
        APM for containerized apps is supported on hosts running Agent v6+ but
        requires extra configuration to begin collecting traces.
      </p>
      <p>Required environment variables on the Agent container:</p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;DD_API_KEY&gt;</code></td>
            <td><code>api_key</code></td>
          </tr>
          <tr>
            <td><code>&lt;DD_APM_ENABLED&gt;</code></td>
            <td>true</td>
          </tr>
          <tr>
            <td><code>&lt;DD_APM_NON_LOCAL_TRAFFIC&gt;</code></td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
      <p>
        See
        <a
          href="https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup"
          >Tracing Kubernetes Applications</a
        >
        and the
        <a
          href="https://github.com/DataDog/integrations-core/blob/master/postgres/assets/service_checks.json"
          >Kubernetes DaemonSet Setup</a
        >
        for a complete list of available environment variables and
        configuration.
      </p>
      <p>
        Then,
        <a
          href="https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations"
          >instrument your application container that makes requests to
          Postgres</a
        >.
      </p>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="78">
    <h4 id="ecs">ECS</h4>
    <p>To configure this check for an Agent running on ECS:</p>
    <h5 id="metric-collection">Metric collection</h5>
    <p>
      Set
      <a href="https://docs.datadoghq.com/agent/docker/integrations/?tab=docker"
        >Autodiscovery Integrations Templates</a
      >
      as Docker labels on your application container:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-json">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;containerDefinitions&#34;</span><span class="p">:</span> <span class="p">[{</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;name&#34;</span><span class="p">:</span> <span class="s2">&#34;postgres&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;image&#34;</span><span class="p">:</span> <span class="s2">&#34;postgres:latest&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;dockerLabels&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nt">&#34;com.datadoghq.ad.check_names&#34;</span><span class="p">:</span> <span class="s2">&#34;[\&#34;postgres\&#34;]&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nt">&#34;com.datadoghq.ad.init_configs&#34;</span><span class="p">:</span> <span class="s2">&#34;[{}]&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nt">&#34;com.datadoghq.ad.instances&#34;</span><span class="p">:</span> <span class="s2">&#34;[{\&#34;host\&#34;:\&#34;%%host%%\&#34;, \&#34;port\&#34;:5432,\&#34;username\&#34;:\&#34;datadog\&#34;,\&#34;password\&#34;:\&#34;&lt;PASSWORD&gt;\&#34;}]&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">  <span class="p">}]</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h5 id="log-collection">Log collection</h5>
    <p>
      Collecting logs is disabled by default in the Datadog Agent. To enable it,
      see
      <a href="https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux"
        >ECS Log Collection</a
      >.
    </p>
    <p>
      Then, set
      <a
        href="https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations"
        >Log Integrations</a
      >
      as Docker labels:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-json">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;containerDefinitions&#34;</span><span class="p">:</span> <span class="p">[{</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;name&#34;</span><span class="p">:</span> <span class="s2">&#34;postgres&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;image&#34;</span><span class="p">:</span> <span class="s2">&#34;postgres:latest&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;dockerLabels&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nt">&#34;com.datadoghq.ad.logs&#34;</span><span class="p">:</span> <span class="s2">&#34;[{\&#34;source\&#34;:\&#34;postgresql\&#34;,\&#34;service\&#34;:\&#34;postgresql\&#34;}]&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">  <span class="p">}]</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h5 id="trace-collection">Trace collection</h5>
    <div class="cdoc__toggleable cdoc__hidden" data-if="75">
      <div class="alert alert-warning">
        <p>
          Trace collection for containerized apps is not available for Agent
          versions &lt;6.0. Upgrade to a newer Agent version to collect traces.
        </p>
      </div>
    </div>
    <div class="cdoc__toggleable" data-if="77">
      <p>
        APM for containerized apps is supported on Agent v6+ but requires extra
        configuration to begin collecting traces.
      </p>
      <p>Required environment variables on the Agent container:</p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;DD_API_KEY&gt;</code></td>
            <td><code>api_key</code></td>
          </tr>
          <tr>
            <td><code>&lt;DD_APM_ENABLED&gt;</code></td>
            <td>true</td>
          </tr>
          <tr>
            <td><code>&lt;DD_APM_NON_LOCAL_TRAFFIC&gt;</code></td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
      <p>
        See
        <a href="https://docs.datadoghq.com/agent/docker/apm/"
          >Tracing Docker Applications</a
        >
        for a complete list of available environment variables and
        configuration.
      </p>
      <p>
        Then,
        <a
          href="https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations"
          >instrument your application container that makes requests to
          Postgres</a
        >
        and set <code>DD_AGENT_HOST</code> to the
        <a
          href="https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup"
          >EC2 private IP address</a
        >.
      </p>
    </div>
  </div>
  <h3 id="validation">Validation</h3>
  <p>
    <a
      href="https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information"
      >Run the Agent's status subcommand</a
    >
    and look for <code>postgres</code> under the Checks section.
  </p>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"56":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"56"},"57":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"6_x_x"},"v":false,"r":"57"},"58":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_host"],"v":"self_hosted"},"1":"kubernetes"},"v":false,"r":"58"},"59":{"m":"F","n":"e","p":{"0":{"m":"V","p":["postgres_version"],"v":"gte_10_x_x"},"1":"gte_10_x_x"},"v":true,"r":"59"},"60":{"m":"F","n":"e","p":{"0":{"m":"V","p":["postgres_version"],"v":"gte_10_x_x"},"1":"lte_9_6_x"},"v":false,"r":"60"},"61":{"m":"F","n":"e","p":{"0":{"m":"V","p":["postgres_version"],"v":"gte_10_x_x"},"1":"lte_9_6_x"},"v":false,"r":"61"},"62":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"62"},"64":{"m":"F","n":"n","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"63"}},"v":true,"r":"64"},"65":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_host"],"v":"self_hosted"},"1":"self_hosted"},"v":true,"r":"65"},"66":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"66"},"68":{"m":"F","n":"n","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"67"}},"v":true,"r":"68"},"69":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_host"],"v":"self_hosted"},"1":"docker"},"v":false,"r":"69"},"70":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"7_x_x"},"v":true,"r":"70"},"71":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"71"},"73":{"m":"F","n":"n","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"72"}},"v":true,"r":"73"},"74":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_host"],"v":"self_hosted"},"1":"kubernetes"},"v":false,"r":"74"},"75":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"75"},"77":{"m":"F","n":"n","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_version"],"v":"7_x_x"},"1":"5_x_x"},"v":false,"r":"76"}},"v":true,"r":"77"},"78":{"m":"F","n":"e","p":{"0":{"m":"V","p":["agent_host"],"v":"self_hosted"},"1":"ecs"},"v":false,"r":"78"}},    filtersManifest: {"filtersByTraitId":{"postgres_version":{"config":{"trait_id":"postgres_version","option_group_id":"postgres_integration_version_options","label":"Postgres version"},"defaultValsByOptionGroupId":{"postgres_integration_version_options":"gte_10_x_x"}},"agent_version":{"config":{"trait_id":"agent_version","option_group_id":"major_agent_version_options","label":"Agent version"},"defaultValsByOptionGroupId":{"major_agent_version_options":"7_x_x"}},"agent_host":{"config":{"trait_id":"agent_host","option_group_id":"postgres_integration_host_options","label":"Agent host"},"defaultValsByOptionGroupId":{"postgres_integration_host_options":"self_hosted"}}},"defaultValsByTraitId":{"postgres_version":"gte_10_x_x","agent_version":"7_x_x","agent_host":"self_hosted"},"optionGroupsById":{"postgres_integration_version_options":[{"default":true,"id":"gte_10_x_x","label":"10+"},{"id":"lte_9_6_x","label":"9.6 and below"}],"major_agent_version_options":[{"default":true,"id":"7_x_x","label":"7"},{"id":"6_x_x","label":"6"},{"id":"5_x_x","label":"5"}],"postgres_integration_host_options":[{"default":true,"id":"self_hosted","label":"Self-hosted"},{"id":"kubernetes","label":"Kubernetes"},{"id":"docker","label":"Docker"},{"id":"ecs","label":"ECS"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>