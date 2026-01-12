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
  text: "Autocomplete and Search (Preview)"
- link: "/error_tracking/backend/exception_replay"
  tag: "Documentation"
  text: "Exception Replay"
---

{{< beta-callout-private url="https://www.datadoghq.com/product-preview/live-debugger/" >}}
    Live Debugger is in Limited Preview. Request access to join the waiting list.
    <br>
    To submit questions, feedback, or requests related to Live Debugger, fill out <a href="https://docs.google.com/forms/d/e/1FAIpQLSdM9SV4fxrM_OvQ2CtI7CMl7evN0jasFb6X1QiPAbW6dPTQVQ/viewform?usp=header">this form</a> with details.
    <br>
    For time-sensitive issues, contact <a href="https://www.datadoghq.com/support/">Datadog support</a>.
{{< /beta-callout-private >}}

## Overview

With Live Debugger, you can debug running applications in real time, without redeploying code or interrupting service. Powered by Datadog's [Dynamic Instrumentation][1], Live Debugger uses logpoints&mdash;auto-expiring, "non-breaking breakpoints"&mdash;to collect information from running applications without pausing execution. This makes it ideal for investigating issues in environments where traditional debugging methods aren't practical.

{{< img src="tracing/live_debugger/live-debugger-demo-2025050702.mp4" alt="Live Debugger Product Demo" video="true" >}}

## Key capabilities

Live Debugger provides:

- **Real-time inspection** of variable states, method arguments, and execution paths in running code.
- **Non-invasive data collection** that captures debugging information without stopping applications or degrading performance.
- **Code instrumentation** with logpoints that can be added anywhere in your code, including third-party libraries.
- **Auto-expiring logpoints** that are automatically deactivated after a set time (default: 48 hours).
- **Conditional logging** based on user-defined criteria to capture data only when specific conditions are met.
- **Built-in [sensitive data scrubbing][3]** to prevent exposure of personal information, passwords, and secrets.

## Getting started

### Prerequisites

1. All [Dynamic Instrumentation prerequisites][16] are met.
1. You have [created a logs index][19] to store debugging information.
1. (Recommended) You have enabled [Source Code Integration][20] to view and select specific code locations when adding logpoints.

### Setup Live Debugger

Enable and disable Live Debugger on a service using one of the following methods:

#### One-click enablement (recommended) ####

<div class="alert alert-info">Only users with the following permissions can use one-click enablement: <b>Org Management, APM Remote Configuration Read, APM Remote Configuration Write</b>.</div>

1. Select the service and environment on the [Live Debugger Settings][18] page.
1. Check that all prerequisites are met as indicated on the Settings page.
1. Click "Enable" or "Disable":
    - "Enable" to allow users to create Debug Sessions on the selected service and environment.
    - "Disable" to deactivate active Debug Sessions and prevent users from creating more.

**Note**: No service restart is required for changes to take effect. Admins and security contacts receive email notifications when services are enabled or disabled.

#### Manual enablement ####
1. Select the service and environment on the [Live Debugger Settings][18] page.
1. Follow the instructions to enable Live Debugger.
1. Restart the service before using Live Debugger.


## Live Debugger and Dynamic Instrumentation
Due to shared underlying technology, Live Debugger and Dynamic Instrumentation are always enabled or disabled together on the same service and environment.

Like Live Debugger, Dynamic Instrumentation allows users to create logpoints (in addition to supporting other custom instrumentation like spans, span tags, and metrics). However, Live Debugger logpoints expire automatically after a set time period, while Dynamic Instrumentation logpoints remain active until manually deactivated.

When you enable or disable Live Debugger, the same action applies to Dynamic Instrumentation for that service and environment. When disabled, all data capture stops from both active Debug Session logpoints and dynamic instrumentations.

## Using Live Debugger

<div class="alert alert-info">Try using Live Debugger from your JetBrains IDE! <a href="/developers/ide_plugins/idea/live_debugger/">Click here</a> to learn more.</div>

### Creating and using a Debug Session

Debug Sessions let you inspect your code at runtime with auto-expiring logpoints. To create and use a Debug Session:

1. Start a Debug Session from one of the following:
    - On the [Live Debugger page][14], click **Create Debug Session**.
    - (Requires Code Origin feature) In the [Trace Explorer][22], click on a trace to open the side panel, find the Code Origin section, and click **Start Debug Session**.
2. Add the first logpoint to start the session.
3. Add, remove, and modify logpoints within the session.

Debug Sessions automatically expire after 48 hours. You can manually disable and re-enable both sessions and individual logpoints at any time.

### Creating logpoints

Logpoints are "non-breaking breakpoints" that specify where in the code to capture information, what data to include, and under what conditions. To add a logpoint for debugging:

1. Go to the [Live Debugger page][14].
2. Click **Create Debug Session**.
3. Choose your service, environment, and select where in your code to place the first logpoint.
4. Define a logpoint message template using the [Dynamic Instrumentation expression language][2].
5. (Optional) Enable "Capture Variables" to collect all execution context (this feature is rate-limited to 1 execution per second).
6. (Optional) Define a condition for when the logs should be emitted.

**Note:** Some feature limitations may apply depending on the service's runtime language. Review the [runtime language-specific documentation][17] for more details.

### Protecting sensitive data

Live Debugger data might contain sensitive information, especially when using the "Capture Variables" option. To protect this data:

1. Use the built-in [sensitive data scrubbing][3] mechanisms.
2. Use [Sensitive Data Scanner][15] to identify and redact sensitive information based on regular expressions.

## Impact on performance and billing

Enabling Live Debugger and Dynamic Instrumentation on a service does not trigger data capture or impact performance. Data capture only occurs when there are active Debug Sessions or dynamic instrumentations on that service.

**Performance impact**: Datadog's agent-driven instrumentation ensures minimal impact on application performance; sampling logic, rate limits, and built-in budgets prevent runaway data capture.

**Pricing impact**: Logs captured by Datadog are all billed the same way, whether they are generated from Live Debugger or logger lines in your source code. With Live Debugger, the logpoints automatically expire after the set time period, limiting unnecessary data accumulation and costs. Monitor your [Datadog Plan & Usage page][21] for any unexpected increases after utilizing a new feature.

## Limitations

The following constraints apply to Live Debugger usage and configuration:

- **Language support:** Live Debugger is available for the same runtime languages as [Dynamic Instrumentation][1], including: Java, Python, .NET, PHP (preview), Node.js (preview), Ruby (preview).
- **Configuration scope:** Live Debugger and Dynamic Instrumentation are enabled or disabled together for the same service and environment.
- **Rate limits:**
   - Logpoints with variable capture: Limited to 1 execution per second.
   - Logpoints without variable capture: Limited to 5000 executions per second, per service instance.
- **Session duration:** Debug Sessions automatically expire after 48 hours by default.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/
[2]: /dynamic_instrumentation/expression-language/
[3]: /dynamic_instrumentation/sensitive-data-scrubbing/
[4]: /agent/
[5]: /remote_configuration
[6]: https://github.com/DataDog/dd-trace-java
[7]: https://github.com/DataDog/dd-trace-py
[8]: https://github.com/DataDog/dd-trace-dotnet
[9]: https://github.com/DataDog/dd-trace-js
[10]: https://github.com/DataDog/dd-trace-rb
[11]: https://github.com/DataDog/dd-trace-php
[12]: /getting_started/tagging/unified_service_tagging/
[13]: https://app.datadoghq.com/dynamic-instrumentation/setup
[14]: https://app.datadoghq.com/debugging/sessions
[15]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[16]: /dynamic_instrumentation/#prerequisites
[17]: /dynamic_instrumentation/enabling
[18]: https://app.datadoghq.com/debugging/settings
[19]: /dynamic_instrumentation/#create-a-logs-index
[20]: /integrations/guide/source-code-integration/
[21]: https://app.datadoghq.com/account/billing
[22]: https://app.datadoghq.com/apm/traces
