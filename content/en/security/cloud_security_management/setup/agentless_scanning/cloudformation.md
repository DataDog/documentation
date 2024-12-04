---
title: Setting up Agentless Scanning using AWS CloudFormation
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/quick_start"
    tag: "Documentation"
    text: "Agentless Scanning Quick Start for Cloud Security Management"
  - link: "/security/cloud_security_management/setup/agentless_scanning/terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
aliases:
  - /security/cloud_security_management/guide/agentless_aws_integration
---

If you've already [set up Cloud Security Management][3] and want to add a new AWS account or enable [Agentless Scanning][1] on an existing integrated AWS account, you can use either [Terraform][2] or AWS CloudFormation. This article provides detailed instructions for the AWS CloudFormation approach.

<div class="alert alert-info">If you're setting up Cloud Security Management for the first time, you can follow the <a href="/security/cloud_security_management/setup/agentless_scanning/quick_start">quick start workflow</a>, which also uses AWS CloudFormation to enable Agentless Scanning.</div>

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">Agentless Scanning with Terraform</a> as the default template.</div>

{{< tabs >}}
{{% tab "New AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations** > **AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
1. Send **AWS Logs to Datadog** and **Enable Cloud Security Management** are automatically selected by default. Leave the selections as is.
1. In the **Agentless Scanning** section, toggle **Host Vulnerability Scanning**, **Container Vulnerability Scanning**, **Lambda Vulnerability Scanning**, and **Data Security Scanning** to the on position.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations** > **AWS**.
1. Click the **Edit** button {{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}} for the AWS account where you want to deploy the Agentless scanner.
1. Verify that **Enable Resource Scanning** is toggled on. If it isn't, switch the **Enable Resource Scanning** toggle to the on position and complete Steps 3-7 in [New AWS Account][2].
1. In the **Agentless Scanning** section, toggle **Host Vulnerability Scanning**, **Container Vulnerability Scanning**, **Lambda Vulnerability Scanning**, and **Data Security Scanning** to the on position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: /security/cloud_security_management/setup/agentless_scanning/cloudformation?tab=newawsaccount

{{% /tab %}}
{{< /tabs >}}

## Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly, so you can get access to new features and bug fixes as they get released. To do so, follow these steps:
1. Log in to your AWS console and go to the CloudFormation Stacks page.
2. Select the **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation sub-stack, click **Update**, then click **Update nested stack**.
3. Click **Replace existing template**.
4. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][4]. Paste that URL into the **Amazon S3 URL** field.
5. Click **Next** to advance through the next several pages without modifying them, then submit the form.

## Disable Agentless Scanning

1. On the [Cloud Security Management Setup][3] page, click **Cloud Integrations** > **AWS**.
1. To disable Agentless Scanning for an account, click the **Edit** button {{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}} and toggle the **Agentless Scanning** section to the off position.
1. Click **Done**.

## Uninstall with CloudFormation

To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /security/cloud_security_management/setup/agentless_scanning/terraform
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
