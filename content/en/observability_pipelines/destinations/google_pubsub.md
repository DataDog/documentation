---
title: Google Pub/Sub Destination
disable_toc: false
---

## Overview

Use Observability Pipelines' Google Pub/Sub source to pull logs from the Google Cloud Pub/Sub messaging system, so the logs can be sent to downstream services, data lakes, or custom applications.

### When to use this destination

Common scenarios when you might use this destination:
- For analytics pipelines: Route logs downstream into Google BigQuery, Data Lake, or custom machine learning workflows.
- For event-driven processing: Publish logs to a Pub/Sub topic so that Google Cloud Functions, Cloud Run functions, and Dataflow jobs can carry out actions in real time based on the log data.

## Prerequisites

Before you configure the destination, you need the following:

- Pub/Sub subscription: Create a Pub/Sub topic and at least one subscription to consume the messages.
- Authentication: Set up a [standard Google Cloud authentication method][2]. These options include:
	- A service account key (JSON file)
	- A workload identity (Google Kubernetes Engine (GKE))
- IAM roles:
	- `roles/pubsub.publisher` is required for publishing events.
	- `roles/pubsub.viewer` is recommended for heath checks.
		- If the role is missing, the error `Healthcheck endpoint forbidden` is logged and the Worker proceeds as usual.
	- See [Available Pub/Sub roles][3] for more information.

### Optional service account setup for the Worker

A service account in Google Cloud is a type of account used only by application or services.
- It has its own identity and credentials (a JSON key file).
- You assign it IAM roles so it can access specific resources.
- In this case, the Observability Pipelines Worker uses a service account to authenticate and send logs to Pub/Sub on your behalf.

If you are authenticating using a service account:

1. In the Google Cloud console, navigate to **IAM & Admin** > **[Service Accounts][4]**.
1. Click **+ Create service account**.
1. Enter a name and click **Create and continue**.
1. Assign roles:
	- **Pub/Sub Publisher**
	- **Pub/Sub Viewer**
1. Click **Done**.
1. Open the new service account **Keys** > **Add key** > **Create new key**.
	1. Choose **JSON** format.
	1. Save the downloaded JSON file.
	1. Place the JSON file under: `DD_OP_DATA_DIR/config`. You reference this file when you [set up the Google Pub/Sub destination](#set-up-the-destination) later on.

## Setup

Set up the Google Pub/Sub destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

1. Enter the destination project name.
	- This is the GCP project where your Pub/Sub topic lives.
1. Enter the topic.
	- This is the Pub/Sub topic to publish logs to.
1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in **JSON** or **Raw message**.
	- **JSON**: Logs are structured as JSON (recommended if downstream tools need structured data).
	- **Raw**: Logs are sent as raw strings (preserves the original format).
1. If you have a credentials JSON file, enter the path to your credentials JSON file.
	- If you using a service account JSON: enter the path `DD_OP_DATA_DIR/config/<your-service-account>.json`.
	- Or set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.
	- Credentials are automatically managed if you're using [workload identity][7] on GKE.

#### Optional settings

- Toggle the switch to **Enable TLS** if your organization requires secure connections with custom certificates.
	- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
	- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
	- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
- Toggle the switch to enable **Buffering Options** (Preview).<br>**Note**: Contact your account manager to request access to the Preview.
	- If disabled (default): Up to 500 events are buffered before flush.
	- If enabled:
		1. Select the buffer type you want to set.
			- **Memory**: Fast, limited by RAM
			- **Buffer size**: Durable, survives restarts
		1. Enter the buffer size and select the unit.
			- Maximum capacity in MB or GB.

{{< img src="observability_pipelines/destinations/google_pubsub.png" alt="The google pub/sub destination with sample values" style="width:30%;" >}}

### Set environment variables

#### Optional alternative Pub/Sub endpoints

{{< img src="observability_pipelines/destinations/google_pubsub_env_var.png" alt="The install page showing the Google Pub/Sub environment variable field " style="width:70%;" >}}

By default the Worker sends data to the global endpoint: `https://pubsub.googleapis.com`.

If your Pub/Sub topic is region-specific, configure the Google Pub/Sub alternative endpoint URL with the regional endpoint. See [About Pub/Sub endpoints][5] for more information.

Stored as the environment variable: `DD_OP_DESTINATION_GCP_PUBSUB_ENDPOINT_URL`.

## Troubleshooting

Common issues and fixes:
- Healthcheck forbidden
	- Check the `roles/pubsub.viewer` IAM role.
- Permission denied
	- Ensure the service account has `roles/pubsub.publisher`.
- Authentication errors
	- Verify the credentials JSON path or GKE Workload Identity setup.
- Dropped events
	- Check the `pipelines.component_discarded_events_total` and `pipelines.buffer_discarded_events_total` metrics.
	- Increase the buffer size or fix misconfigured filters as needed to resolve the issue.
- High latency
	- Reduce buffer sizer and timeout, or scale your Workers.
- No logs are arriving
	- In your Google Pub/Sub destination setup, double-check the topic name, project, and Pub/Sub endpoint (global vs regional).

## How the destination works

### Worker health metrics

See the [Observability Pipelines Metrics][8] for a full list of available health metrics.

#### Component metrics

Monitor the health of your Pub/Sub destination with the following key metrics:

`pipelines.component_sent_events_total`
: Events successfully delivered.

`pipelines.component_discarded_events_total`
: Events dropped.

`pipelines.component_errors_total`
: Errors in the destination component.

`pipelines.component_sent_event_bytes_total`
: Total event bytes sent.

`pipelines.utilization`
: Worker resource usage.

#### Buffer metrics (when buffering is enabled)

Track buffer behavior with these additional metrics:

`pipelines.buffer_events`
: Number of events currently in the buffer.

`pipelines.buffer_byte_size`
: Current buffer size in bytes.

`pipelines.buffer_received_events_total`
: Total events added to the buffer.

`pipelines.buffer_received_event_bytes_total`
: Total bytes added to the buffer.

`pipelines.buffer_sent_events_total`
: Total events successfully flushed from the buffer.

`pipelines.buffer_sent_event_bytes_total`
: Total bytes successfully flushed from the buffer.

`pipelines.buffer_discarded_events_total`
: Events discarded from the buffer (for example, due to overflow).

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][6] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[5]: https://cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints
[6]: /observability_pipelines/destinations/#event-batching
[7]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[8]: /observability_pipelines/monitoring/metrics/
