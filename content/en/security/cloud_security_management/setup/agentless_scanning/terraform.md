---
title: Setting up Agentless Scanning using Terraform
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/quick_start"
    tag: "Documentation"
    text: "Agentless Scanning Quick Start for Cloud Security Management"
  - link: "/security/cloud_security_management/setup/agentless_scanning/cloudformation"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using AWS CloudFormation"
---

For users who have already set up Cloud Security Management and want to add a new AWS account or enable Agentless Scanning on an existing integrated AWS account, you can install and configure [Agentless Scanning][1] using Terraform or [AWS CloudFormation][2]. This article provides detailed instructions for the Terraform approach.

<div class="alert alert-info">If you're setting up Cloud Security Management for the first time, you can follow the <a href="/security/cloud_security_management/setup/agentless_scanning/quick_start">quick start workflow</a>, which uses AWS CloudFormation to enable Agentless Scanning.</div>

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
{{< /tabs >}}

## How to exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Uninstall with Terraform

Follow the instructions for [Terraform][3] uninstallation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /security/cloud_security_management/setup/agentless_scanning/cloudformation
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall