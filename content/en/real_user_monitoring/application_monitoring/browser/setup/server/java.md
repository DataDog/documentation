---
title: Java Servlet
description: "Automatically inject RUM Browser SDK into Java servlet-based web applications using the Java SDK auto-instrumentation."
beta: true
code_lang: java
type: multi-code-lang
code_lang_weight: 7
aliases:
  - /real_user_monitoring/browser/setup/server/java
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/setup/server'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation'
---

{{< callout url="https://forms.gle/RdVvDsmmzW21s2vd7" header="Join the Preview!">}}
  RUM Auto-Instrumentation through Java servlet-based web servers is in Preview. 
{{< /callout >}}

## Overview

RUM Auto-Instrumentation automatically adds RUM monitoring to your web application server, so you can start collecting RUM data by editing a configuration file instead of having to modify your frontend code directly. However, if you want to track specific user actions (custom actions) or add custom event details (event attributes), you still need to add some code to your application.

## How it works

The Java SDK works by monitoring your servlet API (which handles web requests and responses), automatically checking each HTTP response your server sends. When it detects an HTML response, it looks for the `<head>` section and automatically adds the RUM JavaScript code there. The rest of your HTML content remains unchanged. This approach adds minimal overhead, so it works well even with streaming responses (where content is sent in real-time).

## Prerequisites

### Server requirements
- Java web application server with Servlet API 3.0 or higher support:
  - Jetty 7+
  - Tomcat 7+
  - GlassFish 3+ / Payara 4.1+
  - JBoss AS 6+ / Wildfly 8+
  - Undertow 1+
  - WebLogic 12+
  - WebSphere AS 8+ / Open Liberty 17+

### SDK requirements
- Java SDK installed using either:
  - [Automatic instrumentation][1] (SSI)
  - [Manual Java SDK installation][2]

### Datadog configuration
- RUM application [created in Datadog][3]
- Configuration values ready:
  - `clientToken`
  - `applicationId` 
  - `remoteConfigurationId`

## Configuration

To get access to configuration steps for this feature, [join the preview program][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: https://app.datadoghq.com/rum/list
[4]: https://forms.gle/RdVvDsmmzW21s2vd7