---
title: Instrumenting a Python Cloud Run Container with Sidecar
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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/sidecar/python">available on GitHub</a>.</div>

1. **Install the Datadog Python tracer** in your Dockerfile.

   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install --target /dd_tracer/python/ ddtrace
{{< /code-block >}}

   For more information, see [Tracing Python applications][1].

2. **Install serverless-init as a sidecar**.

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "YAML Deploy" %}}
   {{% gcr-install-sidecar-yaml language="python" %}}
   {{% /tab %}}

   {{% tab "Custom" %}}
   {{% gcr-install-sidecar-custom %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. Additionally, you set the `DD_SERVERLESS_LOG_PATH` env var, or it was defaulted to `/shared-volume/logs/app.log`.

   Now, you will need to configure your logging library to write logs to that file. You can also set a custom format for log/trace correlation and other features. Datadog recommends setting the following environment variables:
   - `ENV PYTHONUNBUFFERED=1`: Ensure Python outputs appear immediately in container logs instead of being buffered.
   - `ENV DD_SOURCE=python`: Enable advanced Datadog log parsing.

   Then, update your logging library. For example, you can use Python's native `logging` library:
   {{< code-block lang="python" disable_copy="false" >}}
LOG_FILE = "/shared-logs/logs/app.log"
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
        '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
        '- %(message)s')

logging.basicConfig(
    level=logging.INFO,
    format=FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

logger.info('Hello world!')
{{< /code-block >}}

   For more information, see [Correlating Python Logs and Traces][2].

{{% gcr-env-vars instrumentationMethod="sidecar" language="python" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /tracing/other_telemetry/connect_logs_and_traces/python/
