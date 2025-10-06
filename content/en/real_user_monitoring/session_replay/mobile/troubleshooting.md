---
title: Troubleshooting Mobile Session Replay
description: How to troubleshoot Mobile Session Replay.
aliases: null
further_reading:
  - link: /real_user_monitoring/session_replay/mobile
    tag: Documentation
    text: Mobile Session Replay
  - link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
    tag: Documentation
    text: Setup and Configure Mobile Session Replay
  - link: /real_user_monitoring/session_replay/mobile/app_performance
    tag: Documentation
    text: How Mobile Session Replay Impacts App Performance
  - link: /real_user_monitoring/session_replay/mobile/privacy_options
    tag: Documentation
    text: Mobile Session Replay Privacy Options
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
      data-option-id="browser"
      aria-selected="true"
      tabIndex="0"
    >Browser</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="android"
      aria-selected="false"
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
      >Browser</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="browser"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Browser</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="android"
      role="option" 
      aria-selected="false"
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
  <div class="cdoc__toggleable" data-if="232">
    <h2 id="overview">Overview</h2>
    <p>
      If you experience unexpected behavior with Datadog Session Replay, use
      this page to help resolve issues. If you continue to have trouble, contact
      <a href="/help">Datadog Support</a> for further assistance. Regularly
      update to the latest version of the
      <a href="https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md"
        >RUM Browser SDK</a
      >, as each release contains improvements and fixes.
    </p>
    <h2 id="session-replay-recorder">Session Replay Recorder</h2>
    <h3 id="some-html-elements-are-not-visible-at-replay">
      Some HTML elements are not visible at replay
    </h3>
    <p>Session Replay does not support:</p>
    <ul>
      <li>
        The following HTML elements: <code>iframe</code>, <code>video</code>,
        <code>audio</code>, or <code>canvas</code>
        <ul>
          <li>
            To render iframes in Session Replay, you can separately instrument
            the iframe code. For iframes that span across subdomains, use
            <code>trackSessionAcrossSubdomains: true</code>. After correct
            instrumentation, iframes and their parent windows appear as separate
            pages within the same session. Embedding iframe replays directly
            into their parent windows is not supported.
          </li>
        </ul>
      </li>
      <li>
        The
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API"
          >Web Animations API</a
        >
      </li>
    </ul>
    <p>
      Session Replay requires you to use an HTTPS connection. If you aren't
      using a secure connection, the resources time out and you can't see images
      and some page elements.
    </p>
    <h3 id="fonts-or-images-do-not-render-properly">
      Fonts or images do not render properly
    </h3>
    <p>
      A Session Replay is not a video, but an actual iframe rebuilt based on
      snapshots of the DOM. The replay thus depends on the various assets of the
      page: fonts and images.
    </p>
    <p>
      Assets may not be available at the time of replay for the following
      reasons:
    </p>
    <ul>
      <li>
        The resource no longer exists. For example, it was part of a previous
        deployment.
      </li>
      <li>
        The resource is inaccessible. For example, authentication might be
        required, or the resource might only be accessible from an internal
        network.
      </li>
      <li>
        The resource is blocked by the browser due to CORS (typically
        web-fonts).
        <ul>
          <li>
            The replay rendered on the
            <code>session-replay-datadoghq.com</code> sandbox domain and the
            asset requests are subject to cross-origin security checks by your
            browser. If the given asset is not authorized for the domain, your
            browser blocks the request.
          </li>
          <li>
            Allow <code>session-replay-datadoghq.com</code> through the
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin"
              ><code>Access-Control-Allow-Origin</code></a
            >
            header for any font or image assets your website depends on to
            ensure these resources are accessible for the replay. For more
            information, see
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
              >Cross Origin Resource Sharing</a
            >.
          </li>
        </ul>
      </li>
    </ul>
    <h3 id="css-rules-not-properly-applied-mouse-hover-not-replayed">
      CSS rules not properly applied/mouse hover not replayed
    </h3>
    <p>
      Unlike fonts and images, the recorder tries to bundle the various CSS
      rules applied as part of the recording data, leveraging the
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet"
        >CSSStyleSheet</a
      >
      interface. If this is not possible, it falls back to recording the links
      to the CSS files.
    </p>
    <p>
      For proper mouse hover support, the CSS rules must be accessible through
      the CSSStyleSheet interface.
    </p>
    <p>
      If the stylesheets are hosted on a different domain than the web page,
      access to the CSS rules is subject to cross-origin security checks by the
      browser, and the browser must be instructed to load the stylesheet
      leveraging CORS using the
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin"
        >crossorigin</a
      >
      attribute.
    </p>
    <p>
      For example, if your application is on the <code>example.com</code> domain
      and depends on a CSS file on <code>assets.example.com</code> through a
      link element, the <code>crossorigin</code> attribute should be set to
      <code>anonymous</code>, unless credentials are required:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-html">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">link</span> <span class="na">rel</span><span class="o">=</span><span class="s">&#34;stylesheet&#34;</span> <span class="na">crossorigin</span><span class="o">=</span><span class="s">&#34;anonymous&#34;</span>
</span></span><span class="line"><span class="cl">      <span class="na">href</span><span class="o">=</span><span class="s">&#34;https://assets.example.com/style.css&#34;</span><span class="p">&gt;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Additionally, authorize the <code>example.com</code> domain in the
      <code>assets.example.com</code>. This allows the assets file to load the
      resource by setting the
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin"
        ><code>Access-Control-Allow-Origin</code></a
      >
      header.
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="233">
    <h2 id="overview">Overview</h2>
    <p>
      If you experience unexpected behavior with Datadog Session Replay, use
      this page to help resolve issues. If you continue to have trouble, contact
      <a href="/help">Datadog Support</a> for further assistance. Regularly
      update to the latest version of the SDK, as each release contains
      improvements and fixes.
    </p>
    <h2 id="session-replays">Session replays</h2>
    <h3
      id="some-parts-of-the-application-are-blank-or-not-visible-in-the-player"
    >
      Some parts of the application are blank or not visible in the player
    </h3>
    <p>
      Mobile Session Replay only supports native frameworks. Within these
      frameworks, there may be certain components or screens missing, such as:
    </p>
    <ul>
      <li>
        SwiftUI is supported through an <strong>experimental</strong> feature.
        If this experimental support is <strong>not enabled</strong>, SwiftUI
        screens may appear blank or incomplete.
      </li>
      <li>
        Certain system elements, such as actionBar in Android, progress bars,
        and spinners
      </li>
      <li>
        Rich system contents, such as video players, music player, and map
        widgets
      </li>
      <li>Views that use direct canvas drawing</li>
      <li>Advanced text styling</li>
    </ul>
    <h3 id="images-do-not-render-properly">Images do not render properly</h3>
    <p>
      Depending on the SDK configuration of Mobile Session Replay, images may
      not always be displayed.
    </p>
    <p>Image visibility depends on your SDK privacy configuration:</p>
    <ul>
      <li>
        On iOS, if <code>maskNonBundledOnly</code> is enabled, only bundled
        images with UIKit and images up to 100x100 pts on SwiftUI are captured.
      </li>
      <li>
        On Android, if <code>mask_large_only</code> is used, only images up to
        100x100dp are captured.
      </li>
    </ul>
    <p>
      All other images are replaced by a &quot;Content Image&quot; placeholder
      in the UI.
    </p>
    <p>
      Learn more about
      <a
        href="/real_user_monitoring/session_replay/mobile/privacy_options/?platform=ios&amp;tab=as-wrappers#image-masking"
        >image privacy settings</a
      >.
    </p>
    <p>
      Images follow a separate processing pipeline, which may introduce a small
      delay between uploading a replay and the image being available for
      rendering in the web player. In this case, wait a few minutes and then
      reload the replay.
    </p>
    <p>
      On iOS, vector images are not supported in Session Replay and appear as
      &quot;Unsupported image type&quot; placeholders in the replay. To work
      around this, disable the &quot;Preserve Vector Data&quot; option in your
      asset catalog so that Xcode rasterizes the images, allowing them to be
      captured correctly. SF Symbols are also not supported.
    </p>
    <h3
      id="the-session-replay-rendering-looks-does-not-exactly-mirror-my-application"
    >
      The session replay rendering looks does not exactly mirror my application
    </h3>
    <p>
      Mobile Session Replay's approach combines performance with usability. To
      achieve this, it's not a pixel-perfect recreation of your app, but instead
      it takes a hybrid approach to the visual: it displays a scaffold of the
      screen that can later be enriched with styling and contextual images.
    </p>
    <h3
      id="for-sessions-that-are-very-short-i-see-a-replay-attached-but-i-m-unable-to-view-the-replay"
    >
      For sessions that are very short, I see a replay attached, but I'm unable
      to view the replay
    </h3>
    <p>
      When sessions are 1 nanosecond long, Datadog is unable to process the
      record, so there is no replay attached.
    </p>
    <h2 id="data-security">Data security</h2>
    <h3
      id="i-need-to-account-for-mobile-app-consent-when-collecting-mobile-session-replays"
    >
      I need to account for mobile app consent when collecting mobile session
      replays
    </h3>
    <p>
      Before data is uploaded to Datadog, it is stored in cleartext in your
      application's cache directory. Upon starting the SDK, a tracking consent
      value needs to be set to one of the following:
    </p>
    <ul>
      <li>
        If the value is <strong>not granted</strong>, then no data is ever
        written on disk.
      </li>
      <li>
        If the value is <strong>pending</strong>, the data is written in a
        temporary folder which cannot be uploaded to Datadog.
      </li>
      <li>
        If the value is <strong>granted</strong>, data is written in an
        &quot;upload&quot; folder, which is processed in the background, and
        eventually uploaded to Datadog.
      </li>
    </ul>
    <p>
      At any time during the lifetime of the host app, it's possible to change
      the tracking consent. When the consent changes from pending to granted,
      the data in the temporary folder is moved to the &quot;upload&quot;
      folder.
    </p>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile"><span class="w-100 d-flex justify-content-between "><span class="text">Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile/setup_and_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">Setup and Configure Mobile Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile/app_performance"><span class="w-100 d-flex justify-content-between "><span class="text">How Mobile Session Replay Impacts App Performance</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay/mobile/privacy_options"><span class="w-100 d-flex justify-content-between "><span class="text">Mobile Session Replay Privacy Options</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/session_replay"><span class="w-100 d-flex justify-content-between "><span class="text">Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"232":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"232"},"233":{"m":"F","n":"n","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"232"}},"v":false,"r":"233"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_sdk_platform_options_v2","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_platform_options_v2":"browser"}}},"defaultValsByTraitId":{"platform":"browser"},"optionGroupsById":{"rum_sdk_platform_options_v2":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"react_native","label":"React Native"},{"id":"flutter","label":"Flutter"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>