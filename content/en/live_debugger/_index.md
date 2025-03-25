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

## Overview

Live Debugger enables you to debug your production applications without redeploying code or interrupting service. Built on Datadog's [Dynamic Instrumentation][1] capabilities, Live Debugger allows you to inspect and troubleshoot code behavior in real-time. Start a Debug Session by adding a group of auto-expiring logs and variable snapshots anywhere in your application code. 

Live Debugger offers a non-invasive approach to production debugging, functioning as a "non-breaking breakpoint" that lets you gather vital information from your running applications without halting their execution. This makes it particularly valuable for diagnosing issues in environments where traditional debugging methods are impractical.

## Key capabilities

Live Debugger provides the following capabilities:

* **Real-time inspection**: Examine variable states, method arguments, and execution paths in your running production code.
* **Non-invasive debugging**: Collect debugging information without stopping application execution or degrading performance.
* **Code instrumentation**: Add logs to any location in your code, including third-party libraries.
* **Auto-expiring logs**: Logs created in Debug Session will expire automatically after a fixed time period (default 60 minutes), to prevent unnecessary data accumulation.
* **Conditional execution**: Configure logs to execute only when specific conditions are met using [expression language][2].
* **Sensitive data protection**: Built-in [sensitive data scrubbing][3] prevents accidental exposure of personal information, passwords, and secrets.

## Getting started

### Prerequisites

1. Live Debugger is built on Datadog's Dynamic Instrumentation technology and requires the [same prerequisites][16].
2. Create a logs index to store the debugging information ([see instructions here][19]).

### Setup Live Debugger

To enable Live Debugger on a service, there are two methods:

**One-click enablement (Recommended)**
- Select the service and environment on the [Live Debugger Settings][18] page.
- Ensure all prerequisites are met (any unmet requirements will be displayed on the [Settings][18] page).
- Enable Live Debugger (and Dynamic Instrumentation simultaneously) by clicking the "Enable" button.
- One-click enablement does not require the service to be restarted before using Live Debugger.
- Please note:
    - Only users with eligible permissions will have access to use one-click enablement.
    - For security, users may be asked to re-authenticate before using one-click enablement. Also, other admin and security contacts in the organization will receive an email notification when a new service and environment have been enabled via one-click enablement.

**Manual enablement**
- Select the service and environment on the [Live Debugger Settings][18] page.
- Ensure all prerequisites are met (unmet requirements are displayed on the [Settings][18] page).
- Follow the instructions on the [Settings][18] page to enable Live Debugger (and Dynamic Instrumentation simultaneously).
- Manual enablement requires that the service is restarted to apply the configuration changes.

## Using Live Debugger

### Creating and using a Debug Session

Debug Sessions allow you to inspect your code at runtime with auto-expiring (time-boxed) log instrumentations. To create and use a Debug Session:

1. Add at least one log instrumentation to start the session.
2. Add, remove, and modify logs within the session while it's active.
3. Logs within the same session can be added across multiple services.

Debug Sessions automatically expire after 60 minutes. You can also manually disable and re-enable both sessions and individual logs at any time.

Start Debug Sessions from:
- Live Debugger page
- APM Traces (requires Code Origins feature) by clicking "Start Debug Session" on a specific span's Code Origins section

### Creating log instrumentations

Logs are the most common way to debug applications with Live Debugger as they allow you to capture and output variable values during execution:

1. Go to the [Dynamic Instrumentation page][14].
2. Click **Create Probe** and select **Log** as the probe type.
3. Choose your service, environment, version, and select where in your code to place the probe.
4. Define a log message template using the [Dynamic Instrumentation expression language][2]. For example: `User {user.id} purchased {count(products)} products`.
5. Optionally enable "Capture Variables" to collect all execution context (this feature is rate-limited to one hit per second).
6. Optionally define a condition for when the log should be emitted.


## Protecting sensitive data

Live Debugger data might contain sensitive information, especially when using the "Capture Variables" option. To protect this data:

1. Use Dynamic Instrumentation's built-in [sensitive data scrubbing][3] mechanisms.
4. Use [Sensitive Data Scanner][15] to identify and redact sensitive information based on regular expressions.

## Limitations

- Live Debugger is supported for the [same runtime languages][17] as Dynamic Instrumentation.
- Probes with "Capture Variables" enabled are rate-limited to one hit per second.
- Regular log probes are rate-limited to 5000 executions per second per service instance.

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
[14]: https://app.datadoghq.com/dynamic-instrumentation
[15]: /security/sensitive_data_scanner/ 
[16]: /dynamic_instrumentation/#prerequisites
[17]: /dynamic_instrumentation/enabling
[18]: /debugging/settings
[19]: /dynamic_instrumentation/#create-a-logs-index