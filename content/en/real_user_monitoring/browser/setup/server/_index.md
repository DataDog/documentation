---
title: Browser Monitoring Server-Side (Auto) Instrumentation
beta: true
type: multi-code-lang
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

Datadog RUM Server-Side Instrumentation (Auto-Instrumentation) lets you opt into Real User Monitoring (RUM) automatically by instrumenting web applications served through a web server or proxy.

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served.

After your applications have been instrumented, you can configure your RUM application in Datadog.

To try the preview for RUM SDK Auto-Injection, follow the setup instructions for your web server.

<div class="alert alert-warning">To request support for a web server that is not listed here, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">fill out this form.</a></div>

{{< partial name="rum/rum-browser-instrumentation.html" >}}