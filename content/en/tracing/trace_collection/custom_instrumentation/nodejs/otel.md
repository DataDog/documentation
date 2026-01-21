---
title: Node.js Custom Instrumentation using the OpenTelemetry API
description: >-
  Instrument your Node.js application with the OpenTelemetry API to send traces
  to Datadog.
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
  - /tracing/trace_collection/otel_instrumentation/nodejs/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
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
        application's entry file (for example, <code>index.js</code>), before
        any other imports:
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
    Datadog combines these OpenTelemetry spans with other Datadog APM spans into
    a single trace of your application. It also supports
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
    instrumented, such as health checks or synthetic traffic. You can use the
    <code>blocklist</code> or <code>allowlist</code> option on the
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
    You can also split the configuration between client and server if needed:
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
    Additionally, you can exclude traces based on their resource name to prevent
    the Agent from sending them to Datadog. For more information on security and
    fine-tuning Agent configurations, read the
    <a href="/tracing/security">Security</a> or
    <a href="/tracing/guide/ignoring_apm_resources/"
      >Ignoring Unwanted Resources</a
    >
    documentation.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/glossary/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability"><span class="w-100 d-flex justify-content-between "><span class="text">Interoperability of OpenTelemetry API and Datadog instrumented traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>