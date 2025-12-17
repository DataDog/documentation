---
title: Google Chronicle Destination
disable_toc: false
---
Use Observability Pipelines' Google Chronicle destination to send logs to Google Chronicle.

The Observability Pipelines Worker uses standard Google authentication methods. See [Authentication methods at Google][3] for more information about choosing the authentication method for your use case.

## Setup

Set up the Google Chronicle destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

To set up the Worker's Google Chronicle destination:

1. Enter the identifier for your Google Chronicle endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
	- **Note**: Only enter the identifier for the endpoint URL. Do **not** enter the actual URL.
1. Enter the customer ID for your Google Chronicle instance.
1. If you have a credentials JSON file, enter the path to your credentials JSON file. The credentials file must be placed under `DD_OP_DATA_DIR/config`. Alternatively, you can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path.
    - If you're using [workload identity][6] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][7].
1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Enter the log type. See [template syntax][4] if you want to route logs to different log types based on specific fields in your logs.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

**Note**: Logs sent to the Google Chronicle destination must have ingestion labels. For example, if the logs are from a A10 load balancer, it must have the ingestion label `A10_LOAD_BALANCER`. See Google Cloud's [Support log types with a default parser][5] for a list of available log types and their respective ingestion labels.

### Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Google Chronicle endpoint URL identifier:
	- The default identifier is `DESTINATION_GOOGLE_CHRONICLE_UNSTRUCTURED_ENDPOINT_URL`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{< /tabs >}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 15                  |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: https://cloud.google.com/docs/authentication#auth-flowchart
[4]: /observability_pipelines/destinations/#template-syntax
[5]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
[6]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[7]: https://cloud.google.com/docs/authentication#auth-flowchart