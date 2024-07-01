---
title: Azure Native Integration Manual Setup Guide
kind: guide
description: "Steps for manually setting up the Datadog Azure native integration"
further_reading:
- link: "https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: Documentation
  text: Why should I install the Datadog Agent on my cloud instances?
- link: "https://docs.datadoghq.com/integrations/guide/azure-portal/"
  tag: Documentation
  text: Datadog in the Azure Portal
- link: "https://www.datadoghq.com/blog/azure-government-monitoring-datadog/"
  tag: Blog
  text: Monitor Azure Government with Datadog
- link: "https://www.datadoghq.com/blog/azure-container-apps/"
  tag: Blog
  text: Monitor Azure Container Apps with Datadog
- link: "https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/"
  tag: Blog
  text: How to Monitor Microsoft Azure VMs
- link: "https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/"
  tag: Blog
  text: Explore Azure App Service with the Datadog Serverless view
---

{{< site-region region="us3" >}}

## Overview

Use this guide to manually set up the Datadog Azure Native integration through creation of the Datadog resource in Azure.

The Datadog resource streamlines management and data collection for your Azure environment. Datadog recommends using this method when possible. This replaces the App Registration credential process used by the standard Azure integration for metric collection and Event Hub setup for log forwarding.

### Prerequisites

#### Required permissions

To set up the Azure Native integration, you must be an **Owner** on any Azure subscriptions you want to link, and **Admin** for the Datadog organization you are linking them to. Ensure you have the appropriate access before starting the setup.

## Setup

Configuring the Azure integration requires the creation of a Datadog resource in Azure. These resources represent the connection or link between a Datadog organization and an Azure subscription. Multiple Azure subscriptions can be connected to Datadog with a single Datadog resource. 

There are two options when you create a Datadog resource in Azure:

1. Link to an existing Datadog organization. This is the more common action. Use this to configure your Datadog org to monitor an Azure subscription that hasn't been linked yet. This action does not affect your Datadog billing plan.

2. Create a new Datadog organization. This flow is less common. Use this if you do not yet have a Datadog org and you want to get started with a paid plan through Azure Marketplace. This flow creates a brand new Datadog org, allows you to select a billing plan, and links the associated Azure subscription for monitoring.

**Note**: Trials are not available through the **Create a new Datadog organization** option in Azure. To get started with a free trial, first [create a trial Datadog org on the US3 site][1]. Then use the linking flow to add any subscriptions you want to monitor.

Once you create a Datadog resource, data collection begins for the associated subscription. See details for using this resource to configure, manage, and deploy Datadog in the [Managing the Azure Native Integration][2] guide.

### Create a Datadog resource

To start monitoring an Azure subscription, navigate to the [Datadog Service page in Azure][3] and select the option to create a new Datadog resource:
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog Service" responsive="true" style="width:90%;">}}

Choose **Link Azure subscription to an existing Datadog organization** or **Create a new Datadog organization**. Linking is the more common action. Use this to configure monitoring for an Azure subscription that hasn't been linked yet. Only choose the **Create** flow if you are not yet a Datadog customer and want to get started with a new, paid plan.

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 create a Datadog resource" responsive="true" style="width:90%;">}}

**Note**: New Datadog organizations created through the Azure portal automatically have billing consolidated into their Azure invoice. This usage counts towards your organization's [MACC][4] if applicable.

### SSO configuration

_(Optional)_: You can configure [single sign-on (SSO)][5] during the process of creating a new Datadog organization in Azure. You can also configure SSO later. To configure SSO during the initial creation, first create a Datadog enterprise gallery app.

### Configuration {#configuration-us3}

{{< tabs >}}
{{% tab "Link" %}}

#### Basics {#basics-link}

After selecting to link to an existing Datadog organization, the portal displays a form for creating the Datadog resource:
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Link Azure subscription to an existing Datadog organization" responsive="true" style="width:90%;">}}

Provide the following values:

| Property             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | The Azure subscription you want to monitor with Datadog. The Datadog resource exists in this subscription. You must have owner access.                                                                                       |
| Resource group       | Create a new resource group or use an existing one. A [resource group][5] is a container that holds related resources for an Azure solution.                                                                                 |
| Resource name        | Specify a name for the Datadog resource. The recommended naming convention is: `subscription_name-datadog_org_name`.                                                                                                         |
| Location             | The location is West US2—this is the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. Like all [Datadog sites][1], the US3 site is entirely SaaS and supports monitoring all Azure regions as well as other cloud providers and on-premises hosts. |
| Datadog organization | After the authentication step is completed, the Datadog organization name is set to the name of the Datadog organization being linked. The Datadog site is set to US3.                                                                                                                                |

Click **Link to Datadog organization** to open a Datadog authentication window, then sign in to Datadog.

By default, Azure links your current Datadog organization to your Datadog resource. If you want to link to a different organization, select the appropriate organization in the authentication window:

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3 select Datadog organization" responsive="true" style="width:90%;">}}

When the OAuth flow is complete, verify the Datadog organization name is correct.

[1]: /getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Create" %}}

#### Basics {#basics-create}

After selecting to create a new Datadog organization, the portal displays a form for creating both the Datadog resource and the new Datadog organization:
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Azure US3 create a Datadog resource" responsive="true" style="width:90%;">}}

Provide the following values:

| Property             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | The Azure subscription you want to monitor with Datadog. The Datadog resource exists in this subscription. You must have owner access.                                                                                       |
| Resource group       | Create a new resource group or use an existing one. A [resource group][2] is a container that holds related resources for an Azure solution.                                                                                 |
| Resource name        | The name for the Datadog resource. This name is assigned to the new Datadog organization.                                                                                                                                    |
| Location             | The location is West US2—this is the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. Like all [Datadog sites][1], the US3 site is entirely SaaS and supports monitoring all Azure regions as well as other cloud providers and on-premises hosts. |
| Datadog organization | The Datadog organization name is set to the resource name, and the Datadog site is set to US3.                                                                                                                                |
| Pricing plan         | A list of the available Datadog pricing plans. If you have a private offer, it iss available in this dropdown.                                                                                                                 |
| Billing term         | Monthly.                                                                                                                                                                                                                      |

[1]: /getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

### Deploy the Datadog Agent

{{< tabs >}}
{{% tab "VM Extension" %}}

To see a list of virtual machines (VMs) in the subscription, select **Virtual machine agent** in the left sidebar. On this page, you can install the Datadog Agent on a VM as an extension.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="The Datadog resource in Azure with Virtual machine agent selected and the Install extension option highlighted" responsive="true" style="width:90%;">}}

For each VM, the following information is displayed:

| Column               | Description                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name        | The VM's name                                                                                                                                                  |
| Resource status      | Whether the VM is stopped or running. The Datadog Agent can only be installed on a running VM. If the VM is stopped, installing the Datadog Agent is disabled. |
| Agent version        | The Datadog Agent version number                                                                                                                               |
| Agent status         | Whether the Datadog Agent is running on the VM.                                                                                                                |
| Integrations enabled | The key metrics being collected by enabled integrations in the Datadog Agent.                                                                                  |
| Install method       | The specific tool used to install the Datadog Agent, such as Chef, Azure VM extension, etc.                                                                    |
| Sending logs         | Whether the Datadog Agent is sending logs to Datadog.                                                                                                          |

#### Install

You can install the Datadog Agent directly in Azure with the VM Extension. To install the Datadog Agent: 

1. Select the appropriate VM.
2. Click **Install Extension**. 
3. The portal asks for confirmation to install the Agent with the default key. Select **OK** to begin installation. Azure shows the status as `Installing` until the Agent is installed and provisioned. After the Datadog Agent is installed, the status changes to `Installed`.

#### Uninstall

If the Datadog Agent was installed with the Azure VM extension:

1. Select the appropriate VM.
2. Click **Uninstall Agent**.

If the Agent was installed using a different method, you cannot use the Datadog resource to deploy or remove the Agent, but information about the Agent is still reflected on this page.

{{% /tab %}}
{{% tab "AKS Cluster Extension" %}}

The Datadog AKS Cluster Extension allows you to deploy the Datadog Agent natively within Azure AKS, avoiding the complexity of third-party management tools. 

#### Install

To install the Datadog Agent with the AKS Cluster Extension: 

1. Click on your AKS cluster in the **Monitored Resources** section in the left sidebar.
2. From the left sidebar of the AKS cluster, select **Extensions + applications** under **Settings**.
3. Search for and select the `Datadog AKS Cluster Extension`.
4. Click **Create**, and follow the instructions in the tile using your [Datadog credentials][1] and [Datadog site][2].

#### Uninstall

1. Click on your AKS cluster in the **Monitored Resources** section in the left sidebar.
2. From the left sidebar of the AKS cluster, select **Extensions + applications** under **Settings**.
3. Select the Datadog AKS Cluster Extension (its **Type** is `Datadog.AKSExtension`).
4. Click **Uninstall**.

[1]: /account_management/api-app-keys/
[2]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

[1]: https://us3.datadoghq.com/signup
[2]: https://docs.datadoghq.com/integrations/guide/azure-portal/
[3]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[4]: https://learn.microsoft.com/en-us/partner-center/marketplace/azure-consumption-commitment-enrollment
[5]: https://docs.datadoghq.com/integrations/azure/?tab=link#saml-sso-configuration
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}
<div class="alert alert-info">The Azure native integration is only available for organizations on Datadog's US3 site. If you're using a different Datadog site, see the <a href="https://docs.datadoghq.com/integrations/guide/azure-manual-setup/" target="_blank">Azure Manual Setup Guide</a> for instructions on creating an app registration with read permissions to your Azure subscriptions. If you're using the Datadog US3 site, <a href="?site=us3" target="_blank">change the site selector</a> on the right of this page.</div>

[1]: ?site=us3
{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}