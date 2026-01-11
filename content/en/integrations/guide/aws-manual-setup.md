---
title: AWS Manual Setup Guide

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
  text: "Send AWS service logs with the Datadog Amazon Data Firehose destination"
- link: "https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/"
  tag: "Guide"
  text: "Troubleshooting the AWS integration"
- link: "https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/"
  tag: "Guide"
  text: "AWS CloudWatch metric streams with Amazon Data Firehose"
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
- link: "https://www.datadoghq.com/blog/tagging-best-practices/#aws"
  tag: "Blog"
  text: "Best practices for tagging your infrastructure and applications"

---

## Overview

Use this guide to manually set up the Datadog [AWS Integration][1].

{{< tabs >}}
{{% tab "Role delegation" %}}

To set up the AWS integration manually, create an IAM policy and IAM role in your AWS account, and configure the role with an AWS External ID generated in your Datadog account. This allows Datadog's AWS account to query AWS APIs on your behalf, and pull data into your Datadog account. The sections below detail the steps for creating each of these components, and then completing the setup in your Datadog account.

{{< site-region region="gov" >}}
<div class="alert alert-danger">
  <em>Setting up S3 Log Archives using Role Delegation is in limited availability. Contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> to request this feature in your Datadog for Government account</em>.
</div>
{{< /site-region >}}

## Setup

### Generate an external ID

1. In the [AWS integration configuration page][1], click **Add AWS Account(s)**, and then select **Manually**.
2. Choose which AWS partition your AWS account is scoped to. The partition is either `aws` for commercial regions, `aws-cn` for China*, or `aws-us-gov` for GovCloud. See [Partitions][2] in the AWS documentation for more information.
{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
3. Select `Role Delegation` for the access type. Role delegation is only supported for AWS accounts scoped to AWS commercial regions.
{{< /site-region >}}
{{< site-region region="gov" >}}
3. Select `Role Delegation` for the access type. Role delegation is only supported for AWS accounts scoped to AWS commercial or AWS GovCloud regions.
{{< /site-region >}}
4. Copy the `AWS External ID`. For more information about the external ID, read the [IAM User Guide][3].
  **Note**: The External ID remains available and is not regenerated for 48 hours, unless explicitly changed by a user or another AWS account is added to Datadog during this period. You can return to the **Add AWS Account(s)** page within that time period without the External ID changing.

### Create a Datadog integration IAM role

Datadog assumes this role to collect data on your behalf.

1. Go to the AWS [IAM Console][4] and click `Create role`.
2. Select **AWS account** for the trusted entity type, and **Another AWS account**.
{{< site-region region="us,us3,us5,eu" >}}
3. Enter `464622532012` as the `Account ID`. This is Datadog's account ID, and grants Datadog access to your AWS data.
{{< /site-region >}}
{{< site-region region="ap1" >}}
3. Enter `417141415827` as the `Account ID`. This is Datadog's account ID, and grants Datadog access to your AWS data.
{{< /site-region >}}
{{< site-region region="ap2" >}}
3. Enter `412381753143` as the `Account ID`. This is Datadog's account ID, and grants Datadog access to your AWS data.
{{< /site-region >}}
{{< site-region region="gov" >}}
3. If the AWS account you want to integrate is a GovCloud account, enter `065115117704` as the `Account ID`, otherwise enter `392588925713`. This is Datadog's account ID, and grants Datadog access to your AWS data.
{{< /site-region >}}
**Note**: Ensure that the **DATADOG SITE** selector on the right of this documentation page is set to your Datadog site before copying the account ID above.

4. Select **Require external ID** and enter the external ID copied in the previous section.
Leave `Require MFA` disabled. For more details, see the [Access to AWS accounts owned by third parties][3] page in the AWS documentation.
5. Click **Next**.
6. To enable [resource collection][5], attach the <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">AWS SecurityAudit Policy</a> to the role.
7. Click **Next**.
8. Give the role a name such as `DatadogIntegrationRole`. Optionally, provide a description and add tags to the role.
9. Click **Create Role**.

### Create an inline IAM policy for the Datadog integration role

This policy defines the permissions necessary for the Datadog integration role to collect data for every AWS integration offered by Datadog. These permissions may change as new AWS services are added to this integration.

1. Select the Datadog integration role on the [IAM roles page][4].
2. Click **Add permissions**, and select **Create inline policy**.
3. Select the **JSON** tab.
4. Paste the [permission policies](#aws-integration-iam-policy) in the textbox.<br>
  **Note**: Optionally, you can add [Condition][6] elements to the IAM policy. For example, conditions can be used to [restrict monitoring to certain regions][7].
5. Click **Next**.
6. Give the policy a name such as `DatadogIntegrationPolicy`.
7. Click **Create policy**.

### Complete the setup in Datadog

1. Return to the manual setup section of the [AWS integration configuration page][1]. 
2. Click the `I confirm that the Datadog IAM Role has been added to the AWS Account` checkbox.
3. In the **Account ID** section, enter your account ID **without dashes**; for example, `123456789012`. You can find the account ID in the ARN of the Datadog integration role, which follows the format `arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>`.
4. In the **AWS Role Name** section, enter the name of the Datadog integration role previously created.
  **Note**: The role name is case sensitive and must exactly match the role name in AWS.
5. Click **Save**.
6. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">AWS Overview Dashboard</a> to see metrics sent by your AWS services and infrastructure.

<div class="alert alert-danger">If there is a <code>Datadog is not authorized to perform sts:AssumeRole</code> error, follow the troubleshooting steps recommended in the UI, or read the <a href="https://docs.datadoghq.com/integrations/guide/error-datadog-not-authorized-sts-assume-role/" target="_blank">troubleshooting guide</a>.</div>

\*{{% mainland-china-disclaimer %}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/partitions.html
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: https://console.aws.amazon.com/iam/home#/roles
[5]: /integrations/amazon_web_services/#resource-collection
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html
[7]: https://aws.amazon.com/blogs/security/easier-way-to-control-access-to-aws-regions-using-iam-policies/
{{% /tab %}}
{{% tab "Access keys" %}}

## Setup

### AWS

1. In your AWS console, create an IAM user to be used by the Datadog integration with the [necessary permissions](#aws-integration-iam-policy).
2. Generate an access key and secret key for the Datadog integration IAM user.

### Datadog

3. In the [AWS integration tile][1], click **Add AWS Account**, and then select **Manually**.
4. Select the **Access Keys** tab.
5. Choose which AWS partition your AWS account is scoped to. The partition is either `aws` for commercial regions, `aws-cn` for China*, or `aws-us-gov` for GovCloud. See [Partitions][9] in the AWS documentation for more information.
5. Click the **I confirm that the IAM User for the Datadog Integration has been added to the AWS Account** checkbox.
6. Enter your `Account ID`, `AWS Access Key` and `AWS Secret Key`.
7. Click **Save**.
8. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">AWS Overview Dashboard</a> to see metrics sent by your AWS services and infrastructure.

\*{{% mainland-china-disclaimer %}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

{{% aws-resource-collection %}}

### All permissions used by the Datadog integration

The permission policies shown above represent a baseline configuration. To use all available Datadog features, attach the following additional policies to the Datadog integration role:

{{% collapse-content title="Datadog integration role managed policy 1" level="h4" %}}
{{% aws-permissions-managed-policy-1 %}}
{{% /collapse-content %}}

{{% collapse-content title="Datadog integration role managed policy 2" level="h4" %}}
{{% aws-permissions-managed-policy-2 %}}
{{% /collapse-content %}}

{{% collapse-content title="Datadog integration role managed policy 3" level="h4" %}}
{{% aws-permissions-managed-policy-3 %}}
{{% /collapse-content %}}

{{% collapse-content title="Datadog integration role managed policy 4" level="h4" %}}
{{% aws-permissions-managed-policy-4 %}}
{{% /collapse-content %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
