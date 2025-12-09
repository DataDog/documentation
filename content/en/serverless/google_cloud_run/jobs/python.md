---
title: Instrumenting a Python Cloud Run Job
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

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/python">available on GitHub</a>.</div>
<div class="alert alert-info">
For full visibility and access to all Datadog features in Cloud Run Jobs,
ensure you’ve <a href="http://localhost:1313/integrations/google_cloud_platform/">installed the Google Cloud integration</a>
and are using <a href="https://hub.docker.com/r/datadog/serverless-init#180">serverless-init version 1.8.0 or later</a>.
</div>

1. **Install the Datadog Python tracer**.

   Add `ddtrace` to your `requirements.txt` or `pyproject.toml`. You can find the latest version on [PyPI][1]:
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   Alternatively, you can install the tracer in your Dockerfile:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   Then, wrap your start command with `ddtrace-run`:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   **Note**: Cloud Run Jobs run to completion rather than serving requests, so auto instrumentation won't create a top-level "job" span. For end-to-end visibility, create your own root span. See the [Python Custom Instrumentation][2] instructions.

   For more information, see [Tracing Python applications][3].

2. **Install serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run\", \"python\", \"path/to/your/python/app.py\"" cloudservice="jobs" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends the following environment variables:
   - `ENV PYTHONUNBUFFERED=1`: Ensure Python outputs appear immediately in container logs instead of being buffered.
   - `ENV DD_LOGS_INJECTION=true`: Enable log/trace correlation for supported loggers.
   - `ENV DD_SOURCE=python`: Enable advanced Datadog log parsing.

   If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `structlog`:
   {{< code-block lang="python" disable_copy="false" >}}
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
{{< /code-block >}}

   For more information, see [Correlating Python Logs and Traces][4].

4. **Configure your application**.

{{% serverless-init-configure %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][5] and [view code examples][6]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /tracing/trace_collection/custom_instrumentation/python/dd-api?tab=decorator
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[4]: /tracing/other_telemetry/connect_logs_and_traces/python/
[5]: /developers/dogstatsd/?tab=python#install-the-dogstatsd-client
[6]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5

