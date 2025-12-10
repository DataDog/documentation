---
title: Amazon Data Firehose Source
disable_toc: false
---

Use Observability Pipelines' Amazon Data Firehose source to receive logs from Amazon Data Firehose. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

1. Optionally, select an AWS authentication option. If you select **Assume role**:
    1. Enter the ARN of the IAM role you want to assume.
    1. Optionally, enter the assumed role session name and external ID.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

## Send logs to the Observability Pipelines Worker over Amazon Data Firehose

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

### Permissions

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/advanced_configurations/