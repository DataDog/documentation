---
title: Amazon S3 Source
disable_toc: false
---

Use Observability Pipelines' Amazon S3 source to receive logs from Amazon S3. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/amazon_s3 %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

<div class="alert alert-danger">Only enter the identifiers for the Amazon S3 URL, and if applicable, the key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your Amazon S3 URL. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the AWS region.

### Optional settings

#### AWS authentication

Select an **AWS authentication** option. If you select **Assume role**:
1. Enter the ARN of the IAM role you want to assume.
1. Optionally, enter the assumed role session name and external ID.

#### Enable TLS

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your Amazon S3 key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Amazon S3 URL identifier:
	- The default identifier is `SOURCE_AWS_S3_SQS_URL`.
- Amazon S3 TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_AWS_S3_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

### Permissions

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}


[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/