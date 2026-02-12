---
title: Java Servlet
description: "Automatically inject RUM Browser SDK into Java servlet-based web applications using the Java SDK auto-instrumentation."
code_lang: java
type: multi-code-lang
code_lang_weight: 7
aliases:
  - /real_user_monitoring/browser/setup/server/java
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/setup/server'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation'
- link: '/tracing/trace_collection/single-step-apm/'
  tag: 'Documentation'
  text: 'Single Step APM Instrumentation'
---

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

## Setup

Choose your preferred setup method:

{{< tabs >}}
{{% tab "Single-Step Instrumentation (Recommended)" %}}

Enables RUM Browser monitoring with [Single Step Instrumentation (SSI)][2].
When you run the Agent installation with RUM enabled, Datadog:
- Loads the Java SDK into your Java applications through SSI
- Creates a RUM application for you
- Configures the Java SDK with the required RUM environment variables

**This approach requires no code changes and no manual web server configuration.**

1. Go to the [**Agent Installation**][1] page.
2. Select your platform (for example, Linux).
3. In the **Customize your observability coverage** section, enable **Real User Monitoring** under **Application Observability**.

   A RUM application is automatically created for you when you enable this option.

4. Copy the generated installation command and run it on your host.
5. Restart your Java servlet-based application.


[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[2]: /tracing/trace_collection/single-step-apm/

{{% /tab %}}
{{% tab "Manual Configuration" %}}

Use manual configuration if you prefer to set up RUM Browser monitoring independently, or if SSI is not available for your environment.

### Prerequisites

- Java SDK installed and loaded using either:
  - [Single Step Instrumentation][1] (SSI)
  - [Manual Java SDK installation][2]
- RUM application [created in Datadog][3]
- Configuration values ready:
  - `clientToken`
  - `applicationId`
  - `remoteConfigurationId`

### Enable RUM instrumentation on the Java SDK

RUM Instrumentation for Java web application servers can be configured using the usual Java SDK configuration methods. For more information, see [Configuring the Java SDK Library][5].

RUM SDK injection is disabled by default. Enable it by exporting the following environment variables:

```shell
export DD_RUM_ENABLED=true
export DD_RUM_APPLICATION_ID=<your-application-id>
export DD_RUM_CLIENT_TOKEN=<your-client-token>
export DD_RUM_REMOTE_CONFIGURATION_ID=<your-remote-config-id>
export DD_RUM_SITE=datadoghq.com # or datadoghq.eu / us3.datadoghq.com / us5.datadoghq.com / ap1.datadoghq.com / ap2.datadoghq.eu
```

Or use the following Java system properties:

```shell
java -Ddd.rum.enabled=true \
  -Ddd.rum.application.id=<your-application-id> \
  -Ddd.rum.client.token=<your-client-token> \
  -Ddd.rum.remote.configuration.id=<your-remote-configuration-id> \
  -Ddd.rum.site=datadoghq.com # or datadoghq.eu / us3.datadoghq.com / us5.datadoghq.com / ap1.datadoghq.com / ap2.datadoghq.eu
```

Restart your Java web application server to apply the changes.

HTML documents should now contain the Datadog RUM JavaScript tag right before the closing `</head>`. You may need to clear your browser cache. You should now start receiving data for your Datadog RUM application.

[1]: /tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: https://app.datadoghq.com/rum/list
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=configurationfile#configuration

{{% /tab %}}
{{< /tabs >}}

## Configuration options

Here are all the configuration options related for enabling RUM on the Java SDK:

| Property | Environment variable | Value | Requirement |
|----------|---------------------|-------|-------------|
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
| `dd.rum.session.sample.rate` | `DD_RUM_SESSION_SAMPLE_RATE` | Percentage, from `0` to `100` | Required if `rum.remote.configuration.id` is missing |
| `dd.rum.session.replay.sample.rate` | `DD_RUM_SESSION_REPLAY_SAMPLE_RATE` | Percentage, from `0` to `100` | Required if `rum.remote.configuration.id` is missing |
| `dd.rum.remote.configuration.id` | `DD_RUM_REMOTE_CONFIGURATION_ID` | `<string>` | Required if either `rum.session.sample.rate` or `rum.session.replay.sample.rate` is missing |

{{% rum-browser-auto-instrumentation-update-user-attributes %}}

## Troubleshooting

Check the Java web application server logs if you don't see the RUM JavaScript tag injected.

Look for the configuration parsing error message `"Unable to configure RUM injection"` in the logs. If present, it shows a detailed message about the cause.

Additionally, enabling debug logs using the `dd.trace.debug=true` system property or the `DD_TRACE_DEBUG=true` environment variable dumps the Java client library configuration at startup:

```shell
DEBUG datadog.trace.api.Config - New instance: Config{..., rumEnabled=true, rumInjectorConfig={"applicationId":"appid","clientToken":"token","site":"datadoghq.com","remoteConfigurationId":"remoteconfigid"}, ...}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
