---
title: Agentless Scanning Quick Start for Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

The Agentless Scanning Quick Start provides a streamlined setup workflow for Cloud Security Management, allowing you to start monitoring your AWS resources immediately.

## About Agentless Scanning

[Agentless Scanning][1] provides visibility into vulnerabilities that exist within your AWS hosts, running containers, Lambda functions, and Amazon Machine Images (AMIs), without requiring you to install the Datadog Agent.

## Prerequisites

- AWS integration
- Remote Configuration
- IAM permissions<br>
  
  **Note**: The following IAM permissions are applied automatically as a part of the installation process.<br><br>

  {{< collapse-content title="IAM (host and container permissions)" level="h5" >}}
```
ec2:DescribeVolumes
ec2:CreateTags
ec2:CreateSnapshot
ec2:DeleteSnapshot
ec2:DescribeSnapshots
ec2:DescribeSnapshotAttribute
ebs:ListSnapshotBlocks
ebs:ListChangedBlocks
ebs:GetSnapshotBlock
```
  {{< /collapse-content >}} 

  {{< collapse-content title="Lambda permissions" level="h5" >}}
  lambda:GetFunction
  {{< /collapse-content >}} 

## Installation

1. On the Intro to Cloud Security Management page, click **Get Started with Cloud Security Management**.
2. Select **Quick Start**.
3. Features page read-only. Shows features that are included with Agentless Scanning Quick Start. Click **Start Using Cloud Security Management** to continue.
4. AWS tabs here.
   {{< tabs >}}
{{% tab "Agentless scanning (new AWS account)" %}}

1. Set up the [Amazon Web Services][1] integration. You must also add the required [permissions][2] for resource collection.
1. Click **Yes** under **Enable Cloud Security Management**, and enable scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. Select an API key that is already configured for Remote Configuration. If you enter an API key that does not have Remote Configuration enabled, it will automatically be activated upon selection.
1. Click **Launch CloudFormation Template**. The template includes all the necessary [permissions][3] to deploy and manage Agentless scanners. The template must run successfully to receive scans.

[1]: /integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#resource-collection
[3]: /security/cloud_security_management/setup/agentless_scanning/?tab=agentlessscanningnewawsaccount#permissions

{{% /tab %}}

{{% tab "Agentless scanning (existing AWS account)" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud accounts > AWS**.
1. Click the **Edit scanning** button for the AWS account where you intend to deploy the Agentless scanner.
1. **Enable Resource Scanning** should already be enabled. Enable scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. Go to your AWS console, create a new CloudFormation Stack using [this template][2], and then run it.
1. Make sure the template runs successfully, then click **Done** to begin scanning. 

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="Setup page for Agentless scanning showing toggle options for Resource Scanning" width="90%" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/cloudformation/main.yaml

{{% /tab %}}
{{< /tabs >}}

## How to exclude resources from scans

Set the tag `DatadogAgentlessScanner:false` on AWS hosts, containers, and Lambda functions (if applicable), to be excluded from scans. To add this tag to your resources, follow the [AWS documentation][3].

## Disable Agentless Scanning

To disable Agentless Scanning in an AWS account, disable scanning for each cloud resource:
1. On the [Cloud Security Management Setup][10] page, click **Cloud accounts > AWS**.
1. Click the **Edit scanning** button for the AWS account where you deployed the Agentless scanner.
1. In the **Agentless Scanning** section, disable scanning for the cloud resources you want to stop monitoring.
1. Click **Done**.
 
### Uninstall with CloudFormation

Go to your AWS console, and remove the CloudFormation stack that was created for Agentless Scanning.

### Uninstall with Terraform

Follow the instructions for [Terraform][9] uninstallation.

[1]: /security/cloud_security_management/agentless_scanning
[3]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[4]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup

