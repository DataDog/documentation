---
title: Java Servlet
beta: true
code_lang: java
type: multi-code-lang
code_lang_weight: 7
further_reading:
- link: '/real_user_monitoring/browser/setup/server/'
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

## Troubleshooting

### RUM JavaScript tag is not injected

If you don't see the RUM JavaScript tag injected, try the following steps:

1. **Check server logs** for any error messages related to RUM Auto-Instrumentation
2. **Verify configuration** - ensure all required environment variables defined at the configuration step are set:
   - `DD_RUM_ENABLED=true`
   - `DD_RUM_APPLICATION_ID=<your-application-id>`
   - `DD_RUM_CLIENT_TOKEN=<your-client-token>`
   - `DD_RUM_REMOTE_CONFIGURATION_ID=<your-remote-config-id>`
3. **Enable debug logging** by setting `dd.trace.debug=true` (system property) or `DD_TRACE_DEBUG=true` (environment variable)
4. **Check HTML response** - ensure your server is returning HTML with a `<head>` section
5. **Clear browser cache** - cached pages do not show the injected JavaScript

In addition, when debug logging is enabled, you should see a message like this at startup:

```shell
DEBUG datadog.trace.api.Config - New instance: Config{..., rumEnabled=true, rumInjectorConfig={"applicationId":"appid","clientToken":"token","site":"datadoghq.com","remoteConfigurationId":"remoteconfigid"}, ...}
```

This confirms that RUM Auto-Instrumentation is properly configured.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: https://app.datadoghq.com/rum/list
[4]: https://forms.gle/RdVvDsmmzW21s2vd7