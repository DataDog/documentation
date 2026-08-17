---
title: Instrumenting a Python Cloud Run Container In-Container
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /serverless/google_cloud_run/containers/in_process/python
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/'
    tag: 'Documentation'
    text: 'Tracing Python Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/python/'
    tag: 'Documentation'
    text: 'Correlating Python Logs and Traces'
---

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/python">available on GitHub</a>.</div>

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

2. **Install serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run\", \"python\", \"path/to/your/python/app.py\"" %}}

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

   For more information, see [Correlating Python Logs and Traces][3].

4. **Configure your application**.

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

7. **Enable profiling (preview)**.

   To enable the [Continuous Profiler][6], set the environment variable `DD_PROFILING_ENABLED=true`.

   <div class="alert alert-info">Datadog's Continuous Profiler is available in preview for Google Cloud Run services.</div>

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Distributed tracing with Pub/Sub

To get end-to-end distributed traces between Pub/Sub producers and Cloud Run services, set `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true`. This creates an inferred `gcp.pubsub.receive` span for the push request.

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

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

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
