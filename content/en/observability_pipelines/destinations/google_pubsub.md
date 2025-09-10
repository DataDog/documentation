---
title: Google Pub/Sub Destination
disable_toc: false
---

Use Observability Pipelines' Google Pub/Sub destination to send logs to Google Pub/Sub's messaging system.

## Setup

Set up the Google Pub/Sub destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

## Prerequisites

To use the Google Pub/Sub destination:

- A Pub/Sub subscription is required.
- A standard Google authentication method setup is required for the Worker. See [Authentication methods at Google][2] for more information about choosing the authentication method for your use case.
- The Pub/Sub IAM role `roles/pubsub.publisher` is required and `roles/pubsub.viewer` is recommended. See [Available Pub/Sub roles][3] for more information.
	- The Pub/Sub publisher role allows the Worker to send events to the destination.
	- The Pub/Sub viewer role allows the Worker to perform health checks.
		- If the role is missing, the error `Healthcheck endpoint forbidden` is logged and the Worker proceeds as usual.

### Set up a service account for the Worker

If you want to set up a service account for the Worker, do the following:

1. In the Google Cloud console, navigate to [Service Accounts][4].
1. Click **+ Create service account**.
1. Enter the service account name.
1. Click **Create and continue**.
1. Select the **Pub/Sub Publisher** role.
1. Click **+ Add another role**.
1. Select the **Pub/Sub Viewer** role.
1. Click **Done**.
1. On the **Service accounts** page, click the services account you just created.
1. Click **Keys**.
1. Click **Add key** and select **Create new key**.
1. Leave **JSON** as the key type and click **Create**. The credential file is automatically downloaded. Place the file under `DD_OP_DATA_DIR/config`. You reference this file when you [set up the Google Pub/Sub destination](#set-up-the-destination) later on.

### Set up the destination

1. Enter the destination project name.
1. Enter the topic.
1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in **JSON** or **Raw message**.
1. If you have a credentials JSON file, enter the path to your credentials JSON file. This is the credentials file you downloaded if you had set up the Worker services account in [Prerequisite](#prerequisites). The credentials file must be placed under `DD_OP_DATA_DIR/config`. Alternatively, you can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path.
    - If you're using [workload identity][4] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][2].
1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.
	- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
	- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
	- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

- (Optional) Google Pub/Sub alternative endpoint URL
	- The Google Pub/Sub destination uses Google Pub/Sub's global endpoint (`https://pubsub.googleapis.com`) as the default.
    - If your Pub/Sub topic is configured to store messages in a specific region, enter the endpoint for that region in the **Google Pub/Sub alternative endpoint URL** field. See [About Pub/Sub endpoints][5] for more information.
	- Stored as the environment variable: `DD_OP_DESTINATION_GCP_PUBSUB_KEY_PASS`.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][6] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 10,000,000      | 1                   |

[4]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[5]: https://cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints
[6]: /observability_pipelines/destinations/#event-batching
