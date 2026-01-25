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

Browser profiling provides visibility into how your application behaves in your users' browsers, helping you understand root causes behind unresponsive applications at page load or during the page life cycle. Use profiling data alongside RUM insights to identify which code executes during a [Long Animation Frame (LoAF)][1] and how JavaScript execution and rendering tasks impact user-perceived performance.

To get started, enable browser profiling in your RUM SDK configuration. After enabling it, click on a profiled event sample to see detailed profiling data.

## Usage

### Set up RUM

<div class="alert alert-info">Browser SDK version 6.12 or later is required.</div>

1. Set up [RUM Browser Monitoring][2].

2. Initialize the RUM SDK and configure `profilingSampleRate`, which determines the percentage of sessions that are profiled (for example, 25% means profiling runs on 25 out of 100 sessions).
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

      This step is required only if your JavaScript files are served from a different origin than your HTML. For example, if your HTML is served from `cdn.com` and JavaScript files from `static.cdn.com`, you must enable CORS to make JavaScript files visible to the profiler. For more information, see the [Browser profiling and CORS](#cors) section.
    
    To enable CORS:

    - Add a `crossorigin="anonymous"` attribute to `<script/>` tags
    - Make sure that JavaScript response includes the `Access-Control-Allow-Origin: *` HTTP header (or the proper origin value)
    
       ```javascript
       app.get("/", (request, response) => {
           … 
           response.header("Access-Control-Allow-Origin", "*");
           response.header("Access-Control-Allow-Headers",
           …
       });
       ```

{{% collapse-content title="Browser profiling and CORS" level="h4" expanded=false id="cors" %}}
#### Requirements for Cross-Origin Scripts (CORS)

If a script's execution or attribution information is to be surfaced in performance entries (and thus captured in browser profiling), the resource (for example, a JavaScript file) needs to be fetched with CORS headers that explicitly allow it to be shared with the origin making the measurement (your application).

To summarize:

- If a script is loaded from a same-origin source, then attribution is allowed, and you can see profiling data attributed to this script.
- If a script is loaded cross-origin _without_ a permissive CORS policy (like `Access-Control-Allow-Origin` allowing the page origin), then attribution is blocked, and you do not see profiling data attributed to this script.

This CORS policy restricts profiling to only scripts that are explicitly intended to be profiled by other origins.

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

A script is eligible for attribution in the JS Self-Profiling API only when both of these conditions are met.

{{% /collapse-content %}}

## Explore profiling

### Within the Optimization page
The **Optimization page** surfaces profiling data in several contexts:
- In the **Troubleshoot section**, Datadog samples long tasks across multiple views to identify your top contributing functions. Use this overview to find where JavaScript execution time is spent and which functions block the main thread, then optimize those functions to improve responsiveness.
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" >}}

- Within the **Event Waterfall**, any long task that includes profiling data is marked with a yellow profiling icon. Click one of these long task events to open a Long Task view panel with detailed profiling data. Use this panel to identify blocking functions, trace their call stacks, and understand how script execution contributes to poor responsiveness.
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.png" alt="Browser profiling event waterfall example within the Optimization page." style="width:100%;" >}}


### Within the Sessions Explorer 
You can also find profiling data when reviewing individual events within the **Sessions Explorer**. This opens the same Long Task view panel with profiling data, allowing you to inspect what code was executing during that task and how it affected the user's experience.
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[2]: /real_user_monitoring/application_monitoring/browser/setup/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API

