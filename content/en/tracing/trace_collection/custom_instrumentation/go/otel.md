---
title: Go Custom Instrumentation using the OpenTelemetry API
description: >-
  Instrument your Go application with the OpenTelemetry API to send traces to
  Datadog.
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
  - /tracing/trace_collection/otel_instrumentation/go/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
further_reading:
  - link: tracing/glossary/
    tag: Documentation
    text: Explore your services, resources, and traces
  - link: /opentelemetry/guide/otel_api_tracing_interoperability
    tag: Documentation
    text: Interoperability of OpenTelemetry API and Datadog instrumented traces
---
<div id="cdoc-content" class="customizable"><article>
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
        Add your desired manual OpenTelemetry instrumentation to your Go code
        following the
        <a href="https://opentelemetry.io/docs/instrumentation/go/manual/"
          >OpenTelemetry Go Manual Instrumentation documentation</a
        >. <strong>Important!</strong> Where those instructions indicate that
        your code should call the OpenTelemetry SDK, call the Datadog tracing
        library instead.
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/glossary/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability"><span class="w-100 d-flex justify-content-between "><span class="text">Interoperability of OpenTelemetry API and Datadog instrumented traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>