---
title: Dead Letter Queues
---

Data Streams Monitoring provides visibility into non-empty Dead Letter Queues (DLQs) so you can monitor, inspect, and fix message processing failures without leaving the Datadog platform.

## Prerequisites
* You must have [Data Streams Monitoring instrumented][1]
* You must have an [AWS Integration][2]. Permissions are managed through your existing AWS integration
* For **peek**, **purge**, and **redrive** actions, set up Datadog Actions

## Supported queue technologies

|            | Is supported |
| ---------- | ------------ |
| Amazon SQS | {{< X >}}    |
| Kafka      | Coming soon  |
| RabbitMQ   | Coming soon  |

## Monitor Dead Letter Queue messages

To catch processing failures early, you can create a monitor to track if your queue is rerouting messages to its DLQ using the new [DLQ metric][3], `data_streams.sqs.dead_letter_queue.messages`.

To create a monitor:

1. Navigate to [Data Streams Monitoring][4]
2. Ensure the **Explore tab** is selected
3. Click on a supported queue. The Queue Details side panel appears
4. Select the **Dead Letter Queue tab**
5. Click on **Create Monitor** and follow monitor setup

## Detect message processing issues

Data Streams Monitoring helps you detect where messages couldn't be processed and what downstream services could be affected:

The DSM **Service Map** helps you visually identify where failures occur by highlighting queues with messages in their DLQs.

The **Issues Page** helps you methodically review DLQs with messages by listing all queues that are experiencing message processing issues.

## Remediate directly in Datadog

You can inspect and resolve non-empty DLQs directly in Datadog. In the queue detail side panel:
* **Peek** to inspect failed message content and identify the root cause
* **Purge** to clear messages that no longer need processing
* **Redrive** to requeue messages for another processing attempt

## Troubleshooting
If you have an AWS integration set up but are unable to see Dead Letter Queue information:
* Confirm that your role uses the AWS managed `AmazonSQSReadOnlyAccess` policy
* Alternatively your role needs to have `sqs:ListQueues` and `sqs:GetQueueAttributes` access

To remediate DLQ within Datadog by performing actions such as **peek**, **purge**, and **redrive** you need to create a connection:
* A User with secret access key or a Role through assume role
* Applied on all SQS queues or for a subset of queues
* Required permissions:
  * `sqs:ReceiveMessage` (for **peek**)
  * `sqs:StartMessageMoveTask` (for **redrive**)
  * `sqs:PurgeQueue` (for **purge**)


[1]: https://docs.datadoghq.com/data_streams/
[2]: https://docs.datadoghq.com/integrations/amazon-web-services/
[3]: https://docs.datadoghq.com/data_streams/metrics_and_tags/#data_streamssqsdead_letter_queuemessages
[4]: https://app.datadoghq.com/data-streams/
