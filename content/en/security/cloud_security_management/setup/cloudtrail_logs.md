---
title: Setting up AWS CloudTrail Logs for Cloud Security Management
---

Set up AWS CloudTrail Logs to get the most out of [CSM Identity Risks][1]. AWS CloudTrail Logs provides additional insights into the actual usage of cloud resources, helping you identify users and roles with significant gaps between provisioned and utilized permissions.

## Prerequisites

To use AWS CloudTrail Logs with CSM Identity Risks, ensure that [Cloud SIEM][2] and the [AWS CloudTrail content pack][3] are enabled. If they are not already enabled, follow these steps:

1. Navigate to the [CSM Features][7] page.
1. Locate the AWS CloudTrail Logs card and click **Enable** to activate Cloud SIEM and the AWS CloudTrail content pack.

Complete the setup by installing the AWS integration and configuring log ingestion for AWS CloudTrail:

## Set up AWS integration

If you haven't already, set up the AWS integration.

## Enable AWS CloudTrail logging

Enable AWS CloudTrail logging so that logs are sent to a S3 bucket.

1. Click **Create trail** on the [CloudTrail dashboard][4].
2. Enter a name for your trail.
3. Create an S3 bucket or use an existing S3 bucket to store the CloudTrail logs. 
4. Create an AWS KMS key or use an existing AWS KMS key. Click **Next**.
5. Leave the event type with the default management read and write events, or choose additional event types you want to send to Datadog. 
6. Click **Next**.
7. Review and click **Create trail**.

## Send AWS CloudTrail logs to Datadog

Set up a trigger on your Datadog Forwarder Lambda function to send CloudTrail logs stored in the S3 bucket to Datadog for monitoring.

1. Go to the [Datadog Forwarder Lambda][5] that was created during the AWS integration set up.
2. Click **Add trigger**.
3. Select **S3** for the trigger.
4. Select the S3 bucket you are using to collect AWS CloudTrail logs. 
5. For Event type, select **All object create events**.
6. Click **Add**.
7. See CloudTrail logs in Datadog's [Log Explorer][6].

[1]: /security/cloud_security_management/identity_risks
[2]: /security/cloud_siem/
[3]: /security/cloud_siem/content_packs#aws-cloudtrail
[4]: https://console.aws.amazon.com/cloudtrail/home
[5]: https://console.aws.amazon.com/lambda/home
[6]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[7]: https://app.datadoghq.com/security/configuration/csm/features