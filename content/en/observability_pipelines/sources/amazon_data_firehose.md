---
title: Amazon Data Firehose Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Amazon Data Firehose source to receive logs from Amazon Data Firehose.

## Prerequisites

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][3], using the [API][4], or with [Terraform][5]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">Only enter the identifiers for the Amazon Data Firehose address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

- Enter the identifier for your Amazon Data Firehose address. If you leave it blank, the [default](#set-secrets) is used.

### Optional settings

#### AWS authentication

Select an **AWS authentication** option. If you select **Assume role**:
1. Enter the ARN of the IAM role you want to assume.
1. Optionally, enter the assumed role session name and external ID.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Amazon Data Firehose address identifier:
	- References the socket address on which the Observability Pipelines Worker listens to receive logs.
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
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline