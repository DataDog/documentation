---
title: (LEGACY) Ingest Amazon S3 Logs with the Observability Pipelines Worker
kind: guide
aliases:
  - /observability_pipelines/guide/ingest_aws_s3_logs_with_the_observability_pipelines_worker/
further_reading:
  - link: "/observability_pipelines/legacy/working_with_data/"
    tag: "Documentation"
    text: "Working with data using Observability Pipelines"
  - link: /observability_pipelines/legacy/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
---

## Overview

The [Observability Pipelines Worker][1] can ingest logs from many different sources. If you have an Amazon S3 bucket that is receiving logs from an external system, such as AWS CloudTrail or CloudWatch, you can configure the Worker to ingest those logs. The setup uses Observability Pipelines Worker's Amazon S3 source, which requires configuring an Amazon SQS queue to receive event notifications from the S3 bucket. The event notification then informs the Worker to collect the new log events in the S3 bucket. 

This guide walks you through the following steps:

1. [Create an Amazon SQS Topic to receive S3 event notifications](#create-an-amazon-sqs-topic-to-receive-s3-notifications)
2. [Enable event notifications on the S3 bucket](#enable-event-notifications-on-the-s3-bucket)
3. [Create an IAM role to provide the Worker only the necessary permissions](#create-an-iam-role-for-the-worker)
4. [Configure the Worker to receive notifications from the SQS queue and to collect logs from the S3 bucket](#configure-the-worker-to-receive-notifications-from-the-sqs-queue)
5. [Configure the Worker to separate out batched S3 log events](#configure-the-worker-to-separate-out-batched-aws-s3-log-events)

## Prerequisites
- You have [installed][2] and [configured][3] the Observability Pipelines Worker to collect data from your sources and route it to your destinations.
- You are familiar with [the basics of configuring Observability Pipelines][3].

## Create an Amazon SQS topic to receive S3 notifications

In the Amazon SQS console, provision a new queue specific to this configuration. This keeps any changes you make to it separate from any other log analysis tools that you are using.

1. Go to the [Amazon SQS console][4].
2. Click **Create queue** to provision a new queue specific to this configuration.
3. Enter a name for the queue.
4. In the **Access policy** section, click the **Advanced** button.
5. Copy and paste the below example JSON object into the advanced access policy section. It configures the queue and allows the S3 bucket to send event notifications. Replace `${REGION}`, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}`, and `${BUCKET_NAME}` with the relevant AWS account information, the queue name, and the bucket name you just entered.
{{< code-block lang="json">}}
  {
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "SQS:SendMessage",
      "Resource": "arn:aws:sqs:${REGION}:${AWS_ACCOUNT_ID}:${QUEUE_NAME}",
      "Condition": {
        "StringEquals": {
          "aws:SourceAccount": "${AWS_ACCOUNT_ID}"
        },
        "StringLike": {
          "aws:SourceArn": "arn:aws:s3:*:*:${BUCKET_NAME}"
        }
      }
    }
  ]
  }
{{< /code-block >}}
6. Leave the other queue options as the defaults.
7. Click **Create queue**.

## Enable event notifications on the S3 bucket

1. In the [Amazon S3 console][5], go to the S3 bucket that is collecting the logs that you want the Worker to ingest.
2. Click the **Properties** tab.
3. Go to the **Event notifications** section, and click **Create event notification**.
4. Enter a name for the event.
5. In the **Event types** section, click **All object create events**. The Worker only responds to object creation events, so those are the only events to which you need to subscribe.
6. In the **Destination** section, select **SQS queue** and then choose the SQS queue you created earlier.
7. Click **Save changes**.

The SQS queue should now be receiving messages for the Worker to process.

If you encounter the "Unable to validate the following destination configurations" error, check that the SQS access policy is set up correctly.

## Create an IAM role for the Worker

Create a separate IAM role for the Worker so that only the necessary permissions are provided.

1. Go to the [AWS IAM console][6].
2. In the navigation pane, click **Roles**.
3. Click **Create role**.
4. Select the trusted entity type to which the role is attached. 
5. Click **Next**.
6. Click **Create policy**.
7. Click the **JSON** tab. Copy and paste in the minimal permissions that must be attached to the role:
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "sqs:DeleteMessage",
                  "s3:GetObject",
                  "sqs:ReceiveMessage",
                  "s3:ListBucket"
              ],
              "Resource": [
                  "arn:aws:s3:::${BUCKET_NAME}/*",
                  "arn:aws:s3:::${BUCKET_NAME}",
                  "arn:aws:sqs:${REGION}:${ACCOUNT_ID}:${QUEUE_NAME}"
              ]
          }
      ]
    }
    ```
8. Replace `${REGION`}, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}`, and `${BUCKET_NAME}`  with the relevant AWS account information and the queue and bucket names that you are using. You need to further modify the role permissions if you want the role to be attachable to EC2 instances, assumable by users, etc.
9. Click **Next: Tags**. Optionally, add tags.
10. Click **Next: Review**.
11. Enter a name for the policy.
12. Click **Create policy**.

Apply the role to the running Observability Pipelines process. You can do this by attaching the role to an EC2 instance or assuming a role from a given user profile.

## Configure the Worker to receive notifications from the SQS queue

1. Use the below source configuration example to set up the Worker to:  
      a. Receive the SQS event notifications.   
      b. Read the associated logs in the S3 bucket.  
      c. Emit the logs to the console.
    ```yaml
        sources:
          cloudtrail:
            type: aws_s3
            region: ${REGION}
            sqs:
              queue_url: ${SQS_URL}
      ```
2. Replace `${REGION}` with the AWS account region. Replace `${SQS_URL}` with the HTTP URL provided in the SQS queue's **Details** section in the console.

See [Amazon S3 source documentation][7] for more options.

With the Amazon S3 source set up, you can now add [transforms][8] to manipulate the data and [sinks][9] to output the logs to destinations based on your use case. See [Configurations][3] for more information on sources, transforms, and sinks. 

## Configure the Worker to separate batched Amazon S3 log events


Most services (for example, CloudTrail) send logs to S3 in batches, which means that each event that the Worker receives is composed of multiple logs. In the below example, `Records` is an array of three log events that are batched together.

```json
{
  "Records": [
    {
      "log event 1": "xxxx"
    },
    {
      "log event 2": "xxxx"
    },
    {
      "log event 3": "xxxx"
    }
  ]
}
```

Add the following `explode` and `map` transforms to separate the batched log events into individual events for correct processing for sinks:

```json
transforms:
 explode:
   type: remap
   inputs:
     - cloudtrail
   source: |-
     .message = parse_json!(.message)
     . = unnest!(.message.Records)

 map:
   type: remap
   inputs:
     - explode
   source: |-
     merge!(., .message.Records)
     del(.message)
```

In this example, the `parse_json` function parses the string into JSON.

The `unnest` function separates the batched log events into an array of individual log events.

```
[
   {"Records": {"log event 1": "xxx"}},
   {"Records": {"log event 2": "xxx"}},
   {"Records": {"log event 3": "xxx"}}
]
```

Then the `merge` function collapses the data in `.Records` to the top level so that each log event is an individual log line. The `del` function removes the extraneous field.

```
{"log event 1": "xxx"}
```
```
{"log event 2": "xxx"}
```
```
{"log event 3": "xxx"}
```

### Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/#observability-pipelines-worker
[2]: /observability_pipelines/legacy/setup/
[3]: /observability_pipelines/legacy/configurations/
[4]: https://console.aws.amazon.com/sqs/home
[5]: https://console.aws.amazon.com/s3/
[6]: https://console.aws.amazon.com/iam/
[7]: /observability_pipelines/legacy/reference/sources/#awss3
[8]: /observability_pipelines/legacy/reference/transforms/
[9]: /observability_pipelines/legacy/reference/sinks/
