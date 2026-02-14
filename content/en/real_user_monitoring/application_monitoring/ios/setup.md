---
title: iOS and tvOS Monitoring Setup
beta: true
description: Collect RUM data from your iOS and tvOS applications.
aliases:
  - /real_user_monitoring/ios
  - /real_user_monitoring/ios/getting_started
  - /real_user_monitoring/ios/swiftui/
  - /real_user_monitoring/swiftui/
  - /real_user_monitoring/mobile_and_tv_monitoring/swiftui/
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/ios
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/setup
further_reading:
  - link: /real_user_monitoring/application_monitoring/ios/advanced_configuration
    tag: Documentation
    text: RUM iOS Advanced Configuration
  - link: https://github.com/DataDog/dd-sdk-ios
    tag: Source Code
    text: Source code for dd-sdk-ios
  - link: /real_user_monitoring
    tag: Documentation
    text: Learn how to explore your RUM data
  - link: /real_user_monitoring/error_tracking/ios/
    tag: Documentation
    text: Learn how to track iOS errors
  - link: /real_user_monitoring/ios/swiftui/
    tag: Documentation
    text: Learn about instrumenting SwiftUI applications
  - link: /real_user_monitoring/application_monitoring/ios/supported_versions
    tag: Documentation
    text: RUM iOS and tvOS monitoring supported versions
  - link: /real_user_monitoring/guide/mobile-sdk-upgrade
    tag: Documentation
    text: Upgrade RUM Mobile SDKs
---
<div id="cdoc-content" class=""><article>
  <h2 id="overview">Overview</h2>
  <p>
    This page describes how to instrument your iOS and tvOS applications for
    <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the iOS
    SDK. RUM includes Error Tracking by default, but if you have purchased Error
    Tracking as a standalone product, see the
    <a href="/error_tracking/">Error Tracking setup guide</a> for specific
    steps.
  </p>
  <h2 id="prerequisites">Prerequisites</h2>
  <p>Before you begin, ensure you have:</p>
  <ul>
    <li>Xcode 12.0 or later</li>
    <li>iOS 11.0+ or tvOS 11.0+ deployment target</li>
    <li>A Datadog account with RUM or Error Tracking enabled</li>
  </ul>
  <h2 id="setup">Setup</h2>
  <p><strong>Choose your setup method:</strong></p>
  <ul>
    <li>
      <strong
        ><a href="/error_tracking/">Agentic Onboarding (in Preview)</a></strong
      >: Use AI coding agents (Cursor, Claude Code) to automatically instrument
      your iOS application with one prompt. The agent detects your project
      structure and configures the RUM SDK for you.
    </li>
    <li>
      <strong>Manual setup</strong> (below): Follow the instructions to manually
      add and configure the RUM SDK in your iOS application.
    </li>
  </ul>
  <h3 id="manual-setup">Manual setup</h3>
  <p>
    To send RUM data from your iOS or tvOS application to Datadog, complete the
    following steps.
  </p>
  <h3 id="step-1--add-the-ios-sdk-as-a-dependency">
    Step 1 - Add the iOS SDK as a dependency
  </h3>
  <p>
    Add the iOS SDK to your project using your preferred package manager.
    Datadog recommends using Swift Package Manager (SPM).
  </p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="swift-package-manager--spm"
        class="tab-pane fade"
        role="tabpanel"
        title="Swift Package Manager (SPM)"
      >
        <p>
          To integrate using Apple's Swift Package Manager, add the following as
          a dependency to your <code>Package.swift</code>:
        </p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-swift">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="p">.</span><span class="n">package</span><span class="p">(</span><span class="n">url</span><span class="p">:</span> <span class="s">&#34;https://github.com/Datadog/dd-sdk-ios.git&#34;</span><span class="p">,</span> <span class="p">.</span><span class="n">upToNextMajor</span><span class="p">(</span><span class="n">from</span><span class="p">:</span> <span class="s">&#34;3.0.0&#34;</span><span class="p">))</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>In your project, link the following libraries:</p>
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
              ><code><span class="line"><span class="cl">DatadogCore
</span></span><span class="line"><span class="cl">DatadogRUM
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        data-lang="cocoapods"
        class="tab-pane fade"
        role="tabpanel"
        title="CocoaPods"
      >
        <p>
          You can use <a href="https://cocoapods.org/">CocoaPods</a> to install
          <code>dd-sdk-ios</code>:
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
              ><code><span class="line"><span class="cl">pod &#39;DatadogCore&#39;
</span></span><span class="line"><span class="cl">pod &#39;DatadogRUM&#39;
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        data-lang="carthage"
        class="tab-pane fade"
        role="tabpanel"
        title="Carthage"
      >
        <p>
          You can use
          <a href="https://github.com/Carthage/Carthage">Carthage</a> to install
          <code>dd-sdk-ios</code>:
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
              ><code><span class="line"><span class="cl">github &#34;DataDog/dd-sdk-ios&#34;
</span></span></code></pre>
            </div>
          </div>
        </div>
        <div class="alert alert-info">
          <p>
            Datadog does not provide prebuilt Carthage binaries. This means
            Carthage builds the SDK from source.
          </p>
        </div>
        <p>To build and integrate the SDK, run:</p>
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
              ><code><span class="line"><span class="cl">carthage bootstrap --use-xcframeworks --no-use-binaries
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          After building, add the following XCFrameworks to your Xcode project
          (in the &quot;Frameworks, Libraries, and Embedded Content&quot;
          section):
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
              ><code><span class="line"><span class="cl">DatadogInternal.xcframework
</span></span><span class="line"><span class="cl">DatadogCore.xcframework
</span></span><span class="line"><span class="cl">DatadogRUM.xcframework
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h3 id="step-2--specify-application-details-in-the-ui">
    Step 2 - Specify application details in the UI
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
      Select <code>iOS</code> as the application type and enter an application
      name to generate a unique Datadog application ID and client token.
    </li>
    <li>
      To instrument your web views, click the
      <strong>Instrument your webviews</strong> toggle. For more information,
      see
      <a href="/real_user_monitoring/ios/web_view_tracking/"
        >Web View Tracking</a
      >.
    </li>
  </ol>
  <h3 id="step-3--initialize-the-library">Step 3 - Initialize the library</h3>
  <p>
    In the initialization snippet, set an environment name, service name, and
    client token.
  </p>
  <p>
    The SDK should be initialized as early as possible in the app lifecycle,
    specifically in the <code>AppDelegate</code>'s
    <code>application(_:didFinishLaunchingWithOptions:)</code> callback. The
    <code>AppDelegate</code> is your app's main entry point that handles app
    lifecycle events.
  </p>
  <p>
    This ensures the SDK can correctly capture all measurements, including
    application startup duration. For apps built with SwiftUI, you can use
    <code>@UIApplicationDelegateAdaptor</code> to hook into the
    <code>AppDelegate</code>.
  </p>
  <div class="alert alert-warning">
    <p>
      Initializing the SDK elsewhere (for example later during view loading) may
      result in inaccurate or missing telemetry, especially around app startup
      performance.
    </p>
  </div>
  <p>
    For more information, see
    <a href="/getting_started/tagging/using_tags/#rum--session-replay"
      >Using Tags</a
    >.
  </p>
  <div class="d-none site-region-container" data-region="us">
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Initialize Datadog SDK with your configuration</span>
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>  <span class="c1">// From Datadog UI</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>             <span class="c1">// for example, &#34;production&#34;, &#34;staging&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>        <span class="c1">// Your app&#39;s service name</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>  <span class="c1">// GDPR compliance setting</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Initialize Datadog SDK with your configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>  <span class="c1">// Your app&#39;s service name
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>  <span class="c1">// GDPR compliance setting
</span></span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none site-region-container" data-region="eu">
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">eu1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">eu1</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none site-region-container" data-region="us3">
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">us3</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">us3</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none site-region-container" data-region="us5">
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">us5</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">us5</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none site-region-container" data-region="gov">
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">us1_fed</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">us1_fed</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none site-region-container" data-region="ap1">
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">ap1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">ap1</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none site-region-container" data-region="ap2">
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">ap2</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">ap2</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p>
    The iOS SDK automatically tracks user sessions based on the options you
    provide during SDK initialization. To add GDPR compliance for your EU users
    (required for apps targeting European users) and configure other
    <a
      href="/real_user_monitoring/ios/advanced_configuration/#initialization-parameters"
      >initialization parameters</a
    >, see the
    <a href="#set-tracking-consent-gdpr-compliance"
      >Set tracking consent documentation</a
    >.
  </p>
  <h4 id="sample-session-rates">Sample session rates</h4>
  <p>
    To control the data your application sends to Datadog RUM, you can specify a
    sampling rate for RUM sessions while
    <a href="https://github.com/DataDog/dd-sdk-ios"
      >initializing the RUM iOS SDK</a
    >. The rate is a percentage between 0 and 100. By default,
    <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
  </p>
  <p>For example, to only keep 50% of sessions use:</p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="swift"
        class="tab-pane fade"
        role="tabpanel"
        title="Swift"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-swift">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="c1">// Configure RUM with 50% session sampling</span>
</span></span><span class="line"><span class="cl"><span class="kd">let</span> <span class="nv">configuration</span> <span class="p">=</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">applicationID</span><span class="p">:</span> <span class="s">&#34;&lt;rum application id&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">sessionSampleRate</span><span class="p">:</span> <span class="mi">50</span>  <span class="c1">// Only track 50% of user sessions</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        data-lang="objective-c"
        class="tab-pane fade"
        role="tabpanel"
        title="Objective-C"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-objective-c">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="c1">// Configure RUM with 50% session sampling
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">DDRUMConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDRUMConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithApplicationID</span><span class="p">:</span><span class="s">@&#34;&lt;rum application id&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">sessionSampleRate</span> <span class="o">=</span> <span class="mi">50</span><span class="p">;</span>  <span class="c1">// Only track 50% of user sessions
</span></span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h4 id="set-tracking-consent--gdpr-compliance">
    Set tracking consent (GDPR compliance)
  </h4>
  <p>
    To be compliant with the GDPR regulation (required for apps targeting
    European users), the iOS SDK requires the tracking consent value at
    initialization.
  </p>
  <p>
    The <code>trackingConsent</code> setting can be one of the following values:
  </p>
  <ol>
    <li>
      <code>.pending</code>: The iOS SDK starts collecting and batching the data
      but does not send it to Datadog. The iOS SDK waits for the new tracking
      consent value to decide what to do with the batched data.
    </li>
    <li>
      <code>.granted</code>: The iOS SDK starts collecting the data and sends it
      to Datadog.
    </li>
    <li>
      <code>.notGranted</code>: The iOS SDK does not collect any data. No logs,
      traces, or events are sent to Datadog.
    </li>
  </ol>
  <p>
    To <strong>change the tracking consent value</strong> after the iOS SDK is
    initialized, use the <code>Datadog.set(trackingConsent:)</code> API call.
    The iOS SDK changes its behavior according to the new value.
  </p>
  <p>For example, if the current tracking consent is <code>.pending</code>:</p>
  <ul>
    <li>
      If you change the value to <code>.granted</code>, the RUM iOS SDK sends
      all current and future data to Datadog;
    </li>
    <li>
      If you change the value to <code>.notGranted</code>, the RUM iOS SDK wipes
      all current data and does not collect future data.
    </li>
  </ul>
  <h3 id="step-4--start-sending-data">Step 4 - Start sending data</h3>
  <h4 id="enable-rum">Enable RUM</h4>
  <p>
    Configure and start RUM. This should be done once and as early as possible,
    specifically in your <code>AppDelegate</code>:
  </p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="swift"
        class="tab-pane fade"
        role="tabpanel"
        title="Swift"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-swift">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogRUM</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">RUM</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">applicationID</span><span class="p">:</span> <span class="s">&#34;&lt;rum application id&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">uiKitViewsPredicate</span><span class="p">:</span> <span class="n">DefaultUIKitRUMViewsPredicate</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">uiKitActionsPredicate</span><span class="p">:</span> <span class="n">DefaultUIKitRUMActionsPredicate</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">swiftUIViewsPredicate</span><span class="p">:</span> <span class="n">DefaultSwiftUIRUMViewsPredicate</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">swiftUIActionsPredicate</span><span class="p">:</span> <span class="n">DefaultSwiftUIRUMActionsPredicate</span><span class="p">(</span><span class="n">isLegacyDetectionEnabled</span><span class="p">:</span> <span class="kc">true</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="n">urlSessionTracking</span><span class="p">:</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">.</span><span class="n">URLSessionTracking</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">  <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        data-lang="objective-c"
        class="tab-pane fade"
        role="tabpanel"
        title="Objective-C"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-objective-c">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogRUM</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDRUMConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDRUMConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithApplicationID</span><span class="p">:</span><span class="s">@&#34;&lt;rum application id&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">uiKitViewsPredicate</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDDefaultUIKitRUMViewsPredicate</span> <span class="n">new</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">uiKitActionsPredicate</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDDefaultUIKitRUMActionsPredicate</span> <span class="n">new</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">swiftUIViewsPredicate</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDDefaultSwiftUIRUMViewsPredicate</span> <span class="n">new</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">swiftUIActionsPredicate</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDDefaultSwiftUIRUMActionsPredicate</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithIsLegacyDetectionEnabled</span><span class="p">:</span><span class="nb">YES</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">configuration</span> <span class="nl">setURLSessionTracking</span><span class="p">:[</span><span class="n">DDRUMURLSessionTracking</span> <span class="n">new</span><span class="p">]];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDRUM</span> <span class="nl">enableWith</span><span class="p">:</span><span class="n">configuration</span><span class="p">];</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h4 id="enable-">Enable <code>URLSessionInstrumentation</code></h4>
  <p>
    To monitor requests sent from the <code>URLSession</code> instance as
    resources, enable <code>URLSessionInstrumentation</code> for your delegate
    type and pass the delegate instance to the <code>URLSession</code>:
  </p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="swift"
        class="tab-pane fade"
        role="tabpanel"
        title="Swift"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-swift">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="n">URLSessionInstrumentation</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">with</span><span class="p">:</span> <span class="p">.</span><span class="kd">init</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="n">delegateClass</span><span class="p">:</span> <span class="p">&lt;</span><span class="n">YourSessionDelegate</span><span class="p">&gt;.</span><span class="kc">self</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">let</span> <span class="nv">session</span> <span class="p">=</span> <span class="n">URLSession</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">configuration</span><span class="p">:</span> <span class="p">.</span><span class="k">default</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">delegate</span><span class="p">:</span> <span class="p">&lt;</span><span class="n">YourSessionDelegate</span><span class="p">&gt;(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">delegateQueue</span><span class="p">:</span> <span class="kc">nil</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div
        data-lang="objective-c"
        class="tab-pane fade"
        role="tabpanel"
        title="Objective-C"
      >
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-objective-c">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="n">DDURLSessionInstrumentationConfiguration</span> <span class="o">*</span><span class="n">config</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDURLSessionInstrumentationConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithDelegateClass</span><span class="p">:[</span><span class="o">&lt;</span><span class="n">YourSessionDelegate</span><span class="o">&gt;</span> <span class="k">class</span><span class="p">]];</span>
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDURLSessionInstrumentation</span> <span class="nl">enableWithConfiguration</span><span class="p">:</span><span class="n">config</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">NSURLSession</span> <span class="o">*</span><span class="n">session</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSURLSession</span> <span class="nl">sessionWithConfiguration</span><span class="p">:[</span><span class="n">NSURLSessionConfiguration</span> <span class="n">defaultSessionConfiguration</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">                                                      <span class="nl">delegate</span><span class="p">:[[</span><span class="o">&lt;</span><span class="n">YourSessionDelegate</span><span class="o">&gt;</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">                                                 <span class="nl">delegateQueue</span><span class="p">:</span><span class="nb">nil</span><span class="p">];</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h3 id="instrument-views">Instrument views</h3>
  <p>
    The Datadog iOS SDK allows you to instrument views of
    <code>SwiftUI</code> applications. The instrumentation also works with
    hybrid <code>UIKit</code> and <code>SwiftUI</code> applications.
  </p>
  <p>
    To instrument a <code>SwiftUI.View</code>, add the following method to your
    view declaration:
  </p>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-end"></div>
    <div class="code-snippet">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      <div class="cdoc-code-snippet cdoc-language-swift">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">SwiftUI</span>
</span></span><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogRUM</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">FooView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">FooContent</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="p">...</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">trackRUMView</span><span class="p">(</span><span class="n">name</span><span class="p">:</span> <span class="s">&#34;Foo&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <p>
    The <code>trackRUMView(name:)</code> method starts and stops a view when the
    <code>SwiftUI</code> view appears and disappears from the screen.
  </p>
  <h3 id="instrument-tap-actions">Instrument tap actions</h3>
  <p>
    The Datadog iOS SDK allows you to instrument tap actions of
    <code>SwiftUI</code> applications. The instrumentation also works with
    hybrid <code>UIKit</code> and <code>SwiftUI</code> applications.
  </p>
  <div class="alert alert-warning">
    <p>
      Using <code>.trackRUMTapAction(name:)</code> for
      <code>SwiftUI</code> controls inside a <code>List</code> can break its
      default gestures. For example, it may disable the
      <code>Button</code> action or break <code>NavigationLink</code>. To track
      taps in a <code>List</code> element, use the
      <a
        href="/real_user_monitoring/application_monitoring/ios/advanced_configuration#custom-actions"
        >Custom Actions</a
      >
      API instead.
    </p>
  </div>
  <p>
    To instrument a tap action on a <code>SwiftUI.View</code>, add the following
    method to your view declaration:
  </p>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-end"></div>
    <div class="code-snippet">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      <div class="cdoc-code-snippet cdoc-language-swift">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">SwiftUI</span>
</span></span><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogRUM</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">BarView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">Button</span><span class="p">(</span><span class="s">&#34;BarButton&#34;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Your button action here</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">trackRUMTapAction</span><span class="p">(</span><span class="n">name</span><span class="p">:</span> <span class="s">&#34;Bar&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h2 id="track-ios-errors">Track iOS errors</h2>
  <p>
    <a href="/error_tracking/frontend/mobile/ios"
      >iOS Crash Reporting and Error Tracking</a
    >
    displays any issues in your application and the latest available errors. You
    can view error details and attributes including JSON in the
    <a href="/real_user_monitoring/explorer/">RUM Explorer</a>.
  </p>
  <h2 id="disable-automatic-user-data-collection">
    Disable automatic user data collection
  </h2>
  <p>
    You may want to disable automatic collection of user data to comply with
    privacy regulations or organizational data governance policies.
  </p>
  <p>
    To disable automatic user data collection for client IP or geolocation data:
  </p>
  <ol>
    <li>
      After creating your application, go to the
      <a href="https://app.datadoghq.com/rum/application/"
        >Application Management</a
      >
      page and click your application.
    </li>
    <li>Click <strong>User Data Collection</strong>.</li>
    <li>
      Use the toggles for those settings. For more information, see
      <a href="/real_user_monitoring/ios/data_collected/"
        >RUM iOS Data Collected</a
      >.
    </li>
  </ol>
  <p>
    To ensure the safety of your data, you must use a client token. Using only
    <a href="https://cocoapods.org/">Datadog API keys</a> to configure the
    <code>dd-sdk-ios</code> library would expose them client-side in your iOS
    application's byte code.
  </p>
  <p>
    For more information about setting up a client token, see the
    <a href="https://github.com/Carthage/Carthage">Client token documentation</a
    >.
  </p>
  <h2 id="sending-data-when-device-is-offline">
    Sending data when device is offline
  </h2>
  <p>
    The iOS SDK ensures availability of data when your user device is offline.
    In cases of low-network areas, or when the device battery is too low, all
    events are first stored on the local device in batches. They are sent as
    soon as the network is available, and the battery is high enough to ensure
    the iOS SDK does not impact the end user's experience. If the network is not
    available while your application is in the foreground, or if an upload of
    data fails, the batch is kept until it can be sent successfully.
  </p>
  <p>
    This means that even if users open your application while offline, no data
    is lost.
  </p>
  <p>
    <strong>Note</strong>: The data on the disk is automatically discarded if it
    gets too old to ensure the iOS SDK does not use too much disk space.
  </p>
  <h2 id="supported-versions">Supported versions</h2>
  <p>
    See
    <a
      href="/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/"
      >Supported versions</a
    >
    for a list of operating system versions and platforms that are compatible
    with the iOS SDK.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/ios/advanced_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">RUM iOS Advanced Configuration</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-ios"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-ios</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring"><span class="w-100 d-flex justify-content-between "><span class="text">Learn how to explore your RUM data</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/error_tracking/ios/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn how to track iOS errors</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/ios/swiftui/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about instrumenting SwiftUI applications</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/ios/supported_versions"><span class="w-100 d-flex justify-content-between "><span class="text">RUM iOS and tvOS monitoring supported versions</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/guide/mobile-sdk-upgrade"><span class="w-100 d-flex justify-content-between "><span class="text">Upgrade RUM Mobile SDKs</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>