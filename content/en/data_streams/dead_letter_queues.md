---
title: Dead Letter Queues
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Data Streams Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Data Streams Monitoring (DSM) provides visibility into your non-empty dead letter queues (DLQs), enabling you to monitor and inspect message processing failures. DSM also enables you to remediate these message processing failures directly within Datadog.

<div class="alert alert-info">Monitoring dead letter queues is available for Amazon SQS queues.</div>

## Monitor DLQs

### Setup
* Enable [Data Streams Monitoring][1] for your messaging services.
* Install the [Datadog-AWS integration][2]. Use this integration to manage permissions.
* To remediate message processing failures within Datadog, additional setup is required. See the [Remediate DLQ issues](#remediate-dlq-issues) section.

### Usage

#### Create a monitor for a dead letter queue

To track if your queue is rerouting messages to its DLQ, you can create a [metric monitors][8] that alerts on the [`data_streams.sqs.dead_letter_queue.messages`][8] metric.

To create a monitor for a queue's DLQ:

1. In Datadog, navigate to [Data Streams Monitoring][4].
2. Select the **Explore** tab (default).
3. Click on a supported queue to open its side panel.
4. Select the **Dead Letter Queue** tab.
5. Click **Create Monitor** to open a monitor setup page. The default inputs are sufficient to create a monitor that alerts when your DLQ is non-empty, but you can also make additional configurations on this page if you wish.
6. Click **Create** at the bottom of the page.

#### Detect message processing issues

Data Streams Monitoring helps you detect where messages couldn't be processed and what downstream services could be affected:

* The DSM [**Service Map**][6] highlights queues with messages in their DLQs, helping you to visually identify where failures occur

* The DSM [**Issues**][7] page lists all queues that are experiencing message processing issues

## Remediate DLQ issues
You can inspect and resolve non-empty DLQs directly in Datadog by using [Datadog Actions][5].

### Setup
In Datadog, create a [Connection][9]. You need an IAM entity to perform the actions. This IAM entity can be an IAM User (with a secret access key) or IAM Role (assumed by using `sts:AssumeRole`) and have the following permissions:
  * `sqs:ReceiveMessage` (for _peek_)
  * `sqs:StartMessageMoveTask` (for _redrive_)
  * `sqs:PurgeQueue` (for _purge_)

These permissions can be applied globally to all SQS queues, or restricted to specific queues.

### Usage

After you set up the connection, you can click on a supported queue to open its side panel, where you can use the following actions:

* **Peek** to inspect failed message content and identify the root cause
* **Redrive** to requeue messages for another processing attempt
* **Purge** to clear messages that no longer need processing

## Troubleshooting
If you are unable to see dead letter queue information:
* Confirm that you have installed the [Datadog-AWS integration][2]
* Confirm that your AWS role uses the AWS-managed `AmazonSQSReadOnlyAccess` policy
* Confirm that your role has `sqs:ListQueues` and `sqs:GetQueueAttributes` permissions

[1]: /data_streams/setup
[2]: /integrations/amazon-web-services/
[3]: /data_streams/metrics_and_tags/#data_streamssqsdead_letter_queuemessages
[4]: https://app.datadoghq.com/data-streams/
[5]: https://app.datadoghq.com/actions
[6]: https://app.datadoghq.com/data-streams/map
[7]: https://app.datadoghq.com/data-streams/issues
[8]: /monitors/types/metric/
[9]: https://app.datadoghq.com/actions/connections