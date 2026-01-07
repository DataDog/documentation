---
title: Mobile Session Replay Setup and Configuration
description: Setting up and configuring Mobile Session Replay.
further_reading:
  - link: /product_analytics/session_replay/mobile
    tag: Documentation
    text: Mobile Session Replay
  - link: /product_analytics/session_replay/mobile/app_performance
    tag: Documentation
    text: How Mobile Session Replay Impacts App Performance
  - link: /product_analytics/session_replay/mobile/privacy_options
    tag: Documentation
    text: Mobile Session Replay Privacy Options
  - link: /product_analytics/session_replay/mobile/troubleshooting
    tag: Documentation
    text: Troubleshoot Mobile Session Replay
  - link: /product_analytics/session_replay
    tag: Documentation
    text: Session Replay
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-platform-pills-label" 
    class="cdoc-filter-label"
  >SDK</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="platform" 
      data-option-id="android"
      aria-selected="true"
      tabIndex="0"
    >Android</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="ios"
      aria-selected="false"
      tabIndex="0"
    >iOS</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="kotlin_multiplatform"
      aria-selected="false"
      tabIndex="0"
    >Kotlin Multiplatform</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="react_native"
      aria-selected="false"
      tabIndex="0"
    >React Native</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="flutter"
      aria-selected="false"
      tabIndex="0"
    >Flutter</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-platform-dropdown-label" 
    class="cdoc-filter-label"
  >SDK</p><div 
    id="cdoc-dropdown-platform" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-platform-dropdown-label">
      <span 
        id="cdoc-dropdown-platform-label" 
        class="cdoc-btn-label"
      >Android</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="android"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Android</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="ios"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >iOS</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="kotlin_multiplatform"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Kotlin Multiplatform</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="react_native"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >React Native</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="flutter"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Flutter</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="setup">Setup</h2>
  <div class="cdoc__toggleable" data-if="75">
    <p>
      All Session Replay SDK versions can be found in the
      <a
        href="https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-session-replay/versions"
        >Maven Central Repository</a
      >.
    </p>
    <p>To set up Mobile Session Replay for Android:</p>
    <h3 id="step-1--set-up-the-android-rum-sdk">
      Step 1 - Set up the Android RUM SDK
    </h3>
    <p>
      Make sure you've
      <a href="/real_user_monitoring/android/?tab=kotlin"
        >set up and initialized the Datadog Android RUM SDK</a
      >
      with views instrumentation enabled.
    </p>
    <h3 id="step-2--declare-the-datadog-session-replay-as-a-dependency">
      Step 2 - Declare the Datadog Session Replay as a dependency
    </h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">build.gradle.kts</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-rum:[datadog_version]&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-session-replay:[datadog_version]&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="c1">// in case you need Material support
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="c1">// in case you need Jetpack Compose support
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-session-replay-compose:[datadog_version]&#34;</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="enable-android">Step 3 - Enable Session Replay</h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">sessionReplayConfig</span> <span class="p">=</span> <span class="nc">SessionReplayConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">([</span><span class="n">sampleRate</span><span class="p">])</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// in case you need Material extension support
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="p">.</span><span class="n">addExtensionSupport</span><span class="p">(</span><span class="n">MaterialExtensionSupport</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// in case you need Jetpack Compose support
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="p">.</span><span class="n">addExtensionSupport</span><span class="p">(</span><span class="n">ComposeExtensionSupport</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="76">
    <p>To set up Mobile Session Replay for iOS:</p>
    <h3 id="step-1--set-up-the-ios-rum-sdk">Step 1 - Set up the iOS RUM SDK</h3>
    <p>
      Make sure you've
      <a href="/real_user_monitoring/ios/?tab=swift"
        >set up and initialized the Datadog iOS RUM SDK</a
      >
      with views instrumentation enabled.
    </p>
    <h3 id="step-2--declare-the-datadog-session-replay-as-a-dependency">
      Step 2 - Declare the Datadog Session Replay as a dependency
    </h3>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift-package-manager"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift Package Manager"
        >
          <p>
            Add <code>DatadogSessionReplay</code> library as a dependency to
            your app target.
          </p>
        </div>
        <div
          data-lang="cocoapods"
          class="tab-pane fade"
          role="tabpanel"
          title="CocoaPods"
        >
          <p>
            Add <code>pod 'DatadogSessionReplay</code> to your
            <code>Podfile</code>.
          </p>
        </div>
        <div
          data-lang="carthage"
          class="tab-pane fade"
          role="tabpanel"
          title="Carthage"
        >
          <p>
            Add <code>DatadogSessionReplay.xcframework</code> as a dependency to
            your app target.
          </p>
        </div>
      </div>
    </div>
    <h3 id="enable-ios">Step 3 - Enable Session Replay</h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">AppDelegate.swift</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-swift">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogSessionReplay</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">SessionReplay</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable the experimental SwiftUI recording</span>
</span></span><span class="line"><span class="cl">    <span class="n">featureFlags</span><span class="p">:</span> <span class="p">[.</span><span class="n">swiftui</span><span class="p">:</span> <span class="kc">true</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">  <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="77">
    <p>
      All Session Replay SDK versions can be found in the
      <a
        href="https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-android-session-replay/versions"
        >Maven Central Repository</a
      >.
    </p>
    <p>To set up Mobile Session Replay for Kotlin Multiplatform:</p>
    <h3 id="step-1--set-up-the-kotlin-multiplatform-rum-sdk">
      Step 1 - Set up the Kotlin Multiplatform RUM SDK
    </h3>
    <p>
      Make sure you've
      <a href="/real_user_monitoring/kotlin_multiplatform/"
        >set up and initialized the Datadog Kotlin Multiplatform RUM SDK</a
      >
      with views instrumentation enabled.
    </p>
    <h3 id="step-2--add-the-">
      Step 2 - Add the <code>DatadogSessionReplay</code> iOS library as a
      link-only dependency
    </h3>
    <p>
      For instructions, see the
      <a
        href="/real_user_monitoring/kotlin_multiplatform/#add-native-dependencies-for-ios"
        >guide</a
      >.
    </p>
    <h3 id="step-3--declare-datadog-session-replay-as-a-dependency">
      Step 3 - Declare Datadog Session Replay as a dependency
    </h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">build.gradle.kts</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">kotlin</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">sourceSets</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">commonMain</span><span class="p">.</span><span class="n">dependencies</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-kotlin-multiplatform-rum:[datadog_version]&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">      <span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-kotlin-multiplatform-session-replay:[datadog_version]&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// in case you need Material support on Android
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="n">androidMain</span><span class="p">.</span><span class="n">dependencies</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-4--enable-session-replay">Step 4 - Enable Session Replay</h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="c1">// in common source set
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">val</span> <span class="py">sessionReplayConfig</span> <span class="p">=</span> <span class="nc">SessionReplayConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">([</span><span class="n">sampleRate</span><span class="p">])</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-5--set-up-material-support-on-android--optional">
      Step 5 - Set up Material support on Android (Optional)
    </h3>
    <p>If your app uses Material on Android, add:</p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nc">SessionReplayConfiguration</span><span class="p">.</span><span class="nc">Builder</span><span class="p">.</span><span class="n">addExtensionSupport</span><span class="p">(</span><span class="n">MaterialExtensionSupport</span><span class="p">())</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="78">
    <div class="alert alert-warning">
      <p>
        To enable Session Replay, you must use at least version
        <code>2.0.4</code> of the Datadog
        <a href="https://github.com/DataDog/dd-sdk-reactnative"
          >React Native SDK</a
        >, and ensure that the Session Replay SDK version matches the React
        Native SDK version you are using.
      </p>
    </div>
    <p>
      All Session Replay SDK versions can be found in the
      <a
        href="https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions"
        >npmjs repository</a
      >.
    </p>
    <p>To set up Mobile Session Replay for React Native:</p>
    <h3 id="step-1--set-up-the-react-native-sdk">
      Step 1 - Set up the React Native SDK
    </h3>
    <p>
      Make sure you've
      <a href="/real_user_monitoring/application_monitoring/react_native/setup"
        >set up and initialized the Datadog React Native SDK</a
      >
      with views instrumentation enabled.
    </p>
    <h3 id="step-2--declare-the-react-native-session-replay-as-a-dependency">
      Step 2 - Declare the React Native Session Replay as a dependency
    </h3>
    <p>
      Add the
      <code>@datadog/mobile-react-native-session-replay</code> dependency, and
      make sure it matches the
      <code>@datadog/mobile-react-native</code> version, either through
      <a
        href="https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions"
        >npm</a
      >
      or
      <a
        href="https://yarnpkg.com/package?q=datadog%20react%20native%20ses&amp;name=%40datadog%2Fmobile-react-native-session-replay"
        >yarn</a
      >.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div data-lang="npm" class="tab-pane fade" role="tabpanel" title="npm">
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
                ><code><span class="line"><span class="cl">npm install @datadog/mobile-react-native-session-replay
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="yarn"
          class="tab-pane fade"
          role="tabpanel"
          title="yarn"
        >
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
                ><code><span class="line"><span class="cl">yarn add @datadog/mobile-react-native-session-replay
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 id="enable-react-native">Step 3 - Enable Session Replay</h3>
    <p>
      After the Datadog React Native SDK and Session Replay SDK dependencies are
      imported, you can enable the feature when configuring the SDK.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="datadogprovider"
          class="tab-pane fade"
          role="tabpanel"
          title="DatadogProvider"
        >
          <p>If you use the <code>DatadogProvider</code> component:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-between">
              <p class="code-filename my-0">App.tsx</p>
            </div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-typescript">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">DatadogProvider</span><span class="p">,</span> <span class="nx">DatadogProviderConfiguration</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">ImagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">TouchPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">configuration</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span><span class="cm">/* ... */</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Add this function as onInitialization prop to DatadogProvider
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">onSDKInitialized</span> <span class="o">=</span> <span class="kr">async</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">await</span> <span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">100</span><span class="p">,</span> <span class="c1">// Session Replay will be available for all sessions already captured by the SDK
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_NONE</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">touchPrivacyLevel</span>: <span class="kt">TouchPrivacyLevel.SHOW</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">App</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="kr">const</span> <span class="nx">navigationRef</span> <span class="o">=</span> <span class="nx">React</span><span class="p">.</span><span class="nx">useRef</span><span class="p">(</span><span class="kc">null</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;</span><span class="nt">DatadogProvider</span> <span class="na">configuration</span><span class="o">=</span><span class="p">{</span><span class="nx">configuration</span><span class="p">}</span> <span class="na">onInitialization</span><span class="o">=</span><span class="p">{</span><span class="nx">onSDKInitialized</span><span class="p">}&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* App */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;/</span><span class="nt">DatadogProvider</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">export</span> <span class="k">default</span> <span class="nx">App</span><span class="p">;</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="ddsdkreactnativeinitialize"
          class="tab-pane fade"
          role="tabpanel"
          title="DdSdkReactNative.initialize"
        >
          <p>If you use the <code>DdSdkReactNative.initialize</code> method:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-between">
              <p class="code-filename my-0">App.tsx</p>
            </div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-typescript">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">DdSdkReactNative</span><span class="p">,</span> <span class="nx">DdSdkReactNativeConfiguration</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">SessionReplay</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">configuration</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DdSdkReactNativeConfiguration</span><span class="p">(</span><span class="cm">/* ... */</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">DdSdkReactNative</span><span class="p">.</span><span class="nx">initialize</span><span class="p">(</span><span class="nx">configuration</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="nx">then</span><span class="p">(()</span> <span class="o">=&gt;</span> <span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">100</span><span class="p">,</span> <span class="c1">// Session Replay will be available for all sessions already captured by the SDK
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_NONE</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">touchPrivacyLevel</span>: <span class="kt">TouchPrivacyLevel.SHOW</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="p">}))</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="k">catch</span><span class="p">((</span><span class="nx">error</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span> <span class="cm">/* handle error */</span> <span class="p">});</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>
      During this step, you can also configure multiple
      <a
        href="/real_user_monitoring/session_replay/mobile/privacy_options/?tab=reactnative"
        >privacy levels</a
      >
      that apply to Session Replays.
    </p>
    <h3 id="step-4---ios-only-update-your-ios-pods">
      Step 4 - (iOS only) Update your iOS pods.
    </h3>
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
          ><code><span class="line"><span class="cl"><span class="nb">cd</span> ios <span class="o">&amp;&amp;</span> pod install
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-5--rebuild-your-app">Step 5 - Rebuild your app</h3>
    <p>Rebuild your iOS and Android apps</p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="79">
    <div class="alert alert-info">
      <p>Datadog Session Replay for Flutter is currently in Preview.</p>
    </div>
    <p>
      All Session Replay SDK versions can be found in
      <a href="https://pub.dev/packages/datadog_session_replay">Pub</a>.
    </p>
    <p>To set up Datadog Session Replay for Flutter:</p>
    <h3 id="step-1--set-up-the-flutter-plugin">
      Step 1 - Set up the Flutter plugin
    </h3>
    <p>
      Make sure you have
      <a
        href="https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/setup?tab=rum"
        >set up and initialized the Datadog Flutter Plugin</a
      >.
    </p>
    <h3 id="step-2--add-the-package-to-your-">
      Step 2 - Add the package to your <code>pubspec.yaml</code>
    </h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">pubspec.yaml</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-yaml">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nt">packages</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="c"># other packages</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">datadog_session_replay</span><span class="p">:</span><span class="w"> </span><span class="l">^x.x.x</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-3--enable-session-replay-in-your-">
      Step 3 - Enable Session Replay in your <code>DatadogConfiguration</code>
    </h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">import</span> <span class="s1">&#39;package:datadog_session_replay/datadog_session_replay.dart&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// ....
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Normal Datadog configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nl">clientToken:</span> <span class="s1">&#39;client-token&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// RUM is required to use Datadog Session Replay
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nl">rumConfiguration:</span> <span class="n">RumConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">applicationId:</span> <span class="s1">&#39;&lt;application-id&#39;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Setup default text, image, and touch privacy
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nl">textAndInputPrivacyLevel:</span> <span class="n">TextAndInputPrivacyLevel</span><span class="p">.</span><span class="n">maskSensitiveInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">touchPrivacyLevel:</span> <span class="n">TouchPrivacyLevel</span><span class="p">.</span><span class="n">show</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Setup session replay sample rate.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nl">replaySampleRate:</span> <span class="m">100.0</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-4--add-a-sessionreplaycapture-to-the-root-of-your-widget-tree">
      Step 4 - Add a SessionReplayCapture to the root of your Widget tree
    </h3>
    <p>
      Add a SessionReplayCapture widget to the root of your Widget tree, above
      your MaterialApp or similar application widget.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">MyApp</span> <span class="kd">extends</span> <span class="n">StatefulWidget</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="kd">const</span> <span class="n">MyApp</span><span class="p">({</span><span class="k">super</span><span class="p">.</span><span class="n">key</span><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="err">@</span><span class="n">override</span>
</span></span><span class="line"><span class="cl">  <span class="n">State</span><span class="o">&lt;</span><span class="n">MyApp</span><span class="o">&gt;</span> <span class="n">createState</span><span class="p">()</span> <span class="o">=&gt;</span> <span class="n">_MyAppState</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">_MyAppState</span> <span class="kd">extends</span> <span class="n">State</span><span class="o">&lt;</span><span class="n">MyApp</span><span class="o">&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Note a key is required for SessionReplayCapture
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="kd">final</span> <span class="n">captureKey</span> <span class="o">=</span> <span class="n">GlobalKey</span><span class="p">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="c1">// Other App Configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">  <span class="err">@</span><span class="n">override</span>
</span></span><span class="line"><span class="cl">  <span class="n">Widget</span> <span class="n">build</span><span class="p">(</span><span class="n">BuildContext</span> <span class="n">context</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="n">SessionReplayCapture</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">key:</span> <span class="n">captureKey</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">rum:</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">rum</span><span class="o">!</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">sessionReplay:</span> <span class="n">DatadogSessionReplay</span><span class="p">.</span><span class="n">instance</span><span class="o">!</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">child:</span> <span class="n">MaterialApp</span><span class="p">.</span><span class="n">router</span><span class="p">(</span><span class="nl">color:</span> <span class="n">color</span><span class="p">,</span> <span class="nl">routerConfig:</span> <span class="n">router</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h2 id="web-view-instrumentation">Web view instrumentation</h2>
  <p>
    You can record the entire user journey across both
    <a href="/real_user_monitoring/application_monitoring/ios/web_view_tracking"
      >web and native views</a
    >
    on iOS or Android and watch it in a single Session Replay.
  </p>
  <p>
    The Session Replay is recorded through the Browser SDK, then the Mobile SDK
    handles the batching and uploading of the webview recording.
  </p>
  <div class="cdoc__toggleable" data-if="80">
    <p>
      To instrument your consolidated web and native Session Replay views for
      Android:
    </p>
    <ol>
      <li>
        Ensure you are using version
        <a href="https://github.com/DataDog/dd-sdk-android/releases/tag/2.8.0"
          ><code>2.8.0</code></a
        >
        or higher of the Android SDK.
      </li>
      <li>
        Enable
        <a
          href="/real_user_monitoring/application_monitoring/android/web_view_tracking/?tab=android#instrument-your-web-views"
          >webview tracking</a
        >
        for your mobile application.
      </li>
      <li>
        Enable
        <a href="/real_user_monitoring/session_replay/browser/#setup"
          >Session Replay</a
        >
        for your web application.
      </li>
      <li>
        Enable Session Replay for your mobile application (see setup
        instructions above).
      </li>
    </ol>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="81">
    <p>
      To instrument your consolidated web and native Session Replay views for
      iOS:
    </p>
    <ol>
      <li>
        Ensure you are using version
        <a href="https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0"
          ><code>2.13.0</code></a
        >
        or higher of the iOS SDK.
      </li>
      <li>
        Enable
        <a
          href="/real_user_monitoring/application_monitoring/ios/web_view_tracking/?tab=ios#instrument-your-web-views"
          >webview tracking</a
        >
        for your mobile application.
      </li>
      <li>
        Enable
        <a href="/real_user_monitoring/session_replay/browser/#setup"
          >Session Replay</a
        >
        for your web application.
      </li>
      <li>
        Enable Session Replay for your mobile application (see setup
        instructions above).
      </li>
    </ol>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="82">
    <p>
      To instrument your consolidated web and native Session Replay views for
      Kotlin Multiplatform:
    </p>
    <ol>
      <li>
        Enable
        <a
          href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/web_view_tracking/?tab=kotlinmultiplatform#instrument-your-web-views"
          >webview tracking</a
        >
        for your mobile application.
      </li>
      <li>
        Enable
        <a href="/real_user_monitoring/session_replay/browser/#setup"
          >Session Replay</a
        >
        for your web application.
      </li>
      <li>
        Enable Session Replay for your mobile application (see setup
        instructions above).
      </li>
    </ol>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="83">
    <p>
      To instrument your consolidated web and native Session Replay views for
      React Native:
    </p>
    <ol>
      <li>
        Enable
        <a
          href="/real_user_monitoring/application_monitoring/web_view_tracking/?tab=reactnative#instrument-your-web-views"
          >webview tracking</a
        >
        for your React Native application.
      </li>
      <li>
        Enable
        <a href="/real_user_monitoring/session_replay/browser/#setup"
          >Session Replay</a
        >
        for your web application.
      </li>
      <li>
        Enable Session Replay for your mobile application (see setup
        instructions above).
      </li>
    </ol>
    <p>
      <strong>Note</strong>: This feature is not compatible with React Native's
      <a href="https://reactnative.dev/architecture/landing-page"
        >New Architecture</a
      >
      for Android.
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="84">
    <p>
      Datadog Session Replay for Flutter does not currently support Web view
      capture.
    </p>
  </div>
  <h2 id="additional-configuration">Additional configuration</h2>
  <h3 id="set-the-sample-rate-for-recorded-sessions-to-appear">
    Set the sample rate for recorded sessions to appear
  </h3>
  <p>
    The sample rate is an optional parameter in the Session Replay
    configuration. It must be a number between 0.0 and 100.0, where 0 indicates
    that no replays are recorded and 100 means that all sessions include a
    replay. If the sample rate is not specified in the configuration, the
    default value of 100 is applied.
  </p>
  <p>
    This sample rate is applied in addition to the RUM sample rate. For example,
    if RUM uses a sample rate of 80% and Session Replay uses a sample rate of
    20%, it means that out of all user sessions, 80% are included in RUM, and
    within those sessions, only 20% have replays.
  </p>
  <div class="cdoc__toggleable" data-if="85">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">sessionReplayConfig</span> <span class="p">=</span> <span class="nc">SessionReplayConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(&lt;</span><span class="n">SAMPLE_RATE</span><span class="p">&gt;)</span>
</span></span><span class="line"><span class="cl">  <span class="o">..</span><span class="p">.</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="86">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">AppDelegate.swift</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-swift">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">var</span> <span class="nv">sessionReplayConfig</span> <span class="p">=</span> <span class="n">SessionReplay</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="p">&lt;</span><span class="n">SAMPLE_RATE</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="87">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">sessionReplayConfig</span> <span class="p">=</span> <span class="nc">SessionReplayConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(&lt;</span><span class="n">SAMPLE_RATE</span><span class="p">&gt;)</span>
</span></span><span class="line"><span class="cl">  <span class="o">..</span><span class="p">.</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="88">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">App.tsx</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">SessionReplay</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span><span class="o">:</span> <span class="p">&lt;</span><span class="nt">SAMPLE_RATE</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable" data-if="89">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="nl">replaySampleRate:</span> <span class="o">&lt;</span><span class="n">SAMPLE_RATE</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h3 id="start-or-stop-the-recording-manually">
    Start or stop the recording manually
  </h3>
  <p>
    By default, Session Replay starts recording automatically. However, if you
    prefer to manually start recording at a specific point in your application,
    you can use the optional <code>startRecordingImmediately</code> parameter as
    shown below, and later call <code>SessionReplay.startRecording()</code>. You
    can also use <code>SessionReplay.stopRecording()</code> to stop the
    recording anytime.
  </p>
  <div class="cdoc__toggleable" data-if="90">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">sessionReplayConfig</span> <span class="p">=</span> <span class="nc">SessionReplayConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(&lt;</span><span class="n">SAMPLE_RATE</span><span class="p">&gt;)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">startRecordingImmediately</span><span class="p">(</span><span class="k">false</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Do something
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">startRecording</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">stopRecording</span><span class="p">()</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="91">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">AppDelegate.swift</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-swift">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">let</span> <span class="nv">sessionReplayConfig</span> <span class="p">=</span> <span class="n">SessionReplay</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="p">&lt;</span><span class="n">SAMPLE_RATE</span><span class="p">&gt;,</span>
</span></span><span class="line"><span class="cl">  <span class="n">startRecordingImmediately</span><span class="p">:</span> <span class="kc">false</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Do something</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">startRecording</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">stopRecording</span><span class="p">()</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="92">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">sessionReplayConfig</span> <span class="p">=</span> <span class="nc">SessionReplayConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(&lt;</span><span class="n">SAMPLE_RATE</span><span class="p">&gt;)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">startRecordingImmediately</span><span class="p">(</span><span class="k">false</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Do something
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">startRecording</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">stopRecording</span><span class="p">()</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="93">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">App.tsx</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">SessionReplay</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">startRecordingImmediately</span>: <span class="kt">false</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Do something
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">startRecording</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">stopRecording</span><span class="p">();</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="94">
    <p>
      Datadog Session Replay for Flutter does not currently support manual
      recording.
    </p>
  </div>
  <h3 id="validate-whether-session-replay-data-is-being-sent">
    Validate whether Session Replay data is being sent
  </h3>
  <p>
    To validate whether Session Replay data is being sent from the app, you can
    enable debug option in Datadog SDK.
  </p>
  <div class="cdoc__toggleable" data-if="95">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nc">Datadog</span><span class="p">.</span><span class="n">setVerbosity</span><span class="p">(</span><span class="nc">Log</span><span class="p">.</span><span class="n">DEBUG</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="96">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">AppDelegate.swift</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-swift">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">verbosityLevel</span> <span class="p">=</span> <span class="p">.</span><span class="n">debug</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      If everything is fine, following logs should appear in the Xcode debug
      console in about 30 seconds after launching the app:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Xcode console</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-bash">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="o">[</span>DATADOG SDK<span class="o">]</span> 🐶 → 10:21:29.812 ⏳ <span class="o">(</span>session-replay<span class="o">)</span> Uploading batch...
</span></span><span class="line"><span class="cl"><span class="o">[</span>DATADOG SDK<span class="o">]</span> 🐶 → 10:21:30.442    → <span class="o">(</span>session-replay<span class="o">)</span> accepted, won<span class="err">&#39;</span>t be retransmitted: <span class="o">[</span>response code: <span class="m">202</span> <span class="o">(</span>accepted<span class="o">)</span>, request ID: BD445EA-...-8AFCD3F3D16<span class="o">]</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="97">
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">Application.kt</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nc">Datadog</span><span class="p">.</span><span class="n">setVerbosity</span><span class="p">(</span><span class="nc">SdkLogVerbosity</span><span class="p">.</span><span class="n">DEBUG</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="98">
    <p>Set the verbosity to <code>DEBUG</code> when you initialize the SDK:</p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-between">
        <p class="code-filename my-0">App.tsx</p>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">SdkVerbosity</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">...</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">config</span><span class="p">.</span><span class="nx">verbosity</span> <span class="o">=</span> <span class="nx">SdkVerbosity</span><span class="p">.</span><span class="nx">DEBUG</span><span class="p">;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="99">
    <p>
      Set the SDKs verbosity to <code>CoreLoggerLevel.debug</code> before you
      initialize the SDK:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">sdkVerbosity</span> <span class="o">=</span> <span class="n">CoreLoggerLevel</span><span class="p">.</span><span class="n">debug</span><span class="p">;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h3 id="privacy-options">Privacy options</h3>
  <p>
    See
    <a href="/real_user_monitoring/session_replay/mobile/privacy_options"
      >Privacy Options</a
    >.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/product_analytics/session_replay/mobile"><span class="w-100 d-flex justify-content-between "><span class="text">Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/product_analytics/session_replay/mobile/app_performance"><span class="w-100 d-flex justify-content-between "><span class="text">How Mobile Session Replay Impacts App Performance</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/product_analytics/session_replay/mobile/privacy_options"><span class="w-100 d-flex justify-content-between "><span class="text">Mobile Session Replay Privacy Options</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/product_analytics/session_replay/mobile/troubleshooting"><span class="w-100 d-flex justify-content-between "><span class="text">Troubleshoot Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/product_analytics/session_replay"><span class="w-100 d-flex justify-content-between "><span class="text">Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"75":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"75"},"76":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"76"},"77":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"kotlin_multiplatform"},"v":false,"r":"77"},"78":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"78"},"79":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"79"},"80":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"80"},"81":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"81"},"82":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"kotlin_multiplatform"},"v":false,"r":"82"},"83":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"83"},"84":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"84"},"85":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"85"},"86":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"86"},"87":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"kotlin_multiplatform"},"v":false,"r":"87"},"88":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"88"},"89":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"89"},"90":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"90"},"91":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"91"},"92":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"kotlin_multiplatform"},"v":false,"r":"92"},"93":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"93"},"94":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"94"},"95":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"95"},"96":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"96"},"97":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"kotlin_multiplatform"},"v":false,"r":"97"},"98":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"98"},"99":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"99"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_session_replay_sdk_options","label":"SDK"},"defaultValsByOptionGroupId":{"rum_session_replay_sdk_options":"android"}}},"defaultValsByTraitId":{"platform":"android"},"optionGroupsById":{"rum_session_replay_sdk_options":[{"default":true,"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"kotlin_multiplatform","label":"Kotlin Multiplatform"},{"id":"react_native","label":"React Native"},{"id":"flutter","label":"Flutter"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>