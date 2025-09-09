---
title: Google Pub/Sub Destination
disable_toc: false
---

Use Observability Pipelines' Google Pub/Sub destination to send logs to Google Pub/Sub's messaging system.

## Setup

Set up the Google Pub/Sub destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

## Prerequisites

To use the Google Pub/Sub destination, the Worker service account needs the following GCP roles:

- Pub/Sub publisher: Allows the Worker to send events to the destination.
- Pub/Sub viewer: Allows the Worker to perform health checks.
- If the role is missing, the error `Healthcheck endpoint forbidden` is logged and the Worker proceeds as usual.

### Set up the destination

1. Enter the destination project name.
1. Enter the topic.
1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in **JSON** or **Raw message**.
1. If you have a credentials JSON file, enter the path to your credentials JSON file. The credentials file must be placed under `DD_OP_DATA_DIR/config`. Alternatively, you can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path.
    - If you're using [workload identity][4] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][5].
1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Enter the log type. See [template syntax][3] if you want to route logs to different log types based on specific fields in your logs.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

- (Optional) Google Pub/Sub alternative endpoint URL
	- The Google Pub/Sub destination uses Google Pub/Sub's global endpoint (`https://pubsub.googleapis.com`) as the default.
    - If your Pub/Sub topic is configured to store messages in a specific region, you can use that endpoint instead. See [About Pub/Sub endpoints][6] for more information.
	- Stored as the environment variable: `DD_OP_DESTINATION_GCP_PUBSUB_KEY_PASS`

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax
[4]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[5]: https://cloud.google.com/docs/authentication#auth-flowchart
[6]: https://cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints