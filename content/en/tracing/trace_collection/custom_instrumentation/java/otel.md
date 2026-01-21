---
title: Java Custom Instrumentation using the OpenTelemetry API
description: >-
  Instrument your Java application with the OpenTelemetry API to send traces to
  Datadog.
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
  - /tracing/trace_collection/otel_instrumentation/java/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
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
      <a href="/tracing/setup/java/">Java Setup Instructions</a>.
    </p>
  </div>
  <h2 id="setup">Setup</h2>
  <div class="alert alert-info">
    <p>OpenTelemetry is supported in Java after version 1.24.0.</p>
  </div>
  <p>To configure OpenTelemetry to use the Datadog trace provider:</p>
  <ol>
    <li>
      <p>
        If you have not yet read the instructions for auto-instrumentation and
        setup, start with the
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
    Add custom tags to your spans corresponding to any dynamic value within your
    application code such as <code>customer.id</code>.
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
    generated spans for an application. This is useful for grouping stats for
    your applications, data centers, or any other tags you would like to see in
    Datadog.
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
    <a href="/tracing/glossary/#trace">traces</a>, you may want to add custom
    instrumentation to your code for complete flame graphs or to measure
    execution times for pieces of code.
  </p>
  <p>
    If modifying application code is not possible, use the environment variable
    <code>dd.trace.methods</code> to detail these methods.
  </p>
  <p>
    If you have existing <code>@Trace</code> or similar annotations, or prefer
    to use annotations to complete any incomplete traces within Datadog, use
    Trace Annotations.
  </p>
  <h3 id="trace-annotations">Trace annotations</h3>
  <p>
    Add <code>@WithSpan</code> to methods to have them be traced when running
    OpenTelemetry and the <code>dd-java-agent.jar</code>. If the Agent is not
    attached, this annotation has no effect on your application.
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
    <code>attributes</code> and <code>timestamp</code> parameters. The method
    creates a new span event with the specified properties and associates it
    with the corresponding span.
  </p>
  <ul>
    <li>
      <strong>Name</strong> [<em>required</em>]: A string representing the
      event's name.
    </li>
    <li>
      <strong>Attributes</strong> [<em>optional</em>]: Key-value pairs where the
      key is a non-empty string and the value is a primitive type or a
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
    from sending traces to Datadog if you don't want those traces to be included
    in calculated metrics, such as traces related to health checks.
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/glossary/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability"><span class="w-100 d-flex justify-content-between "><span class="text">Interoperability of OpenTelemetry API and Datadog instrumented traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>