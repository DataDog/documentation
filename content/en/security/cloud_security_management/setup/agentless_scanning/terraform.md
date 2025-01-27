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
aliases:
  - /security/cloud_security_management/guide/agentless_terraform
---

If you've already [set up Cloud Security Management][4] and want to add a new cloud account or enable [Agentless Scanning][1] on an existing integrated cloud account, you can use either Terraform, [AWS CloudFormation][2], or [Azure Resource Manager][5]. This article provides detailed instructions for the Terraform approach.

<div class="alert alert-info">If you're setting up Cloud Security Management for the first time, you can follow the <a href="/security/cloud_security_management/setup/agentless_scanning/quick_start">quick start workflow</a>, which uses AWS CloudFormation to enable Agentless Scanning.</div>

{{< tabs >}}
{{% tab "New AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations > AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Under **Choose a method for adding your AWS account**, select **Manually**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the **I confirm that the Datadog IAM Role has been added to the AWS Account** checkbox.
1. Enter the **AWS Account ID** and **AWS Role Name**.
1. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations > AWS**.
1. Click the **Edit scanning** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) for the AWS account where you want to deploy the Agentless scanner.
1. **Enable Resource Scanning** should already be toggled on. If it isn't, toggle **Enable Resource Scanning** to the on position.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. In the **Agentless Scanning** section, toggle **Host Vulnerability Scanning**, **Container Vulnerability Scanning**, **Lambda Vulnerability Scanning**, and **Data Security Scanning** to the on position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing Azure subscription" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations > Azure**.
1. Expand the Tenant containing the subscription where you want to deploy the Agentless scanner.
1. Click the **Enable** button for the Azure subscription where you want to deploy the Agentless scanner.
1. Toggle **Vulnerability Scanning** to the on position.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme

{{% /tab %}}
{{< /tabs >}}

## Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Disable Agentless Scanning

1. On the [Cloud Security Management Setup][4] page, click **Cloud Integrations**, and then expand the **AWS** or **Azure** section.
1. To disable Agentless Scanning for an account, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) and toggle **Vulnerability Scanning** to the off position.
1. Click **Done**.

## Uninstall with Terraform

Follow the instructions for [Terraform][3] uninstallation.

## Update the Terraform modules version

Update the `source` reference for the Agentless Scanner modules to the latest release. You can find the latest version on [GitHub Releases](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases).

For usage examples, refer to our [Github repository](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /security/cloud_security_management/setup/agentless_scanning/cloudformation
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
