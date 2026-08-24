To get end-to-end distributed traces between Pub/Sub producers and Cloud Run, configure your push subscriptions with the `--push-no-wrapper` and `--push-no-wrapper-write-metadata` flags. This moves message attributes from the JSON body to HTTP headers, allowing Datadog to extract producer trace context and create span links.

For more information, see [Producer-aware tracing for Google Cloud Pub/Sub and Cloud Run](https://www.datadoghq.com/blog/pubsub-cloud-run-tracing/) and [Payload unwrapping](https://cloud.google.com/pubsub/docs/payload-unwrapping) in the Google Cloud documentation.

### Configure push subscriptions for full trace visibility

**Create a new push subscription:**

```shell
gcloud pubsub subscriptions create order-processor-sub \
  --topic=orders \
  --push-endpoint=https://order-processor-xyz.run.app/pubsub \
  --push-no-wrapper \
  --push-no-wrapper-write-metadata
```

**Update an existing push subscription:**

```shell
gcloud pubsub subscriptions update order-processor-sub \
  --push-no-wrapper \
  --push-no-wrapper-write-metadata
```

### Configure Eventarc Pub/Sub triggers

Eventarc Pub/Sub triggers use push subscriptions as the underlying delivery mechanism. When you create an Eventarc trigger, GCP automatically creates a managed push subscription. However, Eventarc does not expose `--push-no-wrapper-write-metadata` as a trigger creation parameter, so you must manually update the auto-created subscription.

1. **Create the Eventarc trigger:**

   ```shell
   gcloud eventarc triggers create order-processor-trigger \
     --destination-run-service=order-processor \
     --destination-run-region=us-central1 \
     --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
     --transport-topic=projects/my-project/topics/orders \
     --location=us-central1
   ```

2. **Find the auto-created subscription:**

   ```shell
   gcloud pubsub subscriptions list \
     --filter="topic:projects/my-project/topics/orders" \
     --format="table(name,pushConfig.pushEndpoint)"
   ```

   Example output:

   ```text
   NAME                                                          PUSH_ENDPOINT
   eventarc-us-central1-order-processor-trigger-abc-sub-def      https://order-processor-xyz.run.app
   ```

3. **Update the subscription for trace propagation:**

   ```shell
   gcloud pubsub subscriptions update \
     eventarc-us-central1-order-processor-trigger-abc-sub-def \
     --push-no-wrapper \
     --push-no-wrapper-write-metadata
   ```
