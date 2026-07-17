---
title: Amazon S3 Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Amazon S3 source to receive logs from Amazon S3.

## Prerequisites

{{% observability_pipelines/prerequisites/amazon_s3 %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][3], using the [API][4], or with [Terraform][5]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Amazon S3 URL and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Amazon S3 source in the pipeline UI:

1. Enter the identifier for your Amazon S3 URL. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the AWS region.

### Optional settings

#### AWS authentication

Select an {{< ui >}}AWS authentication{{< /ui >}} option. If you select {{< ui >}}Assume role{{< /ui >}}:
1. Enter the ARN of the IAM role you want to assume.
1. Optionally, enter the assumed role session name and external ID.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Amazon S3 URL identifier:
	- References the URL of the SQS queue to which the S3 bucket sends the notification events.
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

## Metrics

For [component metrics][6] and [source buffer metrics][7] emitted by all sources, see the [Pipelines Usage Metrics][8] documentation. To filter or group by Amazon S3 source metrics, use the tag `component_type:aws_s3`.

### Amazon S3 metrics

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the source type.

`pipelines.sqs_message_received_messages_total`
: **Description**: The number of SQS messages received.
: **Metric type**: count

`pipelines.sqs_message_processing_succeeded_total`
: **Description**: The number of SQS messages successfully processed.
: **Metric type**: count

`pipelines.sqs_message_delete_succeeded_total`
: **Description**: The number of successful deletions of SQS messages.
: **Metric type**: count

`pipelines.sqs_message_defer_succeeded_total`
: **Description**: The number of SQS messages for which visibility-timeout deferral succeeded.
: **Metric type**: count

`pipelines.sqs_s3_event_record_ignored_total`
: **Description**: The number of S3 event records in an SQS message that were ignored because they were not `ObjectCreated` event kinds.
: **Metric type**: count

`pipelines.s3_object_processing_succeeded_duration_seconds`
: **Description**: Time, in seconds, taken to successfully process an S3 object.
: **Metric type**: distribution

`pipelines.s3_object_processing_failed_duration_seconds`
: **Description**: Time, in seconds, taken to process an S3 object that failed.
: **Metric type**: distribution

[1]: /observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
