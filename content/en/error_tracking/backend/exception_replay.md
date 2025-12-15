---
title: Exception Replay in Error Tracking
is_beta: true
description: Learn about Exception Replay in Error Tracking.
further_reading:
- link: 'https://www.datadoghq.com/blog/exception-replay-datadog/'
  tag: 'Blog'
  text: 'Simplify production debugging with Datadog Exception Replay'
- link: '/tracing/live_debugger'
  tag: 'Documentation'
  text: 'Learn about Datadog Live Debugger'
- link: '/error_tracking/monitors'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'
- link: '/tracing/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for APM Backend Services'
aliases:
  - /tracing/error_tracking/executional_context
  - /tracing/error_tracking/execution_replay/
---

<div class="alert alert-info">
Exception Replay is generally available for Python, Java, .NET, PHP, and is enabled by default
<a href="#requirements--setup">when supported</a>.
</div>

## Overview

Exception Replay captures execution context and local variable values when an exception occurs, helping you diagnose,
reproduce, and resolve issues faster. It records the surrounding state—including stack trace and variable snapshots—and
surfaces this data directly in Error Tracking alongside the rest of the issue details.

{{< img src="tracing/error_tracking/error_tracking_executional_context-2.png" alt="Error Tracking Explorer Exception Replay" style="width:90%" >}}

## How it works

Exception Replay uses Datadog's [Dynamic Instrumentation][3] to capture runtime context without the need to redeploy.
It is designed for production use: snapshots are rate-limited and sensitive data is automatically redacted.
When enabled, it listens for exceptions in your APM-instrumented application and captures snapshots of the stack trace
and local variables, sending them to Datadog for display in Error Tracking.

At a high level, the process is:

1. A service runs with a supported [Datadog tracing library][5].
2. Exception Replay is [enabled](#requirements--setup) for the environment or service.
3. When an exception occurs, the tracer captures a snapshot (rate-limited to one per exception type per instance per hour).
4. Sensitive data is automatically [redacted](#sensitive-data-redaction).
5. The snapshot is correlated with the originating APM trace and surfaced in Error Tracking.

<div class="alert alert-info">
<b>What products are supported?</b>
Exception Replay is available only for <b>APM-based exceptions</b> and does not support errors from Logs or RUM.
</div>

## Requirements & Setup

Exception Replay supports **Python**, **Java**, **.NET**, and **PHP**, and captures only APM-based exceptions. It
requires the Datadog Agent and an [APM-instrumented application][5]. You can enable it for an entire
environment, an individual service in-app, or a specific service using environment variables.

The enablement method depends on your tracer version and whether [Remote Configuration][4] is available—see the table
below for details.

| | By Environment (Bulk) | By Service (In-App) | By Service (Env Var) |
|---|---|---|---|
| **How to Enable** | Settings page | Settings page | Environment variables |
| **Agent Version** | v7.49.0+ | v7.49.0+ | v7.49.0+ |
| **Minimum Tracer Versions** | Python ≥ 3.15.0<br>Java ≥ 1.54.0<br>.NET ≥ 3.29.0<br>PHP: N/A | Python ≥ 3.10.0<br>Java ≥ 1.48.0<br>.NET ≥ 3.29.0<br>PHP: N/A	 | Python ≥ 1.16.0<br>Java ≥ 1.47.0<br>.NET ≥ 2.53.0<br>PHP ≥ 1.12.1 |
| **Remote Configuration Required?** | Yes | Yes | No |
| **Enabled by default** | Yes | No | No |

You can enable Exception Replay in-app by toggling it through the Exception Replay Settings page for the environment or
service.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_enablement.mp4" video="true" alt="Enabling Exception Replay through the setting page" style="width:90%" >}}

If in-app enablement isn't available, set the environment variable:

```bash
DD_EXCEPTION_REPLAY_ENABLED=true

```

### Create a logs index for Exception Replay snapshots (Recommended)

Create a logs index dedicated to Exception Replay snapshots and configure it with the desired retention and no sampling.

- Set the filter to match `source:dd_debugger`.
- Ensure the index takes precedence over other indexes matching this tag (the first match wins).

<div class="alert alert-info">
<b>Why create a logs index?</b>
Exception Replay snapshots are emitted as logs enriched with links back to the originating APM spans.
</div>

### Link your source code (Recommended)

If you enable the Datadog Source Code Integration, you can see code previews directly inside your Error Tracking stack
traces. When Exception Replay snapshots are captured, you can hover over variable names in the code preview to view
their captured values.

Source Code Integration is helpful but not required.

## Sensitive data redaction

Exception Replay applies automatic identifier- and mode-based redaction to ensure sensitive data is protected before it
becomes available.

### Identifier-based redaction

Variable values associated with common sensitive identifiers (for example, `password`, `accessToken`, and similar terms)
are scrubbed before snapshots leave the host. Additional language-specific redaction rules are built into each tracer
(for example, the Python tracer maintains a list of default sensitive identifiers).

You can extend redaction behavior through:

- Custom identifier-based redaction
- Class/type-based redaction rules
- Sensitive Data Scanner rules

See the [Dynamic Instrumentation][1] and [Sensitive Data Scanner][2] documentation for configuration details.

### Mode-based redaction

Exception Replay has two redaction modes:

- **Strict Mode:** Redacts all values except numbers and Booleans.
- **Targeted Mode:** Redacts known sensitive patterns such as credit card numbers, API keys, IPs, and other PII.

These redaction modes cannot be disabled, only switched, and Targeted Mode is applied automatically in common
pre-production environments like `staging` or `preprod`.

## Troubleshooting

### Missing variable values

Exception Replay snapshots are rate-limited to **one snapshot per exception type per instance per hour**. In some
runtimes, a snapshot is only captured after the **second occurrence** for a given exception.

### Additional reasons a snapshot may not appear

- Exception Replay not enabled
- Snapshot occurred outside selected time window
- Third-party package exclusions (use `DD_THIRD_PARTY_DETECTION_EXCLUDES` to include these)
- Logs with `source:dd_debugger` missing due to [Log Index][6] retention settings or [Exclusion Filters][7] in preceding indexes

Use the query `@error.debug_info_captured:true` in Error Tracking Explorer to find errors with Exception Replay
snapshots.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/sensitive-data-scrubbing/
[2]: /security/sensitive_data_scanner/
[3]: /tracing/dynamic_instrumentation/
[4]: /tracing/guide/remote_config
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[6]: https://app.datadoghq.com/logs/pipelines/indexes
[7]: /logs/log_configuration/indexes/#exclusion-filters
