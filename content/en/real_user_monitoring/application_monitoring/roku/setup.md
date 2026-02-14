---
title: Roku Channel Monitoring Setup
description: >-
  Set up RUM monitoring for Roku channels to track user interactions,
  performance, and errors on TV streaming applications.
aliases:
  - /real_user_monitoring/roku/
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/roku
  - /real_user_monitoring/mobile_and_tv_monitoring/roku/setup
further_reading:
  - link: /real_user_monitoring/application_monitoring/roku/advanced_configuration
    tag: Documentation
    text: RUM Roku Advanced Configuration
  - link: https://github.com/DataDog/dd-sdk-roku
    tag: Source Code
    text: Source code for dd-sdk-roku
  - link: /real_user_monitoring
    tag: Documentation
    text: Explore Datadog RUM
  - link: https://www.datadoghq.com/blog/monitor-roku-with-rum/
    tag: Blog
    text: Monitor your Roku channels with Datadog RUM
site_support_id: rum_roku
---
<div id="cdoc-content" class=""><article>
  <p>
    This page describes how to instrument your applications for
    <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
    Roku SDK. RUM includes Error Tracking by default, but if you have purchased
    Error Tracking as a standalone product, see the
    <a href="/error_tracking/frontend/mobile/roku/"
      >Error Tracking setup guide</a
    >
    for specific steps.
  </p>
  <p>
    The Datadog Roku SDK supports BrightScript channels for Roku OS 10 and
    higher.
  </p>
  <h2 id="setup">Setup</h2>
  <h3 id="step-1--declare-the-sdk-as-a-dependency">
    Step 1 - Declare the SDK as a dependency
  </h3>
  <h4 id="using-ropm--recommended">Using ROPM (recommended)</h4>
  <p>
    <code>ROPM</code> is a package manager for the Roku platform (based on NPM).
    If you're not already using <code>ROPM</code> in your Roku project, read
    their
    <a href="https://github.com/rokucommunity/ropm">Getting started guide</a>.
    Once your project is set up to use <code>ROPM</code>, you can use the
    following command to install the Datadog dependency:
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
        ><code><span class="line"><span class="cl">ropm install datadog-roku
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h4 id="setup-manually">Setup manually</h4>
  <p>
    If your project does not use <code>ROPM</code>, install the library manually
    by downloading the
    <a href="https://github.com/DataDog/dd-sdk-roku">Roku SDK</a> zip archive
    and unzipping it in your project's root folder.
  </p>
  <p>
    Make sure you have a <code>roku_modules/datadogroku</code> subfolder in both
    the <code>components</code> and <code>source</code> folders of your project.
  </p>
  <h3 id="step-2--specify-application-details-in-datadog">
    Step 2 - Specify application details in Datadog
  </h3>
  <ol>
    <li>
      Navigate to
      <a href="https://app.datadoghq.com/rum/application/create"
        ><strong>Digital Experience</strong> &gt;
        <strong>Add an Application</strong></a
      >.
    </li>
    <li>
      Select <strong>Roku</strong> as the application type and enter an
      application name to generate a unique Datadog application ID and client
      token.
    </li>
    <li>
      To disable automatic user data collection for client IP or geolocation
      data, uncheck the boxes for those settings. For more information, see
      <a href="/real_user_monitoring/application_monitoring/roku/data_collected"
        >Roku Data Collected</a
      >.
    </li>
  </ol>
  <div class="alert alert-info">
    <p>
      If you've purchased Error Tracking as a standalone product (without RUM),
      navigate to
      <a href="https://app.datadoghq.com/error-tracking/settings/setup/client"
        ><strong>Error Tracking</strong> &gt; <strong>Settings</strong> &gt;
        <strong>Browser and Mobile</strong> &gt;
        <strong>Add an Application</strong></a
      >
      instead.
    </p>
  </div>
  <p>
    To ensure the safety of your data, you must use a client token. If you use
    only
    <a href="/account_management/api-app-keys/#api-keys">Datadog API keys</a> to
    configure the <code>dd-sdk-roku</code> library, they are exposed client-side
    in the Roku channel's BrightScript code.
  </p>
  <p>
    For more information about setting up a client token, see the
    <a href="/account_management/api-app-keys/#client-tokens"
      >Client Token documentation</a
    >.
  </p>
  <h3 id="step-3--initialize-the-library">Step 3 - Initialize the library</h3>
  <p>
    In the initialization snippet, set an environment name. For more
    information, see
    <a href="/getting_started/tagging/using_tags/#rum--session-replay"
      >Using Tags</a
    >.
  </p>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-end"></div>
    <div class="code-snippet">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      <div class="cdoc-code-snippet cdoc-language-vb.net">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl"><span class="k">sub</span> <span class="nf">RunUserInterface</span><span class="p">(</span><span class="n">args</span> <span class="ow">as</span> <span class="n">dynamic</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">screen</span> <span class="o">=</span> <span class="n">CreateObject</span><span class="p">(</span><span class="s">&#34;roSGScreen&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">scene</span> <span class="o">=</span> <span class="n">screen</span><span class="p">.</span><span class="n">CreateScene</span><span class="p">(</span><span class="s">&#34;MyScene&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">screen</span><span class="p">.</span><span class="n">show</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="n">datadogroku_initialize</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">        <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">applicationId</span><span class="p">:</span> <span class="s">&#34;&lt;APPLICATION_ID&gt;&#34;</span>
</span></span><span class="line"><span class="cl">        <span class="n">site</span><span class="p">:</span> <span class="s">&#34;<span class="cdoc js-region-param region-param" data-region-param="roku_site"></span>&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">sessionSampleRate</span><span class="p">:</span> <span class="n">100</span><span class="p">,</span> <span class="c">&#39; the percentage (integer) of sessions to track
</span></span></span><span class="line"><span class="cl"><span class="c"></span>        <span class="n">launchArgs</span><span class="p">:</span> <span class="n">args</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c">&#39; complete your channel setup here
</span></span></span><span class="line"><span class="cl"><span class="c"></span><span class="k">end</span> <span class="k">sub</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h4 id="sample-session-rates">Sample session rates</h4>
  <p>
    To control the data your application sends to Datadog RUM, you can specify a
    sampling rate for RUM sessions while
    <a
      href="/real_user_monitoring/application_monitoring/roku/advanced_configuration/#enrich-user-sessions"
      >initializing the RUM Roku SDK</a
    >. The rate is a percentage between 0 and 100. By default,
    <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
  </p>
  <h2 id="instrument-the-channel">Instrument the channel</h2>
  <p>
    See
    <a href="#track-rum-resources"><strong>Track RUM Resources</strong></a> to
    enable automatic tracking of all your resources, and
    <a href="#enrich-user-sessions"><strong>Enrich user sessions</strong></a> to
    add custom global or user information to your events.
  </p>
  <h3 id="track-views">Track Views</h3>
  <p>
    To split
    <a href="/real_user_monitoring/application_monitoring/roku/data_collected"
      >user sessions</a
    >
    into logical steps, manually start a View using the following code. Every
    navigation to a new screen within your channel should correspond to a new
    View.
  </p>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-end"></div>
    <div class="code-snippet">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      <div class="cdoc-code-snippet cdoc-language-vb.net">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl">    <span class="n">viewName</span> <span class="o">=</span> <span class="s">&#34;VideoDetails&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="n">viewUrl</span> <span class="o">=</span> <span class="s">&#34;components/screens/VideoDetails.xml&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="n">m</span><span class="p">.</span><span class="n">global</span><span class="p">.</span><span class="n">datadogRumAgent</span><span class="p">.</span><span class="n">callfunc</span><span class="p">(</span><span class="s">&#34;startView&#34;</span><span class="p">,</span> <span class="n">viewName</span><span class="p">,</span> <span class="n">viewUrl</span><span class="p">)</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h3 id="track-rum-actions">Track RUM Actions</h3>
  <p>
    RUM Actions represent the interactions your users have with your channel.
    You can forward actions to Datadog as follows:
  </p>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-end"></div>
    <div class="code-snippet">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      <div class="cdoc-code-snippet cdoc-language-vb.net">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl">    <span class="n">targetName</span> <span class="o">=</span> <span class="s">&#34;playButton&#34;</span> <span class="c">&#39; the name of the SG Node the user interacted with
</span></span></span><span class="line"><span class="cl"><span class="c"></span>    <span class="n">actionType</span> <span class="o">=</span> <span class="s">&#34;click&#34;</span> <span class="c">&#39; the type of interaction, should be one of &#34;click&#34;, &#34;back&#34;, or &#34;custom&#34; 
</span></span></span><span class="line"><span class="cl"><span class="c"></span>    <span class="n">m</span><span class="p">.</span><span class="n">global</span><span class="p">.</span><span class="n">datadogRumAgent</span><span class="p">.</span><span class="n">callfunc</span><span class="p">(</span><span class="s">&#34;addAction&#34;</span><span class="p">,</span> <span class="p">{</span> <span class="n">target</span><span class="p">:</span> <span class="n">targetName</span><span class="p">,</span> <span class="n">type</span><span class="p">:</span> <span class="n">actionType</span><span class="p">})</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h3 id="track-rum-errors">Track RUM errors</h3>
  <p>
    Whenever you perform an operation that might throw an exception, you can
    forward the error to Datadog as follows:
  </p>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-end"></div>
    <div class="code-snippet">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      <div class="cdoc-code-snippet cdoc-language-vb.net">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl">    <span class="k">try</span>
</span></span><span class="line"><span class="cl">        <span class="n">doSomethingThatMightThrowAnException</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="k">catch</span> <span class="k">error</span>
</span></span><span class="line"><span class="cl">        <span class="n">m</span><span class="p">.</span><span class="n">global</span><span class="p">.</span><span class="n">datadogRumAgent</span><span class="p">.</span><span class="n">callfunc</span><span class="p">(</span><span class="s">&#34;addError&#34;</span><span class="p">,</span> <span class="k">error</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="k">end</span> <span class="k">try</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h2 id="sending-data-when-device-is-offline">
    Sending data when device is offline
  </h2>
  <p>
    RUM ensures availability of data when your user device is offline. In case
    of low-network areas, or when the device battery is too low, all the RUM
    events are first stored on the local device in batches.
  </p>
  <p>
    Each batch follows the intake specification. They are sent as soon as the
    network is available, and the battery is high enough to ensure the Datadog
    SDK does not impact the end user's experience. If the network is not
    available while your application is in the foreground, or if an upload of
    data fails, the batch is kept until it can be sent successfully.
  </p>
  <p>
    This means that even if users open your application while offline, no data
    is lost. To ensure the SDK does not use too much disk space, the data on the
    disk is automatically discarded if it gets too old.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/roku/advanced_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">RUM Roku Advanced Configuration</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-roku"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-roku</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring"><span class="w-100 d-flex justify-content-between "><span class="text">Explore Datadog RUM</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://www.datadoghq.com/blog/monitor-roku-with-rum/"><span class="w-100 d-flex justify-content-between "><span class="text">Monitor your Roku channels with Datadog RUM</span><span class="badge badge-white pe-2 border-0">BLOG</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>