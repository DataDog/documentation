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
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Profling example when digging into an event sample." style="width:100%;" >}}

## Overview

To go beyond core web vitals, you can pair RUM with Browser Profiling for full end-to-end visibility into how your application behaves in users' browsers. While the Optimization page helps you identify what your users are experiencing, the browser profiler helps you understand _why_ those issues are happening. 
With profiling data alongside RUM insights, you can:

- Pinpoint exactly what code was executing during a given Long Animation Frame (LoAF)
- Understand how JavaScript execution and rendering tasks affect user-perceived performance
- Diagnose unresponsive moments on the page that may not be tied to loading issues
- Identify inefficient rendering that slow down page responsiveness after the initial load

This deeper insight accelerates root cause analysis, eliminates the guesswork of reproducing issues, and helps prioritize the right frontend optimizations with confidence.

To get started, ensure browser profiling is enabled in your RUM SDK configuration. When browser profiling is enabled, you can click on a profiled event sample to see a profile section.

## Usage

### Prerequisites
-   Your services use an HTTP server.
-   Your HTTP servers are using [a library that supports profiling](#supported-libraries).

### Setup RUM
1. Set up [RUM Browser Monitoring][2].

2. Initialize the RUM SDK. Configure the following:
    - `profilingSampleRate` initialization parameter which sets the percentage of page navigations that will get profiled.
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

3. Configure your web servers to serve HTML page with the following HTTP Response Header: `Document-Policy: js-profiling`
    ```javascript
        app.get("/", (request, response) => {
            … 
            response.set("Document-Policy", "js-profiling");
            …
        });
    ```

4. Setup CORS script loading if needed

    This step is required only if your JavaScript files are served from a different origin. For example, an HTML document is served from myapp.com, and JavaScript files are served from static.myapp.com. If that's the case, you have to use cors script loading; otherwise, these JavaScript files will be invisible for the profiler. By default, your browser loads JavaScript in no-cors mode. 
    
    To opt-in for cors mode, you have to:

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
