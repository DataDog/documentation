---
title: AWS Configuration Guide for Cloud SIEM
kind: documentation
further_reading:
- link: "/security_platform/default_rules/#cat-cloud-siem"
  tag: "Documentation"
  text: "Explore Cloud SIEM default detection rules"
- link: "/security_platform/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "/security_platform/cloud_siem/log_detection_rules/"
  tag: "Documentation"
  text: "Create new detection rules"
- link: "/getting_started/integrations/aws/"
  tag: "Documentation"
  text: "Getting Started with AWS"
- link: "/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/"
  tag: "Documentation"
  text: "Send AWS services logs with the Datadog Lambda function"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "See how to explore your logs"
---

## Overview

Cloud SIEM applies detection rules to all processed logs in Datadog to detect threats, like a targeted attack, a threat intel listed IP communicating with your systems, or an insecure configuration. The threats are surfaced as Security Signals in the [Security Signals Explorer][1] for triaging.

This guide walks you through the following steps so that you can start detecting threats with your AWS CloudTrail logs:

- [Set up Datadog’s AWS integration](##set-up-aws-integration-using-cloudformation)
- [Enable AWS CloudTrail logs](#enable-aws-cloudtrail-logs)
- [Send AWS CloudTrail logs to Datadog](#send-aws-cloudtrail-logs-to-datadog)
- [Use Cloud SIEM to triage Security Signals](#use-cloud-siem-to-triage-security-signals)

## Set up AWS integration using CloudFormation

1. Go to Datadog's [AWS integration tile][2] to install the integration.
2. Click **Automatically Using CloudFormation**. If there is already an AWS account set up, click **Add Another Account** first.
3. For Cloud SIEM, log management needs to be integrated, so select **Log Management**. This sets up the Datadog Lambda Forwarder to be used later for sending AWS CloudTrail logs to Datadog.
4. Select the AWS Region where the CloudFormation stack will be launched. 
5. Select or create the Datadog API Key used to send data from your AWS account to Datadog.
6. Click **Launch CloudFormation Template**. This opens the AWS Console and loads the CloudFormation stack with the parameters filled in based on your selections in the prior Datadog form. 

    **Note:** The `DatadogAppKey` parameter enables the CloudFormation stack to make API calls to Datadog to add and edit the Datadog configuration for this AWS account. The key is automatically generated and tied to your Datadog account. 

7. Check the required boxes from AWS and click **Create stack**.
8. After the CloudFormation stack is created, go back to the AWS integration tile in Datadog and find the box for the new account you created. Click **Refresh to Check Status** to see a success message at the top of the page, along with the new account visible on the page with the relevant details.

See [Getting Started with AWS][3] for more information about Datadog’s AWS integration and CloudFormation template. See [AWS manual setup instructions][4] if you need to set up the AWS integration manually.

## Enable AWS CloudTrail logging 

Enable AWS CloudTrail logging so that logs are sent to a S3 bucket. If you already have this setup, skip to [Send AWS CloudTrail logs to Datadog](#send-aws-cloudtrail-logs-to-datadog).

1. Click **Create trail** on the [CloudTrail dashboard][5].
2. Enter in the name for your trail.
3. Create a new S3 bucket or use an existing S3 bucket to store the CloudTrail logs. 
4. Create a new AWS KMS key or use an existing AWS KMS key. Click **Next**.
5. Leave the event type with the default management read and write events, or choose additional event types you want to send to Datadog. Click **Next**.
6. Review and click **Create trail**.

## Send AWS CloudTrail logs to Datadog

Set up a trigger on your Datadog Forwarder Lambda function to send CloudTrail logs stored in the S3 bucket to Datadog for monitoring.

1. Go to the [Datadog Forwarder Lambda][6] that was created during the AWS integration set up.
2. Click **Add trigger**.
3. Select **S3** for the trigger.
4. Select the S3 bucket you are using to collect AWS CloudTrail logs. 
5. For Event type, select **All object create events**.
6. Click **Add**.
7. See CloudTrail logs in Datadog’s [Log Explorer][7].

See [Log Explorer][8] for more information on how to search and filter, group, and visualize your logs. 

## Use Cloud SIEM to triage Security Signals

Cloud SIEM applies out of the box detection rules to all processed logs, including the CloudTrail logs you have just set up. When a threat is detected with a Detection Rule, a Security Signal is generated and can be viewed in the Security Signals Explorer.

- Go to the [Cloud SIEM Signals Explorer][9] to view and triage threats. See [Security Signals Explorer][10] for further details.
- You can also use the [AWS CloudTrail dashboard][11] to investigate anomalous activity.
- See [out-of-the-box detection rules][12] that are applied to your logs.
- Create [new rules][13] to detect threats that match your specific use case.

Since Cloud SIEM applies detection rules to all processed logs, see the [in-app instructions][14] on how to collect [Kubernetes audit logs][15] and logs from other sources for threat detection. You can also enable different [AWS services][16] to log to a S3 bucket and send them to Datadog for threat monitoring.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Log%20Detection%22
[2]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[3]: https://docs.datadoghq.com/getting_started/integrations/aws/
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#manual
[5]: https://console.aws.amazon.com/cloudtrail/home
[6]: https://console.aws.amazon.com/lambda/home
[7]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[8]: https://docs.datadoghq.com/logs/explorer/
[9]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[10]: https://docs.datadoghq.com/security_platform/explorer/
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/security_platform/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/security_platform/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
