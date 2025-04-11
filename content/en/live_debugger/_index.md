---
title: Live Debugger
further_reading:
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Dynamic Instrumentation"
- link: "/dynamic_instrumentation/expression-language/"
  tag: "Documentation"
  text: "Dynamic Instrumentation Expression Language"
- link: "/dynamic_instrumentation/sensitive-data-scrubbing/"
  tag: "Documentation"
  text: "Sensitive Data Scrubbing"
- link: "/dynamic_instrumentation/symdb/"
  tag: "Documentation"
  text: "Autocomplete and Search (Preview)"
- link: "/tracing/error_tracking/execution_replay"
  tag: "Documentation"
  text: "Execution Replay"
---

{{< beta-callout-private url="https://www.datadoghq.com/product-preview/live-debugger/" >}}
    Live Debugger is in limited preview, and is not available to all customers.
    Request access to join the waiting list.
    Note that <a href="#limitations">some limitations</a> apply to the preview.
{{< /beta-callout-private >}}

## Overview

Live Debugger helps you debug running applications without redeploying code or interrupting service. It uses Datadog's [Dynamic Instrumentation][1] to inspect and troubleshoot code behavior in real-time. Create a Debug Session with auto-expiring logpoints anywhere in your application code - and watch the real-time data roll in!

Logpoints function as "non-breaking breakpoints" that collect vital information from running applications without stopping execution. This makes Live Debugger ideal for diagnosing issues in environments where traditional debugging methods aren't practical.

## Key capabilities

Live Debugger provides:

* **Real-time inspection**: Examine variable states, method arguments, and execution paths in running code.
* **Non-invasive debugging**: Collect debugging information without stopping applications or degrading performance.
* **Code instrumentation**: Add logpoints to any location in your code, including third-party libraries.
* **Auto-expiring logs**: Logpoints created in Debug Sessions expire automatically after a set time (default 60 minutes).
* **Conditional execution**: Configure logpoints to execute only when specific conditions are met.
* **Sensitive data protection**: Built-in [sensitive data scrubbing][3] prevents exposure of personal information, passwords, and secrets.

## Getting started

### Prerequisites

1. Live Debugger requires the [same prerequisites][16] as Dynamic Instrumentation.
2. To use one-click enablement, additional permissions are required: **Org Management**, **APM Remote Configuration Write**.
3. Create a logs index to store debugging information ([see instructions][19]).
4. (Recommended) Enable [Source Code Integration][20] to view and select specific code locations when adding logpoints.

### Setup Live Debugger

Enable and disable Live Debugger on a service using one of these methods:

#### One-click enablement (Recommended) ####
- Select the service and environment on the [Live Debugger Settings][18] page.
- Check that all prerequisites are met (unmet requirements display on the Settings page).
- Click "Enable" to allow users to create Debug Sessions on the selected service and environment.
- Click "Disable" to deactivate active Debug Sessions and prevent users from creating more.
- No service restart is required.
- Note:
    - Only users with eligible permissions can use one-click enablement.
    - Users may need to re-authenticate before using this feature.
    - Admins and security contacts receive email notifications when new services are enabled.

#### Manual enablement ####
- Select the service and environment on the [Live Debugger Settings][18] page.
- Check that all prerequisites are met.
- Follow the instructions to enable Live Debugger.
- Restart the service before using Live Debugger.


## Relationship between Live Debugger and Dynamic Instrumentation
Due to shared underlying technology, Live Debugger and Dynamic Instrumentation are always enabled or disabled together on the same service and environment. 

Dynamic Instrumentation also allows users to create logpoints, as well as other custom instrumentation (spans, span tags, and metrics). The key difference is that Live Debugger logpoints expire automatically after a set time period, while Dynamic Instrumentations remain active until manually deactivated.

When you enable or disable Live Debugger:
- The same action applies to Dynamic Instrumentation for that service and environment
- Users with appropriate permissions can create both Debug Sessions in Live Debugger and instrumentations in Dynamic Instrumentation when enabled
- Disabling stops all data capture from both active Debug Session logpoints and Dynamic Instrumentations

## Impact on performance and billing

Enabling Live Debugger and Dynamic Instrumentation on a service does not trigger any data capture or performance impact by itself. Data capture only begins and continues while there are active Debug Sessions or dynamic instrumentations on that service.

**Performance Impact**: Datadog's agent-driven instrumentation ensures minimal impact on application performance. Sampling logic, rate limits, and built-in budgets prevent runaway data capture. The system limits logs with variable capture to 1 per second, while logs without variable capture are allowed a higher sampling rate (due to less overhead).

**Pricing Impact**: Logs captured by Datadog are all billed the same way, whether they are generated from Live Debugger or logger lines in your source code. With Live Debugger, the logpoints automatically expire after the set time period, limiting unnecessary data accumulation and costs. Monitor your Datadog Plan & Usage page for any unexpected increases after utilizing a new feature.

## Using Live Debugger

### Creating and using a Debug Session

Debug Sessions let you inspect your code at runtime with auto-expiring logpoints. To create and use a Debug Session:

1. From the Live Debugger page, click **Create Debug Session**.
2. Add the first logpoint to start the session.
3. Add, remove, and modify logpoints within the session.
4. Add logpoints within the same session across multiple services.

Debug Sessions automatically expire after 60 minutes. You can manually disable and re-enable both sessions and individual logpoints at any time.

Start Debug Sessions from:
- Live Debugger page
- APM Traces (requires Code Origins feature) by clicking **Start Debug Session** on a specific span's Code Origins section

### Creating logpoints

Logpoints are "non-breaking breakpoints" that specify where in the code to capture information, what data to include, and under what conditions. To add a logpoint for debugging:

1. Go to the [Live Debugger page][14].
2. Click **Create Debug Session**.
3. Choose your service, environment, and select where in your code to place the first logpoint.
4. Define a logpoint message template using the [Dynamic Instrumentation expression language][2].
5. Optionally enable "Capture Variables" to collect all execution context (this feature is rate-limited to 1 hit per second).
6. Optionally, define a condition for when the logs should be emitted.

Note: Some feature limitations may apply depending on the service's runtime language. See the specific Dynamic Instrumentation [runtime language page][17] for more details.

## Protecting sensitive data

Live Debugger data might contain sensitive information, especially when using the "Capture Variables" option. To protect this data:

1. Use Dynamic Instrumentation's built-in [sensitive data scrubbing][3] mechanisms.
2. Use [Sensitive Data Scanner][15] to identify and redact sensitive information based on regular expressions.

## Limitations

- Live Debugger supports the [same runtime languages][17] as Dynamic Instrumentation.
- Live Debugger and Dynamic Instrumentation are enabled and disabled for the <a href="#relationship-between-live-debugger-and-dynamic-instrumentation">same service and environment</a>.
- Logpoints with variable enabled are rate-limited to 1 hit per second.
- Logpoints without variable capture are rate-limited to 5000 executions per second per service instance.
- Debug Sessions expire after 60 minutes (this is not customizable for now).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/
[2]: /dynamic_instrumentation/expression-language/
[3]: /dynamic_instrumentation/sensitive-data-scrubbing/
[4]: /agent/
[5]: /agent/remote_config/
[6]: https://github.com/DataDog/dd-trace-java
[7]: https://github.com/DataDog/dd-trace-py
[8]: https://github.com/DataDog/dd-trace-dotnet
[9]: https://github.com/DataDog/dd-trace-js
[10]: https://github.com/DataDog/dd-trace-rb
[11]: https://github.com/DataDog/dd-trace-php
[12]: /getting_started/tagging/unified_service_tagging/
[13]: https://app.datadoghq.com/dynamic-instrumentation/setup
[14]: https://app.datadoghq.com/debugging/sessions
[15]: /security/sensitive_data_scanner/ 
[16]: /dynamic_instrumentation/#prerequisites
[17]: /dynamic_instrumentation/enabling
[18]: /debugging/settings
[19]: /dynamic_instrumentation/#create-a-logs-index
[20]: /integrations/guide/source-code-integration/