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

RUM Auto-Instrumentation automatically adds RUM monitoring to your web application server. This means you don't need to modify your frontend code directly. Instead, you can start collecting RUM data by editing a configuration file. However, if you want to track specific user actions (custom actions) or add custom event details (event attributes), you still need to add some code to your application.

## How it works

The Java SDK works by monitoring your servlet API (which handles web requests and responses). It automatically checks each HTTP response your server sends. When it detects an HTML response, it looks for the `<head>` section and automatically adds the RUM JavaScript code there. The rest of your HTML content remains unchanged. This approach adds minimal overhead, so it works well even with streaming responses (where content is sent in real-time).

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
- RUM Application created in Datadog
- Configuration values ready:
  - `clientToken`
  - `applicationId` 
  - `remoteConfigurationId`

## Configuration

### Enabling RUM Auto-Instrumentation

RUM Auto-Instrumentation for Java Web Application servers can be configured using the usual Java Tracing configuration methods described in [Configuring the Java SDK Library][3].

RUM Auto-Instrumentation is disabled by default unless you export the following environment variables:

```shell
export DD_RUM_ENABLED=true
export DD_RUM_APPLICATION_ID=<your-application-id>
export DD_RUM_CLIENT_TOKEN=<your-client-token>
export DD_RUM_REMOTE_CONFIGURATION_ID=<your-remote-config-id>
```

Or use the following Java system properties:

```shell
java -Ddd.rum.enabled=true -Ddd.rum.application.id=<your-application-id> -Ddd.rum.client.token=<your-client-token> -Ddd.rum.remote.configuration.id=<your-remote-configuration-id>
```

You may need to restart your Java Web Application server in order to see the changes. HTML documents should now contain the Datadog RUM JavaScript tag right before the closing `</head> tag. You may need to clear your cache before you start receiving data for your Datadog RUM application.

### Configuring RUM Auto-Instrumentation

Below are all the configurations related to RUM Auto-Instrumentation:

| Property | Environment variable | Value | Requirement |
|----------|-------------------|-------|-------------|
| `dd.rum.enabled` | `DD_RUM_ENABLED` | `true` / `false` | Required |
| `dd.rum.application.id` | `DD_RUM_APPLICATION_ID` | `<string>` | Required |
| `dd.rum.client.token` | `DD_RUM_CLIENT_TOKEN` | `<string>` | Required |
| `dd.rum.site` | `DD_RUM_SITE` | `datadoghq.com` / `us3.datadoghq.com` / `us5.datadoghq.com` / `datadoghq.eu` / `ap1.datadoghq.com` / `ap2.datadoghq.eu` | Optional, `datadoghq.com` by default |
| `dd.rum.service` | `DD_RUM_SERVICE` | `<string>` | Optional |
| `dd.rum.environment` | `DD_RUM_ENVIRONMENT` | `<string>` | Optional |
| `dd.rum.major.version` | `DD_RUM_MAJOR_VERSION` | `5` / `6` | Optional, `6` by default |
| `dd.rum.version` | `DD_RUM_VERSION` | `<string>` | Optional |
| `dd.rum.track.user.interaction` | `DD_RUM_TRACK_USER_INTERACTION` | `true` / `false` | Optional |
| `dd.rum.track.resources` | `DD_RUM_TRACK_RESOURCES` | `true` / `false` | Optional |
| `dd.rum.track.long.tasks` | `DD_RUM_TRACK_LONG_TASKS` | `true` / `false` | Optional |
| `dd.rum.session.sample.rate` | `DD_RUM_SESSION_SAMPLE_RATE` | percentage, from 0 to 100 | Required if `rum.remote.configuration.id` is missing |
| `dd.rum.session.replay.sample.rate` | `DD_RUM_SESSION_REPLAY_SAMPLE_RATE` | percentage, from 0 to 100 | Required if `rum.remote.configuration.id` is missing |
| `dd.rum.remote.configuration.id` | `DD_RUM_REMOTE_CONFIGURATION_ID` | `<string>` | Required if either `rum.session.sample.rate` or `rum.session.replay.sample.rate` is missing |

## Troubleshooting

### RUM JavaScript tag is not injected

If you don't see the RUM JavaScript tag injected, try the following steps:

1. **Check server logs** for any error messages related to RUM Auto-Instrumentation
2. **Verify configuration** - ensure all required environment variables are set:
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
[2]: tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
