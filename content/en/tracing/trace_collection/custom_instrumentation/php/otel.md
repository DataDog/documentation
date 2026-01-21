---
title: PHP Custom Instrumentation using the OpenTelemetry API
description: >-
  Instrument your PHP application with the OpenTelemetry API to send traces to
  Datadog.
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
  - /tracing/trace_collection/otel_instrumentation/php/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
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
        Add your desired manual OpenTelemetry instrumentation to your PHP code
        following the
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
    Datadog combines these OpenTelemetry spans with other Datadog APM spans into
    a single trace of your application.
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
    Exception information is captured and attached to a span if one is active
    when the exception is raised:
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/glossary/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability"><span class="w-100 d-flex justify-content-between "><span class="text">Interoperability of OpenTelemetry API and Datadog instrumented traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>