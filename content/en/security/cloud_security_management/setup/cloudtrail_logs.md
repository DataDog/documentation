---
title: Setting up AWS CloudTrail Logs for Cloud Security Management
---

Use the following instructions to enable CloudTrail Logs forwarding for Identity Risks (CIEM). Enabling CloudTrail logs forwarding allows you to gain insights into the actual usage of cloud resources, identifying users and roles with significant gaps between provisioned and utilized permissions.

## Prerequisites

- The [Datadog AWS integration][1] is installed and configured for your AWS accounts
- [Cloud SIEM][5] is enabled

## Enable AWS CloudTrail logging

Enable AWS CloudTrail logging so that logs are sent to a S3 bucket.

1. Click **Create trail** on the [CloudTrail dashboard][2].
2. Enter a name for your trail.
3. Create an S3 bucket or use an existing S3 bucket to store the CloudTrail logs. 
4. Create an AWS KMS key or use an existing AWS KMS key. Click **Next**.
5. Leave the event type with the default management read and write events, or choose additional event types you want to send to Datadog. 
6. Click **Next**.
7. Review and click **Create trail**.

## Send AWS CloudTrail logs to Datadog

Set up a trigger on your Datadog Forwarder Lambda function to send CloudTrail logs stored in the S3 bucket to Datadog for monitoring.

1. Go to the [Datadog Forwarder Lambda][3] that was created during the AWS integration set up.
2. Click **Add trigger**.
3. Select **S3** for the trigger.
4. Select the S3 bucket you are using to collect AWS CloudTrail logs. 
5. For Event type, select **All object create events**.
6. Click **Add**.
7. See CloudTrail logs in Datadog's [Log Explorer][4].

[1]: /integrations/amazon_web_services/
[2]: https://console.aws.amazon.com/cloudtrail/home
[3]: https://console.aws.amazon.com/lambda/home
[4]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[5]: /security/cloud_siem/