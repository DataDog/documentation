---
title: Troubleshooting
description: Learn how to troubleshoot issues.
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
    >Flutter</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="roku"
      aria-selected="false"
      tabIndex="0"
    >Roku</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="kotlin_multiplatform"
      aria-selected="false"
      tabIndex="0"
    >Kotlin Multiplatform</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="unity"
      aria-selected="false"
      tabIndex="0"
    >Unity</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
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
    >Flutter</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="roku"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Roku</a><a 
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
      data-option-id="unity"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Unity</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    If you experience unexpected behavior with client SDKs, use this guide to
    resolve issues quickly. If you continue to have trouble, contact [Datadog
    Support][1] for further assistance. Regularly update to the latest version
    of the SDK, as each release contains improvements and fixes.
  </p>
  <div class="cdoc__toggleable" data-if="8">
    <h2 id="missing-data">Missing data</h2>
    <p>If you can't see any RUM data or if data is missing for some users:</p>
    <table>
      <thead>
        <tr>
          <th>Common causes</th>
          <th>Recommended fix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Ad blockers prevent the RUM Browser SDK from being downloaded or
            sending data to Datadog.
          </td>
          <td>
            Some ad blockers extend their restrictions to performance and
            marketing tracking tools. See the [Install the RUM Browser SDK with
            npm][3] and [forward the collected data through a proxy][4] docs.
          </td>
        </tr>
        <tr>
          <td>
            Network rules, VPNs, or antivirus software can prevent the RUM
            Browser SDK from being downloaded or sending data to Datadog.
          </td>
          <td>
            Grant access to the endpoints required to download the RUM Browser
            SDK or to send data. The list of endpoints is available in the
            [Content Security Policy documentation][5].
          </td>
        </tr>
        <tr>
          <td>
            Scripts, packages, and clients initialized before the RUM Browser
            SDK can lead to missed logs, resources, and user actions. For
            example, initializing ApolloClient before the RUM Browser SDK may
            result in <code>graphql</code> requests not being logged as XHR
            resources in the RUM Explorer.
          </td>
          <td>
            Check where the RUM Browser SDK is initialized and consider moving
            this step earlier in the execution of your application code.
          </td>
        </tr>
        <tr>
          <td>
            If you've set <code>trackViewsManually: true</code> and notice that
            no sessions are present, the application may have suddenly stopped
            sending RUM information even though there are no network errors.
          </td>
          <td>
            Be sure to start an initial view once you've initialized RUM to
            prevent any data loss. See [Advanced Configuration][6] for more
            information.
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Read the [Content Security Policy guidelines][5] and ensure your website
      grants access to the RUM Browser SDK CDN and the intake endpoint.
    </p>
    <h2 id="issues-running-multiple-rum-tools-in-the-same-application">
      Issues running multiple RUM tools in the same application
    </h2>
    <p>
      Datadog supports only one SDK per application. To ensure optimal data
      collection and full functionality of all Datadog RUM SDK features, use
      only the Datadog RUM SDK.
    </p>
    <h3 id="the-rum-browser-sdk-is-initialized">
      The RUM Browser SDK is initialized
    </h3>
    <p>
      Check if the RUM Browser SDK is initialized by running
      <code>window.DD_RUM.getInternalContext()</code> in your browser console
      and verify an <code>application_id</code>, <code>session_id</code>, and
      view object are returned:
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/browser/troubleshooting/success_rum_internal_context.0589f51fb04971fa41970baf12f3fee3.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/browser/troubleshooting/success_rum_internal_context.0589f51fb04971fa41970baf12f3fee3.png?auto=format
              "
              class="img-fluid"
              alt="Successful get internal context command"
          /></picture>
        </figure></div
    ></a>
    <p>
      If the RUM Browser SDK is not installed, or if it is not successfully
      initialized, you may see the
      <code>ReferenceError: DD_RUM is not defined</code> error like the one
      below:
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/browser/troubleshooting/error_rum_internal_context.c1aadae7f8d9589ac0d08e0c4c8c0e9f.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/browser/troubleshooting/error_rum_internal_context.c1aadae7f8d9589ac0d08e0c4c8c0e9f.png?auto=format
              "
              class="img-fluid"
              alt="Error get internal context command"
          /></picture>
        </figure></div
    ></a>
    <p>
      You can also check your browser developer tools console or network tab if
      you notice any errors related to the loading of the RUM Browser SDK.
    </p>
    <p>
      <strong>Note</strong>: To ensure accurate results, set
      <code>sessionSampleRate</code> to 100. For more information, see
      [Configure Your Setup For Browser RUM and Browser RUM &amp; Session Replay
      Sampling][9].
    </p>
    <h3 id="data-to-the-datadog-intake">Data to the Datadog intake</h3>
    <p>
      The RUM SDK sends batches of event data to Datadog's intake every time one
      of these conditions have been met:
    </p>
    <ul>
      <li>Every 30 seconds</li>
      <li>When 50 events have been reached</li>
      <li>When the payload is &gt;16 kB</li>
      <li>On <code>visibility:hidden</code> or <code>beforeUnload</code></li>
    </ul>
    <p>
      If data is being sent, you should see network requests targeting
      <code>api/v2/rum</code> (the URL origin part may differ due to RUM
      configuration) in the Network section of your browser developer tools:
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/browser/troubleshooting/network_intake-1.9fc1ae9bd4daab52329692fbf06c977f.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/browser/troubleshooting/network_intake-1.9fc1ae9bd4daab52329692fbf06c977f.png?auto=format
              "
              class="img-fluid"
              alt="RUM requests to Datadog intake"
          /></picture>
        </figure></div
    ></a>
    <h2 id="rum-cookies">RUM cookies</h2>
    <p>
      The RUM Browser SDK relies on cookies to store session information and
      follow a [user session][7] across different pages. The cookies are
      first-party (they are set on your domain) and are not used for cross-site
      tracking. Here are the cookies set by the RUM Browser SDK:
    </p>
    <table>
      <thead>
        <tr>
          <th>Cookie name</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>_dd_s</code></td>
          <td>
            Cookie used to group all events generated from a unique user session
            across multiple pages. It contains the current session ID, whether
            the session is excluded due to sampling, and the expiration date of
            the session. The cookie is extended for an extra 15 minutes every
            time the user interacts with the website, up to the maximum user
            session duration (4 hours).
          </td>
        </tr>
        <tr>
          <td><code>dd_site_test_*</code></td>
          <td>
            Temporary cookie used to test for cookie support. Expires instantly.
          </td>
        </tr>
        <tr>
          <td><code>dd_cookie_test_*</code></td>
          <td>
            Temporary cookie used to test for cookie support. Expires instantly.
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Note</strong>: The <code>_dd_l</code>, <code>_dd_r</code>, and
      <code>_dd</code> cookies have been replaced with <code>_dd_s</code> in
      recent versions of the RUM Browser SDK.
    </p>
    <h2 id="session-ids-cookies-and-rum-applications">
      Session IDs, cookies and RUM applications
    </h2>
    <p>
      There is a one-to-one relation between a RUM session and the RUM
      application it belongs to. Therefore, the domain set for the
      <code>_dd_s</code> cookie is fully dedicated to the RUM application it is
      monitoring and cannot monitor any additional applications.
    </p>
    <h2 id="technical-limitations">Technical limitations</h2>
    <p>Each event sent by the RUM Browser SDK is built with the following:</p>
    <ul>
      <li>RUM global context</li>
      <li>Event context (if any)</li>
      <li>Attributes specific to the event</li>
    </ul>
    <p>Example:</p>
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
          ><code><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span> <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">setGlobalContextProperty</span><span class="p">(</span><span class="s1">&#39;global&#39;</span><span class="p">,</span> <span class="p">{</span><span class="s1">&#39;foo&#39;</span><span class="o">:</span> <span class="s1">&#39;bar&#39;</span><span class="p">})</span>
</span></span><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span> <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">addAction</span><span class="p">(</span><span class="s1">&#39;hello&#39;</span><span class="p">,</span> <span class="p">{</span><span class="s1">&#39;action&#39;</span><span class="o">:</span> <span class="s1">&#39;qux&#39;</span><span class="p">})</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>The example code creates the following action event:</p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-json">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;type&#34;</span><span class="p">:</span> <span class="s2">&#34;action&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;context&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;global&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nt">&#34;foo&#34;</span><span class="p">:</span> <span class="s2">&#34;bar&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;action&#34;</span><span class="p">:</span> <span class="s2">&#34;qux&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">},</span>
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;action&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;id&#34;</span><span class="p">:</span> <span class="s2">&#34;xxx&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;target&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="nt">&#34;name&#34;</span><span class="p">:</span> <span class="s2">&#34;hello&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;type&#34;</span><span class="p">:</span> <span class="s2">&#34;custom&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">},</span>
</span></span><span class="line"><span class="cl">  <span class="err">...</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      If an event or a request goes beyond any of the following limitations, it
      is rejected by the Datadog intake.
    </p>
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Limitation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Maximum number of attributes per event</td>
          <td>256</td>
        </tr>
        <tr>
          <td>Maximum attribute depth per event</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Maximum event size</td>
          <td>256 KB</td>
        </tr>
        <tr>
          <td>Maximum intake payload size</td>
          <td>5 MB</td>
        </tr>
      </tbody>
    </table>
    <h2 id="customer-data-exceeds-the-recommended-threshold-warning">
      &quot;Customer data exceeds the recommended threshold&quot; warning
    </h2>
    <p>
      The RUM browser SDK allows you to set [global context][10], [user
      information][11] and [feature flags][12] which are then included with the
      collected events.
    </p>
    <p>
      To minimize the user bandwidth impact, the RUM browser SDK throttles the
      data sent to the Datadog intake. However, sending large volumes of data
      can still impact the performance for users on slow internet connections.
    </p>
    <p>
      For the best user experience, Datadog recommends keeping the size of the
      global context, user information, and feature flags below 3KiB. If the
      data exceeds this limit, a warning is displayed:
      <code>The data exceeds the recommended 3KiB threshold.</code>
    </p>
    <p>
      Since v5.3.0, the RUM Browser SDK supports data compression via the
      <code>compressIntakeRequest</code> [initialization parameter][13]. When
      enabled, this recommended limit is extended from 3KiB to 16KiB.
    </p>
    <h2 id="cross-origin-read-blocking-warning">
      Cross origin read blocking warning
    </h2>
    <p>
      On Chromium-based browsers, when the RUM Browser SDK sends data to the
      Datadog intake, a CORB warning is printed in the console:
      <code
        >Cross-Origin Read Blocking (CORB) blocked cross-origin response</code
      >.
    </p>
    <p>
      The warning is shown because the intake returns a non-empty JSON object.
      This behavior is a reported [Chromium issue][8]. It does not impact the
      RUM Browser SDK and can safely be ignored.
    </p>
    <h2 id="deobfuscation-failed-warning">
      &quot;Deobfuscation failed&quot; warning
    </h2>
    <p>
      A warning appears when deobfuscation fails for a stack trace. If the stack
      trace is not obfuscated to begin with, you can ignore this warning.
      Otherwise, use the [RUM Debug Symbols page][14] to view all your uploaded
      source maps. See [Investigate Obfuscated Stack Traces with RUM Debug
      Symbols][15].
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="9">
    <h2 id="check-if-datadog-rum-is-initialized">
      Check if Datadog RUM is initialized
    </h2>
    <p>
      Use the utility method <code>isInitialized</code> to check if the SDK is
      properly initialized:
    </p>
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
          ><code><span class="line"><span class="cl"><span class="k">if</span> <span class="p">(</span><span class="nc">Datadog</span><span class="p">.</span><span class="n">isInitialized</span><span class="p">())</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// your code here
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="debugging">Debugging</h2>
    <p>
      When writing your application, you can enable development logs by calling
      the <code>setVerbosity</code> method. All internal messages in the library
      with a priority equal to or higher than the provided level are then logged
      to Android's Logcat:
    </p>
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
          ><code><span class="line"><span class="cl"><span class="nc">Datadog</span><span class="p">.</span><span class="n">setVerbosity</span><span class="p">(</span><span class="nc">Log</span><span class="p">.</span><span class="n">INFO</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="migrating-to-200">Migrating to 2.0.0</h2>
    <p>
      If you've been using the SDK v1, there are some breaking changes
      introduced in version <code>2.0.0</code>. See the [migration guide][2] for
      more information.
    </p>
    <h2 id="deobfuscation-failed-warning">
      &quot;Deobfuscation failed&quot; warning
    </h2>
    <p>
      A warning appears when deobfuscation fails for a stack trace. If the stack
      trace is not obfuscated to begin with, you can ignore this warning.
      Otherwise, use the [RUM Debug Symbols page][3] to view all your uploaded
      mapping files. See [Investigate Obfuscated Stack Traces with RUM Debug
      Symbols][4].
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="10">
    <h2 id="check-if-datadog-sdk-is-properly-initialized">
      Check if Datadog SDK is properly initialized
    </h2>
    <p>
      After you configure Datadog SDK and run the app for the first time, check
      your debugger console in Xcode. The SDK implements several consistency
      checks and outputs relevant warnings if something is misconfigured.
    </p>
    <h2 id="debugging">Debugging</h2>
    <p>
      When writing your application, you can enable development logs by setting
      the <code>verbosityLevel</code> value. Relevant messages from the SDK with
      a priority equal to or higher than the provided level are output to the
      debugger console in Xcode:
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
          ><code><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">verbosityLevel</span> <span class="p">=</span> <span class="p">.</span><span class="n">debug</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      You should then see an output similar to the below, indicating that a
      batch of RUM data was properly uploaded:
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
          ><code><span class="line"><span class="cl">[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
</span></span><span class="line"><span class="cl">[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won&#39;t be retransmitted: success
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      <strong>Recommendation:</strong> Use
      <code>Datadog.verbosityLevel</code> in the
      <code>DEBUG</code> configuration, and unset it in <code>RELEASE</code>.
    </p>
    <h2 id="deobfuscation-failed-warning">
      &quot;Deobfuscation failed&quot; warning
    </h2>
    <p>
      A warning appears when deobfuscation fails for a stack trace. If the stack
      trace is not deobfuscated to begin with, you can ignore this warning.
      Otherwise, use the [RUM Debug Symbols page][4] to view all your uploaded
      dSYMs. See [Investigate Obfuscated Stack Traces with RUM Debug
      Symbols][5].
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="11">
    <h2 id="duplicate-interface--ios">Duplicate interface (iOS)</h2>
    <p>
      If you see this error while building iOS after upgrading to
      <code>datadog_flutter_plugin</code> v2.0:
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
          ><code><span class="line"><span class="cl">Semantic Issue (Xcode): Duplicate interface definition for class &#39;DatadogSdkPlugin&#39;
</span></span><span class="line"><span class="cl">/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Try performing <code>flutter clean</code> &amp;&amp;
      <code>flutter pub get</code> and rebuilding. This usually resolves the
      issue.
    </p>
    <h2 id="duplicate-classes--android">Duplicate classes (Android)</h2>
    <p>
      If you see this error while building Android after the upgrading to
      <code>datadog_flutter_plugin</code> v2.0:
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
          ><code><span class="line"><span class="cl">FAILURE: Build failed with an exception.
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">* What went wrong:
</span></span><span class="line"><span class="cl">Execution failed for task &#39;:app:checkDebugDuplicateClasses&#39;.
</span></span><span class="line"><span class="cl">&gt; A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Make sure that you've updated your version of Kotlin to at least 1.8 in
      your <code>build.gradle</code> file.
    </p>
    <h2 id="cocoapods-issues">Cocoapods issues</h2>
    <p>
      If you have trouble building your iOS application after adding the Datadog
      SDK because of errors being thrown by Cocoapods, check which error you are
      getting. The most common error is an issue getting the most up-to-date
      native library from Cocoapods, which can be solved by running the
      following in your <code>ios</code> directory:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-bash">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">pod install --repo-update
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Another common error is an issue loading the FFI library on Apple Silicon
      Macs. If you see an error similar to the following:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-bash">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">LoadError - dlsym<span class="o">(</span>0x7fbbeb6837d0, Init_ffi_c<span class="o">)</span>: symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
</span></span><span class="line"><span class="cl">/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in <span class="sb">`</span>require<span class="s1">&#39;
</span></span></span><span class="line"><span class="cl"><span class="s1">/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require&#39;</span>
</span></span><span class="line"><span class="cl">/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in <span class="sb">`</span>rescue in &lt;top <span class="o">(</span>required<span class="o">)</span>&gt;<span class="s1">&#39;
</span></span></span><span class="line"><span class="cl"><span class="s1">/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `&lt;top (required)&gt;&#39;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Follow the instructions in the [Flutter documentation][2] for working with
      Flutter on Apple Silicon.
    </p>
    <h2 id="undefined-symbol--ios">Undefined symbol (iOS)</h2>
    <p>
      If you use Flutter's <code>build ios-framework</code> command, you may see
      errors similar to the following:
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
          ><code><span class="line"><span class="cl">Undefined symbol: _OBJC_CLASS_$_PLCrashReport
</span></span><span class="line"><span class="cl">Undefined symbol: _OBJC_CLASS_$_PLCrashReportBinaryImageInfo
</span></span><span class="line"><span class="cl">Undefined symbol: _OBJC_CLASS_$_PLCrashReportStackFrameInfo
</span></span><span class="line"><span class="cl">...
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      This occurs because the <code>build ios-framework</code> command does not
      properly include PLCrashReporter, which the Datadog Flutter SDK depends
      on. To resolve this issue, Datadog recommends manually including the
      PLCrashReporter dependency. The framework and instructions for including
      it are available on its [GitHub page][8].
    </p>
    <h2 id="set-sdkverbosity">Set sdkVerbosity</h2>
    <p>
      If you're able to run your app, but you are not seeing the data you expect
      on the Datadog site, try adding the following to your code before calling
      <code>DatadogSdk.initialize</code>:
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
    <p>
      This causes the SDK to output additional information about what it's doing
      and what errors it's encountering, which may help you and Datadog Support
      narrow down your issue.
    </p>
    <h2 id="not-seeing-errors">Not seeing Errors</h2>
    <p>
      If you do not see any errors in RUM, it's likely no view has been started.
      Make sure you have started a view with
      <code>DatadogSdk.instance.rum?.startView</code> or, if you are using
      <code>DatadogRouteObserver</code> make sure your current Route has a name.
    </p>
    <h2 id="issues-with-automatic-resource-tracking-and-distributed-tracing">
      Issues with automatic resource tracking and distributed tracing
    </h2>
    <p>
      The [Datadog tracking HTTP client][3] package works with most common
      Flutter networking packages that rely on <code>dart:io</code>, including
      [<code>http</code>][4] and [<code>Dio</code>][5].
    </p>
    <p>
      If you are seeing resources in your RUM Sessions, then the tracking HTTP
      client is working, but other steps may be required to use distributed
      tracing.
    </p>
    <p>
      By default, the Datadog RUM Flutter SDK samples distributed traces at only
      20% of resource requests. While determining if there is an issue with your
      setup, you should set this value to 100% of traces by modifying your
      initialization with the following lines:
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
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DdSdkConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">   <span class="c1">//
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>   <span class="nl">rumConfiguration:</span> <span class="n">DatadogRumConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="nl">applicationId:</span> <span class="s1">&#39;&lt;RUM_APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nl">tracingSamplingRate:</span> <span class="m">100.0</span>
</span></span><span class="line"><span class="cl">   <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      If you are still having issues, check that your
      <code>firstPartyHosts</code> property is set correctly. These should be
      hosts only, without schemas or paths, and they do not support regular
      expressions or wildcards. For example:
    </p>
    <p>
      ✅ Good - 'example.com', 'api.example.com', 'us1.api.sample.com' ❌ Bad -
      'https://example.com', '<em>.example.com', 'us1.sample.com/api/</em>',
      'api.sample.com/api'
    </p>
    <h2 id="deobfuscation-failed-warning">
      &quot;Deobfuscation failed&quot; warning
    </h2>
    <p>
      A warning appears when deobfuscation fails for a stack trace. If the stack
      trace is not obfuscated to begin with, you can ignore this warning.
      Otherwise, use the [RUM Debug Symbols page][6] to view all your uploaded
      symbol files, dSYMs, and mapping files. See [Investigate Obfuscated Stack
      Traces with RUM Debug Symbols][7].
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="12">
    <h2 id="check-if-datadog-rum-is-initialized">
      Check if Datadog RUM is initialized
    </h2>
    <p>
      Use the utility method <code>isInitialized</code> to check if the SDK is
      properly initialized:
    </p>
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
          ><code><span class="line"><span class="cl"><span class="k">if</span> <span class="p">(</span><span class="nc">Datadog</span><span class="p">.</span><span class="n">isInitialized</span><span class="p">())</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// your code here
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="debugging">Debugging</h2>
    <p>
      When writing your application, you can enable development logs by calling
      the <code>setVerbosity</code> method. All internal messages in the library
      with a priority equal to or higher than the provided level are then logged
      either to Android's Logcat or to the debugger console in Xcode:
    </p>
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
          ><code><span class="line"><span class="cl"><span class="nc">Datadog</span><span class="p">.</span><span class="n">setVerbosity</span><span class="p">(</span><span class="nc">SdkLogVerbosity</span><span class="p">.</span><span class="n">DEBUG</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="set-tracking-consent--gdpr-compliance">
      Set tracking consent (GDPR compliance)
    </h2>
    <p>
      To be compliant with GDPR, the SDK requires the tracking consent value at
      initialization. Tracking consent can be one of the following values:
    </p>
    <ul>
      <li>
        <code>TrackingConsent.PENDING</code>: (Default) The SDK starts
        collecting and batching the data but does not send it to the collection
        endpoint. The SDK waits for the new tracking consent value to decide
        what to do with the batched data.
      </li>
      <li>
        <code>TrackingConsent.GRANTED</code>: The SDK starts collecting the data
        and sends it to the data collection endpoint.
      </li>
      <li>
        <code>TrackingConsent.NOT_GRANTED</code>: The SDK does not collect any
        data. You are not able to manually send any logs, traces, or RUM events.
      </li>
    </ul>
    <p>
      To update the tracking consent after the SDK is initialized, call
      <code>Datadog.setTrackingConsent(&lt;NEW CONSENT&gt;)</code>. The SDK
      changes its behavior according to the new consent. For example, if the
      current tracking consent is <code>TrackingConsent.PENDING</code> and you
      update it to:
    </p>
    <ul>
      <li>
        <code>TrackingConsent.GRANTED</code>: The SDK sends all current batched
        data and future data directly to the data collection endpoint.
      </li>
      <li>
        <code>TrackingConsent.NOT_GRANTED</code>: The SDK wipes all batched data
        and does not collect any future data.
      </li>
    </ul>
    <h2 id="common-problems">Common problems</h2>
    <h3 id="ios-binary-linking">iOS binary linking</h3>
    <h4 id="missing-">Missing <code>PLCrashReporter</code> symbols</h4>
    <p>
      If there is an error during the linking step about missing
      <code>PLCrashReporter</code> symbols in the linker search paths, like the
      following:
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
          ><code><span class="line"><span class="cl">Undefined symbols for architecture arm64:
</span></span><span class="line"><span class="cl">  &#34;_OBJC_CLASS_$_PLCrashReport&#34;, referenced from:
</span></span><span class="line"><span class="cl">       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
</span></span><span class="line"><span class="cl">  &#34;_OBJC_CLASS_$_PLCrashReportBinaryImageInfo&#34;, referenced from:
</span></span><span class="line"><span class="cl">       in DatadogCrashReporting[arm64][7](CrashReport.o)
</span></span><span class="line"><span class="cl">  &#34;_OBJC_CLASS_$_PLCrashReportStackFrameInfo&#34;, referenced from:
</span></span><span class="line"><span class="cl">       in DatadogCrashReporting[arm64][7](CrashReport.o)
</span></span><span class="line"><span class="cl">  &#34;_OBJC_CLASS_$_PLCrashReportThreadInfo&#34;, referenced from:
</span></span><span class="line"><span class="cl">       in DatadogCrashReporting[arm64][7](CrashReport.o)
</span></span><span class="line"><span class="cl">  &#34;_OBJC_CLASS_$_PLCrashReporter&#34;, referenced from:
</span></span><span class="line"><span class="cl">       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
</span></span><span class="line"><span class="cl">  &#34;_OBJC_CLASS_$_PLCrashReporterConfig&#34;, referenced from:
</span></span><span class="line"><span class="cl">       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Then you need to explicitly pass the <code>CrashReporter</code> framework
      name to the linker:
    </p>
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
          ><code><span class="line"><span class="cl"><span class="n">targets</span><span class="p">.</span><span class="n">withType</span><span class="p">(</span><span class="n">KotlinNativeTarget</span><span class="o">::</span><span class="k">class</span><span class="p">.</span><span class="n">java</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">   <span class="n">compilations</span><span class="p">.</span><span class="n">getByName</span><span class="p">(</span><span class="s2">&#34;main&#34;</span><span class="p">).</span><span class="n">compileTaskProvider</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">       <span class="n">compilerOptions</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">           <span class="n">freeCompilerArgs</span><span class="p">.</span><span class="n">addAll</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">               <span class="n">listOf</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                  <span class="s2">&#34;-linker-option&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                  <span class="s2">&#34;-framework CrashReporter&#34;</span>
</span></span><span class="line"><span class="cl">               <span class="p">)</span>
</span></span><span class="line"><span class="cl">           <span class="p">)</span>
</span></span><span class="line"><span class="cl">       <span class="p">}</span>
</span></span><span class="line"><span class="cl">   <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="missing-">Missing <code>swiftCompatibility</code> symbols</h4>
    <p>
      If there is an error during the linking step about missing
      <code>swiftCompatibility</code> symbols in the linker search paths, like
      the following:
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
          ><code><span class="line"><span class="cl">Undefined symbols for architecture arm64:
</span></span><span class="line"><span class="cl">  &#34;__swift_FORCE_LOAD_$_swiftCompatibility56&#34;, referenced from:
</span></span><span class="line"><span class="cl">      __swift_FORCE_LOAD_$_swiftCompatibility56_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
</span></span><span class="line"><span class="cl">  &#34;__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency&#34;, referenced from:
</span></span><span class="line"><span class="cl">      __swift_FORCE_LOAD_$_swiftCompatibilityConcurrency_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>Then you can suppress this error:</p>
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
          ><code><span class="line"><span class="cl"><span class="n">targets</span><span class="p">.</span><span class="n">withType</span><span class="p">(</span><span class="n">KotlinNativeTarget</span><span class="o">::</span><span class="k">class</span><span class="p">.</span><span class="n">java</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">   <span class="n">compilations</span><span class="p">.</span><span class="n">getByName</span><span class="p">(</span><span class="s2">&#34;main&#34;</span><span class="p">).</span><span class="n">compileTaskProvider</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">       <span class="n">compilerOptions</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">           <span class="n">freeCompilerArgs</span><span class="p">.</span><span class="n">addAll</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">               <span class="n">listOf</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                  <span class="s2">&#34;-linker-option&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                  <span class="s2">&#34;-U __swift_FORCE_LOAD_</span><span class="se">\$</span><span class="s2">_swiftCompatibility56&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                  <span class="s2">&#34;-linker-option&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                  <span class="s2">&#34;-U __swift_FORCE_LOAD_</span><span class="se">\$</span><span class="s2">_swiftCompatibilityConcurrency&#34;</span>
</span></span><span class="line"><span class="cl">               <span class="p">)</span>
</span></span><span class="line"><span class="cl">           <span class="p">)</span>
</span></span><span class="line"><span class="cl">       <span class="p">}</span>
</span></span><span class="line"><span class="cl">   <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="13">
    <h2 id="no-data-is-being-sent-to-datadog">
      No data is being sent to Datadog
    </h2>
    <p>
      Follow these instructions in order when the SDK has been installed and the
      app compiles, but no data is received by Datadog.
    </p>
    <h3 id="check-the-configuration">Check the configuration</h3>
    <p>
      Sometimes, no data is sent due to a small misstep in the configuration.
    </p>
    <p>Here are some common things to check for:</p>
    <ul>
      <li>
        Ensure your <code>clientToken</code> and <code>applicationId</code> are
        correct.
      </li>
      <li>
        Make sure you have not set <code>sessionSamplingRate</code> to something
        other than 100 (100 is the default value), or else your session might
        not be sent.
      </li>
      <li>
        If you've set up a <code>Proxy</code> in the Datadog configuration,
        check that it has been correctly configured.
      </li>
      <li>
        Check that you are <strong>tracking views</strong> (all events must be
        attached to a view) and <strong>sending events</strong>.
      </li>
    </ul>
    <h3 id="review-sdk-logs-in-react-native">
      Review SDK logs in React Native
    </h3>
    <ul>
      <li>
        <p>
          Set <code>config.verbosity = SdkVerbosity.DEBUG</code>, which imports
          <code>SdkVerbosity</code> from
          <code>@datadog/mobile-react-native</code>.
        </p>
      </li>
      <li>
        <p>
          Logs start appearing in the JavaScript console, like the following
          output:
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
              ><code><span class="line"><span class="cl">INFO  DATADOG: Datadog SDK was initialized
</span></span><span class="line"><span class="cl">INFO  DATADOG: Datadog SDK is tracking interactions
</span></span><span class="line"><span class="cl">INFO  DATADOG: Datadog SDK is tracking XHR resources
</span></span><span class="line"><span class="cl">INFO  DATADOG: Datadog SDK is tracking errors
</span></span><span class="line"><span class="cl">DEBUG  DATADOG: Starting RUM View &#34;Products&#34; #Products-oaZlP_FVwGM5vtPoup_rT
</span></span><span class="line"><span class="cl">DEBUG  DATADOG: Adding RUM Action &#34;RCTView&#34; (TAP)
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>
          <strong>Note</strong>: In this example, the first four logs indicate
          that the SDK has been correctly configured and the last two lines are
          events that were sent.
        </p>
      </li>
    </ul>
    <h4 id="possible-cause">Possible cause</h4>
    <p>
      If you are on iOS and see some DEBUG logs indicating that logs or RUM
      events were sent <strong>before</strong> the initialization logs, this may
      be why the SDK is not sending events.
    </p>
    <p>
      You cannot send events before initialization, and attempting to do so puts
      the SDK in a state where it cannot send any data.
    </p>
    <h4 id="solution">Solution</h4>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="ddsdkreactnativeinitialize"
          class="tab-pane fade"
          role="tabpanel"
          title="DdSdkReactNative.initialize"
        >
          <p>
            If you use <code>DdSdkReactNative.initialize</code> to start the
            Datadog SDK, call this function in your top-level
            <code>index.js</code> file so that the SDK is initialized before
            your other events are sent.
          </p>
        </div>
        <div
          data-lang="datadogprovider"
          class="tab-pane fade"
          role="tabpanel"
          title="DatadogProvider"
        >
          <p>
            Starting from SDK version <code>1.2.0</code>, you can initialize the
            SDK using the <code>DatadogProvider</code> component. This component
            includes a RUM events buffer that makes sure the SDK is initialized
            before sending any data to Datadog, which prevents this issue from
            happening.
          </p>
          <p>
            To use it, see the
            <a
              href="https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md"
              >Migrate to the Datadog Provider guide</a
            >.
          </p>
        </div>
      </div>
    </div>
    <h3 id="review-native-logs">Review native logs</h3>
    <p>
      Reviewing native logs can give you more input on what could be going
      wrong.
    </p>
    <h4 id="on-ios">On iOS</h4>
    <ul>
      <li>Open your project in Xcode by running <code>xed ios</code>.</li>
      <li>Build your project for a simulator or a device.</li>
      <li>Native logs start appearing on the bottom right corner:</li>
    </ul>
    <a
      href="http://localhost:1313/images/real_user_monitoring/react_native/troubleshooting-xcode-logs.ed0ac40a5abf1c32d7b0b10893ae9feb.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/react_native/troubleshooting-xcode-logs.ed0ac40a5abf1c32d7b0b10893ae9feb.png?auto=format
              "
              class="img-fluid"
              alt="Reviewing native logs can help you figure out why no data is being sent"
          /></picture>
        </figure></div
    ></a>
    <p>You can filter logs by &quot;DATADOG&quot; and look for any error.</p>
    <p>If you are indeed sending events, you should see the following logs:</p>
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
          ><code><span class="line"><span class="cl">[DATADOG SDK] 🐶 → 10:02:47.398 [DEBUG] ⏳ (rum) Uploading batch...
</span></span><span class="line"><span class="cl">[DATADOG SDK] 🐶 → 10:02:47.538 [DEBUG]    → (rum) accepted, won&#39;t be retransmitted: [response code: 202 (accepted), request ID: AAAABBBB-1111-2222-3333-777788883333]
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      The first log indicates that some data is being sent, and the second log
      indicates that the data has been received.
    </p>
    <h5 id="possible-cause">Possible cause</h5>
    <p>
      If you see the log below, it means that you have called a RUM method
      before initializing the SDK.
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
          ><code><span class="line"><span class="cl">[DATADOG SDK] 🐶 → 10:09:13.621 [WARN] The `Global.rum` was called but no `RUMMonitor` is registered. Configure and register the RUM Monitor globally before invoking the feature:
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h5 id="solution">Solution</h5>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="ddsdkreactnativeinitialize"
          class="tab-pane fade"
          role="tabpanel"
          title="DdSdkReactNative.initialize"
        >
          <p>
            If you use <code>DdSdkReactNative.initialize</code> to start the
            Datadog SDK, call this function in your top-level
            <code>index.js</code> file so the SDK is initialized before your
            other events are sent.
          </p>
        </div>
        <div
          data-lang="datadogprovider"
          class="tab-pane fade"
          role="tabpanel"
          title="DatadogProvider"
        >
          <p>
            Starting from SDK version <code>1.2.0</code>, you can initialize the
            SDK using the <code>DatadogProvider</code> component. This component
            includes a RUM events buffer that makes sure the SDK is initialized
            before sending any data to Datadog, which prevents this issue from
            happening.
          </p>
          <p>
            To use it, see the
            <a
              href="https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md"
              >Migrate to the Datadog Provider guide</a
            >.
          </p>
        </div>
      </div>
    </div>
    <h4 id="on-android">On Android</h4>
    <ul>
      <li>
        <p>
          For a better debugging experience, Datadog recommends installing
          [pidcat][2].
        </p>
        <ul>
          <li>
            pidcat filters the device logs (obtained by <code>adb logcat</code>)
            to only show the one from your application.
          </li>
          <li>See [this issue][3] for M1 users who don't have Python 2.</li>
        </ul>
      </li>
      <li>
        <p>
          Modify
          <code
            >node_modules/@datadog/mobile-react-native/android/src/main/kotlin/com/datadog/reactnative/DdSdk.kt</code
          >
          to enable verbose logging from the native SDK:
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
              ><code><span class="line"><span class="cl"><span class="n">fun</span> <span class="nf">initialize</span><span class="o">(</span><span class="n">configuration</span><span class="o">:</span> <span class="n">ReadableMap</span><span class="o">,</span> <span class="n">promise</span><span class="o">:</span> <span class="n">Promise</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">    <span class="n">datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="n">appContext</span><span class="o">,</span> <span class="n">credentials</span><span class="o">,</span> <span class="n">nativeConfiguration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">datadog</span><span class="o">.</span><span class="na">setVerbosity</span><span class="o">(</span><span class="n">Log</span><span class="o">.</span><span class="na">VERBOSE</span><span class="o">)</span> <span class="c1">// Add this line
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          Run the app on a phone connected in debug mode to your laptop (should
          appear when running <code>adb devices</code>), or from an emulator.
        </p>
      </li>
      <li>
        <p>
          Run pidcat <code>my.app.package.name</code> or
          <code>adb logcat</code> from your laptop.
        </p>
      </li>
      <li><p>Look for any error mentioning Datadog.</p></li>
    </ul>
    <p>Pidcat output looks like this:</p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/react_native/troubleshooting-pidcat-logs.88d8e7bd2dd8c472190db485417cb9bd.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/react_native/troubleshooting-pidcat-logs.88d8e7bd2dd8c472190db485417cb9bd.png?auto=format
              "
              class="img-fluid"
              alt="This is an example of a pidcat output"
          /></picture>
        </figure></div
    ></a>
    <p>
      In this example, the last log indicates that the batch of RUM data was
      sent successfully.
    </p>
    <h2 id="undefined-symbols-swift">Undefined symbols: Swift</h2>
    <p>If you see the following error message:</p>
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
          ><code><span class="line"><span class="cl">Undefined symbols for architecture x86_64:
</span></span><span class="line"><span class="cl">  &#34;static Foundation.JSONEncoder.OutputFormatting.withoutEscapingSlashes.getter : Foundation.JSONEncoder.OutputFormatting&#34;, referenced from:
</span></span><span class="line"><span class="cl">      static (extension in Datadog):Foundation.JSONEncoder.default() -&gt; Foundation.JSONEncoder in libDatadogSDK.a(JSONEncoder.o)
</span></span><span class="line"><span class="cl">...
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Open Xcode, go to the <code>Build Settings</code> of your project (not
      your app target), and make sure Library Search Paths have the following
      settings:
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
          ><code><span class="line"><span class="cl"><span class="nv">LIBRARY_SEARCH_PATHS</span> <span class="o">=</span> <span class="o">(</span>
</span></span><span class="line"><span class="cl">  <span class="s2">&#34;\&#34;</span><span class="k">$(</span>TOOLCHAIN_DIR<span class="k">)</span><span class="s2">/usr/lib/swift/</span><span class="k">$(</span>PLATFORM_NAME<span class="k">)</span><span class="s2">\&#34;&#34;</span>,
</span></span><span class="line"><span class="cl">  <span class="s2">&#34;\&#34;/usr/lib/swift\&#34;&#34;</span>,
</span></span><span class="line"><span class="cl">  <span class="s2">&#34;\&#34;</span><span class="k">$(</span>inherited<span class="k">)</span><span class="s2">\&#34;&#34;</span>,
</span></span><span class="line"><span class="cl"><span class="o">)</span><span class="p">;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="undefined-symbols--rctmodule">Undefined symbols: _RCTModule</h2>
    <p>
      If you see an undefined _RCTModule symbol, it may be related to this
      change in the [react-native v0.63 changelog][4].
    </p>
    <p>You can make the following change to fix it:</p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-objectivec">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="c1">// DdSdk.m
</span></span></span><span class="line"><span class="cl"><span class="c1">// instead of
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="cp">#import &lt;React/RCTBridgeModule.h&gt;
</span></span></span><span class="line"><span class="cl"><span class="cp"></span><span class="c1">// maybe that:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">@</span><span class="n">import</span> <span class="n">React</span> <span class="c1">// or @import React-Core
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="infinite-loop-like-error-messages">
      Infinite loop-like error messages
    </h2>
    <p>
      If you run into an [issue where your React Native project displays a
      stream of error messages and significantly raises your CPU usage][5], try
      creating a new React Native project.
    </p>
    <h2 id="android-build-failures-with-sdk-version-2">
      Android build failures with SDK version 2.*
    </h2>
    <h3
      id="unable-to-make-field-private-final-javalangstring-javaiofilepath-accessible"
    >
      Unable to make field private final java.lang.String java.io.File.path
      accessible
    </h3>
    <p>If your Android build fails with an error like:</p>
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
          ><code><span class="line"><span class="cl">FAILURE: Build failed with an exception.
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">* What went wrong:
</span></span><span class="line"><span class="cl">Execution failed for task &#39;:app:processReleaseMainManifest&#39;.
</span></span><span class="line"><span class="cl">&gt; Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not &#34;opens java.io&#34; to unnamed module @1bbf7f0e
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      You are using Java 17, which is not compatible with your React Native
      version. Switch to Java 11 to solve the issue.
    </p>
    <h3 id="javalangunsupportedclassversionerror">
      java.lang.UnsupportedClassVersionError
    </h3>
    <p>If your Android build fails with an error like:</p>
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
          ><code><span class="line"><span class="cl">java.lang.UnsupportedClassVersionError: com/datadog/android/lint/DatadogIssueRegistry has been compiled by a more recent version of the Java Runtime (class file version 61.0), this version of the Java Runtime only recognizes class file versions up to 55.0
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      You are using a version of Java that is too old. Switch to Java 17 to
      solve the issue.
    </p>
    <h3 id="unsupported-class-file-major-version-61">
      Unsupported class file major version 61
    </h3>
    <p>If your Android build fails with an error like:</p>
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
          ><code><span class="line"><span class="cl">FAILURE: Build failed with an exception.
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">* What went wrong:
</span></span><span class="line"><span class="cl">Could not determine the dependencies of task &#39;:app:lintVitalRelease&#39;.
</span></span><span class="line"><span class="cl">&gt; Could not resolve all artifacts for configuration &#39;:app:debugRuntimeClasspath&#39;.
</span></span><span class="line"><span class="cl">   &gt; Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
</span></span><span class="line"><span class="cl">      &gt; Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
</span></span><span class="line"><span class="cl">         &gt; Failed to transform &#39;/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar&#39; using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      You are using a version of Android Gradle Plugin below <code>5.0</code>.
      To fix the issue, add in your <code>android/gradle.properties</code> file:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-properties">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="na">android.jetifier.ignorelist</span><span class="o">=</span><span class="s">dd-sdk-android-core</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="duplicate-class-kotlincollectionsjdk8">
      Duplicate class kotlin.collections.jdk8.*
    </h3>
    <p>If your Android build fails with an error like:</p>
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
          ><code><span class="line"><span class="cl">FAILURE: Build failed with an exception.
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">* What went wrong:
</span></span><span class="line"><span class="cl">Execution failed for task &#39;:app:checkReleaseDuplicateClasses&#39;.
</span></span><span class="line"><span class="cl">&gt; A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
</span></span><span class="line"><span class="cl">   &gt; Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
</span></span><span class="line"><span class="cl">     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      You need to set a Kotlin version for your project to avoid clashes among
      Kotlin dependencies. In your <code>android/build.gradle</code> file,
      specify the <code>kotlinVersion</code>:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-groovy">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">buildscript</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">ext</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// targetSdkVersion = ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="n">kotlinVersion</span> <span class="o">=</span> <span class="s2">&#34;1.8.21&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Alternatively, you can add the following rules to your build script in
      your <code>android/app/build.gradle</code> file:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-groovy">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">dependencies</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">constraints</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">implementation</span><span class="o">(</span><span class="s2">&#34;org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.21&#34;</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">because</span><span class="o">(</span><span class="s2">&#34;kotlin-stdlib-jdk7 is now a part of kotlin-stdlib&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span>
</span></span><span class="line"><span class="cl">        <span class="n">implementation</span><span class="o">(</span><span class="s2">&#34;org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.21&#34;</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">because</span><span class="o">(</span><span class="s2">&#34;kotlin-stdlib-jdk8 is now a part of kotlin-stdlib&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">        <span class="o">}</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="deobfuscation-failed-warning">
      &quot;Deobfuscation failed&quot; warning
    </h2>
    <p>
      A warning appears when deobfuscation fails for a stack trace. If the stack
      trace is not obfuscated to begin with, you can ignore this warning.
      Otherwise, use the [RUM Debug Symbols page][6] to view all your uploaded
      source maps, dSYMs, and mapping files. See [Investigate Obfuscated Stack
      Traces with RUM Debug Symbols][7].
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="14">
    <h2 id="set-sdkverbosity-for-easier-debugging">
      Set sdkVerbosity for easier debugging
    </h2>
    <p>
      If you're able to run your app, but you are not seeing the data you expect
      on the Datadog site, try adding the following to your code as part of
      initialization:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-csharp">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">SetSdkVerbosity</span><span class="p">(</span><span class="n">CoreLoggerLevel</span><span class="p">.</span><span class="n">Debug</span><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      This causes the SDK to output additional information about what it's doing
      and what errors it's encountering, which may help you and Datadog Support
      narrow down your issue.
    </p>
    <h2 id="the-sdk-is-not-sending-data">The SDK is not sending data</h2>
    <div class="alert alert-info">
      <p>
        Datadog does not support sending data from the Unity Editor, only from
        iOS and Android simulators, emulators, and devices.
      </p>
    </div>
    <p>If you're not seeing any data in Datadog:</p>
    <ol>
      <li>
        Make sure you are running your app on an iOS or Android simulator,
        emulator, or device, and not from the editor.
      </li>
      <li>
        Check that you have set the <code>TrackingConsent</code> as part of your
        initialization. Tracking consent is set to
        <code>TrackingConsent.Pending</code> during initialization, and needs to
        be set to <code>TrackingConsent.Granted</code> before Datadog sends any
        information.
      </li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-csharp">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">SetTrackingConsent</span><span class="p">(</span><span class="n">TrackingConsent</span><span class="p">.</span><span class="n">Granted</span><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"8":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"8"},"9":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"android"},"v":false,"r":"9"},"10":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"ios"},"v":false,"r":"10"},"11":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"flutter"},"v":false,"r":"11"},"12":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"kotlin_multiplatform"},"v":false,"r":"12"},"13":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"react_native"},"v":false,"r":"13"},"14":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"unity"},"v":false,"r":"14"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_sdk_platform_options","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_platform_options":"browser"}}},"defaultValsByTraitId":{"platform":"browser"},"optionGroupsById":{"rum_sdk_platform_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"react_native","label":"React Native"},{"id":"flutter","label":"Flutter"},{"id":"roku","label":"Roku"},{"id":"kotlin_multiplatform","label":"Kotlin Multiplatform"},{"id":"unity","label":"Unity"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/browser/troubleshooting/network_intake-1.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/react_native/troubleshooting-xcode-logs.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/react_native/troubleshooting-pidcat-logs.png" style="display:none;" alt="" >}}

