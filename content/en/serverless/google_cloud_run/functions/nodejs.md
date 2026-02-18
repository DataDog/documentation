---
title: Instrumenting a Node.js Cloud Run Function
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/'
  tag: 'Documentation'
  text: 'Tracing Node.js Applications'
- link: '/tracing/other_telemetry/connect_logs_and_traces/nodejs/'
  tag: 'Documentation'
  text: 'Correlating Node.js Logs and Traces'
---

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/node">available on GitHub</a>.</div>

## Setup

1. **Install the Datadog Node.js tracer**.

   1. In your main application, add `dd-trace-js`.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace --save
{{< /code-block >}}

   2. Add the following to your application code to initialize the tracer:
   {{< code-block lang="javascript" disable_copy="false" >}}
const tracer = require('dd-trace').init({
 logInjection: true,
});
{{< /code-block >}}

   For more information, see [Tracing Node.js applications][1].

2. **Install serverless-init as a sidecar**.

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. You may have also set the `DD_SERVERLESS_LOG_PATH` environment variable, which defaults to `/shared-volume/logs/app.log`.

   In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Node.js, Datadog recommend writing logs in a JSON format. For example, you can use a third-party logging library such as `winston`:
   {{< code-block lang="javascript" disable_copy="false" >}}
const tracer = require('dd-trace').init({
  logInjection: true,
});
const { createLogger, format, transports } = require('winston');

const LOG_FILE = "/shared-volume/logs/app.log"

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: LOG_FILE }),
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=nodejs` (in your sidecar container) to enable advanced Datadog log parsing.

   For more information, see [Correlating Node.js Logs and Traces][2].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [view code examples][3]. In Serverless Monitoring, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="nodejs" function="true" defaultSource="cloudrun" %}}

## Distributed tracing with Pub/Sub

To get end-to-end distributed traces between Pub/Sub producers and Cloud Run functions, configure your push subscriptions with the `--push-no-wrapper` and `--push-no-wrapper-write-metadata` flags. This moves message attributes from the JSON body to HTTP headers, allowing Datadog to extract producer trace context and create proper span links.

For more information, see [Producer-aware tracing for Google Cloud Pub/Sub and Cloud Run][4] and [Payload unwrapping][5] in the Google Cloud documentation.

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
  --event-filters="topic=projects/my-project/topics/orders" \
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

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[4]: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing/
[5]: https://cloud.google.com/pubsub/docs/payload-unwrapping

