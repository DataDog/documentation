---
title: Instrumenting a Python Cloud Run Container In-Process
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/'
    tag: 'Documentation'
    text: 'Tracing Python Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/python/'
    tag: 'Documentation'
    text: 'Correlating Python Logs and Traces'
---

## 1. Install the Tracer

Install the tracer in your Dockerfile:

```Dockerfile
RUN pip install --target /dd_tracer/python/ ddtrace
```

For more information, see [Tracing Python applications][1].

## 2. Install Serverless-Init

{{% gcr-install-serverless-init cmd="\"/dd_tracer/python/bin/ddtrace-run\", \"python\", \"path/to/your/python/app.py\"" %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

We also recommend the following environment variables:
- `ENV PYTHONUNBUFFERED=1`: Ensure Python outputs appear immediately in container logs instead of being buffered.
- `ENV DD_SOURCE=python`: Enable advanced Datadog log parsing.

If you want multiline logs to be preserved in a single log message, we recommend writing your logs in JSON format. For example, you can use a third-party logging library such as `structlog`:
```python
import structlog

def tracer_injection(logger, log_method, event_dict):
    event_dict.update(tracer.get_log_correlation_context())
    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.EventRenamer("msg"),
        structlog.processors.JSONRenderer()
    ],
    logger_factory=structlog.WriteLoggerFactory(file=sys.stdout),
)

logger = structlog.get_logger()

logger.info("Hello world!")
```

For more information, see [Correlating Python Logs and Traces][2].

## 4. Configure your application

{{% gcr-configure-env-vars language="python" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /tracing/other_telemetry/connect_logs_and_traces/python/
