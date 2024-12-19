---
title: Agentless Scanning Quick Start for Cloud Security Management
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/cloudformation"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using AWS CloudFormation"
  - link: "/security/cloud_security_management/setup/agentless_scanning/terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
---

Designed for new users, the quick start workflow offers an efficient setup process for Cloud Security Management, enabling immediate monitoring of AWS resources. It uses AWS CloudFormation to automate the configuration, and includes the Cloud Security Management features: Misconfigurations, Identity Risks (CIEM), and Vulnerability Management.

<div class="alert alert-info">This article provides instructions for the new user quick start workflow that uses AWS CloudFormation to set up Agentless Scanning.
For existing users who want to add a new AWS account or enable Agentless Scanning on an existing integrated AWS account, see the instructions for
<a href="/security/cloud_security_management/setup/agentless_scanning/terraform">Terraform</a>,
<a href="/security/cloud_security_management/setup/agentless_scanning/cloudformation">AWS CloudFormation</a>
 or <a href="/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager">Azure Resource Manager</a>.</div>

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">Agentless Scanning with Terraform</a> as the default template.</div>

## Installation

1. On the [Intro to Cloud Security Management][4] page, click **Get Started with Cloud Security Management**.
1. Click **Quick Start**. The **Features** page is displayed, showing the features included with Agentless Scanning Quick Start.
1. Click **Start Using Cloud Security Management** to continue.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
1. Send **AWS Logs to Datadog** and **Enable Cloud Security Management** are automatically selected by default. Leave the selections as is.
1. In the **Agentless Scanning** section, toggle **Host Vulnerability Scanning**, **Container Vulnerability Scanning**, **Lambda Vulnerability Scanning**, and **Data Security Scanning** to the on position.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

## Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly, so you can get access to new features and bug fixes as they get released. To do so, follow these steps:
1. Log in to your AWS console and go to the CloudFormation Stacks page.
2. Select the **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation sub-stack, click **Update**, then click **Update nested stack**.
3. Click **Replace existing template**.
4. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][11]. Paste that URL into the **Amazon S3 URL** field.
5. Click **Next** to advance through the next several pages without modifying them, then submit the form.

## Disable Agentless Scanning

1. On the [Cloud Security Management Setup][10] page, click **Cloud Integrations** > **AWS**.
1. To disable Agentless Scanning for an account, click the **Edit** button {{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}} and toggle the **Agentless Scanning** section to the off position.
1. Click **Done**.

## Uninstall Agentless Scanning

To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /integrations/amazon_web_services/
[3]: /agent/remote_config/?tab=configurationyamlfile#setup
[4]: https://app.datadoghq.com/security/csm/intro
[6]: mailto:success@datadoghq.com
[7]: mailto:success@datadoghq.com
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
