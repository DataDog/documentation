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

Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "path/to/your/python/app.py"]
```

{{% collapse-content title="Explanation" level="h4" %}}

1. Copy the Datadog `serverless-init` into your Docker image.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-python).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. Execute your binary application wrapped in the tracer. Adapt this line to your needs.
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "path/to/your/python/app.py"]
   ```

{{% /collapse-content %}}

{{% collapse-content title="Alternative configuration" level="h4" id="alt-python" %}}

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "path/to/your/python/app.py"]
```

{{% /collapse-content %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

We also recommend the following environment variables:
- `ENV PYTHONUNBUFFERED=1`: Ensure Python outputs appear immediately in container logs instead of being buffered.
- `ENV DD_SOURCE=python`: Enable Datadog log parsing. For more information, see [Correlating Python Logs and Traces][2].

If you want multiline logs to be preserved in a single log message, we recommend writing your logs in JSON format. For example:
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

## 4. Configure your application

{{% gcr-configure-env-vars %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /tracing/other_telemetry/connect_logs_and_traces/python/
