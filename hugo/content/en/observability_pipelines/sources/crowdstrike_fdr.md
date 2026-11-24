---
title: CrowdStrike Falcon Data Replicator (FDR) Source
description: Learn how to collect CrowdStrike Falcon Data Replicator logs using the Observability Pipelines Worker.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
further_reading:
- link: "/observability_pipelines/packs/crowdstrike/"
  tag: "Documentation"
  text: "CrowdStrike FDR pack"
- link: "/observability_pipelines/sources/amazon_s3/"
  tag: "Documentation"
  text: "Amazon S3 source"
---

{{< product-availability >}}

## Overview

CrowdStrike Falcon Data Replicator (FDR) exports raw event data from the CrowdStrike Falcon platform. Use Observability Pipelines' CrowdStrike FDR source to receive logs directly from an FDR feed that uses a CrowdStrike hosted storage bucket. CrowdStrike stores FDR data in a CrowdStrike-managed Amazon S3 bucket. For each new batch of files, CrowdStrike sends a notification to a CrowdStrike-managed Amazon SQS queue. The Worker polls the queue, reads the files listed in each notification, and then deletes the message from the queue.

**Note**: The CrowdStrike FDR source requires Worker version 2.26.0 or later.

<div class="alert alert-warning">An FDR feed supports only one consumer. Each SQS message is deleted after it is read, and messages cannot be replayed. Do not connect multiple log pipelines or tools to the same FDR queue. If multiple consumers read from the same queue, each one receives only part of the data. If another tool already reads from your FDR feed, stop it before setting up this source.</div>

### Choose a setup based on where FDR stores your data

An FDR feed stores data in either a CrowdStrike hosted storage bucket or an S3 bucket that you own. The Observability Pipelines source you use depends on which storage the feed uses.

| Setting        | CrowdStrike hosted storage bucket | Customer-owned bucket               |
|----------------|-----------------------------------|-------------------------------------|
| Source         | CrowdStrike FDR source            | [Amazon S3 source][1]               |
| Authentication | Feed client ID and secret         | Your AWS credentials or an IAM role |

The rest of this page covers the CrowdStrike hosted storage bucket. For a customer-owned bucket, set up the [Amazon S3 source][1] with the SQS queue that receives the bucket's event notifications.

## Prerequisites

To use Observability Pipelines' CrowdStrike FDR source, you need an FDR feed that uses a CrowdStrike hosted storage bucket. The source authenticates with the feed's client ID and secret. Because CrowdStrike manages the bucket and queue, assuming an IAM role is not supported.

To create the feed, follow CrowdStrike's [Create an FDR feed][2] instructions with these settings:

- For {{< ui >}}Storage{{< /ui >}}, choose {{< ui >}}CrowdStrike hosted storage bucket{{< /ui >}} then select the events to include in the feed.
- On the {{< ui >}}Copy feed credentials{{< /ui >}} page, copy the values in the following table. You need them when you set up the source.

    | CrowdStrike value | Observability Pipelines setting                | Default secret identifier                      |
    |-------------------|------------------------------------------------|------------------------------------------------|
    | Notifications URL | {{< ui >}}SQS Queue URL Key{{< /ui >}}         | `SOURCE_CROWDSTRIKE_FDR_SQS_URL`               |
    | Client ID         | {{< ui >}}AWS Access Key ID Key{{< /ui >}}     | `SOURCE_CROWDSTRIKE_FDR_AWS_ACCESS_KEY_ID`     |
    | Secret            | {{< ui >}}AWS Secret Access Key Key{{< /ui >}} | `SOURCE_CROWDSTRIKE_FDR_AWS_SECRET_ACCESS_KEY` |
    | Storage region    | {{< ui >}}AWS Region{{< /ui >}}                | Not applicable. Select the region in the UI.   |

    <div class="alert alert-warning">CrowdStrike shows the feed secret only once. Copy it before you close the page. To get a new secret, you must reset the feed credentials.</div>

## Setup

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the SQS URL, AWS access key ID, AWS secret access key, and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

Set up this source when you [set up a pipeline][3]. You can set up a pipeline in the [UI][4], using the [API][5], or with [Terraform][6]. The instructions in this section are for setting up the source in the UI.

After you select the CrowdStrike FDR source in the pipeline UI:

1. Enter the identifier for your SQS queue URL in {{< ui >}}SQS Queue URL Key{{< /ui >}}. The identifier references your feed's notifications URL, such as `https://sqs.us-west-2.amazonaws.com/123456789012/cs-example-queue`. If you leave the identifier field blank, the [default][7] is used.
1. Enter the identifier for your AWS access key ID in {{< ui >}}AWS Access Key ID Key{{< /ui >}}. If you leave it blank, the [default][7] is used.
1. Enter the identifier for your AWS secret access key in {{< ui >}}AWS Secret Access Key Key{{< /ui >}}. If you leave it blank, the [default][7] is used.
1. Select the {{< ui >}}AWS Region{{< /ui >}} of your FDR feed, such as `us-west-2`. Use the storage region from the {{< ui >}}Copy feed credentials{{< /ui >}} page.

{{< img src="observability_pipelines/sources/crowdstrike_fdr_settings.png" alt="The CrowdStrike FDR source settings in the pipeline UI, showing the SQS Queue URL Key, AWS Access Key ID Key, AWS Secret Access Key Key, AWS Region, and optional settings" style="width:45%;" >}}

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### SQS settings

- {{< ui >}}Visibility timeout{{< /ui >}}: Enter the number of seconds a received SQS message is hidden from other receivers while the Worker processes its files.
    - Minimum value is `0`. Maximum value is `43200` (12 hours). Default is `300` (5 minutes).
    - If the Worker takes longer than the timeout to process the files in a message, the message is delivered again, which can result in duplicate logs. Increase the visibility timeout value if your feed contains large files.
- {{< ui >}}Number of receivers{{< /ui >}}: Enter the number of concurrent tasks polling the SQS queue.
    - Minimum value is `1`. Default is the number of Worker threads.
- {{< ui >}}Messages per poll{{< /ui >}}: Enter the maximum number of SQS messages to receive in each poll.
    - Minimum value is `1`. Maximum value is `10`. Default is `1`.
    - SQS can return fewer messages than the maximum. This setting limits the number of notifications per request, not the number of files in each notification.

#### Configure TLS

{{% observability_pipelines/tls_settings %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- CrowdStrike FDR SQS URL identifier:
	- References the URL of the CrowdStrike-managed SQS queue that receives the FDR notifications, such as `https://sqs.us-west-2.amazonaws.com/123456789012/cs-example-queue`.
	- The default identifier is `SOURCE_CROWDSTRIKE_FDR_SQS_URL`.
- CrowdStrike FDR AWS access key ID identifier:
	- References the AWS access key ID for your FDR feed.
	- The default identifier is `SOURCE_CROWDSTRIKE_FDR_AWS_ACCESS_KEY_ID`.
- CrowdStrike FDR AWS secret access key identifier:
	- References the AWS secret access key for your FDR feed.
	- The default identifier is `SOURCE_CROWDSTRIKE_FDR_AWS_SECRET_ACCESS_KEY`.
- CrowdStrike FDR TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_CROWDSTRIKE_FDR_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/crowdstrike_fdr %}}

{{% /tab %}}
{{< /tabs >}}

## Process FDR logs with the CrowdStrike FDR pack

After you add the source, add the [CrowdStrike FDR pack][8] to parse your FDR events, drop high-volume and low-signal events, and generate metrics.

## Health metrics

For [component metrics][9] and [source buffer metrics][10] emitted by all sources, see the [Pipelines Usage Metrics][11] documentation. To filter or group by CrowdStrike FDR source metrics, use the tag `component_type:crowdstrike_fdr`.

### CrowdStrike FDR metrics

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

`pipelines.s3_object_processing_succeeded_duration_seconds`
: **Description**: Time, in seconds, taken to successfully process an S3 object.
: **Metric type**: distribution

`pipelines.s3_object_processing_failed_duration_seconds`
: **Description**: Time, in seconds, taken to process an S3 object that failed.
: **Metric type**: distribution

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/sources/amazon_s3/
[2]: https://docs.crowdstrike.com/access?ft:originId=l74bb59e
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: #secret-defaults
[8]: /observability_pipelines/packs/crowdstrike/
[9]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[11]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
