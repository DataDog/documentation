---
title: Correlate Logs and Tests
description: Correlate your logs with your test traces.
further_reading:
    - link: '/tests'
      tag: 'Documentation'
      text: 'Learn about Test Optimization'
---

## Overview

You can correlate Test Optimization data with [logs injected into Datadog][1], which allows you to view and analyze logs for specific test cases.

{{< img src="continuous_integration/correlate_logs_and_tests.png"
  alt="Examine logs for specific test cases with logs and tests correlation." style="width:90%" >}}

## Setup

Correlation can be configured differently depending on how you [send your tests data to Datadog][2].

{{< tabs >}}
{{% tab "Cloud CI provider (Agentless)" %}}

### Java

Agentless log submission is supported for the following languages and frameworks:

-   `dd-trace-java >= 1.35.2` and Log4j2.

Use the following environment variables to enable and configure Agentless log submission:

| Name                                                | Description                                 | Default value |
| --------------------------------------------------- | ------------------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (required)    | Enables/disables log submission             | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_LEVEL` (optional)      | Sets log level for Agentless submission     | `INFO`        |
| `DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE` (optional) | Sets the maximum size of pending logs queue | `1024`        |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (optional)        | Sets custom URL for submitting logs         | -             |

### Javascript/Typescript

Agentless log submission is supported for the following languages and frameworks:

-   `dd-trace-js >= 5.24.0` and `dd-trace-js >= 4.48.0` and `winston`.

Use the following environment variables to enable and configure Agentless log submission:

| Name                                             | Description                         | Default value |
| ------------------------------------------------ | ----------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (required) | Enables/disables log submission     | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (optional)     | Sets custom URL for submitting logs | -             |

### .NET

Agentless log submission is supported for the following languages and frameworks:

-   `dd-trace-dotnet >= 2.50.0` and XUnit TestOutputHelper.

Use the following environment variables to enable and configure Agentless log submission:

| Name                                      | Description                                   | Default value |
| ----------------------------------------- | --------------------------------------------- | ------------- |
| `DD_CIVISIBILITY_LOGS_ENABLED` (required) | Enables/disables CI Visibility log submission | `false`       |

### Swift

Use the following environment variables to enable and configure log submission:

| Name                               | Description                            | Default value |
| ---------------------------------- | -------------------------------------- | ------------- |
| `DD_ENABLE_STDOUT_INSTRUMENTATION` | Enables/disables stdout log submission | `false`       |
| `DD_ENABLE_STDERR_INSTRUMENTATION` | Enables/disables stderr log submission | `false`       |

### Ruby

Agentless logs submission with Test Optimization is supported for Rails applications. Before enabling, ensure
that your application is [instrumented with Datadog tracing][1].

To use agentless log submission, you need `datadog-ci` version `0.16` or later. The following logging libraries are supported:

-   `activesupport >= 5.0` (only when using `ActiveSupport::TaggedLogging`)
-   `lograge >= 0.14`
-   `semantic_logger >= 4.0`

Use the following environment variable to enable log submission:

| Name                                             | Description                     | Default value |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (required) | Enables/disables log submission | `false`       |

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#rails-or-hanami-applications

{{% /tab %}}
{{% tab "On-Premises CI provider (Datadog Agent)" %}}

1. [Set up log collection][1] through the Datadog Agent.
2. Follow the steps described in [Correlate Logs and Traces][2].

[1]: /logs/log_collection/
[2]: /tracing/other_telemetry/connect_logs_and_traces/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /tests/setup/
