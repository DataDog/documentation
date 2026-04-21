---
title: Datadog BYOC Logs Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Bring Your Own Cloud (BYOC) Logs destination to send logs to Datadog BYOC Logs.


## Prerequisites

Before configuring the destination, you need to deploy a BYOC Logs cluster. Learn how to install it in the [BYOC Logs installation section][3].

## Setup

Configure this destination when you [set up a pipeline][4]. You can set up a pipeline in the [UI][1], using the [API][5], or with [Terraform][6]. The instructions in this section are configured in the UI.

#### Optional buffering

After you select the BYOC Logs destination in the pipeline UI, you can configure buffering.

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/cloudprem_settings.png" alt="The BYOC Logs destination settings" style="width:35%;" >}}

## Secrets defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- BYOC Logs endpoint URL identifier:
	- References the intake endpoint to which Observability Pipelines sends logs. 
	- In your secrets manager:
		- Define the cluster URL, such as `http://cloudprem.acme.internal:7280`. **Note**: The URL must include the port.
		- The Worker appends `/api/v2/logs` and `/api/v1/validate` to the endpoint URL, so these endpoints must be allowed if you are using forwarding or firewall rules.
	- The default identifier is `DESTINATION_CLOUDPREM_ENDPOINT_URL`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{< img src="observability_pipelines/destinations/cloudprem_env_vars.png" alt="The install page showing the BYOC Logs environment variable field" style="width:75%;" >}}

- CloudPrem endpoint URL
	- Observability Pipelines sends logs to the BYOC Logs intake endpoint. Define the cluster URL, such as `http://cloudprem.acme.internal:7280`. **Note**: The URL must include the port.
	- The Worker appends `/api/v2/logs` and `/api/v1/validate` to the endpoint URL, so these endpoints must be allowed if you are using forwarding or firewall rules.
  - Stored as the environment variable: `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`.

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /cloudprem/install/
[4]: /observability_pipelines/configuration/set_up_pipelines/
[5]: /api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
