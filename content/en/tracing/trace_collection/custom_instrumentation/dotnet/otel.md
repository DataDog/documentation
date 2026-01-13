---
title: .NET Custom Instrumentation using the OpenTelemetry API
description: >-
  Instrument your .NET application with the OpenTelemetry API to send traces to
  Datadog.
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
  - /tracing/trace_collection/otel_instrumentation/dotnet/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
further_reading:
  - link: tracing/glossary/
    tag: Documentation
    text: Explore your services, resources, and traces
  - link: /opentelemetry/guide/otel_api_tracing_interoperability
    tag: Documentation
    text: Interoperability of OpenTelemetry API and Datadog instrumented traces
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="setup">Setup</h2>
  <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
  <ol>
    <li>
      <p>
        Add your desired manual OpenTelemetry instrumentation to your .NET code
        following the
        <a href="https://opentelemetry.io/docs/instrumentation/net/manual/"
          >OpenTelemetry .NET Manual Instrumentation documentation</a
        >. <strong>Note</strong>: Where those instructions indicate that your
        code should call the OpenTelemetry SDK, call the Datadog tracing library
        instead.
      </p>
    </li>
    <li>
      <p>
        Install the Datadog .NET tracing library and enable the tracer for your
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
    Datadog combines these OpenTelemetry spans with other Datadog APM spans into
    a single trace of your application. It also supports
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
    Set error information on a span when an error occurs during its execution:
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/glossary/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability"><span class="w-100 d-flex justify-content-between "><span class="text">Interoperability of OpenTelemetry API and Datadog instrumented traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>