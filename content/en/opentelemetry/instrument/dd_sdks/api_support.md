---
title: OpenTelemetry API Support
description: >-
  Use the OpenTelemetry API with Datadog SDKs to send traces, metrics, and logs
  to Datadog while maintaining vendor-neutral instrumentation.
aliases:
  - /opentelemetry/interoperability/api_support
  - /opentelemetry/interoperability/otel_api_tracing_interoperability/
  - /opentelemetry/instrument/api_support/dotnet/
  - /opentelemetry/instrument/api_support/dotnet/logs
  - /opentelemetry/instrument/api_support/dotnet/metrics
  - /opentelemetry/instrument/api_support/dotnet/traces
  - /opentelemetry/instrument/api_support/go
  - /opentelemetry/instrument/api_support/java
  - /opentelemetry/instrument/api_support/nodejs/
  - /opentelemetry/instrument/api_support/nodejs/logs
  - /opentelemetry/instrument/api_support/nodejs/metrics
  - /opentelemetry/instrument/api_support/nodejs/traces
  - /opentelemetry/instrument/api_support/php
  - /opentelemetry/instrument/api_support/python/
  - /opentelemetry/instrument/api_support/python/logs
  - /opentelemetry/instrument/api_support/python/metrics
  - /opentelemetry/instrument/api_support/python/traces
  - /opentelemetry/instrument/api_support/ruby/
  - /opentelemetry/instrument/api_support/ruby/metrics
  - /opentelemetry/instrument/api_support/ruby/traces
  - /opentelemetry/instrument/api_support/rust
further_reading:
  - link: tracing/guide/instrument_custom_method
    text: Instrument a custom method to get deep visibility into your business logic
    tag: Documentation
  - link: tracing/connect_logs_and_traces
    text: Connect your Logs and Traces together
    tag: Documentation
  - link: tracing/visualization/
    text: Explore your services, resources, and traces
    tag: Documentation
  - link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
    text: Learn More about Datadog and the OpenTelemetry initiative
    tag: Blog
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-prog_lang-pills-label" 
    class="cdoc-filter-label"
  >Language</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="prog_lang" 
      data-option-id="java"
      aria-selected="true"
      tabIndex="0"
    >Java</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="python"
      aria-selected="false"
      tabIndex="0"
    >Python</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="node_js"
      aria-selected="false"
      tabIndex="0"
    >Node.js</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="go"
      aria-selected="false"
      tabIndex="0"
    >Go</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="ruby"
      aria-selected="false"
      tabIndex="0"
    >Ruby</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="dot_net"
      aria-selected="false"
      tabIndex="0"
    >.NET</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="php"
      aria-selected="false"
      tabIndex="0"
    >PHP</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="rust"
      aria-selected="false"
      tabIndex="0"
    >Rust</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-platform-pills-label" 
    class="cdoc-filter-label"
  >Signal</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="platform" 
      data-option-id="traces"
      aria-selected="true"
      tabIndex="0"
    >Traces</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="metrics"
      aria-selected="false"
      tabIndex="0"
    >Metrics</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="logs"
      aria-selected="false"
      tabIndex="0"
    >Logs</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-prog_lang-dropdown-label" 
    class="cdoc-filter-label"
  >Language</p><div 
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
      >Java</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-prog_lang-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="prog_lang" 
      data-option-id="java"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Java</a><a 
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
      data-option-id="node_js"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Node.js</a><a 
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
      data-option-id="ruby"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Ruby</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="dot_net"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >.NET</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="php"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >PHP</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="rust"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Rust</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-platform-dropdown-label" 
    class="cdoc-filter-label"
  >Signal</p><div 
    id="cdoc-dropdown-platform" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-platform-dropdown-label">
      <span 
        id="cdoc-dropdown-platform-label" 
        class="cdoc-btn-label"
      >Traces</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="traces"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Traces</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="metrics"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Metrics</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="logs"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Logs</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <div
    class="cdoc__toggleable"
    data-description="(Language is Go) or (Language is PHP) or (Language is Java) or (Language is Rust)"
    data-if="6"
  >
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Signal is Metrics"
      data-if="0"
    >
      <div class="alert alert-danger">
        <p>
          OpenTelemetry API support for metrics is not available for this
          language. Use <a href="/developers/dogstatsd/">DogStatsD</a> to send
          custom metrics instead.
        </p>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Signal is Logs"
      data-if="1"
    >
      <div class="alert alert-danger">
        <p>
          OpenTelemetry API support for logs is not available for this language.
          Use
          <a href="/logs/log_collection/">Datadog Log Collection</a> instead.
        </p>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Language is Ruby"
    data-if="8"
  >
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Signal is Logs"
      data-if="7"
    >
      <div class="alert alert-danger">
        <p>
          OpenTelemetry API support for logs is not available for Ruby. Use
          <a href="/logs/log_collection/">Datadog Log Collection</a> instead.
        </p>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable"
    data-description="Signal is Traces"
    data-if="17"
  >
    <h2 id="overview">Overview</h2>
    <p>
      Use OpenTelemetry tracing APIs with Datadog SDKs to create custom spans,
      add tags, record events, and more.
    </p>
    <div
      class="cdoc__toggleable"
      data-description="Language is Java"
      data-if="9"
    >
      <h2 id="setup">Setup</h2>
      <div class="alert alert-info">
        <p>OpenTelemetry is supported in Java after version 1.24.0.</p>
      </div>
      <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
      <ol>
        <li>
          <p>
            If you have not yet read the instructions for auto-instrumentation
            and setup, start with the
            <a href="/tracing/setup/java/">Java Setup Instructions</a>.
          </p>
        </li>
        <li>
          <p>
            Make sure you only depend on the OpenTelemetry API (and not the
            OpenTelemetry SDK).
          </p>
        </li>
        <li>
          <p>
            Set the <code>dd.trace.otel.enabled</code> system property or the
            <code>DD_TRACE_OTEL_ENABLED</code> environment variable to
            <code>true</code>.
          </p>
        </li>
      </ol>
      <h2 id="adding-span-tags">Adding span tags</h2>
      <h3 id="add-custom-span-tags">Add custom span tags</h3>
      <p>
        Add custom tags to your spans corresponding to any dynamic value within
        your application code such as <code>customer.id</code>.
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-java">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.api.trace.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">public</span> <span class="kt">void</span> <span class="nf">doSomething</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">Span</span><span class="o">.</span><span class="na">current</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">  <span class="n">span</span><span class="o">.</span><span class="na">setAttribute</span><span class="o">(</span><span class="s">&#34;user-name&#34;</span><span class="o">,</span> <span class="s">&#34;Some User&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="adding-tags-globally-to-all-spans">
        Adding tags globally to all spans
      </h3>
      <p>
        The <code>dd.tags</code> property allows you to set tags across all
        generated spans for an application. This is useful for grouping stats
        for your applications, data centers, or any other tags you would like to
        see in Datadog.
      </p>
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
            ><code><span class="line"><span class="cl">java -javaagent:&lt;DD-JAVA-AGENT-PATH&gt;.jar <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>    -Ddd.tags<span class="o">=</span>datacenter:njc,&lt;TAG_KEY&gt;:&lt;TAG_VALUE&gt; <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>    -jar &lt;YOUR_APPLICATION_PATH&gt;.jar
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="setting-errors-on-span">Setting errors on span</h3>
      <p>To set an error on a span, use the <code>setStatus</code> method:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-java">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">import static</span> <span class="nn">io.opentelemetry.api.trace.StatusCode.ERROR</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.api.trace.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">public</span> <span class="kt">void</span> <span class="nf">doSomething</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">Span</span><span class="o">.</span><span class="na">current</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">  <span class="n">span</span><span class="o">.</span><span class="na">setStatus</span><span class="o">(</span><span class="n">ERROR</span><span class="o">,</span> <span class="s">&#34;Some error details...&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="setting-tags-and-errors-on-a-root-span-from-a-child-span">
        Setting tags and errors on a root span from a child span
      </h3>
      <p>
        When you want to set tags or errors on the root span from within a child
        span, you can use the OpenTelemetry Context API:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-java">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.api.trace.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.api.trace.Tracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.context.Context</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.context.ContextKey</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.context.Scope</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">Example</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="kd">private</span> <span class="kd">final</span> <span class="kd">static</span> <span class="n">ContextKey</span><span class="o">&lt;</span><span class="n">Span</span><span class="o">&gt;</span> <span class="n">CONTEXT_KEY</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">    <span class="n">ContextKey</span><span class="o">.</span><span class="na">named</span><span class="o">(</span><span class="s">&#34;opentelemetry-traces-local-root-span&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="kd">public</span> <span class="kt">void</span> <span class="nf">begin</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">Tracer</span> <span class="n">tracer</span> <span class="o">=</span> <span class="n">GlobalOpenTelemetry</span><span class="o">.</span><span class="na">getTracer</span><span class="o">(</span><span class="s">&#34;my-scope&#34;</span><span class="o">,</span> <span class="s">&#34;0.1.0&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="n">Span</span> <span class="n">parentSpan</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="na">spanBuilder</span><span class="o">(</span><span class="s">&#34;begin&#34;</span><span class="o">).</span><span class="na">startSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="k">try</span> <span class="o">(</span><span class="n">Scope</span> <span class="n">scope</span> <span class="o">=</span> <span class="n">parentSpan</span><span class="o">.</span><span class="na">makeCurrent</span><span class="o">())</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">createChildSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span> <span class="k">finally</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">parentSpan</span><span class="o">.</span><span class="na">end</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl">  <span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="kd">private</span> <span class="kt">void</span> <span class="nf">createChildSpan</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">Tracer</span> <span class="n">tracer</span> <span class="o">=</span> <span class="n">GlobalOpenTelemetry</span><span class="o">.</span><span class="na">getTracer</span><span class="o">(</span><span class="s">&#34;my-scope&#34;</span><span class="o">,</span> <span class="s">&#34;0.1.0&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="n">Span</span> <span class="n">childSpan</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="na">spanBuilder</span><span class="o">(</span><span class="s">&#34;child-span&#34;</span><span class="o">).</span><span class="na">startSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="k">try</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">Span</span> <span class="n">rootSpan</span> <span class="o">=</span> <span class="n">Context</span><span class="o">.</span><span class="na">current</span><span class="o">().</span><span class="na">get</span><span class="o">(</span><span class="n">CONTEXT_KEY</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">        <span class="k">if</span> <span class="o">(</span><span class="kc">null</span> <span class="o">!=</span> <span class="n">rootSpan</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">          <span class="n">rootSpan</span><span class="o">.</span><span class="na">setAttribute</span><span class="o">(</span><span class="s">&#34;my-attribute&#34;</span><span class="o">,</span> <span class="s">&#34;my-attribute-value&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">          <span class="n">rootSpan</span><span class="o">.</span><span class="na">setStatus</span><span class="o">(</span><span class="n">StatusCode</span><span class="o">.</span><span class="na">ERROR</span><span class="o">,</span> <span class="s">&#34;Some error details...&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span> <span class="k">finally</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">childSpan</span><span class="o">.</span><span class="na">end</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl">  <span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-spans">Adding spans</h2>
      <p>
        If you aren't using a
        <a
          href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility"
          >supported framework instrumentation</a
        >, or you would like additional depth in your application's
        <a href="/tracing/glossary/#trace">traces</a>, you may want to add
        custom instrumentation to your code for complete flame graphs or to
        measure execution times for pieces of code.
      </p>
      <p>
        If modifying application code is not possible, use the environment
        variable <code>dd.trace.methods</code> to detail these methods.
      </p>
      <p>
        If you have existing <code>@Trace</code> or similar annotations, or
        prefer to use annotations to complete any incomplete traces within
        Datadog, use Trace Annotations.
      </p>
      <h3 id="trace-annotations">Trace annotations</h3>
      <p>
        Add <code>@WithSpan</code> to methods to have them be traced when
        running OpenTelemetry and the <code>dd-java-agent.jar</code>. If the
        Agent is not attached, this annotation has no effect on your
        application.
      </p>
      <p>
        OpenTelemetry's <code>@WithSpan</code> annotation is provided by the
        <code>opentelemetry-instrumentation-annotations</code> dependency.
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-java">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.instrumentation.annotations.WithSpan</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SessionManager</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="nd">@WithSpan</span>
</span></span><span class="line"><span class="cl">  <span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">saveSession</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// your method implementation here
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="manually-creating-a-new-span">Manually creating a new span</h3>
      <p>To manually create new spans within the current trace context:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-java">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.api.trace.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.api.trace.Tracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentelemetry.context.Scope</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">Example</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="kd">public</span> <span class="kt">void</span> <span class="nf">doSomething</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">Tracer</span> <span class="n">tracer</span> <span class="o">=</span> <span class="n">GlobalOpenTelemetry</span><span class="o">.</span><span class="na">getTracer</span><span class="o">(</span><span class="s">&#34;my-scope&#34;</span><span class="o">,</span> <span class="s">&#34;0.1.0&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="na">spanBuilder</span><span class="o">(</span><span class="s">&#34;my-resource&#34;</span><span class="o">).</span><span class="na">startSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="k">try</span> <span class="o">(</span><span class="n">Scope</span> <span class="n">scope</span> <span class="o">=</span> <span class="n">span</span><span class="o">.</span><span class="na">makeCurrent</span><span class="o">())</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="c1">// do some work
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="n">Throwable</span> <span class="n">t</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">recordException</span><span class="o">(</span><span class="n">t</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">      <span class="k">throw</span> <span class="n">t</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span> <span class="k">finally</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">end</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl">  <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-events">Adding span events</h2>
      <div class="alert alert-info">
        <p>Adding span events requires SDK version 1.40.0 or higher.</p>
      </div>
      <p>
        You can add span events using the <code>addEvent</code> API. This method
        requires a <code>name</code> parameter and optionally accepts
        <code>attributes</code> and <code>timestamp</code> parameters. The
        method creates a new span event with the specified properties and
        associates it with the corresponding span.
      </p>
      <ul>
        <li>
          <strong>Name</strong> [<em>required</em>]: A string representing the
          event's name.
        </li>
        <li>
          <strong>Attributes</strong> [<em>optional</em>]: Key-value pairs where
          the key is a non-empty string and the value is a primitive type or a
          homogeneous array of primitive values.
        </li>
        <li>
          <strong>Timestamp</strong> [<em>optional</em>]: A UNIX timestamp
          representing the event's occurrence time. Expects an
          <code>Instant</code> object.
        </li>
      </ul>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-java">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="n">Attributes</span> <span class="n">eventAttributes</span> <span class="o">=</span> <span class="n">Attributes</span><span class="o">.</span><span class="na">builder</span><span class="o">()</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="n">AttributeKey</span><span class="o">.</span><span class="na">longKey</span><span class="o">(</span><span class="s">&#34;int_val&#34;</span><span class="o">),</span> <span class="n">1L</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="n">AttributeKey</span><span class="o">.</span><span class="na">stringKey</span><span class="o">(</span><span class="s">&#34;string_val&#34;</span><span class="o">),</span> <span class="s">&#34;two&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="n">AttributeKey</span><span class="o">.</span><span class="na">longArrayKey</span><span class="o">(</span><span class="s">&#34;int_array&#34;</span><span class="o">),</span> <span class="n">Arrays</span><span class="o">.</span><span class="na">asList</span><span class="o">(</span><span class="n">3L</span><span class="o">,</span> <span class="n">4L</span><span class="o">))</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="n">AttributeKey</span><span class="o">.</span><span class="na">stringArrayKey</span><span class="o">(</span><span class="s">&#34;string_array&#34;</span><span class="o">),</span> <span class="n">Arrays</span><span class="o">.</span><span class="na">asList</span><span class="o">(</span><span class="s">&#34;5&#34;</span><span class="o">,</span> <span class="s">&#34;6&#34;</span><span class="o">))</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="n">AttributeKey</span><span class="o">.</span><span class="na">booleanArrayKey</span><span class="o">(</span><span class="s">&#34;bool_array&#34;</span><span class="o">),</span> <span class="n">Arrays</span><span class="o">.</span><span class="na">asList</span><span class="o">(</span><span class="kc">true</span><span class="o">,</span> <span class="kc">false</span><span class="o">))</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="na">addEvent</span><span class="o">(</span><span class="s">&#34;Event With No Attributes&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="na">addEvent</span><span class="o">(</span><span class="s">&#34;Event With Some Attributes&#34;</span><span class="o">,</span> <span class="n">eventAttributes</span><span class="o">);</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
          >OpenTelemetry specification for adding events</a
        >
        for more information.
      </p>
      <h3 id="recording-exceptions">Recording exceptions</h3>
      <p>To record exceptions, use the <code>recordException</code> API:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-java">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="na">recordException</span><span class="o">(</span><span class="k">new</span> <span class="n">Exception</span><span class="o">(</span><span class="s">&#34;Error Message&#34;</span><span class="o">));</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="na">recordException</span><span class="o">(</span><span class="k">new</span> <span class="n">Exception</span><span class="o">(</span><span class="s">&#34;Error Message&#34;</span><span class="o">),</span>
</span></span><span class="line"><span class="cl">    <span class="n">Attributes</span><span class="o">.</span><span class="na">builder</span><span class="o">().</span><span class="na">put</span><span class="o">(</span><span class="n">AttributeKey</span><span class="o">.</span><span class="na">stringKey</span><span class="o">(</span><span class="s">&#34;status&#34;</span><span class="o">),</span> <span class="s">&#34;failed&#34;</span><span class="o">).</span><span class="na">build</span><span class="o">());</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a
          href="https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception"
          >OpenTelemetry specification for recording exceptions</a
        >
        for more information.
      </p>
      <h2 id="trace-client-and-agent-configuration">
        Trace client and Agent configuration
      </h2>
      <p>
        Both the tracing client and Datadog Agent offer additional configuration
        options for context propagation. You can also exclude specific resources
        from sending traces to Datadog if you don't want those traces to be
        included in calculated metrics, such as traces related to health checks.
      </p>
      <h3 id="propagating-context-with-headers-extraction-and-injection">
        Propagating context with headers extraction and injection
      </h3>
      <p>
        You can configure the propagation of context for distributed traces by
        injecting and extracting headers. Read
        <a href="/tracing/trace_collection/trace_context_propagation/"
          >Trace Context Propagation</a
        >
        for information.
      </p>
      <h3 id="resource-filtering">Resource filtering</h3>
      <p>
        Traces can be excluded based on their resource name, to remove synthetic
        traffic such as health checks from reporting traces to Datadog. This and
        other security and fine-tuning configurations can be found on the
        <a href="/tracing/security">Security</a> page or in
        <a href="/tracing/guide/ignoring_apm_resources/"
          >Ignoring Unwanted Resources</a
        >.
      </p>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is Python"
      data-if="10"
    >
      <h2 id="setup">Setup</h2>
      <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
      <ol>
        <li>
          <p>
            If you have not yet read the instructions for auto-instrumentation
            and setup, start with the
            <a href="/tracing/setup/python/">Python Setup Instructions</a>.
          </p>
        </li>
        <li>
          <p>
            Set <code>DD_TRACE_OTEL_ENABLED</code> environment variable to
            <code>true</code>.
          </p>
        </li>
      </ol>
      <h3 id="creating-custom-spans">Creating custom spans</h3>
      <p>To create custom spans within an existing trace context:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-python">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">opentelemetry</span> <span class="kn">import</span> <span class="n">trace</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">tracer</span> <span class="o">=</span> <span class="n">trace</span><span class="o">.</span><span class="n">get_tracer</span><span class="p">(</span><span class="vm">__name__</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">do_work</span><span class="p">():</span>
</span></span><span class="line"><span class="cl">    <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">start_as_current_span</span><span class="p">(</span><span class="s2">&#34;operation_name&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">        <span class="c1"># Perform the work that you want to track with the span</span>
</span></span><span class="line"><span class="cl">        <span class="nb">print</span><span class="p">(</span><span class="s2">&#34;Doing work...&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="c1"># When the &#39;with&#39; block ends, the span is automatically closed</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="accessing-active-spans">Accessing active spans</h2>
      <p>
        To access the currently active span, use the
        <code>get_current_span()</code> function:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-python">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">opentelemetry</span> <span class="kn">import</span> <span class="n">trace</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">current_span</span> <span class="o">=</span> <span class="n">trace</span><span class="o">.</span><span class="n">get_current_span</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="c1"># enrich &#39;current_span&#39; with information</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-tags">Adding span tags</h2>
      <p>Add attributes to a span to provide additional context or metadata:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-python">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">opentelemetry</span> <span class="kn">import</span> <span class="n">trace</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">current_span</span> <span class="o">=</span> <span class="n">trace</span><span class="o">.</span><span class="n">get_current_span</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">current_span</span><span class="o">.</span><span class="n">set_attribute</span><span class="p">(</span><span class="s2">&#34;attribute_key1&#34;</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-events">Adding span events</h2>
      <div class="alert alert-info">
        <p>Adding span events requires SDK version 2.9.0 or higher.</p>
      </div>
      <p>
        You can add span events using the <code>add_event</code> API. This
        method requires a <code>name</code> parameter and optionally accepts
        <code>attributes</code> and <code>timestamp</code> parameters.
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-python">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">add_event</span><span class="p">(</span><span class="s2">&#34;Event With No Attributes&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">add_event</span><span class="p">(</span><span class="s2">&#34;Event With Some Attributes&#34;</span><span class="p">,</span> <span class="p">{</span><span class="s2">&#34;int_val&#34;</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span> <span class="s2">&#34;string_val&#34;</span><span class="p">:</span> <span class="s2">&#34;two&#34;</span><span class="p">,</span> <span class="s2">&#34;int_array&#34;</span><span class="p">:</span> <span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">],</span> <span class="s2">&#34;string_array&#34;</span><span class="p">:</span> <span class="p">[</span><span class="s2">&#34;5&#34;</span><span class="p">,</span> <span class="s2">&#34;6&#34;</span><span class="p">],</span> <span class="s2">&#34;bool_array&#34;</span><span class="p">:</span> <span class="p">[</span><span class="kc">True</span><span class="p">,</span> <span class="kc">False</span><span class="p">]})</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
          >OpenTelemetry specification for adding events</a
        >
        for more information.
      </p>
      <h3 id="recording-exceptions">Recording exceptions</h3>
      <p>To record exceptions, use the <code>record_exception</code> API:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-python">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">record_exception</span><span class="p">(</span><span class="ne">Exception</span><span class="p">(</span><span class="s2">&#34;Error Message&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">record_exception</span><span class="p">(</span><span class="ne">Exception</span><span class="p">(</span><span class="s2">&#34;Error Message&#34;</span><span class="p">),</span> <span class="p">{</span><span class="s2">&#34;status&#34;</span><span class="p">:</span> <span class="s2">&#34;failed&#34;</span><span class="p">})</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a
          href="https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception"
          >OpenTelemetry specification for recording exceptions</a
        >
        for more information.
      </p>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is Node.js"
      data-if="11"
    >
      <h2 id="setup">Setup</h2>
      <p>
        To instrument your application, initialize the Datadog tracer
        (<code>dd-trace</code>) and explicitly register its
        <code>TracerProvider</code> with the OpenTelemetry API. This ensures all
        OpenTelemetry calls are routed through Datadog.
      </p>
      <ol>
        <li>
          <p><strong>Add the dependencies</strong>:</p>
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
                ><code><span class="line"><span class="cl">npm install dd-trace @opentelemetry/api
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>
            <strong>Initialize and register the tracer</strong> in your
            application's entry file (for example, <code>index.js</code>),
            before any other imports:
          </p>
        </li>
      </ol>
      <h3 id="complete-example">Complete example</h3>
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
            ><code><span class="line"><span class="cl"><span class="c1">// 1. Import the dd-trace library (do not initialize it yet)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">ddtrace</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;dd-trace&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// 2. Initialize the Datadog tracer. This must be the first operation.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">tracer</span> <span class="o">=</span> <span class="nx">ddtrace</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// service: &#39;my-nodejs-app&#39;
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="c1">// ... other Datadog configurations
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// 3. Create and register Datadog&#39;s TracerProvider.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">provider</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">TracerProvider</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="nx">provider</span><span class="p">.</span><span class="nx">register</span><span class="p">();</span> <span class="c1">// This wires the @opentelemetry/api to Datadog
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl"><span class="c1">// 4. Import and use the OpenTelemetry API
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">otel</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@opentelemetry/api&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">otelTracer</span> <span class="o">=</span> <span class="nx">otel</span><span class="p">.</span><span class="nx">trace</span><span class="p">.</span><span class="nx">getTracer</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="s1">&#39;my-custom-instrumentation&#39;</span> <span class="c1">// A name for your specific instrumentation
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// You can now use &#39;otelTracer&#39; to create spans throughout your application.
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Datadog combines these OpenTelemetry spans with other Datadog APM spans
        into a single trace of your application. It also supports
        <a
          href="/tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation"
          >integration instrumentation</a
        >
        and
        <a href="https://opentelemetry.io/docs/instrumentation/js/automatic/"
          >OpenTelemetry automatic instrumentation</a
        >.
      </p>
      <h2 id="adding-span-tags">Adding span tags</h2>
      <p>Add custom attributes to your spans to provide additional context:</p>
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
            ><code><span class="line"><span class="cl"><span class="kd">function</span> <span class="nx">processData</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span> <span class="nx">param1</span><span class="p">,</span> <span class="nx">param2</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="nx">otelTracer</span><span class="p">.</span><span class="nx">startActiveSpan</span><span class="p">(</span><span class="sb">`processData:</span><span class="si">${</span><span class="nx">i</span><span class="si">}</span><span class="sb">`</span><span class="p">,</span> <span class="p">(</span><span class="nx">span</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kr">const</span> <span class="nx">result</span> <span class="o">=</span> <span class="nx">someOperation</span><span class="p">(</span><span class="nx">param1</span><span class="p">,</span> <span class="nx">param2</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// Add an attribute to the span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">span</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s1">&#39;app.processedData&#39;</span><span class="p">,</span> <span class="nx">result</span><span class="p">.</span><span class="nx">toString</span><span class="p">());</span>
</span></span><span class="line"><span class="cl">    <span class="nx">span</span><span class="p">.</span><span class="nx">end</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">result</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="creating-spans">Creating spans</h2>
      <p>
        To create a new span and properly close it, use the
        <code>startActiveSpan</code> method:
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
            ><code><span class="line"><span class="cl"><span class="kd">function</span> <span class="nx">performTask</span><span class="p">(</span><span class="nx">iterations</span><span class="p">,</span> <span class="nx">param1</span><span class="p">,</span> <span class="nx">param2</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Create a span. A span must be closed.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="k">return</span> <span class="nx">otelTracer</span><span class="p">.</span><span class="nx">startActiveSpan</span><span class="p">(</span><span class="s1">&#39;performTask&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">span</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kr">const</span> <span class="nx">results</span> <span class="o">=</span> <span class="p">[];</span>
</span></span><span class="line"><span class="cl">    <span class="k">for</span> <span class="p">(</span><span class="kd">let</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">iterations</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nx">results</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">processData</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span> <span class="nx">param1</span><span class="p">,</span> <span class="nx">param2</span><span class="p">));</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Be sure to end the span!
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">span</span><span class="p">.</span><span class="nx">end</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">results</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">  <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-events">Adding span events</h2>
      <div class="alert alert-info">
        <p>Adding span events requires SDK version 5.17.0/4.41.0 or higher.</p>
      </div>
      <p>You can add span events using the <code>addEvent</code> API:</p>
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
            ><code><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nx">addEvent</span><span class="p">(</span><span class="s1">&#39;Event With No Attributes&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nx">addEvent</span><span class="p">(</span><span class="s1">&#39;Event With Some Attributes&#39;</span><span class="p">,</span> <span class="p">{</span><span class="s2">&#34;int_val&#34;</span><span class="o">:</span> <span class="mi">1</span><span class="p">,</span> <span class="s2">&#34;string_val&#34;</span><span class="o">:</span> <span class="s2">&#34;two&#34;</span><span class="p">,</span> <span class="s2">&#34;int_array&#34;</span><span class="o">:</span> <span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">],</span> <span class="s2">&#34;string_array&#34;</span><span class="o">:</span> <span class="p">[</span><span class="s2">&#34;5&#34;</span><span class="p">,</span> <span class="s2">&#34;6&#34;</span><span class="p">],</span> <span class="s2">&#34;bool_array&#34;</span><span class="o">:</span> <span class="p">[</span><span class="kc">true</span><span class="p">,</span> <span class="kc">false</span><span class="p">]})</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
          >OpenTelemetry specification for adding events</a
        >
        for more information.
      </p>
      <h3 id="recording-exceptions">Recording exceptions</h3>
      <p>To record exceptions, use the <code>recordException</code> API:</p>
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
            ><code><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nx">recordException</span><span class="p">(</span><span class="k">new</span> <span class="nx">TestError</span><span class="p">())</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a
          href="https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception"
          >OpenTelemetry specification for recording exceptions</a
        >
        for more information.
      </p>
      <h2 id="filtering-requests">Filtering requests</h2>
      <p>
        In some cases, you may want to exclude certain requests from being
        instrumented, such as health checks or synthetic traffic. You can use
        the <code>blocklist</code> or <code>allowlist</code> option on the
        <code>http</code> plugin to ignore these requests.
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
            ><code><span class="line"><span class="cl"><span class="c1">// at the top of the entry point right after tracer.init()
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">tracer</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="s1">&#39;http&#39;</span><span class="p">,</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">blocklist</span><span class="o">:</span> <span class="p">[</span><span class="s1">&#39;/health&#39;</span><span class="p">,</span> <span class="s1">&#39;/ping&#39;</span><span class="p">]</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        You can also split the configuration between client and server if
        needed:
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
            ><code><span class="line"><span class="cl"><span class="nx">tracer</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="s1">&#39;http&#39;</span><span class="p">,</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">server</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">blocklist</span><span class="o">:</span> <span class="p">[</span><span class="s1">&#39;/ping&#39;</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Additionally, you can exclude traces based on their resource name to
        prevent the Agent from sending them to Datadog. For more information on
        security and fine-tuning Agent configurations, read the
        <a href="/tracing/security">Security</a> or
        <a href="/tracing/guide/ignoring_apm_resources/"
          >Ignoring Unwanted Resources</a
        >
        documentation.
      </p>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is Go"
      data-if="12"
    >
      <h2 id="imports">Imports</h2>
      <p>Import the following packages to setup the Datadog trace provider:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-go">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">	<span class="s">&#34;context&#34;</span>
</span></span><span class="line"><span class="cl">	<span class="s">&#34;log&#34;</span>
</span></span><span class="line"><span class="cl">	<span class="s">&#34;os&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">   <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/ext&#34;</span>
</span></span><span class="line"><span class="cl">   <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry&#34;</span>
</span></span><span class="line"><span class="cl">   <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/tracer&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">	<span class="s">&#34;go.opentelemetry.io/otel&#34;</span>
</span></span><span class="line"><span class="cl">	<span class="s">&#34;go.opentelemetry.io/otel/attribute&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="setup">Setup</h2>
      <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
      <ol>
        <li>
          <p>
            Add your desired manual OpenTelemetry instrumentation to your Go
            code following the
            <a href="https://opentelemetry.io/docs/instrumentation/go/manual/"
              >OpenTelemetry Go Manual Instrumentation documentation</a
            >. <strong>Important!</strong> Where those instructions indicate
            that your code should call the OpenTelemetry SDK, call the Datadog
            tracing library instead.
          </p>
        </li>
        <li>
          <p>Install the OpenTelemetry package:</p>
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
                ><code><span class="line"><span class="cl">go get go.opentelemetry.io/otel
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>Install the Datadog OpenTelemetry wrapper package:</p>
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
                ><code><span class="line"><span class="cl">go get github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>Import packages:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-go">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">   <span class="s">&#34;go.opentelemetry.io/otel&#34;</span>
</span></span><span class="line"><span class="cl">   <span class="nx">ddotel</span> <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>Create a TracerProvider and defer the Shutdown method:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-go">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="nx">provider</span> <span class="o">:=</span> <span class="nx">ddotel</span><span class="p">.</span><span class="nf">NewTracerProvider</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="k">defer</span> <span class="nx">provider</span><span class="p">.</span><span class="nf">Shutdown</span><span class="p">()</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>Set the global TracerProvider:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-go">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="nx">otel</span><span class="p">.</span><span class="nf">SetTracerProvider</span><span class="p">(</span><span class="nx">provider</span><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li><p>Run your application.</p></li>
      </ol>
      <h2 id="adding-span-tags">Adding span tags</h2>
      <p>
        Add custom tags to your spans to attach additional metadata and context:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-go">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Start a span.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">ctx</span><span class="p">,</span> <span class="nx">span</span> <span class="o">:=</span> <span class="nx">t</span><span class="p">.</span><span class="nf">Start</span><span class="p">(</span><span class="nx">ctx</span><span class="p">,</span> <span class="s">&#34;read.file&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Set an attribute, or a tag in Datadog terminology, on a span.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span><span class="p">.</span><span class="nf">SetAttributes</span><span class="p">(</span><span class="nx">attribute</span><span class="p">.</span><span class="nf">String</span><span class="p">(</span><span class="nx">ext</span><span class="p">.</span><span class="nx">ResourceName</span><span class="p">,</span> <span class="s">&#34;test.json&#34;</span><span class="p">))</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="adding-tags-globally-to-all-spans">
        Adding tags globally to all spans
      </h3>
      <p>
        Add tags to all spans by configuring the tracer with the
        <code>WithGlobalTag</code> option:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-go">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nx">provider</span> <span class="o">:=</span> <span class="nx">ddotel</span><span class="p">.</span><span class="nf">NewTracerProvider</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">	<span class="nx">ddtracer</span><span class="p">.</span><span class="nf">WithGlobalTag</span><span class="p">(</span><span class="s">&#34;datacenter&#34;</span><span class="p">,</span> <span class="s">&#34;us-1&#34;</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">	<span class="nx">ddtracer</span><span class="p">.</span><span class="nf">WithGlobalTag</span><span class="p">(</span><span class="s">&#34;env&#34;</span><span class="p">,</span> <span class="s">&#34;dev&#34;</span><span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="k">defer</span> <span class="nx">provider</span><span class="p">.</span><span class="nf">Shutdown</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">otel</span><span class="p">.</span><span class="nf">SetTracerProvider</span><span class="p">(</span><span class="nx">provider</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="nx">t</span> <span class="o">:=</span> <span class="nx">otel</span><span class="p">.</span><span class="nf">Tracer</span><span class="p">(</span><span class="s">&#34;&#34;</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="setting-errors-on-a-span">Setting errors on a span</h3>
      <p>To set an error on a span:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-go">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Start a span.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">ctx</span><span class="p">,</span> <span class="nx">span</span> <span class="o">:=</span> <span class="nx">t</span><span class="p">.</span><span class="nf">Start</span><span class="p">(</span><span class="nx">context</span><span class="p">.</span><span class="nf">Background</span><span class="p">(),</span> <span class="s">&#34;spanName&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Set an error on a span with &#39;span.SetAttributes&#39;.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span><span class="p">.</span><span class="nf">SetAttributes</span><span class="p">(</span><span class="nx">attribute</span><span class="p">.</span><span class="nf">String</span><span class="p">(</span><span class="nx">ext</span><span class="p">.</span><span class="nx">ErrorMsg</span><span class="p">,</span> <span class="s">&#34;errorMsg&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Alternatively, set an error via end span options.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nf">EndOptions</span><span class="p">(</span><span class="nx">span</span><span class="p">,</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">WithError</span><span class="p">(</span><span class="nx">errors</span><span class="p">.</span><span class="nf">New</span><span class="p">(</span><span class="s">&#34;myErr&#34;</span><span class="p">)))</span>
</span></span><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nf">End</span><span class="p">()</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-spans">Adding spans</h2>
      <p>
        Unlike other Datadog tracing libraries, when tracing Go applications,
        Datadog recommends that you explicitly manage and pass the Go context of
        your spans.
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-go">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nx">ctx</span><span class="p">,</span> <span class="nx">span</span> <span class="o">:=</span> <span class="nx">t</span><span class="p">.</span><span class="nf">Start</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">	<span class="nx">ddotel</span><span class="p">.</span><span class="nf">ContextWithStartOptions</span><span class="p">(</span><span class="nx">context</span><span class="p">.</span><span class="nf">Background</span><span class="p">(),</span> <span class="nx">ddtracer</span><span class="p">.</span><span class="nf">Measured</span><span class="p">()),</span> <span class="s">&#34;span_name&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nf">End</span><span class="p">()</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-events">Adding span events</h2>
      <div class="alert alert-info">
        <p>Adding span events requires SDK version 1.67.0 or higher.</p>
      </div>
      <p>You can add span events using the <code>AddEvent</code> API:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-go">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nx">ctx</span><span class="p">,</span> <span class="nx">span</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpan</span><span class="p">(</span><span class="nx">context</span><span class="p">.</span><span class="nf">Background</span><span class="p">(),</span> <span class="s">&#34;span_name&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nf">AddEvent</span><span class="p">(</span><span class="s">&#34;Event With No Attributes&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nf">AddEvent</span><span class="p">(</span><span class="s">&#34;Event With Some Attributes&#34;</span><span class="p">,</span> <span class="nx">oteltrace</span><span class="p">.</span><span class="nf">WithAttributes</span><span class="p">(</span><span class="nx">attribute</span><span class="p">.</span><span class="nf">Int</span><span class="p">(</span><span class="s">&#34;int_val&#34;</span><span class="p">,</span> <span class="mi">1</span><span class="p">),</span> <span class="nx">attribute</span><span class="p">.</span><span class="nf">String</span><span class="p">(</span><span class="s">&#34;string_val&#34;</span><span class="p">,</span> <span class="s">&#34;two&#34;</span><span class="p">)))</span>
</span></span><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nf">Finish</span><span class="p">()</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
          >OpenTelemetry specification for adding events</a
        >
        for more information.
      </p>
      <h2 id="trace-client-and-agent-configuration">
        Trace client and Agent configuration
      </h2>
      <h3 id="propagating-context-with-headers-extraction-and-injection">
        Propagating context with headers extraction and injection
      </h3>
      <p>
        You can configure the propagation of context for distributed traces by
        injecting and extracting headers. Read
        <a href="/tracing/trace_collection/trace_context_propagation/"
          >Trace Context Propagation</a
        >
        for information.
      </p>
      <h3 id="resource-filtering">Resource filtering</h3>
      <p>
        Traces can be excluded based on their resource name, to remove synthetic
        traffic such as health checks from reporting traces to Datadog. This and
        other security and fine-tuning configurations can be found on the
        <a href="/tracing/security">Security</a> page.
      </p>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is Ruby"
      data-if="13"
    >
      <h2 id="requirements-and-limitations">Requirements and limitations</h2>
      <ul>
        <li>
          Datadog Ruby tracing library <code>dd-trace-rb</code> version 1.9.0 or
          greater.
        </li>
        <li>Gem version support 1.1.0 or greater.</li>
      </ul>
      <p>
        The following OpenTelemetry features implemented in the Datadog library
        as noted:
      </p>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Support notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OpenTelemetry Context propagation</td>
            <td>
              Datadog and W3C Trace Context header formats are enabled by
              default.
            </td>
          </tr>
          <tr>
            <td>Span processors</td>
            <td>Unsupported</td>
          </tr>
          <tr>
            <td>Span Exporters</td>
            <td>Unsupported</td>
          </tr>
          <tr>
            <td><code>OpenTelemetry.logger</code></td>
            <td>
              <code>OpenTelemetry.logger</code> is set to the same object as
              <code>Datadog.logger</code>. Configure through custom logging.
            </td>
          </tr>
          <tr>
            <td>Trace/span ID generators</td>
            <td>
              ID generation is performed by the tracing library, with support
              for 128-bit trace IDs.
            </td>
          </tr>
        </tbody>
      </table>
      <h2 id="configuring-opentelemetry-to-use-the-datadog-tracing-library">
        Configuring OpenTelemetry to use the Datadog tracing library
      </h2>
      <ol>
        <li>
          <p>
            Add your desired manual OpenTelemetry instrumentation to your Ruby
            code following the
            <a href="https://opentelemetry.io/docs/instrumentation/ruby/manual/"
              >OpenTelemetry Ruby Manual Instrumentation documentation</a
            >. <strong>Important!</strong> Where those instructions indicate
            that your code should call the OpenTelemetry SDK, call the Datadog
            tracing library instead.
          </p>
        </li>
        <li>
          <p>Add the <code>datadog</code> gem to your Gemfile:</p>
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
                ><code><span class="line"><span class="cl"><span class="n">source</span> <span class="s1">&#39;https://rubygems.org&#39;</span>
</span></span><span class="line"><span class="cl"><span class="n">gem</span> <span class="s1">&#39;datadog&#39;</span> <span class="c1"># For dd-trace-rb v1.x, use the `ddtrace` gem.</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>Install the gem by running <code>bundle install</code>.</p>
        </li>
        <li>
          <p>
            Add the following lines to your OpenTelemetry configuration file:
          </p>
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
                ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;opentelemetry/sdk&#39;</span>
</span></span><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;datadog/opentelemetry&#39;</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>Add a configuration block to your application:</p>
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
                ><code><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">.</span><span class="n">configure</span> <span class="k">do</span> <span class="o">|</span><span class="n">c</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="o">...</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
      </ol>
      <p>
        Datadog combines these OpenTelemetry spans with other Datadog APM spans
        into a single trace of your application. It supports
        <a
          href="/tracing/trace_collection/dd_libraries/ruby#integration-instrumentation"
          >integration instrumentation</a
        >
        and
        <a href="https://opentelemetry.io/docs/languages/ruby/libraries/"
          >OpenTelemetry Automatic instrumentation</a
        >
        also.
      </p>
      <h2 id="adding-span-events">Adding span events</h2>
      <div class="alert alert-info">
        <p>Adding span events requires SDK version 2.3.0 or higher.</p>
      </div>
      <p>You can add span events using the <code>add_event</code> API:</p>
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
            ><code><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">add_event</span><span class="p">(</span><span class="s1">&#39;Event With No Attributes&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">add_event</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="s1">&#39;Event With All Attributes&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="ss">attributes</span><span class="p">:</span> <span class="p">{</span> <span class="s1">&#39;int_val&#39;</span> <span class="o">=&gt;</span> <span class="mi">1</span><span class="p">,</span> <span class="s1">&#39;string_val&#39;</span> <span class="o">=&gt;</span> <span class="s1">&#39;two&#39;</span><span class="p">,</span> <span class="s1">&#39;int_array&#39;</span> <span class="o">=&gt;</span> <span class="o">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="o">]</span><span class="p">,</span> <span class="s1">&#39;string_array&#39;</span> <span class="o">=&gt;</span> <span class="o">[</span><span class="s1">&#39;5&#39;</span><span class="p">,</span> <span class="s1">&#39;6&#39;</span><span class="o">]</span><span class="p">,</span> <span class="s1">&#39;bool_array&#39;</span> <span class="o">=&gt;</span> <span class="o">[</span><span class="kp">false</span><span class="p">,</span> <span class="kp">true</span><span class="o">]</span><span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
          >OpenTelemetry specification for adding events</a
        >
        for more information.
      </p>
      <h3 id="recording-exceptions">Recording exceptions</h3>
      <p>To record exceptions, use the <code>record_exception</code> API:</p>
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
            ><code><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">record_exception</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="no">StandardError</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="s1">&#39;Error Message&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">record_exception</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="no">StandardError</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="s1">&#39;Error Message&#39;</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="ss">attributes</span><span class="p">:</span> <span class="p">{</span> <span class="s1">&#39;status&#39;</span> <span class="o">=&gt;</span> <span class="s1">&#39;failed&#39;</span> <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a
          href="https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception"
          >OpenTelemetry specification for recording exceptions</a
        >
        for more information.
      </p>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is .NET"
      data-if="14"
    >
      <h2 id="setup">Setup</h2>
      <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
      <ol>
        <li>
          <p>
            Add your desired manual OpenTelemetry instrumentation to your .NET
            code following the
            <a href="https://opentelemetry.io/docs/instrumentation/net/manual/"
              >OpenTelemetry .NET Manual Instrumentation documentation</a
            >. <strong>Note</strong>: Where those instructions indicate that
            your code should call the OpenTelemetry SDK, call the Datadog
            tracing library instead.
          </p>
        </li>
        <li>
          <p>
            Install the Datadog .NET tracing library and enable the tracer for
            your
            <a
              href="/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started"
              >.NET Framework service</a
            >
            or your
            <a
              href="/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started"
              >.NET Core (and .NET 5+) service</a
            >. You can optionally do this with
            <a href="/tracing/trace_collection/single-step-apm/"
              >Single Step APM Instrumentation</a
            >.
          </p>
        </li>
        <li>
          <p>
            Set <code>DD_TRACE_OTEL_ENABLED</code> environment variable to
            <code>true</code>.
          </p>
        </li>
        <li><p>Run your application.</p></li>
      </ol>
      <p>
        Datadog combines these OpenTelemetry spans with other Datadog APM spans
        into a single trace of your application. It also supports
        <a href="https://opentelemetry.io/docs/instrumentation/net/libraries/"
          >OpenTelemetry instrumentation libraries</a
        >.
      </p>
      <h2 id="creating-custom-spans">Creating custom spans</h2>
      <p>To manually create spans that start a new, independent trace:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-csharp">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">OpenTelemetry.Resources</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">OpenTelemetry.Trace</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Start a new span</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="p">(</span><span class="n">Activity</span><span class="p">?</span> <span class="n">activity</span> <span class="p">=</span> <span class="n">Telemetry</span><span class="p">.</span><span class="n">ActivitySource</span><span class="p">.</span><span class="n">StartActivity</span><span class="p">(</span><span class="s">&#34;&lt;RESOURCE NAME&gt;&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">activity</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;operation.name&#34;</span><span class="p">,</span> <span class="s">&#34;custom-operation&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Do something</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="creating-spans">Creating spans</h2>
      <p>To create custom spans within an existing trace context:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-csharp">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">OpenTelemetry.Resources</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">OpenTelemetry.Trace</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="p">(</span><span class="n">Activity</span><span class="p">?</span> <span class="n">parentScope</span> <span class="p">=</span> <span class="n">Telemetry</span><span class="p">.</span><span class="n">ActivitySource</span><span class="p">.</span><span class="n">StartActivity</span><span class="p">(</span><span class="s">&#34;&lt;RESOURCE NAME&gt;&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">   <span class="n">parentScope</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;operation.name&#34;</span><span class="p">,</span> <span class="s">&#34;manual.sortorders&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">   <span class="k">using</span> <span class="p">(</span><span class="n">Activity</span><span class="p">?</span> <span class="n">childScope</span> <span class="p">=</span> <span class="n">Telemetry</span><span class="p">.</span><span class="n">ActivitySource</span><span class="p">.</span><span class="n">StartActivity</span><span class="p">(</span><span class="s">&#34;&lt;RESOURCE NAME&gt;&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">   <span class="p">{</span>
</span></span><span class="line"><span class="cl">       <span class="n">childScope</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;operation.name&#34;</span><span class="p">,</span> <span class="s">&#34;manual.sortorders.child&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">       <span class="n">SortOrders</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">   <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-tags">Adding span tags</h2>
      <p>Add custom tags to your spans to provide additional context:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-csharp">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">OpenTelemetry.Resources</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">OpenTelemetry.Trace</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">public</span> <span class="k">class</span> <span class="nc">ShoppingCartController</span> <span class="p">:</span> <span class="n">Controller</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="na">    [HttpGet]</span>
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="n">IActionResult</span> <span class="n">Index</span><span class="p">(</span><span class="kt">int</span> <span class="n">customerId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">Activity</span><span class="p">?</span> <span class="n">activity</span> <span class="p">=</span> <span class="n">Telemetry</span><span class="p">.</span><span class="n">ActivitySource</span><span class="p">.</span><span class="n">StartActivity</span><span class="p">(</span><span class="s">&#34;&lt;RESOURCE NAME&gt;&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">      <span class="c1">// Add a tag to the span for use in the Datadog web UI</span>
</span></span><span class="line"><span class="cl">      <span class="n">activity</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;customer.id&#34;</span><span class="p">,</span> <span class="n">customerId</span><span class="p">.</span><span class="n">ToString</span><span class="p">());</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">      <span class="kt">var</span> <span class="n">cart</span> <span class="p">=</span> <span class="n">_shoppingCartRepository</span><span class="p">.</span><span class="n">Get</span><span class="p">(</span><span class="n">customerId</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">      <span class="k">return</span> <span class="n">View</span><span class="p">(</span><span class="n">cart</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="setting-errors-on-spans">Setting errors on spans</h2>
      <p>
        Set error information on a span when an error occurs during its
        execution:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-csharp">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">try</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// do work that can throw an exception</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="k">catch</span><span class="p">(</span><span class="n">Exception</span> <span class="n">e</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">activity</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;error&#34;</span><span class="p">,</span> <span class="m">1</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="n">activity</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;error.message&#34;</span><span class="p">,</span> <span class="n">exception</span><span class="p">.</span><span class="n">Message</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="n">activity</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;error.stack&#34;</span><span class="p">,</span> <span class="n">exception</span><span class="p">.</span><span class="n">ToString</span><span class="p">());</span>
</span></span><span class="line"><span class="cl">    <span class="n">activity</span><span class="p">?.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;error.type&#34;</span><span class="p">,</span> <span class="n">exception</span><span class="p">.</span><span class="n">GetType</span><span class="p">().</span><span class="n">ToString</span><span class="p">());</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-events">Adding span events</h2>
      <div class="alert alert-info">
        <p>Adding span events requires SDK version 2.53.0 or higher.</p>
      </div>
      <p>You can add span events using the <code>AddEvent</code> API:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-csharp">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">eventTags</span> <span class="p">=</span> <span class="k">new</span> <span class="n">ActivityTagsCollection</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;int_val&#34;</span><span class="p">,</span> <span class="m">1</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;string_val&#34;</span><span class="p">,</span> <span class="s">&#34;two&#34;</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;int_array&#34;</span><span class="p">,</span> <span class="k">new</span> <span class="kt">int</span><span class="p">[]</span> <span class="p">{</span> <span class="m">3</span><span class="p">,</span> <span class="m">4</span> <span class="p">}</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;string_array&#34;</span><span class="p">,</span> <span class="k">new</span> <span class="kt">string</span><span class="p">[]</span> <span class="p">{</span> <span class="s">&#34;5&#34;</span><span class="p">,</span> <span class="s">&#34;6&#34;</span> <span class="p">}</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;bool_array&#34;</span><span class="p">,</span> <span class="k">new</span> <span class="kt">bool</span><span class="p">[]</span> <span class="p">{</span> <span class="k">true</span><span class="p">,</span> <span class="k">false</span> <span class="p">}</span> <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">activity</span><span class="p">.</span><span class="n">AddEvent</span><span class="p">(</span><span class="k">new</span> <span class="n">ActivityEvent</span><span class="p">(</span><span class="s">&#34;Event With No Attributes&#34;</span><span class="p">));</span>
</span></span><span class="line"><span class="cl"><span class="n">activity</span><span class="p">.</span><span class="n">AddEvent</span><span class="p">(</span><span class="k">new</span> <span class="n">ActivityEvent</span><span class="p">(</span><span class="s">&#34;Event With Some Attributes&#34;</span><span class="p">,</span> <span class="n">DateTimeOffset</span><span class="p">.</span><span class="n">Now</span><span class="p">,</span> <span class="n">eventTags</span><span class="p">));</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
          >OpenTelemetry specification for adding events</a
        >
        for more information.
      </p>
      <h2 id="propagating-context-with-headers-extraction-and-injection">
        Propagating context with headers extraction and injection
      </h2>
      <p>
        You can configure the propagation of context for distributed traces by
        injecting and extracting headers. Read
        <a href="/tracing/trace_collection/trace_context_propagation/"
          >Trace Context Propagation</a
        >
        for information.
      </p>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is PHP"
      data-if="15"
    >
      <h2 id="setup">Setup</h2>
      <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
      <ol>
        <li>
          <p>
            Install
            <a
              href="https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup"
              >OpenTelemetry API packages</a
            >:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-php">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="nx">composer</span> <span class="k">require</span> <span class="nx">open</span><span class="o">-</span><span class="nx">telemetry</span><span class="o">/</span><span class="nx">sdk</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>
            Add your desired manual OpenTelemetry instrumentation to your PHP
            code following the
            <a href="https://opentelemetry.io/docs/instrumentation/php/manual/"
              >OpenTelemetry PHP Manual Instrumentation documentation</a
            >.
          </p>
        </li>
        <li>
          <p>
            Install the
            <a href="/tracing/trace_collection/dd_libraries/php#getting-started"
              >Datadog PHP tracing library</a
            >.
          </p>
        </li>
        <li>
          <p>Set <code>DD_TRACE_OTEL_ENABLED</code> to <code>true</code>.</p>
        </li>
      </ol>
      <p>
        Datadog combines these OpenTelemetry spans with other Datadog APM spans
        into a single trace of your application.
      </p>
      <h2 id="adding-span-tags">Adding span tags</h2>
      <p>
        You can add attributes at the exact moment as you are starting the span:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nv">$span</span> <span class="o">=</span> <span class="nv">$tracer</span><span class="o">-&gt;</span><span class="na">spanBuilder</span><span class="p">(</span><span class="s1">&#39;mySpan&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="o">-&gt;</span><span class="na">setAttribute</span><span class="p">(</span><span class="s1">&#39;key&#39;</span><span class="p">,</span> <span class="s1">&#39;value&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="o">-&gt;</span><span class="na">startSpan</span><span class="p">();</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>Or while the span is active:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nv">$activeSpan</span> <span class="o">=</span> <span class="nx">OpenTelemetry\API\Trace\Span</span><span class="o">::</span><span class="na">getCurrent</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="nv">$activeSpan</span><span class="o">-&gt;</span><span class="na">setAttribute</span><span class="p">(</span><span class="s1">&#39;key&#39;</span><span class="p">,</span> <span class="s1">&#39;value&#39;</span><span class="p">);</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="setting-errors-on-a-span">Setting errors on a span</h2>
      <p>
        Exception information is captured and attached to a span if one is
        active when the exception is raised:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Create a span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nv">$span</span> <span class="o">=</span> <span class="nv">$tracer</span><span class="o">-&gt;</span><span class="na">spanBuilder</span><span class="p">(</span><span class="s1">&#39;mySpan&#39;</span><span class="p">)</span><span class="o">-&gt;</span><span class="na">startSpan</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">throw</span> <span class="k">new</span> <span class="nx">\Exception</span><span class="p">(</span><span class="s1">&#39;Oops!&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// &#39;mySpan&#39; will be flagged as erroneous and have
</span></span></span><span class="line"><span class="cl"><span class="c1">// the stack trace and exception message attached as tags
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <p>Flagging a trace as erroneous can also be done manually:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">use</span> <span class="nx">OpenTelemetry\API\Trace\Span</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">use</span> <span class="nx">OpenTelemetry\Context\Context</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">try</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">throw</span> <span class="k">new</span> <span class="nx">\Exception</span><span class="p">(</span><span class="s1">&#39;Oops!&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nx">\Exception</span> <span class="nv">$e</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nv">$rootSpan</span> <span class="o">=</span> <span class="nx">Span</span><span class="o">::</span><span class="na">fromContext</span><span class="p">(</span><span class="nx">Context</span><span class="o">::</span><span class="na">getRoot</span><span class="p">());</span>
</span></span><span class="line"><span class="cl">    <span class="nv">$rootSpan</span><span class="o">-&gt;</span><span class="na">recordException</span><span class="p">(</span><span class="nv">$e</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-spans">Adding spans</h2>
      <p>To add a span:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Get a tracer or use an existing one
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nv">$tracerProvider</span> <span class="o">=</span> <span class="nx">\OpenTelemetry\API\Globals</span><span class="o">::</span><span class="na">tracerProvider</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="nv">$tracer</span> <span class="o">=</span> <span class="nv">$tracerProvider</span><span class="o">-&gt;</span><span class="na">getTracer</span><span class="p">(</span><span class="s1">&#39;datadog&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Create a span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nv">$span</span> <span class="o">=</span> <span class="nv">$tracer</span><span class="o">-&gt;</span><span class="na">spanBuilder</span><span class="p">(</span><span class="s1">&#39;mySpan&#39;</span><span class="p">)</span><span class="o">-&gt;</span><span class="na">startSpan</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// ... do stuff
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl"><span class="c1">// Close the span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nv">$span</span><span class="o">-&gt;</span><span class="na">end</span><span class="p">();</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="adding-span-events">Adding span events</h2>
      <div class="alert alert-info">
        <p>Adding span events requires SDK version 1.3.0 or higher.</p>
      </div>
      <p>You can add span events using the <code>addEvent</code> API:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nv">$span</span><span class="o">-&gt;</span><span class="na">addEvent</span><span class="p">(</span><span class="s2">&#34;Event With No Attributes&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="nv">$span</span><span class="o">-&gt;</span><span class="na">addEvent</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s2">&#34;Event With Some Attributes&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">[</span>
</span></span><span class="line"><span class="cl">        <span class="s1">&#39;int_val&#39;</span> <span class="o">=&gt;</span> <span class="mi">1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="s1">&#39;string_val&#39;</span> <span class="o">=&gt;</span> <span class="s2">&#34;two&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="s1">&#39;int_array&#39;</span> <span class="o">=&gt;</span> <span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">],</span>
</span></span><span class="line"><span class="cl">        <span class="s1">&#39;string_array&#39;</span> <span class="o">=&gt;</span> <span class="p">[</span><span class="s2">&#34;5&#34;</span><span class="p">,</span> <span class="s2">&#34;6&#34;</span><span class="p">],</span>
</span></span><span class="line"><span class="cl">        <span class="s1">&#39;bool_array&#39;</span> <span class="o">=&gt;</span> <span class="p">[</span><span class="k">true</span><span class="p">,</span> <span class="k">false</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">]</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
          >OpenTelemetry specification for adding events</a
        >
        for more information.
      </p>
      <h3 id="recording-exceptions">Recording exceptions</h3>
      <p>To record exceptions, use the <code>recordException</code> API:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nv">$span</span><span class="o">-&gt;</span><span class="na">recordException</span><span class="p">(</span><span class="k">new</span> <span class="nx">\Exception</span><span class="p">(</span><span class="s2">&#34;Error Message&#34;</span><span class="p">));</span>
</span></span><span class="line"><span class="cl"><span class="nv">$span</span><span class="o">-&gt;</span><span class="na">recordException</span><span class="p">(</span><span class="k">new</span> <span class="nx">\Exception</span><span class="p">(</span><span class="s2">&#34;Error Message&#34;</span><span class="p">),</span> <span class="p">[</span> <span class="s2">&#34;status&#34;</span> <span class="o">=&gt;</span> <span class="s2">&#34;failed&#34;</span> <span class="p">]);</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Read the
        <a
          href="https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception"
          >OpenTelemetry specification for recording exceptions</a
        >
        for more information.
      </p>
      <h2 id="accessing-active-spans">Accessing active spans</h2>
      <p>To access the currently active span:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-php">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="nv">$span</span> <span class="o">=</span> <span class="nx">OpenTelemetry\API\Trace\Span</span><span class="o">::</span><span class="na">getCurrent</span><span class="p">();</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is Rust"
      data-if="16"
    >
      <div class="alert alert-info">
        <p>The Datadog Rust SDK is in Preview.</p>
      </div>
      <p>
        Datadog provides support for custom instrumentation in Rust applications
        through the
        <a href="https://crates.io/crates/datadog-opentelemetry"
          ><code>datadog-opentelemetry</code> crate</a
        >. This library is built on the OpenTelemetry (OTel) API and SDK,
        providing a tracer that includes Datadog-specific features and an
        exporter.
      </p>
      <p>
        Because this library is built on OpenTelemetry, you use the standard
        OpenTelemetry API to create traces and spans.
      </p>
      <h2 id="setup">Setup</h2>
      <p>
        To configure your Rust application to send OpenTelemetry traces to
        Datadog:
      </p>
      <h3 id="1-add-dependencies">1. Add dependencies</h3>
      <p>
        Add <code>datadog-opentelemetry</code> and the core
        <code>opentelemetry</code> crate to your <code>Cargo.toml</code>:
      </p>
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
            ><code><span class="line"><span class="cl">cargo add datadog-opentelemetry opentelemetry
</span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="2-initialize-the-tracer">2. Initialize the Tracer</h3>
      <p>
        In your application's main function, initialize the Datadog tracer
        provider:
      </p>
      <div class="alert alert-info">
        <p>
          You must shut down the provider before your application exits to
          ensure all pending traces are flushed.
        </p>
      </div>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-rust">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">use</span><span class="w"> </span><span class="n">datadog_opentelemetry</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="p">{</span><span class="n">global</span><span class="p">,</span><span class="w"> </span><span class="n">trace</span>::<span class="n">Tracer</span><span class="p">};</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">use</span><span class="w"> </span><span class="n">std</span>::<span class="n">time</span>::<span class="n">Duration</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">fn</span> <span class="nf">main</span><span class="p">()</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c1">// This picks up env var configuration (like DD_SERVICE)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">    </span><span class="c1">// and initializes the global tracer provider
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">    </span><span class="kd">let</span><span class="w"> </span><span class="n">tracer_provider</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">datadog_opentelemetry</span>::<span class="n">tracing</span><span class="p">()</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="p">.</span><span class="n">init</span><span class="p">();</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c1">// --- Your application code starts here ---
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">    </span><span class="kd">let</span><span class="w"> </span><span class="n">tracer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">global</span>::<span class="n">tracer</span><span class="p">(</span><span class="s">&#34;my-component&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">tracer</span><span class="p">.</span><span class="n">in_span</span><span class="p">(</span><span class="s">&#34;my-operation&#34;</span><span class="p">,</span><span class="w"> </span><span class="o">|</span><span class="n">_cx</span><span class="o">|</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="c1">// ... do work ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">    </span><span class="p">});</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="fm">println!</span><span class="p">(</span><span class="s">&#34;Doing work...&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c1">// --- Your application code ends here ---
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="c1">// Shut down the tracer provider to flush remaining spans
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">    </span><span class="n">tracer_provider</span><span class="p">.</span><span class="n">shutdown_with_timeout</span><span class="p">(</span><span class="n">Duration</span>::<span class="n">from_secs</span><span class="p">(</span><span class="mi">5</span><span class="p">)).</span><span class="n">expect</span><span class="p">(</span><span class="s">&#34;tracer shutdown error&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">}</span><span class="w">
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="3-ensure-agent-is-running">3. Ensure Agent is running</h3>
      <p>
        The Datadog exporter sends traces to the Datadog Agent, which must be
        running and accessible.
      </p>
      <h2 id="configuration">Configuration</h2>
      <p>
        The Datadog Rust SDK is configured using environment variables. For a
        complete list of options, see the
        <a href="/tracing/trace_collection/library_config/rust"
          >Configuration documentation</a
        >.
      </p>
      <h2 id="examples">Examples</h2>
      <h3 id="get-a-tracer">Get a Tracer</h3>
      <p>Get an instance of a <code>Tracer</code> from the global provider:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-rust">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">global</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="kd">let</span><span class="w"> </span><span class="n">tracer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">global</span>::<span class="n">tracer</span><span class="p">(</span><span class="s">&#34;my-component&#34;</span><span class="p">);</span><span class="w">
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="create-a-span">Create a span</h3>
      <p>
        Use <code>tracer.in_span</code> to create a new span. The span is
        automatically ended when the closure finishes:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-rust">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="p">{</span><span class="n">global</span><span class="p">,</span><span class="w"> </span><span class="n">trace</span>::<span class="n">Tracer</span><span class="p">};</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">fn</span> <span class="nf">do_work</span><span class="p">()</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="kd">let</span><span class="w"> </span><span class="n">tracer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">global</span>::<span class="n">tracer</span><span class="p">(</span><span class="s">&#34;my-component&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">tracer</span><span class="p">.</span><span class="n">in_span</span><span class="p">(</span><span class="s">&#34;operation_name&#34;</span><span class="p">,</span><span class="w"> </span><span class="o">|</span><span class="n">_cx</span><span class="o">|</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="c1">// The span is active within this closure
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">        </span><span class="fm">println!</span><span class="p">(</span><span class="s">&#34;Doing work...&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="p">});</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">}</span><span class="w">
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="create-a-child-span">Create a child span</h3>
      <p>To create a child span, nest <code>in_span</code> calls:</p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-rust">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="p">{</span><span class="n">global</span><span class="p">,</span><span class="w"> </span><span class="n">trace</span>::<span class="n">Tracer</span><span class="p">};</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">fn</span> <span class="nf">parent_operation</span><span class="p">()</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="kd">let</span><span class="w"> </span><span class="n">tracer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">global</span>::<span class="n">tracer</span><span class="p">(</span><span class="s">&#34;my-component&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">tracer</span><span class="p">.</span><span class="n">in_span</span><span class="p">(</span><span class="s">&#34;parent_operation&#34;</span><span class="p">,</span><span class="w"> </span><span class="o">|</span><span class="n">_cx</span><span class="o">|</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="n">tracer</span><span class="p">.</span><span class="n">in_span</span><span class="p">(</span><span class="s">&#34;child_operation&#34;</span><span class="p">,</span><span class="w"> </span><span class="o">|</span><span class="n">_cx</span><span class="o">|</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">            </span><span class="c1">// This span is automatically parented to &#34;parent_operation&#34;
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="w">            </span><span class="fm">println!</span><span class="p">(</span><span class="s">&#34;Doing child work...&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="p">});</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="fm">println!</span><span class="p">(</span><span class="s">&#34;Doing parent work...&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="p">});</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">}</span><span class="w">
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="add-span-tags">Add span tags</h3>
      <p>
        Add attributes to a span using the <code>set_attribute</code> method:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-rust">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">trace</span>::<span class="p">{</span><span class="n">Tracer</span><span class="p">,</span><span class="w"> </span><span class="n">TraceContextExt</span><span class="p">};</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">KeyValue</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">fn</span> <span class="nf">add_tags_to_span</span><span class="p">()</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="kd">let</span><span class="w"> </span><span class="n">tracer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">global</span>::<span class="n">tracer</span><span class="p">(</span><span class="s">&#34;my-component&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">tracer</span><span class="p">.</span><span class="n">in_span</span><span class="p">(</span><span class="s">&#34;operation.with.tags&#34;</span><span class="p">,</span><span class="w"> </span><span class="o">|</span><span class="n">cx</span><span class="o">|</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="kd">let</span><span class="w"> </span><span class="n">span</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">cx</span><span class="p">.</span><span class="n">span</span><span class="p">();</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="n">span</span><span class="p">.</span><span class="n">set_attribute</span><span class="p">(</span><span class="n">KeyValue</span>::<span class="n">new</span><span class="p">(</span><span class="s">&#34;customer.id&#34;</span><span class="p">,</span><span class="w"> </span><span class="s">&#34;12345&#34;</span><span class="p">));</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="n">span</span><span class="p">.</span><span class="n">set_attribute</span><span class="p">(</span><span class="n">KeyValue</span>::<span class="n">new</span><span class="p">(</span><span class="s">&#34;http.method&#34;</span><span class="p">,</span><span class="w"> </span><span class="s">&#34;GET&#34;</span><span class="p">));</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="p">});</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">}</span><span class="w">
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <h3 id="add-span-events">Add span events</h3>
      <p>
        Add time-stamped log messages to a span using the
        <code>add_event</code> method:
      </p>
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-rust">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">trace</span>::<span class="p">{</span><span class="n">Tracer</span><span class="p">,</span><span class="w"> </span><span class="n">TraceContextExt</span><span class="p">};</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">KeyValue</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="k">fn</span> <span class="nf">add_events_to_span</span><span class="p">()</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="kd">let</span><span class="w"> </span><span class="n">tracer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">global</span>::<span class="n">tracer</span><span class="p">(</span><span class="s">&#34;my-component&#34;</span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="n">tracer</span><span class="p">.</span><span class="n">in_span</span><span class="p">(</span><span class="s">&#34;operation.with.events&#34;</span><span class="p">,</span><span class="w"> </span><span class="o">|</span><span class="n">cx</span><span class="o">|</span><span class="w"> </span><span class="p">{</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="kd">let</span><span class="w"> </span><span class="n">span</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">cx</span><span class="p">.</span><span class="n">span</span><span class="p">();</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="n">span</span><span class="p">.</span><span class="n">add_event</span><span class="p">(</span><span class="s">&#34;Data received&#34;</span><span class="p">,</span><span class="w"> </span><span class="fm">vec!</span><span class="p">[]);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="n">span</span><span class="p">.</span><span class="n">add_event</span><span class="p">(</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">            </span><span class="s">&#34;Processing data&#34;</span><span class="p">,</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">            </span><span class="fm">vec!</span><span class="p">[</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">                </span><span class="n">KeyValue</span>::<span class="n">new</span><span class="p">(</span><span class="s">&#34;data.size_bytes&#34;</span><span class="p">,</span><span class="w"> </span><span class="mi">1024</span><span class="p">),</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">                </span><span class="n">KeyValue</span>::<span class="n">new</span><span class="p">(</span><span class="s">&#34;data.format&#34;</span><span class="p">,</span><span class="w"> </span><span class="s">&#34;json&#34;</span><span class="p">),</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">            </span><span class="p">],</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">        </span><span class="p">);</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="p">});</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="p">}</span><span class="w">
</span></span></span></code></pre>
          </div>
        </div>
      </div>
      <h2 id="context-propagation">Context propagation</h2>
      <p>
        Because Rust does not have automatic instrumentation, you must manually
        propagate the trace context when making or receiving remote calls to
        connect traces across services.
      </p>
      <p>
        For more information, see
        <a href="/tracing/trace_collection/trace_context_propagation/?tab=rust"
          >Trace Context Propagation</a
        >.
      </p>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Signal is Metrics"
    data-if="56"
  >
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="((Language is .NET) or (Language is Node.js)) or ((Language is Python) or (Language is Ruby))"
      data-if="55"
    >
      <h2 id="overview">Overview</h2>
      <p>
        Use the OpenTelemetry Metrics API with Datadog SDKs to send custom
        application metrics. This is an alternative to
        <a href="/developers/dogstatsd/">DogStatsD</a>.
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="(Language is .NET) or (Language is Node.js)"
        data-if="20"
      >
        <p>
          The Datadog SDK provides a native implementation of the OpenTelemetry
          API. This means you can write code against the standard OTel
          interfaces without needing the official OpenTelemetry SDK.
        </p>
        <div class="alert alert-info">
          <p>
            You should not install the official OpenTelemetry SDK or any OTLP
            Exporter packages. The Datadog SDK provides this functionality.
            Installing both can lead to runtime conflicts and duplicate data.
          </p>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="(Language is Python) or (Language is Ruby)"
        data-if="23"
      >
        <p>
          This approach works with the existing OpenTelemetry SDK. When you
          enable this feature, the Datadog SDK detects the OTel SDK and
          configures its OTLP exporter to send metrics to the Datadog Agent.
        </p>
      </div>
      <h2 id="prerequisites">Prerequisites</h2>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="24"
      >
        <ul>
          <li>
            <strong>.NET Runtime</strong>: Requires .NET 6+ (or
            <code>System.Diagnostics.DiagnosticSource</code> v6.0.0+). See
            <a href="#net-version-and-instrument-support"
              >Version and instrument support</a
            >
            for a list of supported instruments by version.
          </li>
          <li>
            <strong>Datadog SDK</strong>: dd-trace-dotnet version 3.30.0 or
            later.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="25"
      >
        <ul>
          <li>
            <strong>Datadog SDK</strong>: <code>dd-trace-js</code> version
            5.81.0 or later.
          </li>
          <li>
            <strong>OpenTelemetry API</strong>:
            <code>@opentelemetry/api</code> version 1.0.0 to 1.10.0. (The
            Datadog SDK provides the implementation for this API).
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="26"
      >
        <ul>
          <li>
            <strong>Datadog SDK</strong>: dd-trace-py version 3.18.0 or later.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="27"
      >
        <div class="alert alert-info">
          <p>
            The OpenTelemetry Metrics SDK for Ruby is currently in
            <a
              href="https://github.com/open-telemetry/opentelemetry-ruby/tree/main/metrics_sdk"
              >alpha implementation</a
            >. Report issues with the SDK at
            <a
              href="https://github.com/open-telemetry/opentelemetry-ruby/issues"
              >opentelemetry-ruby/issues</a
            >.
          </p>
        </div>
        <ul>
          <li>
            <strong>Datadog SDK</strong>: <code>datadog</code> gem version
            2.23.0 or later.
          </li>
        </ul>
      </div>
      <ul>
        <li>
          <strong>An OTLP-compatible destination</strong>: You must have a
          destination (Agent or Collector) listening on ports 4317 (gRPC) or
          4318 (HTTP) to receive OTel metrics.
        </li>
        <li>
          <strong>DogStatsD (Runtime Metrics)</strong>: If you also use Datadog
          <a href="/tracing/metrics/runtime_metrics/">Runtime Metrics</a>,
          ensure the Datadog Agent is listening for DogStatsD traffic on port
          8125 (UDP). OTel configuration does not route Runtime Metrics through
          OTLP.
        </li>
      </ul>
      <h2 id="setup">Setup</h2>
      <p>
        Follow these steps to enable OTel Metrics API support in your
        application.
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="28"
      >
        <ol>
          <li>
            Install the Datadog SDK. Follow the installation steps for your
            runtime:
            <ul>
              <li>
                <a
                  href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/#install-the-tracer"
                  >.NET Framework</a
                >
              </li>
              <li>
                <a
                  href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core#install-the-tracer"
                  >.NET Core</a
                >
              </li>
            </ul>
          </li>
          <li>
            Enable OTel metrics by setting the following environment variable:
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
                  ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DD_METRICS_OTEL_ENABLED</span><span class="o">=</span><span class="nb">true</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="29"
      >
        <ol>
          <li>
            Install the Datadog SDK:
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
                  ><code><span class="line"><span class="cl">npm install dd-trace
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Enable OTel metrics by setting the following environment variable:
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
                  ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DD_METRICS_OTEL_ENABLED</span><span class="o">=</span><span class="nb">true</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Instrument your application:
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="c1">// On application start
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">require</span><span class="p">(</span><span class="s1">&#39;dd-trace&#39;</span><span class="p">).</span><span class="nx">init</span><span class="p">();</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="30"
      >
        <ol>
          <li>
            Install the Datadog SDK:
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
                  ><code><span class="line"><span class="cl">pip install ddtrace
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Install the OTel SDK and Exporter:
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
                  ><code><span class="line"><span class="cl">pip install opentelemetry-sdk opentelemetry-exporter-otlp
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Enable OTel metrics by setting the following environment variable:
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
                  ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DD_METRICS_OTEL_ENABLED</span><span class="o">=</span><span class="nb">true</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Instrument your application:
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-py">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="n">ddtrace</span><span class="o">-</span><span class="n">run</span> <span class="n">python</span> <span class="n">my_app</span><span class="o">.</span><span class="n">py</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="31"
      >
        <ol>
          <li>
            Add the Datadog SDK and OTel gems:
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-ruby">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="c1"># Add to your Gemfile</span>
</span></span><span class="line"><span class="cl"><span class="n">gem</span> <span class="s1">&#39;datadog&#39;</span><span class="p">,</span> <span class="s1">&#39;~&gt; 2.23.0&#39;</span>
</span></span><span class="line"><span class="cl"><span class="n">gem</span> <span class="s1">&#39;opentelemetry-metrics-sdk&#39;</span><span class="p">,</span> <span class="s1">&#39;~&gt; 0.8&#39;</span>
</span></span><span class="line"><span class="cl"><span class="n">gem</span> <span class="s1">&#39;opentelemetry-exporter-otlp-metrics&#39;</span><span class="p">,</span> <span class="s1">&#39;~&gt; 0.4&#39;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Install dependencies:
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
                  ><code><span class="line"><span class="cl">bundle install
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Enable OTel metrics by setting the following environment variable:
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
                  ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DD_METRICS_OTEL_ENABLED</span><span class="o">=</span><span class="nb">true</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Configure your application:
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-ruby">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;opentelemetry/sdk&#39;</span>
</span></span><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;datadog/opentelemetry&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">.</span><span class="n">configure</span> <span class="k">do</span> <span class="o">|</span><span class="n">c</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># Configure Datadog settings here</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Call after Datadog.configure to initialize metrics</span>
</span></span><span class="line"><span class="cl"><span class="no">OpenTelemetry</span><span class="o">::</span><span class="no">SDK</span><span class="o">.</span><span class="n">configure</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <h2 id="examples">Examples</h2>
      <p>
        You can use the standard OpenTelemetry API packages to create custom
        metrics.
      </p>
      <h3 id="create-a-counter">Create a counter</h3>
      <p>
        This example uses the OTel Metrics API to create a counter that
        increments every time an item is processed:
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="32"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-csharp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">System.Diagnostics.Metrics</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Define a meter</span>
</span></span><span class="line"><span class="cl"><span class="n">Meter</span> <span class="n">meter</span> <span class="p">=</span> <span class="k">new</span><span class="p">(</span><span class="s">&#34;MyService&#34;</span><span class="p">,</span> <span class="s">&#34;1.0.0&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Create a counter instrument</span>
</span></span><span class="line"><span class="cl"><span class="n">Counter</span><span class="p">&lt;</span><span class="kt">long</span><span class="p">&gt;</span> <span class="n">requestsCounter</span> <span class="p">=</span> <span class="n">meter</span><span class="p">.</span><span class="n">CreateCounter</span><span class="p">&lt;</span><span class="kt">long</span><span class="p">&gt;(</span><span class="s">&#34;http.requests_total&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Perform work</span>
</span></span><span class="line"><span class="cl"><span class="c1">// ...</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Record measurements</span>
</span></span><span class="line"><span class="cl"><span class="n">requestsCounter</span><span class="p">.</span><span class="n">Add</span><span class="p">(</span><span class="m">1</span><span class="p">,</span> <span class="k">new</span><span class="p">(</span><span class="s">&#34;method&#34;</span><span class="p">,</span> <span class="s">&#34;GET&#34;</span><span class="p">),</span> <span class="k">new</span><span class="p">(</span><span class="s">&#34;status_code&#34;</span><span class="p">,</span> <span class="s">&#34;200&#34;</span><span class="p">));</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="33"
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
              ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="p">{</span> <span class="nx">metrics</span> <span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@opentelemetry/api&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">meter</span> <span class="o">=</span> <span class="nx">metrics</span><span class="p">.</span><span class="nx">getMeter</span><span class="p">(</span><span class="s1">&#39;my-service&#39;</span><span class="p">,</span> <span class="s1">&#39;1.0.0&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Counter - monotonically increasing values
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">requestCounter</span> <span class="o">=</span> <span class="nx">meter</span><span class="p">.</span><span class="nx">createCounter</span><span class="p">(</span><span class="s1">&#39;http.requests&#39;</span><span class="p">,</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">description</span><span class="o">:</span> <span class="s1">&#39;Total HTTP requests&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">unit</span><span class="o">:</span> <span class="s1">&#39;requests&#39;</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="nx">requestCounter</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="p">{</span> <span class="nx">method</span><span class="o">:</span> <span class="s1">&#39;GET&#39;</span><span class="p">,</span> <span class="nx">status</span><span class="o">:</span> <span class="mi">200</span> <span class="p">});</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="34"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-python">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">os</span>
</span></span><span class="line"><span class="cl"><span class="n">os</span><span class="o">.</span><span class="n">environ</span><span class="p">[</span><span class="s2">&#34;DD_METRICS_OTEL_ENABLED&#34;</span><span class="p">]</span> <span class="o">=</span> <span class="s2">&#34;true&#34;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">ddtrace.auto</span> <span class="c1"># This must be imported before opentelemetry</span>
</span></span><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">opentelemetry</span> <span class="kn">import</span> <span class="n">metrics</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># ddtrace automatically configures the MeterProvider</span>
</span></span><span class="line"><span class="cl"><span class="n">meter</span> <span class="o">=</span> <span class="n">metrics</span><span class="o">.</span><span class="n">get_meter</span><span class="p">(</span><span class="vm">__name__</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Counter - monotonically increasing values</span>
</span></span><span class="line"><span class="cl"><span class="n">counter</span> <span class="o">=</span> <span class="n">meter</span><span class="o">.</span><span class="n">create_counter</span><span class="p">(</span><span class="s2">&#34;http.requests_total&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">counter</span><span class="o">.</span><span class="n">add</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="p">{</span><span class="s2">&#34;method&#34;</span><span class="p">:</span> <span class="s2">&#34;GET&#34;</span><span class="p">,</span> <span class="s2">&#34;status_code&#34;</span><span class="p">:</span> <span class="s2">&#34;200&#34;</span><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="35"
      >
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
              ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;opentelemetry/api&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># dd-trace-rb automatically configures the MeterProvider</span>
</span></span><span class="line"><span class="cl"><span class="n">meter</span> <span class="o">=</span> <span class="no">OpenTelemetry</span><span class="o">.</span><span class="n">meter_provider</span><span class="o">.</span><span class="n">meter</span><span class="p">(</span><span class="s1">&#39;my-service&#39;</span><span class="p">,</span> <span class="s1">&#39;1.0.0&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Counter - monotonically increasing values</span>
</span></span><span class="line"><span class="cl"><span class="n">counter</span> <span class="o">=</span> <span class="n">meter</span><span class="o">.</span><span class="n">create_counter</span><span class="p">(</span><span class="s1">&#39;http.requests_total&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">counter</span><span class="o">.</span><span class="n">add</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="ss">attributes</span><span class="p">:</span> <span class="p">{</span> <span class="s1">&#39;method&#39;</span> <span class="o">=&gt;</span> <span class="s1">&#39;GET&#39;</span><span class="p">,</span> <span class="s1">&#39;status_code&#39;</span> <span class="o">=&gt;</span> <span class="s1">&#39;200&#39;</span> <span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <h3 id="create-a-histogram">Create a histogram</h3>
      <p>
        This example uses the OTel Metrics API to create a histogram to track
        request durations:
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="36"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-csharp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">System.Diagnostics.Metrics</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Define a meter</span>
</span></span><span class="line"><span class="cl"><span class="n">Meter</span> <span class="n">meter</span> <span class="p">=</span> <span class="k">new</span><span class="p">(</span><span class="s">&#34;MyService&#34;</span><span class="p">,</span> <span class="s">&#34;1.0.0&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Create a histogram instrument</span>
</span></span><span class="line"><span class="cl"><span class="n">Histogram</span><span class="p">&lt;</span><span class="kt">double</span><span class="p">&gt;</span> <span class="n">responseTimeHistogram</span> <span class="p">=</span> <span class="n">meter</span><span class="p">.</span><span class="n">CreateHistogram</span><span class="p">&lt;</span><span class="kt">double</span><span class="p">&gt;(</span><span class="s">&#34;http.response.time&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Perform work</span>
</span></span><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">watch</span> <span class="p">=</span> <span class="n">System</span><span class="p">.</span><span class="n">Diagnostics</span><span class="p">.</span><span class="n">Stopwatch</span><span class="p">.</span><span class="n">StartNew</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="k">await</span> <span class="n">Task</span><span class="p">.</span><span class="n">Delay</span><span class="p">(</span><span class="m">1_000</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="n">watch</span><span class="p">.</span><span class="n">Stop</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Record measurements</span>
</span></span><span class="line"><span class="cl"><span class="n">responseTimeHistogram</span><span class="p">.</span><span class="n">Record</span><span class="p">(</span><span class="n">watch</span><span class="p">.</span><span class="n">ElapsedMilliseconds</span><span class="p">,</span> <span class="k">new</span><span class="p">(</span><span class="s">&#34;method&#34;</span><span class="p">,</span> <span class="s">&#34;GET&#34;</span><span class="p">),</span> <span class="k">new</span><span class="p">(</span><span class="s">&#34;status_code&#34;</span><span class="p">,</span> <span class="s">&#34;200&#34;</span><span class="p">));</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="37"
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
              ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="p">{</span> <span class="nx">metrics</span> <span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@opentelemetry/api&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">meter</span> <span class="o">=</span> <span class="nx">metrics</span><span class="p">.</span><span class="nx">getMeter</span><span class="p">(</span><span class="s1">&#39;my-service&#39;</span><span class="p">,</span> <span class="s1">&#39;1.0.0&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Histogram - distribution of values
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">durationHistogram</span> <span class="o">=</span> <span class="nx">meter</span><span class="p">.</span><span class="nx">createHistogram</span><span class="p">(</span><span class="s1">&#39;http.duration&#39;</span><span class="p">,</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">description</span><span class="o">:</span> <span class="s1">&#39;HTTP request duration&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">unit</span><span class="o">:</span> <span class="s1">&#39;ms&#39;</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="nx">durationHistogram</span><span class="p">.</span><span class="nx">record</span><span class="p">(</span><span class="mi">145</span><span class="p">,</span> <span class="p">{</span> <span class="nx">route</span><span class="o">:</span> <span class="s1">&#39;/api/users&#39;</span> <span class="p">});</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="38"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-python">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">os</span>
</span></span><span class="line"><span class="cl"><span class="n">os</span><span class="o">.</span><span class="n">environ</span><span class="p">[</span><span class="s2">&#34;DD_METRICS_OTEL_ENABLED&#34;</span><span class="p">]</span> <span class="o">=</span> <span class="s2">&#34;true&#34;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">ddtrace.auto</span> <span class="c1"># This must be imported before opentelemetry</span>
</span></span><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">opentelemetry</span> <span class="kn">import</span> <span class="n">metrics</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">time</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># ddtrace automatically configures the MeterProvider</span>
</span></span><span class="line"><span class="cl"><span class="n">meter</span> <span class="o">=</span> <span class="n">metrics</span><span class="o">.</span><span class="n">get_meter</span><span class="p">(</span><span class="vm">__name__</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Histogram - distribution of values</span>
</span></span><span class="line"><span class="cl"><span class="n">histogram</span> <span class="o">=</span> <span class="n">meter</span><span class="o">.</span><span class="n">create_histogram</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">name</span><span class="o">=</span><span class="s2">&#34;http.request_duration&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">description</span><span class="o">=</span><span class="s2">&#34;HTTP request duration&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">unit</span><span class="o">=</span><span class="s2">&#34;ms&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">start_time</span> <span class="o">=</span> <span class="n">time</span><span class="o">.</span><span class="n">time</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="c1"># ... simulate work ...</span>
</span></span><span class="line"><span class="cl"><span class="n">time</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="mf">0.05</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">end_time</span> <span class="o">=</span> <span class="n">time</span><span class="o">.</span><span class="n">time</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">duration</span> <span class="o">=</span> <span class="p">(</span><span class="n">end_time</span> <span class="o">-</span> <span class="n">start_time</span><span class="p">)</span> <span class="o">*</span> <span class="mi">1000</span> <span class="c1"># convert to milliseconds</span>
</span></span><span class="line"><span class="cl"><span class="n">histogram</span><span class="o">.</span><span class="n">record</span><span class="p">(</span><span class="n">duration</span><span class="p">,</span> <span class="p">{</span><span class="s2">&#34;method&#34;</span><span class="p">:</span> <span class="s2">&#34;POST&#34;</span><span class="p">,</span> <span class="s2">&#34;route&#34;</span><span class="p">:</span> <span class="s2">&#34;/api/users&#34;</span><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="39"
      >
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
              ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;opentelemetry/api&#39;</span>
</span></span><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;time&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># dd-trace-rb automatically configures the MeterProvider</span>
</span></span><span class="line"><span class="cl"><span class="n">meter</span> <span class="o">=</span> <span class="no">OpenTelemetry</span><span class="o">.</span><span class="n">meter_provider</span><span class="o">.</span><span class="n">meter</span><span class="p">(</span><span class="s1">&#39;my-service&#39;</span><span class="p">,</span> <span class="s1">&#39;1.0.0&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Histogram - distribution of values</span>
</span></span><span class="line"><span class="cl"><span class="n">histogram</span> <span class="o">=</span> <span class="n">meter</span><span class="o">.</span><span class="n">create_histogram</span><span class="p">(</span><span class="s1">&#39;http.request_duration&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="ss">description</span><span class="p">:</span> <span class="s1">&#39;HTTP request duration&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="ss">unit</span><span class="p">:</span> <span class="s1">&#39;ms&#39;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">start_time</span> <span class="o">=</span> <span class="no">Time</span><span class="o">.</span><span class="n">now</span>
</span></span><span class="line"><span class="cl"><span class="c1"># ... simulate work ...</span>
</span></span><span class="line"><span class="cl"><span class="nb">sleep</span><span class="p">(</span><span class="mi">0</span><span class="o">.</span><span class="mo">05</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">end_time</span> <span class="o">=</span> <span class="no">Time</span><span class="o">.</span><span class="n">now</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">duration</span> <span class="o">=</span> <span class="p">(</span><span class="n">end_time</span> <span class="o">-</span> <span class="n">start_time</span><span class="p">)</span> <span class="o">*</span> <span class="mi">1000</span> <span class="c1"># convert to milliseconds</span>
</span></span><span class="line"><span class="cl"><span class="n">histogram</span><span class="o">.</span><span class="n">record</span><span class="p">(</span><span class="n">duration</span><span class="p">,</span> <span class="ss">attributes</span><span class="p">:</span> <span class="p">{</span> <span class="s1">&#39;method&#39;</span> <span class="o">=&gt;</span> <span class="s1">&#39;POST&#39;</span><span class="p">,</span> <span class="s1">&#39;route&#39;</span> <span class="o">=&gt;</span> <span class="s1">&#39;/api/users&#39;</span> <span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <h2 id="supported-configuration">Supported configuration</h2>
      <p>
        To enable this feature, you must set
        <code>DD_METRICS_OTEL_ENABLED=true</code>.
      </p>
      <p>
        All OTLP exporter settings (such as endpoints, protocols, and timeouts),
        resource attributes, and temporality preferences are configured using a
        shared set of OpenTelemetry environment variables.
      </p>
      <p>
        For a complete list of all shared OTLP environment variables, see
        <a href="/opentelemetry/config/environment_variable_support"
          >OpenTelemetry Environment Variables Interoperability</a
        >.
      </p>
      <h2 id="migrate-from-other-setups">Migrate from other setups</h2>
      <h3 id="existing-otel-setup">Existing OTel setup</h3>
      <p>
        If you are already using the OpenTelemetry SDK with a manual OTLP
        exporter configuration, follow these steps to migrate:
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="40"
      >
        <ol>
          <li>
            Add the Datadog SDK (<code>dd-trace-dotnet</code>) to your project
            and enable its instrumentation.
          </li>
          <li>
            Remove any code that manually configures the
            <code>OtlpExporter</code> for metrics. The Datadog SDK handles this
            configuration automatically.
          </li>
          <li>
            Remove the <code>OpenTelemetry</code> and
            <code>OpenTelemetry.Exporter.OpenTelemetryProtocol</code> packages
            from your project's dependencies.
          </li>
          <li>
            Set the <code>DD_METRICS_OTEL_ENABLED=true</code> environment
            variable.
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="41"
      >
        <ol>
          <li>
            Add the Datadog SDK (<code>dd-trace</code>) to your project and
            enable its instrumentation.
          </li>
          <li>
            Remove any code that manually configures the
            <code>OTLPMetricsExporter</code>. The Datadog SDK handles this
            configuration automatically.
          </li>
          <li>
            Remove the <code>@opentelemetry/sdk-node</code> and
            <code>@opentelemetry/exporter-otlp</code> packages from your
            project's dependencies.
          </li>
          <li>
            Set the <code>DD_METRICS_OTEL_ENABLED=true</code> environment
            variable.
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="42"
      >
        <ol>
          <li>
            Add the Datadog SDK (<code>dd-trace-py</code>) to your project and
            enable its instrumentation (for example, <code>ddtrace-run</code>).
          </li>
          <li>
            Remove any code that manually configures the
            <code>OTLPMetricsExporter</code>. The Datadog SDK handles this
            configuration automatically.
          </li>
          <li>
            Set the <code>DD_METRICS_OTEL_ENABLED=true</code> environment
            variable.
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="43"
      >
        <ol>
          <li>
            Add the Datadog SDK (<code>datadog</code>) to your project and
            enable its instrumentation.
          </li>
          <li>
            Remove any code that manually configures the
            <code>OTLPMetricsExporter</code>. The Datadog SDK handles this
            configuration automatically.
          </li>
          <li>
            Set the <code>DD_METRICS_OTEL_ENABLED=true</code> environment
            variable.
          </li>
        </ol>
        <div class="alert alert-warning">
          <p>
            Runtime and trace metrics continue to be submitted using StatsD.
            Only custom metrics created through the OpenTelemetry Metrics API
            are sent using OTLP. The <code>dd-trace-rb</code> implementation
            supports exporting OTLP metrics exclusively to a Datadog Agent or
            OpenTelemetry Collector. Multiple exporters are not supported.
          </p>
        </div>
      </div>
      <h3 id="existing-dogstatsd-setup">Existing DogStatsD setup</h3>
      <p>
        If you are currently using the Datadog DogStatsD client and want to
        migrate to the OpenTelemetry Metrics API, you need to update your
        instrumentation code. The main difference is that OTel metrics are
        configured using environment variables rather than code, and you create
        <code>Instrument</code> objects first.
      </p>
      <h2 id="troubleshooting">Troubleshooting</h2>
      <ul>
        <li>
          Ensure <code>DD_METRICS_OTEL_ENABLED</code> is set to
          <code>true</code>.
        </li>
        <li>
          Verify that your OTLP destination is configured correctly to receive
          metrics.
        </li>
        <li>
          If you are sending data to the Datadog Agent, ensure OTLP ingestion is
          enabled. See
          <a
            href="/opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent"
            >Enabling OTLP Ingestion on the Datadog Agent</a
          >
          for details.
        </li>
      </ul>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="44"
      >
        <ul>
          <li>
            Verify Datadog automatic instrumentation is active. This feature
            relies on Datadog's automatic instrumentation to function. Ensure
            you have completed all setup steps to enable the .NET
            instrumentation hooks, as these are required to intercept the metric
            data.
          </li>
          <li>
            If, after removing the OpenTelemetry SDK packages, your application
            fails to compile due to missing APIs in the
            <a
              href="https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.metrics"
              >System.Diagnostics.Metrics namespace</a
            >, you must update your application by either adding a direct NuGet
            package reference to
            <code>System.Diagnostics.DiagnosticSource</code> or upgrading the
            version of .NET. See
            <a href="#net-version-and-instrument-support"
              >.NET version and instrument support</a
            >
            for more information.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="45"
      >
        <ul>
          <li>
            Verify <code>dd-trace</code> is initialized first. The Datadog SDK
            must be initialized at the top of your application,
            <em>before</em> any other modules are imported.
          </li>
          <li>
            Verify <code>@opentelemetry/api</code> is installed. The Node.js SDK
            requires this API package.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="46"
      >
        <ul>
          <li>
            Verify <code>opentelemetry-sdk</code> is installed. The Python SDK
            requires <code>opentelemetry-sdk</code> and
            <code>opentelemetry-exporter-otlp</code> to be installed in your
            Python environment.
          </li>
          <li>
            Ensure <code>ddtrace-run</code> is active. Verify that you are
            running your application with <code>ddtrace-run</code> (or have
            imported and initialized <code>ddtrace</code> manually).
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="47"
      >
        <ul>
          <li>
            Verify required gems are installed. Ensure
            <code>opentelemetry-metrics-sdk</code> and
            <code>opentelemetry-exporter-otlp-metrics</code> are installed in
            your Ruby environment.
          </li>
          <li>
            Ensure <code>Datadog.configure</code> is called before
            <code>OpenTelemetry::SDK.configure</code>. The Datadog SDK must be
            configured first to properly set up the meter provider.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="48"
      >
        <h3 id="net-version-and-instrument-support">
          .NET version and instrument support
        </h3>
        <p>
          Support for specific OpenTelemetry metric instruments is dependent on
          your .NET runtime version or the version of the
          <code>System.Diagnostics.DiagnosticSource</code> NuGet package you
          have installed.
        </p>
        <p>Here is the minimum version required for each instrument type:</p>
        <ul>
          <li>
            <p>
              <strong>.NET 6+</strong> (or
              <code>System.Diagnostics.DiagnosticSource</code> v6.0.0) supports:
            </p>
            <ul>
              <li><code>Counter</code></li>
              <li><code>Histogram</code></li>
              <li><code>ObservableCounter</code></li>
              <li><code>ObservableGauge</code></li>
            </ul>
          </li>
          <li>
            <p>
              <strong>.NET 7+</strong> (or
              <code>System.Diagnostics.DiagnosticSource</code> v7.0.0) supports:
            </p>
            <ul>
              <li><code>UpDownCounter</code></li>
              <li><code>ObservableUpDownCounter</code></li>
            </ul>
          </li>
          <li>
            <p>
              <strong>.NET 9+</strong> (or
              <code>System.Diagnostics.DiagnosticSource</code> v9.0.0) supports:
            </p>
            <ul>
              <li><code>Gauge</code></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Signal is Logs"
    data-if="80"
  >
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="(Language is .NET) or (Language is Node.js) or (Language is Python)"
      data-if="79"
    >
      <h2 id="overview">Overview</h2>
      <p>
        Use the OpenTelemetry Logs API with Datadog SDKs to send custom
        application logs. This is an alternative to Datadog's traditional log
        injection.
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="(Language is .NET) or (Language is Node.js)"
        data-if="59"
      >
        <p>
          The Datadog SDK provides a native implementation of the OpenTelemetry
          API. This means you can write code against the standard OTel
          interfaces without needing the official OpenTelemetry SDK.
        </p>
        <div class="alert alert-info">
          <p>
            You should not install the official OpenTelemetry SDK or any OTLP
            Exporter packages. The Datadog SDK provides this functionality.
            Installing both can lead to runtime conflicts and duplicate data.
          </p>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="60"
      >
        <p>
          This approach works with the existing OpenTelemetry SDK. When you
          enable this feature, the Datadog SDK detects the OTel SDK and
          configures its OTLP exporter to send logs to the Datadog Agent.
        </p>
      </div>
      <h2 id="prerequisites">Prerequisites</h2>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="61"
      >
        <ul>
          <li>
            <strong>Datadog SDK</strong>: <code>dd-trace-dotnet</code> version
            <a
              href="https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.31.0"
              >3.31.0</a
            >
            or later.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="62"
      >
        <ul>
          <li>
            <strong>Datadog SDK</strong>: <code>dd-trace-js</code> version
            5.73.0 or later.
          </li>
          <li>
            <strong>OpenTelemetry Logs API</strong>: The
            <code>@opentelemetry/api-logs</code> package is required, in a
            version from <code>v0.200.0</code> up to <code>v1.0</code>.
          </li>
        </ul>
        <div class="alert alert-warning">
          <p>
            The <code>@opentelemetry/api-logs</code> package is still
            experimental, and version 1.0 has not yet been released. New
            versions of this package may introduce breaking changes that affect
            compatibility.
          </p>
          <p>
            If you encounter an issue after upgrading
            <code>@opentelemetry/api-logs</code>,
            <a href="https://github.com/DataDog/dd-trace-js/issues"
              >open an issue in the <code>dd-trace-js</code> repository</a
            >.
          </p>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="63"
      >
        <ul>
          <li>
            <strong>Datadog SDK</strong>: <code>dd-trace-py</code> version
            3.18.0 or later.
          </li>
        </ul>
      </div>
      <ul>
        <li>
          <strong>An OTLP-compatible destination</strong>: You must have a
          destination (Agent or Collector) listening on ports 4317 (gRPC) or
          4318 (HTTP) to receive OTel logs.
        </li>
      </ul>
      <h2 id="setup">Setup</h2>
      <p>
        Follow these steps to enable OTel Logs API support in your application.
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="64"
      >
        <ol>
          <li>
            Install the Datadog SDK. Follow the installation steps for your
            runtime:
            <ul>
              <li>
                <a
                  href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/#install-the-tracer"
                  >.NET Framework</a
                >
              </li>
              <li>
                <a
                  href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core#install-the-tracer"
                  >.NET Core</a
                >
              </li>
            </ul>
          </li>
          <li>
            Enable OTel logs export by setting the following environment
            variable:
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
                  ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DD_LOGS_OTEL_ENABLED</span><span class="o">=</span><span class="nb">true</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="65"
      >
        <ol>
          <li>
            Install the Datadog SDK:
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
                  ><code><span class="line"><span class="cl">npm install dd-trace
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Install the OpenTelemetry Logs API package:
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
                  ><code><span class="line"><span class="cl">npm install @opentelemetry/api-logs
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Enable OTel logs export by setting the following environment
            variable:
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
                  ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DD_LOGS_OTEL_ENABLED</span><span class="o">=</span><span class="nb">true</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Initialize the Datadog SDK (<code>dd-trace</code>) at the beginning
            of your application, before any other modules are imported:
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="c1">// This must be the first line of your application
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">require</span><span class="p">(</span><span class="s1">&#39;dd-trace&#39;</span><span class="p">).</span><span class="nx">init</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Other imports can follow
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="p">{</span> <span class="nx">logs</span> <span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@opentelemetry/api-logs&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;express&#39;</span><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="66"
      >
        <ol>
          <li>
            Install the Datadog SDK:
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
                  ><code><span class="line"><span class="cl">pip install ddtrace
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Install the OTel SDK and Exporter:
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
                  ><code><span class="line"><span class="cl">pip install opentelemetry-sdk opentelemetry-exporter-otlp&gt;<span class="o">=</span>1.15.0
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Enable OTel logs export by setting the following environment
            variable:
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
                  ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DD_LOGS_OTEL_ENABLED</span><span class="o">=</span><span class="nb">true</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Run your application using <code>ddtrace-run</code>:
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
                  ><code><span class="line"><span class="cl">ddtrace-run python my_app.py
</span></span></code></pre>
                </div>
              </div>
            </div>
            When enabled, <code>ddtrace</code> automatically detects the OTel
            packages and configures the <code>OTLPLogExporter</code> to send
            logs to your OTLP destination.
          </li>
        </ol>
      </div>
      <h2 id="examples">Examples</h2>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="67"
      >
        <h3 id="standard-logging-dotnet">Standard logging</h3>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-csharp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">Microsoft.Extensions.Logging</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// For a Console application, manually create a logger factory</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">var</span> <span class="n">loggerFactory</span> <span class="p">=</span> <span class="n">LoggerFactory</span><span class="p">.</span><span class="n">Create</span><span class="p">(</span><span class="n">builder</span> <span class="p">=&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">builder</span><span class="p">.</span><span class="n">SetMinimumLevel</span><span class="p">(</span><span class="n">LogLevel</span><span class="p">.</span><span class="n">Debug</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Get a logger instance</span>
</span></span><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">logger</span> <span class="p">=</span> <span class="n">loggerFactory</span><span class="p">.</span><span class="n">CreateLogger</span><span class="p">&lt;</span><span class="n">Program</span><span class="p">&gt;();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// This log will be exported via OTLP</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="p">.</span><span class="n">LogInformation</span><span class="p">(</span><span class="s">&#34;This is a standard log message.&#34;</span><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="trace-log-correlation-dotnet">Trace and log correlation</h3>
        <p>
          This example shows how logs emitted within an active Datadog span are
          automatically correlated. If you are using the OTel Tracing API or
          built-in .NET Activity API to create spans, ensure OTel Tracing API
          support is enabled by setting <code>DD_TRACE_OTEL_ENABLED=true</code>.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-csharp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">Microsoft.Extensions.Logging</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">System.Diagnostics</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">System.Threading.Tasks</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// For a Console application, manually create a logger factory</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">var</span> <span class="n">loggerFactory</span> <span class="p">=</span> <span class="n">LoggerFactory</span><span class="p">.</span><span class="n">Create</span><span class="p">(</span><span class="n">builder</span> <span class="p">=&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">builder</span><span class="p">.</span><span class="n">SetMinimumLevel</span><span class="p">(</span><span class="n">LogLevel</span><span class="p">.</span><span class="n">Debug</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Get a logger instance</span>
</span></span><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">logger</span> <span class="p">=</span> <span class="n">loggerFactory</span><span class="p">.</span><span class="n">CreateLogger</span><span class="p">&lt;</span><span class="n">Program</span><span class="p">&gt;();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Create an activity source</span>
</span></span><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">activitySource</span> <span class="p">=</span> <span class="k">new</span> <span class="n">ActivitySource</span><span class="p">(</span><span class="s">&#34;MyService&#34;</span><span class="p">,</span> <span class="s">&#34;1.0.0&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Start an activity (span)</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="p">(</span><span class="kt">var</span> <span class="n">activity</span> <span class="p">=</span> <span class="n">activitySource</span><span class="p">.</span><span class="n">StartActivity</span><span class="p">(</span><span class="s">&#34;do.work&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// This log is automatically correlated with the &#39;do.work&#39; span</span>
</span></span><span class="line"><span class="cl">    <span class="n">logger</span><span class="p">.</span><span class="n">LogInformation</span><span class="p">(</span><span class="s">&#34;This log is correlated to the active span.&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="k">await</span> <span class="n">Task</span><span class="p">.</span><span class="n">Delay</span><span class="p">(</span><span class="n">TimeSpan</span><span class="p">.</span><span class="n">FromMilliseconds</span><span class="p">(</span><span class="m">100</span><span class="p">));</span>
</span></span><span class="line"><span class="cl">    <span class="n">logger</span><span class="p">.</span><span class="n">LogWarning</span><span class="p">(</span><span class="s">&#34;So is this one.&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="68"
      >
        <h3 id="emitting-log-nodejs">Emitting a log</h3>
        <p>
          After the Datadog SDK is initialized, you can use the standard
          OpenTelemetry Logs API to get a logger and emit log records.
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
              ><code><span class="line"><span class="cl"><span class="c1">// Tracer must be initialized first
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">require</span><span class="p">(</span><span class="s1">&#39;dd-trace&#39;</span><span class="p">).</span><span class="nx">init</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="p">{</span> <span class="nx">logs</span> <span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@opentelemetry/api-logs&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">logger</span> <span class="o">=</span> <span class="nx">logs</span><span class="p">.</span><span class="nx">getLogger</span><span class="p">(</span><span class="s1">&#39;my-service&#39;</span><span class="p">,</span> <span class="s1">&#39;1.0.0&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Emit a log record
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">logger</span><span class="p">.</span><span class="nx">emit</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="nx">severityText</span><span class="o">:</span> <span class="s1">&#39;INFO&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">severityNumber</span><span class="o">:</span> <span class="mi">9</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">body</span><span class="o">:</span> <span class="sb">`User clicked the checkout button.`</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">attributes</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;cart.id&#39;</span><span class="o">:</span> <span class="s1">&#39;c-12345&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;user.id&#39;</span><span class="o">:</span> <span class="s1">&#39;u-54321&#39;</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="trace-log-correlation-nodejs">Trace and log correlation</h3>
        <p>
          Trace and log correlation is automatic. When you emit a log using the
          OTel Logs API within an active Datadog trace, the
          <code>trace_id</code> and <code>span_id</code> are automatically added
          to the log record.
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
              ><code><span class="line"><span class="cl"><span class="c1">// Tracer must be initialized first
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">require</span><span class="p">(</span><span class="s1">&#39;dd-trace&#39;</span><span class="p">).</span><span class="nx">init</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="p">{</span> <span class="nx">logs</span> <span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@opentelemetry/api-logs&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;express&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">logger</span> <span class="o">=</span> <span class="nx">logs</span><span class="p">.</span><span class="nx">getLogger</span><span class="p">(</span><span class="s1">&#39;my-service&#39;</span><span class="p">,</span> <span class="s1">&#39;1.0.0&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/api/users/:id&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// This log is automatically correlated with the &#39;express.request&#39; span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="nx">logger</span><span class="p">.</span><span class="nx">emit</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="nx">severityText</span><span class="o">:</span> <span class="s1">&#39;INFO&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">severityNumber</span><span class="o">:</span> <span class="mi">9</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">body</span><span class="o">:</span> <span class="sb">`Processing user request for ID: </span><span class="si">${</span><span class="nx">req</span><span class="p">.</span><span class="nx">params</span><span class="p">.</span><span class="nx">id</span><span class="si">}</span><span class="sb">`</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="p">})</span>
</span></span><span class="line"><span class="cl">  <span class="nx">res</span><span class="p">.</span><span class="nx">json</span><span class="p">({</span> <span class="nx">id</span><span class="o">:</span> <span class="nx">req</span><span class="p">.</span><span class="nx">params</span><span class="p">.</span><span class="nx">id</span><span class="p">,</span> <span class="nx">name</span><span class="o">:</span> <span class="s1">&#39;John Doe&#39;</span> <span class="p">})</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">app</span><span class="p">.</span><span class="nx">listen</span><span class="p">(</span><span class="mi">3000</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="69"
      >
        <p>
          The Datadog SDK supports the OpenTelemetry Logs API for Python's
          built-in <code>logging</code> module. You do not need to change your
          existing logging code.
        </p>
        <h3 id="standard-logging-python">Standard logging</h3>
        <p>
          This example shows a standard log message. With
          <code>DD_LOGS_OTEL_ENABLED=true</code>, this log is automatically
          captured, formatted as OTLP, and exported.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-python">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">logging</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">time</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Get a logger</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span> <span class="o">=</span> <span class="n">logging</span><span class="o">.</span><span class="n">getLogger</span><span class="p">(</span><span class="vm">__name__</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="o">.</span><span class="n">setLevel</span><span class="p">(</span><span class="n">logging</span><span class="o">.</span><span class="n">INFO</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Add a handler to see logs in the console (optional)</span>
</span></span><span class="line"><span class="cl"><span class="n">handler</span> <span class="o">=</span> <span class="n">logging</span><span class="o">.</span><span class="n">StreamHandler</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="o">.</span><span class="n">addHandler</span><span class="p">(</span><span class="n">handler</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># This log will be exported via OTLP</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="o">.</span><span class="n">info</span><span class="p">(</span><span class="s2">&#34;This is a standard log message.&#34;</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="trace-log-correlation-python">Trace and log correlation</h3>
        <p>
          This example shows how logs emitted within an active Datadog span are
          automatically correlated.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-python">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">ddtrace</span> <span class="kn">import</span> <span class="n">tracer</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">logging</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">time</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Standard logging setup</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span> <span class="o">=</span> <span class="n">logging</span><span class="o">.</span><span class="n">getLogger</span><span class="p">(</span><span class="vm">__name__</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="o">.</span><span class="n">setLevel</span><span class="p">(</span><span class="n">logging</span><span class="o">.</span><span class="n">INFO</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">handler</span> <span class="o">=</span> <span class="n">logging</span><span class="o">.</span><span class="n">StreamHandler</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="n">handler</span><span class="o">.</span><span class="n">setFormatter</span><span class="p">(</span><span class="n">logging</span><span class="o">.</span><span class="n">Formatter</span><span class="p">(</span><span class="s1">&#39;</span><span class="si">%(message)s</span><span class="s1">&#39;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="o">.</span><span class="n">addHandler</span><span class="p">(</span><span class="n">handler</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nd">@tracer.wrap</span><span class="p">(</span><span class="s2">&#34;do.work&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">do_work</span><span class="p">():</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># This log is automatically correlated with the &#39;do.work&#39; span</span>
</span></span><span class="line"><span class="cl">    <span class="n">logger</span><span class="o">.</span><span class="n">info</span><span class="p">(</span><span class="s2">&#34;This log is correlated to the active span.&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">time</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="mf">0.1</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">logger</span><span class="o">.</span><span class="n">warning</span><span class="p">(</span><span class="s2">&#34;So is this one.&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nb">print</span><span class="p">(</span><span class="s2">&#34;Starting work...&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">do_work</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nb">print</span><span class="p">(</span><span class="s2">&#34;Work complete.&#34;</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <h2 id="supported-configuration">Supported configuration</h2>
      <p>
        To enable this feature, you must set
        <code>DD_LOGS_OTEL_ENABLED=true</code>.
      </p>
      <p>
        All OTLP exporter settings (such as endpoints, protocols, and timeouts),
        resource attributes, and batch processor settings are configured using a
        shared set of OpenTelemetry environment variables.
      </p>
      <p>
        For a complete list of all shared OTLP environment variables, see
        <a href="/opentelemetry/config/environment_variable_support"
          >OpenTelemetry Environment Variables Interoperability</a
        >.
      </p>
      <h2 id="migrate-from-other-setups">Migrate from other setups</h2>
      <h3 id="existing-otel-setup">Existing OTel setup</h3>
      <p>
        If you are already using the OpenTelemetry SDK with a manual OTLP
        exporter configuration, follow these steps to migrate:
      </p>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="70"
      >
        <ol>
          <li>
            Add the Datadog SDK (<code>dd-trace-dotnet</code>) to your project
            and enable its instrumentation.
          </li>
          <li>
            Remove any code that manually configures the
            <code>OtlpExporter</code> for logs. The Datadog SDK handles this
            configuration automatically.
          </li>
          <li>
            Remove the <code>OpenTelemetry</code> and
            <code>OpenTelemetry.Exporter.OpenTelemetryProtocol</code> packages
            from your project's dependencies.
          </li>
          <li>
            Set the <code>DD_LOGS_OTEL_ENABLED=true</code> environment variable.
          </li>
        </ol>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="71"
      >
        <ol>
          <li>
            Remove the OTel SDK and OTLP Exporter packages:
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
                  ><code><span class="line"><span class="cl">npm uninstall @opentelemetry/sdk-logs @opentelemetry/exporter-otlp-logs
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            Remove all manual OTel SDK initialization code (for example,
            <code>new LoggerProvider()</code>,
            <code>addLogRecordProcessor()</code>,
            <code>new OTLPLogExporter()</code>).
          </li>
          <li>Install the Datadog SDK: <code>npm install dd-trace</code></li>
          <li>Keep the <code>@opentelemetry/api-logs</code> package.</li>
          <li>
            Set <code>DD_LOGS_OTEL_ENABLED=true</code> and initialize
            <code>dd-trace</code> at the top of your application.
          </li>
        </ol>
        <p>
          Your existing code that uses <code>logs.getLogger()</code> will
          continue to work.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="72"
      >
        <ol>
          <li>
            Remove your manual setup code (for example,
            <code>LoggerProvider</code>, <code>BatchLogRecordProcessor</code>,
            and <code>OTLPLogExporter</code> instantiation).
          </li>
          <li>
            Enable <code>ddtrace-run</code> auto-instrumentation for your
            application.
          </li>
          <li>
            Set the <code>DD_LOGS_OTEL_ENABLED=true</code> environment variable.
          </li>
        </ol>
        <p>
          The Datadog SDK will programmatically configure the OTel SDK for you.
        </p>
      </div>
      <h3 id="existing-datadog-log-injection">
        Existing Datadog log injection
      </h3>
      <p>
        If you are using Datadog's traditional log injection (where
        <code>DD_LOGS_INJECTION=true</code> adds trace context to text logs) and
        an Agent to tail log files:
      </p>
      <ol>
        <li>
          Set the <code>DD_LOGS_OTEL_ENABLED=true</code> environment variable.
        </li>
        <li>
          The Datadog SDK automatically disables the old log injection style
          (<code>DD_LOGS_INJECTION</code>) to prevent duplicate trace metadata
          in your logs. Trace correlation is handled by the structured OTLP
          payload.
        </li>
        <li>
          Ensure your Datadog Agent is configured to receive OTLP logs (version
          7.48.0 or greater is required)
        </li>
        <li>
          Disable any file-based log collection for this service to avoid
          duplicate logs.
        </li>
      </ol>
      <h2 id="troubleshooting">Troubleshooting</h2>
      <ul>
        <li>
          Ensure <code>DD_LOGS_OTEL_ENABLED</code> is set to <code>true</code>.
        </li>
        <li>
          Verify that your OTLP destination is configured correctly to receive
          logs.
        </li>
        <li>
          If you are sending data to the Datadog Agent, ensure OTLP ingestion is
          enabled. See
          <a
            href="/opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent"
            >Enabling OTLP Ingestion on the Datadog Agent</a
          >
          for details.
        </li>
      </ul>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="73"
      >
        <ul>
          <li>
            Verify Datadog automatic instrumentation is active. This feature
            relies on Datadog's automatic instrumentation to function. Ensure
            you have completed all setup steps to enable the .NET
            instrumentation hooks, as these are required to intercept the log
            data.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="74"
      >
        <ul>
          <li>
            Verify <code>dd-trace</code> is initialized first. The Datadog SDK
            must be initialized at the top of your application,
            <em>before</em> any other modules are imported.
          </li>
          <li>
            Verify <code>@opentelemetry/api-logs</code> is installed. The
            Node.js SDK requires this API package.
          </li>
        </ul>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="75"
      >
        <ul>
          <li>
            Verify <code>opentelemetry-sdk</code> is installed. The Python SDK
            requires <code>opentelemetry-sdk</code> and
            <code>opentelemetry-exporter-otlp</code> to be installed in your
            Python environment.
          </li>
          <li>
            Ensure <code>ddtrace-run</code> is active. Verify that you are
            running your application with <code>ddtrace-run</code> (or have
            imported and initialized <code>ddtrace</code> manually).
          </li>
        </ul>
      </div>
    </div>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/guide/instrument_custom_method"><span class="w-100 d-flex justify-content-between "><span class="text">Instrument a custom method to get deep visibility into your business logic</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/connect_logs_and_traces"><span class="w-100 d-flex justify-content-between "><span class="text">Connect your Logs and Traces together</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/visualization/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://www.datadoghq.com/blog/opentelemetry-instrumentation/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn More about Datadog and the OpenTelemetry initiative</span><span class="badge badge-white pe-2 border-0">BLOG</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"traces"},"1":"metrics"},"v":false,"r":"0"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"traces"},"1":"logs"},"v":false,"r":"1"},"6":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"go"},"v":false,"r":"2"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"php"},"v":false,"r":"3"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"java"},"v":true,"r":"4"},"3":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"rust"},"v":false,"r":"5"}},"v":true,"r":"6"},"7":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"traces"},"1":"logs"},"v":false,"r":"7"},"8":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"8"},"9":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"java"},"v":true,"r":"9"},"10":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"10"},"11":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"11"},"12":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"go"},"v":false,"r":"12"},"13":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"13"},"14":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"14"},"15":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"php"},"v":false,"r":"15"},"16":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"rust"},"v":false,"r":"16"},"17":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"traces"},"1":"traces"},"v":true,"r":"17"},"20":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"18"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"19"}},"v":false,"r":"20"},"23":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"21"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"22"}},"v":false,"r":"23"},"24":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"24"},"25":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"25"},"26":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"26"},"27":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"27"},"28":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"28"},"29":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"29"},"30":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"30"},"31":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"31"},"32":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"32"},"33":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"33"},"34":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"34"},"35":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"35"},"36":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"36"},"37":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"37"},"38":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"38"},"39":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"39"},"40":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"40"},"41":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"41"},"42":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"42"},"43":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"43"},"44":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"44"},"45":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"45"},"46":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"46"},"47":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"47"},"48":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"48"},"55":{"m":"F","n":"o","p":{"0":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"49"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"50"}},"v":false,"r":"51"},"1":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"52"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"53"}},"v":false,"r":"54"}},"v":false,"r":"55"},"56":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"traces"},"1":"metrics"},"v":false,"r":"56"},"59":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"57"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"58"}},"v":false,"r":"59"},"60":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"60"},"61":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"61"},"62":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"62"},"63":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"63"},"64":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"64"},"65":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"65"},"66":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"66"},"67":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"67"},"68":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"68"},"69":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"69"},"70":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"70"},"71":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"71"},"72":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"72"},"73":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"73"},"74":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"74"},"75":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"75"},"79":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"76"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"77"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"78"}},"v":false,"r":"79"},"80":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"traces"},"1":"logs"},"v":false,"r":"80"}},    filtersManifest: {"filtersByTraitId":{"prog_lang":{"config":{"trait_id":"prog_lang","option_group_id":"otel_api_support_language_options","label":"Language"},"defaultValsByOptionGroupId":{"otel_api_support_language_options":"java"}},"platform":{"config":{"trait_id":"platform","option_group_id":"otel_api_support_signal_options","label":"Signal"},"defaultValsByOptionGroupId":{"otel_api_support_signal_options":"traces"}}},"defaultValsByTraitId":{"prog_lang":"java","platform":"traces"},"optionGroupsById":{"otel_api_support_language_options":[{"default":true,"id":"java","label":"Java"},{"id":"python","label":"Python"},{"id":"node_js","label":"Node.js"},{"id":"go","label":"Go"},{"id":"ruby","label":"Ruby"},{"id":"dot_net","label":".NET"},{"id":"php","label":"PHP"},{"id":"rust","label":"Rust"}],"otel_api_support_signal_options":[{"default":true,"id":"traces","label":"Traces"},{"id":"metrics","label":"Metrics"},{"id":"logs","label":"Logs"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>