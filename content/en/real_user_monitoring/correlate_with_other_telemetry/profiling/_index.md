---
title: Connect RUM and Profiling
aliases:
- /real_user_monitoring/connect_rum_and_profiling
- /real_user_monitoring/platform/connect_rum_and_profiling/
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
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Browser profiling example when analyzing an event sample." style="width:100%;" >}}

## Overview

Browser profiling provides visibility into how your application behaves in your users' browsers, helping you to understand root causes behind unresponsive applications (whether unresponsiveness happens at page load, of further down the page's lifecycle). Using profiling data alongside RUM insights enables you to see what code is executed during a [Long Animation Frame (LoAF)][1], understanding how JavaScript execution and rendering tasks affect user-perceived performance.

To get started, ensure browser profiling is enabled in your RUM SDK configuration. When browser profiling is enabled, you can click on a profiled event sample to see a profile section.

## Usage

### Prerequisites
-   Your services use an HTTP server.
-   Your HTTP servers are using [a library that supports profiling](#supported-libraries).

### Setup RUM
1. Set up [RUM Browser Monitoring][2].

2. Initialize the RUM SDK and configure the following initialization parameters:
    - `profilingSampleRate`, which sets the percentage of page navigations that are profiled
    - `enableExperimentalFeatures` initialization parameter which enabled profiling for the app
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      profilingSampleRate: 100,
      enableExperimentalFeatures: ['profiling'], // if not specified, defaults to 100
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

4. Setup Cross-Origin Resource Sharing (CORS) if needed.

    This step is required only if your JavaScript files are served from a different origin. For example, an HTML document is served from myapp.com, and JavaScript files are served from static.myapp.com. In this case, you must enable CORS; if you do not, your JavaScript files are invisible for the profiler. By default, your browser loads JavaScript in `no-cors` mode. 
    
    To enable CORS:

    - Add crossorigin="anonymous" attribute to `<script/>` tags
    - Ensure that JavaScript response includes the `Access-Control-Allow-Origin: *` HTTP header (or the proper origin value)
    
    ```javascript
    app.get("/", (request, response) => {
        … 
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers",
        …
    });
    ```
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /real_user_monitoring/browser/setup/
