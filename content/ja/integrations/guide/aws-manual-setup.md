---
title: AWS Manual Setup Guide
kind: guide
description: "Steps for manually setting up the Datadog AWS Integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: Documentation
  text: AWS Integration
- link: "https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/"
  tag: Documentation
  text: Datadog Forwarder Lambda function
- link: "https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/"
  tag: Guide
  text: Send AWS service logs with the Datadog Amazon Data Firehose destination
- link: "https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/"
  tag: Guide
  text: Troubleshooting the AWS integration
- link: "https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/"
  tag: Guide
  text: AWS CloudWatch metric streams with Amazon Data Firehose
- link: "https://www.datadoghq.com/blog/aws-monitoring/"
  tag: Blog
  text: Key metrics for AWS monitoring
- link: "https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/"
  tag: Blog
  text: How to monitor EC2 instances with Datadog
- link: "https://www.datadoghq.com/blog/monitoring-aws-lambda-with-datadog/"
  tag: Blog
  text: Monitoring AWS Lambda with Datadog
- link: "https://www.datadoghq.com/blog/cloud-security-posture-management/"
  tag: Blog
  text: Introducing Datadog Cloud Security Posture Management
- link: "https://www.datadoghq.com/blog/datadog-workload-security/"
  tag: Blog
  text: Secure your infrastructure in real time with Datadog Cloud Workload Security
- link: "https://www.datadoghq.com/blog/announcing-cloud-siem/"
  tag: Blog
  text: Announcing Datadog Security Monitoring
- link: "https://www.datadoghq.com/blog/tagging-best-practices/#aws"
  tag: Blog
  text: Best practices for tagging your infrastructure and applications

---

## Overview

Use this guide to manually set up the Datadog [AWS Integration][1].

{{< tabs >}}
{{% tab "Role delegation" %}}

To set up the AWS integration manually, create an IAM policy and IAM role in your AWS account, and configure the role with an AWS External ID generated in your Datadog account. This allows Datadog's AWS account to query AWS APIs on your behalf, and pull data into your Datadog account. The sections below detail the steps for creating each of these components, and then completing the setup in your Datadog account.

## Setup

### Generate an external ID

1. In the [AWS integration configuration page][1], click **Add AWS Account**, and then select **Manually**.
2. Select `Role Delegation` for the access type and copy the `AWS External ID`. For more information about the external ID, read the [IAM User Guide][2].  
  **Note**: The External ID remains available and is not regenerated for 48 hours, unless explicitly changed by a user or another AWS account is added to Datadog during this period. You can return to the **Add New AWS Account** page within that time period to complete the process of adding an account without the External ID changing.

### AWS IAM policy for Datadog
Create an IAM policy for the Datadog role in your AWS account with the [necessary permissions](#aws-integration-iam-policy) to take advantage of every AWS integration offered by Datadog. As other components are added to an integration, these permissions may change.

3. Create a new policy in the AWS [IAM Console][3].
4. Select the **JSON** tab. Paste the [permission policies](#aws-integration-iam-policy) in the textbox.  
  **Note**: Optionally, you can add [Condition][7] elements to the IAM policy. For example, conditions can be used to [restrict monitoring to certain regions][8].
5. Click **Next: Tags** and **Next: Review**.
6. Name the policy `DatadogIntegrationPolicy` or one of your own choosing, and provide an apt description.
7. Click **Create policy**.

### AWS IAM role for Datadog
Create an IAM role for Datadog to use the permissions defined in the IAM policy.

8. Create a new role in the AWS [IAM Console][4].
9. Select **AWS account** for the trusted entity type, and **Another AWS account**.
{{< site-region region="us,us3,us5,eu" >}}
10. Enter `464622532012` as the `Account ID`. This is Datadog's account ID, and grants Datadog access to your AWS data.
{{< /site-region >}}
{{< site-region region="ap1" >}}
10. Enter `417141415827` as the `Account ID`. This is Datadog's account ID, and grants Datadog access to your AWS data.
{{< /site-region >}}
{{< site-region region="gov" >}}
10. If the AWS account you want to integrate is a GovCloud account, enter `065115117704` as the `Account ID`, otherwise enter `392588925713`. This is Datadog's account ID, and grants Datadog access to your AWS data.
{{< /site-region >}}
11. Select **Require external ID** and enter the external ID copied in the [Generate an external ID](#generate-an-external-id) section.
Ensure to leave `Require MFA` disabled. For more details, see the [How to use an external ID when granting access to your AWS resources to a third party][2] AWS documentation.
12. Click **Next**.
13. If you've already created the policy, search for it on this page and select it. Otherwise, click **Create Policy**, which opens in a new window, and follow the instructions from the previous section.
14. Optionally, attach the <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">AWS SecurityAudit Policy</a> to the role to use [Cloud Security Management Misconfigurations][5].
15. Click **Next**.
16. Give the role a name such as `DatadogIntegrationRole`, as well as an apt description.
17. Click **Create Role**.

### Complete the setup in Datadog

18. Return to the AWS integration configuration page for manually adding an account in Datadog that you had open in another tab. Click the checkbox to confirm the Datadog IAM role was added to the AWS account.
19. Enter the account ID **without dashes**, for example: `123456789012`. Your Account ID can be found in the ARN of the role created for Datadog.
20. Enter the name of the role created in the previous section, and click **Save**.  
  **Note**: The role name you enter in the integration tile is case sensitive and must exactly match the role name in AWS.
21. If there is a [Datadog is not authorized to perform sts:AssumeRole][6] error, follow the troubleshooting steps recommended in the UI, or read the [troubleshooting guide][6].
22. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">AWS Overview Dashboard</a> to see metrics sent by your AWS services and infrastructure.


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[3]: https://console.aws.amazon.com/iam/home#/policies
[4]: https://console.aws.amazon.com/iam/home#/roles
[5]: /security/cloud_security_management/misconfigurations/
[6]: /integrations/guide/error-datadog-not-authorized-sts-assume-role/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html
[8]: https://aws.amazon.com/blogs/security/easier-way-to-control-access-to-aws-regions-using-iam-policies/
{{% /tab %}}
{{% tab "Access keys (GovCloud or China Only)" %}}

## Setup

### AWS

1. In your AWS console, create an IAM user to be used by the Datadog integration with the [necessary permissions](#aws-integration-iam-policy).
2. Generate an access key and secret key for the Datadog integration IAM user.

### Datadog

3. In the [AWS integration tile][1], click **Add AWS Account**, and then select **Manually**.
4. Select the **Access Keys (GovCloud or China\* Only)** tab.
5. Click the **I confirm that the IAM User for the Datadog Integration has been added to the AWS Account** checkbox.
6. Enter your `Account ID`, `AWS Access Key` and `AWS Secret Key`. Only access and secret keys for GovCloud and China are accepted.
7. Click **Save**.
8. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">AWS Overview Dashboard</a> to see metrics sent by your AWS services and infrastructure.

\* _All use of Datadog Services in (or in connection with environments within) mainland China is subject to the disclaimer published in the [Restricted Service Locations][2] section on our website._

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://www.datadoghq.com/legal/restricted-service-locations/
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
