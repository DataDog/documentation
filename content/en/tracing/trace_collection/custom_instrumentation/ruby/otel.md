---
title: Ruby Custom Instrumentation using the OpenTelemetry API
description: >-
  Instrument your Ruby application with the OpenTelemetry API to send traces to
  Datadog.
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
  - /tracing/trace_collection/otel_instrumentation/ruby/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
further_reading:
  - link: tracing/glossary/
    tag: Documentation
    text: Explore your services, resources, and traces
  - link: /opentelemetry/guide/otel_api_tracing_interoperability
    tag: Documentation
    text: Interoperability of OpenTelemetry API and Datadog instrumented traces
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="requirements-and-limitations">Requirements and limitations</h2>
  <ul>
    <li>
      Datadog Ruby tracing library <code>dd-trace-rb</code> version 1.9.0 or
      greater.
    </li>
    <li>Gem version support 1.1.0 or greater.</li>
  </ul>
  <p>
    The following OpenTelemetry features implemented in the Datadog library as
    noted:
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
          Datadog and W3C Trace Context header formats are enabled by default.
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
          ID generation is performed by the tracing library, with support for
          128-bit trace IDs.
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
        Add your desired manual OpenTelemetry instrumentation to your Ruby code
        following the
        <a href="https://opentelemetry.io/docs/instrumentation/ruby/manual/"
          >OpenTelemetry Ruby Manual Instrumentation documentation</a
        >. <strong>Important!</strong> Where those instructions indicate that
        your code should call the OpenTelemetry SDK, call the Datadog tracing
        library instead.
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
      <p>Add the following lines to your OpenTelemetry configuration file:</p>
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
    Datadog combines these OpenTelemetry spans with other Datadog APM spans into
    a single trace of your application. It supports
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/glossary/"><span class="w-100 d-flex justify-content-between "><span class="text">Explore your services, resources, and traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability"><span class="w-100 d-flex justify-content-between "><span class="text">Interoperability of OpenTelemetry API and Datadog instrumented traces</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>