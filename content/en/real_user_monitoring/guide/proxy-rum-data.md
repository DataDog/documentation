---
title: Proxy Your Browser RUM Data
description: >-
  Configure browser RUM data proxying with SDK source options and
  version-specific settings for custom network routing.
aliases:
  - /real_user_monitoring/faq/proxy_rum_data/
further_reading:
  - link: /real_user_monitoring/
    tag: Documentation
    text: Learn about Real User Monitoring
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-lib_src-pills-label" 
    class="cdoc-filter-label"
  >SDK source</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="lib_src" 
      data-option-id="npm"
      aria-selected="true"
      tabIndex="0"
    >NPM</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="lib_src" 
      data-option-id="cdn_async"
      aria-selected="false"
      tabIndex="0"
    >CDN async</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="lib_src" 
      data-option-id="cdn_sync"
      aria-selected="false"
      tabIndex="0"
    >CDN sync</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-rum_browser_sdk_version-pills-label" 
    class="cdoc-filter-label"
  >SDK version</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="rum_browser_sdk_version" 
      data-option-id="gte_5_4_0"
      aria-selected="true"
      tabIndex="0"
    >>=5.4.0</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="rum_browser_sdk_version" 
      data-option-id="gte_4_34_0"
      aria-selected="false"
      tabIndex="0"
    >>=4.34.0</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="rum_browser_sdk_version" 
      data-option-id="lt_4_34_0"
      aria-selected="false"
      tabIndex="0"
    ><4.34.0</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-lib_src-dropdown-label" 
    class="cdoc-filter-label"
  >SDK source</p><div 
    id="cdoc-dropdown-lib_src" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-lib_src-dropdown-label">
      <span 
        id="cdoc-dropdown-lib_src-label" 
        class="cdoc-btn-label"
      >NPM</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-lib_src-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="lib_src" 
      data-option-id="npm"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >NPM</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="lib_src" 
      data-option-id="cdn_async"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >CDN async</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="lib_src" 
      data-option-id="cdn_sync"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >CDN sync</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-rum_browser_sdk_version-dropdown-label" 
    class="cdoc-filter-label"
  >SDK version</p><div 
    id="cdoc-dropdown-rum_browser_sdk_version" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-rum_browser_sdk_version-dropdown-label">
      <span 
        id="cdoc-dropdown-rum_browser_sdk_version-label" 
        class="cdoc-btn-label"
      >>=5.4.0</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-rum_browser_sdk_version-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="rum_browser_sdk_version" 
      data-option-id="gte_5_4_0"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >>=5.4.0</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="rum_browser_sdk_version" 
      data-option-id="gte_4_34_0"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >>=4.34.0</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="rum_browser_sdk_version" 
      data-option-id="lt_4_34_0"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    ><4.34.0</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK version is <4.34.0"
    data-if="112"
  >
    <div class="alert alert-danger">
      <p>
        Upgrade to Browser SDK <code>4.34.0</code> or later to avoid security
        vulnerabilities in your proxy configuration.
      </p>
    </div>
  </div>
  <h2 id="overview">Overview</h2>
  <p>
    The RUM Browser SDK can be configured to send requests through a proxy. When
    you set the SDK's <code>proxy</code>
    <a
      href="/real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters"
      >initialization parameter</a
    >
    to a URL such as <code>https://www.example-proxy.com/any-endpoint</code>,
    all RUM data is sent to that URL using the POST method. The RUM data still
    needs to be forwarded to Datadog from the proxy.
  </p>
  <h2 id="prerequisite-proxy-setup">Prerequisite proxy setup</h2>
  <p>To successfully forward a request to Datadog, your proxy must</p>
  <ol>
    <li>
      <a href="#build-the-datadog-intake-url">Build the Datadog intake URL</a>.
    </li>
    <li>
      Add an <code>X-Forwarded-For</code> header containing the request client
      IP address for accurate geoIP.
    </li>
    <li>
      Forward the request to the Datadog intake URL using the POST method.
    </li>
    <li>Leave the request body unchanged.</li>
  </ol>
  <div class="alert alert-warning">
    <ul>
      <li>
        For security reasons, remove any HTTP headers that potentially contain
        sensitive information, such as the <code>cookie</code> header.
      </li>
      <li>
        The request body can contain binary data and should not be converted to
        a string. Make sure your proxy implementation forwards the raw body
        without conversion.
      </li>
      <li>
        Make sure your proxy implementation does not allow a malicious actor to
        send requests to a different server. For example:
        <code>https://browser-intake-datadoghq.com.malicious.com</code>.
      </li>
    </ul>
  </div>
  <h3 id="build-the-datadog-intake-url">Build the Datadog intake URL</h3>
  <p>
    Your Datadog intake URL should have the format
    <code>&lt;INTAKE_ORIGIN&gt;/&lt;PATH&gt;&lt;PARAMETERS&gt;</code> (for
    example,
    <code
      >https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&amp;...</code
    >).
  </p>
  <table>
    <thead></thead>
    <tbody>
      <tr>
        <td><p>intake origin</p></td>
        <td>
          <p>
            The Datadog intake origin corresponds to your <code>site</code>
            <a
              href="/real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters"
              >initialization parameter</a
            >. The Datadog intake origin corresponding to your site parameter
            should be defined in your proxy implementation.
          </p>
          <div class="d-none site-region-container" data-region="us">
            <p>
              The intake origin for your Datadog site is
              <code>https://browser-intake-datadoghq.com</code>.
            </p>
          </div>
          <div class="d-none site-region-container" data-region="us3">
            <p>
              The intake origin for your Datadog site is
              <code>https://browser-intake-us3-datadoghq.com</code>.
            </p>
          </div>
          <div class="d-none site-region-container" data-region="us5">
            <p>
              The intake origin for your Datadog site is
              <code>https://browser-intake-us5-datadoghq.com</code>.
            </p>
          </div>
          <div class="d-none site-region-container" data-region="eu">
            <p>
              The intake origin for your Datadog site is
              <code>https://browser-intake-datadoghq.eu</code>.
            </p>
          </div>
          <div class="d-none site-region-container" data-region="ap1">
            <p>
              The intake origin for your Datadog site is
              <code>https://browser-intake-ap1-datadoghq.com</code>.
            </p>
          </div>
          <div class="d-none site-region-container" data-region="ap2">
            <p>
              The intake origin for your Datadog site is
              <code>https://browser-intake-ap2-datadoghq.com</code>.
            </p>
          </div>
          <div class="d-none site-region-container" data-region="gov">
            <p>
              The intake origin for your Datadog site is
              <code>https://browser-intake-ddog-gov.com</code>.
            </p>
          </div>
        </td>
      </tr>
      <tr>
        <td><p>path</p></td>
        <td>
          <p>
            The path contains the API version and the product (for example,
            <code>/api/v2/rum</code> for RUM data or
            <code>/api/v2/replay</code> for Session Replay data).
          </p>
          <p>
            The path for each request can be accessed in the request's
            <code>ddforward</code> parameter (for example,
            <code
              >https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser</code
            >).
          </p>
        </td>
      </tr>
      <tr>
        <td>parameters</td>
        <td>
          The request parameters (for example,
          <code>ddsource=browser&amp;...</code>) can be accessed in the
          request's <code>ddforward</code> parameter (for example,
          <code
            >https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser</code
          >).
        </td>
      </tr>
    </tbody>
  </table>
  <h2 id="sdk-setup">SDK setup</h2>
  <div
    class="cdoc__toggleable"
    data-description="(SDK version is >=5.4.0) or (SDK version is >=4.34.0)"
    data-if="122"
  >
    <p>
      Configure the URL of the proxy in the <code>proxy</code> initialization
      parameter:
    </p>
    <div
      class="cdoc__toggleable"
      data-description="SDK source is NPM"
      data-if="113"
    >
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-javascript">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">Datacenter</span><span class="p">,</span> <span class="nx">datadogRum</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/browser-rum&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">datadogRum</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;<span class="cdoc js-region-param region-param" data-region-param="dd_site"></span>&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">proxy</span><span class="o">:</span> <span class="s1">&#39;&lt;YOUR_PROXY_URL&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK source is CDN async"
      data-if="114"
    >
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-javascript">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">onReady</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">        <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">proxy</span><span class="o">:</span> <span class="s1">&#39;&lt;YOUR_PROXY_URL&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK source is CDN sync"
      data-if="115"
    >
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-javascript">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">        <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">proxy</span><span class="o">:</span> <span class="s1">&#39;&lt;YOUR_PROXY_URL&gt;&#39;</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <p>
      The RUM Browser SDK adds a <code>ddforward</code> query parameter to all
      requests to your proxy. This query parameter contains the URL path and
      parameters that all data must be forwarded to.
    </p>
    <p>
      For example, with a <code>site</code> set to <code>datadoghq.eu</code> and
      a <code>proxy</code> set to
      <code>https://example.org/datadog-intake-proxy</code>, the RUM Browser SDK
      sends requests to a URL like this:
      <code
        >https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser</code
      >. The proxy forwards the request to
      <code
        >https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser</code
      >.
    </p>
    <div
      class="cdoc__toggleable"
      data-description="SDK version is >=5.4.0"
      data-if="119"
    >
      <h3 id="passing-a-function-to-the-">
        Passing a function to the <code>proxy</code> initialization parameter
      </h3>
      <p>
        The <code>proxy</code> initialization parameter also supports a function
        input. This function allows you to have more control on how the path and
        parameters are added to the proxy URL.
      </p>
      <p>This function receives an object with the following properties:</p>
      <ul>
        <li>
          <code>path</code>: the path for the Datadog requests (example:
          <code>/api/v2/rum</code>)
        </li>
        <li>
          <code>parameters</code>: the parameters of the Datadog requests
          (example: <code>ddsource=browser&amp;...</code>)
        </li>
      </ul>
      <div
        class="cdoc__toggleable"
        data-description="SDK source is NPM"
        data-if="116"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-javascript">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">Datacenter</span><span class="p">,</span> <span class="nx">datadogRum</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/browser-rum&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">datadogRum</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;<span class="cdoc js-region-param region-param" data-region-param="dd_site"></span>&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">proxy</span><span class="o">:</span> <span class="p">(</span><span class="nx">options</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="sb">`https://www.proxy.com/foo</span><span class="si">${</span><span class="nx">options</span><span class="p">.</span><span class="nx">path</span><span class="si">}</span><span class="sb">/bar?</span><span class="si">${</span><span class="nx">options</span><span class="p">.</span><span class="nx">parameters</span><span class="si">}</span><span class="sb">`</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="SDK source is CDN async"
        data-if="117"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-javascript">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">onReady</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">        <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">proxy</span><span class="o">:</span> <span class="p">(</span><span class="nx">options</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="sb">`https://www.proxy.com/foo</span><span class="si">${</span><span class="nx">options</span><span class="p">.</span><span class="nx">path</span><span class="si">}</span><span class="sb">/bar?</span><span class="si">${</span><span class="nx">options</span><span class="p">.</span><span class="nx">parameters</span><span class="si">}</span><span class="sb">`</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="SDK source is CDN sync"
        data-if="118"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-javascript">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">        <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">proxy</span><span class="o">:</span> <span class="p">(</span><span class="nx">options</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="sb">`https://www.proxy.com/foo</span><span class="si">${</span><span class="nx">options</span><span class="p">.</span><span class="nx">path</span><span class="si">}</span><span class="sb">/bar?</span><span class="si">${</span><span class="nx">options</span><span class="p">.</span><span class="nx">parameters</span><span class="si">}</span><span class="sb">`</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <p><strong>Note:</strong></p>
      <ul>
        <li>
          Some privacy blockers already target the intake
          <a
            href="https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840"
            >URL patterns</a
          >, so you may want to take that into account when building your proxy
          URL.
        </li>
        <li>
          The <code>proxy</code> function is called for each request, so it
          should avoid any heavy computation.
        </li>
        <li>
          <strong>JSP web applications</strong> need to use the
          <code>\</code> escape character to properly propagate these parameters
          to the browser. For example:
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-javascript">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="nx">proxy</span><span class="o">:</span> <span class="p">(</span><span class="nx">options</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="s1">&#39;http://proxyURL:proxyPort\${options.path}?\${options.parameters}&#39;</span><span class="p">,</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK version is <4.34.0"
    data-if="123"
  >
    <p>
      Before Browser SDK v4.34.0, the <code>proxyUrl</code> initialization
      parameter was used, and the Datadog intake origin was included in the
      <code>ddforward</code> attribute. The proxy implementation was in charge
      of validating this host, and failure to do so resulted in various
      vulnerabilities.
    </p>
    <p>
      The Datadog intake origin needs to be defined in your proxy implementation
      to ensure security.
    </p>
    <p>
      <strong
        >To avoid security vulnerabilities, you must upgrade to Browser SDK
        <code>4.34.0</code> or later.</strong
      >
    </p>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about Real User Monitoring</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"112":{"m":"F","n":"e","p":{"0":{"m":"V","p":["rum_browser_sdk_version"],"v":"gte_5_4_0"},"1":"lt_4_34_0"},"v":false,"r":"112"},"113":{"m":"F","n":"e","p":{"0":{"m":"V","p":["lib_src"],"v":"npm"},"1":"npm"},"v":true,"r":"113"},"114":{"m":"F","n":"e","p":{"0":{"m":"V","p":["lib_src"],"v":"npm"},"1":"cdn_async"},"v":false,"r":"114"},"115":{"m":"F","n":"e","p":{"0":{"m":"V","p":["lib_src"],"v":"npm"},"1":"cdn_sync"},"v":false,"r":"115"},"116":{"m":"F","n":"e","p":{"0":{"m":"V","p":["lib_src"],"v":"npm"},"1":"npm"},"v":true,"r":"116"},"117":{"m":"F","n":"e","p":{"0":{"m":"V","p":["lib_src"],"v":"npm"},"1":"cdn_async"},"v":false,"r":"117"},"118":{"m":"F","n":"e","p":{"0":{"m":"V","p":["lib_src"],"v":"npm"},"1":"cdn_sync"},"v":false,"r":"118"},"119":{"m":"F","n":"e","p":{"0":{"m":"V","p":["rum_browser_sdk_version"],"v":"gte_5_4_0"},"1":"gte_5_4_0"},"v":true,"r":"119"},"122":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["rum_browser_sdk_version"],"v":"gte_5_4_0"},"1":"gte_5_4_0"},"v":true,"r":"120"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["rum_browser_sdk_version"],"v":"gte_5_4_0"},"1":"gte_4_34_0"},"v":false,"r":"121"}},"v":true,"r":"122"},"123":{"m":"F","n":"e","p":{"0":{"m":"V","p":["rum_browser_sdk_version"],"v":"gte_5_4_0"},"1":"lt_4_34_0"},"v":false,"r":"123"}},    filtersManifest: {"filtersByTraitId":{"lib_src":{"config":{"trait_id":"lib_src","option_group_id":"rum_browser_sdk_source_options","label":"SDK source"},"defaultValsByOptionGroupId":{"rum_browser_sdk_source_options":"npm"}},"rum_browser_sdk_version":{"config":{"trait_id":"rum_browser_sdk_version","option_group_id":"rum_browser_sdk_version_for_proxying_options","label":"SDK version"},"defaultValsByOptionGroupId":{"rum_browser_sdk_version_for_proxying_options":"gte_5_4_0"}}},"defaultValsByTraitId":{"lib_src":"npm","rum_browser_sdk_version":"gte_5_4_0"},"optionGroupsById":{"rum_browser_sdk_source_options":[{"default":true,"id":"npm","label":"NPM"},{"id":"cdn_async","label":"CDN async"},{"id":"cdn_sync","label":"CDN sync"}],"rum_browser_sdk_version_for_proxying_options":[{"default":true,"id":"gte_5_4_0","label":">=5.4.0"},{"id":"gte_4_34_0","label":">=4.34.0"},{"id":"lt_4_34_0","label":"<4.34.0"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>