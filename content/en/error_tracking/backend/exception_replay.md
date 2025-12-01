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
Exception Replay for APM Error Tracking is generally available for Python, Java, .NET, and PHP.
</div>

## Overview

Exception Replay captures full execution context and local variable values when an exception occurs, helping you diagnose, reproduce, and resolve issues more quickly. When an exception reoccurs, Exception Replay automatically records the surrounding state—including stack trace and variable snapshots—and surfaces this data directly in Error Tracking alongside the rest of the issue details.

{{< img src="tracing/error_tracking/error_tracking_executional_context-2.png" alt="Error Tracking Explorer Exception Replay" style="width:90%" >}}

Exception Replay uses Datadog’s underlying Dynamic Instrumentation technology and does not require redeploying your service. You can enable or disable Exception Replay at the environment level or service level, depending on your tracer version and configuration.

Exception Replay is only available in APM Error Tracking. It is not available for errors sourced from Logs or RUM.

## Requirements

Supported languages: **Python, Java, .NET, PHP**

To use Exception Replay:

- Your Datadog Agent must be **v7.49.0+** and configured for APM.
- Your application must be instrumented with:
  - `ddtrace` (Python)
  - `dd-trace-java` (Java)
  - `dd-trace-dotnet` (.NET)
  - `dd-trace-php` (PHP)

Runtime requirements vary depending on whether you enable Exception Replay in-app or manually.

Exception Replay data is only captured for APM-based exceptions.

## Exception Replay Settings

### General Setup

#### Create a Logs Index for Exception Replay snapshots (recommended)

Create a logs index dedicated to Exception Replay snapshots and configure it with the desired retention and no sampling.

- Set the filter to match `source:dd_debugger`.
- Ensure the index takes precedence over other indexes matching this tag (the first match wins).

<div class="alert alert-info">
<b>Why create a logs index?</b>  
Exception Replay snapshots are emitted as logs enriched with links back to the originating APM spans.
</div>

#### Link your Source Code (recommended)

If you enable the Datadog Source Code Integration, you will see code previews directly inside your Error Tracking stack traces. When Exception Replay snapshots are captured, you can hover over variable names in the code preview to view their captured values.

Source Code Integration is helpful but not required.

### Manage Settings by Environment

> **Note:** Environment-level enablement and redaction modes are rolling out gradually.

#### Prerequisites

- Agent v7.49.0+
- Supported runtime: Python or Java
- Minimum tracer:
  - Python: `ddtrace` ≥ 3.15.0
  - Java: `dd-trace-java` ≥ 1.54.0
- Remote Configuration enabled
- Host-level API Keys include Remote Configuration scope

#### Enable or Disable by Environment

1. Go to **APM → Error Tracking → Settings → Exception Replay**.
2. Locate the environment.
3. Toggle Exception Replay on or off.
4. Only eligible services are affected.

#### Environment-Level Redaction Modes

- **Strict Mode**: All values except numbers and booleans are redacted.
- **Targeted Mode**: Redacts sensitive values such as credit card numbers, API keys, IPs, PII.  
  Full list: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java

Targeted Mode is applied automatically to common pre-production environments.

### Manage Settings by Service

#### In-app Enablement

Prerequisites:

- Agent v7.49.0+
- Supported runtime with minimum tracer:
  - Python: ≥ 3.10.0
  - Java: ≥ 1.48.0
  - .NET: ≥ 3.29.0
- Remote Configuration enabled
- Host-level API Keys include Remote Configuration scope
- Permissions:
  - `apm-remote-configuration-write`
  - `org-management`
  - `debugger-write`

Steps:

1. Open Exception Replay Settings.
2. Select service + environment.
3. Click **Enable Exception Replay** (or Disable).

#### Manual Configuration

Manual enablement does not require Remote Configuration.

```bash
DD_EXCEPTION_REPLAY_ENABLED=true
```

Datadog recommends in-app enablement when available.

### What Happens When Enabled or Disabled

- Captures **one snapshot per exception per hour per instance**.
- Disabling stops new snapshots.
- Existing snapshots remain visible.

## Viewing Exception Replay Snapshots

1. Navigate to **APM → Error Tracking**.
2. Select an issue.
3. Scroll to Stack Trace; captured variables appear under frames.
4. Java captures snapshots after the exception.

Snapshots are also available in **APM Traces Explorer** under the **Errors** section.

## Redacting Sensitive Data

> **TO BE UPDATED**

By default, Exception Replay redacts variable data linked to sensitive identifiers such as `password` and `accessToken`.  
Full Python list: https://github.com/DataDog/dd-trace-py/blob/main/ddtrace/debugging/_redaction.py

You can configure:

- Custom identifier redaction
- Class/type-based redaction
- Sensitive Data Scanner rules

See:  
- /dynamic_instrumentation/sensitive-data-scrubbing/  
- /security/sensitive_data_scanner/

<div class="alert alert-info">
<b>Note:</b> Sensitive Data Scrubbing applies to Exception Replay snapshots by default.
</div>

## Troubleshooting

### Missing Variable Values

Exception Replay snapshots are rate-limited: **one per exception per hour per instance**.

Additional reasons a snapshot may not appear:

- Exception Replay not enabled
- Snapshot occurred outside selected time window
- Third-party package exclusions  
  Use: `DD_THIRD_PARTY_DETECTION_EXCLUDES`
- Logs with `source:dd_debugger` missing from retention or excluded

Use query: `@error.debug_info_captured:true` in Error Tracking Explorer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
