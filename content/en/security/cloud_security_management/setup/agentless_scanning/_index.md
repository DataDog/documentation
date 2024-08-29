---
title: Enabling Agentless Scanning
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/guide/agentless_terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
  - link: "/security/cloud_security_management/guide/agentless_aws_integration"
    tag: "Documentation"
    text: "Setting up Agentless Scanning with the AWS Integration"
  - link: "/security/cloud_security_management/setup/custom_onboarding"
    tag: "Documentation"
    text: "Custom Onboarding for Cloud Security Management"
aliases:
  - /security/cloud_security_management/setup/agentless_scanning
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

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

## Setup

To enable Agentless Scanning, use one of the following workflows:

### Quick start

Available for new users, the [quick start workflow][5] provides a streamlined setup process for Cloud Security Management, enabling immediate monitoring of AWS resources.

### Terraform

The [Terraform Datadog Agentless Scanner module][6] provides a simple and reusable configuration for installing the Datadog Agentless scanner. For more information, see [Setting up Agentless Scanning using Terraform][7].

### AWS CloudFormation

Use the AWS CloudFormation template to create a CloudFormation stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /integrations/amazon_web_services/
[3]: /agent/remote_config/?tab=configurationyamlfile#setup
[4]: https://app.datadoghq.com/security/csm/intro
[5]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[6]: mailto:success@datadoghq.com
[7]: mailto:success@datadoghq.com
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup