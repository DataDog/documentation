---
title: Azure Resource Manager (ARM)
private: true
further_reading:
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Azure integration"
  - link: "https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/"
    tag: Blog
    text: "Enable monitoring for enterprise-scale Azure environments in minutes with Datadog"
---

## Overview

Azure Resource Manager (ARM) is a service that you can use to create, update, and delete resources in your Azure environment. For more information, see [What is Azure Resource Manager?][1]

## Prerequisites

You must have permission on the **management group** to configure data and log forwarding for any subscriptions you want to monitor.

## When to choose ARM over other setup methods?

Use the ARM setup method if you want to:
   - automate deployment through the Azure portal
   - manage your infrastructure through declarative templates
   - centrally control access, tags, and billing
   - redeploy your resources in the correct order and in a consistent way

Choose other setup methods if you want to:
   - create resources that ARM cannot directly manage (such as App Registrations)
   - apply custom tags to your resources

## Setup

1. In the Azure integration tile, select **Configuration** > **New App Registration** > **Using Azure Portal**.

2. Select **Management Group (Auto-Discover)** or **Individual Subscriptions**.
   - If you select Management Group, Datadog automatically discovers and monitors any subscriptions within that selected scope, including any subscriptions created in the future. You must have the owner role in the Management Group selected.
   - If you select Individual Subscriptions, you must have the owner role in any subscriptions you want to monitor.

3. Click **Open Template**.

{{< img src="integrations/guide/azure_manual_setup/azure_tile_arm_template.png" alt="The Azure tile in the Datadog integrations page with Using Azure Portal and Management Group selected" popup="true" style="width:80%;" >}}

4. Select the **Region**, **Subscription**, and **Resource Group** for the template to be deployed.

   **Note**: The selection of region, subscription, and resource group only defines where this template is deployed. It has no impact on which subscriptions are monitored by Datadog.

5. Click **Next**.

6. Select the _Create new_ option in **Service principal type**. 
7. Click the **Change selection** link in **Service principal**.
A form to create a new app registration is displayed:

{{< img src="integrations/guide/azure_manual_setup/arm_template_service_principal.png" alt="The service principal page in the Azure ARM template with the option to Create New selected and the link to Change Selection highlighted" popup="true" style="width:80%;" >}}

8. Enter a name for the app registration, select the supported account types, and click **Register**.

9. A page opens to create a client secret. Click **+ New client secret** to add a client secret.

10. Copy the value of the client secret, and click the close **(X)** button in the top-right corner of the screen.

11. Paste the value of the client secret in the corresponding field on the template, and click **Next**.

12. Provide a Datadog API key and Datadog application key value in the corresponding fields. If you launched the template from the Azure integration page in Datadog, you can copy the keys provided there. Otherwise, you can find your API and application keys in the Access section of the Organization Settings page in Datadog.

    **Note**: If you've selected to monitor individual subscriptions rather than a management group, select the subscriptions to monitor from the **Subscriptions to monitor** dropdown.

13. Select your Datadog site, as well as any other integration configuration options, such as host filters and whether to collect resources for [Cloud Security][2].

14. Click **Review + create**, then click **Create**.

15. After the deployment has completed, click **Done** in the Azure integration page in Datadog to refresh the list and review your newly added App Registration.

## Next steps

- Check out the [Azure Overview dashboard][3] to start getting insights into your Azure environment
- Check out [Azure monitor templates][4] to start getting alerts for the data that's important to your organization


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/azure/azure-resource-manager/management/overview
[2]: /security/cloud_security_management/
[3]: https://app.datadoghq.com/dash/integration/71/azure-overview
[4]: https://app.datadoghq.com/monitors/templates?q=azure
