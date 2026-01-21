---
title: Live Debugger
description: Debug running applications in real time using non-breaking logpoints that collect information without stopping execution or redeploying code.
further_reading:
- link: "https://www.datadoghq.com/blog/gitlab-source-code-integration"
  tag: "Blog"
  text: "Troubleshoot faster with the GitLab Source Code integration in Datadog"
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Dynamic Instrumentation"
- link: "/dynamic_instrumentation/expression-language/"
  tag: "Documentation"
  text: "Dynamic Instrumentation Expression Language"
- link: "/developers/ide_plugins/idea/live_debugger/"
  tag: "Documentation"
  text: "Live Debugger for JetBrains IDEs"
- link: "/dynamic_instrumentation/sensitive-data-scrubbing/"
  tag: "Documentation"
  text: "Sensitive Data Scrubbing"
- link: "/dynamic_instrumentation/symdb/"
  tag: "Documentation"
  text: "Autocomplete and Search"
- link: "/error_tracking/backend/exception_replay"
  tag: "Documentation"
  text: "Exception Replay"
---

## Overview

Live Debugger lets you inspect application behavior in real time, directly in running services, without redeploying code or interrupting execution.

Instead of adding temporary debug logs or reproducing issues locally, you can dynamically capture application state at specific points in the code. This includes variable values, method inputs, and execution context. Live Debugger is well suited for diagnosing issues in production or other long-running environments.

Live Debugger uses logpoints: auto-expiring, non-breaking breakpoints that collect diagnostic data without pausing the application. Since execution continues normally, Live Debugger can be used safely on production systems to investigate problems as they happen.

{{< img src="tracing/live_debugger/live-debugger-demo-2025050702.mp4" alt="Live Debugger Product Demo" video="true" >}}

## Key capabilities

Live Debugger provides:

- **Real-time inspection** of variable values, method arguments, and execution context in running code.
- **Safe, non-invasive data capture** that collects debugging information without pausing applications or requiring redeploys.
- **Dynamic logpoint placement** anywhere in your codebase, including in third-party libraries.
- **Auto-expiring logpoints** that deactivate automatically after a configurable duration.
- **Conditional data capture** based on user-defined expressions, so information is collected only when specific conditions are met.
- **Built-in [sensitive data scrubbing][1]** to help prevent exposure of personal data, secrets, and credentials.

## Requirements and setup

Live Debugger supports Python, Java, .NET, Ruby, Node.js, and PHP. It requires the [Datadog Agent][2], an
[APM-instrumented application][3], and [Remote Configuration][4]. You can enable it for an individual service either in-app, or by
setting an environment variable.

The enablement method depends on your tracer version, see the table below for details.

| | By Service<br>(In-App) | By Service<br>(Env Var) |
|---|---|---|
| **How to Enable** | Settings page | Environment variables |
| **Agent Version** | v7.49.0+ | v7.49.0+ |
| **Minimum Tracer Versions** | [Python][5] ≥ 3.10.0<br>[Java][6] ≥ 1.48.0<br>[.NET][7] ≥ 3.29.0 | [Python][5] ≥ 2.2.0<br>[Java][6] ≥ 1.34.0<br>[.NET][7] ≥ 2.54.0<br>[Node.js][8] ≥ 5.39.0<br>[Ruby][9] ≥ 2.9.0<br>[PHP][10] ≥ 1.5.0 |

To enable Live Debugger in-app, navigate to the Live Debugger **Settings** page, select the desired service, and toggle
it to **Enabled**.

{{< img src="tracing/live_debugger/live_debugger_enablement.mp4" video="true" alt="Enabling Live Debugger through the setting page" style="width:90%" >}}

If in-app enablement isn't available, follow the instructions below for your target language:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

<div class="alert alert-info">
<b>Why DI instructions?</b>
Live Debugger is built on <a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation (DI)</a>, so its
setup instructions and limitations also apply here.
</div>

### Create a logs index

Live Debugger generates logs that are sent to Datadog and appear alongside your application logs.

If you use [Exclusion filters][11], make sure Live Debugger logs are not filtered:

1. Create a logs index and [configure it][12] to the desired retention with **no sampling**.
2. Set the filter to match on the `source:dd_debugger` tag. All Dynamic Instrumentation logs have this source.
3. Make sure the new index takes precedence over any other with filters that match that tag, because the first match wins.

### Link your source code

If you enable the Datadog Source Code Integration, you can debug code directly through
Live Debugger.

{{< img src="tracing/live_debugger/live_debugger_code_viewer.png" alt="Live Debugger with Source Code Integration enabled showing code viewer" style="width:90%" >}}

## Using Live Debugger

<div class="alert alert-info">
<b>Rather debug in your IDE?</b>
Try using Live Debugger directly from JetBrains! <a href="/developers/ide_plugins/idea/live_debugger/">Click here</a> to learn more.</div>

### Creating and using a Debug Session

A Debug Session lets you inspect running code using auto-expiring logpoints. To create and use a Debug Session:

1. Start a Debug Session from one of the following locations:
   - On the [Live Debugger page][13], click **Create Debug Session**.
   - (Requires the [Code Origin][20] feature) In the [Trace Explorer][14], open a trace, locate the Code Origin section in the side panel, and click **Start Debug Session**.
2. Add a logpoint to begin collecting diagnostic data.
3. Add, remove, or modify logpoints as needed during the session.

Debug Sessions expire automatically. You can also manually disable or re-enable a session, as well as individual logpoints, at any time.

### Creating logpoints

Logpoints are "non-breaking breakpoints" that specify where in the code to capture information, what data to include, and under what conditions. To add a logpoint for debugging:

1. Go to the [Live Debugger page][13].
2. Click **Create Debug Session**.
3. Choose your service, environment, and select where in your code to place the first logpoint.
4. Define a logpoint message template using the [expression language][15].
5. (Optional) Enable "Capture Variables" to collect all execution context (this feature is rate-limited to 1 execution per second).
6. (Optional) Define a condition for when the logs should be emitted.

**Note:** Some feature limitations may apply depending on the service's runtime language. Review the [runtime language-specific documentation][16] for more details.

### Protecting sensitive data

Live Debugger data might contain sensitive information, especially when using the "Capture Variables" option. To protect this data:

1. Use the built-in [sensitive data scrubbing][1] mechanisms.
2. Use [Sensitive Data Scanner][17] to identify and redact sensitive information based on regular expressions.

## Impact on performance and billing

Enabling Live Debugger on a service does not trigger data capture or impact performance. Data capture only occurs when there are active Debug Sessions on that service.

**Performance impact**: Datadog's agent-driven instrumentation ensures minimal impact on application performance; sampling logic, rate limits, and built-in budgets prevent runaway data capture.

**Pricing impact**: Logs captured by Datadog are all billed the same way. This applies whether they are generated from Live Debugger or logger lines in your source code. With Live Debugger, the logpoints automatically expire after the set time period, limiting unnecessary data accumulation and costs. Monitor your [Datadog Plan & Usage page][18] for any unexpected increases after utilizing a new feature.

## Limitations

The following constraints apply to Live Debugger usage and configuration:

- **Configuration scope:** Live Debugger and Dynamic Instrumentation are enabled or disabled together for the same service and environment.
- **Rate limits:**
   - Logpoints with variable capture: Limited to 1 execution per second.
   - Logpoints without variable capture: Limited to 5000 executions per second, per service instance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/sensitive-data-scrubbing/
[2]: /agent/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[4]: /tracing/guide/remote_config
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[7]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[8]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[9]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
[10]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[11]: /logs/log_configuration/indexes/#exclusion-filters
[12]: /logs/log_configuration/indexes/#add-indexes
[13]: https://app.datadoghq.com/debugging/sessions
[14]: https://app.datadoghq.com/apm/traces
[15]: /dynamic_instrumentation/expression-language/
[16]: /dynamic_instrumentation/enabling
[17]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[18]: https://app.datadoghq.com/account/billing
[19]: /dynamic_instrumentation/
[20]: /tracing/code_origin
