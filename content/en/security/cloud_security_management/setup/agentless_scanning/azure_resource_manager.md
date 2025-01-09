---
title: Setting up Agentless Scanning using Azure Resource Manager
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
---

If you've already [set up Cloud Security Management][3] and want to add a new Azure subscription or enable [Agentless Scanning][1] on an existing integrated Azure subscription, you can use either [Terraform][2] or Azure Resource Manager. This article provides detailed instructions for the Azure Resource Manager approach.

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">Agentless Scanning with Terraform</a> as the default template.</div>

## Enable Agentless Scanning

{{< tabs >}}
{{% tab "New Azure subscription" %}}

### Set up the Datadog Azure integration

Follow the instructions for setting up the [Datadog Azure integration][1].

{{% csm-agentless-azure-resource-manager %}}

[1]: /integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "Existing Azure subscription" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}
{{< /tabs >}}

## Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Disable Agentless Scanning

1. On the [Cloud Security Management Setup][3] page, click **Cloud Integrations** > **Azure**.
1. Locate your subscription's tenant, expand the list of subscriptions, and identify the subscription for which you want to disable Agentless Scanning.
1. Click the **Edit** button {{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}} and toggle **Vulnerability Scanning** to the off position.
1. Click **Done**.

## Uninstall with Azure Resource Manager

To uninstall Agentless Scanning, log in to your Azure subscription. If you created a dedicated resource group for the Agentless scanner, delete this resource group along with the following Azure role definitions:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

If you did not use a dedicated resource group, you must manually delete the scanner resources, which can be identified by the tags `Datadog:true` and `DatadogAgentlessScanner:true`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /security/cloud_security_management/setup/agentless_scanning/terraform
[3]: https://app.datadoghq.com/security/configuration/csm/setup
