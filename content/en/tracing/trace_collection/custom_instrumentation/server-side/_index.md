---
title: Server-Side Custom Instrumentation
description: >-
  Add custom spans, tags, and instrumentation to capture application-specific
  observability data using Datadog APIs and OpenTelemetry.
aliases:
  - /tracing/opentracing/java
  - /tracing/manual_instrumentation/java
  - /tracing/custom_instrumentation/java
  - /tracing/setup_overview/custom_instrumentation/java
  - /tracing/trace_collection/custom_instrumentation/java
  - /tracing/trace_collection/custom_instrumentation/java/dd-api
  - /tracing/trace_collection/custom_instrumentation/java/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/java
  - /tracing/trace_collection/otel_instrumentation/java/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
  - /tracing/opentracing/python
  - /tracing/manual_instrumentation/python
  - /tracing/custom_instrumentation/python
  - /tracing/setup_overview/custom_instrumentation/python
  - /tracing/trace_collection/custom_instrumentation/python
  - /tracing/trace_collection/custom_instrumentation/python/dd-api
  - /tracing/trace_collection/custom_instrumentation/python/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/python
  - /tracing/trace_collection/otel_instrumentation/python/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
  - /tracing/opentracing/nodejs
  - /tracing/manual_instrumentation/nodejs
  - /tracing/custom_instrumentation/nodejs
  - /tracing/setup_overview/custom_instrumentation/nodejs
  - /tracing/trace_collection/custom_instrumentation/nodejs
  - /tracing/trace_collection/custom_instrumentation/nodejs/dd-api
  - /tracing/trace_collection/custom_instrumentation/nodejs/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
  - /tracing/trace_collection/otel_instrumentation/nodejs/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
  - /tracing/opentracing/go
  - /tracing/manual_instrumentation/go
  - /tracing/custom_instrumentation/go
  - /tracing/setup_overview/custom_instrumentation/go
  - /tracing/trace_collection/custom_instrumentation/go
  - /tracing/trace_collection/custom_instrumentation/go/dd-api
  - /tracing/trace_collection/custom_instrumentation/go/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/go
  - /tracing/trace_collection/otel_instrumentation/go/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
  - /tracing/opentracing/ruby
  - /tracing/manual_instrumentation/ruby
  - /tracing/custom_instrumentation/ruby
  - /tracing/setup_overview/custom_instrumentation/ruby
  - /tracing/trace_collection/custom_instrumentation/ruby
  - /tracing/trace_collection/custom_instrumentation/ruby/dd-api
  - /tracing/trace_collection/custom_instrumentation/ruby/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
  - /tracing/trace_collection/otel_instrumentation/ruby/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
  - /tracing/opentracing/dotnet
  - /tracing/manual_instrumentation/dotnet
  - /tracing/custom_instrumentation/dotnet
  - /tracing/setup_overview/custom_instrumentation/dotnet
  - /tracing/trace_collection/custom_instrumentation/dotnet
  - /tracing/trace_collection/custom_instrumentation/dotnet/dd-api
  - /tracing/trace_collection/custom_instrumentation/dotnet/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
  - /tracing/trace_collection/otel_instrumentation/dotnet/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
  - /tracing/opentracing/php
  - /tracing/manual_instrumentation/php
  - /tracing/custom_instrumentation/php
  - /tracing/setup_overview/custom_instrumentation/php
  - /tracing/trace_collection/custom_instrumentation/php
  - /tracing/trace_collection/custom_instrumentation/php/dd-api
  - /tracing/trace_collection/custom_instrumentation/php/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/php
  - /tracing/trace_collection/otel_instrumentation/php/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
  - /tracing/manual_instrumentation/cpp
  - /tracing/custom_instrumentation/cpp
  - /tracing/setup_overview/custom_instrumentation/cpp
  - /tracing/trace_collection/custom_instrumentation/cpp
  - /tracing/trace_collection/custom_instrumentation/cpp/dd-api
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
  - /tracing/trace_collection/custom_instrumentation/rust
  - /tracing/trace_collection/custom_instrumentation/elixir
  - /tracing/trace_collection/custom_instrumentation/swift
  - /tracing/trace_collection/custom_instrumentation/go/migration
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
further_reading:
  - link: tracing/guide/instrument_custom_method
    text: Instrument a custom method to get deep visibility into your business logic
  - link: tracing/connect_logs_and_traces
    text: Connect your Logs and Traces together
  - link: tracing/visualization/
    text: Explore your services, resources, and traces
  - link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
    text: Learn More about Datadog and the OpenTelemetry initiative
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
      data-option-id="cpp"
      aria-selected="false"
      tabIndex="0"
    >C++</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="rust"
      aria-selected="false"
      tabIndex="0"
    >Rust</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="prog_lang" 
      data-option-id="elixir"
      aria-selected="false"
      tabIndex="0"
    >Elixir</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-api_type-pills-label" 
    class="cdoc-filter-label"
  >API</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="api_type" 
      data-option-id="otel_api"
      aria-selected="true"
      tabIndex="0"
    >OpenTelemetry</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="api_type" 
      data-option-id="dd_api"
      aria-selected="false"
      tabIndex="0"
    >Datadog</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
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
      data-option-id="cpp"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >C++</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="rust"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Rust</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="prog_lang" 
      data-option-id="elixir"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Elixir</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-api_type-dropdown-label" 
    class="cdoc-filter-label"
  >API</p><div 
    id="cdoc-dropdown-api_type" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-api_type-dropdown-label">
      <span 
        id="cdoc-dropdown-api_type-label" 
        class="cdoc-btn-label"
      >OpenTelemetry</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-api_type-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="api_type" 
      data-option-id="otel_api"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >OpenTelemetry</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="api_type" 
      data-option-id="dd_api"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Datadog</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Language is C++"
    data-if="206"
  >
    <div
      class="cdoc__toggleable"
      data-description="API is OpenTelemetry"
      data-if="205"
    >
      <div class="alert alert-danger">
        <p>
          C++ does not support the OpenTelemetry API. Select
          <strong>Datadog</strong> from the API dropdown to see C++ custom
          instrumentation documentation.
        </p>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Language is Rust"
    data-if="208"
  >
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="API is Datadog"
      data-if="207"
    >
      <div class="alert alert-danger">
        <p>
          Rust does not support the Datadog API. Select
          <strong>OpenTelemetry</strong> from the API dropdown to see Rust
          custom instrumentation documentation.
        </p>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Language is Elixir"
    data-if="210"
  >
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="API is Datadog"
      data-if="209"
    >
      <div class="alert alert-danger">
        <p>
          Elixir does not support the Datadog API. Select
          <strong>OpenTelemetry</strong> from the API dropdown to see Elixir
          custom instrumentation documentation.
        </p>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable"
    data-description="API is OpenTelemetry"
    data-if="224"
  >
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Language is Elixir"
      data-if="211"
    >
      <p>
        Datadog does not provide an Elixir tracing library. To send traces to
        Datadog, use the
        <a href="https://opentelemetry.io/docs/languages/beam/"
          >OpenTelemetry SDK for Elixir</a
        >.
      </p>
    </div>
    <div
      class="cdoc__toggleable"
      data-description="not (Language is C++) or (Language is Elixir)"
      data-if="223"
    >
      <h2 id="overview">Overview</h2>
      <p>
        There are a few reasons to manually instrument your applications with
        the OpenTelemetry API:
      </p>
      <ul>
        <li>You are not using Datadog supported library instrumentation.</li>
        <li>You want to extend the Datadog SDK's functionality.</li>
        <li>You need finer control over instrumenting your applications.</li>
      </ul>
      <p>
        The Datadog SDK provides several techniques to help you achieve these
        goals. The following sections demonstrate how to use the OpenTelemetry
        API for custom instrumentation to use with Datadog.
      </p>
      <div
        class="cdoc__toggleable"
        data-description="Language is Java"
        data-if="212"
      >
        <h2 id="setup-otel-java">Setup</h2>
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
        <h2 id="adding-span-tags-otel-java">Adding span tags</h2>
        <h3 id="add-custom-span-tags-otel-java">Add custom span tags</h3>
        <p>
          Add custom tags to your spans corresponding to any dynamic value
          within your application code such as <code>customer.id</code>.
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
        <h3 id="adding-tags-globally-otel-java">
          Adding tags globally to all spans
        </h3>
        <p>
          The <code>dd.tags</code> property allows you to set tags across all
          generated spans for an application. This is useful for grouping stats
          for your applications, data centers, or any other tags you would like
          to see in Datadog.
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
        <h3 id="setting-errors-on-span-otel-java">Setting errors on span</h3>
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
        <h3 id="setting-tags-errors-root-span-otel-java">
          Setting tags and errors on a root span from a child span
        </h3>
        <p>
          When you want to set tags or errors on the root span from within a
          child span, you can use the OpenTelemetry Context API:
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
        <h2 id="adding-spans-otel-java">Adding spans</h2>
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
        <h3 id="trace-annotations-otel-java">Trace annotations</h3>
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
        <h3 id="manually-creating-a-new-span-otel-java">
          Manually creating a new span
        </h3>
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
        <h2 id="adding-span-events-otel-java">Adding span events</h2>
        <div class="alert alert-info">
          <p>Adding span events requires SDK version 1.40.0 or higher.</p>
        </div>
        <p>
          You can add span events using the <code>addEvent</code> API. This
          method requires a <code>name</code> parameter and optionally accepts
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
            <strong>Attributes</strong> [<em>optional</em>]: Key-value pairs
            where the key is a non-empty string and the value is a primitive
            type or a homogeneous array of primitive values.
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
          <a
            href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
            >OpenTelemetry specification for adding events</a
          >
          for more information.
        </p>
        <h3 id="recording-exceptions-otel-java">Recording exceptions</h3>
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
        <h2 id="trace-client-agent-config-otel-java">
          Trace client and Agent configuration
        </h2>
        <p>
          Both the tracing client and Datadog Agent offer additional
          configuration options for context propagation. You can also exclude
          specific resources from sending traces to Datadog if you don't want
          those traces to be included in calculated metrics, such as traces
          related to health checks.
        </p>
        <h3 id="propagating-context-otel-java">
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
        <h3 id="resource-filtering-otel-java">Resource filtering</h3>
        <p>
          Traces can be excluded based on their resource name, to remove
          synthetic traffic such as health checks from reporting traces to
          Datadog. This and other security and fine-tuning configurations can be
          found on the <a href="/tracing/security">Security</a> page or in
          <a href="/tracing/guide/ignoring_apm_resources/"
            >Ignoring Unwanted Resources</a
          >.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="213"
      >
        <h2 id="setup-otel-python">Setup</h2>
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
        <h3 id="creating-custom-spans-otel-python">Creating custom spans</h3>
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
        <h2 id="accessing-active-spans-otel-python">Accessing active spans</h2>
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
        <h2 id="adding-span-tags-otel-python">Adding span tags</h2>
        <p>
          Add attributes to a span to provide additional context or metadata:
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">current_span</span><span class="o">.</span><span class="n">set_attribute</span><span class="p">(</span><span class="s2">&#34;attribute_key1&#34;</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="adding-span-events-otel-python">Adding span events</h2>
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
          <a
            href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
            >OpenTelemetry specification for adding events</a
          >
          for more information.
        </p>
        <h3 id="recording-exceptions-otel-python">Recording exceptions</h3>
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
        data-if="214"
      >
        <h2 id="setup-otel-nodejs">Setup</h2>
        <p>
          To instrument your application, initialize the Datadog tracer
          (<code>dd-trace</code>) and explicitly register its
          <code>TracerProvider</code> with the OpenTelemetry API. This ensures
          all OpenTelemetry calls are routed through Datadog.
        </p>
        <ol>
          <li>
            <p><strong>Add the dependencies</strong>:</p>
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
        <h3 id="complete-example-otel-nodejs">Complete example</h3>
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
          Datadog combines these OpenTelemetry spans with other Datadog APM
          spans into a single trace of your application. It also supports
          <a
            href="/tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation"
            >integration instrumentation</a
          >
          and
          <a href="https://opentelemetry.io/docs/instrumentation/js/automatic/"
            >OpenTelemetry automatic instrumentation</a
          >.
        </p>
        <h2 id="adding-span-tags-otel-nodejs">Adding span tags</h2>
        <p>
          Add custom attributes to your spans to provide additional context:
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
        <h2 id="creating-spans-otel-nodejs">Creating spans</h2>
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
        <h2 id="adding-span-events-otel-nodejs">Adding span events</h2>
        <div class="alert alert-info">
          <p>
            Adding span events requires SDK version 5.17.0/4.41.0 or higher.
          </p>
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
          <a
            href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
            >OpenTelemetry specification for adding events</a
          >
          for more information.
        </p>
        <h3 id="recording-exceptions-otel-nodejs">Recording exceptions</h3>
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
        <h2 id="filtering-requests-otel-nodejs">Filtering requests</h2>
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
          prevent the Agent from sending them to Datadog. For more information
          on security and fine-tuning Agent configurations, read the
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
        data-if="215"
      >
        <h2 id="imports-otel-go">Imports</h2>
        <p>
          Import the following packages to setup the Datadog trace provider:
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
        <h2 id="setup-otel-go">Setup</h2>
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
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
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
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
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
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
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
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
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
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
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
        <h2 id="adding-span-tags-otel-go">Adding span tags</h2>
        <p>
          Add custom tags to your spans to attach additional metadata and
          context:
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
        <h3 id="adding-tags-globally-otel-go">
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
        <h3 id="setting-errors-on-a-span-otel-go">Setting errors on a span</h3>
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
        <h2 id="adding-spans-otel-go">Adding spans</h2>
        <p>
          Unlike other Datadog tracing libraries, when tracing Go applications,
          Datadog recommends that you explicitly manage and pass the Go context
          of your spans.
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
        <h2 id="adding-span-events-otel-go">Adding span events</h2>
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
          <a
            href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
            >OpenTelemetry specification for adding events</a
          >
          for more information.
        </p>
        <h2 id="trace-client-agent-config-otel-go">
          Trace client and Agent configuration
        </h2>
        <h3 id="propagating-context-otel-go">
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
        <h3 id="resource-filtering-otel-go">Resource filtering</h3>
        <p>
          Traces can be excluded based on their resource name, to remove
          synthetic traffic such as health checks from reporting traces to
          Datadog. This and other security and fine-tuning configurations can be
          found on the <a href="/tracing/security">Security</a> page.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="216"
      >
        <h2 id="requirements-and-limitations-otel-ruby">
          Requirements and limitations
        </h2>
        <ul>
          <li>
            Datadog Ruby tracing library <code>dd-trace-rb</code> version 1.9.0
            or greater.
          </li>
          <li>Gem version support 1.1.0 or greater.</li>
        </ul>
        <p>
          The following OpenTelemetry features implemented in the Datadog
          library as noted:
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
        <h2 id="configuring-otel-ruby">
          Configuring OpenTelemetry to use the Datadog tracing library
        </h2>
        <ol>
          <li>
            <p>
              Add your desired manual OpenTelemetry instrumentation to your Ruby
              code following the
              <a
                href="https://opentelemetry.io/docs/instrumentation/ruby/manual/"
                >OpenTelemetry Ruby Manual Instrumentation documentation</a
              >. <strong>Important!</strong> Where those instructions indicate
              that your code should call the OpenTelemetry SDK, call the Datadog
              tracing library instead.
            </p>
          </li>
          <li>
            <p>Add the <code>datadog</code> gem to your Gemfile:</p>
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
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>Add a configuration block to your application:</p>
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
          Datadog combines these OpenTelemetry spans with other Datadog APM
          spans into a single trace of your application. It supports
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
        <h2 id="adding-span-events-otel-ruby">Adding span events</h2>
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
          <a
            href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
            >OpenTelemetry specification for adding events</a
          >
          for more information.
        </p>
        <h3 id="recording-exceptions-otel-ruby">Recording exceptions</h3>
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
        data-if="217"
      >
        <h2 id="setup-otel-dotnet">Setup</h2>
        <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
        <ol>
          <li>
            <p>
              Add your desired manual OpenTelemetry instrumentation to your .NET
              code following the
              <a
                href="https://opentelemetry.io/docs/instrumentation/net/manual/"
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
          Datadog combines these OpenTelemetry spans with other Datadog APM
          spans into a single trace of your application. It also supports
          <a href="https://opentelemetry.io/docs/instrumentation/net/libraries/"
            >OpenTelemetry instrumentation libraries</a
          >.
        </p>
        <h2 id="creating-custom-spans-otel-dotnet">Creating custom spans</h2>
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
        <h2 id="creating-spans-otel-dotnet">Creating spans</h2>
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
        <h2 id="adding-span-tags-otel-dotnet">Adding span tags</h2>
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
        <h2 id="setting-errors-on-spans-otel-dotnet">
          Setting errors on spans
        </h2>
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
        <h2 id="adding-span-events-otel-dotnet">Adding span events</h2>
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
          <a
            href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
            >OpenTelemetry specification for adding events</a
          >
          for more information.
        </p>
        <h2 id="propagating-context-otel-dotnet">
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
        data-if="218"
      >
        <h2 id="setup-otel-php">Setup</h2>
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
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
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
              <a
                href="https://opentelemetry.io/docs/instrumentation/php/manual/"
                >OpenTelemetry PHP Manual Instrumentation documentation</a
              >.
            </p>
          </li>
          <li>
            <p>
              Install the
              <a
                href="/tracing/trace_collection/dd_libraries/php#getting-started"
                >Datadog PHP tracing library</a
              >.
            </p>
          </li>
          <li>
            <p>Set <code>DD_TRACE_OTEL_ENABLED</code> to <code>true</code>.</p>
          </li>
        </ol>
        <p>
          Datadog combines these OpenTelemetry spans with other Datadog APM
          spans into a single trace of your application.
        </p>
        <h2 id="adding-span-tags-otel-php">Adding span tags</h2>
        <p>
          You can add attributes at the exact moment as you are starting the
          span:
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
        <h2 id="setting-errors-on-a-span-otel-php">Setting errors on a span</h2>
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
        <h2 id="adding-spans-otel-php">Adding spans</h2>
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
        <h2 id="adding-span-events-otel-php">Adding span events</h2>
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
          <a
            href="https://opentelemetry.io/docs/specs/otel/trace/api/#add-events"
            >OpenTelemetry specification for adding events</a
          >
          for more information.
        </p>
        <h3 id="recording-exceptions-otel-php">Recording exceptions</h3>
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
        <h2 id="accessing-active-spans-otel-php">Accessing active spans</h2>
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
        data-if="219"
      >
        <div class="alert alert-info">
          <p>The Datadog Rust SDK is in Preview.</p>
        </div>
        <p>
          Datadog provides support for custom instrumentation in Rust
          applications through the
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
        <h2 id="setup-otel-rust">Setup</h2>
        <p>
          To configure your Rust application to send OpenTelemetry traces to
          Datadog:
        </p>
        <h3 id="add-dependencies-otel-rust">1. Add dependencies</h3>
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
        <h3 id="initialize-tracer-otel-rust">2. Initialize the Tracer</h3>
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
        <h3 id="ensure-agent-running-otel-rust">3. Ensure Agent is running</h3>
        <p>
          The Datadog exporter sends traces to the Datadog Agent, which must be
          running and accessible.
        </p>
        <h2 id="configuration-otel-rust">Configuration</h2>
        <p>
          The Datadog Rust SDK is configured using environment variables. For a
          complete list of options, see the
          <a href="/tracing/trace_collection/library_config/rust"
            >Configuration documentation</a
          >.
        </p>
        <h2 id="examples-otel-rust">Examples</h2>
        <h3 id="get-a-tracer-otel-rust">Get a Tracer</h3>
        <p>
          Get an instance of a <code>Tracer</code> from the global provider:
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
              ><code><span class="line"><span class="cl"><span class="k">use</span><span class="w"> </span><span class="n">opentelemetry</span>::<span class="n">global</span><span class="p">;</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w"></span><span class="kd">let</span><span class="w"> </span><span class="n">tracer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">global</span>::<span class="n">tracer</span><span class="p">(</span><span class="s">&#34;my-component&#34;</span><span class="p">);</span><span class="w">
</span></span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="create-a-span-otel-rust">Create a span</h3>
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
        <h3 id="create-a-child-span-otel-rust">Create a child span</h3>
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
        <h3 id="add-span-tags-otel-rust">Add span tags</h3>
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
        <h3 id="add-span-events-otel-rust">Add span events</h3>
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
        <h2 id="context-propagation-otel-rust">Context propagation</h2>
        <p>
          Because Rust does not have automatic instrumentation, you must
          manually propagate the trace context when making or receiving remote
          calls to connect traces across services.
        </p>
        <p>
          For more information, see
          <a
            href="/tracing/trace_collection/trace_context_propagation/?tab=rust"
            >Trace Context Propagation</a
          >.
        </p>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="API is Datadog"
    data-if="237"
  >
    <div
      class="cdoc__toggleable"
      data-description="not (Language is Rust) or (Language is Elixir)"
      data-if="236"
    >
      <h2 id="overview-2">Overview</h2>
      <p>
        Use the Datadog API to programmatically create, modify, or delete traces
        to send to Datadog. This is useful for tracing in-house code not
        captured by automatic instrumentation, removing unwanted spans from
        traces, and providing deeper visibility and context into spans,
        including adding span tags.
      </p>
      <div
        class="cdoc__toggleable"
        data-description="Language is Java"
        data-if="225"
      >
        <div class="alert alert-info">
          <p>
            The Datadog Java tracer interoperates with the
            <code>opentracing-api</code> library for custom instrumentation. If
            you would prefer to use the OpenTelemetry API for your custom
            instrumentation, see
            <a
              href="/tracing/trace_collection/custom_instrumentation/server-side/?api_type=otel_api&amp;prog_lang=java"
              >Java Custom Instrumentation using OpenTelemetry</a
            >
            instead.
          </p>
        </div>
        <h2 id="prerequisites-java">Prerequisites</h2>
        <ul>
          <li>
            If you have not read the setup instructions for automatic
            instrumentation, start with the
            <a href="/tracing/setup/java/">Java Setup Instructions</a>.
          </li>
          <li>
            To compile the examples on this page, add the
            <a
              href="https://mvnrepository.com/artifact/io.opentracing/opentracing-api"
              >opentracing-api</a
            >
            dependency to your project.
          </li>
        </ul>
        <h2 id="adding-tags-java">Adding tags</h2>
        <p>
          Add custom <a href="/tracing/glossary/#span-tags">span tags</a> to
          your <a href="/tracing/glossary/#spans">spans</a> to customize your
          observability within Datadog. The span tags are applied to your
          incoming traces, allowing you to correlate observed behavior with
          code-level information such as merchant tier, checkout amount, or user
          ID.
        </p>
        <h3 id="add-custom-span-tags-java">Add custom span tags</h3>
        <p>
          Add custom tags to your spans corresponding to any dynamic value
          within your application code such as <code>customer.id</code>.
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">org.apache.cxf.transport.servlet.AbstractHTTPServlet</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">javax.servlet.http.HttpServletRequest</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">javax.servlet.http.HttpServletResponse</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Tracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.util.GlobalTracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nd">@WebServlet</span>
</span></span><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">ShoppingCartServlet</span> <span class="kd">extends</span> <span class="n">AbstractHttpServlet</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kt">void</span> <span class="nf">doGet</span><span class="o">(</span><span class="n">HttpServletRequest</span> <span class="n">req</span><span class="o">,</span> <span class="n">HttpServletResponse</span> <span class="n">resp</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Get the active span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="kd">final</span> <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">().</span><span class="na">activeSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="k">if</span> <span class="o">(</span><span class="n">span</span> <span class="o">!=</span> <span class="kc">null</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">          <span class="c1">// customer_id -&gt; 254889
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>          <span class="c1">// customer_tier -&gt; platinum
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>          <span class="c1">// cart_value -&gt; 867
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>          <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="s">&#34;customer.id&#34;</span><span class="o">,</span> <span class="n">customer_id</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">          <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="s">&#34;customer.tier&#34;</span><span class="o">,</span> <span class="n">customer_tier</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">          <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="s">&#34;cart.value&#34;</span><span class="o">,</span> <span class="n">cart_value</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// [...]
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-globally-java">
          Adding tags globally to all spans
        </h3>
        <p>
          The <code>dd.tags</code> property allows setting tags across all
          generated spans for an application. This can be useful for grouping
          stats for your applications, datacenters, or any other tags you would
          like to see within the Datadog UI.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-text">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl">java -javaagent:&lt;DD-JAVA-AGENT-PATH&gt;.jar \
</span></span><span class="line"><span class="cl">     -Ddd.tags=datacenter:njc,&lt;TAG_KEY&gt;:&lt;TAG_VALUE&gt; \
</span></span><span class="line"><span class="cl">     -jar &lt;YOUR_APPLICATION_PATH&gt;.jar
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="set-errors-on-a-span-java">Set errors on a span</h3>
        <p>
          To customize an error associated with one of your spans, set the error
          tag on the span and use <code>Span.log()</code> to set an &quot;error
          event&quot;. The error event is a
          <code>Map&lt;String,Object&gt;</code> containing a
          <code>Fields.ERROR_OBJECT-&gt;Throwable</code> entry, a
          <code>Fields.MESSAGE-&gt;String</code>, or both.
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.tag.Tags</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.util.GlobalTracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.log.Fields</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="o">...</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Get active span if not available in current method
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="kd">final</span> <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">().</span><span class="na">activeSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="k">if</span> <span class="o">(</span><span class="n">span</span> <span class="o">!=</span> <span class="kc">null</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="n">Tags</span><span class="o">.</span><span class="na">ERROR</span><span class="o">,</span> <span class="kc">true</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">log</span><span class="o">(</span><span class="n">Collections</span><span class="o">.</span><span class="na">singletonMap</span><span class="o">(</span><span class="n">Fields</span><span class="o">.</span><span class="na">ERROR_OBJECT</span><span class="o">,</span> <span class="n">ex</span><span class="o">));</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          <strong>Note</strong>: <code>Span.log()</code> is a generic
          OpenTracing mechanism for associating events to the current timestamp.
          The Java Tracer only supports logging error events. Alternatively, you
          can set error tags directly on the span without <code>log()</code>:
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.tag.Tags</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.util.GlobalTracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">datadog.trace.api.DDTags</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">java.io.PrintWriter</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">java.io.StringWriter</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="o">...</span>
</span></span><span class="line"><span class="cl">    <span class="kd">final</span> <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">().</span><span class="na">activeSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="k">if</span> <span class="o">(</span><span class="n">span</span> <span class="o">!=</span> <span class="kc">null</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="n">Tags</span><span class="o">.</span><span class="na">ERROR</span><span class="o">,</span> <span class="kc">true</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="n">DDTags</span><span class="o">.</span><span class="na">ERROR_MSG</span><span class="o">,</span> <span class="n">ex</span><span class="o">.</span><span class="na">getMessage</span><span class="o">());</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="n">DDTags</span><span class="o">.</span><span class="na">ERROR_TYPE</span><span class="o">,</span> <span class="n">ex</span><span class="o">.</span><span class="na">getClass</span><span class="o">().</span><span class="na">getName</span><span class="o">());</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">      <span class="kd">final</span> <span class="n">StringWriter</span> <span class="n">errorString</span> <span class="o">=</span> <span class="k">new</span> <span class="n">StringWriter</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">      <span class="n">ex</span><span class="o">.</span><span class="na">printStackTrace</span><span class="o">(</span><span class="k">new</span> <span class="n">PrintWriter</span><span class="o">(</span><span class="n">errorString</span><span class="o">));</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="n">DDTags</span><span class="o">.</span><span class="na">ERROR_STACK</span><span class="o">,</span> <span class="n">errorString</span><span class="o">.</span><span class="na">toString</span><span class="o">());</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          <strong>Note</strong>: You can add any relevant error metadata listed
          in the <a href="/tracing/glossary/#trace">trace view docs</a>. If the
          current span isn't the root span, mark it as an error by using the
          <code>dd-trace-api</code> library to grab the root span with
          <code>MutableSpan</code>, then use <code>setError(true)</code>. See
          the
          <a
            href="/tracing/custom_instrumentation/java/#set-tags-errors-on-a-root-span-from-a-child-span"
            >setting tags &amp; errors on a root span</a
          >
          section for more details.
        </p>
        <h3 id="set-tags-errors-root-span-java">
          Set tags and errors on a root span from a child span
        </h3>
        <p>
          When an event or condition happens downstream, you may want that
          behavior or value reflected as a tag on the top level or root span.
          This can be useful to count an error or for measuring performance, or
          setting a dynamic tag for observability.
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">java.util.Collections</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Scope</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">datadog.trace.api.interceptor.MutableSpan</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.log.Fields</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.util.GlobalTracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.util.Tracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Tracer</span> <span class="n">tracer</span> <span class="o">=</span> <span class="n">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">();</span>
</span></span><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="na">buildSpan</span><span class="o">(</span><span class="s">&#34;&lt;OPERATION_NAME&gt;&#34;</span><span class="o">).</span><span class="na">start</span><span class="o">();</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Note: The scope in the try with resource block below
</span></span></span><span class="line"><span class="cl"><span class="c1">// will be automatically closed at the end of the code block.
</span></span></span><span class="line"><span class="cl"><span class="c1">// If you do not use a try with resource statement, you need
</span></span></span><span class="line"><span class="cl"><span class="c1">// to call scope.close().
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">try</span> <span class="o">(</span><span class="kd">final</span> <span class="n">Scope</span> <span class="n">scope</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="na">activateSpan</span><span class="o">(</span><span class="n">span</span><span class="o">))</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// exception thrown here
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="kd">final</span> <span class="n">Exception</span> <span class="n">e</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Set error tag on span as normal
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="n">span</span><span class="o">.</span><span class="na">log</span><span class="o">(</span><span class="n">Collections</span><span class="o">.</span><span class="na">singletonMap</span><span class="o">(</span><span class="n">Fields</span><span class="o">.</span><span class="na">ERROR_OBJECT</span><span class="o">,</span> <span class="n">e</span><span class="o">));</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// Set error on root span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="k">if</span> <span class="o">(</span><span class="n">span</span> <span class="k">instanceof</span> <span class="n">MutableSpan</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">MutableSpan</span> <span class="n">localRootSpan</span> <span class="o">=</span> <span class="o">((</span><span class="n">MutableSpan</span><span class="o">)</span> <span class="n">span</span><span class="o">).</span><span class="na">getLocalRootSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">localRootSpan</span><span class="o">.</span><span class="na">setError</span><span class="o">(</span><span class="kc">true</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">        <span class="n">localRootSpan</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="s">&#34;some.other.tag&#34;</span><span class="o">,</span> <span class="s">&#34;value&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span> <span class="k">finally</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Close span in a finally block
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="n">span</span><span class="o">.</span><span class="na">finish</span><span class="o">();</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          If you are not manually creating a span, you can still access the root
          span through the <code>GlobalTracer</code>:
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.util.GlobalTracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">datadog.trace.api.interceptor.MutableSpan</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="o">...</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">().</span><span class="na">activeSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl"><span class="k">if</span> <span class="o">(</span><span class="n">span</span> <span class="o">!=</span> <span class="kc">null</span> <span class="o">&amp;&amp;</span> <span class="o">(</span><span class="n">span</span> <span class="k">instanceof</span> <span class="n">MutableSpan</span><span class="o">))</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">MutableSpan</span> <span class="n">localRootSpan</span> <span class="o">=</span> <span class="o">((</span><span class="n">MutableSpan</span><span class="o">)</span> <span class="n">span</span><span class="o">).</span><span class="na">getLocalRootSpan</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// do stuff with root span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          <strong>Note</strong>: Although <code>MutableSpan</code> and
          <code>Span</code> share many similar methods, they are distinct types.
          <code>MutableSpan</code> is Datadog specific and not part of the
          OpenTracing API.
        </p>
        <h2 id="adding-spans-java">Adding spans</h2>
        <p>
          If you aren't using a
          <a href="/tracing/setup/java/#compatibility"
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
        <h3 id="datadog-trace-methods-java">Datadog trace methods</h3>
        <p>
          Using the <code>dd.trace.methods</code> system property, you can get
          visibility into unsupported frameworks without changing application
          code.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-text">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl">java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession] -jar path/to/application.jar
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To trace several functions within the same class, use the following
          syntax:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-text">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl">java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession,loadSession] -jar path/to/application.jar
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          The only difference between this approach and using
          <code>@Trace</code> annotations is the customization options for the
          operation and resource names. With DD Trace Methods,
          <code>operationName</code> is <code>trace.annotation</code> and
          <code>resourceName</code> is <code>SessionManager.saveSession</code>.
        </p>
        <h3 id="trace-annotations-java">Trace annotations</h3>
        <p>
          Add <code>@Trace</code> to methods to have them be traced when running
          with <code>dd-java-agent.jar</code>. If the Agent is not attached,
          this annotation has no effect on your application.
        </p>
        <p>
          Datadog's Trace annotation is provided by the
          <a
            href="https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api"
            >dd-trace-api dependency</a
          >.
        </p>
        <p>
          The available arguments for the <code>@Trace</code> annotation are:
        </p>
        <ul>
          <li>
            <code>operationName</code>: Set the operation name for the trace
            (default: The method's name).
          </li>
          <li>
            <code>resourceName</code>: Set the resource name for the trace
            (default: The same value as <code>operationName</code>).
          </li>
          <li>
            <code>noParent</code>: Set to <code>true</code> to always start a
            new trace at that method. Supported from v1.22.0+ of
            <code>dd-trace-java</code> (default: <code>false</code>).
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">datadog.trace.api.Trace</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SessionManager</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="nd">@Trace</span><span class="o">(</span><span class="n">operationName</span> <span class="o">=</span> <span class="s">&#34;database.persist&#34;</span><span class="o">,</span> <span class="n">resourceName</span> <span class="o">=</span> <span class="s">&#34;SessionManager.saveSession&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">saveSession</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// your method implementation here
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          <strong>Note</strong>: Through the
          <code>dd.trace.annotations</code> system property, other tracing
          method annotations can be recognized by Datadog as
          <code>@Trace</code>. You can find a list in
          <a
            href="https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37"
            >TraceAnnotationsInstrumentation.java</a
          >
          if you have previously decorated your code.
        </p>
        <h3 id="manually-creating-a-new-span-java">
          Manually creating a new span
        </h3>
        <p>
          In addition to automatic instrumentation, the
          <code>@Trace</code> annotation, and
          <code>dd.trace.methods</code> configurations , you can customize your
          observability by programmatically creating spans around any block of
          code. Spans created in this manner integrate with other tracing
          mechanisms automatically. In other words, if a trace has already
          started, the manual span will have its caller as its parent span.
          Similarly, any traced methods called from the wrapped block of code
          will have the manual span as its parent.
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">datadog.trace.api.DDTags</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Scope</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Span</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.Tracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">io.opentracing.util.GlobalTracer</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">SomeClass</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="kt">void</span> <span class="nf">someMethod</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">Tracer</span> <span class="n">tracer</span> <span class="o">=</span> <span class="n">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="c1">// Service and resource name tags are required.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// You can set them when creating the span:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="n">Span</span> <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="na">buildSpan</span><span class="o">(</span><span class="s">&#34;&lt;OPERATION_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">            <span class="o">.</span><span class="na">withTag</span><span class="o">(</span><span class="n">DDTags</span><span class="o">.</span><span class="na">SERVICE_NAME</span><span class="o">,</span> <span class="s">&#34;&lt;SERVICE_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">            <span class="o">.</span><span class="na">withTag</span><span class="o">(</span><span class="n">DDTags</span><span class="o">.</span><span class="na">RESOURCE_NAME</span><span class="o">,</span> <span class="s">&#34;&lt;RESOURCE_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">            <span class="o">.</span><span class="na">start</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Note: The scope in the try with resource block below
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// will be automatically closed at the end of the code block.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// If you do not use a try with resource statement, you need
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// to call scope.close().
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="k">try</span> <span class="o">(</span><span class="n">Scope</span> <span class="n">scope</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="na">activateSpan</span><span class="o">(</span><span class="n">span</span><span class="o">))</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Alternatively, set tags after creation
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>            <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="s">&#34;my.tag&#34;</span><span class="o">,</span> <span class="s">&#34;value&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">            <span class="c1">// The code you&#39;re tracing
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="n">Exception</span> <span class="n">e</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Set error on span
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="o">}</span> <span class="k">finally</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Close span in a finally block
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>            <span class="n">span</span><span class="o">.</span><span class="na">finish</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="extending-tracers-java">Extending tracers</h3>
        <p>
          The tracing libraries are designed to be extensible. Customers may
          consider writing a custom post-processor called a
          <code>TraceInterceptor</code> to intercept Spans then adjust or
          discard them accordingly (for example, based on regular expressions).
          The following example implements two interceptors to achieve complex
          post-processing logic.
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">java.util.List</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">java.util.ArrayList</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">java.util.Collection</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">java.util.Map</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">datadog.trace.api.interceptor.TraceInterceptor</span><span class="o">;</span>
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">datadog.trace.api.interceptor.MutableSpan</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">FilteringInterceptor</span> <span class="kd">implements</span> <span class="n">TraceInterceptor</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="n">Collection</span><span class="o">&lt;?</span> <span class="kd">extends</span> <span class="n">MutableSpan</span><span class="o">&gt;</span> <span class="nf">onTraceComplete</span><span class="o">(</span>
</span></span><span class="line"><span class="cl">            <span class="n">Collection</span><span class="o">&lt;?</span> <span class="kd">extends</span> <span class="n">MutableSpan</span><span class="o">&gt;</span> <span class="n">trace</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">List</span><span class="o">&lt;</span><span class="n">MutableSpan</span><span class="o">&gt;</span> <span class="n">filteredTrace</span> <span class="o">=</span> <span class="k">new</span> <span class="n">ArrayList</span><span class="o">&lt;&gt;();</span>
</span></span><span class="line"><span class="cl">        <span class="k">for</span> <span class="o">(</span><span class="kd">final</span> <span class="n">MutableSpan</span> <span class="n">span</span> <span class="o">:</span> <span class="n">trace</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">          <span class="n">String</span> <span class="n">orderId</span> <span class="o">=</span> <span class="o">(</span><span class="n">String</span><span class="o">)</span> <span class="n">span</span><span class="o">.</span><span class="na">getTags</span><span class="o">().</span><span class="na">get</span><span class="o">(</span><span class="s">&#34;order.id&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">          <span class="c1">// Drop spans when the order id starts with &#34;TEST-&#34;
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>          <span class="k">if</span> <span class="o">(</span><span class="n">orderId</span> <span class="o">==</span> <span class="kc">null</span> <span class="o">||</span> <span class="o">!</span><span class="n">orderId</span><span class="o">.</span><span class="na">startsWith</span><span class="o">(</span><span class="s">&#34;TEST-&#34;</span><span class="o">))</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">filteredTrace</span><span class="o">.</span><span class="na">add</span><span class="o">(</span><span class="n">span</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">          <span class="o">}</span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="k">return</span> <span class="n">filteredTrace</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">int</span> <span class="nf">priority</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// some high unique number so this interceptor is last
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="k">return</span> <span class="n">100</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">PricingInterceptor</span> <span class="kd">implements</span> <span class="n">TraceInterceptor</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="n">Collection</span><span class="o">&lt;?</span> <span class="kd">extends</span> <span class="n">MutableSpan</span><span class="o">&gt;</span> <span class="nf">onTraceComplete</span><span class="o">(</span>
</span></span><span class="line"><span class="cl">            <span class="n">Collection</span><span class="o">&lt;?</span> <span class="kd">extends</span> <span class="n">MutableSpan</span><span class="o">&gt;</span> <span class="n">trace</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="k">for</span> <span class="o">(</span><span class="kd">final</span> <span class="n">MutableSpan</span> <span class="n">span</span> <span class="o">:</span> <span class="n">trace</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">          <span class="n">Map</span><span class="o">&lt;</span><span class="n">String</span><span class="o">,</span> <span class="n">Object</span><span class="o">&gt;</span> <span class="n">tags</span> <span class="o">=</span> <span class="n">span</span><span class="o">.</span><span class="na">getTags</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">          <span class="n">Double</span> <span class="n">originalPrice</span> <span class="o">=</span> <span class="o">(</span><span class="n">Double</span><span class="o">)</span> <span class="n">tags</span><span class="o">.</span><span class="na">get</span><span class="o">(</span><span class="s">&#34;order.price&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">          <span class="n">Double</span> <span class="n">discount</span> <span class="o">=</span> <span class="o">(</span><span class="n">Double</span><span class="o">)</span> <span class="n">tags</span><span class="o">.</span><span class="na">get</span><span class="o">(</span><span class="s">&#34;order.discount&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">          <span class="c1">// Set a tag from a calculation from other tags
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>          <span class="k">if</span> <span class="o">(</span><span class="n">originalPrice</span> <span class="o">!=</span> <span class="kc">null</span> <span class="o">&amp;&amp;</span> <span class="n">discount</span> <span class="o">!=</span> <span class="kc">null</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">span</span><span class="o">.</span><span class="na">setTag</span><span class="o">(</span><span class="s">&#34;order.value&#34;</span><span class="o">,</span> <span class="n">originalPrice</span> <span class="o">-</span> <span class="n">discount</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">          <span class="o">}</span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="k">return</span> <span class="n">trace</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">int</span> <span class="nf">priority</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">return</span> <span class="n">20</span><span class="o">;</span> <span class="c1">// some unique number
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Near the start of your application, register the interceptors with the
          following:
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
              ><code><span class="line"><span class="cl"><span class="n">datadog</span><span class="o">.</span><span class="na">trace</span><span class="o">.</span><span class="na">api</span><span class="o">.</span><span class="na">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">().</span><span class="na">addTraceInterceptor</span><span class="o">(</span><span class="k">new</span> <span class="n">FilteringInterceptor</span><span class="o">());</span>
</span></span><span class="line"><span class="cl"><span class="n">datadog</span><span class="o">.</span><span class="na">trace</span><span class="o">.</span><span class="na">api</span><span class="o">.</span><span class="na">GlobalTracer</span><span class="o">.</span><span class="na">get</span><span class="o">().</span><span class="na">addTraceInterceptor</span><span class="o">(</span><span class="k">new</span> <span class="n">PricingInterceptor</span><span class="o">());</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="trace-client-agent-config-java">
          Trace client and Agent configuration
        </h2>
        <p>
          There are additional configurations possible for both the tracing
          client and Datadog Agent for context propagation, as well as to
          exclude specific Resources from sending traces to Datadog in the event
          these traces are not wanted to count in metrics calculated, such as
          Health Checks.
        </p>
        <h3 id="propagating-context-java">
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
        <h3 id="resource-filtering-java">Resource filtering</h3>
        <p>
          Traces can be excluded based on their resource name, to remove
          synthetic traffic such as health checks from reporting traces to
          Datadog. This and other security and fine-tuning configurations can be
          found on the <a href="/tracing/security">Security</a> page or in
          <a href="/tracing/guide/ignoring_apm_resources/"
            >Ignoring Unwanted Resources</a
          >.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Python"
        data-if="226"
      >
        <p>
          If you have not read the setup instructions for automatic
          instrumentation, start with the
          <a href="/tracing/setup/python/">Python Setup Instructions</a>.
        </p>
        <p>
          If you aren't using supported library instrumentation (see
          <a href="/tracing/compatibility_requirements/python"
            >library compatibility</a
          >), you may want to manually instrument your code.
        </p>
        <p>
          You may also want to extend the functionality of the
          <code>ddtrace</code> library or gain finer control over instrumenting
          your application. Several techniques are provided by the library to
          accomplish this.
        </p>
        <h2 id="creating-spans-python">Creating spans</h2>
        <p>
          The <code>ddtrace</code> library creates spans automatically with
          <code>ddtrace-run</code> for
          <a href="/tracing/compatibility_requirements/python"
            >many libraries and frameworks</a
          >. However, you may want to gain visibility into your own code and
          this is achieved by using spans.
        </p>
        <p>
          Within your web request (for example,
          <code>make_sandwich_request</code>), you may perform several
          operations, like <code>get_ingredients()</code> and
          <code>assemble_sandwich()</code>, which are useful to measure.
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
              ><code><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">make_sandwich_request</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="n">ingredients</span> <span class="o">=</span> <span class="n">get_ingredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="n">sandwich</span> <span class="o">=</span> <span class="n">assemble_sandwich</span><span class="p">(</span><span class="n">ingredients</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="using-decorators-python">Using decorators</h3>
        <p>
          <code>ddtrace</code> provides a decorator
          <code>tracer.wrap()</code> that can be used to decorate the functions
          of interest. This is useful if you would like to trace the function
          regardless of where it is being called from.
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nd">@tracer.wrap</span><span class="p">(</span><span class="n">service</span><span class="o">=</span><span class="s2">&#34;my-sandwich-making-svc&#34;</span><span class="p">,</span> <span class="n">resource</span><span class="o">=</span><span class="s2">&#34;resource_name&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">get_ingredients</span><span class="p">():</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># go to the pantry</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># go to the fridge</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># maybe go to the store</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># You can provide more information to customize the span</span>
</span></span><span class="line"><span class="cl"><span class="nd">@tracer.wrap</span><span class="p">(</span><span class="s2">&#34;assemble_sandwich&#34;</span><span class="p">,</span> <span class="n">service</span><span class="o">=</span><span class="s2">&#34;my-sandwich-making-svc&#34;</span><span class="p">,</span> <span class="n">resource</span><span class="o">=</span><span class="s2">&#34;resource_name&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">assemble_sandwich</span><span class="p">(</span><span class="n">ingredients</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To learn more, read
          <a
            href="https://ddtrace.readthedocs.io/en/stable/api.html#ddtrace.Tracer.wrap"
            >API details for the decorator for
            <code>ddtrace.Tracer.wrap()</code></a
          >.
        </p>
        <h3 id="using-context-managers-python">Using context managers</h3>
        <p>
          To trace an arbitrary block of code, use the
          <code>ddtrace.Span</code> context manager as below, or view the
          <a
            href="https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span"
            >advanced usage documentation</a
          >.
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">make_sandwich_request</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># Capture both operations in a span</span>
</span></span><span class="line"><span class="cl">    <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;sandwich.make&#34;</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">        <span class="n">ingredients</span> <span class="o">=</span> <span class="n">get_ingredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="n">sandwich</span> <span class="o">=</span> <span class="n">assemble_sandwich</span><span class="p">(</span><span class="n">ingredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">make_sandwich_request</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># Capture both operations in a span</span>
</span></span><span class="line"><span class="cl">    <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;sandwich.create&#34;</span><span class="p">,</span> <span class="n">resource</span><span class="o">=</span><span class="s2">&#34;resource_name&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">outer_span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;get_ingredients&#34;</span><span class="p">,</span> <span class="n">resource</span><span class="o">=</span><span class="s2">&#34;resource_name&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">            <span class="n">ingredients</span> <span class="o">=</span> <span class="n">get_ingredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;assemble_sandwich&#34;</span><span class="p">,</span> <span class="n">resource</span><span class="o">=</span><span class="s2">&#34;resource_name&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">            <span class="n">sandwich</span> <span class="o">=</span> <span class="n">assemble_sandwich</span><span class="p">(</span><span class="n">ingredients</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To learn more, read the full
          <a
            href="https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer"
            >API details for <code>ddtrace.Tracer()</code></a
          >.
        </p>
        <h3 id="manual-span-creation-python">Manual span creation</h3>
        <p>
          If the decorator and context manager methods are still not enough to
          satisfy your tracing needs, a manual API is provided which allows you
          to start and finish
          <a href="/tracing/glossary/#spans">spans</a> however you may require:
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
              ><code><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">make_sandwich_request</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;sandwich.create&#34;</span><span class="p">,</span> <span class="n">resource</span><span class="o">=</span><span class="s2">&#34;resource_name&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">ingredients</span> <span class="o">=</span> <span class="n">get_ingredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="n">sandwich</span> <span class="o">=</span> <span class="n">assemble_sandwich</span><span class="p">(</span><span class="n">ingredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">finish</span><span class="p">()</span>  <span class="c1"># remember to finish the span</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          For more API details of the decorator, read the
          <a
            href="https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace"
            ><code>ddtrace.Tracer.trace</code> documentation</a
          >
          or the
          <a
            href="https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish"
            ><code>ddtrace.Span.finish</code> documentation</a
          >.
        </p>
        <h2 id="accessing-active-spans-python">Accessing active spans</h2>
        <p>
          The built-in instrumentation and your own custom instrumentation
          create spans around meaningful operations. You can access the active
          span in order to include meaningful data.
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">make_sandwich_request</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># Capture both operations in a span</span>
</span></span><span class="line"><span class="cl">    <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;sandwich.make&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">my_span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">        <span class="n">ingredients</span> <span class="o">=</span> <span class="n">get_ingredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="n">sandwich</span> <span class="o">=</span> <span class="n">assemble_sandwich</span><span class="p">(</span><span class="n">ingredients</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="current-span-python">Current span</h3>
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
              ><code><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">get_ingredients</span><span class="p">():</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># Get the active span</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="n">current_span</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># this span is my_span from make_sandwich_request above</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="root-span-python">Root span</h3>
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
              ><code><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">assemble_sandwich</span><span class="p">(</span><span class="n">ingredients</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;another.operation&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">another_span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">        <span class="c1"># Get the active root span</span>
</span></span><span class="line"><span class="cl">        <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="n">current_root_span</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="c1"># this span is my_span from make_sandwich_request above</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="adding-tags-python">Adding tags</h2>
        <h3 id="adding-tags-locally-python">Adding tags locally</h3>
        <p>
          Tags can be added to a span using the <code>set_tag</code> method on a
          span:
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">make_sandwich_request</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;sandwich.make&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">        <span class="n">ingredients</span> <span class="o">=</span> <span class="n">get_ingredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="n">span</span><span class="o">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s2">&#34;num_ingredients&#34;</span><span class="p">,</span> <span class="nb">len</span><span class="p">(</span><span class="n">ingredients</span><span class="p">))</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-globally-python">Adding tags globally</h3>
        <p>
          Tags can be globally set on the tracer. These tags are be applied to
          every span that is created.
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
</span></span><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">myapp</span> <span class="kn">import</span> <span class="n">__version__</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># This will be applied to every span</span>
</span></span><span class="line"><span class="cl"><span class="n">tracer</span><span class="o">.</span><span class="n">set_tags</span><span class="p">({</span><span class="s2">&#34;version&#34;</span><span class="p">:</span> <span class="n">__version__</span><span class="p">,</span> <span class="s2">&#34;&lt;TAG_KEY_2&gt;&#34;</span><span class="p">:</span> <span class="s2">&#34;&lt;TAG_VALUE_2&gt;&#34;</span><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="setting-errors-on-a-span-python">Setting errors on a span</h3>
        <p>
          Exception information is captured and attached to a span if there is
          one active when the exception is raised.
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;throws.an.error&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">    <span class="k">raise</span> <span class="ne">Exception</span><span class="p">(</span><span class="s2">&#34;Oops!&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># `span` will be flagged as erroneous and have</span>
</span></span><span class="line"><span class="cl"><span class="c1"># the stack trace and exception message attached as tags</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>Flagging a span as erroneous can also be done manually:</p>
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;operation&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">error</span> <span class="o">=</span> <span class="mi">1</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="o">.</span><span class="n">finish</span><span class="p">()</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          In the event you want to flag the local root span with the error
          raised:
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
              ><code><span class="line"><span class="cl"><span class="kn">import</span> <span class="nn">os</span>
</span></span><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">ddtrace</span> <span class="kn">import</span> <span class="n">tracer</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">try</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">    <span class="k">raise</span> <span class="ne">TypeError</span>
</span></span><span class="line"><span class="cl"><span class="k">except</span> <span class="ne">TypeError</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">    <span class="n">root_span</span> <span class="o">=</span> <span class="n">tracer</span><span class="o">.</span><span class="n">current_root_span</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">(</span><span class="n">exc_type</span><span class="p">,</span> <span class="n">exc_val</span><span class="p">,</span> <span class="n">exc_tb</span><span class="p">)</span> <span class="o">=</span> <span class="n">sys</span><span class="o">.</span><span class="n">exc_info</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># this sets the error type, marks the span as an error, and adds the traceback</span>
</span></span><span class="line"><span class="cl">    <span class="n">root_span</span><span class="o">.</span><span class="n">set_exc_info</span><span class="p">(</span><span class="n">exc_type</span><span class="p">,</span> <span class="n">exc_val</span><span class="p">,</span> <span class="n">exc_tb</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="propagating-context-python">
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
        <h3 id="baggage-python">Baggage</h3>
        <p>
          Manipulating
          <a href="/tracing/trace_collection/trace_context_propagation/#baggage"
            >Baggage</a
          >
          on a span:
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
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># Start a new span and set baggage</span>
</span></span><span class="line"><span class="cl"><span class="k">with</span> <span class="n">tracer</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s2">&#34;example&#34;</span><span class="p">)</span> <span class="k">as</span> <span class="n">span</span><span class="p">:</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># set_baggage_item</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">set_baggage_item</span><span class="p">(</span><span class="s2">&#34;key1&#34;</span><span class="p">,</span> <span class="s2">&#34;value1&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">set_baggage_item</span><span class="p">(</span><span class="s2">&#34;key2&#34;</span><span class="p">,</span> <span class="s2">&#34;value2&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># get_all_baggage_items</span>
</span></span><span class="line"><span class="cl">    <span class="n">all_baggage</span> <span class="o">=</span> <span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">get_all_baggage_items</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="nb">print</span><span class="p">(</span><span class="n">all_baggage</span><span class="p">)</span> <span class="c1"># {&#39;key1&#39;: &#39;value1&#39;, &#39;key2&#39;: &#39;value2&#39;}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># remove_baggage_item</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">remove_baggage_item</span><span class="p">(</span><span class="s2">&#34;key1&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="nb">print</span><span class="p">(</span><span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">get_all_baggage_items</span><span class="p">())</span> <span class="c1"># {&#39;key2&#39;: &#39;value2&#39;}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># get_baggage_item</span>
</span></span><span class="line"><span class="cl">    <span class="nb">print</span><span class="p">(</span><span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">get_baggage_item</span><span class="p">(</span><span class="s2">&#34;key1&#34;</span><span class="p">))</span> <span class="c1"># None</span>
</span></span><span class="line"><span class="cl">    <span class="nb">print</span><span class="p">(</span><span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">get_baggage_item</span><span class="p">(</span><span class="s2">&#34;key2&#34;</span><span class="p">))</span> <span class="c1"># value2</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># remove_all_baggage_items</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">remove_all_baggage_items</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="nb">print</span><span class="p">(</span><span class="n">span</span><span class="o">.</span><span class="n">context</span><span class="o">.</span><span class="n">get_all_baggage_items</span><span class="p">())</span> <span class="c1"># {}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To see an example in action, see
          <a
            href="https://github.com/DataDog/trace-examples/tree/master/python/flask-baggage"
            >flask-baggage on trace-examples</a
          >.
        </p>
        <h2 id="ddtrace-api-python">ddtrace-api</h2>
        <div class="alert alert-info">
          <p>
            The <code>ddtrace-api</code> Python package is in Preview and may
            not include all the API calls you need. If you need more complete
            functionality, use the API as described in the previous sections.
          </p>
        </div>
        <p>
          The
          <a href="https://pypi.org/project/ddtrace-api/"
            >ddtrace-api package</a
          >
          provides a stable public API for Datadog APM's custom Python
          instrumentation. This package implements only the API interface, not
          the underlying functionality that creates and sends spans to Datadog.
        </p>
        <p>
          This separation between interface (<code>ddtrace-api</code>) and
          implementation (<code>ddtrace</code>) offers several benefits:
        </p>
        <ul>
          <li>
            You can rely on an API that changes less frequently and more
            predictably for your custom instrumentation
          </li>
          <li>
            If you only use automatic instrumentation, you can ignore API
            changes entirely
          </li>
          <li>
            If you implement both single-step and custom instrumentation, you
            avoid depending on multiple copies of the
            <code>ddtrace</code> package
          </li>
        </ul>
        <p>To use <code>ddtrace-api</code>:</p>
        <ol>
          <li>
            <p>
              Install both the <code>ddtrace</code> and
              <code>ddtrace-api</code> libraries:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-python">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="n">pip</span> <span class="n">install</span> <span class="s1">&#39;ddtrace&gt;=3.1&#39;</span> <span class="n">ddtrace</span><span class="o">-</span><span class="n">api</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              Instrument your Python application using
              <code>ddtrace-run</code> by prefixing your Python entry-point
              command:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-shell">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl">ddtrace-run python app.py
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              After this is set up, you can write custom instrumentation exactly
              like the examples in the previous sections, but you import from
              <code>ddtrace_api</code> instead of <code>ddtrace</code>.
            </p>
            <p>For example:</p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-python">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kn">from</span> <span class="nn">ddtrace_api</span> <span class="kn">import</span> <span class="n">tracer</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nd">@tracer.wrap</span><span class="p">(</span><span class="n">service</span><span class="o">=</span><span class="s2">&#34;my-sandwich-making-svc&#34;</span><span class="p">,</span> <span class="n">resource</span><span class="o">=</span><span class="s2">&#34;resource_name&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">get_ingredients</span><span class="p">():</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># go to the pantry</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># go to the fridge</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># maybe go to the store</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
        <p>
          See that package's
          <a href="https://datadoghq.dev/dd-trace-api-py/pdocs/ddtrace_api.html"
            >API definition</a
          >
          for the full list of supported API calls.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Node.js"
        data-if="227"
      >
        <div class="alert alert-info">
          <p>
            If you have not yet read the setup instructions for automatic
            instrumentation and setup, start with the
            <a href="/tracing/setup/nodejs/">Node.js Setup Instructions</a>.
          </p>
        </div>
        <p>
          If you aren't using supported library instrumentation (see
          <a href="/tracing/compatibility_requirements/nodejs/"
            >library compatibility</a
          >), you may want to manually instrument your code.
        </p>
        <p>
          You may also want to extend the functionality of the
          <code>dd-trace</code> library or gain finer control over instrumenting
          your application. Several techniques are provided by the library to
          accomplish this.
        </p>
        <h2 id="adding-tags-nodejs">Adding tags</h2>
        <p>
          The built-in instrumentation and your own custom instrumentation
          create spans around meaningful operations.
        </p>
        <h3 id="adding-tags-locally-nodejs">Adding tags locally</h3>
        <p>
          You can access the active span in order to include meaningful data by
          adding tags.
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
              ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">span</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">scope</span><span class="p">().</span><span class="nx">active</span><span class="p">()</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To learn more, read
          <a href="https://datadoghq.dev/dd-trace-js/interfaces/Scope.html"
            >API details for <code>Scope</code></a
          >.
        </p>
        <p>
          You can add tags to a span using the <code>setTag</code> or
          <code>addTags</code> method on a span. Supported value types are
          string, number, and object.
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
              ><code><span class="line"><span class="cl"><span class="c1">// add a foo:bar tag
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span><span class="p">.</span><span class="nx">setTag</span><span class="p">(</span><span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="s1">&#39;bar&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// add a user_id:5 tag
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span><span class="p">.</span><span class="nx">setTag</span><span class="p">(</span><span class="s1">&#39;user_id&#39;</span><span class="p">,</span> <span class="mi">5</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// add a obj.first:foo and obj.second:bar tags
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span><span class="p">.</span><span class="nx">setTag</span><span class="p">(</span><span class="s1">&#39;obj&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">first</span><span class="o">:</span> <span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="nx">second</span><span class="o">:</span> <span class="s1">&#39;bar&#39;</span> <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// add a foo:bar and baz:qux tags
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span><span class="p">.</span><span class="nx">addTags</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="nx">foo</span><span class="o">:</span> <span class="s1">&#39;bar&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">baz</span><span class="o">:</span> <span class="s1">&#39;qux&#39;</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-globally-nodejs">Adding tags globally</h3>
        <p>
          You can add tags to every span by configuring them directly on the
          tracer, either with the comma-separated
          <code>DD_TAGS</code> environment variable or with the
          <code>tags</code> option on the tracer initialization:
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
              ><code><span class="line"><span class="cl"><span class="c1">// equivalent to DD_TAGS=foo:bar,baz:qux
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">tracer</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="nx">tags</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">foo</span><span class="o">:</span> <span class="s1">&#39;bar&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">baz</span><span class="o">:</span> <span class="s1">&#39;qux&#39;</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// All spans will now have these tags
</span></span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-through-component-hooks-nodejs">
          Adding tags through component hooks
        </h3>
        <p>
          Some Datadog integrations support span hooks that can be used to
          update the span right before it's finished. This is useful to modify
          or add tags to a span that is otherwise inaccessible from your code.
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
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">tracer</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="s1">&#39;express&#39;</span><span class="p">,</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// hook will be executed right before the request span is finished
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="nx">hooks</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">request</span><span class="o">:</span> <span class="p">(</span><span class="nx">span</span><span class="p">,</span> <span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nx">span</span><span class="p">.</span><span class="nx">setTag</span><span class="p">(</span><span class="s1">&#39;customer.id&#39;</span><span class="p">,</span> <span class="nx">req</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">customer_id</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To learn more, read
          <a href="https://datadoghq.dev/dd-trace-js/modules/plugins.html"
            >API details for individual plugins</a
          >.
        </p>
        <h3 id="setting-errors-on-a-span-nodejs">Setting errors on a span</h3>
        <p>
          Errors can be added to a span with the special <code>error</code> tag
          that supports error objects. This splits the error into three tags:
          <code>error.type</code>, <code>error.message</code>, and
          <code>error.stack</code>.
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
              ><code><span class="line"><span class="cl"><span class="k">try</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">getIngredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">span</span><span class="p">.</span><span class="nx">setTag</span><span class="p">(</span><span class="s1">&#39;error&#39;</span><span class="p">,</span> <span class="nx">e</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          When using <code>tracer.trace()</code> or
          <code>tracer.wrap()</code> this is done automatically when an error is
          thrown.
        </p>
        <h2 id="creating-spans-nodejs">Creating spans</h2>
        <p>
          The <code>dd-trace</code> library creates
          <a href="/tracing/glossary/#spans">spans</a> automatically with
          <code>tracer.init()</code> for
          <a href="/tracing/compatibility_requirements/nodejs/"
            >many libraries and frameworks</a
          >. However, you may want to gain visibility into your own code and
          this is achieved using spans.
        </p>
        <p>
          Within your web request (for example, <code>/make-sandwich</code>),
          you may perform several operations, like
          <code>getIngredients()</code> and <code>assembleSandwich()</code>,
          which are useful to measure.
        </p>
        <h3 id="synchronous-code-nodejs">Synchronous code</h3>
        <p>
          Synchronous code can be traced with <code>tracer.trace()</code> which
          automatically finishes the span when its callback returns and captures
          any thrown error automatically.
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
              ><code><span class="line"><span class="cl"><span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/make-sandwich&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="kr">const</span> <span class="nx">sandwich</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;sandwich.make&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kr">const</span> <span class="nx">ingredients</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;get_ingredients&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="k">return</span> <span class="nx">getIngredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;assemble_sandwich&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nx">assembleSandwich</span><span class="p">(</span><span class="nx">ingredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">  <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="nx">res</span><span class="p">.</span><span class="nx">end</span><span class="p">(</span><span class="nx">sandwich</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To learn more, read
          <a
            href="https://datadoghq.dev/dd-trace-js/interfaces/Tracer.html#trace"
            >API details for <code>tracer.trace()</code></a
          >.
        </p>
        <h3 id="promises-nodejs">Promises</h3>
        <p>
          Promises can be traced with <code>tracer.trace()</code> which
          automatically finishes the span when the returned promise resolves,
          and captures any rejection error automatically.
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
              ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">getIngredients</span> <span class="o">=</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="k">new</span> <span class="nb">Promise</span><span class="p">((</span><span class="nx">resolve</span><span class="p">,</span> <span class="nx">reject</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="nx">resolve</span><span class="p">(</span><span class="s1">&#39;Salami&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/make-sandwich&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;sandwich.make&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;get_ingredients&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="nx">getIngredients</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">      <span class="p">.</span><span class="nx">then</span><span class="p">((</span><span class="nx">ingredients</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">return</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;assemble_sandwich&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">          <span class="k">return</span> <span class="nx">assembleSandwich</span><span class="p">(</span><span class="nx">ingredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="p">})</span>
</span></span><span class="line"><span class="cl">      <span class="p">})</span>
</span></span><span class="line"><span class="cl">  <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="nx">sandwich</span> <span class="p">=&gt;</span> <span class="nx">res</span><span class="p">.</span><span class="nx">end</span><span class="p">(</span><span class="nx">sandwich</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="async-await-nodejs">Async/await</h3>
        <p>
          Async/await can be traced with <code>tracer.trace()</code> which
          automatically finishes the span when the returned promise resolves,
          and captures any rejection error automatically.
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
              ><code><span class="line"><span class="cl"><span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/make-sandwich&#39;</span><span class="p">,</span> <span class="kr">async</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="kr">const</span> <span class="nx">sandwich</span> <span class="o">=</span> <span class="kr">await</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;sandwich.make&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="kr">async</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kr">const</span> <span class="nx">ingredients</span> <span class="o">=</span> <span class="kr">await</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;get_ingredients&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="k">return</span> <span class="nx">getIngredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;assemble_sandwich&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="k">return</span> <span class="nx">assembleSandwich</span><span class="p">(</span><span class="nx">ingredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">  <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="nx">res</span><span class="p">.</span><span class="nx">end</span><span class="p">(</span><span class="nx">sandwich</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="wrapper-nodejs">Wrapper</h3>
        <p>
          You can wrap an existing function without changing its code. This is
          useful to trace functions for which you don't control the code. This
          can be done with <code>tracer.wrap()</code> which takes the same
          arguments as <code>tracer.trace()</code> except its last argument
          which is the function to wrap instead of a callback.
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
              ><code><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// After the functions are defined
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">getIngredients</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">wrap</span><span class="p">(</span><span class="s1">&#39;get_ingredients&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="nx">getIngredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="nx">assembleSandwich</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">wrap</span><span class="p">(</span><span class="s1">&#39;assemble_sandwich&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="nx">assembleSandwich</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Where routes are defined
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/make-sandwich&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="kr">const</span> <span class="nx">sandwich</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;sandwich.make&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kr">const</span> <span class="nx">ingredients</span> <span class="o">=</span> <span class="nx">getIngredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">assembleSandwich</span><span class="p">(</span><span class="nx">ingredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="nx">res</span><span class="p">.</span><span class="nx">end</span><span class="p">(</span><span class="nx">sandwich</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To learn more, read
          <a
            href="https://datadoghq.dev/dd-trace-js/interfaces/Tracer.html#wrap"
            >API details for <code>tracer.wrap()</code></a
          >.
        </p>
        <h2 id="request-filtering-nodejs">Request filtering</h2>
        <p>
          You may not want some requests of an application to be instrumented. A
          common case would be health checks or other synthetic traffic. These
          can be ignored by using the <code>blocklist</code> or
          <code>allowlist</code> option on the <code>http</code> plugin.
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
          This configuration can be split between client and server if needed.
          For example,
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
          Additionally, traces can be excluded based on their resource name, so
          that the Agent doesn't send them to Datadog. This and other security
          and fine-tuning Agent configurations can be found on the
          <a href="/tracing/security">Security</a> page or in
          <a href="/tracing/guide/ignoring_apm_resources/"
            >Ignoring Unwanted Resources</a
          >.
        </p>
        <h2 id="dd-trace-api-nodejs">dd-trace-api</h2>
        <div class="alert alert-info">
          <p>
            The <code>dd-trace-api</code> packages is in Preview and may not
            include all the API calls you need. If you need more complete
            functionality, use the API as described in the previous sections.
          </p>
        </div>
        <p>
          The
          <a href="https://npm.im/dd-trace-api">dd-trace-api package</a>
          provides a stable public API for Datadog APM's custom Node.js
          instrumentation. This package implements only the API interface, not
          the underlying functionality that creates and sends spans to Datadog.
        </p>
        <p>
          This separation between interface (<code>dd-trace-api</code>) and
          implementation (<code>dd-trace</code>) offers several benefits:
        </p>
        <ul>
          <li>
            You can rely on an API that changes less frequently and more
            predictably for your custom instrumentation
          </li>
          <li>
            If you only use automatic instrumentation, you can ignore API
            changes entirely
          </li>
          <li>
            If you implement both single-step and custom instrumentation, you
            avoid depending on multiple copies of the
            <code>dd-trace</code> package
          </li>
        </ul>
        <p>To use <code>dd-trace-api</code>:</p>
        <ol>
          <li>
            <p>
              Install the <code>dd-trace</code> and
              <code>dd-trace-api</code> libraries in your app.
              <strong>Note</strong>: <code>dd-trace</code> is installed for you
              with single-step instrumentation, but you need to install
              <code>dd-trace-api</code> manually in your app.
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-shell">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl">npm install dd-trace dd-trace-api
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              Instrument your Node.js application using <code>dd-trace</code>.
              If you're using single-step instrumentation, you can skip this
              step.
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-shell">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"> node --require dd-trace/init app.js
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              After this is set up, you can write custom instrumentation exactly
              like the examples in the previous sections, but you require
              <code>dd-trace-api</code> instead of <code>dd-trace</code>.
            </p>
            <p>For example:</p>
          </li>
        </ol>
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
              ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">tracer</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;dd-trace-api&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;express&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/make-sandwich&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="kr">const</span> <span class="nx">sandwich</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;sandwich.make&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kr">const</span> <span class="nx">ingredients</span> <span class="o">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;get_ingredients&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="k">return</span> <span class="nx">getIngredients</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">tracer</span><span class="p">.</span><span class="nx">trace</span><span class="p">(</span><span class="s1">&#39;assemble_sandwich&#39;</span><span class="p">,</span> <span class="p">{</span> <span class="nx">resource</span><span class="o">:</span> <span class="s1">&#39;resource_name&#39;</span> <span class="p">},</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nx">assembleSandwich</span><span class="p">(</span><span class="nx">ingredients</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">  <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="nx">res</span><span class="p">.</span><span class="nx">end</span><span class="p">(</span><span class="nx">sandwich</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          See that package's
          <a
            href="https://github.com/DataDog/dd-trace-api-js/blob/master/index.d.ts"
            >API definition</a
          >
          for the full list of supported API calls.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Go"
        data-if="228"
      >
        <div class="alert alert-info">
          <p>
            If you have not yet read the instructions for auto-instrumentation
            and setup, start with the
            <a href="/tracing/setup/go/">Go Setup Instructions</a>.
          </p>
        </div>
        <div class="alert alert-info">
          <p>
            This documentation uses v2 of the Go tracer, which Datadog
            recommends for all users. If you are using v1, see the
            <a
              href="/tracing/trace_collection/custom_instrumentation/go/migration"
              >migration guide</a
            >
            to upgrade to v2.
          </p>
        </div>
        <p>
          This page details common use cases for adding and customizing
          observability with Datadog APM.
        </p>
        <h2 id="adding-tags-go">Adding tags</h2>
        <p>
          Add custom <a href="/tracing/glossary/#span-tags">span tags</a> to
          your <a href="/tracing/glossary/#spans">spans</a> to customize your
          observability within Datadog. The span tags are applied to your
          incoming traces, allowing you to correlate observed behavior with
          code-level information such as merchant tier, checkout amount, or user
          ID.
        </p>
        <h3 id="add-custom-span-tags-go">Add custom span tags</h3>
        <p>
          Add <a href="/tracing/glossary/#span-tags">tags</a> directly to a
          <code>Span</code> interface by calling <code>SetTag</code>:
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
              ><code><span class="line"><span class="cl"><span class="kn">package</span> <span class="nx">main</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s">&#34;log&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="s">&#34;net/http&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/tracer&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">handler</span><span class="p">(</span><span class="nx">w</span> <span class="nx">http</span><span class="p">.</span><span class="nx">ResponseWriter</span><span class="p">,</span> <span class="nx">r</span> <span class="o">*</span><span class="nx">http</span><span class="p">.</span><span class="nx">Request</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Create a span for a web request at the /posts URL.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">span</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpan</span><span class="p">(</span><span class="s">&#34;web.request&#34;</span><span class="p">,</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">ResourceName</span><span class="p">(</span><span class="s">&#34;/posts&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">    <span class="k">defer</span> <span class="nx">span</span><span class="p">.</span><span class="nf">Finish</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// Set tag
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">span</span><span class="p">.</span><span class="nf">SetTag</span><span class="p">(</span><span class="s">&#34;http.url&#34;</span><span class="p">,</span> <span class="nx">r</span><span class="p">.</span><span class="nx">URL</span><span class="p">.</span><span class="nx">Path</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="nx">span</span><span class="p">.</span><span class="nf">SetTag</span><span class="p">(</span><span class="s">&#34;&lt;TAG_KEY&gt;&#34;</span><span class="p">,</span> <span class="s">&#34;&lt;TAG_VALUE&gt;&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">main</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">tracer</span><span class="p">.</span><span class="nf">Start</span><span class="p">(</span><span class="nx">tracer</span><span class="p">.</span><span class="nf">WithService</span><span class="p">(</span><span class="s">&#34;&lt;SERVICE_NAME&gt;&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">    <span class="k">defer</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">Stop</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="nx">http</span><span class="p">.</span><span class="nf">HandleFunc</span><span class="p">(</span><span class="s">&#34;/posts&#34;</span><span class="p">,</span> <span class="nx">handler</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="nx">log</span><span class="p">.</span><span class="nf">Fatal</span><span class="p">(</span><span class="nx">http</span><span class="p">.</span><span class="nf">ListenAndServe</span><span class="p">(</span><span class="s">&#34;:8080&#34;</span><span class="p">,</span> <span class="kc">nil</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Datadog's integrations make use of the <code>Context</code> type to
          propagate the current active
          <a href="/tracing/glossary/#spans">span</a>. If you want to add span
          tags attached to a <code>Context</code>, call the
          <code>SpanFromContext</code> function:
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
              ><code><span class="line"><span class="cl"><span class="kn">package</span> <span class="nx">main</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s">&#34;net/http&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/tracer&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">handler</span><span class="p">(</span><span class="nx">w</span> <span class="nx">http</span><span class="p">.</span><span class="nx">ResponseWriter</span><span class="p">,</span> <span class="nx">r</span> <span class="o">*</span><span class="nx">http</span><span class="p">.</span><span class="nx">Request</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Retrieve a span for a web request attached to a Go Context.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="k">if</span> <span class="nx">span</span><span class="p">,</span> <span class="nx">ok</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">SpanFromContext</span><span class="p">(</span><span class="nx">r</span><span class="p">.</span><span class="nf">Context</span><span class="p">());</span> <span class="nx">ok</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Set tag
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">span</span><span class="p">.</span><span class="nf">SetTag</span><span class="p">(</span><span class="s">&#34;http.url&#34;</span><span class="p">,</span> <span class="nx">r</span><span class="p">.</span><span class="nx">URL</span><span class="p">.</span><span class="nx">Path</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-globally-go">Adding tags globally to all spans</h3>
        <p>
          Add <a href="/tracing/glossary/#span-tags">tags</a> to all
          <a href="/tracing/glossary/#spans">spans</a> by configuring the tracer
          with the <code>WithGlobalTag</code> option:
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
              ><code><span class="line"><span class="cl"><span class="kn">package</span> <span class="nx">main</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/tracer&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">main</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">tracer</span><span class="p">.</span><span class="nf">Start</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nx">tracer</span><span class="p">.</span><span class="nf">WithGlobalTag</span><span class="p">(</span><span class="s">&#34;datacenter&#34;</span><span class="p">,</span> <span class="s">&#34;us-1&#34;</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">        <span class="nx">tracer</span><span class="p">.</span><span class="nf">WithGlobalTag</span><span class="p">(</span><span class="s">&#34;env&#34;</span><span class="p">,</span> <span class="s">&#34;dev&#34;</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="k">defer</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">Stop</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="set-errors-on-a-span-go">Set errors on a span</h3>
        <p>
          To set an error on one of your spans, use
          <code>tracer.WithError</code> as below:
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
              ><code><span class="line"><span class="cl"><span class="nx">err</span> <span class="o">:=</span> <span class="nf">someOperation</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nx">span</span><span class="p">.</span><span class="nf">Finish</span><span class="p">(</span><span class="nx">tracer</span><span class="p">.</span><span class="nf">WithError</span><span class="p">(</span><span class="nx">err</span><span class="p">))</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="adding-spans-go">Adding spans</h2>
        <p>
          If you aren't using supported library instrumentation (see
          <a href="/tracing/setup/go/#compatibility">Library compatibility</a>),
          you may want to manually instrument your code.
        </p>
        <div class="alert alert-info">
          <p>
            Unlike other Datadog tracing libraries, when tracing Go
            applications, it's recommended that you explicitly manage and pass
            the Go context of your spans. This approach helps ensure accurate
            span relationships and meaningful tracing. For more information, see
            the
            <a href="https://pkg.go.dev/context"
              >Go context library documentation</a
            >
            or documentation for any third-party libraries integrated with your
            application.
          </p>
        </div>
        <h3 id="manually-creating-a-span-go">Manually creating a span</h3>
        <p>
          To manually create spans, use the <code>tracer</code> package (see the
          <a
            href="https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
            >v2 API on Datadog's godoc</a
          >; for v1, see the
          <a
            href="https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
            >v1 godoc</a
          >).
        </p>
        <p>You can create spans in two ways:</p>
        <ul>
          <li>
            Start a child from an existing span with
            <a
              href="https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#StartSpan"
              ><code>StartChild</code> for v2</a
            >
            or
            <a
              href="https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan"
              ><code>StartSpan</code> for v1</a
            >.
          </li>
          <li>
            Start a span from a context with
            <code>StartSpanFromContext</code> (see API details for
            <a
              href="https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#StartSpanFromContext"
              >v2</a
            >
            or
            <a
              href="https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext"
              >v1</a
            >).
          </li>
        </ul>
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
              ><code><span class="line"><span class="cl"><span class="c1">//v2: Create a span with a resource name, which is the child of parentSpan.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span> <span class="o">:=</span> <span class="nx">parentSpan</span><span class="p">.</span><span class="nf">StartChild</span><span class="p">(</span><span class="s">&#34;mainOp&#34;</span><span class="p">,</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">ResourceName</span><span class="p">(</span><span class="s">&#34;/user&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">//v1: Create a span with a resource name, which is the child of parentSpan.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpan</span><span class="p">(</span><span class="s">&#34;mainOp&#34;</span><span class="p">,</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">ResourceName</span><span class="p">(</span><span class="s">&#34;/user&#34;</span><span class="p">),</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">ChildOf</span><span class="p">(</span><span class="nx">parentSpan</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// v1 and v2: Create a span which will be the child of the span in the Context ctx, if there is a span in the context.
</span></span></span><span class="line"><span class="cl"><span class="c1">// Returns the new span, and a new context containing the new span.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">span</span><span class="p">,</span> <span class="nx">ctx</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpanFromContext</span><span class="p">(</span><span class="nx">ctx</span><span class="p">,</span> <span class="s">&#34;mainOp&#34;</span><span class="p">,</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">ResourceName</span><span class="p">(</span><span class="s">&#34;/user&#34;</span><span class="p">))</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="asynchronous-traces-go">Asynchronous traces</h3>
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
              ><code><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">main</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">	<span class="nx">span</span><span class="p">,</span> <span class="nx">ctx</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpanFromContext</span><span class="p">(</span><span class="nx">context</span><span class="p">.</span><span class="nf">Background</span><span class="p">(),</span> <span class="s">&#34;mainOp&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">	<span class="k">defer</span> <span class="nx">span</span><span class="p">.</span><span class="nf">Finish</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">	<span class="k">go</span> <span class="kd">func</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">		<span class="nx">asyncSpan</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpanFromContext</span><span class="p">(</span><span class="nx">ctx</span><span class="p">,</span> <span class="s">&#34;asyncOp&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">		<span class="k">defer</span> <span class="nx">asyncSpan</span><span class="p">.</span><span class="nf">Finish</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">		<span class="nf">performOp</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">	<span class="p">}()</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="distributed-tracing-go">Distributed tracing</h3>
        <p>
          Create a distributed <a href="/tracing/glossary/#trace">trace</a> by
          manually propagating the tracing context:
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
              ><code><span class="line"><span class="cl"><span class="kn">package</span> <span class="nx">main</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s">&#34;net/http&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/tracer&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">handler</span><span class="p">(</span><span class="nx">w</span> <span class="nx">http</span><span class="p">.</span><span class="nx">ResponseWriter</span><span class="p">,</span> <span class="nx">r</span> <span class="o">*</span><span class="nx">http</span><span class="p">.</span><span class="nx">Request</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">span</span><span class="p">,</span> <span class="nx">ctx</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpanFromContext</span><span class="p">(</span><span class="nx">r</span><span class="p">.</span><span class="nf">Context</span><span class="p">(),</span> <span class="s">&#34;post.process&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="k">defer</span> <span class="nx">span</span><span class="p">.</span><span class="nf">Finish</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="nx">req</span><span class="p">,</span> <span class="nx">err</span> <span class="o">:=</span> <span class="nx">http</span><span class="p">.</span><span class="nf">NewRequest</span><span class="p">(</span><span class="s">&#34;GET&#34;</span><span class="p">,</span> <span class="s">&#34;http://example.com&#34;</span><span class="p">,</span> <span class="kc">nil</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="nx">req</span> <span class="p">=</span> <span class="nx">req</span><span class="p">.</span><span class="nf">WithContext</span><span class="p">(</span><span class="nx">ctx</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Inject the span Context in the Request headers
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">err</span> <span class="p">=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">Inject</span><span class="p">(</span><span class="nx">span</span><span class="p">.</span><span class="nf">Context</span><span class="p">(),</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">HTTPHeadersCarrier</span><span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">Header</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">    <span class="k">if</span> <span class="nx">err</span> <span class="o">!=</span> <span class="kc">nil</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Handle or log injection error
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">http</span><span class="p">.</span><span class="nx">DefaultClient</span><span class="p">.</span><span class="nf">Do</span><span class="p">(</span><span class="nx">req</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Then, on the server side, to continue the trace, start a new
          <a href="/tracing/glossary/#spans">Span</a> from the extracted
          <code>Context</code>:
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
              ><code><span class="line"><span class="cl"><span class="kn">package</span> <span class="nx">main</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kn">import</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s">&#34;net/http&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="s">&#34;github.com/DataDog/dd-trace-go/v2/ddtrace/tracer&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">handler</span><span class="p">(</span><span class="nx">w</span> <span class="nx">http</span><span class="p">.</span><span class="nx">ResponseWriter</span><span class="p">,</span> <span class="nx">r</span> <span class="o">*</span><span class="nx">http</span><span class="p">.</span><span class="nx">Request</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Extract the span Context and continue the trace in this service
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">sctx</span><span class="p">,</span> <span class="nx">err</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">Extract</span><span class="p">(</span><span class="nx">tracer</span><span class="p">.</span><span class="nf">HTTPHeadersCarrier</span><span class="p">(</span><span class="nx">r</span><span class="p">.</span><span class="nx">Header</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">    <span class="k">if</span> <span class="nx">err</span> <span class="o">!=</span> <span class="kc">nil</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Handle or log extraction error
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="nx">span</span> <span class="o">:=</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">StartSpan</span><span class="p">(</span><span class="s">&#34;post.filter&#34;</span><span class="p">,</span> <span class="nx">tracer</span><span class="p">.</span><span class="nf">ChildOf</span><span class="p">(</span><span class="nx">sctx</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">    <span class="k">defer</span> <span class="nx">span</span><span class="p">.</span><span class="nf">Finish</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="trace-client-agent-config-go">
          Trace client and Agent configuration
        </h2>
        <p>
          There are additional configurations possible for both the tracing
          client and Datadog Agent for context propagation with B3 Headers, as
          well as excluding specific resources from sending traces to Datadog in
          the event these traces are not wanted in metrics calculated, such as
          Health Checks.
        </p>
        <h3 id="propagating-context-go">
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
        <h3 id="resource-filtering-go">Resource filtering</h3>
        <p>
          Traces can be excluded based on their resource name, to remove
          synthetic traffic such as health checks from reporting traces to
          Datadog. This and other security and fine-tuning configurations can be
          found on the <a href="/tracing/security">Security</a> page.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is Ruby"
        data-if="229"
      >
        <div class="alert alert-info">
          <p>
            If you have not yet read the instructions for auto-instrumentation
            and setup, read the
            <a href="/tracing/setup/ruby/">Ruby Setup Instructions</a>.
          </p>
        </div>
        <p>
          This page details describes use cases for adding and customizing
          observability with Datadog APM.
        </p>
        <h2 id="requirements-ruby">Requirements</h2>
        <p>
          Make sure you require the appropriate gem for your
          <a href="https://github.com/DataDog/dd-trace-rb/releases"
            >Ruby tracer version</a
          >:
        </p>
        <ul>
          <li>
            <p>For v2.x, require the <code>datadog</code> gem:</p>
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
                  ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;datadog&#39;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>For v1.x, require the <code>ddtrace</code> gem:</p>
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
                  ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;ddtrace&#39;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <h2 id="adding-tags-ruby">Adding tags</h2>
        <p>
          Add custom <a href="/tracing/glossary/#span-tags">span tags</a> to
          your <a href="/tracing/glossary/#spans">spans</a> to customize your
          observability within Datadog. The span tags are applied to your
          incoming traces, allowing you to correlate observed behavior with
          code-level information such as merchant tier, checkout amount, or user
          ID.
        </p>
        <h3 id="add-custom-span-tags-ruby">Add custom span tags</h3>
        <p>
          Add custom tags to your spans corresponding to any dynamic value
          within your application code such as <code>customer.id</code>.
        </p>
        <h4 id="active-spans-ruby">Active spans</h4>
        <p>
          Access the current active
          <a href="/tracing/glossary/#span-tags">span</a> from any method within
          your code.
        </p>
        <p>
          <strong>Note</strong>: If the method is called and there is no active
          span, <code>active_span</code> is <code>nil</code>.
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
              ><code><span class="line"><span class="cl"><span class="c1"># get &#39;/shopping_cart/:customer_id&#39;, to: &#39;shopping_cart#index&#39;</span>
</span></span><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">ShoppingCartController</span> <span class="o">&lt;</span> <span class="no">ApplicationController</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># GET /shopping_cart</span>
</span></span><span class="line"><span class="cl">  <span class="k">def</span> <span class="nf">index</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># Get the active span and set customer_id -&gt; 254889</span>
</span></span><span class="line"><span class="cl">    <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">active_span</span><span class="o">&amp;.</span><span class="n">set_tag</span><span class="p">(</span><span class="s1">&#39;customer.id&#39;</span><span class="p">,</span> <span class="n">params</span><span class="o">.</span><span class="n">permit</span><span class="p">(</span><span class="o">[</span><span class="ss">:customer_id</span><span class="o">]</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># [...]</span>
</span></span><span class="line"><span class="cl">  <span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="c1"># POST /shopping_cart</span>
</span></span><span class="line"><span class="cl">  <span class="k">def</span> <span class="nf">create</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># [...]</span>
</span></span><span class="line"><span class="cl">  <span class="k">end</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h4 id="manually-instrumented-spans-ruby">
          Manually instrumented spans
        </h4>
        <p>
          Add <a href="/tracing/glossary/#span-tags">tags</a> directly to
          <code>Datadog::Span</code> objects by calling <code>#set_tag</code>:
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
              ><code><span class="line"><span class="cl"><span class="c1"># An example of a Sinatra endpoint,</span>
</span></span><span class="line"><span class="cl"><span class="c1"># with Datadog tracing around the request.</span>
</span></span><span class="line"><span class="cl"><span class="n">get</span> <span class="s1">&#39;/posts&#39;</span> <span class="k">do</span>
</span></span><span class="line"><span class="cl">  <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s1">&#39;web.request&#39;</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s1">&#39;http.url&#39;</span><span class="p">,</span> <span class="n">request</span><span class="o">.</span><span class="n">path</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s1">&#39;&lt;TAG_KEY&gt;&#39;</span><span class="p">,</span> <span class="s1">&#39;&lt;TAG_VALUE&gt;&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="k">end</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-globally-ruby">
          Adding tags globally to all spans
        </h3>
        <p>
          Add <a href="/tracing/glossary/#span-tags">tags</a> to all
          <a href="/tracing/glossary/#spans">spans</a> by configuring the tracer
          with the <code>tags</code> option:
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
              ><code><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">.</span><span class="n">configure</span> <span class="k">do</span> <span class="o">|</span><span class="n">c</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="n">c</span><span class="o">.</span><span class="n">tags</span> <span class="o">=</span> <span class="p">{</span> <span class="s1">&#39;team&#39;</span> <span class="o">=&gt;</span> <span class="s1">&#39;qa&#39;</span> <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          You can also use the <code>DD_TAGS</code> environment variable to set
          tags on all spans for an application. For more information on Ruby
          environment variables, read the
          <a href="/tracing/setup/ruby/#environment-and-tags"
            >setup documentation</a
          >.
        </p>
        <h3 id="setting-errors-on-a-span-ruby">Setting errors on a span</h3>
        <p>There are two ways to set an error on a span:</p>
        <ul>
          <li>
            Call <code>span.set_error</code> and pass in the Exception Object.
            This automatically extracts the error type, message, and backtrace.
          </li>
        </ul>
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
              ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;timeout&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">example_method</span>
</span></span><span class="line"><span class="cl">  <span class="n">span</span> <span class="o">=</span> <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s1">&#39;example.trace&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="nb">puts</span> <span class="s1">&#39;some work&#39;</span>
</span></span><span class="line"><span class="cl">  <span class="nb">sleep</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="k">raise</span> <span class="no">StandardError</span><span class="p">,</span> <span class="s2">&#34;This is an exception&#34;</span>
</span></span><span class="line"><span class="cl"><span class="k">rescue</span> <span class="no">StandardError</span> <span class="o">=&gt;</span> <span class="n">error</span>
</span></span><span class="line"><span class="cl">  <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">active_span</span><span class="o">&amp;.</span><span class="n">set_error</span><span class="p">(</span><span class="n">error</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="k">raise</span>
</span></span><span class="line"><span class="cl"><span class="k">ensure</span>
</span></span><span class="line"><span class="cl">  <span class="n">span</span><span class="o">.</span><span class="n">finish</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">example_method</span><span class="p">()</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <ul>
          <li>
            Or, use <code>tracer.trace</code> which by default sets the error
            type, message, and backtrace. To configure this behavior you can use
            the <code>on_error</code> option, which is the Handler invoked when
            a block is provided to <code>trace</code>, and the block raises an
            error. The Proc is provided <code>span</code> and
            <code>error</code> as arguments. By default,
            <code>on_error</code> sets error on the span.
          </li>
        </ul>
        <p>Default behavior for <code>on_error</code>:</p>
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
              ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;timeout&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">example_method</span>
</span></span><span class="line"><span class="cl">  <span class="nb">puts</span> <span class="s1">&#39;some work&#39;</span>
</span></span><span class="line"><span class="cl">  <span class="nb">sleep</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="k">raise</span> <span class="no">StandardError</span><span class="p">,</span> <span class="s2">&#34;This is an exception&#34;</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s1">&#39;example.trace&#39;</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="n">example_method</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>Custom behavior for <code>on_error</code>:</p>
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
              ><code><span class="line"><span class="cl"><span class="nb">require</span> <span class="s1">&#39;timeout&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">example_method</span>
</span></span><span class="line"><span class="cl">  <span class="nb">puts</span> <span class="s1">&#39;some work&#39;</span>
</span></span><span class="line"><span class="cl">  <span class="nb">sleep</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="k">raise</span> <span class="no">StandardError</span><span class="o">.</span><span class="n">new</span> <span class="s2">&#34;This is a special exception&#34;</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">custom_error_handler</span> <span class="o">=</span> <span class="nb">proc</span> <span class="k">do</span> <span class="o">|</span><span class="n">span</span><span class="p">,</span> <span class="n">error</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="n">span</span><span class="o">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s1">&#39;custom_tag&#39;</span><span class="p">,</span> <span class="s1">&#39;custom_value&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="n">span</span><span class="o">.</span><span class="n">set_error</span><span class="p">(</span><span class="n">error</span><span class="p">)</span> <span class="k">unless</span> <span class="n">error</span><span class="o">.</span><span class="n">message</span><span class="o">.</span><span class="n">include?</span><span class="p">(</span><span class="s2">&#34;a special exception&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s1">&#39;example.trace&#39;</span><span class="p">,</span> <span class="ss">on_error</span><span class="p">:</span> <span class="n">custom_error_handler</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="n">example_method</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="adding-spans-ruby">Adding spans</h2>
        <p>
          If you aren't using supported library instrumentation (see
          <a href="/tracing/compatibility_requirements/ruby/"
            >library compatibility</a
          >), you can manually instrument your code. Add tracing to your code by
          using the <code>Datadog::Tracing.trace</code> method, which you can
          wrap around any Ruby code.
        </p>
        <p>
          To trace any Ruby code, you can use the
          <code>Datadog::Tracing.trace</code> method:
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
              ><code><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="nb">name</span><span class="p">,</span> <span class="ss">resource</span><span class="p">:</span> <span class="n">resource</span><span class="p">,</span> <span class="o">**</span><span class="n">options</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># Wrap this block around the code you want to instrument</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># Additionally, you can modify the span here.</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># for example, change the resource name, or set tags</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Where <code>name</code> is a <code>String</code> that describes the
          generic kind of operation being done (for example
          <code>'web.request'</code>, or <code>'request.parse'</code>).
        </p>
        <p>
          <code>resource</code> is a <code>String</code> with the name of the
          action being operated on. Traces with the same resource value will be
          grouped together for the purpose of metrics. Resources are usually
          domain specific, such as a URL, query, request, etc. (e.g.
          'Article#submit', http://example.com/articles/list.)
        </p>
        <p>
          For all the available <code>**options</code>, see the
          <a
            href="/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation"
            >reference guide</a
          >.
        </p>
        <h3 id="manually-creating-a-new-span-ruby">
          Manually creating a new span
        </h3>
        <p>
          Programmatically create spans around any block of code. Spans created
          in this manner integrate with other tracing mechanisms automatically.
          In other words, if a trace has already started, the manual span will
          have its caller as its parent span. Similarly, any traced methods
          called from the wrapped block of code will have the manual span as its
          parent.
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
              ><code><span class="line"><span class="cl"><span class="c1"># An example of a Sinatra endpoint,</span>
</span></span><span class="line"><span class="cl"><span class="c1"># with Datadog tracing around the request,</span>
</span></span><span class="line"><span class="cl"><span class="c1"># database query, and rendering steps.</span>
</span></span><span class="line"><span class="cl"><span class="n">get</span> <span class="s1">&#39;/posts&#39;</span> <span class="k">do</span>
</span></span><span class="line"><span class="cl">  <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s1">&#39;web.request&#39;</span><span class="p">,</span> <span class="ss">service</span><span class="p">:</span> <span class="s1">&#39;&lt;SERVICE_NAME&gt;&#39;</span><span class="p">,</span> <span class="ss">resource</span><span class="p">:</span> <span class="s1">&#39;GET /posts&#39;</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># Trace the activerecord call</span>
</span></span><span class="line"><span class="cl">    <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s1">&#39;posts.fetch&#39;</span><span class="p">)</span> <span class="k">do</span>
</span></span><span class="line"><span class="cl">      <span class="vi">@posts</span> <span class="o">=</span> <span class="no">Posts</span><span class="o">.</span><span class="n">order</span><span class="p">(</span><span class="ss">created_at</span><span class="p">:</span> <span class="ss">:desc</span><span class="p">)</span><span class="o">.</span><span class="n">limit</span><span class="p">(</span><span class="mi">10</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># Add some APM tags</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s1">&#39;http.method&#39;</span><span class="p">,</span> <span class="n">request</span><span class="o">.</span><span class="n">request_method</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="o">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s1">&#39;posts.count&#39;</span><span class="p">,</span> <span class="vi">@posts</span><span class="o">.</span><span class="n">length</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># Trace the template rendering</span>
</span></span><span class="line"><span class="cl">    <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">trace</span><span class="p">(</span><span class="s1">&#39;template.render&#39;</span><span class="p">)</span> <span class="k">do</span>
</span></span><span class="line"><span class="cl">      <span class="n">erb</span> <span class="ss">:index</span>
</span></span><span class="line"><span class="cl">    <span class="k">end</span>
</span></span><span class="line"><span class="cl">  <span class="k">end</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="post-processing-traces-ruby">Post-processing traces</h3>
        <p>
          Some applications might require that traces be altered or filtered out
          before they are sent to Datadog. The processing pipeline allows you to
          create <em>processors</em> to define such behavior.
        </p>
        <h4 id="filtering-ruby">Filtering</h4>
        <p>
          You can use the
          <code>Datadog::Tracing::Pipeline::SpanFilter</code> processor to
          remove spans, when the block evaluates as truthy:
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
              ><code><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">before_flush</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># Remove spans that match a particular resource</span>
</span></span><span class="line"><span class="cl">  <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">::</span><span class="no">Pipeline</span><span class="o">::</span><span class="no">SpanFilter</span><span class="o">.</span><span class="n">new</span> <span class="p">{</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span> <span class="n">span</span><span class="o">.</span><span class="n">resource</span> <span class="o">=~</span> <span class="sr">/PingController/</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># Remove spans that are trafficked to localhost</span>
</span></span><span class="line"><span class="cl">  <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">::</span><span class="no">Pipeline</span><span class="o">::</span><span class="no">SpanFilter</span><span class="o">.</span><span class="n">new</span> <span class="p">{</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span> <span class="n">span</span><span class="o">.</span><span class="n">get_tag</span><span class="p">(</span><span class="s1">&#39;host&#39;</span><span class="p">)</span> <span class="o">==</span> <span class="s1">&#39;localhost&#39;</span> <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h4 id="processing-ruby">Processing</h4>
        <p>
          You can use the
          <code>Datadog::Tracing::Pipeline::SpanProcessor</code> processor to
          modify spans:
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
              ><code><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">before_flush</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="c1"># Strip matching text from the resource field</span>
</span></span><span class="line"><span class="cl">  <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">::</span><span class="no">Pipeline</span><span class="o">::</span><span class="no">SpanProcessor</span><span class="o">.</span><span class="n">new</span> <span class="p">{</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span> <span class="n">span</span><span class="o">.</span><span class="n">resource</span><span class="o">.</span><span class="n">gsub!</span><span class="p">(</span><span class="sr">/password=.*/</span><span class="p">,</span> <span class="s1">&#39;&#39;</span><span class="p">)</span> <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h4 id="custom-processor-ruby">Custom processor</h4>
        <p>
          Processors can be any object that responds to
          <code>#call</code> accepting <code>trace</code> as an argument (which
          is an <code>Array</code> of <code>Datadog::Span</code>.)
        </p>
        <p>For example, using the short-hand block syntax:</p>
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
              ><code><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">before_flush</span> <span class="k">do</span> <span class="o">|</span><span class="n">trace</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">   <span class="c1"># Processing logic...</span>
</span></span><span class="line"><span class="cl">   <span class="n">trace</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          The following example implements a processor to achieve complex
          post-processing logic:
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
              ><code><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">before_flush</span> <span class="k">do</span> <span class="o">|</span><span class="n">trace</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">  <span class="n">trace</span><span class="o">.</span><span class="n">spans</span><span class="o">.</span><span class="n">each</span> <span class="k">do</span> <span class="o">|</span><span class="n">span</span><span class="o">|</span>
</span></span><span class="line"><span class="cl">    <span class="n">originalPrice</span> <span class="o">=</span> <span class="n">span</span><span class="o">.</span><span class="n">get_tag</span><span class="p">(</span><span class="s1">&#39;order.price&#39;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">    <span class="n">discount</span> <span class="o">=</span> <span class="n">span</span><span class="o">.</span><span class="n">get_tag</span><span class="p">(</span><span class="s1">&#39;order.discount&#39;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># Set a tag from a calculation from other tags</span>
</span></span><span class="line"><span class="cl">    <span class="k">if</span> <span class="p">(</span><span class="n">originalPrice</span> <span class="o">!=</span> <span class="kp">nil</span> <span class="o">&amp;&amp;</span> <span class="n">discount</span> <span class="o">!=</span> <span class="kp">nil</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">      <span class="n">span</span><span class="o">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s1">&#39;order.value&#39;</span><span class="p">,</span> <span class="n">originalPrice</span> <span class="o">-</span> <span class="n">discount</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="k">end</span>
</span></span><span class="line"><span class="cl">  <span class="k">end</span>
</span></span><span class="line"><span class="cl">  <span class="n">trace</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>For a custom processor class:</p>
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
              ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">MyCustomProcessor</span>
</span></span><span class="line"><span class="cl">  <span class="k">def</span> <span class="nf">call</span><span class="p">(</span><span class="n">trace</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="c1"># Processing logic...</span>
</span></span><span class="line"><span class="cl">    <span class="n">trace</span>
</span></span><span class="line"><span class="cl">  <span class="k">end</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">before_flush</span><span class="p">(</span><span class="no">MyCustomProcessor</span><span class="o">.</span><span class="n">new</span><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          In both cases, the processor method <em>must</em> return the
          <code>trace</code> object; this return value will be passed to the
          next processor in the pipeline.
        </p>
        <h2 id="trace-client-agent-config-ruby">
          Trace client and Agent configuration
        </h2>
        <p>
          There are additional configurations possible for both the tracing
          client and Datadog Agent for context propagation with B3 Headers, as
          well as to exclude specific Resources from sending traces to Datadog
          in the event these traces are not wanted to count in metrics
          calculated, such as Health Checks.
        </p>
        <h3 id="propagating-context-ruby">
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
        <h4 id="baggage-ruby">Baggage</h4>
        <p>
          Baggage is a hash that can be accessed through the API and is
          propagated by default. See the following example to manipulate
          <a href="/tracing/trace_collection/trace_context_propagation/#baggage"
            >Baggage</a
          >:
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
              ><code><span class="line"><span class="cl"><span class="c1"># set_baggage_item</span>
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="o">[</span><span class="s1">&#39;key1&#39;</span><span class="o">]</span> <span class="o">=</span> <span class="s1">&#39;value1&#39;</span>
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="o">[</span><span class="s1">&#39;key2&#39;</span><span class="o">]</span> <span class="o">=</span> <span class="s1">&#39;value2&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># get_all_baggage_items</span>
</span></span><span class="line"><span class="cl"><span class="n">all_baggage</span> <span class="o">=</span> <span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span>
</span></span><span class="line"><span class="cl"><span class="nb">puts</span><span class="p">(</span><span class="n">all_baggage</span><span class="p">)</span> <span class="c1"># {&#34;key1&#34;=&gt;&#34;value1&#34;, &#34;key2&#34;=&gt;&#34;value2&#34;}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># remove_baggage_item</span>
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="o">.</span><span class="n">delete</span><span class="p">(</span><span class="s1">&#39;key1&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="nb">puts</span><span class="p">(</span><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="p">)</span> <span class="c1"># {&#34;key2&#34;=&gt;&#34;value2&#34;}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># get_baggage_item</span>
</span></span><span class="line"><span class="cl"><span class="nb">puts</span><span class="p">(</span><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="o">[</span><span class="s1">&#39;key1&#39;</span><span class="o">]</span><span class="p">)</span> <span class="c1"># nil</span>
</span></span><span class="line"><span class="cl"><span class="nb">puts</span><span class="p">(</span><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="o">[</span><span class="s1">&#39;key2&#39;</span><span class="o">]</span><span class="p">)</span> <span class="c1"># &#34;value2&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1"># remove_all_baggage_items</span>
</span></span><span class="line"><span class="cl"><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="o">.</span><span class="n">clear</span>
</span></span><span class="line"><span class="cl"><span class="nb">puts</span><span class="p">(</span><span class="no">Datadog</span><span class="o">::</span><span class="no">Tracing</span><span class="o">.</span><span class="n">baggage</span><span class="p">)</span> <span class="c1"># {}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="resource-filtering-ruby">Resource filtering</h3>
        <p>
          Traces can be excluded based on their resource name, to remove
          synthetic traffic such as health checks from reporting traces to
          Datadog. This and other security and fine-tuning configurations can be
          found on the <a href="/tracing/security">Security</a> page.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is .NET"
        data-if="230"
      >
        <div class="alert alert-info">
          <p>
            If you have not yet read the instructions for automatic
            instrumentation and setup, start with the
            <a href="/tracing/setup/dotnet-core/">.NET/.NET Core</a> or
            <a href="/tracing/setup/dotnet-framework/">.NET Framework</a> Setup
            Instructions.
          </p>
        </div>
        <p>
          This page details common use cases for adding and customizing
          observability with Datadog APM. For a list of supported runtimes, see
          the
          <a href="/tracing/trace_collection/compatibility/dotnet-framework"
            >.NET Framework Compatibility Requirements</a
          >
          or the
          <a href="/tracing/trace_collection/compatibility/dotnet-core"
            >.NET Core Compatibility Requirements</a
          >.
        </p>
        <p>
          There are several ways to get more than the
          <a href="/tracing/trace_collection/dd_libraries/dotnet-core"
            >default automatic instrumentation</a
          >:
        </p>
        <ul>
          <li>
            <a href="#instrument-methods-through-configuration"
              >Through configuration</a
            >, which does not allow you to add specific tags.
          </li>
          <li>
            <a href="#instrument-methods-through-attributes">Using attributes</a
            >, which allows you to customize operation and resource names.
          </li>
          <li>
            <a href="#custom-instrumentation-with-code">Using custom code</a>,
            which gives you the most control on the spans.
          </li>
        </ul>
        <p>
          You can combine these solutions with each other to achieve the
          instrumentation detail you want. However, automatic instrumentation
          must be setup first.
        </p>
        <h2 id="instrument-methods-through-configuration-dotnet">
          Instrument methods through configuration
        </h2>
        <p>
          Using the <code>DD_TRACE_METHODS</code> environment variable, you can
          get visibility into unsupported frameworks without changing
          application code. For full details on the input format for
          <code>DD_TRACE_METHODS</code>, see the
          <a
            href="/tracing/trace_collection/library_config/dotnet-framework/#automatic-instrumentation-optional-configuration"
            >.NET Framework configuration instructions</a
          >
          or the
          <a
            href="/tracing/trace_collection/library_config/dotnet-core/#automatic-instrumentation-optional-configuration"
            >.NET Core configuration instructions</a
          >. For example, to instrument a method called
          <code>SaveSession</code> defined on the
          <code>Store.Managers.SessionManager</code> type, set:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-ini">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="na">DD_TRACE_METHODS</span><span class="o">=</span><span class="s">Store.Managers.SessionManager[SaveSession]</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          The resulting span has an <code>operationName</code> attribute with
          the value <code>trace.annotation</code> and a
          <code>resourceName</code> attribute with the value
          <code>SaveSession</code>.
        </p>
        <p>
          If you want to customize the span's attributes and you have the
          ability to modify the source code, you can
          <a href="#instrument-methods-through-attributes"
            >instrument methods through attributes</a
          >
          instead.
        </p>
        <h2 id="instrument-methods-through-attributes-dotnet">
          Instrument methods through attributes
        </h2>
        <p>
          Add <code>[Trace]</code> to methods for Datadog to trace them when
          running with automatic instrumentation. If automatic instrumentation
          is not enabled, this attribute has no effect on your application.
        </p>
        <p>
          <code>[Trace]</code> attributes have the default operation name
          <code>trace.annotation</code> and resource name of the traced method.
          You can set <strong>operation name</strong> and
          <strong>resource name</strong> as named arguments of the
          <code>[Trace]</code> attribute to better reflect what is being
          instrumented. Operation name and resource name are the only possible
          arguments that can be set for the <code>[Trace]</code> attribute. For
          example:
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
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">Datadog.Trace.Annotations</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">namespace</span> <span class="nn">Store.Managers</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="k">class</span> <span class="nc">SessionManager</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="na">        [Trace(OperationName = &#34;database.persist&#34;, ResourceName = &#34;SessionManager.SaveSession&#34;)]</span>
</span></span><span class="line"><span class="cl">        <span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="n">SaveSession</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// your method implementation here</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="custom-instrumentation-with-code-dotnet">
          Custom instrumentation with code
        </h2>
        <div class="alert alert-info">
          <p>
            This feature requires adding the
            <a href="https://www.nuget.org/packages/Datadog.Trace"
              ><code>Datadog.Trace</code> NuGet package</a
            >
            to your application. It provides an API to directly access the
            Tracer and the active span.
          </p>
        </div>
        <div class="alert alert-danger">
          <p>
            Starting with v3.0.0, custom instrumentation requires you also use
            automatic instrumentation. You should aim to keep both automatic and
            custom instrumentation package versions (for example: MSI and NuGet)
            in sync, and ensure you don't mix major versions of packages.
          </p>
        </div>
        <h3 id="configuring-datadog-in-code-dotnet">
          Configuring Datadog in code
        </h3>
        <p>
          There are multiple ways to configure your application: using
          environment variables, a <code>web.config</code> file, or a
          <code>datadog.json</code> file,
          <a href="/tracing/trace_collection/library_config/dotnet-core/"
            >as described in our documentation</a
          >. The <code>Datadog.Trace</code> NuGet package also allows you to
          configure settings in code.
        </p>
        <p>
          To override configuration settings, create an instance of
          <code>TracerSettings</code>, and pass it to the static
          <code>Tracer.Configure()</code> method:
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
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">Datadog.Trace</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Create a settings object using the existing</span>
</span></span><span class="line"><span class="cl"><span class="c1">// environment variables and config sources</span>
</span></span><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">settings</span> <span class="p">=</span> <span class="n">TracerSettings</span><span class="p">.</span><span class="n">FromDefaultSources</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Override a value</span>
</span></span><span class="line"><span class="cl"><span class="n">settings</span><span class="p">.</span><span class="n">GlobalTags</span><span class="p">.</span><span class="n">Add</span><span class="p">(</span><span class="s">&#34;SomeKey&#34;</span><span class="p">,</span> <span class="s">&#34;SomeValue&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Replace the tracer configuration</span>
</span></span><span class="line"><span class="cl"><span class="n">Tracer</span><span class="p">.</span><span class="n">Configure</span><span class="p">(</span><span class="n">settings</span><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Calling <code>Tracer.Configure()</code> replaces the settings for all
          subsequent traces, both for custom instrumentation and for automatic
          instrumentation.
        </p>
        <div class="alert alert-danger">
          <p>
            Replacing the configuration should be done
            <strong>once, as early as possible</strong> in your application.
          </p>
        </div>
        <h3 id="create-custom-traces-spans-dotnet">
          Create custom traces/spans
        </h3>
        <p>
          In addition to automatic instrumentation, the
          <code>[Trace]</code> attribute, and
          <code>DD_TRACE_METHODS</code> configurations, you can customize your
          observability by programmatically creating spans around any block of
          code.
        </p>
        <p>
          To create and activate a custom span, use
          <code>Tracer.Instance.StartActive()</code>. If a trace is already
          active (when created by automatic instrumentation, for example), the
          span is part of the current trace. If there is no current trace, a new
          one is started.
        </p>
        <div class="alert alert-danger">
          <p>
            Ensure you dispose of the scope returned from
            <code>StartActive</code>. Disposing the scope closes the span, and
            ensures the trace is flushed to Datadog once all its spans are
            closed.
          </p>
        </div>
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
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">Datadog.Trace</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Start a new span</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="p">(</span><span class="kt">var</span> <span class="n">scope</span> <span class="p">=</span> <span class="n">Tracer</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">StartActive</span><span class="p">(</span><span class="s">&#34;custom-operation&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Do something</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Add custom <a href="/tracing/glossary/#span-tags">span tags</a> to
          your <a href="/tracing/glossary/#spans">spans</a> to customize your
          observability within Datadog. The span tags are applied to your
          incoming traces, allowing you to correlate observed behavior with
          code-level information such as merchant tier, checkout amount, or user
          ID.
        </p>
        <h3 id="manually-creating-a-new-span-dotnet">
          Manually creating a new span
        </h3>
        <p>
          Manually created spans automatically integrate with spans from other
          tracing mechanisms. In other words, if a trace has already started,
          the manual span has its caller as its parent span. Similarly, any
          traced methods called from the wrapped block of code have the manual
          span as its parent.
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
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="p">(</span><span class="kt">var</span> <span class="n">parentScope</span> <span class="p">=</span>
</span></span><span class="line"><span class="cl">       <span class="n">Tracer</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">StartActive</span><span class="p">(</span><span class="s">&#34;manual.sortorders&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">parentScope</span><span class="p">.</span><span class="n">Span</span><span class="p">.</span><span class="n">ResourceName</span> <span class="p">=</span> <span class="s">&#34;&lt;RESOURCE NAME&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="k">using</span> <span class="p">(</span><span class="kt">var</span> <span class="n">childScope</span> <span class="p">=</span>
</span></span><span class="line"><span class="cl">           <span class="n">Tracer</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">StartActive</span><span class="p">(</span><span class="s">&#34;manual.sortorders.child&#34;</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Nest using statements around the code to trace</span>
</span></span><span class="line"><span class="cl">        <span class="n">childScope</span><span class="p">.</span><span class="n">Span</span><span class="p">.</span><span class="n">ResourceName</span> <span class="p">=</span> <span class="s">&#34;&lt;RESOURCE NAME&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="n">SortOrders</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="add-custom-span-tags-dotnet">Add custom span tags</h3>
        <p>
          Add custom tags to your spans corresponding to any dynamic value
          within your application code such as <code>customer.id</code>.
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
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">Datadog.Trace</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">public</span> <span class="k">class</span> <span class="nc">ShoppingCartController</span> <span class="p">:</span> <span class="n">Controller</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">private</span> <span class="n">IShoppingCartRepository</span> <span class="n">_shoppingCartRepository</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="na">
</span></span></span><span class="line"><span class="cl"><span class="na">    [HttpGet]</span>
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="n">IActionResult</span> <span class="n">Index</span><span class="p">(</span><span class="kt">int</span> <span class="n">customerId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Access the active scope through the global tracer</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Note: This can return null if there is no active span</span>
</span></span><span class="line"><span class="cl">        <span class="kt">var</span> <span class="n">scope</span> <span class="p">=</span> <span class="n">Tracer</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">ActiveScope</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="k">if</span> <span class="p">(</span><span class="n">scope</span> <span class="p">!=</span> <span class="k">null</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Add a tag to the span for use in the Datadog web UI</span>
</span></span><span class="line"><span class="cl">            <span class="n">scope</span><span class="p">.</span><span class="n">Span</span><span class="p">.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;customer.id&#34;</span><span class="p">,</span> <span class="n">customerId</span><span class="p">.</span><span class="n">ToString</span><span class="p">());</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="kt">var</span> <span class="n">cart</span> <span class="p">=</span> <span class="n">_shoppingCartRepository</span><span class="p">.</span><span class="n">Get</span><span class="p">(</span><span class="n">customerId</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="k">return</span> <span class="n">View</span><span class="p">(</span><span class="n">cart</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="usage-with-aspnet-ihttpmodule-dotnet">
          Usage with ASP.NET <code>IHttpModule</code>
        </h3>
        <p>
          To access the current request span from a custom ASP.NET
          <code>IHttpModule</code>, it is best to read
          <code>Tracer.Instance.ActiveScope</code> in the
          <code>PreRequestHandlerExecute</code> event (or
          <code>AcquireRequestState</code> if you require session state).
        </p>
        <p>
          While Datadog creates the request span at the start of the ASP.NET
          pipeline, the execution order of <code>IHttpModules</code> is not
          guaranteed. If your module runs before Datadog's,
          <code>ActiveScope</code> may be <code>null</code> during early events
          like <code>BeginRequest</code>. The
          <code>PreRequestHandlerExecute</code> event occurs late enough in the
          lifecycle to help ensure the Datadog module has run and the span is
          available.
        </p>
        <p>
          <code>ActiveScope</code> can still be <code>null</code> for other
          reasons (for example, if instrumentation is disabled), so you should
          always check for <code>null</code>.
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
              ><code><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">System.Web</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">using</span> <span class="nn">Datadog.Trace</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">public</span> <span class="k">class</span> <span class="nc">MyCustomModule</span> <span class="p">:</span> <span class="n">IHttpModule</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="k">void</span> <span class="n">Init</span><span class="p">(</span><span class="n">HttpApplication</span> <span class="n">context</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Prefer reading ActiveScope late in the pipeline</span>
</span></span><span class="line"><span class="cl">        <span class="n">context</span><span class="p">.</span><span class="n">PreRequestHandlerExecute</span> <span class="p">+=</span> <span class="n">OnPreRequestHandlerExecute</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="c1">// If you need session state, you can also hook AcquireRequestState:</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// context.AcquireRequestState += OnPreRequestHandlerExecute;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">private</span> <span class="k">void</span> <span class="n">OnPreRequestHandlerExecute</span><span class="p">(</span><span class="kt">object</span> <span class="n">sender</span><span class="p">,</span> <span class="n">EventArgs</span> <span class="n">e</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Earlier events (e.g., BeginRequest) may run before the Datadog module,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// so ActiveScope can be null there. Here it should be available.</span>
</span></span><span class="line"><span class="cl">        <span class="kt">var</span> <span class="n">scope</span> <span class="p">=</span> <span class="n">Tracer</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">ActiveScope</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="k">if</span> <span class="p">(</span><span class="n">scope</span> <span class="p">==</span> <span class="k">null</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="k">return</span><span class="p">;</span> <span class="c1">// there is no active scope, for example, if instrumentation is disabled</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="c1">// Example: add a custom tag</span>
</span></span><span class="line"><span class="cl">        <span class="n">scope</span><span class="p">.</span><span class="n">Span</span><span class="p">.</span><span class="n">SetTag</span><span class="p">(</span><span class="s">&#34;my.custom.tag&#34;</span><span class="p">,</span> <span class="s">&#34;some_value&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="k">void</span> <span class="n">Dispose</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="set-errors-on-a-span-dotnet">Set errors on a span</h3>
        <p>
          To mark errors that occur in your code, use the
          <code>Span.SetException(Exception)</code> method. The method marks the
          span as an error and adds
          <a href="/tracing/glossary/#span-tags">related span metadata</a> to
          provide insight into the exception.
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
</span></span><span class="line"><span class="cl">    <span class="n">span</span><span class="p">.</span><span class="n">SetException</span><span class="p">(</span><span class="n">e</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>This sets the following tags on the span:</p>
        <ul>
          <li><code>&quot;error.message&quot;:exception.Message</code></li>
          <li><code>&quot;error.stack&quot;:exception.ToString()</code></li>
          <li>
            <code>&quot;error.type&quot;:exception.GetType().ToString()</code>
          </li>
        </ul>
        <h2 id="propagating-context-dotnet">
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
        <h2 id="adding-tags-globally-dotnet">
          Adding tags globally to all spans
        </h2>
        <p>
          Use the <code>DD_TAGS</code> environment variable to set tags across
          all generated spans for an application. This can be useful for
          grouping stats for your applications, data centers, or regions within
          the Datadog UI. For example:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-ini">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="na">DD_TAGS</span><span class="o">=</span><span class="s">datacenter:njc,key2:value2</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="resource-filtering-dotnet">Resource filtering</h2>
        <p>
          You can exclude traces based on the resource name to remove Synthetics
          traffic such as health checks. For more information about security and
          additional configurations, see
          <a href="/tracing/security"
            >Configure the Datadog Agent or Tracer for Data Security</a
          >.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is PHP"
        data-if="231"
      >
        <div class="alert alert-info">
          <p>
            If you have not yet read the instructions for auto-instrumentation
            and setup, start with the
            <a href="/tracing/setup/php/">PHP Setup Instructions</a>. Even if
            Datadog does not officially support your web framework, you may not
            need to perform any manual instrumentation. See
            <a href="/tracing/setup/php/#automatic-instrumentation"
              >automatic instrumentation</a
            >
            for more details.
          </p>
        </div>
        <h2 id="annotations-php">Annotations</h2>
        <p>
          If you are using PHP 8, as of v0.84 of the tracer, you can add
          attributes to your code to instrument it. It is a lighter alternative
          to custom instrumentation written in code. For example, add the
          <code>#[DDTrace\Trace]</code> attribute to methods for Datadog to
          trace them.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">Server</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">#[\DDTrace\Trace(name: &#34;spanName&#34;, resource: &#34;resourceName&#34;, type: &#34;Custom&#34;, service: &#34;myService&#34;, tags: [&#34;aTag&#34; =&gt; &#34;aValue&#34;])]
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="k">static</span> <span class="k">function</span> <span class="nf">process</span><span class="p">(</span><span class="nv">$arg</span><span class="p">)</span> <span class="p">{}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">#[\DDTrace\Trace]
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="k">function</span> <span class="nf">get</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nx">Foo</span><span class="o">::</span><span class="na">simple</span><span class="p">(</span><span class="mi">1</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>You can provide the following arguments:</p>
        <ul>
          <li>
            <code>$name</code>: The operation name to be assigned to the span.
            Defaults to the function name.
          </li>
          <li>
            <code>$resource</code>: The resource to be assigned to the span.
          </li>
          <li><code>$type</code>: The type to be assigned to the span.</li>
          <li>
            <code>$service</code>: The service to be assigned to the span.
            Defaults to default or inherited service name.
          </li>
          <li><code>$tags</code>: The tags to be assigned to the span.</li>
          <li>
            <code>$recurse</code>: Whether recursive calls shall be traced.
          </li>
          <li>
            <code>$run_if_limited</code>: Whether the function shall be traced
            in limited mode. (For example, when span limit exceeded)
          </li>
        </ul>
        <div class="alert alert-danger">
          <p>
            If a namespace is present, you <strong>must</strong> use the fully
            qualified name of the attribute <code>#[\DDTrace\Trace]</code>.
            Alternatively, you can import the namespace with
            <code>use DDTrace\Trace;</code> and use <code>#[Trace]</code>.
          </p>
        </div>
        <h2 id="writing-custom-instrumentation-php">
          Writing custom instrumentation
        </h2>
        <div class="alert alert-info">
          <p>
            To write custom instrumentation, you do not need any additional
            composer package.
          </p>
        </div>
        <div class="alert alert-info">
          <p>
            The Datadog APM PHP Api is fully documented
            <a
              href="https://github.com/DataDog/dd-trace-php/blob/master/ext/ddtrace.stub.php"
              >in stubs</a
            >. This allows you to have automated documentation in PHPStorm.
          </p>
        </div>
        <h3 id="sample-application-php">
          A sample application to be instrumented
        </h3>
        <p>Assume the following directory structure:</p>
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
              ><code><span class="line"><span class="cl">.
</span></span><span class="line"><span class="cl">|-- composer.json
</span></span><span class="line"><span class="cl">|-- docker-compose.yml
</span></span><span class="line"><span class="cl">|-- index.php
</span></span><span class="line"><span class="cl">`-- src
</span></span><span class="line"><span class="cl">    |-- Exceptions
</span></span><span class="line"><span class="cl">    |   `-- NotFound.php
</span></span><span class="line"><span class="cl">    |-- Services
</span></span><span class="line"><span class="cl">    |   `-- SampleRegistry.php
</span></span><span class="line"><span class="cl">    `-- utils
</span></span><span class="line"><span class="cl">        `-- functions.php
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Within this, two files contain the functions and methods that are
          interesting to instrument. The most relevant files are
          <code>src/utils/functions.php</code>:
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
              ><code><span class="line"><span class="cl"><span class="k">namespace</span> <span class="nx">App</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">function</span> <span class="nf">some_utility_function</span><span class="p">(</span><span class="nv">$someArg</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="s1">&#39;result&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>And <code>src/Services/SampleRegistry.php</code>:</p>
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
              ><code><span class="line"><span class="cl"><span class="k">namespace</span> <span class="nx">App\Services</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">use</span> <span class="nx">App\Exceptions\NotFound</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">use</span> <span class="nx">Exception</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleRegistry</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="k">function</span> <span class="nf">put</span><span class="p">(</span><span class="nv">$key</span><span class="p">,</span> <span class="nv">$value</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="nx">\App\some_utility_function</span><span class="p">(</span><span class="s1">&#39;some argument&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Return the id of the item inserted
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="k">return</span> <span class="mi">456</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="k">function</span> <span class="nf">faultyMethod</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">throw</span> <span class="k">new</span> <span class="nx">Exception</span><span class="p">(</span><span class="s1">&#39;Generated at runtime&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="k">function</span> <span class="nf">get</span><span class="p">(</span><span class="nv">$key</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// The service uses an exception to report a key not found.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="k">throw</span> <span class="k">new</span> <span class="nx">NotFound</span><span class="p">(</span><span class="s1">&#39;The key was not found&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">public</span> <span class="k">function</span> <span class="nf">compact</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// This function executes some operations on the registry and
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// returns nothing. In the middle of the function, we have an
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// interesting value that is not returned but can be related
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// to the slowness of the function
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">        <span class="nv">$numberOfItemsProcessed</span> <span class="o">=</span> <span class="mi">123</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="steps-to-instrument-php">
          Steps to instrument the sample application
        </h3>
        <p>
          To avoid mixing application or service business logic with
          instrumentation code, write the required code in a separate file:
        </p>
        <ol>
          <li>
            <p>
              Create a file <code>datadog/instrumentation.php</code> and add it
              to the composer autoloader:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-json">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="err">...</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;autoload&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="err">...</span>
</span></span><span class="line"><span class="cl">        <span class="nt">&#34;files&#34;</span><span class="p">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">            <span class="err">...</span>
</span></span><span class="line"><span class="cl">            <span class="s2">&#34;datadog/instrumentation.php&#34;</span>
</span></span><span class="line"><span class="cl">        <span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="err">...</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>Dump the autoloader by running <code>composer dump</code>.</p>
            <div class="alert alert-info">
              <p>
                The file that contains the custom instrumentation code and the
                actual classes that are instrumented are not required to be in
                the same codebase and package. By separating them, you can
                publish an open source composer package containing only your
                instrumentation code, which others might find useful.
              </p>
            </div>
          </li>
          <li>
            <p>
              In the <code>datadog/instrumentation.php</code> file, check if the
              extension is loaded:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-php">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">extension_loaded</span><span class="p">(</span><span class="s1">&#39;ddtrace&#39;</span><span class="p">))</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              Instrument a function. For
              <code>\App\some_utility_function</code>, if you are not interested
              in any specific aspect of the function other than the execution
              time:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-php">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_function</span><span class="p">(</span><span class="s1">&#39;App\some_utility_function&#39;</span><span class="p">,</span> <span class="k">function</span> <span class="p">(</span><span class="nx">\DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span> <span class="nv">$args</span><span class="p">,</span> <span class="nv">$ret</span><span class="p">,</span> <span class="nv">$exception</span><span class="p">)</span> <span class="p">{});</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              For the <code>SampleRegistry::put</code> method, add tags with the
              returned item identifier and the key. Because <code>put</code> is
              a method, use <code>\DDTrace\trace_method</code> instead of
              <code>\DDTrace\trace_function</code>:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-php">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_method</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;App\Services\SampleRegistry&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;put&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="k">function</span> <span class="p">(</span><span class="nx">\DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span> <span class="nv">$args</span><span class="p">,</span> <span class="nv">$ret</span><span class="p">,</span> <span class="nv">$exception</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;app.cache.key&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$args</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span> <span class="c1">// The first argument is the &#39;key&#39;
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;app.cache.item_id&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$ret</span><span class="p">;</span> <span class="c1">// The returned value
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              For <code>SampleRegistry::faultyMethod</code>, which generates an
              exception, there is nothing extra to do. If the method is
              instrumented, the default exception reporting mechanism attaches
              the exception message and stack trace.
            </p>
          </li>
          <li>
            <p>
              For <code>SampleRegistry::get</code>, which uses a
              <code>NotFound</code> exception as part of business logic, you can
              prevent marking the span as an error by unsetting the exception:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-php">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_method</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;App\Services\SampleRegistry&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;get&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="k">function</span> <span class="p">(</span><span class="nx">\DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span> <span class="nv">$args</span><span class="p">,</span> <span class="nv">$ret</span><span class="p">,</span> <span class="nv">$exception</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">if</span> <span class="p">(</span><span class="nv">$exception</span> <span class="nx">instanceof</span> <span class="nx">\App\Exceptions\NotFound</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="nx">unset</span><span class="p">(</span><span class="nv">$span</span><span class="o">-&gt;</span><span class="na">exception</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">            <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">resource</span> <span class="o">=</span> <span class="s1">&#39;cache.get.not_found&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>
              For <code>SampleRegistry::compact</code>, to add a tag with a
              value that is neither an argument nor the return value, you can
              access the active span directly from within the method:
            </p>
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-php">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">public</span> <span class="k">function</span> <span class="nf">compact</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nv">$numberOfItemsProcessed</span> <span class="o">=</span> <span class="mi">123</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// Add instrumenting code within your business logic.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="k">if</span> <span class="p">(</span><span class="nx">\function_exists</span><span class="p">(</span><span class="s1">&#39;\DDTrace\active_span&#39;</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nv">$span</span> <span class="o">=</span> <span class="nx">\DDTrace\active_span</span><span class="p">())</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;registry.compact.items_processed&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$numberOfItemsProcessed</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ol>
        <h2 id="details-trace-function-method-php">
          Details about <code>trace_function</code> and
          <code>trace_method</code>
        </h2>
        <p>
          The <code>DDTrace\trace_function</code> and
          <code>DDTrace\trace_method</code> functions instrument (trace)
          specific function and method calls. These functions automatically
          handle the following tasks:
        </p>
        <ul>
          <li>
            Open a <a href="/tracing/glossary/#spans">span</a> before the code
            executes.
          </li>
          <li>Set any errors from the instrumented call on the span.</li>
          <li>Close the span when the instrumented call is done.</li>
        </ul>
        <p>
          Additional <a href="/tracing/glossary/#span-tags">tags</a> are set on
          the span from the closure (called a tracing closure).
        </p>
        <p>
          For example, the following snippet traces the
          <code>CustomDriver::doWork</code> method and adds custom tags:
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_method</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;CustomDriver&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;doWork&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="k">function</span> <span class="p">(</span><span class="nx">\DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span> <span class="k">array</span> <span class="nv">$args</span><span class="p">,</span> <span class="nv">$retval</span><span class="p">,</span> <span class="nv">$exception</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// This closure runs after the instrumented call
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">name</span> <span class="o">=</span> <span class="s1">&#39;CustomDriver.doWork&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">resource</span> <span class="o">=</span> <span class="s1">&#39;CustomDriver.doWork&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">service</span> <span class="o">=</span> <span class="s1">&#39;php&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="c1">// If an exception was thrown from the instrumented call, return value is null
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;doWork.size&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$exception</span> <span class="o">?</span> <span class="mi">0</span> <span class="o">:</span> <span class="nx">count</span><span class="p">(</span><span class="nv">$retval</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Access object members via $this
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;doWork.thing&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">workToDo</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="cp">?&gt;</span><span class="err">
</span></span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="accessing-active-spans-php">Accessing active spans</h2>
        <p>
          The built-in instrumentation and your own custom instrumentation
          creates spans around meaningful operations. You can access the active
          span in order to include meaningful data.
        </p>
        <h3 id="current-span-php">Current span</h3>
        <p>
          The following method returns a <code>DDTrace\SpanData</code> object.
          When tracing is disabled, <code>null</code> is returned.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl"><span class="nv">$span</span> <span class="o">=</span> <span class="nx">\DDTrace\active_span</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="k">if</span> <span class="p">(</span><span class="nv">$span</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;customer.id&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">get_customer_id</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="cp">?&gt;</span><span class="err">
</span></span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="root-span-php">Root span</h3>
        <p>
          The following method returns a <code>DDTrace\SpanData</code> object.
          When tracing is disabled, <code>null</code> is returned. This is
          useful in contexts where the metadata to be added to the root span
          does not exist in early script execution.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl"><span class="nv">$span</span> <span class="o">=</span> <span class="nx">\DDTrace\root_span</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="k">if</span> <span class="p">(</span><span class="nv">$span</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;customer.id&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">get_customer_id</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="cp">?&gt;</span><span class="err">
</span></span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="adding-tags-php">Adding tags</h2>
        <div class="alert alert-danger">
          <p>
            When you set tags, to avoid overwriting existing tags automatically
            added by the Datadog core instrumentation,
            <strong
              >do write <code>$span-&gt;meta['mytag'] = 'value'</code></strong
            >. Do not write
            <code>$span-&gt;meta = ['mytag' =&gt; 'value']</code>.
          </p>
        </div>
        <h3 id="adding-tags-locally-php">Adding tags locally</h3>
        <p>
          Add tags to a span by using the
          <code>DDTrace\SpanData::$meta</code> array.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_function</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;myRandFunc&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="k">function</span><span class="p">(</span><span class="nx">\DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span> <span class="k">array</span> <span class="nv">$args</span><span class="p">,</span> <span class="nv">$retval</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;rand.range&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$args</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">.</span> <span class="s1">&#39; - &#39;</span> <span class="o">.</span> <span class="nv">$args</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">        <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;rand.value&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$retval</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-globally-php">Adding tags globally</h3>
        <p>
          Set the <code>DD_TAGS</code> environment variable (version 0.47.0+) to
          automatically apply tags to every span that is created.
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
              ><code><span class="line"><span class="cl">DD_TAGS=key1:value1,&lt;TAG_KEY&gt;:&lt;TAG_VALUE&gt;
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="setting-errors-on-a-span-php">Setting errors on a span</h3>
        <p>
          Thrown exceptions are automatically attached to the active span,
          unless the exception is thrown at a deeper level in the call stack and
          it is caught before it reaches any function that is traced.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">function</span> <span class="nf">doRiskyThing</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">throw</span> <span class="k">new</span> <span class="nx">Exception</span><span class="p">(</span><span class="s1">&#39;Oops!&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_function</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;doRiskyThing&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="k">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Span will be flagged as erroneous and have
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// the stack trace and exception message attached as tags
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Set the <code>error.message</code> tag to manually flag a span as
          erroneous.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">function</span> <span class="nf">doRiskyThing</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="nx">SOME_ERROR_CODE</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_function</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;doRiskyThing&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="k">function</span><span class="p">(</span><span class="nx">\DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span> <span class="nv">$args</span><span class="p">,</span> <span class="nv">$retval</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">if</span> <span class="p">(</span><span class="nv">$retval</span> <span class="o">===</span> <span class="nx">SOME_ERROR_CODE</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;error.message&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="s1">&#39;Foo error&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Optional:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>            <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;error.type&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="s1">&#39;CustomError&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">            <span class="nv">$span</span><span class="o">-&gt;</span><span class="na">meta</span><span class="p">[</span><span class="s1">&#39;error.stack&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="p">(</span><span class="k">new</span> <span class="nx">\Exception</span><span class="p">)</span><span class="o">-&gt;</span><span class="na">getTraceAsString</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="adding-span-links-php">Adding span links</h2>
        <p>
          Span links associate one or more spans together that don't have a
          typical parent-child relationship. They may associate spans within the
          same trace or spans across different traces.
        </p>
        <p>To add a span link from an existing span:</p>
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
              ><code><span class="line"><span class="cl"><span class="nv">$spanA</span> <span class="o">=</span> <span class="nx">\DDTrace\start_trace_span</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="nv">$spanA</span><span class="o">-&gt;</span><span class="na">name</span> <span class="o">=</span> <span class="s1">&#39;spanA&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="nx">\DDTrace\close_span</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nv">$spanB</span> <span class="o">=</span> <span class="nx">\DDTrace\start_trace_span</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="nv">$spanB</span><span class="o">-&gt;</span><span class="na">name</span> <span class="o">=</span> <span class="s1">&#39;spanB&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Link spanB to spanA
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nv">$spanB</span><span class="o">-&gt;</span><span class="na">links</span><span class="p">[]</span> <span class="o">=</span> <span class="nv">$spanA</span><span class="o">-&gt;</span><span class="na">getLink</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="nx">\DDTrace\close_span</span><span class="p">();</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="context-propagation-php">
          Context propagation for distributed traces
        </h2>
        <p>
          You can configure the propagation of context for distributed traces by
          injecting and extracting headers. Read
          <a href="/tracing/trace_collection/trace_context_propagation/"
            >Trace Context Propagation</a
          >
          for information.
        </p>
        <h2 id="resource-filtering-php">Resource filtering</h2>
        <p>
          Traces can be excluded based on their resource name, to remove
          synthetic traffic such as health checks from reporting traces to
          Datadog. This and other security and fine-tuning configurations can be
          found on the <a href="/tracing/security">Security</a> page.
        </p>
        <h2 id="api-reference-php">API reference</h2>
        <div class="alert alert-info">
          <p>
            The Datadog APM PHP Api is fully documented
            <a
              href="https://github.com/DataDog/dd-trace-php/blob/master/ext/ddtrace.stub.php"
              >in stubs</a
            >. This allows you to have automated documentation in PHPStorm.
          </p>
        </div>
        <h3 id="parameters-tracing-closure-php">
          Parameters of the tracing closure
        </h3>
        <p>
          The tracing closure provided to
          <code>DDTrace\trace_method()</code> and
          <code>DDTrace\trace_function()</code> has four parameters:
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
              ><code><span class="line"><span class="cl"><span class="k">function</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="k">array</span> <span class="nv">$args</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">mixed</span> <span class="nv">$retval</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">Exception</span><span class="o">|</span><span class="k">null</span> <span class="nv">$exception</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <ol>
          <li>
            <strong>$span</strong>: An instance of
            <code>DDTrace\SpanData</code> to write to the span properties
          </li>
          <li>
            <strong>$args</strong>: An <code>array</code> of arguments from the
            instrumented call
          </li>
          <li>
            <strong>$retval</strong>: The return value of the instrumented call
          </li>
          <li>
            <strong>$exception</strong>: An instance of the exception that was
            thrown in the instrumented call or <code>null</code> if no exception
            was thrown
          </li>
        </ol>
        <h2 id="advanced-configurations-php">Advanced configurations</h2>
        <h3 id="tracing-internal-functions-php">
          Tracing internal functions and methods
        </h3>
        <p>
          As of version 0.76.0, all internal functions can unconditionally be
          traced.
        </p>
        <p>
          On older versions, tracing internal functions and methods requires
          setting the
          <code>DD_TRACE_TRACED_INTERNAL_FUNCTIONS</code> environment variable,
          which takes a CSV of functions or methods that is to be instrumented.
          For example,
          <code
            >DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add</code
          >. Once a function or method has been added to the list, it can be
          instrumented using <code>DDTrace\trace_function()</code> and
          <code>DDTrace\trace_method()</code> respectively. The
          <code>DD_TRACE_TRACED_INTERNAL_FUNCTIONS</code> environment variable
          is obsolete as of version 0.76.0.
        </p>
        <h3 id="tracing-closure-before-php">
          Running the tracing closure before the instrumented call
        </h3>
        <p>
          By default, tracing closures are treated as
          <code>posthook</code> closures meaning they are executed
          <em>after</em> the instrumented call. Some cases require running the
          tracing closure <em>before</em> the instrumented call. In that case,
          tracing closures are marked as <code>prehook</code> using an
          associative configuration array.
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
              ><code><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_function</span><span class="p">(</span><span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;prehook&#39;</span> <span class="o">=&gt;</span> <span class="k">function</span> <span class="p">(</span><span class="nx">\DDTrace\SpanData</span> <span class="nv">$span</span><span class="p">,</span> <span class="k">array</span> <span class="nv">$args</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// This tracing closure will run before the instrumented call
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">]);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="debugging-sandboxed-errors-php">Debugging sandboxed errors</h3>
        <p>
          Tracing closures are &quot;sandboxed&quot; in that exceptions thrown
          and errors raised inside of them do no impact the instrumented call.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;?</span><span class="nx">php</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">function</span> <span class="nf">my_func</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">echo</span> <span class="s1">&#39;Hello!&#39;</span> <span class="o">.</span> <span class="nx">PHP_EOL</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">\DDTrace\trace_function</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="s1">&#39;my_func&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="k">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">throw</span> <span class="k">new</span> <span class="nx">\Exception</span><span class="p">(</span><span class="s1">&#39;Oops!&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">my_func</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="k">echo</span> <span class="s1">&#39;Done.&#39;</span> <span class="o">.</span> <span class="nx">PHP_EOL</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="cm">/*
</span></span></span><span class="line"><span class="cl"><span class="cm">Hello!
</span></span></span><span class="line"><span class="cl"><span class="cm">Done.
</span></span></span><span class="line"><span class="cl"><span class="cm">*/</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          To debug, set the environment variable
          <code>DD_TRACE_DEBUG=1</code> to expose any exceptions or errors that
          may have occurred in a tracing closure.
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
              ><code><span class="line"><span class="cl"><span class="cm">/*
</span></span></span><span class="line"><span class="cl"><span class="cm">Hello!
</span></span></span><span class="line"><span class="cl"><span class="cm">Exception thrown in tracing closure for my_func: Oops!
</span></span></span><span class="line"><span class="cl"><span class="cm">Done.
</span></span></span><span class="line"><span class="cl"><span class="cm">*/</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="zend-framework-1-php">
          Zend framework 1 manual instrumentation
        </h3>
        <p>
          Zend framework 1 is automatically instrumented by default, so you are
          not required to modify your ZF1 project. However, if automatic
          instrumentation is disabled, enable the tracer manually.
        </p>
        <p>
          First,
          <a href="https://github.com/DataDog/dd-trace-php/releases/latest"
            >download the latest source code from the releases page</a
          >. Extract the zip file and copy the <code>src/DDTrace</code> folder
          to your application's <code>/library</code> folder. Then add the
          following to your
          <code>application/configs/application.ini</code> file:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-ini">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="na">autoloaderNamespaces[]</span> <span class="o">=</span> <span class="s">&#34;DDTrace_&#34;</span>
</span></span><span class="line"><span class="cl"><span class="na">pluginPaths.DDTrace</span> <span class="o">=</span> <span class="s">APPLICATION_PATH &#34;/../library/DDTrace/Integrations/ZendFramework/V1&#34;</span>
</span></span><span class="line"><span class="cl"><span class="na">resources.ddtrace</span> <span class="o">=</span> <span class="s">true</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="php-code-optimization-php">PHP code optimization</h3>
        <p>
          Prior to PHP 7, some frameworks provided ways to compile PHP classes
          (for example, through the Laravel's
          <code>php artisan optimize</code> command).
        </p>
        <p>
          While this
          <a
            href="https://laravel-news.com/laravel-5-6-removes-artisan-optimize"
            >has been deprecated</a
          >
          if you are using PHP 7.x, you still may use this caching mechanism in
          your app prior to version 7.x. In this case, Datadog suggests you use
          the
          <a href="/tracing/trace_collection/opentracing/php#opentracing"
            >OpenTracing</a
          >
          API instead of adding <code>datadog/dd-trace</code> to your Composer
          file.
        </p>
      </div>
      <div
        class="cdoc__toggleable cdoc__hidden"
        data-description="Language is C++"
        data-if="232"
      >
        <div class="alert alert-info">
          <p>
            If you have not yet read the setup instructions, start with the
            <a href="/tracing/setup/cpp/">C++ Setup Instructions</a>.
          </p>
        </div>
        <h2 id="creating-spans-cpp">Creating spans</h2>
        <p>To manually instrument a method:</p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-cpp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Create a root span for the current request.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="k">auto</span> <span class="n">root_span</span> <span class="o">=</span> <span class="n">tracer</span><span class="p">.</span><span class="n">create_span</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">  <span class="n">root_span</span><span class="p">.</span><span class="n">set_name</span><span class="p">(</span><span class="s">&#34;get_ingredients&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Set a resource name for the root span.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="n">root_span</span><span class="p">.</span><span class="n">set_resource_name</span><span class="p">(</span><span class="s">&#34;bologna_sandwich&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Create a child span with the root span as its parent.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="k">auto</span> <span class="n">child_span</span> <span class="o">=</span> <span class="n">root_span</span><span class="p">.</span><span class="n">create_child</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">  <span class="n">child_span</span><span class="p">.</span><span class="n">set_name</span><span class="p">(</span><span class="s">&#34;cache_lookup&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Set a resource name for the child span.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="n">child_span</span><span class="p">.</span><span class="n">set_resource_name</span><span class="p">(</span><span class="s">&#34;ingredients.bologna_sandwich&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Spans can be finished at an explicit time ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="n">child_span</span><span class="p">.</span><span class="n">set_end_time</span><span class="p">(</span><span class="n">std</span><span class="o">::</span><span class="n">chrono</span><span class="o">::</span><span class="n">steady_clock</span><span class="o">::</span><span class="n">now</span><span class="p">());</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="c1">// ... or implicitly when the destructor is invoked.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="c1">// For example, root_span finishes here.
</span></span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="adding-tags-cpp">Adding tags</h2>
        <p>
          Add custom <a href="/tracing/glossary/#span-tags">span tags</a> to
          your <a href="/tracing/glossary/#spans">spans</a> to customize your
          observability within Datadog. Span tags are applied to your incoming
          traces, allowing you to correlate observed behavior with code-level
          information such as merchant tier, checkout amount, or user ID.
        </p>
        <p>
          Note that some Datadog tags are necessary for
          <a href="/getting_started/tagging/unified_service_tagging"
            >unified service tagging</a
          >.
        </p>
        <h3 id="adding-tags-locally-cpp">Adding tags locally</h3>
        <p>
          Add tags directly to a span object by calling
          <code>Span::set_tag</code>. For example:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-cpp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="c1">// Add tags directly to a span by calling `Span::set_tag`
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">auto</span> <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="p">.</span><span class="n">create_span</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="p">.</span><span class="n">set_tag</span><span class="p">(</span><span class="s">&#34;key must be string&#34;</span><span class="p">,</span> <span class="s">&#34;value must also be a string&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Or, add tags by setting a `SpanConfig`
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">datadog</span><span class="o">::</span><span class="n">tracing</span><span class="o">::</span><span class="n">SpanConfig</span> <span class="n">opts</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">opts</span><span class="p">.</span><span class="n">tags</span><span class="p">.</span><span class="n">emplace</span><span class="p">(</span><span class="s">&#34;team&#34;</span><span class="p">,</span> <span class="s">&#34;apm-proxy&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="k">auto</span> <span class="n">span2</span> <span class="o">=</span> <span class="n">tracer</span><span class="p">.</span><span class="n">create_span</span><span class="p">(</span><span class="n">opts</span><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="adding-tags-globally-cpp">Adding tags globally</h3>
        <h4 id="environment-variable-cpp">Environment variable</h4>
        <p>
          To set tags across all your spans, set the
          <code>DD_TAGS</code> environment variable as a list of
          <code>key:value</code> pairs separated by commas.
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
              ><code><span class="line"><span class="cl">export DD_TAGS=team:apm-proxy,key:value
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h4 id="in-code-cpp">In code</h4>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-cpp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="n">datadog</span><span class="o">::</span><span class="n">tracing</span><span class="o">::</span><span class="n">TracerConfig</span> <span class="n">tracer_config</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">tracer_config</span><span class="p">.</span><span class="n">tags</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="p">{</span><span class="s">&#34;team&#34;</span><span class="p">,</span> <span class="s">&#34;apm-proxy&#34;</span><span class="p">},</span>
</span></span><span class="line"><span class="cl">  <span class="p">{</span><span class="s">&#34;apply&#34;</span><span class="p">,</span> <span class="s">&#34;on all spans&#34;</span><span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">const</span> <span class="k">auto</span> <span class="n">validated_config</span> <span class="o">=</span> <span class="n">datadog</span><span class="o">::</span><span class="n">tracing</span><span class="o">::</span><span class="n">finalize_config</span><span class="p">(</span><span class="n">tracer_config</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="k">auto</span> <span class="n">tracer</span> <span class="o">=</span> <span class="n">datadog</span><span class="o">::</span><span class="n">tracing</span><span class="o">::</span><span class="n">Tracer</span><span class="p">(</span><span class="o">*</span><span class="n">validated_config</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// All new spans will have contains tags defined in `tracer_config.tags`
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">auto</span> <span class="n">span</span> <span class="o">=</span> <span class="n">tracer</span><span class="p">.</span><span class="n">create_span</span><span class="p">();</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h3 id="set-errors-on-a-span-cpp">Set errors on a span</h3>
        <p>
          To associate a span with an error, set one or more error-related tags
          on the span. For example:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-cpp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="n">span</span><span class="p">.</span><span class="n">set_error</span><span class="p">(</span><span class="nb">true</span><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          Add more specific information about the error by setting any
          combination of <code>error.message</code>, <code>error.stack</code>,
          or <code>error.type</code> by using respectively
          <code>Span::set_error_message</code>,
          <code>Span::set_error_stack</code> and
          <code>Span::set_error_type</code>. See
          <a href="/tracing/error_tracking/">Error Tracking</a> for more
          information about error tags.
        </p>
        <p>An example of adding a combination of error tags:</p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-cpp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="c1">// Associate this span with the &#34;bad file descriptor&#34; error from the standard
</span></span></span><span class="line"><span class="cl"><span class="c1">// library.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">span</span><span class="p">.</span><span class="n">set_error_message</span><span class="p">(</span><span class="s">&#34;error&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="p">.</span><span class="n">set_error_stack</span><span class="p">(</span><span class="s">&#34;[EBADF] invalid file&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="n">span</span><span class="p">.</span><span class="n">set_error_type</span><span class="p">(</span><span class="s">&#34;errno&#34;</span><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <div class="alert alert-info">
          <p>
            Using any of the <code>Span::set_error_*</code> result in an
            underlying call to <code>Span::set_error(true)</code>.
          </p>
        </div>
        <p>
          To unset an error on a span, set <code>Span::set_error</code> to
          <code>false</code>, which removes any combination of
          <code>Span::set_error_stack</code>,
          <code>Span::set_error_type</code> or
          <code>Span::set_error_message</code>.
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-cpp">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="c1">// Clear any error information associated with this span.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">span</span><span class="p">.</span><span class="n">set_error</span><span class="p">(</span><span class="nb">false</span><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <h2 id="propagating-context-cpp">
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
        <h2 id="resource-filtering-cpp">Resource filtering</h2>
        <p>
          Traces can be excluded based on their resource name, to remove
          synthetic traffic such as health checks from sending traces and
          influencing trace metrics. Find information about this and other
          security and fine-tuning configuration on the
          <a href="/tracing/security">Security</a> page.
        </p>
      </div>
    </div>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/guide/instrument_custom_method"><span class="w-100 d-flex justify-content-between "><span class="text">Instrument a custom method to get deep visibility into your business logic</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/connect_logs_and_traces"><span class="w-100 d-flex justify-content-between "><span class="text">Connect your Logs and Traces together</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/visualization/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://www.datadoghq.com/blog/opentelemetry-instrumentation/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn More about Datadog and the OpenTelemetry initiative</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"205":{"m":"F","n":"e","p":{"0":{"m":"V","p":["api_type"],"v":"otel_api"},"1":"otel_api"},"v":true,"r":"205"},"206":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"cpp"},"v":false,"r":"206"},"207":{"m":"F","n":"e","p":{"0":{"m":"V","p":["api_type"],"v":"otel_api"},"1":"dd_api"},"v":false,"r":"207"},"208":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"rust"},"v":false,"r":"208"},"209":{"m":"F","n":"e","p":{"0":{"m":"V","p":["api_type"],"v":"otel_api"},"1":"dd_api"},"v":false,"r":"209"},"210":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"elixir"},"v":false,"r":"210"},"211":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"elixir"},"v":false,"r":"211"},"212":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"java"},"v":true,"r":"212"},"213":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"213"},"214":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"214"},"215":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"go"},"v":false,"r":"215"},"216":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"216"},"217":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"217"},"218":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"php"},"v":false,"r":"218"},"219":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"rust"},"v":false,"r":"219"},"223":{"m":"F","n":"n","p":{"0":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"cpp"},"v":false,"r":"220"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"elixir"},"v":false,"r":"221"}},"v":false,"r":"222"}},"v":true,"r":"223"},"224":{"m":"F","n":"e","p":{"0":{"m":"V","p":["api_type"],"v":"otel_api"},"1":"otel_api"},"v":true,"r":"224"},"225":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"java"},"v":true,"r":"225"},"226":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"python"},"v":false,"r":"226"},"227":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"node_js"},"v":false,"r":"227"},"228":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"go"},"v":false,"r":"228"},"229":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"ruby"},"v":false,"r":"229"},"230":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"dot_net"},"v":false,"r":"230"},"231":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"php"},"v":false,"r":"231"},"232":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"cpp"},"v":false,"r":"232"},"236":{"m":"F","n":"n","p":{"0":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"rust"},"v":false,"r":"233"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["prog_lang"],"v":"java"},"1":"elixir"},"v":false,"r":"234"}},"v":false,"r":"235"}},"v":true,"r":"236"},"237":{"m":"F","n":"e","p":{"0":{"m":"V","p":["api_type"],"v":"otel_api"},"1":"dd_api"},"v":false,"r":"237"}},    filtersManifest: {"filtersByTraitId":{"prog_lang":{"config":{"trait_id":"prog_lang","option_group_id":"custom_instrumentation_language_options","label":"Language"},"defaultValsByOptionGroupId":{"custom_instrumentation_language_options":"java"}},"api_type":{"config":{"trait_id":"api_type","option_group_id":"custom_instrumentation_api_options","label":"API"},"defaultValsByOptionGroupId":{"custom_instrumentation_api_options":"otel_api"}}},"defaultValsByTraitId":{"prog_lang":"java","api_type":"otel_api"},"optionGroupsById":{"custom_instrumentation_language_options":[{"default":true,"id":"java","label":"Java"},{"id":"python","label":"Python"},{"id":"node_js","label":"Node.js"},{"id":"go","label":"Go"},{"id":"ruby","label":"Ruby"},{"id":"dot_net","label":".NET"},{"id":"php","label":"PHP"},{"id":"cpp","label":"C++"},{"id":"rust","label":"Rust"},{"id":"elixir","label":"Elixir"}],"custom_instrumentation_api_options":[{"default":true,"id":"otel_api","label":"OpenTelemetry"},{"id":"dd_api","label":"Datadog"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>