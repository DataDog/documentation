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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/sidecar/python">available on GitHub</a>.</div>

## Setup

1. **Install the Datadog Python SDK**.

   Add `ddtrace` to your `requirements.txt` or `pyproject.toml`. You can find the latest version on [PyPI][1]:
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   Alternatively, you can install the SDK in your Dockerfile:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   Then, wrap your start command with `ddtrace-run`:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   For more information, see [Tracing Python applications][2].

2. **Install serverless-init as a sidecar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "YAML Deploy" %}}
   {{% gcr-install-sidecar-yaml language="python" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. You may have also set the `DD_SERVERLESS_LOG_PATH` environment variable, which defaults to `/shared-volume/logs/app.log`.

   In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. You can also set a custom format for log/trace correlation and other features. Datadog recommends setting the following environment variables:
   - `ENV PYTHONUNBUFFERED=1`: In your main container. Ensure Python outputs appear immediately in container logs instead of being buffered.
   - `ENV DD_LOGS_INJECTION=true`: In your main container. Enable log/trace correlation for supported loggers.
   - `DD_SOURCE=python`: In your sidecar container. Enable advanced Datadog log parsing.

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

   For more information, see [Correlating Python Logs and Traces][3].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

6. **Enable profiling (preview)**.

   To enable the [Continuous Profiler][6], set the environment variable `DD_PROFILING_ENABLED=true` in your application container.

   <div class="alert alert-info">Datadog's Continuous Profiler is available in preview for Google Cloud Run services.</div>

{{% serverless-init-env-vars-sidecar language="python" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Distributed tracing with Pub/Sub

To get end-to-end distributed traces between Pub/Sub producers and Cloud Run services, set `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` in the application container. This creates an inferred `gcp.pubsub.receive` span for the push request.

Configure your push subscriptions with the `--push-no-wrapper` and `--push-no-wrapper-write-metadata` flags. This moves message attributes from the JSON body to HTTP headers, allowing Datadog to extract the producer trace context.

For more information, see [Producer-aware tracing for Google Cloud Pub/Sub and Cloud Run][7] and [Payload unwrapping][8] in the Google Cloud documentation.

### Configure push subscriptions for full trace visibility

**Create a new push subscription:**

{{< code-block lang="shell" disable_copy="false" >}}
gcloud pubsub subscriptions create order-processor-sub \
  --topic=orders \
  --push-endpoint=https://order-processor-xyz.run.app/pubsub \
  --push-no-wrapper \
  --push-no-wrapper-write-metadata
{{< /code-block >}}

**Update an existing push subscription:**

{{< code-block lang="shell" disable_copy="false" >}}
gcloud pubsub subscriptions update order-processor-sub \
  --push-no-wrapper \
  --push-no-wrapper-write-metadata
{{< /code-block >}}

### Configure Eventarc Pub/Sub triggers

Eventarc Pub/Sub triggers use push subscriptions as the underlying delivery mechanism. When you create an Eventarc trigger, GCP automatically creates a managed push subscription. However, Eventarc does not expose `--push-no-wrapper-write-metadata` as a trigger creation parameter, so you must manually update the auto-created subscription.

1. **Create the Eventarc trigger:**

   {{< code-block lang="shell" disable_copy="false" >}}
gcloud eventarc triggers create order-processor-trigger \
  --destination-run-service=order-processor \
  --destination-run-region=us-central1 \
  --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
  --transport-topic=projects/my-project/topics/orders \
  --location=us-central1
{{< /code-block >}}

2. **Find the auto-created subscription:**

   {{< code-block lang="shell" disable_copy="false" >}}
gcloud pubsub subscriptions list \
  --filter="topic:projects/my-project/topics/orders" \
  --format="table(name,pushConfig.pushEndpoint)"
{{< /code-block >}}

   Example output:
   ```
   NAME                                                          PUSH_ENDPOINT
   eventarc-us-central1-order-processor-trigger-abc-sub-def      https://order-processor-xyz.run.app
   ```

3. **Update the subscription for trace propagation:**

   {{< code-block lang="shell" disable_copy="false" >}}
gcloud pubsub subscriptions update \
  eventarc-us-central1-order-processor-trigger-abc-sub-def \
  --push-no-wrapper \
  --push-no-wrapper-write-metadata
{{< /code-block >}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /profiler/
[7]: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing/
[8]: https://cloud.google.com/pubsub/docs/payload-unwrapping
