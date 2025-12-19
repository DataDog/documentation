---
title: Amazon Data Firehose Source
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Amazon Data Firehose source to receive logs from Amazon Data Firehose. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

<div class="alert alert-danger">Only enter the identifiers for the Amazon Data Firehose address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

- Enter the identifier for your Amazon Data Firehose address. If you leave it blank, the [default](#set-secrets) is used.

### Optional settings

#### AWS authentication

Select an **AWS authentication** option. If you select **Assume role**:
1. Enter the ARN of the IAM role you want to assume.
1. Optionally, enter the assumed role session name and external ID.

#### Enable TLS

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your Amazon Data Firehose key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Amazon Data Firehose address identifier:
	- The default identifier is `SOURCE_AWS_DATA_FIREHOSE_ADDRESS`.
- Amazon Data Firehose TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_AWS_DATA_FIREHOSE_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{< /tabs >}}

## Send logs to the Observability Pipelines Worker over Amazon Data Firehose

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

### Permissions

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/