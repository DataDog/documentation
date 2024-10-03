---
title: Enabling Agentless Scanning
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security Management"
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Prerequisites

Before setting up Agentless Scanning, ensure the following prerequisites are met:

- **AWS integration**: The [AWS integration][2] must be installed and configured for your AWS accounts.
- **Remote Configuration**: [Remote Configuration][3] is required to enable Datadog to send information to Agentless scanners, such as which cloud resources to scan.
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

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">Agentless Scanning with Terraform</a> as the default template.</div>

To enable Agentless Scanning, use one of the following workflows:

### Quick start

Designed for new users, the [quick start workflow][5] offers an efficient setup process for Cloud Security Management, enabling immediate monitoring of AWS resources. It uses AWS CloudFormation to automate the configuration.

### Terraform

The [Terraform Datadog Agentless Scanner module][6] provides a simple and reusable configuration for installing the Datadog Agentless scanner. For more information, see [Setting up Agentless Scanning using Terraform][7].

### AWS CloudFormation

Use the AWS CloudFormation template to create a CloudFormation stack. The template includes the IAM permissions required to deploy and manage Agentless scanners. For more information, see [Setting up Agentless Scanning using AWS CloudFormation][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /integrations/amazon_web_services/
[3]: /agent/remote_config/?tab=configurationyamlfile#setup
[4]: https://app.datadoghq.com/security/csm/intro
[5]: /security/cloud_security_management/setup/agentless_scanning/quick_start
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: /security/cloud_security_management/setup/agentless_scanning/terraform
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: /security/cloud_security_management/setup/agentless_scanning/cloudformation