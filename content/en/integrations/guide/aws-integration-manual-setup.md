---
title: AWS Manual Setup Guide
kind: guide
description: "Steps for manually setting up the Datadog AWS Integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Integration"
  text: "AWS Integration"
- link: "https://www.datadoghq.com/blog/aws-monitoring/"
  tag: "Blog"
  text: "Key metrics for AWS monitoring"
- link: "https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/"
  tag: "Blog"
  text: "How to monitor EC2 instances with Datadog"
---

## Overview

Use this guide to manually set up the Datadog [AWS Integration][1].

Setting up the AWS integration manually involves creating an IAM policy and IAM role in your AWS account, and configuring the role with an AWS External ID generated in your Datadog account. This allows Datadog's AWS account to query AWS APIs on your behalf, and push the data into your Datadog account. The sections below detail the steps for creating each of these components, and then completing the setup in your Datadog account.

### Generate an external ID
Generate an External ID in the [AWS Integration Tile][2] on the integrations page. This will be used on the trust policy of the IAM role you create for Datadog in your AWS account for added security.
1. Select the `Configuration` tab, then `Role Delegation`.
2. Click `Manually`. This creates an AWS External ID which is used for configuration of the AWS IAM role. For more information about the External ID, see the [IAM User Guide][3].
3. Copy this value to your clipboard or notepad.  
  **Note: Do not close the integration tile or the Datadog application page**, as this causes the external ID value to reset.

### AWS IAM Policy for Datadog
Create an IAM policy for the Datadog role in your AWS account with [all permissions][4] to take advantage of every AWS integration offered by Datadog. As other components are added to an integration, these permissions may change. If you would like to use Datadog's [Cloud Security Posture Management product][5], you must also add additional permissions by attaching the [AWS SecurityAudit Policy][6] to the role.

4. Create a new policy in the AWS [IAM Console][7].
5. Select the `JSON` tab. Paste the [permission policies][4] in the textbox. 
6. Add the [AWS SecurityAudit Policy][6] permissions if you would like to use Datadog's [Cloud Security Posture Management product][5].
7. Click `Next: Tags` and `Review policy`.
8. Name the policy `DatadogAWSIntegrationPolicy` or one of your own choosing, and provide an apt description.
9. Click `Create policy`.

### AWS IAM Role for Datadog
Create an IAM role for Datadog to use the permissions defined in the IAM policy.

10. Create a new role in the AWS [IAM Console][8].
11. Select `Another AWS account` for the Role Type.
12. For Account ID, enter `464622532012` (Datadog's account ID). This means that you are granting Datadog access to your AWS data.
13. Select `Require external ID` and enter the one generated in [AWS External ID](#generate-an-external-id). 
Make sure you leave **Require MFA** disabled. 
14. Click `Next`.
15. If you've already created the policy, search for it on this page and select it. Otherwise, click `Create Policy`, which opens in a new window, and follow the instructions from [AWS IAM Policy for Datadog](#aws-iam-policy-for-datadog). 
16. Click `Next: Tags` and `Next: Review`.
17. Give the role a name such as `DatadogAWSIntegrationRole`, as well as an apt description. 
18. Click `Create Role`.

### Complete the setup in Datadog

19. Returning to the [AWS integration tile][2] page in your Datadog account that you had open in another tab, enter your AWS Account ID **without dashes**, for example: `123456789012`. Your Account ID can be found in the ARN of the role created for Datadog.
20. Enter the name of the created role. **Note:** The role name you enter in the integration tile is case sensitive and must exactly match the role name created on the AWS side.
21. If there is a [Datadog is not authorized to perform sts:AssumeRole][9] error, make sure your AWS trust policy's `sts:ExternalId:` matches the [`AWS External ID`](#generate-an-external-id) previously created in the integration tile.
22. Optionally, customize the AWS services to collect metrics from on the left side of the dialog.
23. Optionally, add tags to all hosts and metrics.
24. Optionally, monitor a subset of EC2 instances by entering the AWS tags in the textbox `to hosts with tag`. **Note:** This also applies to an instance's attached EBS volumes.
25. Optionally, monitor a subset of Lambdas by entering the AWS tags in the textbox `to Lambdas with tag`.
26. Click **Install Integration**.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: /integrations/amazon_web_services/?tab=roledelegation#datadog-aws-iam-policy
[5]: https://docs.datadoghq.com/security_platform/cspm
[6]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[7]: https://console.aws.amazon.com/iam/home#/policies
[8]: https://console.aws.amazon.com/iam/home#/roles
[9]: /integrations/faq/error-datadog-not-authorized-sts-assume-role/#pagetitle
