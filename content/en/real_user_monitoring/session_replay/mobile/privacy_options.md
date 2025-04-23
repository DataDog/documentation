---
title: Mobile Session Replay Privacy Options
description: Configure privacy options for Mobile Session Replay.
further_reading:
  - link: /real_user_monitoring/session_replay/mobile
    tag: Documentation
    text: Mobile Session Replay
  - link: /real_user_monitoring/session_replay/mobile/app_performance
    tag: Documentation
    text: How Mobile Session Replay Impacts App Performance
  - link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
    tag: Documentation
    text: Setup and Configure Mobile Session Replay
  - link: /real_user_monitoring/session_replay/mobile/troubleshooting
    tag: Documentation
    text: Troubleshoot Mobile Session Replay
  - link: /real_user_monitoring/session_replay
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
    >React Native</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
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
    >React Native</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
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
    href="/images/real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.acb99b12d25150731551e6bb52b45e70.png?fit=max&amp;auto=format"
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
    inputs are shown except those considered sensitive, such as password fields.
  </p>
  <div class="cdoc__toggleable" data-if="12">
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setTextAndInputPrivacy</span><span class="p">(</span><span class="nc">TextAndInputPrivacy</span><span class="p">.</span><span class="n">MASK_SENSITIVE_INPUTS</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="13">
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskSensitiveInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="14">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
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
  <div class="cdoc__toggleable" data-if="15">
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
  <div class="cdoc__toggleable cdoc__hidden" data-if="16">
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAllInputs</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="17">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_ALL_INPUTS</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
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
  <div class="cdoc__toggleable" data-if="18">
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setTextAndInputPrivacy</span><span class="p">(</span><span class="nc">TextAndInputPrivacy</span><span class="p">.</span><span class="n">MASK_ALL</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="19">
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAll</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="20">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">TextAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">textAndInputPrivacyLevel</span>: <span class="kt">TextAndInputPrivacyLevel.MASK_ALL</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
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
  <h4 id="mask-all-images">Mask all images</h4>
  <p>
    With the <code>mask_all</code> setting enabled, all images are replaced by
    placeholders labeled 'Image' in the replay.
  </p>
  <a
    href="/images/real_user_monitoring/session_replay/mobile/masking-image-mask-all.02280a4a6f95b488272659849ebc13d6.png?fit=max&amp;auto=format"
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
  <div class="cdoc__toggleable" data-if="21">
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setImagePrivacy</span><span class="p">(</span><span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_ALL</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="22">
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskAll</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="23">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">ImagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_ALL</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <h4 id="mask-content-images">Mask content images</h4>
  <p>
    To manage content masking while still showing system images, users can
    choose the following options:
  </p>
  <p>
    On iOS, users can select the <code>mask_non_bundled_only</code> setting,
    which replaces any image that is not part of the system with a &quot;Content
    Image&quot; placeholder.
  </p>
  <p>
    On Android, users can select the <code>mask_large_only</code> setting, which
    replaces images with dimensions that exceed 100x100dp with a &quot;Content
    Image&quot; placeholder.
  </p>
  <p>
    <strong>Note</strong>: These dimensions refer to the drawable resource, not
    the view's size.
  </p>
  <div class="cdoc__toggleable" data-if="24">
    <a
      href="/images/real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.5f4cf48c86d01c0c6216ce20080e7511.png?fit=max&amp;auto=format"
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setImagePrivacy</span><span class="p">(</span><span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_LARGE_ONLY</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="25">
    <a
      href="/images/real_user_monitoring/session_replay/mobile/masking-image-mask-non-bundled-only.133aa6a05f2a9110bd1b0bca9ba7b1dd.png?fit=max&amp;auto=format"
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskNonBundledOnly</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="26">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">ImagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_NON_BUNDLED_ONLY</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
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
  <div class="cdoc__toggleable" data-if="27">
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setImagePrivacy</span><span class="p">(</span><span class="nc">ImagePrivacy</span><span class="p">.</span><span class="n">MASK_NONE</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="28">
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">maskNone</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="n">touchPrivacyLevel</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="29">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">ImagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">imagePrivacyLevel</span>: <span class="kt">ImagePrivacyLevel.MASK_NONE</span><span class="p">,</span>
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
  <div class="cdoc__toggleable" data-if="30">
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setTouchPrivacy</span><span class="p">(</span><span class="nc">TouchPrivacy</span><span class="p">.</span><span class="n">HIDE</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="31">
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">hide</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="32">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">TouchPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">touchPrivacyLevel</span>: <span class="kt">TouchPrivacyLevel.HIDE</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
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
  <div class="cdoc__toggleable" data-if="33">
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
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">setTouchPrivacy</span><span class="p">(</span><span class="nc">TouchPrivacy</span><span class="p">.</span><span class="n">SHOW</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="34">
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
</span></span><span class="line"><span class="cl">    <span class="n">replaySampleRate</span><span class="p">:</span> <span class="n">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="n">textAndInputPrivacyLevel</span><span class="p">:</span> <span class="n">textAndInputPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">imagePrivacyLevel</span><span class="p">:</span> <span class="n">imagePrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">touchPrivacyLevel</span><span class="p">:</span> <span class="p">.</span><span class="n">show</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="n">SessionReplay</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">with</span><span class="p">:</span> <span class="n">sessionReplayConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="35">
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
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplay</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SessionReplayConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">TouchPrivacyLevel</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@datadog/mobile-react-native-session-replay&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span>: <span class="kt">SessionReplayConfiguration</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">replaySampleRate</span>: <span class="kt">sampleRate</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">touchPrivacyLevel</span>: <span class="kt">TouchPrivacyLevel.SHOW</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">SessionReplay</span><span class="p">.</span><span class="nx">enable</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span>
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
  <p>
    &lt;div class=&quot;alert alert-info&quot;&gt;Privacy overrides are not
    supported in SwiftUI.&lt;/div&gt;
  </p>
  <h3 id="text-and-input-override">Text and input override</h3>
  <div class="cdoc__toggleable" data-if="36">
    <p>
      To override text and input privacy, use
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
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="37">
    <p>
      To override text and input privacy, use
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
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="38">
    <p>This feature is not supported on React Native.</p>
  </div>
  <h3 id="image-override">Image override</h3>
  <div class="cdoc__toggleable" data-if="39">
    <p>
      To override image privacy, use
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
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="40">
    <p>
      To override image privacy, use
      <code>dd.sessionReplayOverrides.imagePrivacy</code> on a view instance and
      set a value from the <code>ImagePrivacyLevel</code> enum. Setting it to
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
          ><code><span class="line"><span class="cl"><span class="c1">// Set an image override on your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">imagePrivacy</span> <span class="p">=</span> <span class="p">.</span><span class="n">maskAll</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove an image override from your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">imagePrivacy</span> <span class="p">=</span> <span class="kc">nil</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="41">
    <p>This feature is not supported on React Native.</p>
  </div>
  <h3 id="touch-override">Touch override</h3>
  <div class="cdoc__toggleable" data-if="42">
    <p>
      To override touch privacy, use
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
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="43">
    <p>
      To override touch privacy, use
      <code>dd.sessionReplayOverrides.touchPrivacy</code> on a view instance and
      set a value from the <code>TouchPrivacyLevel</code> enum. Setting it to
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
          ><code><span class="line"><span class="cl"><span class="c1">// Set a touch override on your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">touchPrivacy</span> <span class="p">=</span> <span class="p">.</span><span class="n">hide</span>
</span></span><span class="line"><span class="cl"><span class="c1">// Remove a touch override from your view</span>
</span></span><span class="line"><span class="cl"><span class="n">myView</span><span class="p">.</span><span class="n">dd</span><span class="p">.</span><span class="n">sessionReplayOverrides</span><span class="p">.</span><span class="n">touchPrivacy</span> <span class="p">=</span> <span class="kc">nil</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="44">
    <p>This feature is not supported on React Native.</p>
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
  <div class="cdoc__toggleable" data-if="45">
    <p>
      Use <code>setSessionReplayHidden(hide = true)</code> to hide the element.
      Setting <code>hide</code> to <code>false</code> removes the override.
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
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="46">
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
      <strong>Note</strong>: Setting the <code>hidden</code> override to
      <code>nil</code> has the same effect as setting it to
      <code>false</code>—it disables the override.
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="47">
    <p>This feature is not supported on React Native.</p>
  </div>
  <h3 id="notes-on-webviews">Notes on WebViews</h3>
  <p>
    • Privacy overrides, aside from the <code>hidden</code> and
    <code>touch</code> options, are not supported for WebViews. You can
    primarily manage their privacy using the
    <a href="/real_user_monitoring/session_replay/privacy_options"
      >browser SDK privacy settings</a
    >.
  </p>
  <p>
    • When a WebView is marked as <code>hidden</code>, it is replaced by a
    placeholder in the replay. However, the WebView itself continues to collect
    and send data. To avoid this, it is recommended to use
    <a href="/real_user_monitoring/session_replay/privacy_options"
      >browser SDK privacy settings</a
    >
    for managing WebView privacy, as they provide more targeted control.
  </p>
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
  <p>This includes passwords, e-mails and phone numbers in:</p>
  <ul>
    <li>Text Field (iOS)</li>
    <li>Text View (iOS)</li>
    <li>Edit Text (Android)</li>
    <li>Address information (iOS + Android)</li>
    <li>Credit card numbers (iOS)</li>
    <li>One-time codes (iOS)</li>
  </ul>
  <h4 id="input-and-option-text">Input and option text</h4>
  <p>
    Input and option text is text entered by the user with a keyboard or other
    text-input device, or a custom (non-generic) value in selection elements.
  </p>
  <p>This includes the below.</p>
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
  <h4 id="static-text">Static text</h4>
  <p>
    Static text is any text that is not directly entered by the user. This
    includes the below.
  </p>
  <p>All texts in:</p>
  <ul>
    <li>Checkbox and Radio Button titles (Android)</li>
    <li>Texts in non-editable Text View (iOS)</li>
    <li>Month, day and year labels in the date and time picker</li>
    <li>
      Values updated in response to gesture interaction with input elements,
      such as the current value of the Slider
    </li>
    <li>
      Other controls, not considered as &quot;user input elements&quot;, such as
      Labels, Tab Bar, and Navigation Bar (iOS), or Tabs (Android)
    </li>
  </ul>
  <h4 id="hint-text">Hint text</h4>
  <p>
    Hint text is static text in editable text elements or option selectors that
    is displayed when no value is given. This includes:
  </p>
  <ul>
    <li>Placeholders in Text Field (iOS), Text View (iOS)</li>
    <li>Hints in Edit Text (Android)</li>
    <li>Prompts in Drop Down lists (Android)</li>
  </ul>
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
  <p><strong>Shapes</strong></p>
  <ul>
    <li>Background of selected option in Segment (iOS)</li>
    <li>Circle surrounding the selected date in a Date Picker (iOS)</li>
    <li>Selection mark in Checkbox (Android)</li>
    <li>Thumb of a Slider (iOS and Android)</li>
  </ul>
  <p><strong>Text attributes</strong></p>
  <ul>
    <li>
      The color of a label rendering the selected date in Date Picker (iOS)
    </li>
    <li>
      The position of the first and last option in Value Picker (iOS and
      Android)
    </li>
  </ul>
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
  <h3 id="image-masking">Image masking</h3>
  <p>
    The following chart shows how we apply different image masking strategies:
  </p>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Mask None</th>
        <th>
          Mark Large Only (Android) &lt;br/&gt; / Mask Non Bundled Only (iOS)
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile"><span class="w-100 d-flex justify-content-between "><span class="text">Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile/app_performance"><span class="w-100 d-flex justify-content-between "><span class="text">How Mobile Session Replay Impacts App Performance</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile/setup_and_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">Setup and Configure Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile/troubleshooting"><span class="w-100 d-flex justify-content-between "><span class="text">Troubleshoot Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay"><span class="w-100 d-flex justify-content-between "><span class="text">Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"12":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"12"},"13":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"13"},"14":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"14"},"15":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"15"},"16":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"16"},"17":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"17"},"18":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"18"},"19":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"19"},"20":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"20"},"21":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"21"},"22":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"22"},"23":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"23"},"24":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"24"},"25":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"25"},"26":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"26"},"27":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"27"},"28":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"28"},"29":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"29"},"30":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"30"},"31":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"31"},"32":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"32"},"33":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"33"},"34":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"34"},"35":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"35"},"36":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"36"},"37":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"37"},"38":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"38"},"39":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"39"},"40":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"40"},"41":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"41"},"42":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"42"},"43":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"43"},"44":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"44"},"45":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"android"},"v":true,"r":"45"},"46":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"ios"},"v":false,"r":"46"},"47":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"android"},"1":"react_native"},"v":false,"r":"47"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_sdk_platform_options","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_platform_options":"android"}}},"defaultValsByTraitId":{"platform":"android"},"optionGroupsById":{"rum_sdk_platform_options":[{"default":true,"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"react_native","label":"React Native"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>