---
title: Browser Profiling
description: "Use browser profiling with RUM to understand JavaScript execution and rendering performance issues affecting user experience."
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/modern-frontend-monitoring/"
    tag: "Blog"
    text: "Start monitoring single-page applications"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
---

{{< callout url="https://www.datadoghq.com/product-preview/browser-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Browser Profiling is in Preview.
{{< /callout >}}

{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Browser profiling example when analyzing an event sample." style="width:100%;" >}}

## Overview

Browser profiling provides visibility into how your application behaves in your users' browsers, helping you to understand root causes behind unresponsive applications (whether unresponsiveness happens at page load, or further down the page's lifecycle). Using profiling data alongside RUM insights enables you to see what code is executed during a [Long Animation Frame (LoAF)][1], understanding how JavaScript execution and rendering tasks affect user-perceived performance.

To get started, ensure browser profiling is enabled in your RUM SDK configuration. When browser profiling is enabled, you can click on a profiled event sample to see a profile section.

## Usage

### Setup RUM

<div class="alert alert-info">Browser SDK version 6.12 or later is required.</div>

1. Set up [RUM Browser Monitoring][2].

2. Initialize the RUM SDK and configure `profilingSampleRate`, which sets the percentage of sessions that are profiled.
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      profilingSampleRate: 25,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

3. Configure your web servers to serve HTML pages with the HTTP response header `Document-Policy: js-profiling`:
    ```javascript
        app.get("/", (request, response) => {
            … 
            response.set("Document-Policy", "js-profiling");
            …
        });
    ```

4. Set up Cross-Origin Resource Sharing (CORS) if needed.

    This step is required only if your JavaScript files are served from a different origin. For example, an HTML document is served from `cdn.com`, and JavaScript files are served from `static.cdn.com`. In this case, you must enable CORS; if you do not, your JavaScript files are invisible for the profiler. By default, your browser loads JavaScript in `no-cors` mode. For more information, see the [Browser profiling and CORS](#cors) section.
    
    To enable CORS:

    - Add a `crossorigin="anonymous"` attribute to `<script/>` tags
    - Ensure that JavaScript response includes the `Access-Control-Allow-Origin: *` HTTP header (or the proper origin value)
    
       ```javascript
       app.get("/", (request, response) => {
           … 
           response.header("Access-Control-Allow-Origin", "*");
           response.header("Access-Control-Allow-Headers",
           …
       });
       ```

{{% collapse-content title="Browser profiling and CORS" level="h4" expanded=false id="cors" %}}
#### Why would I need to set CORS?

If a script's execution or attribution information is to be surfaced in performance entries (and thus captured in browser profiling), the resource (for example, a JavaScript file) needs to be fetched with CORS headers that explicitly allow it to be shared with the origin making the measurement (your application).

To summarize:

- If a script is loaded from a same-origin source, then attribution is allowed, and you can see profiling data attributed to this script.
- If a script is loaded cross-origin _without_ a permissive CORS policy (like `Access-Control-Allow-Origin` allowing the page origin), then attribution is blocked, and you do not see profiling data attributed to this script.

This CORS policy ensures that only scripts explicitly intended to be profiled by other origins can be profiled.

#### How does CORS relate to browser profiling?

When you start Datadog's browser profiler (which uses the [JS Self-Profiling API][3]), the profiler can capture stack traces of JavaScript execution—but it only includes _attribution_ (function names, URLs, etc.) for the following scripts:

- Scripts that have the same origin as the page initiating the profiling
- Cross-origin scripts that explicitly opt-in using CORS

This protects third-party content and users from leaking execution details across security boundaries.

#### Why is the crossorigin="anonymous" attribute needed?

Without the `crossorigin="anonymous"` attribute, the browser does not make a CORS-enabled request for the script. The browser fetches the script without CORS, meaning:

- No CORS policy applies.
- No credentials (cookies, HTTP auth, etc.) are sent.
- The fetched script is not eligible for detailed attribution in performance entries or stack traces. These stack frames are displayed as "(anonymous)" or with no attribution.

To protect cross-origin script privacy, _both_ sides must agree to share information:
- The page must explicitly request a CORS-enabled fetch, with `crossorigin="anonymous"`.
- The server must permit this, with an `Access-Control-Allow-Origin` header in the response.

A script is eligible for attribution in the JS Self-Profiling API only when both of the above conditions are true.

{{% /collapse-content %}}

## Explore Profiling

### Within the Optimization page
The **Optimization page** surfaces profiling data in several contexts:
- In the **Troubleshoot section**, Datadog samples long tasks across multiple views to help you identify your top contributing functions. This overview highlights where your JavaScript execution time is being spent and which functions are most responsible for blocking the main thread.
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" >}}

- Within the **Event Waterfall**, any long task that includes profiling data is marked with a yellow profiling icon. Clicking one of these long task events opens a Long Task view panel, which displays detailed profiling data captured during that execution window. You can use this panel to examine and identify blocking functions and understand how script execution contributes to poor responsiveness.
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.png" alt="Browser profiling event waterfall example within the Optimization page." style="width:100%;" >}}


### Within the Sessions Explorer 
You can also find profiling data when reviewing an individual events within the **Sessions Explorer**. This opens the same Long Task view panel with profiling data, allowing you to inspect what code was executing during that task and how it affected the user’s experience.
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[2]: /real_user_monitoring/application_monitoring/browser/setup/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API

