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

Exception Replay in APM Error Tracking automatically captures production variable values to help you reproduce exceptions from Error Tracking issues.

{{< img src="tracing/error_tracking/error_tracking_executional_context-2.png" alt="Error Tracking Explorer Exception Replay" style="width:90%" >}}

## Requirements
Supported languages
: Python, Java, .NET, PHP

- Your Datadog Agent must be configured for APM.
- Your application must be instrumented with:
  - `ddtrace` for Python
  - `dd-trace-java` for Java
  - `dd-trace-dotnet` for .NET
  - `dd-trace-php` for PHP

Exception Replay is only available in APM Error Tracking. It is not available for errors sourced from Logs and RUM.

## Setup

1. Upgrade the Datadog Agent to version `7.49.0` or higher.
1. Upgrade the APM tracer library to the minimum required version or higher:
   * `ddtrace` version `2.21.9+`
   * `dd-trace-java` version `1.49.0+`
   * `dd-trace-dotnet` version `3.18.0+`
   * `dd-trace-php` version `1.12.1+`
1. Run your service with the `DD_EXCEPTION_REPLAY_ENABLED` environment variable set to `true`.
1. [Create a logs index][9] and configure it to the desired retention with no sampling.
   * Set the filter to match on the `source:dd_debugger` tag.
   * Ensure that the new index takes precedence over any others with filters that match that tag, because the first match wins.

<div class="alert alert-info">
<b>Why create a logs index?</b> When an error occurs and is captured in an APM span, Exception Replay variable snapshots are captured as logs with reference links to the APM span. When viewing the error in Error Tracking Explorer, variable snapshots from the log data display alongside stack trace details.
</div>

### Redacting sensitive data

By default, Exception Replay automatically redacts variable data linked to sensitive identifiers like `password` and `accessToken`. See the full [list of redacted identifiers][1].

Scrub Exception Replay variable snapshots for PII and other sensitive data by:
- [Creating custom identifier redaction][2]
- [Redacting based on specific classes or types][3]
- Creating a [Sensitive Data Scanner][4] rule and applying it to logs that match `source:dd_debugger`

For more information, see [Dynamic Instrumentation Sensitive Data Scrubbing][5].

<div class="alert alert-info">
<b>Note:</b> Dynamic Instrumentation is NOT a prerequisite for Sensitive Data Scrubbing. Sensitive Data Scrubbing applies to Exception Replay variable snapshots by default regardless of whether Dynamic Instrumentation is enabled on the service.
</div>

## Getting started

1. Navigate to [**APM** > **Error Tracking**][6].
2. Click an Error Tracking issue on a service with Exception Replay enabled.
3. Scroll down to the stack trace component.
4. Expand stack frames to examine captured variable values.

## Troubleshooting

### A specific error trace does not have variable values
Exception Replay variable snapshots are rate limited to ensure negligible impact on application performance. For a given exception or issue, a variable snapshot is captured at most once per hour (per instance or pod). If variable values are not visible on a trace, try these options:

- Confirm Exception Replay is enabled on the source service and environment.
- Click **View Similar Errors**.
- Expand the time range selection to find error instances with captured variable values.
- Use the search query `@error.debug_info_captured:true` in [Error Tracking Explorer][6].
- Check [Log Indexes][9] to confirm logs with the tag `source:dd_debugger` have appropriate retention and aren't affected by [Exclusion Filters][8] in preceding indexes.

[1]: https://github.com/DataDog/dd-trace-py/blob/main/ddtrace/debugging/_redaction.py
[2]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[3]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-specific-classes-or-types
[4]: /security/sensitive_data_scanner/
[5]: /dynamic_instrumentation/sensitive-data-scrubbing/
[6]: https://app.datadoghq.com/apm/error-tracking
[7]: https://app.datadoghq.com/dynamic-instrumentation/setup
[8]: /logs/log_configuration/indexes/#exclusion-filters
[9]: https://app.datadoghq.com/logs/pipelines/indexes

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
