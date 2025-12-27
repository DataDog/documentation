---
title: Mobile Session Replay Privacy Options
description: Configure privacy options for Mobile Session Replay.
aliases:
  - /real_user_monitoring/session_replay/mobile/privacy_options
  - /product_analytics/session_replay/mobile/privacy_options
further_reading:
  - link: /session_replay/mobile
    tag: Documentation
    text: Mobile Session Replay
  - link: /session_replay/mobile/app_performance
    tag: Documentation
    text: How Mobile Session Replay Impacts App Performance
  - link: /session_replay/mobile/setup_and_configuration
    tag: Documentation
    text: Setup and Configure Mobile Session Replay
  - link: /session_replay/mobile/troubleshooting
    tag: Documentation
    text: Troubleshoot Mobile Session Replay
  - link: /session_replay
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
  <h2 id="overview">Overview</h2>
  <p>
    Session Replay provides privacy controls to ensure organizations of any
    scale do not expose sensitive or personal data. Data is stored on
    Datadog-managed cloud instances and encrypted at rest.
  </p>
  <p>
    Default privacy options for Session Replay protect end user privacy and
    prevent sensitive organizational information from being collected.
  </p>
  <p>
    By enabling Mobile Session Replay, you can automatically mask sensitive
    elements from being recorded through the RUM Mobile SDK. When data is
    masked, that data is not collected in its original form by Datadog's SDKs
    and thus is not sent to the backend.
  </p>
  <h2 id="fine-grained-masking">Fine-grained masking</h2>
  <p>
    Using the masking modes below, you can override the default setup on a
    per-application basis. Masking is fine-grained, which means you can override
    masking for text and inputs, images, and touches individually to create a
    custom configuration that suits your needs.
  </p>
  <h3 id="text-and-input-masking">Text and input masking</h3>
  <p>
    By default, the <code>mask_all</code> setting is enabled for all data. With
    this setting enabled, all text and input content on screen is masked, as
    shown below.
  </p>
  <a
    href="http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.acb99b12d25150731551e6bb52b45e70.png?fit=max&amp;auto=format"
    class="pop"
    data-bs-toggle="modal"
    data-bs-target="#popupImageModal"
    ><div class="shortcode-wrapper shortcode-img expand">
      <figure class="text-center">
        <picture style="width: 50%"
          ><img
            srcset="
              http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.acb99b12d25150731551e6bb52b45e70.png?auto=format
            "
            class="img-fluid"
            style="width: 50%"
            alt="What your application screen may resemble when `mask` is enabled."
        /></picture>
      </figure></div
  ></a>
  <h4 id="mask-sensitive-inputs">Mask sensitive inputs</h4>
  <p>
    With the <code>mask_sensitive_inputs</code> setting enabled, all text and
    inputs are shown except those considered sensitive (passwords, emails, and
    phone numbers).
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="24">
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">setTextAndInputPrivacy</span><span class="p">(</span><span class="nc">TextAndInputPrivacy</span><span class="p">.</span><span class="n">MASK_SENSITIVE_INPUTS</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="25"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskSensitiveInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="26"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="27"
  >
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end collapsible">
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">textAndInputPrivacyLevel:</span> <span class="n">TextAndInputPrivacyLevel</span><span class="p">.</span><span class="n">maskSensitiveInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">replaySampleRate:</span> <span class="n">replay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h4 id="mask-all-inputs">Mask all inputs</h4>
  <p>
    With the <code>mask_all_inputs</code> setting enabled, all inputs fields are
    masked in the replay.
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="28">
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setTextAndInputPrivacy</span><span class="p">(</span><span class="nc">TextAndInputPrivacy</span><span class="p">.</span><span class="n">MASK_ALL_INPUTS</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="29"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAllInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="30"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_ALL_INPUTS</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="31"
  >
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end collapsible">
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">textAndInputPrivacyLevel:</span> <span class="n">TextAndInputPrivacyLevel</span><span class="p">.</span><span class="n">maskAllInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">replaySampleRate:</span> <span class="n">replay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h4 id="mask-all">Mask all</h4>
  <p>
    With the <code>mask_all</code> setting enabled, all text and input fields
    are masked in the replay.
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="32">
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">setTextAndInputPrivacy</span><span class="p">(</span><span class="nc">TextAndInputPrivacy</span><span class="p">.</span><span class="n">MASK_ALL</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="33"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAll</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="34"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_ALL</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="35"
  >
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end collapsible">
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">textAndInputPrivacyLevel:</span> <span class="n">TextAndInputPrivacyLevel</span><span class="p">.</span><span class="n">maskAll</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">replaySampleRate:</span> <span class="n">replay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h3 id="image-masking">Image masking</h3>
  <p>
    By default, the <code>mask_all</code> setting is enabled for all images.
    With this setting enabled, all images on screen are masked.
  </p>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="36"
  >
    <p>
      For performance reasons, large images (those exceeding 1000x1000 total
      pixels) are masked in Flutter, and will display &quot;Large Image&quot; in
      the Session Replay player.
    </p>
  </div>
  <h4 id="mask-all-images">Mask all images</h4>
  <p>
    With the <code>mask_all</code> setting enabled, all images are replaced by
    placeholders labeled 'Image' in the replay.
  </p>
  <a
    href="http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-image-mask-all.02280a4a6f95b488272659849ebc13d6.png?fit=max&amp;auto=format"
    class="pop"
    data-bs-toggle="modal"
    data-bs-target="#popupImageModal"
    ><div class="shortcode-wrapper shortcode-img expand">
      <figure class="text-center">
        <picture style="width: 50%"
          ><img
            srcset="
              http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-image-mask-all.02280a4a6f95b488272659849ebc13d6.png?auto=format
            "
            class="img-fluid"
            style="width: 50%"
            alt="What your application screen may resemble when `mask-all` is enabled."
        /></picture>
      </figure></div
  ></a>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="37">
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">setImagePrivacy</span><span class="p">(</span><span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_ALL</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="38"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAll</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="39"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">ImagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_ALL</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="40"
  >
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end collapsible">
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">imagePrivacyLevel:</span> <span class="n">ImagePrivacyLevel</span><span class="p">.</span><span class="n">maskAll</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">replaySampleRate:</span> <span class="n">replay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h4 id="mask-content-images">Mask content images</h4>
  <p>
    You can manage content masking while still allowing system or bundled images
    to be visible.
  </p>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="(SDK is iOS) or (SDK is React Native)"
    data-if="43"
  >
    <p>
      Use the <code>maskNonBundledOnly</code> setting to replace non-bundled
      images with a &quot;Content Image&quot; placeholder in the replay.
    </p>
    <ul>
      <li>
        In UIKit, the SDK can determine whether an image is bundled and can mask
        it accordingly.
      </li>
      <li>
        In SwiftUI, this determination isn't possible. Instead, the SDK uses a
        heuristic: if an image exceeds 100×100 points, it is assumed to be
        non-bundled and is masked.
      </li>
    </ul>
  </div>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="44">
    <p>
      Select the <code>mask_large_only</code> setting, which replaces images
      with dimensions that exceed 100x100dp with a &quot;Content Image&quot;
      placeholder.
    </p>
    <p>
      <strong>Note</strong>: These dimensions refer to the drawable resource,
      not the view's size.
    </p>
  </div>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="45">
    <a
      href="http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.5f4cf48c86d01c0c6216ce20080e7511.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 50%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.5f4cf48c86d01c0c6216ce20080e7511.png?auto=format
              "
              class="img-fluid"
              style="width: 50%"
              alt="What your application screen may resemble when `mask_large_only` is enabled on Android."
          /></picture>
        </figure></div
    ></a>
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">setImagePrivacy</span><span class="p">(</span><span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_LARGE_ONLY</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="46"
  >
    <a
      href="http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-image-mask-non-bundled-only.133aa6a05f2a9110bd1b0bca9ba7b1dd.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 50%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/session_replay/mobile/masking-image-mask-non-bundled-only.133aa6a05f2a9110bd1b0bca9ba7b1dd.png?auto=format
              "
              class="img-fluid"
              style="width: 50%"
              alt="What your application screen may resemble when `mask_non_bundled_only` is enabled on iOS."
          /></picture>
        </figure></div
    ></a>
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskNonBundledOnly</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="47"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">ImagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_NON_BUNDLED_ONLY</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="48"
  >
    <p>
      Bundled images are those that use <code>AssetImage</code> as their image
      provider.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end collapsible">
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">imagePrivacyLevel:</span> <span class="n">ImagePrivacyLevel</span><span class="p">.</span><span class="n">maskNonAssetsOnly</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">replaySampleRate:</span> <span class="n">replay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h4 id="show-all-images">Show all images</h4>
  <p>
    With the <code>mask_none</code> setting enabled, all images are shown in the
    replay.
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="49">
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">setImagePrivacy</span><span class="p">(</span><span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_NONE</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="50"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskNone</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="51"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">ImagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_NONE</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h3 id="touch-masking">Touch masking</h3>
  <p>
    By default, the <code>hide</code> setting is enabled for all touches. With
    this setting enabled, all touches on screen are hidden.
  </p>
  <h4 id="hide-all-touches">Hide all touches</h4>
  <p>
    With the <code>hide</code> setting enabled, all touches that occur during
    the replay are hidden. This is the default setting.
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="52">
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">setTouchPrivacy</span><span class="p">(</span><span class="nc">TouchPrivacy</span><span class="p">.</span><span class="n">HIDE</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="53"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">hide</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="54"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">TouchPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">touchPrivacyLevel</span>: <span class="kt">TouchPrivacyLevel.HIDE</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="55"
  >
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end collapsible">
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">imagePrivacyLevel:</span> <span class="n">ImagePrivacyLevel</span><span class="p">.</span><span class="n">maskNone</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">replaySampleRate:</span> <span class="n">replay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h4 id="show-all-touches">Show all touches</h4>
  <p>
    With the <code>show</code> setting enabled, all touches that occur during
    the replay are shown.
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="56">
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">application.kt</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">setTouchPrivacy</span><span class="p">(</span><span class="nc">TouchPrivacy</span><span class="p">.</span><span class="n">SHOW</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="57"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">AppDelegate.swift</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
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
</span></span><span class="line"><span class="cl">  <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">show</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="58"
  >
    <div class="code-snippet-wrapper">
      <div
        class="code-filename-wrapper d-flex justify-content-between collapsible"
      >
        <p class="code-filename my-0">App.tsx</p>
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-typescript">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">TouchPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">touchPrivacyLevel</span>: <span class="kt">TouchPrivacyLevel.SHOW</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <p>
    Bundled images are those that use <code>AssetImage</code> as their image
    provider.
  </p>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="59"
  >
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end collapsible">
        <div class="js-code-block-visibility-toggle">
          <div class="chevron chevron-down d-none"></div>
          <div class="chevron chevron-up"></div>
        </div>
      </div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)..</span><span class="n">enableSessionReplay</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSessionReplayConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">touchPrivacyLevel:</span> <span class="n">TouchPrivacyLevel</span><span class="p">.</span><span class="n">show</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">replaySampleRate:</span> <span class="n">replay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h2 id="privacy-overrides">Privacy overrides</h2>
  <p>
    The sections above describe the global masking levels that apply to the
    entire application. However, it is also possible to override these settings
    at the view level. The same privacy levels as above are available for text
    and inputs, images, touches, and an additional setting to completely hide a
    specific view.
  </p>
  <p>
    To ensure overrides are recognized properly, they should be applied as early
    as possible in the view lifecycle. This prevents scenarios where Session
    Replay might process a view before applying the overrides.
  </p>
  <p>
    Privacy overrides affect views and their descendants. This means that even
    if an override is applied to a view where it might have no immediate effect
    (for example, applying an image override to a text input), the override
    still applies to all child views.
  </p>
  <p>
    Overrides operate using a &quot;nearest parent&quot; principle: if a view
    has an override, it uses that setting. Otherwise, it inherits the privacy
    level from the closest parent in the hierarchy with an override. If no
    parent has an override, the view defaults to the application's general
    masking level.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="(SDK is Android) or (SDK is iOS) or (SDK is Flutter)"
    data-if="75"
  >
    <h3 id="text-and-input-override">Text and input override</h3>
    <div
      class="cdoc__toggleable"
      data-description="SDK is Android"
      data-if="60"
    >
      <p>
        To override text and input privacy in Android classic view, use
        <code>setSessionReplayTextAndInputPrivacy</code> on a view instance and
        pass a value from the <code>TextAndInputPrivacy</code> enum. Passing
        <code>null</code> removes the override.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set a text and input override on your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">myView</span><span class="p">.</span><span class="n">setSessionReplayTextAndInputPrivacy</span><span class="p">(</span><span class="nc">TextAndInputPrivacy</span><span class="p">.</span><span class="n">MASK_SENSITIVE_INPUTS</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove a text and input override from your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">myView</span><span class="p">.</span><span class="n">setSessionReplayTextAndInputPrivacy</span><span class="p">(</span><span class="k">null</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        To override text and input privacy in Jetpack Compose, use
        <code>Modifier.sessionReplayTextAndInputPrivacy</code> on the modifier
        of a composable and pass a value from the
        <code>TextAndInputPrivacy</code> enum.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set a text and input override on your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">Text</span><span class="p">(</span><span class="n">modifier</span> <span class="p">=</span> <span class="n">Modifier</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">padding</span><span class="p">(</span><span class="m">16.</span><span class="n">dp</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">sessionReplayTextAndInputPrivacy</span><span class="p">(</span><span class="n">textAndInputPrivacy</span> <span class="p">=</span> <span class="nc">TextAndInputPrivacy</span><span class="p">.</span><span class="n">MASK_SENSITIVE_INPUTS</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">text</span> <span class="p">=</span> <span class="s2">&#34;Datadog&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is iOS"
      data-if="61"
    >
      <p>
        To override text and input privacy in UIKit views, use
        <code>dd.sessionReplayOverrides.textAndInputPrivacy</code> on a view
        instance and set a value from the
        <code>TextAndInputPrivacyLevel</code> enum. Setting it to
        <code>nil</code> removes the override.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">AppDelegate.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set a text and input override on your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">textAndInputPrivacy</span> <span class="p">=</span> <span class="p">.</span><span class="n">maskSensitiveInputs</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove a text and input override from your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">textAndInputPrivacy</span> <span class="p">=</span> <span class="kc">nil</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        To override text and input privacy in SwiftUI, wrap your content with
        <code>SessionReplayPrivacyView</code> and configure the
        <code>textAndInputPrivacy</code> parameter. You can combine this with
        other privacy settings in the same view for better performance.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">ContentView.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">ContentView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">@</span><span class="n">State</span> <span class="kd">private</span> <span class="kd">var</span> <span class="nv">username</span> <span class="p">=</span> <span class="s">&#34;&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">@</span><span class="n">State</span> <span class="kd">private</span> <span class="kd">var</span> <span class="nv">password</span> <span class="p">=</span> <span class="s">&#34;&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Set a text and input override on your SwiftUI content</span>
</span></span><span class="line"><span class="cl">        <span class="n">SessionReplayPrivacyView</span><span class="p">(</span><span class="n">textAndInputPrivacy</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAllInputs</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">VStack</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                <span class="n">Text</span><span class="p">(</span><span class="s">&#34;User Profile&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                <span class="n">TextField</span><span class="p">(</span><span class="s">&#34;Enter name&#34;</span><span class="p">,</span> <span class="n">text</span><span class="p">:</span> <span class="err">$</span><span class="n">username</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                <span class="n">SecureField</span><span class="p">(</span><span class="s">&#34;Password&#34;</span><span class="p">,</span> <span class="n">text</span><span class="p">:</span> <span class="err">$</span><span class="n">password</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is Flutter"
      data-if="62"
    >
      <p>
        To override text and input privacy in Flutter, use the
        <code>SessionReplayPrivacy</code> widget to override the privacy
        settings for an entire widget tree. Setting any value to
        <code>null</code> keeps the privacy values unchanged from values
        provided higher up the widget tree.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-end collapsible"
        >
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-dart">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">MyWidget</span><span class="o">:</span> <span class="n">StatelessWidget</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">Widget</span> <span class="n">build</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="n">SessionReplayPrivacy</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">textAndInputPrivacyLevel:</span> <span class="n">TextAndInputPrivacyLevel</span><span class="p">.</span><span class="n">maskAllInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">child:</span> <span class="n">TextField</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">decoration:</span> <span class="n">InputDecoration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">          <span class="nl">labelText:</span> <span class="s1">&#39;Simple Text Field&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="p">),</span>
</span></span><span class="line"><span class="cl">      <span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <h3 id="image-override">Image override</h3>
    <div
      class="cdoc__toggleable"
      data-description="SDK is Android"
      data-if="63"
    >
      <p>
        To override image privacy in Android classic view, use
        <code>setSessionReplayImagePrivacy</code> on a view instance and pass a
        value from the <code>ImagePrivacy</code> enum. Passing
        <code>null</code> removes the override.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set an image override on your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">myView</span><span class="p">.</span><span class="n">setSessionReplayImagePrivacy</span><span class="p">(</span><span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_ALL</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove an image override from your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">myView</span><span class="p">.</span><span class="n">setSessionReplayImagePrivacy</span><span class="p">(</span><span class="k">null</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        To override image privacy in Jetpack Compose, use
        <code>Modifier.sessionReplayImagePrivacy</code> on the modifier of a
        composable and pass a value from the <code>ImagePrivacy</code> enum.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set a image privacy override on your image
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">Image</span><span class="p">(</span><span class="n">modifier</span> <span class="p">=</span> <span class="n">Modifier</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">padding</span><span class="p">(</span><span class="m">16.</span><span class="n">dp</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">sessionReplayImagePrivacy</span><span class="p">(</span><span class="n">imagePrivacy</span> <span class="p">=</span> <span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_ALL</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">painter</span> <span class="p">=</span> <span class="n">painterResource</span><span class="p">(</span><span class="n">id</span> <span class="p">=</span> <span class="nc">R</span><span class="p">.</span><span class="n">drawable</span><span class="p">.</span><span class="n">ic_datadog</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">contentDescription</span> <span class="p">=</span> <span class="k">null</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is iOS"
      data-if="64"
    >
      <p>
        To override image privacy in UIKit views, use
        <code>dd.sessionReplayOverrides.imagePrivacy</code> on a view instance
        and set a value from the <code>ImagePrivacyLevel</code> enum. Setting it
        to <code>nil</code> removes the override.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">AppDelegate.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set an image override on your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">imagePrivacy</span> <span class="p">=</span> <span class="p">.</span><span class="n">maskAll</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove an image override from your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">imagePrivacy</span> <span class="p">=</span> <span class="kc">nil</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        To override image privacy in SwiftUI, wrap your content with
        <code>SessionReplayPrivacyView</code> and configure the
        <code>imagePrivacy</code> parameter.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">ContentView.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">ProfileView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kd">let</span> <span class="nv">profileImageURL</span> <span class="p">=</span> <span class="n">URL</span><span class="p">(</span><span class="n">string</span><span class="p">:</span> <span class="s">&#34;https://example.com/profile.jpg&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Set an image privacy override on your SwiftUI content</span>
</span></span><span class="line"><span class="cl">        <span class="n">SessionReplayPrivacyView</span><span class="p">(</span><span class="n">imagePrivacy</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAll</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">VStack</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                <span class="n">Image</span><span class="p">(</span><span class="s">&#34;userAvatar&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">resizable</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">frame</span><span class="p">(</span><span class="n">width</span><span class="p">:</span> <span class="mi">60</span><span class="p">,</span> <span class="n">height</span><span class="p">:</span> <span class="mi">60</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">clipShape</span><span class="p">(</span><span class="n">Circle</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">                <span class="n">AsyncImage</span><span class="p">(</span><span class="n">url</span><span class="p">:</span> <span class="n">profileImageURL</span><span class="p">)</span> <span class="p">{</span> <span class="n">image</span> <span class="k">in</span>
</span></span><span class="line"><span class="cl">                    <span class="n">image</span><span class="p">.</span><span class="n">resizable</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">                <span class="p">}</span> <span class="n">placeholder</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                    <span class="n">ProgressView</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">                <span class="p">}</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">frame</span><span class="p">(</span><span class="n">width</span><span class="p">:</span> <span class="mi">100</span><span class="p">,</span> <span class="n">height</span><span class="p">:</span> <span class="mi">100</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is Flutter"
      data-if="65"
    >
      <p>
        To override image privacy in Flutter, use the
        <code>SessionReplayPrivacy</code> widget to override the privacy
        settings for an entire widget tree. Setting any value to
        <code>null</code> keeps the privacy values unchanged from values
        provided higher up the widget tree.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-end collapsible"
        >
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-dart">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">MyWidget</span><span class="o">:</span> <span class="n">StatelessWidget</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">Widget</span> <span class="n">build</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="n">SessionReplayPrivacy</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">imagePrivacyLevel:</span> <span class="n">ImagePrivacyLevel</span><span class="p">.</span><span class="n">maskAll</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">child:</span> <span class="n">Image</span><span class="p">.</span><span class="n">asset</span><span class="p">(</span><span class="s1">&#39;assets/my_image.png&#39;</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <h3 id="touch-override">Touch override</h3>
    <div
      class="cdoc__toggleable"
      data-description="SDK is Android"
      data-if="66"
    >
      <p>
        To override touch privacy in Android classic view, use
        <code>setSessionReplayTouchPrivacy</code> on a view instance and pass a
        value from the <code>TouchPrivacy</code> enum. Passing
        <code>null</code> removes the override.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set a touch override on your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">view</span><span class="p">.</span><span class="n">setSessionReplayTouchPrivacy</span><span class="p">(</span><span class="nc">TouchPrivacy</span><span class="p">.</span><span class="n">HIDE</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove a touch override from your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">view</span><span class="p">.</span><span class="n">setSessionReplayTouchPrivacy</span><span class="p">(</span><span class="k">null</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        To override touch privacy in Jetpack Compose, use
        <code>Modifier.sessionReplayTouchPrivacy</code> on the modifier of a
        composable and pass a value from the <code>TouchPrivacy</code> enum.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set a touch privacy override on your view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">Column</span><span class="p">(</span><span class="n">modifier</span> <span class="p">=</span> <span class="n">Modifier</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">padding</span><span class="p">(</span><span class="m">16.</span><span class="n">dp</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">sessionReplayTouchPrivacy</span><span class="p">(</span><span class="n">touchPrivacy</span> <span class="p">=</span> <span class="nc">TouchPrivacy</span><span class="p">.</span><span class="n">HIDE</span><span class="p">)){</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Content
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is iOS"
      data-if="67"
    >
      <p>
        To override touch privacy in UIKit views, use
        <code>dd.sessionReplayOverrides.touchPrivacy</code> on a view instance
        and set a value from the <code>TouchPrivacyLevel</code> enum. Setting it
        to <code>nil</code> removes the override.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">AppDelegate.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Set a touch override on your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">touchPrivacy</span> <span class="p">=</span> <span class="p">.</span><span class="n">hide</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove a touch override from your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">touchPrivacy</span> <span class="p">=</span> <span class="kc">nil</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        To override touch privacy in SwiftUI, wrap your content with
        <code>SessionReplayPrivacyView</code> and configure the
        <code>touchPrivacy</code> parameter.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">ContentView.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">SettingsView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">@</span><span class="n">State</span> <span class="kd">private</span> <span class="kd">var</span> <span class="nv">sliderValue</span> <span class="p">=</span> <span class="mf">0.5</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Set a touch privacy override on your SwiftUI content</span>
</span></span><span class="line"><span class="cl">        <span class="n">SessionReplayPrivacyView</span><span class="p">(</span><span class="n">touchPrivacy</span><span class="p">:</span> <span class="p">.</span><span class="n">hide</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">VStack</span><span class="p">(</span><span class="n">spacing</span><span class="p">:</span> <span class="mi">20</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                <span class="n">Button</span><span class="p">(</span><span class="s">&#34;Some Action&#34;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                    <span class="c1">// Handle action</span>
</span></span><span class="line"><span class="cl">                <span class="p">}</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">padding</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">background</span><span class="p">(</span><span class="n">Color</span><span class="p">.</span><span class="n">blue</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">foregroundColor</span><span class="p">(.</span><span class="n">white</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">cornerRadius</span><span class="p">(</span><span class="mi">8</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">                <span class="n">Slider</span><span class="p">(</span><span class="n">value</span><span class="p">:</span> <span class="err">$</span><span class="n">sliderValue</span><span class="p">,</span> <span class="k">in</span><span class="p">:</span> <span class="mf">0.</span><span class="p">..</span><span class="mi">1</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                    <span class="n">Text</span><span class="p">(</span><span class="s">&#34;Some Value&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                <span class="p">}</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">padding</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is Flutter"
      data-if="68"
    >
      <p>
        To override touch privacy in Flutter, use the
        <code>SessionReplayPrivacy</code> widget to override the privacy
        settings for an entire widget tree. Setting any value to
        <code>null</code> keeps the privacy values unchanged from values
        provided higher up the widget tree.
      </p>
      <p>
        Enabling touch privacy affects the entire widget tree, and cannot be
        toggled back to &quot;show&quot; in children.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-end collapsible"
        >
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-dart">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">MyWidget</span><span class="o">:</span> <span class="n">StatelessWidget</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">Widget</span> <span class="n">build</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="n">SessionReplayPrivacy</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">touchPrivacyLevel:</span> <span class="n">TouchPrivacyLevel</span><span class="p">.</span><span class="n">hide</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">child:</span> <span class="n">PinPadWidget</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <h3 id="hidden-elements-override">Hidden elements override</h3>
    <p>
      For sensitive elements that need to be completely hidden, use the
      <code>hidden</code> setting.
    </p>
    <p>
      When an element is <code>hidden</code>, it is replaced by a placeholder
      labeled as &quot;Hidden&quot; in the replay, and its subviews are not
      recorded.
    </p>
    <p>
      <strong>Note</strong>: Marking a view as <code>hidden</code> does not
      prevent touch interactions from being recorded on that element. To hide
      touch interactions as well, use the
      <a href="#touch-override">touch override</a> in addition to marking the
      element as hidden.
    </p>
    <div
      class="cdoc__toggleable"
      data-description="SDK is Android"
      data-if="69"
    >
      <p>
        Use <code>setSessionReplayHidden(hide = true)</code> to hide the
        element. Setting <code>hide</code> to <code>false</code> removes the
        override.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Mark a view as hidden
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">myView</span><span class="p">.</span><span class="n">setSessionReplayHidden</span><span class="p">(</span><span class="n">hide</span> <span class="p">=</span> <span class="k">true</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove the override from the view
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">myView</span><span class="p">.</span><span class="n">setSessionReplayHidden</span><span class="p">(</span><span class="n">hide</span> <span class="p">=</span> <span class="k">false</span><span class="p">)</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        Use <code>Modifier.sessionReplayHide</code> to hide the element in
        Jetpack Compose.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">application.kt</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-kotlin">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Mark a Column as hidden
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">Column</span><span class="p">(</span><span class="n">modifier</span> <span class="p">=</span> <span class="n">Modifier</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">padding</span><span class="p">(</span><span class="m">16.</span><span class="n">dp</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">.</span><span class="n">sessionReplayHide</span><span class="p">(</span><span class="n">hide</span> <span class="p">=</span> <span class="k">true</span><span class="p">)){</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Content
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is iOS"
      data-if="70"
    >
      <p>
        In UIKit views, use <code>dd.sessionReplayOverrides.hide</code> to hide
        the element:
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">AppDelegate.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1">// Mark a view as hidden</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">hide</span> <span class="p">=</span> <span class="kc">true</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove the override from the view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">hide</span> <span class="p">=</span> <span class="kc">false</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        In SwiftUI, wrap your content with
        <code>SessionReplayPrivacyView</code> and set the
        <code>hide</code> parameter to <code>true</code>:
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">ContentView.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">PaymentView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">@</span><span class="n">State</span> <span class="kd">private</span> <span class="kd">var</span> <span class="nv">cardNumber</span> <span class="p">=</span> <span class="s">&#34;&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">@</span><span class="n">State</span> <span class="kd">private</span> <span class="kd">var</span> <span class="nv">cvv</span> <span class="p">=</span> <span class="s">&#34;&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Mark SwiftUI content as hidden</span>
</span></span><span class="line"><span class="cl">        <span class="n">SessionReplayPrivacyView</span><span class="p">(</span><span class="n">hide</span><span class="p">:</span> <span class="kc">true</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">VStack</span><span class="p">(</span><span class="n">spacing</span><span class="p">:</span> <span class="mi">16</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                <span class="n">Text</span><span class="p">(</span><span class="s">&#34;Payment Information&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">font</span><span class="p">(.</span><span class="n">headline</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">                <span class="n">TextField</span><span class="p">(</span><span class="s">&#34;Card Number&#34;</span><span class="p">,</span> <span class="n">text</span><span class="p">:</span> <span class="err">$</span><span class="n">cardNumber</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">textFieldStyle</span><span class="p">(</span><span class="n">RoundedBorderTextFieldStyle</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">                <span class="n">SecureField</span><span class="p">(</span><span class="s">&#34;CVV&#34;</span><span class="p">,</span> <span class="n">text</span><span class="p">:</span> <span class="err">$</span><span class="n">cvv</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">textFieldStyle</span><span class="p">(</span><span class="n">RoundedBorderTextFieldStyle</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">                <span class="n">Text</span><span class="p">(</span><span class="s">&#34;Card ending in 1234&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">foregroundColor</span><span class="p">(.</span><span class="n">secondary</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">padding</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        <strong>Note</strong>: Setting the <code>hidden</code> override to
        <code>nil</code> or <code>false</code> has the same effect—it disables
        the override.
      </p>
      <h3 id="combining-privacy-settings-in-swiftui">
        Combining privacy settings in SwiftUI
      </h3>
      <p>
        Combine multiple privacy settings in one
        <code>SessionReplayPrivacyView</code> for different configurations.
        Datadog recommends
        <strong
          >combining options in a single view rather than nesting multiple
          instances</strong
        >
        to avoid adding unnecessary view layers.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-between collapsible"
        >
          <p class="code-filename my-0">ContentView.swift</p>
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-swift">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">UserProfileView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">@</span><span class="n">State</span> <span class="kd">private</span> <span class="kd">var</span> <span class="nv">userBio</span> <span class="p">=</span> <span class="s">&#34;&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">@</span><span class="n">State</span> <span class="kd">private</span> <span class="kd">var</span> <span class="nv">cardNumber</span> <span class="p">=</span> <span class="s">&#34;&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">VStack</span><span class="p">(</span><span class="n">spacing</span><span class="p">:</span> <span class="mi">30</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Preferred: Combine multiple privacy settings in one view</span>
</span></span><span class="line"><span class="cl">            <span class="n">SessionReplayPrivacyView</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="n">textAndInputPrivacy</span><span class="p">:</span> <span class="p">.</span><span class="n">maskSensitiveInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">imagePrivacy</span><span class="p">:</span> <span class="p">.</span><span class="n">maskNonBundledOnly</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">touchPrivacy</span><span class="p">:</span> <span class="p">.</span><span class="n">show</span>
</span></span><span class="line"><span class="cl">            <span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                <span class="n">VStack</span><span class="p">(</span><span class="n">spacing</span><span class="p">:</span> <span class="mi">20</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                    <span class="c1">// User profile section</span>
</span></span><span class="line"><span class="cl">                    <span class="n">HStack</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                        <span class="n">AsyncImage</span><span class="p">(</span><span class="n">url</span><span class="p">:</span> <span class="n">URL</span><span class="p">(</span><span class="n">string</span><span class="p">:</span> <span class="s">&#34;https://example.com/profile.jpg&#34;</span><span class="p">))</span> <span class="p">{</span> <span class="n">image</span> <span class="k">in</span>
</span></span><span class="line"><span class="cl">                            <span class="n">image</span><span class="p">.</span><span class="n">resizable</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">                        <span class="p">}</span> <span class="n">placeholder</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                            <span class="n">Circle</span><span class="p">().</span><span class="n">fill</span><span class="p">(</span><span class="n">Color</span><span class="p">.</span><span class="n">gray</span><span class="p">.</span><span class="n">opacity</span><span class="p">(</span><span class="mf">0.3</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">                        <span class="p">}</span>
</span></span><span class="line"><span class="cl">                        <span class="p">.</span><span class="n">frame</span><span class="p">(</span><span class="n">width</span><span class="p">:</span> <span class="mi">60</span><span class="p">,</span> <span class="n">height</span><span class="p">:</span> <span class="mi">60</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                        <span class="p">.</span><span class="n">clipShape</span><span class="p">(</span><span class="n">Circle</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">                        <span class="n">VStack</span><span class="p">(</span><span class="n">alignment</span><span class="p">:</span> <span class="p">.</span><span class="n">leading</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                            <span class="n">Text</span><span class="p">(</span><span class="s">&#34;John Doe&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                                <span class="p">.</span><span class="n">font</span><span class="p">(.</span><span class="n">headline</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                            <span class="n">TextField</span><span class="p">(</span><span class="s">&#34;Enter bio&#34;</span><span class="p">,</span> <span class="n">text</span><span class="p">:</span> <span class="err">$</span><span class="n">userBio</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                                <span class="p">.</span><span class="n">textFieldStyle</span><span class="p">(</span><span class="n">RoundedBorderTextFieldStyle</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">                        <span class="p">}</span>
</span></span><span class="line"><span class="cl">                    <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">                    <span class="n">Button</span><span class="p">(</span><span class="s">&#34;Save Profile&#34;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                        <span class="c1">// Save action</span>
</span></span><span class="line"><span class="cl">                        <span class="bp">print</span><span class="p">(</span><span class="s">&#34;Profile saved&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">}</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">padding</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">background</span><span class="p">(</span><span class="n">Color</span><span class="p">.</span><span class="n">blue</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">foregroundColor</span><span class="p">(.</span><span class="n">white</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="p">.</span><span class="n">cornerRadius</span><span class="p">(</span><span class="mi">8</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                <span class="p">}</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">padding</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">            <span class="c1">// For completely different privacy requirements, use separate `SessionReplayPrivacyView` instances</span>
</span></span><span class="line"><span class="cl">            <span class="n">SessionReplayPrivacyView</span><span class="p">(</span><span class="n">hide</span><span class="p">:</span> <span class="kc">true</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                <span class="n">VStack</span><span class="p">(</span><span class="n">spacing</span><span class="p">:</span> <span class="mi">16</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                    <span class="n">Text</span><span class="p">(</span><span class="s">&#34;Credit Card Information&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                        <span class="p">.</span><span class="n">font</span><span class="p">(.</span><span class="n">headline</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                    <span class="n">TextField</span><span class="p">(</span><span class="s">&#34;Card Number&#34;</span><span class="p">,</span> <span class="n">text</span><span class="p">:</span> <span class="err">$</span><span class="n">cardNumber</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">                        <span class="p">.</span><span class="n">textFieldStyle</span><span class="p">(</span><span class="n">RoundedBorderTextFieldStyle</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">                <span class="p">}</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">padding</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">background</span><span class="p">(</span><span class="n">Color</span><span class="p">.</span><span class="n">gray</span><span class="p">.</span><span class="n">opacity</span><span class="p">(</span><span class="mf">0.1</span><span class="p">))</span>
</span></span><span class="line"><span class="cl">                <span class="p">.</span><span class="n">cornerRadius</span><span class="p">(</span><span class="mi">8</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">padding</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
      <p>
        <strong>Note</strong>: Each
        <code>SessionReplayPrivacyView</code> introduces an additional native
        view layer. For optimal performance, prefer combining privacy settings
        instead of nesting multiple privacy views when possible.
      </p>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="SDK is Flutter"
      data-if="71"
    >
      <p>
        To hide a widget tree in Flutter, use the
        <code>SessionReplayPrivacy</code> widget to override the privacy
        settings for an entire widget tree.
      </p>
      <p>
        Hiding a widget tree affects the entire widget tree, and cannot be
        toggled back to <code>false</code> in children, as Session Replay stops
        processing widget trees that are marked with <code>hide</code>.
      </p>
      <div class="code-snippet-wrapper">
        <div
          class="code-filename-wrapper d-flex justify-content-end collapsible"
        >
          <div class="js-code-block-visibility-toggle">
            <div class="chevron chevron-down d-none"></div>
            <div class="chevron chevron-up"></div>
          </div>
        </div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-dart">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="kd">class</span> <span class="nc">MyWidget</span><span class="o">:</span> <span class="n">StatelessWidget</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">Widget</span> <span class="n">build</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="n">SessionReplayPrivacy</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">hide:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">child:</span> <span class="n">PinPadWidget</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="76"
  >
    <p>
      Privacy overrides are fully supported in React Native starting from
      version <code>2.8.0</code> of the Datadog
      <a href="https://github.com/DataDog/dd-sdk-reactnative"
        >React Native SDK</a
      >. Although the underlying functionality is shared with native Android and
      iOS platforms, the integration in React Native is designed to align with
      common React patterns.
    </p>
    <h3 id="behavior-consistency">Behavior consistency</h3>
    <p>
      React Native's implementation is built on the same foundation as the
      native Android and iOS SDKs. As a result, you can rely on the privacy
      features behaving the same way across all three platforms.
    </p>
    <h3 id="usage-with-">Usage with <code>SessionReplayView</code></h3>
    <p>
      The SDK provides a set of React components under the
      <code>SessionReplayView</code> namespace, which are used to configure
      privacy settings within your React Native application.
    </p>
    <p>To use them, import <code>SessionReplayView</code> as follows:</p>
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
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">SessionReplayView</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>This import provides access to four privacy-focused components.</p>
    <p>
      Each of these components behaves like a regular React Native View, meaning
      they can be used anywhere you would typically use a View, with the
      addition of privacy-related behavior.
    </p>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Description</th>
          <th>Properties</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>SessionReplayView.Privacy</code></td>
          <td>
            Adds support for customizing text, image, and touch privacy settings
            for its children.
          </td>
          <td>
            <ul>
              <li>
                <code>textAndInputPrivacy?</code>:
                <a
                  href="https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/react-native-session-replay/src/SessionReplay.ts#L43"
                  >TextAndInputPrivacyLevel</a
                >
              </li>
              <li>
                <code>imagePrivacy?</code>:
                <a
                  href="https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/react-native-session-replay/src/SessionReplay.ts#L15"
                  >ImagePrivacyLevel</a
                >
              </li>
              <li>
                <code>touchPrivacy?</code>:
                <a
                  href="https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/react-native-session-replay/src/SessionReplay.ts#L32"
                  >TouchPrivacyLevel</a
                >
              </li>
              <li><code>hide?</code>: <code>boolean</code></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><code>SessionReplayView.MaskAll</code></td>
          <td>
            Applies the most restrictive privacy settings (<code>MaskAll</code>
            or platform equivalent) to all children.
          </td>
          <td>
            <ul>
              <li><code>showTouch?</code>: <code>boolean</code></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><code>SessionReplayView.MaskNone</code></td>
          <td>
            Applies the least restrictive settings (<code>MaskNone</code> or
            platform equivalent). All child components are visible.
          </td>
          <td><em>(No additional properties)</em></td>
        </tr>
        <tr>
          <td><code>SessionReplayView.Hide</code></td>
          <td>Completely hides all child components from session replay.</td>
          <td><em>(No additional properties)</em></td>
        </tr>
      </tbody>
    </table>
    <h3 id="integration-approaches">Integration approaches</h3>
    <p>There are two ways to apply privacy overrides in React Native:</p>
    <ul>
      <li>
        Wrap specific components with a privacy-focused
        <code>SessionReplayView</code> to target only certain elements, or
      </li>
      <li>
        Replace an entire <code>&lt;View&gt;</code> with a
        <code>SessionReplayView</code> to apply privacy settings to a whole
        section of your UI.
      </li>
    </ul>
    <p>
      This flexibility lets you control which parts of your app are masked or
      visible in session replays.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="as-wrappers"
          class="tab-pane fade"
          role="tabpanel"
          title="As wrappers"
        >
          <p>
            Use <code>SessionReplayView</code> components to wrap specific parts
            of your UI where you want to override privacy settings.
          </p>
          <p>For example, going from:</p>
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
                ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">App</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;</span><span class="nt">View</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;</span><span class="nt">TextInput</span> <span class="na">placeholder</span><span class="o">=</span><span class="s">&#34;First Name&#34;</span> <span class="na">value</span><span class="o">=</span><span class="s">&#34;Data&#34;</span> <span class="p">/&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;</span><span class="nt">TextInput</span> <span class="na">placeholder</span><span class="o">=</span><span class="s">&#34;Last Name&#34;</span> <span class="na">value</span><span class="o">=</span><span class="s">&#34;Dog&#34;</span> <span class="p">/&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;/</span><span class="nt">View</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>To:</p>
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
                ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">App</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;</span><span class="nt">View</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;</span><span class="nt">SessionReplayView.MaskAll</span> <span class="na">showTouch</span><span class="o">=</span><span class="p">{</span><span class="kc">true</span><span class="p">}&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;</span><span class="nt">TextInput</span> <span class="na">placeholder</span><span class="o">=</span><span class="s">&#34;First Name&#34;</span> <span class="na">value</span><span class="o">=</span><span class="s">&#34;Data&#34;</span> <span class="p">/&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;</span><span class="nt">TextInput</span> <span class="na">placeholder</span><span class="o">=</span><span class="s">&#34;Last Name&#34;</span> <span class="na">value</span><span class="o">=</span><span class="s">&#34;Dog&#34;</span> <span class="p">/&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;/</span><span class="nt">SessionReplayView.MaskAll</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;/</span><span class="nt">View</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="as-replacements"
          class="tab-pane fade"
          role="tabpanel"
          title="As replacements"
        >
          <p>
            Replace an existing <code>&lt;View&gt;</code> with a
            <code>SessionReplayView</code> component directly. This is ideal
            when a view already encapsulates the section of the UI that needs
            modified privacy behavior.
          </p>
          <p>For example, instead of:</p>
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
                ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">App</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;</span><span class="nt">View</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;/</span><span class="nt">View</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>You can use:</p>
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
                ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">App</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;</span><span class="nt">SessionReplayView.MaskNone</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;/</span><span class="nt">SessionReplayView.MaskNone</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 id="combining-privacy-components">Combining privacy components</h3>
    <p>
      You can freely combine the <code>SessionReplayView</code> components to
      apply different privacy settings to distinct sections of your UI. This is
      especially useful when you need a mix of hidden elements, masked input
      fields, and visible content within the same screen.
    </p>
    <p>For example:</p>
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
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">ImagePrivacyLevel</span><span class="p">,</span> <span class="nx">SessionReplayView</span><span class="p">,</span> <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span> <span class="nx">TouchPrivacyLevel</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">App</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;</span><span class="nt">SessionReplayView.Privacy</span>
</span></span><span class="line"><span class="cl">      <span class="na">textAndInputPrivacy</span><span class="o">=</span><span class="p">{</span><span class="nx">TextAndInputPrivacyLevel</span><span class="p">.</span><span class="nx">MASK_SENSITIVE_INPUTS</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="na">imagePrivacy</span><span class="o">=</span><span class="p">{</span><span class="nx">ImagePrivacyLevel</span><span class="p">.</span><span class="nx">MASK_NONE</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="na">touchPrivacy</span><span class="o">=</span><span class="p">{</span><span class="nx">TouchPrivacyLevel</span><span class="p">.</span><span class="nx">SHOW</span><span class="p">}&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;</span><span class="nt">SessionReplayView.MaskAll</span> <span class="na">showTouch</span><span class="o">=</span><span class="p">{</span><span class="kc">true</span><span class="p">}&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">&lt;</span><span class="nt">SessionReplayView.MaskNone</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">          <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">&lt;/</span><span class="nt">SessionReplayView.MaskNone</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;/</span><span class="nt">SessionReplayView.MaskAll</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;</span><span class="nt">SessionReplayView.Hide</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span><span class="cm">/* content */</span><span class="p">}</span>
</span></span><span class="line"><span class="cl">      <span class="p">&lt;/</span><span class="nt">SessionReplayView.Hide</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="p">&lt;/</span><span class="nt">SessionReplayView.Privacy</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h3 id="notes-on-webviews">Notes on WebViews</h3>
  <ul>
    <li>
      Privacy overrides, aside from the <code>hidden</code> and
      <code>touch</code> options, are not supported for WebViews. You can
      primarily manage their privacy using the
      <a href="/session_replay/browser/privacy_options"
        >browser SDK privacy settings</a
      >.
    </li>
    <li>
      When a WebView is marked as <code>hidden</code>, it is replaced by a
      placeholder in the replay. However, the WebView itself continues to
      collect and send data. To avoid this, it is recommended to use
      <a href="/session_replay/browser/privacy_options"
        >browser SDK privacy settings</a
      >
      for managing WebView privacy, as they provide more targeted control.
    </li>
  </ul>
  <h2 id="how-and-what-data-is-masked">How and what data is masked</h2>
  <p>
    This section describes how the Datadog recorder handles masking based on
    data type and how that data is defined.
  </p>
  <h3 id="text-masking-strategies">Text masking strategies</h3>
  <p>
    Depending on how you've configured your privacy settings, the type of text,
    and sensitivity of data, Datadog's masking rules apply different strategies
    to different types of text fields.
  </p>
  <table>
    <thead>
      <tr>
        <th>Text masking strategy</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>No mask</td>
        <td>The text is revealed in the session replay</td>
        <td>
          <code>&quot;Hello world&quot;</code> →
          <code>&quot;Hello world&quot;</code>
        </td>
      </tr>
      <tr>
        <td>Space-preserving mask</td>
        <td>
          Each visible character is replaced with a lowercase &quot;x&quot;
        </td>
        <td>
          <code>&quot;Hello world&quot;</code> →
          <code>&quot;xxxxx xxxxx&quot;</code>
        </td>
      </tr>
      <tr>
        <td>Fixed-length mask</td>
        <td>
          The entire text field is replaced with a constant of three asterisks
          (***)
        </td>
        <td>
          <code>&quot;Hello world&quot;</code> → <code>&quot;***&quot;</code>
        </td>
      </tr>
    </tbody>
  </table>
  <p>
    With the above text strategies in mind, you have a few different options if
    you want to override the default privacy rule of <code>mask</code> in your
    configuration.
  </p>
  <p>
    The following chart shows how Datadog applies different text masking
    strategies, using the rules you set up in your configuration, to the below
    text types.
  </p>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Allow all</th>
        <th>Mask all</th>
        <th>Mask user input</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#sensitive-text">Sensitive text</a></td>
        <td>Fixed-length mask</td>
        <td>Fixed-length mask</td>
        <td>Fixed-length mask</td>
      </tr>
      <tr>
        <td><a href="#input-and-option-text">Input and option text</a></td>
        <td>No mask</td>
        <td>Fixed-length mask</td>
        <td>Fixed-length mask</td>
      </tr>
      <tr>
        <td><a href="#static-text">Static text</a></td>
        <td>No mask</td>
        <td>Space-preserving mask</td>
        <td>No mask</td>
      </tr>
      <tr>
        <td><a href="#hint-text">Hint text</a></td>
        <td>No mask</td>
        <td>Fixed-length mask</td>
        <td>No mask</td>
      </tr>
    </tbody>
  </table>
  <h3 id="text-masking-definitions">Text masking definitions</h3>
  <p>
    Find below a description of how Datadog's recorder treats each text type.
  </p>
  <h4 id="sensitive-text">Sensitive text</h4>
  <p>
    Sensitive text includes passwords, e-mails, and phone numbers marked in a
    platform-specific way, and other forms of sensitivity in text available to
    each platform.
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="77">
    <p>Sensitive text can be detected in:</p>
    <ul>
      <li>Edit Text</li>
      <li>Address information</li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="78"
  >
    <p>Sensitive text can be detected in:</p>
    <ul>
      <li>Text Field</li>
      <li>Text View</li>
      <li>Address information</li>
      <li>Credit card numbers</li>
      <li>One-time codes</li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="79"
  >
    <p>Sensitive text can be detected in the following components.</p>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Platform(s)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Text Field</td>
          <td>iOS</td>
        </tr>
        <tr>
          <td>Text View</td>
          <td>iOS</td>
        </tr>
        <tr>
          <td>Edit Text</td>
          <td>Android</td>
        </tr>
        <tr>
          <td>Address information</td>
          <td>iOS, Android</td>
        </tr>
        <tr>
          <td>Credit card numbers</td>
          <td>iOS</td>
        </tr>
        <tr>
          <td>One-time codes</td>
          <td>iOS</td>
        </tr>
      </tbody>
    </table>
  </div>
  <table>
    <thead></thead>
    <tbody>
      <tr>
        <td><code>TextInputType.name</code></td>
        <td><code>TextInputType.phone</code></td>
        <td><code>TextInputType.emailAddress</code></td>
        <td><code>TextInputType.streetAddress</code></td>
        <td><code>TextInputType.twitter</code></td>
        <td><code>TextInputType.visiblePassword</code></td>
      </tr>
    </tbody>
  </table>
  <h4 id="input-and-option-text">Input and option text</h4>
  <p>
    Input and option text is text entered by the user with a keyboard or other
    text-input device, or a custom (non-generic) value in selection elements.
  </p>
  <p>This includes the below.</p>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="80"
  >
    <ul>
      <li>
        User-entered text in:
        <ul>
          <li>Text Field</li>
          <li>Text View</li>
        </ul>
      </li>
      <li>
        User-selected options in:
        <ul>
          <li>Value Picker</li>
          <li>Segment</li>
        </ul>
      </li>
      <li>
        Notable exclusions:
        <ul>
          <li>
            Placeholder (hint) texts in Text Field and Text View (not entered by
            the user)
          </li>
          <li>Non-editable texts in Text View</li>
          <li>Month, day, and year labels in Date Picker (generic values)</li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="81">
    <ul>
      <li>
        User-entered text in:
        <ul>
          <li>Edit Text</li>
        </ul>
      </li>
      <li>
        User-selected options in:
        <ul>
          <li>Value Picker</li>
          <li>Drop Down List</li>
        </ul>
      </li>
      <li>
        Notable exclusions:
        <ul>
          <li>
            Placeholder (hint) texts in Edit Text (not entered by the user)
          </li>
          <li>Month, day, and year labels in Date Picker (generic values)</li>
        </ul>
      </li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="82"
  >
    <ul>
      <li>
        User-entered text in:
        <ul>
          <li>Text Field (iOS)</li>
          <li>Text View (iOS)</li>
          <li>Edit Text (Android)</li>
        </ul>
      </li>
      <li>
        User-selected options in:
        <ul>
          <li>Value Picker (iOS + Android)</li>
          <li>Segment (iOS)</li>
          <li>Drop Down List (Android)</li>
        </ul>
      </li>
      <li>
        Notable exclusions:
        <ul>
          <li>
            Placeholder (hint) texts in Text Field, Text View and Edit Text (not
            entered by the user)
          </li>
          <li>Non-editable texts in Text View (iOS).</li>
          <li>Month, day, and year labels in Date Picker (generic values)</li>
        </ul>
      </li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="83"
  >
    <ul>
      <li>
        User-entered text in EditableText, which is used in:
        <ul>
          <li>TextField</li>
          <li>CupertinoTextField</li>
          <li>many custom TextField implementations</li>
        </ul>
      </li>
      <li>
        Notable exclusions:
        <ul>
          <li>
            Placeholder (hint) texts in Text Field and Text View (not entered by
            the user)
          </li>
          <li>Text in Text Decorations (not entered by the user)</li>
          <li>Month, day, and year labels in Date Picker (generic values)</li>
        </ul>
      </li>
    </ul>
  </div>
  <h4 id="static-text">Static text</h4>
  <p>
    Static text is any text that is not directly entered by the user. This
    includes the below.
  </p>
  <p>All texts in:</p>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="84"
  >
    <ul>
      <li>Texts in non-editable Text View</li>
      <li>Month, day, and year labels in the date and time picker</li>
      <li>
        Values updated in response to gesture interaction with input elements,
        such as the current value of the Slider
      </li>
      <li>
        Other controls, not considered as &quot;user input elements&quot;, such
        as Labels, Tab Bar, and Navigation Bar
      </li>
    </ul>
  </div>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="85">
    <ul>
      <li>Checkbox and Radio Button titles</li>
      <li>Month, day, and year labels in the date and time picker</li>
      <li>
        Values updated in response to gesture interaction with input elements,
        such as the current value of the Slider
      </li>
      <li>
        Other controls, not considered as &quot;user input elements&quot;, such
        as Tabs
      </li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="86"
  >
    <ul>
      <li>Checkbox and Radio Button titles (Android)</li>
      <li>Texts in non-editable Text View (iOS)</li>
      <li>Month, day and year labels in the date and time picker</li>
      <li>
        Values updated in response to gesture interaction with input elements,
        such as the current value of the Slider
      </li>
      <li>
        Other controls, not considered as &quot;user input elements&quot;, such
        as Labels, Tab Bar, and Navigation Bar (iOS), or Tabs (Android)
      </li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="87"
  >
    <ul>
      <li>Checkbox and Radio Button titles</li>
      <li>Month, day and year labels in the date and time picker</li>
      <li>
        Values updated in response to gesture interaction with input elements,
        such as the current value of the Slider
      </li>
      <li>
        Other controls, not considered as &quot;user input elements&quot;, such
        as Text, Tab Bar, and Bottom Navigation Bar
      </li>
    </ul>
  </div>
  <h4 id="hint-text">Hint text</h4>
  <p>
    Hint text is static text in editable text elements or option selectors that
    is displayed when no value is given. This includes:
  </p>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="88"
  >
    <ul>
      <li>Placeholders in Text Field</li>
      <li>Placeholders in Text View</li>
    </ul>
  </div>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="89">
    <ul>
      <li>Hints in Edit Text</li>
      <li>Prompts in Drop Down lists</li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="90"
  >
    <ul>
      <li>Placeholders in Text Field (iOS), Text View (iOS)</li>
      <li>Hints in Edit Text (Android)</li>
      <li>Prompts in Drop Down lists (Android)</li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="91"
  >
    <ul>
      <li>InputDecoration elements in TextView</li>
      <li>Placeholder text in CupertinoTextField</li>
    </ul>
  </div>
  <h3 id="appearance-masking">Appearance masking</h3>
  <p>
    The following chart shows how we apply different appearance masking
    strategies, using the rules you set up in your configuration, to the below
    text types.
  </p>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Allow all</th>
        <th>Mask all</th>
        <th>Mask user input</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#revealing-attributes">Revealing attributes</a></td>
        <td></td>
        <td><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
      </tr>
      <tr>
        <td><a href="#other-attributes">Other attributes</a></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <h4 id="revealing-attributes">Revealing attributes</h4>
  <p>
    Revealing attributes are attributes that can reveal or suggest the value of
    input elements and can be used to infer a user's input or selection.
  </p>
  <p>This includes:</p>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="92"
  >
    <p><strong>Shapes</strong></p>
    <ul>
      <li>Background of selected option in Segment</li>
      <li>Circle surrounding the selected date in a Date Picker</li>
      <li>Thumb of a Slider</li>
    </ul>
    <p><strong>Text attributes</strong></p>
    <ul>
      <li>The color of a label rendering the selected date in Date Picker</li>
      <li>The position of the first and last option in Value Picker</li>
    </ul>
  </div>
  <div class="cdoc__toggleable" data-description="SDK is Android" data-if="93">
    <p><strong>Shapes</strong></p>
    <ul>
      <li>Selection mark in Checkbox</li>
      <li>Thumb of a Slider</li>
    </ul>
    <p><strong>Text attributes</strong></p>
    <ul>
      <li>The position of the first and last option in Value Picker</li>
    </ul>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="94"
  >
    <p><strong>Shapes</strong></p>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Platform(s)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Background of selected option in Segment</td>
          <td>iOS</td>
        </tr>
        <tr>
          <td>Circle surrounding the selected date in Date Picker</td>
          <td>iOS</td>
        </tr>
        <tr>
          <td>Selection mark in Checkbox</td>
          <td>Android</td>
        </tr>
        <tr>
          <td>Thumb of a Slider</td>
          <td>iOS, Android</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Text attributes</strong></p>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Platform(s)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            The color of a label rendering the selected date in Date Picker
          </td>
          <td>iOS</td>
        </tr>
        <tr>
          <td>The position of the first and last option in Value Picker</td>
          <td>iOS, Android</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="95"
  >
    <p><strong>Shapes</strong></p>
    <ul>
      <li>Background of selected option in Segment</li>
      <li>Circle surrounding the selected date in a Date Picker</li>
      <li>Thumb of a Slider</li>
    </ul>
    <p><strong>Text attributes</strong></p>
    <ul>
      <li>The color of a label rendering the selected date in Date Picker</li>
      <li>The position of the first and last option in Value Picker</li>
    </ul>
  </div>
  <h3 id="touch-interactions">Touch interactions</h3>
  <p>
    The following chart shows how we apply different touch interaction
    strategies, using the rules you set up in your configuration, to the below
    text types. While any interaction that happens on an on-screen keyboard is
    masked, interactions with other elements are not masked.
  </p>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Allow all</th>
        <th>Mask all</th>
        <th>Mask user input</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#other-attributes">Other attributes</a></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td><a href="#on-screen-keyboard">On-screen keyboard</a></td>
        <td><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
      </tr>
    </tbody>
  </table>
  <h3 id="image-masking-definition">Image masking</h3>
  <p>
    The following chart shows how we apply different image masking strategies:
  </p>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Mask None</th>
        <th>
          <div
            class="cdoc__toggleable"
            data-description="SDK is Android"
            data-if="96"
          >
            Mask Large Only
          </div>
          <div
            class="cdoc__toggleable cdoc__hidden"
            data-description="SDK is iOS"
            data-if="97"
          >
            Mask Non Bundled Only
          </div>
          <div
            class="cdoc__toggleable cdoc__hidden"
            data-description="SDK is React Native"
            data-if="98"
          >
            Mark Large Only (Android) / Mask Non Bundled Only (iOS)
          </div>
        </th>
        <th>Mask All</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Content Image</td>
        <td>Shown</td>
        <td>Masked</td>
        <td>Masked</td>
      </tr>
      <tr>
        <td>System Image</td>
        <td>Shown</td>
        <td>Shown</td>
        <td>Masked</td>
      </tr>
    </tbody>
  </table>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/session_replay/mobile"><span class="w-100 d-flex justify-content-between "><span class="text">Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/session_replay/mobile/app_performance"><span class="w-100 d-flex justify-content-between "><span class="text">How Mobile Session Replay Impacts App Performance</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/session_replay/mobile/setup_and_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">Setup and Configure Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/session_replay/mobile/troubleshooting"><span class="w-100 d-flex justify-content-between "><span class="text">Troubleshoot Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/session_replay"><span class="w-100 d-flex justify-content-between "><span class="text">Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"24":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"24"},"25":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"25"},"26":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"26"},"27":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"27"},"28":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"28"},"29":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"29"},"30":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"30"},"31":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"31"},"32":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"32"},"33":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"33"},"34":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"34"},"35":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"35"},"36":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"36"},"37":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"37"},"38":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"38"},"39":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"39"},"40":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"40"},"43":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"41"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"42"}},"v":false,"r":"43"},"44":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"44"},"45":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"45"},"46":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"46"},"47":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"47"},"48":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"48"},"49":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"49"},"50":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"50"},"51":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"51"},"52":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"52"},"53":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"53"},"54":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"54"},"55":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"55"},"56":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"56"},"57":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"57"},"58":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"58"},"59":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"59"},"60":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"60"},"61":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"61"},"62":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"62"},"63":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"63"},"64":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"64"},"65":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"65"},"66":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"66"},"67":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"67"},"68":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"68"},"69":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"69"},"70":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"70"},"71":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"71"},"75":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"72"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"73"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"74"}},"v":true,"r":"75"},"76":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"76"},"77":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"77"},"78":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"78"},"79":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"79"},"80":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"80"},"81":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"81"},"82":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"82"},"83":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"83"},"84":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"84"},"85":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"85"},"86":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"86"},"87":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"87"},"88":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"88"},"89":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"89"},"90":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"90"},"91":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"91"},"92":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"92"},"93":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"93"},"94":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"94"},"95":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"flutter"},"v":false,"r":"95"},"96":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"96"},"97":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"97"},"98":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"98"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_sdk_platform_options_v2","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_platform_options_v2":"android"}}},"defaultValsByTraitId":{"platform":"android"},"optionGroupsById":{"rum_sdk_platform_options_v2":[{"default":true,"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"react_native","label":"React Native"},{"id":"flutter","label":"Flutter"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-all.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-non-bundled-only.png" style="display:none;" alt="" >}}

