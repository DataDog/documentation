---
title: Setting up Agentless Scanning for Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Agentless Scanning for Cloud Security Management is in public beta for AWS cloud environments.</div>

Agentless Scanning provides visibility into vulnerabilities that exist within your AWS hosts, running containers, Lambda functions, and Amazon Machine Images (AMIs), without requiring you to install the Datadog Agent. 


{{% csm-agentless-prereqs %}}

## Deployment methods

There are two recommended ways to deploy Agentless scanners in your environment, either using cross-account scanning, or same account scanning.

**Note**: When using Agentless Scanning, there are additional costs for running scanners in your cloud environments. To optimize on costs while being able to reliably scan every 12 hours, Datadog recommends setting up Agentless Scanning with Terraform as the default template, as this also avoids cross-region networking. 

To establish estimates on scanner costs, reach out to your [Datadog Customer Success Manager.][8]

{{< tabs >}}
{{% tab "Cross-account scanning" %}}

With cross-account scanning, Agentless scanners are deployed across multiple regions in a single cloud account. The deployed Agentless scanners are granted visibility across multiple accounts without needing to perform cross-region scans, which are expensive in practice.

For larger accounts with 250 or more hosts, this is the most cost-effective option as it avoids cross-region scans, and reduces friction for managing your Agentless scanners. You can either create a dedicated account for your Agentless scanners or choose an existing one. The account where the Agentless scanners are located can also be scanned.

The following diagram illustrates how Agentless scanning works when deployed in a central cloud account:


{{< img src="/security/agentless_scanning/agentless_advanced_2.png" alt="Diagram of Agentless scanning showing the Agentless scanner is deployed in a central Cloud account" width="90%" >}}

{{% /tab %}}
{{% tab "Same account scanning" %}}

With same account scanning, a single Agentless scanner is deployed per account. Although this can incur more costs, as it requires each Agentless scanner to perform cross-region scans per account, Datadog recommends this option if you do not want to grant cross-account permissions.

The following diagram illustrates how Agentless scanning works when deployed within each Cloud account:

{{< img src="/security/agentless_scanning/agentless_quickstart_2.png" alt="Diagram of Agentless scanning showing the Agentless scanner is deployed in each Cloud account" width="90%" >}}

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#setup

{{% /tab %}}
{{< /tabs >}}


**Note**: The actual data that is scanned remains within your infrastructure, and only the collected list of packages, as well as information related to collected hosts (hostnames/EC2 Instances) are reported back to Datadog.

## Installation

There are two ways to install and configure Agentless scanning for your cloud environments, manually using Terraform, or by using the CloudFormation template with the AWS Integration.

### Terraform

{{< tabs >}}
{{% tab "Agentless scanning (new AWS account)" %}}

1. Follow the setup instructions for adding [AWS cloud accounts][3] to Cloud Security Management.
1. On the [Cloud Security Management Setup][1] page, click **Cloud accounts > AWS**.
1. Click the **Edit scanning** button for the AWS account where you intend to deploy the Agentless scanner.
1. **Enable Resource Scanning** should already be enabled. Enable scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. Follow instructions for [Terraform][4] setup.
1. Make sure the template runs successfully, then click **Done** to begin scanning. 

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="Setup page for Agentless scanning showing toggle options for Resource Scanning" width="90%" >}}


[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /security/cloud_security_management/setup/csm_enterprise/cloud_accounts/?tab=aws
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Agentless scanning (existing AWS account)" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud accounts > AWS**.
1. Click the **Edit scanning** button for the AWS account where you intend to deploy the Agentless scanner.
1. **Enable Resource Scanning** should already be enabled. Enable scanning for the cloud resources you want to monitor in the **Agentless Scanning** section.
1. Follow instructions for [Terraform][4] setup.
1. Make sure the template runs successfully, then click **Done** to begin scanning. 

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="Setup page for Agentless scanning showing toggle options for Resource Scanning" width="90%" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md


{{% /tab %}}
{{< /tabs >}} </br>

### AWS integration

{{< tabs >}}
{{% tab "Agentless scanning (new AWS account)" %}}

1. Set up the [Amazon Web Services][1] integration. You must also add the required [permissions][2] for resource collection.

    When you add a new AWS account, the following screen appears:

{{< img src="/security/agentless_scanning/agentless_scanning_aws_2.png" alt="Setup page for Agentless scanning for adding a new AWS account with adding a single AWS account selected" width="90%">}}
</br>

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

## Resource exclusion

Set the tag `DatadogAgentlessScanner:false` on AWS hosts, containers, and Lambda functions (if applicable), to be excluded from scans. To add this tag to your resources, follow the [AWS documentation][3].

## Disabling Agentless Scanning

To disable Agentless Scanning in an AWS account, disable scanning for each cloud resource:
1. On the [Cloud Security Management Setup][10] page, click **Cloud accounts > AWS**.
1. Click the **Edit scanning** button for the AWS account where you deployed the Agentless scanner.
1. In the **Agentless Scanning** section, disable scanning for the cloud resources you want to stop monitoring.
1. Click **Done**.
 
### Uninstalling with CloudFormation

Go to your AWS console, and remove the CloudFormation stack that was created for Agentless Scanning.

### Uninstalling with Terraform

Follow the instructions for [Terraform][9] uninstallation.

[1]: /security/vulnerabilities
[3]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[4]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup

