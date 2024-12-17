---
title: Setting up Agentless Scanning using Azure Resource Manager
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
aliases:
  - /security/cloud_security_management/guide/agentless_azure_integration
---

If you've already [set up Cloud Security Management][3] and want to add a new Azure subscription or enable [Agentless Scanning][1] on an existing integrated Azure subscription, you can use either [Terraform][2] or Azure Resource Manager. This article provides detailed instructions for the Azure Resource Manager approach.

<div class="alert alert-info">If you want to enable agentless scanning for an azure subscription that is not already integrated in Datadog, start by <a href="/integrations/guide/azure-manual-setup/?tab=azurecli">integrating the azure subscription</a> then enable agentless scanning by following the tutorial below.</div>

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">Agentless Scanning with Terraform</a> as the default template.</div>

{{< tabs >}}
{{% tab "Existing Azure subscription" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations** > **Azure**.
1. Locate the tenant id of your subscription.
1. **[OPTIONAL]:** you can enable **Resource Scanning** for the tenant to also enable misconfigurations detection.
1. Expand the list of azure subscriptions and locate the Azure subscription where you want to deploy the Agentless scanner.
1. Click on the **Enable** button of **VULNERABILITY SCANNING**.
1. The **Vulnerability Scanning** dialog is displayed. Switch the **Vulnerability Scanning** toggle button on.
1. In the **Agentless Scanning** section, select **Azure Resource Manager**.
1. Click on **Launch Azure Resource Manager**.
1. You will be redirected to the Azure portal. Once logged in, the template creation form is displayed.
1. Select your subscription and your resource group. It is **strongly recommended** to deploy the Datadog Agentless Scanner in a **dedicated resource group**.
1. Use your Datadog Api Key and complete the rest of the form.
1. Click on **Review + create**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Disable Agentless Scanning

1. On the [Cloud Security Management Setup][3] page, click **Cloud Integrations** > **Azure**.
1. Locate the tenant of your subscription, expand the list of subscriptions and locate the subscription for which you want to disable Agentless Scanning.
1. Click the **Edit** button {{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}} and toggle the **Vulnerability Scanning** button to the off position.
1. Click **Done**.

## Uninstall with Azure Resource Manager

To uninstall Agentless Scanning, log in to your Azure subscription and delete the Resource Manager stack created for Agentless Scanning.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /security/cloud_security_management/setup/agentless_scanning/terraform
[3]: https://app.datadoghq.com/security/configuration/csm/setup
