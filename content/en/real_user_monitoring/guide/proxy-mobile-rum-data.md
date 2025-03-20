---
title: Proxy Your Mobile RUM Data
aliases:
  - /real_user_monitoring/faq/proxy_mobile_rum_data/
further_reading:
  - link: /real_user_monitoring/
    tag: Documentation
    text: Learn about Real User Monitoring
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-env-pills-label" 
    class="cdoc-filter-label"
  >SDK</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="env" 
      data-option-id="android"
      aria-selected="true"
      tabIndex="0"
    >Android</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="env" 
      data-option-id="ios"
      aria-selected="false"
      tabIndex="0"
    >iOS</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="env" 
      data-option-id="react_native"
      aria-selected="false"
      tabIndex="0"
    >React Native</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-protocol-pills-label" 
    class="cdoc-filter-label"
  >Protocol</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="protocol" 
      data-option-id="http_https"
      aria-selected="true"
      tabIndex="0"
    >HTTP/HTTPS</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="protocol" 
      data-option-id="socks"
      aria-selected="false"
      tabIndex="0"
    >SOCKS</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-env-dropdown-label" 
    class="cdoc-filter-label"
  >SDK</p><div 
    id="cdoc-dropdown-env" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-env-dropdown-label">
      <span 
        id="cdoc-dropdown-env-label" 
        class="cdoc-btn-label"
      >Android</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-env-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="env" 
      data-option-id="android"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Android</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="env" 
      data-option-id="ios"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >iOS</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="env" 
      data-option-id="react_native"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >React Native</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-protocol-dropdown-label" 
    class="cdoc-filter-label"
  >Protocol</p><div 
    id="cdoc-dropdown-protocol" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-protocol-dropdown-label">
      <span 
        id="cdoc-dropdown-protocol-label" 
        class="cdoc-btn-label"
      >HTTP/HTTPS</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-protocol-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="protocol" 
      data-option-id="http_https"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >HTTP/HTTPS</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="protocol" 
      data-option-id="socks"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >SOCKS</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>The RUM Mobile SDKs can be configured to send requests through a proxy.</p>
  <div class="cdoc__toggleable" data-if="0">
    <p>
      Proxies use
      <a
        href="https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html"
        >OkHttpClient Proxy and Authenticator</a
      >
      on Android.
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="1">
    <p>
      Proxies use
      <a
        href="https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary"
        >URLSessionConfiguration.connectionProxyDictionary</a
      >
      on iOS.
    </p>
  </div>
  <div class="cdoc__toggleable" data-if="5">
    <h2 id="prerequisite-proxy-setup">Prerequisite proxy setup</h2>
    <p>
      To successfully forward a request to Datadog, your proxy must support
      <a href="https://www.rfc-editor.org/rfc/rfc9110#CONNECT">HTTP CONNECT</a>
      requests.
    </p>
    <h2 id="recommended-sdk-setup">Recommended SDK setup</h2>
    <div class="cdoc__toggleable" data-if="2">
      <p>
        When initializing the Android SDK, specify the following proxy
        configuration:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">configBuilder</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;environment&gt;&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">val</span> <span class="py">proxy</span> <span class="p">=</span> <span class="n">Proxy</span><span class="p">(</span><span class="nc">Proxy</span><span class="p">.</span><span class="nc">Type</span><span class="p">.</span><span class="n">HTTP</span><span class="p">,</span> <span class="n">InetSocketAddress</span><span class="p">(</span><span class="s2">&#34;&lt;www.example.com&gt;&#34;</span><span class="p">,</span> <span class="p">&lt;</span><span class="m">123</span><span class="p">&gt;))</span>
</span></span><span class="line"><span class="cl"><span class="k">val</span> <span class="py">authenticator</span> <span class="p">=</span> <span class="n">ProxyAuthenticator</span><span class="p">(</span><span class="s2">&#34;&lt;proxy user&gt;&#34;</span><span class="p">,</span> <span class="s2">&#34;&lt;proxy password&gt;&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">configBuilder</span><span class="p">.</span><span class="n">setProxy</span><span class="p">(</span><span class="n">proxy</span><span class="p">,</span> <span class="n">authenticator</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        For more information, see the
        <a
          href="https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html"
          >OkHttpClient Proxy and Authenticator</a
        >
        documentation.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="3">
      <p>
        When initializing the iOS SDK, specify the following proxy
        configuration:
      </p>
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">proxyConfiguration</span><span class="p">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFNetworkProxiesHTTPEnable</span><span class="p">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFNetworkProxiesHTTPPort</span><span class="p">:</span> <span class="p">&lt;</span><span class="mi">123</span><span class="p">&gt;,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFNetworkProxiesHTTPProxy</span><span class="p">:</span> <span class="s">&#34;&lt;www.example.com&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFProxyUsernameKey</span><span class="p">:</span> <span class="s">&#34;&lt;proxy user&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFProxyPasswordKey</span><span class="p">:</span> <span class="s">&#34;&lt;proxy password&gt;&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">]</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogObjc</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">proxyConfiguration</span> <span class="o">=</span> <span class="l">@{</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFNetworkProxiesHTTPEnable</span><span class="p">:</span> <span class="m">@YES</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFNetworkProxiesHTTPPort</span><span class="p">:</span> <span class="p">@</span><span class="o">&lt;</span><span class="mi">123</span><span class="o">&gt;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFNetworkProxiesHTTPProxy</span><span class="p">:</span> <span class="s">@&#34;&lt;www.example.com&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFProxyUsernameKey</span><span class="p">:</span> <span class="s">@&#34;&lt;proxyuser&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFProxyPasswordKey</span><span class="p">:</span> <span class="s">@&#34;&lt;proxypass&gt;&#34;</span>
</span></span><span class="line"><span class="cl"><span class="l">}</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
            <p>
              For more information, see the
              <a
                href="https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary"
                >URLSessionConfiguration.connectionProxyDictionary</a
              >
              documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="4">
      <p>
        When initializing the React Native SDK, specify the following proxy
        configuration:
      </p>
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
            ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">,</span> <span class="nx">ProxyConfiguration</span><span class="p">,</span> <span class="nx">ProxyType</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/mobile-react-native&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span><span class="s1">&#39;&lt;client token&gt;&#39;</span><span class="p">,</span> <span class="s1">&#39;&lt;environment&gt;&#39;</span><span class="p">,</span> <span class="s1">&#39;&lt;application id&gt;&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">config</span><span class="p">.</span><span class="nx">proxyConfig</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">ProxyConfiguration</span><span class="p">(</span><span class="nx">ProxyType</span><span class="p">.</span><span class="nx">HTTPS</span><span class="p">,</span> <span class="s1">&#39;&lt;www.example.com&gt;&#39;</span><span class="p">,</span> <span class="o">&lt;</span><span class="mi">123</span><span class="o">&gt;</span><span class="p">,</span> <span class="s1">&#39;&lt;proxy user&gt;&#39;</span><span class="p">,</span> <span class="s1">&#39;&lt;proxy password&gt;&#39;</span><span class="p">);</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="9">
    <h2 id="prerequisite-proxy-setup">Prerequisite proxy setup</h2>
    <p>
      To successfully forward a request to Datadog, your proxy must support
      <a href="https://datatracker.ietf.org/doc/html/rfc1928">SOCKS5 proxying</a
      >.
    </p>
    <h2 id="recommended-sdk-setup">Recommended SDK setup</h2>
    <div class="cdoc__toggleable" data-if="6">
      <p>
        When initializing the Android SDK, specify the following proxy
        configuration:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">configBuilder</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;environment&gt;&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">val</span> <span class="py">proxy</span> <span class="p">=</span> <span class="n">Proxy</span><span class="p">(</span><span class="nc">Proxy</span><span class="p">.</span><span class="nc">Type</span><span class="p">.</span><span class="n">SOCKS</span><span class="p">,</span> <span class="n">InetSocketAddress</span><span class="p">(</span><span class="s2">&#34;&lt;www.example.com&gt;&#34;</span><span class="p">,</span> <span class="p">&lt;</span><span class="m">123</span><span class="p">&gt;))</span>
</span></span><span class="line"><span class="cl"><span class="k">val</span> <span class="py">authenticator</span> <span class="p">=</span> <span class="n">ProxyAuthenticator</span><span class="p">(</span><span class="s2">&#34;&lt;proxy user&gt;&#34;</span><span class="p">,</span> <span class="s2">&#34;&lt;proxy password&gt;&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">configBuilder</span><span class="p">.</span><span class="n">setProxy</span><span class="p">(</span><span class="n">proxy</span><span class="p">,</span> <span class="n">authenticator</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        For more information, see the
        <a
          href="https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html"
          >OkHttpClient Proxy and Authenticator</a
        >
        documentation.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="7">
      <p>
        When initializing the iOS SDK, specify the following proxy
        configuration:
      </p>
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">proxyConfiguration</span><span class="p">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFNetworkProxiesSOCKSEnable</span><span class="p">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFNetworkProxiesSOCKSPort</span><span class="p">:</span> <span class="p">&lt;</span><span class="mi">123</span><span class="p">&gt;,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFNetworkProxiesSOCKSProxy</span><span class="p">:</span> <span class="s">&#34;&lt;www.example.com&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFProxyUsernameKey</span><span class="p">:</span> <span class="s">&#34;&lt;proxy user&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">kCFProxyPasswordKey</span><span class="p">:</span> <span class="s">&#34;&lt;proxy password&gt;&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">]</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogObjc</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">proxyConfiguration</span> <span class="o">=</span> <span class="l">@{</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFNetworkProxiesSOCKSEnable</span><span class="p">:</span> <span class="m">@YES</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFNetworkProxiesSOCKSPort</span><span class="p">:</span> <span class="p">@</span><span class="o">&lt;</span><span class="mi">123</span><span class="o">&gt;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFNetworkProxiesSOCKSProxy</span><span class="p">:</span> <span class="s">@&#34;&lt;www.example.com&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFProxyUsernameKey</span><span class="p">:</span> <span class="s">@&#34;&lt;proxyuser&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span><span class="nl">kCFProxyPasswordKey</span><span class="p">:</span> <span class="s">@&#34;&lt;proxypass&gt;&#34;</span>
</span></span><span class="line"><span class="cl"><span class="l">}</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
            <p>
              For more information, see the
              <a
                href="https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary"
                >URLSessionConfiguration.connectionProxyDictionary</a
              >
              documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="8">
      <p>
        When initializing the React Native SDK, specify the following proxy
        configuration:
      </p>
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
            ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">,</span> <span class="nx">ProxyConfiguration</span><span class="p">,</span> <span class="nx">ProxyType</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/mobile-react-native&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span><span class="s1">&#39;&lt;client token&gt;&#39;</span><span class="p">,</span> <span class="s1">&#39;&lt;environment&gt;&#39;</span><span class="p">,</span> <span class="s1">&#39;&lt;application id&gt;&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">config</span><span class="p">.</span><span class="nx">proxyConfig</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">ProxyConfiguration</span><span class="p">(</span><span class="nx">ProxyType</span><span class="p">.</span><span class="nx">SOCKS</span><span class="p">,</span> <span class="s1">&#39;&lt;www.example.com&gt;&#39;</span><span class="p">,</span> <span class="o">&lt;</span><span class="mi">123</span><span class="o">&gt;</span><span class="p">,</span> <span class="s1">&#39;&lt;proxy user&gt;&#39;</span><span class="p">,</span> <span class="s1">&#39;&lt;proxy password&gt;&#39;</span><span class="p">);</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
<h2>Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about Real User Monitoring</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"android"},"v":true,"r":"0"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"ios"},"v":false,"r":"1"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"android"},"v":true,"r":"2"},"3":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"ios"},"v":false,"r":"3"},"4":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"react_native"},"v":false,"r":"4"},"5":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http_https"},"1":"http_https"},"v":true,"r":"5"},"6":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"android"},"v":true,"r":"6"},"7":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"ios"},"v":false,"r":"7"},"8":{"m":"F","n":"e","p":{"0":{"m":"V","p":["env"],"v":"android"},"1":"react_native"},"v":false,"r":"8"},"9":{"m":"F","n":"e","p":{"0":{"m":"V","p":["protocol"],"v":"http_https"},"1":"socks"},"v":false,"r":"9"}},    filtersManifest: {"filtersByTraitId":{"env":{"config":{"trait_id":"env","option_group_id":"rum_sdk_env_options","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_env_options":"android"}},"protocol":{"config":{"trait_id":"protocol","option_group_id":"rum_mobile_proxy_protocol_options","label":"Protocol"},"defaultValsByOptionGroupId":{"rum_mobile_proxy_protocol_options":"http_https"}}},"defaultValsByTraitId":{"env":"android","protocol":"http_https"},"optionGroupsById":{"rum_sdk_env_options":[{"default":true,"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"react_native","label":"React Native"}],"rum_mobile_proxy_protocol_options":[{"default":true,"id":"http_https","label":"HTTP/HTTPS"},{"id":"socks","label":"SOCKS"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>