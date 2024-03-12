---
title: Setting up CSM Agentless Scanning
kind: documentation
---

<div class="alert alert-info">CSM Agentless scanning is in beta.</div>

To configure CSM Agentless scanning for your hosts and containers, use the following steps:

{{% csm-agentless-prereqs %}}

## Deployment methods

There are two ways to deploy Agentless scanners in your environment, manually using Terraform, or by using the Cloud Formation template with the AWS Integration.

**Note**: When using Agentless scanning, there are additional costs for running scanners in your cloud environments. To optimize on costs while being able to reliably scan every 12 hours, Datadog recommends to setup Agentless scanning with Terraform as the default template, as this also avoids cross-region networking. 

To establish estimates on scanner costs, reach out to your [Datadog Customer Success Manager.][8]

{{< tabs >}}
{{% tab "Terraform (cross-region scanning)" %}}

With this option, Agentless scanners are deployed on a single cloud account and are distributed across multiple regions within the account. Agentless scanners are granted visibility across multiple accounts without needing to perform cross-region scans, which are expensive in practice.

For larger accounts with 250 or more hosts, this is the most cost-effective option since cross-region scans are avoided, and reduces friction to manage your Agentless scanners, as they are located in a single account. You can either create a dedicated account for your Agentless scanners or choose an existing one. The account where the Agentless scanners are located can also be scanned.

The following diagram illustrates how Agentless scanning works when deployed in a central cloud account:

<img src="/images/security/agentless_scanning/agentless_advanced.png" alt="Diagram of Agentless scanning showing the Agentless scanner is deployed in a central Cloud account" width="90%">

{{% /tab %}}
{{% tab "AWS Integration (same account scanning)" %}}

With this option, a single Agentless scanner is deployed per account. Although this can incur more costs, as it requires each Agentless scanner to perform cross-region scans per account, Datadog recommends this option if you do not want to grant cross-account permissions.

The following diagram illustrates how Agentless scanning works when deployed within each Cloud account:

<img src="/images/security/agentless_scanning/agentless_quickstart.png" alt="Diagram of Agentless scanning showing the Agentless scanner is deployed in each Cloud account" width="90%">

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#setup

{{% /tab %}}
{{< /tabs >}}


**Note**: The actual data that is scanned remains within your infrastructure, and only the collected Software Bill of Materials (SBOMs) are reported back to Datadog.

## Installation

### Terraform

{{< tabs >}}
{{% tab "Agentless scanning (new AWS account)" %}}

1. Follow the setup instructions for [AWS cloud environments][3] to add cloud accounts to CSM.
1. Once complete, on the [Cloud Security Management Setup][1] page, click Cloud accounts.
1. Expand the AWS section.
1. Choose one account to deploy Agentless scanners.
1. Click **Edit scanning options** for the account chosen.
1. **Enable Resource Scanning** should already be enabled. Turn on scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. Follow instructions for [Terraform][4] setup.
1. Click **Done** to begin scanning. Make sure the template runs successfully before clicking "Done".

<img src="/images/security/agentless_scanning/agentless_scanning_setup.png" alt="Setup page for Agentless scanning showing toggle options for Resource Scanning" width="90%">


[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /security/cloud_security_management/setup/csm_enterprise/cloud_accounts/?tab=aws
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Agentless scanning (existing AWS account)" %}}

1. For this account, on the [Cloud Security Management Setup][1] page, click Cloud accounts.
1. Expand the AWS section.
1. Choose one account to deploy Agentless scanners.
1. Click Edit scanning options for the account chosen.
1. **Enable Resource Scanning** should already be enabled. Turn on scanning for the cloud resources you want to monitor in the **Agentless Scanning** section.
1. Follow instructions for [Terraform][4] setup.
1. Click **Done** to begin scanning. Make sure the template runs successfully before clicking "Done".

<img src="/images/security/agentless_scanning/agentless_scanning_setup.png" alt="Setup page for Agentless scanning showing toggle options for Resource Scanning" width="90%">

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md


{{% /tab %}}
{{< /tabs >}} </br>

### AWS Integration

{{< tabs >}}
{{% tab "Agentless scanning (new AWS account)" %}}

1. Set up the [Amazon Web Services][1] integration. You must also add the required [permissions][2] for resource collection.

When you add a new AWS account, the following screen appears:

<img src="/images/security/agentless_scanning/agentless_scanning_aws.png" alt="Setup page for Agentless scanning for adding a new AWS account with adding a single AWS account selected" width="90%">
</br>

1. Once you click "Yes" for **Enable Cloud Security Management**, turn on scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. From there, add an API key. The API key will have Remote Configuration automatically enabled.
1. Finally, click **Launch CloudFormation Template**. The template will include all the necessary permissions to deploy and manage Agentless scanners. The template must run successfully in order to get scans.

[1]: /integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#resource-collection

{{% /tab %}}

{{% tab "Agentless scanning (existing AWS account)" %}}

1. For this account, on the [Cloud Security Management Setup][1] page, click Cloud accounts.
1. Expand the AWS section.
1. Choose one account to deploy Agentless scanners.
1. Click Edit scanning options for the account chosen.
1. **Enable Resource Scanning** should already be enabled. Turn on scanning for the cloud resources you want to monitor in the **Agentless scanning** section.
1. Go to your AWS console, create a new CloudFormation Stack with [this template][2], and run it.
1. Click **Done** to begin scanning. Make sure the template runs successfully before clicking "Done".

<img src="/images/security/agentless_scanning/agentless_scanning_setup.png" alt="Setup page for Agentless scanning showing toggle options for Resource Scanning" width="90%">

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/cloudformation/main.yaml

{{% /tab %}}
{{< /tabs >}}

## Resource exclusion

Set the tag `DatadogAgentlessScanner:false` on AWS hosts, containers, and/or Lambda functions to be excluded from scans. To add this tag to your resources, follow [AWS documentation][3].

## Disabling Agentless scanning
To disable Agentless Scanning through the cloud formation template, remove roles, or the EC2 scanner instance.

 

[1]: /security/vulnerabilities
[2]: https://www.cisa.gov/sbom
[3]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[8]: mailto:success@datadoghq.com



