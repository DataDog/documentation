---
title: Agentless Scanning Quick Start for Cloud Security Management
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/guide/agentless_scanning_terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
  - link: "/security/cloud_security_management/guide/agentless_aws_integration"
    tag: "Documentation"
    text: "Setting up Agentless Scanning with the AWS Integration"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

The Agentless Scanning Quick Start provides a streamlined setup workflow for Cloud Security Management, enabling you to start monitoring your AWS resources immediately.

<div class="alert alert-info">This guide provides instructions for setting up Agentless Scanning using the Cloud Security Management quick start workflow. Instructions for setting up Agentless Scanning using <a href="/security/cloud_security_management/guide/agentless_terraform">Terraform</a> or by utilizing the <a href="/security/cloud_security_management/guide/agentless_aws_integration">CloudFormation template with the AWS integration</a> are also available.</div>

## About Agentless Scanning

[Agentless Scanning][1] provides visibility into vulnerabilities that exist within your AWS hosts, running containers, Lambda functions, and Amazon Machine Images (AMIs), without requiring you to install the Datadog Agent.

## Prerequisites

Before setting up Agentless Scanning, ensure the following prerequisites are met:

- **AWS integration**: The [AWS integration][2] must be installed and configured for your AWS accounts.
- **Remote Configuration**: [Remote Configuration][3] is required to enable Datadog to send information to Agentless scanners, such as specifying which cloud resources to scan.
- **IAM permissions**: The Agentless Scanning instance requires specific IAM permissions to scan hosts, containers, and Lambda functions. These permissions are automatically applied as part of the installation process.<br><br>
  {{< collapse-content title="Host and container permissions" level="h5" >}}
  <ul>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:GetSnapshotBlock</code></li>
  </ul>
  {{< /collapse-content >}} 

  {{< collapse-content title="Lambda permissions" level="h5" >}}
  <ul><li><code>lambda:GetFunction</code></li></ul>
  {{< /collapse-content >}} 

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

To exclude AWS hosts, containers, and Lambda functions (if applicable) from scans, set the tag `CompanyAgentlessScanner:false` on each of these resources. For detailed instructions on adding this tag, refer to the [AWS documentation][5].

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
[5]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup