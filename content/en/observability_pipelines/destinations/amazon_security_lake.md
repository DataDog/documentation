---
title: Amazon Security Lake Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' Amazon Security Lake destination to send logs to Amazon Security Lake.

## Prerequisites

You need to do the following before setting up the Amazon Security Lake destination:

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

## Setup

Set up the Amazon Security Lake destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

**Notes**:
- When you add the Amazon Security Lake destination, the OCSF processor is automatically added so that you can convert your logs to Parquet before they are sent to Amazon Security Lake. See [Remap to OCSF documentation][3] for setup instructions.
- Only logs formatted by the OCSF processor are converted to Parquet.

### Set up the destination

1. Enter your S3 bucket name.
1. Enter the AWS region.
1. Enter the custom source name.

#### Optional settings

##### AWS authentication

1. Select an [AWS authentication][5] option.
1. Enter the ARN of the IAM role you want to assume.
1. Optionally, enter the assumed role session name and external ID.

##### Enable TLS

<div class="alert alert-danger">Only enter the identifier for the TLS key pass. Do <b>not</b> enter the actual value.</div>

{{% observability_pipelines/tls_settings %}}

##### Buffering

{{% observability_pipelines/destination_buffer %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Amazon Security Lake TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_AWS_SECURITY_LAKE_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permissions

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 256               | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/processors/remap_ocsf
[5]: /observability_pipelines/destinations/amazon_security_lake/#aws-authentication