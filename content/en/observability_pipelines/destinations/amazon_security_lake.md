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

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.
**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][4] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your Amazon Security Lake key pass. If you leave it blank, the [default](#set-secrets) is used.
    - **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

##### Buffering options

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

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 256,000,000     | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/processors/remap_ocsf
[4]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[5]: /observability_pipelines/destinations/amazon_security_lake/#aws-authentication