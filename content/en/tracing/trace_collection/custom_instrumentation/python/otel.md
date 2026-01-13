---
title: Python Custom Instrumentation using the OpenTelemetry API
description: >-
  Instrument your Python application with the OpenTelemetry API to send traces
  to Datadog.
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
  - /tracing/trace_collection/otel_instrumentation/python/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
further_reading:
  - link: tracing/glossary/
    tag: Documentation
    text: Explore your services, resources, and traces
  - link: /opentelemetry/guide/otel_api_tracing_interoperability
    tag: Documentation
    text: Interoperability of OpenTelemetry API and Datadog instrumented traces
---
<div id="cdoc-content" class="customizable"><article>
  <div class="alert alert-info">
    <p>
      If you have not yet read the instructions for auto-instrumentation and
      setup, start with the
      <a href="/tracing/setup/python/">Python Setup Instructions</a>.
    </p>
  </div>
  <h2 id="setup">Setup</h2>
  <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
  <ol>
    <li>
      <p>
        If you have not yet read the instructions for auto-instrumentation and
        setup, start with the
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
    You can add span events using the <code>add_event</code> API. This method
    requires a <code>name</code> parameter and optionally accepts
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/glossary/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability"><span class="w-100 d-flex justify-content-between "><span class="text">Interoperability of OpenTelemetry API and Datadog instrumented traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>