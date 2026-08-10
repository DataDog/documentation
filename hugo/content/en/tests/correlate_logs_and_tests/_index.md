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

### Python

Requirements: `ddtrace >= 4.8.0`.

Log submission is supported for the pytest test framework, and only when logs are emitted with the standard library `logging` module.

Use the following environment variable to enable log submission for agentless mode:

| Name                                             | Description                     | Default value |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (required) | Enables/disables log submission | `false`       |

If you use the **Datadog Agent** instead of agentless mode, set instead `DD_LOGS_INJECTION=true` in the environment.

#### Out-of-process logs

When a separate process executes code triggered by a test, it needs a `trace_id` and `span_id` from that test trace to correlate its logs. Use `ddtrace.testing.logs.DDTestLogsHandler` (`ddtrace >= 4.11.0`) to ship those log records to the Datadog logs intake, correlated with the originating test trace.

`DDTestLogsHandler` reads the same environment variables as the pytest plugin to detect the backend (agentless or EVP proxy). It is available in any subprocess where those variables are available.

**Agentless mode** (set `DD_CIVISIBILITY_AGENTLESS_ENABLED=true`):

| Variable     | Description     | Default         |
| ------------ | --------------- | --------------- |
| `DD_API_KEY` | Datadog API key | (required)      |
| `DD_SITE`    | Datadog site    | `datadoghq.com` |

**Agent/EVP proxy mode** (default):

| Variable                  | Description    | Default     |
| ------------------------- | -------------- | ----------- |
| `DD_TRACE_AGENT_URL`      | Full agent URL | -           |
| `DD_TRACE_AGENT_HOSTNAME` | Agent hostname | `localhost` |
| `DD_TRACE_AGENT_PORT`     | Agent port     | `8126`      |

##### Thread-per-worker

For one thread per test worker, use `ThreadLocalCorrelationFilter` to associate each thread's log records with the correct test trace:

```python
import logging
from ddtrace.testing.logs import DDTestLogsHandler, ThreadLocalCorrelationFilter

with DDTestLogsHandler(service="my-service") as handler:
    correlation = ThreadLocalCorrelationFilter()
    handler.addFilter(correlation)
    logging.getLogger().addHandler(handler)

    while True:
        job = queue.get()  # queue and run_test are provided by your worker framework
        correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
        run_test(job.item)
```

`DDTestLogsHandler` flushes buffered records automatically when used as a context manager. Call `handler.close()` if you do not use the context manager form.

##### Asyncio workers

For asyncio-based workers, `ThreadLocalCorrelationFilter` is not compatible with asyncio-based workers because thread-local storage does not propagate across `asyncio.Task` boundaries. Subclass `CorrelationFilter` and use a `contextvars.ContextVar` instead, which the event loop propagates automatically across `await` boundaries:

```python
import asyncio
import contextvars
import logging
from ddtrace.testing.logs import CorrelationFilter, DDTestLogsHandler

class ContextVarCorrelationFilter(CorrelationFilter):
    def __init__(self):
        super().__init__()
        self._trace_id = contextvars.ContextVar("dd_trace_id", default=None)
        self._span_id = contextvars.ContextVar("dd_span_id", default=None)

    def set_context(self, trace_id, span_id):
        self._trace_id.set(trace_id)
        self._span_id.set(span_id)

    def get_trace_id(self):
        return self._trace_id.get()

    def get_span_id(self):
        return self._span_id.get()

async def run_one(job, correlation):
    correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
    await run_test(job.item)

async def main(jobs):
    with DDTestLogsHandler(service="my-service") as handler:
        correlation = ContextVarCorrelationFilter()
        handler.addFilter(correlation)
        logging.getLogger().addHandler(handler)
        await asyncio.gather(*(run_one(job, correlation) for job in jobs))
```

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
