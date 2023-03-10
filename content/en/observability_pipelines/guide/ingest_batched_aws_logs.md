---
title: Ingest Batched Logs from AWS
kind: guide
aliases:
  - /integrations/observability_pipelines/guide/ingest_cloudtrail_logs/
  - /integrations/observability_pipelines/guide/ingest_vpc_flow_logs/
further_reading:
  - link: "/observability_pipelines/working_with_data/"
    tag: "Documentation"
    text: "Working with data using Observability Pipelines"
  - link: /observability_pipelines/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
---

## Overview


## Prerequisites
- You have [installed and configured the Observability Pipelines Worker][1] to collect data from your sources and route it to your destinations.
- You are familiar with [the basics of configuring Observability Pipelines][2].

## Create the SQS Topic
In the SQS Console, provision a new queue specific to this configuration. This will keep any changes you make to it separate from any other log analysis tools you may have.

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/01_create_queue.png" >}}

Give the queue a descriptive name:

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/02_name_queue.png" >}}

Replace `${REGION}`, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}`, and `${BUCKET_NAME}` below with appropriate values from your AWS account and the bucket and queue names that you’re using. This snippet will serve as the Advanced policy that you will configure the queue with, and with it allow the S3 bucket to properly send Event Notifications:

```
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
```

This policy will be pasted into the text editor after selecting this option:

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/03_advanced_policy.png" >}}

All the other queue options can remain as the defaults, for now. Create the Queue, and we’ll move on to configuring the S3 bucket to notify the queue when new log objects are added.

## Enable S3 Bucket Notifications
On the S3 bucket details page, you will see a tab called Properties. Go here to find the Event Notifications settings:

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/04_bucket_properties.png" >}}

You will be creating a new Event Notification stream for this purpose.

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/05_create_notification.png" >}}

Give the event stream a descriptive name:

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/06_stream_name.png" >}}

OP will only respond to object creation events, so you only need to subscribe to those:

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/07_stream_type.png" >}}

And finally, you will need to select the SQS queue that you just created:

{{< img src="observability_pipelines/guide/ingest_batched_aws_logs/08_s3_stream.png" >}}

Create the event stream and now your queue should be filling up with messages for OP to process.

**If you encounter an error of “Unable to validate the following destination configurations” when saving the new event stream, it is likely that the SQS access policy from above was not set up properly. Correcting the permissions there should allow the process to complete.**

## Create an IAM Role
Security best practices dictate that we should create a separate IAM role for OP, which will only have the permissions required to actually operate the system.

The details of creating the role itself are beyond the scope of this document, since they involve decisions on whether the role is attachable to EC2 instances, or assumable by users, &c. It will suffice to say that the minimally-necessary policy which must be attached to the role is the following:

```
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

Similar to the SQS Access Policy from earlier, you will need to replace `${REGION}`, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}`, and `${BUCKET_NAME}` above.

You are then responsible for applying that role to the running OP process. This might be through attaching the role to an EC2 instance, or assuming a role from a given user profile.

## Configure OP to Read from SQS
All the AWS-side pieces are now in place. All that remains is to read the logs emitted to S3. Modulo the role attachment from the previous section, however you have your OP instance running, the following config will minimally suffice:

```
sources:
 cloudtrail:
   type: aws_s3
   region: us-east-1
   sqs:
     queue_url: ${SQS_URL}
```

This sample config will receive event notifications from SQS, read the associated logs in S3, and emit them to the console. From there, you can apply transforms and output to sinks however you wish. You will need to replace `${SQS_URL}` with the HTTP URL given in the SQS console.

## Process Batched Events
The above configuration will function to pull down logs from S3 and emit them to whatever sinks you have configured, but most services that write logs to S3 (such as CloudTrail) will do so in batches, meaning that the events that OP receives are actually multiple logs in one. To break these apart into their separate events for correct processing and batching up for sinks, the following transforms will need to be added:

```
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

This makes use of a feature in VRL where a returned array from a remap transform will be emitted as separate events internally. Doing so allows us to pick apart each event in the batch of logs, while preserving the full event context.

[1]: /observability_pipelines/installation/
[2]: /observability_pipelines/configurations/