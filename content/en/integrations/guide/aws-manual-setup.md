---
title: AWS Manual Setup Guide
kind: guide
description: "Steps for manually setting up the Datadog AWS Integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
- link: "https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/"
  tag: "Documentation"
  text: "Datadog Forwarder Lambda function"
- link: "https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/"
  tag: "Guide"
  text: "Send AWS service logs with the Datadog Kinesis Firehose destination"
- link: "https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/"
  tag: "Guide"
  text: "AWS CloudWatch metric streams with Kinesis Data Firehose"
- link: "https://www.datadoghq.com/blog/aws-monitoring/"
  tag: "Blog"
  text: "Key metrics for AWS monitoring"
- link: "https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/"
  tag: "Blog"
  text: "How to monitor EC2 instances with Datadog"
- link: "https://www.datadoghq.com/blog/monitoring-aws-lambda-with-datadog/"
  tag: "Blog"
  text: "Monitoring AWS Lambda with Datadog"
- link: "https://www.datadoghq.com/blog/cloud-security-posture-management/"
  tag: "Blog"
  text: "Introducing Datadog Cloud Security Posture Management"
- link: "https://www.datadoghq.com/blog/datadog-workload-security/"
  tag: "Blog"
  text: "Secure your infrastructure in real time with Datadog Cloud Workload Security"
- link: "https://www.datadoghq.com/blog/announcing-cloud-siem/"
  tag: "Blog"
  text: "Announcing Datadog Security Monitoring"
---

## Overview

Use this guide to manually set up the Datadog [AWS Integration][1].

{{< tabs >}}
{{% tab "Role delegation" %}}

Setting up the AWS integration manually involves creating an IAM policy and IAM role in your AWS account, and configuring the role with an AWS External ID generated in your Datadog account. This allows Datadog's AWS account to query AWS APIs on your behalf, and pull data into your Datadog account. The sections below detail the steps for creating each of these components, and then completing the setup in your Datadog account.

## Setup

### Generate an external ID
Generate an External ID in the <a href="https://app.datadoghq.com/account/settings#integrations/amazon_web_services" target="_blank">AWS integration tile</a> on the integrations page. This is used in the trust policy of the AWS IAM role you create for Datadog.
1. Select the `Configuration` tab, then `Role Delegation`.
2. Click `Manually`. This creates an AWS External ID which is used for configuration of the AWS IAM role. For more information about the External ID, see the [IAM User Guide][2].
3. Copy this value to your clipboard or notepad.  
  **Note: Do not close the integration tile or the Datadog application page**, as this causes the external ID value to reset.

### AWS IAM Policy for Datadog
Create an IAM policy for the Datadog role in your AWS account with the [necessary permissions](#aws-integration-iam-policy) to take advantage of every AWS integration offered by Datadog. As other components are added to an integration, these permissions may change. 

4. Create a new policy in the AWS [IAM Console][3].
5. Select the `JSON` tab. Paste the [permission policies](#aws-integration-iam-policy) in the textbox. 
6. Click `Next: Tags` and `Review policy`.
7. Name the policy `DatadogAWSIntegrationPolicy` or one of your own choosing, and provide an apt description.
8. Click `Create policy`.

### AWS IAM Role for Datadog
Create an IAM role for Datadog to use the permissions defined in the IAM policy.

10. Create a new role in the AWS [IAM Console][5].
11. Select `Another AWS account` for the Role Type.
12. For Account ID, enter `464622532012` (Datadog's account ID). This means that you are granting Datadog access to your AWS data.
13. Select `Require external ID` and enter the one generated in [AWS External ID](#generate-an-external-id). 
Ensure to leave **Require MFA** disabled. 
14. Click `Next`.
15. If you've already created the policy, search for it on this page and select it. Otherwise, click `Create Policy`, which opens in a new window, and follow the instructions from [AWS IAM Policy for Datadog](#aws-integration-iam-policy). 
16. Optionally, attach the <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">AWS SecurityAudit Policy</a> to the role if you would like to use Datadog's [Cloud Security Posture Management product][4].
17. Click `Next: Tags` and `Next: Review`.
18. Give the role a name such as `DatadogIntegrationRole`, as well as an apt description. 
19. Click `Create Role`.

### Complete the setup in Datadog

20. Returning to the AWS integration tile page in your Datadog account that you had open in another tab, enter your AWS Account ID **without dashes**, for example: `123456789012`. Your Account ID can be found in the ARN of the role created for Datadog.
21. Enter the name of the created role.  
**Note:** The role name you enter in the integration tile is case sensitive and must exactly match the role name created on the AWS side.
22. If there is a [Datadog is not authorized to perform sts:AssumeRole][6] error, make sure your AWS trust policy's `sts:ExternalId:` matches the `AWS External ID` previously created in the integration tile.
23. Click **Install Integration**.
24. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box [AWS overview dashboard][7] to see metrics sent by your AWS services and infrastructure.
{{% /tab %}}

{{% tab "Access keys (GovCloud or China Only)" %}}
#### AWS

1. In your AWS console, set up an IAM user to be used by the Datadog integration.
2. Generate an access key and secret key for the Datadog integration IAM user.

For more details, see the [How to use an external ID when granting access to your AWS resources to a third party][1] AWS documentation.

#### Datadog

1. Open the [AWS integration tile][2].
2. Select the **Access Keys (GovCloud or China Only)** tab.
3. Enter your `AWS Access Key` and `AWS Secret Key`. Only access and secret keys for GovCloud and China are accepted.
4. Choose the services to collect metrics from on the left side of the dialog.
5. Optionally, add tags to all hosts and metrics.
6. Optionally, monitor a subset of EC2 instances by entering the AWS tags in the textbox `to hosts with tag`. **Note:** This also applies to an instance's attached EBS volumes.
7. Optionally, monitor a subset of Lambdas by entering the AWS tags in the textbox `to Lambdas with tag`.
8. Click **Install Integration**.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
