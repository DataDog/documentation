---
title: Agentless Scanning Quick Start for Cloud Security Management
---

Available for new Cloud Security Management users, the Agentless Scanning quick start workflow provides a streamlined setup process, enabling immediate monitoring of AWS resources.

<div class="alert alert-info">This guide provides instructions for setting up Agentless Scanning using the quick start workflow. Instructions for setting up Agentless Scanning using <a href="/security/cloud_security_management/setup/agentless_scanning/terraform">Terraform</a> or by <a href="/security/cloud_security_management/setup/agentless_scanning/cloudformation">using the AWS CloudFormation template</a> are also available.</div>

## Installation

1. On the [Intro to Cloud Security Management][4] page, click **Get Started with Cloud Security Management**.
1. Click **Quick Start**. The **Features** page is displayed, showing the features included with Agentless Scanning Quick Start.
1. Click **Start Using Cloud Security Management** to continue.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
1. Send **AWS Logs to Datadog** and **Enable Cloud Security Management** are automatically selected by default. Leave the selections as is.
1. In the **Agentless Scanning** section, switch the toggles for **Host Vulnerability Scanning**, **Container Vulnerability Scanning**, **Lambda Vulnerability Scanning**, and **Data Security Scanning** to the on position.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners

## How to exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Disable Agentless Scanning

1. On the [Cloud Security Management Setup][10] page, click **Cloud Integrations**.
1. Expand the **AWS** section.
1. To disable Agentless Scanning for an account, click the **Edit** button and switch the toggles in the **Agentless Scanning** section to the off position.
1. Click **Done**.

<div class="alert alert-info">To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.</div>

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