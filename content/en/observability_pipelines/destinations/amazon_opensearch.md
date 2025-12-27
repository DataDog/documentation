---
title: Amazon OpenSearch Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Amazon OpenSearch destination to send logs to Amazon OpenSearch.

## Setup

Set up the Amazon OpenSearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifiers for the Amazon OpenSearch endpoint URL, and if applicable, username and password. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your Amazon OpenSearch endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. (Optional) Enter the name of the Amazon OpenSearch index. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.
1. Select an authentication strategy, **Basic** or **AWS**. If you selected:
	- **Basic**:
		- Enter the identifier for your Amazon OpenSearch username. If you leave it blank, the [default](#set-secrets) is used.
		- Enter the identifier for your Amazon OpenSearch password. If you leave it blank, the [default](#set-secrets) is used.
	- **AWS**:
		1. Enter the AWS region.
		1. (Optional) Select an AWS authentication option. The **Assume role** option should only be used if the user or role you created earlier needs to assume a different role to access the specific AWS resource and that permission has to be explicitly defined.<br>If you select **Assume role**:
			1. Enter the ARN of the IAM role you want to assume.
			1. Optionally, enter the assumed role session name and external ID.
1. (Optional) Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Amazon OpenSearch endpoint URL identifier:
	- The default identifier is `DESTINATION_AMAZON_OPENSEARCH_ENDPOINT_URL`.
- Amazon OpenSearch authentication username identifier:
	- The default identifier is `DESTINATION_AMAZON_OPENSEARCH_USERNAME`.
- Amazon OpenSearch authentication password identifier:
	- The default identifier is `DESTINATION_AMAZON_OPENSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax