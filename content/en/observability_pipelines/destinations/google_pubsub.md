---
title: Google Pub/Sub Destination
disable_toc: false
---

## Overview

Use Observability Pipelines' Google Pub/Sub destination to publish logs to the Google Pub/Sub messaging system, so the logs can be sent to downstream services, data lakes, or custom applications.

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
	- `roles/pubsub.viewer` is recommended for health checks.
		- If the role is missing, the error `Healthcheck endpoint forbidden` is logged and the Worker proceeds as usual.
	- See [Available Pub/Sub roles][3] for more information.

### Set up a service account for the Worker

A service account in Google Cloud is a type of account used only by applications or services.
- It has its own identity and credentials (a JSON key file).
- You assign it IAM roles so it can access specific resources.
- In this case, the Observability Pipelines Worker uses a service account to authenticate and send logs to Pub/Sub on your behalf.

To authenticate using a service account:

1. In the Google Cloud console, navigate to **IAM & Admin** > **[Service Accounts][4]**.
1. Click **+ Create service account**.
1. Enter a name and click **Create and continue**.
1. Assign roles:
	- **Pub/Sub Publisher**
	- **Pub/Sub Viewer**
1. Click **Done**.

#### Authentication methods

After you've created the service account with the correct roles, set up one of the following authentication methods:

##### Option A: Workload Identity method (for GKE, recommended)

1. Bind the service account to a Kubernetes service account (KSA).
1. Allow the service account to be impersonated by that KSA.
1. Annotate the KSA so the GKE knows which service account to use.
1. Authentication then comes from the GCP's metadata server.

##### Option B: Attach the GSA directly to a VM (for Google Compute Engine)

Use this authentication method if you're running the Observability Pipelines Worker on a Google Compute Engine (GCE) VM.
- When you create or edit the VM, specify the Google service account under **Identity and API access** > **Service account**.

##### Option C: Run the service as the GSA (for Cloud Run or Cloud Functions)

Use this authentication method if you're deploying the Worker as a Cloud Run service or Cloud Function.
- In the Cloud Run or Cloud Functions deployment settings, set the **Execution service account** to the Google service account you created.

##### Option D: JSON key method (any environment without identity bindings)

1. Open the new service account and navigate to **Keys** > **Add key** > **Create new key**.
1. Choose the JSON format.
1. Save the downloaded JSON file in a secure location.
1. After you install the Worker, copy or mount JSON the file into `DD_OP_DATA_DIR/config/`.
You reference this file in the Google Pub/Sub destination's **Credentials path** field when you [set up the destination](#set-up-the-destination) in the Pipelines UI.

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
	- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
	- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
	- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
- Toggle the switch to enable **Buffering Options** (Preview).<br>**Note**: Contact your account manager to request access to the Preview.
	- If disabled (default): Up to 500 events are buffered before flush.
	- If enabled:
		1. Select the buffer type you want to set.
			- **Memory**: Fast, limited by RAM
			- **Buffer size**: Durable, survives restarts
		1. Enter the buffer size and select the unit.
			- Maximum capacity in MB or GB.

{{< img src="observability_pipelines/destinations/google_pubsub_settings.png" alt="The google pub/sub destination with sample values" style="width:30%;" >}}

### Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Google Pub/Sub endpoint URL identifier (optional):
	- The default identifier is `DESTINATION_GCP_PUBSUB_ENDPOINT_URL`.
- Google Pub/Sub TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_GCP_PUBSUB_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

#### Optional alternative Pub/Sub endpoints

{{< img src="observability_pipelines/destinations/google_pubsub_env_var.png" alt="The install page showing the Google Pub/Sub environment variable field" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

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

{{% observability_pipelines/metrics/component %}}

#### Buffer metrics (when buffering is enabled)

{{% observability_pipelines/metrics/buffer %}}

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][6] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[6]: /observability_pipelines/destinations/#event-batching
[7]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
