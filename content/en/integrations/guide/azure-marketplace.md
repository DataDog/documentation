---
title: Datadog in the Azure Marketplace
kind: guide
further_reading:
  - link: "integration/azure"
    tag: "Documentation"
    text: "Azure integration"
  - link: "https://www.datadoghq.com/blog/azure-datadog-partnership"
    tag: Blog
    text: "Microsoft partnership embeds Datadog natively in the Azure portal"
---

<div class="alert alert-warning">
  This functionality is available if you purchased Datadog through the Azure Marketplace.
</div>

## Setup

### Prerequisites

#### Required permissions
To set up the Azure Datadog integration, you must have **Owner** access on the Azure subscription. Ensure you have the appropriate access before starting the setup.

#### SSO configuration

_(Optional)_: [Single sign-on (SSO)](#saml-sso-configuration) can be configured during the process of creating a new Datadog organization in Azure. It can also be done later. To configure SSO during the initial creation, first create a Datadog enterprise gallery app.

### Installation {#installation-us3}

Configuring the Datadog Azure integration requires the creation of a Datadog resource in Azure. A Datadog resource in Azure represents the connection between a Datadog organization and an Azure subscription. Creating a Datadog resource happens in one of two scenarios:

1. You are linking an Azure subscription to an existing Datadog organization.
2. You are creating a Datadog organization through the Azure Marketplace, and simultaneously linking an Azure subscription to this Datadog organization.

A Datadog resource allows you to take the following actions within its associated Azure subscription:

- Configure the collection of Azure metrics and platform logs
- Deploy the Datadog VM Agent onto your Azure VMs
- Deploy the Datadog .NET extension onto your Azure Web Apps
- Configure Single sign-on (SSO)
- Verify the Azure resources sending metrics and logs
- View details about the Datadog Agent status and configuration on your Azure VMs

#### Create Datadog resource

To create a new Datadog resource in Azure, navigate to the Datadog service page in Azure and select the option to create a new Datadog resource:
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog Service" responsive="true" style="width:90%;">}}

Choose "Create a new Datadog organization" or "Link Azure subscription to an existing Datadog organization":

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 create a Datadog resource" responsive="true" style="width:90%;">}}

**Note**: New Datadog organizations created through the Azure portal automatically have billing consolidated into their Azure invoice. This usage counts towards your organization's [MACC][1] if applicable.

### Configuration {#configuration-us3}

{{< tabs >}}
{{% tab "Create" %}}

#### Basics {#basics-create}

After selecting to create a new Datadog organization, the portal displays a form for creating both the Datadog resource and the new Datadog organization:
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Azure US3 create a Datadog resource" responsive="true" style="width:90%;">}}

Provide the following values:

| Property             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | The Azure subscription you want to monitor with Datadog. The Datadog resource exists in this subscription. You must have owner access.                                                                                       |
| Resource group       | Create a new resource group or use an existing one. A [resource group][1] is a container that holds related resources for an Azure solution.                                                                                 |
| Resource name        | The name for the Datadog resource. This name is assigned to the new Datadog organization.                                                                                                                                    |
| Location             | The default location is West US2—the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. All Azure regions are supported, including other cloud providers and on-premise hosts. |
| Datadog organization | The Datadog organization name is set to the resource name and the Datadog site is set to US3.                                                                                                                                |
| Pricing plan         | A list of the available Datadog pricing plans. If you have a private offer, it's available in this dropdown.                                                                                                                 |
| Billing term         | Monthly                                                                                                                                                                                                                      |

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Link" %}}

#### Basics {#basics-link}

After selecting to link to an existing Datadog organization, the portal displays a form for creating the Datadog resource:
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Link Azure subscription to an existing Datadog organization" responsive="true" style="width:90%;">}}

Provide the following values:

| Property             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | The Azure subscription you want to monitor with Datadog. The Datadog resource exists in this subscription. You must have owner access.                                                                                       |
| Resource group       | Create a new resource group or use an existing one. A [resource group][1] is a container that holds related resources for an Azure solution.                                                                                 |
| Resource name        | Specify a name for the Datadog resource. The recommended naming convention is: `subscription_name-datadog_org_name`.                                                                                                         |
| Location             | The default location is West US2—the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. All Azure regions are supported, including other cloud providers and on-premise hosts. |
| Datadog organization | The Datadog organization name is set to the resource name and the Datadog site is set to US3.                                                                                                                                |

Click **Link to Datadog organization** to open a Datadog authentication window, then sign in to Datadog.

By default, Azure links your current Datadog organization to your Datadog resource. If you want to link to a different organization, select the appropriate organization in the authentication window:

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3 select Datadog organization" responsive="true" style="width:90%;">}}

When the oauth flow is complete, verify the Datadog organization name is correct.

After you complete the basic configuration, select **Next: Metrics and logs**.


[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

#### Metrics and logs

##### Metric collection

By default, metrics for all Azure resources within the subscription are collected automatically. To send all metrics to Datadog, there is no action needed.

###### Tag rules for sending metrics

Optionally, limit metric collection for Azure VMs and App Service Plans using Azure tags attached to your resources.

- Virtual machines, virtual machine scale sets, and App Service Plans with `include` tags send metrics to Datadog.
- Virtual machines, virtual machine scale sets, and App Service Plans with `exclude` tags don't send metrics to Datadog.
- If there's a conflict between inclusion and exclusion rules, exclusion takes priority.
- There is no option to limit metric collection for other resources.

##### Log collection

There are two types of logs that can be emitted from Azure to Datadog.

**Subscription level logs** provide insight into the operations on your resources at the [control plane][2]. Updates on service health events are also included. Use the activity log to determine the what, who, and when for any write operations (PUT, POST, DELETE).

To send subscription level logs to Datadog, select "Send subscription activity logs". If this option is left unchecked, none of the subscription level logs are sent to Datadog.

**Azure resource logs** provide insight into operations taken on Azure resources at the [data plane][2]. For example, getting a secret from a key vault or making a request to a database are data plane operations. The content of resource logs varies by the Azure service and resource type.

To send Azure resource logs to Datadog, select "Send Azure resource logs for all defined resources". The types of Azure resource logs are listed in the [Azure Monitor Resource Log categories][3]. When this option is selected, all resource logs are sent to Datadog, including any new resources created in the subscription.

You can optionally filter the set of Azure resources sending logs to Datadog using Azure resource tags.

###### Tag rules for sending logs

- Azure resources with `include` tags send logs to Datadog.
- Azure resources with `exclude` tags don't send logs to Datadog.
- If there's a conflict between inclusion and exclusion rules, exclusion takes priority.

For example, the screenshot below shows a tag rule where only those virtual machines, virtual machine scale sets, and app service plans tagged as `Datadog = True` send metrics and logs to Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3 create a Datadog resource logs" responsive="true" style="width:90%;">}}

Once you have completed configuring metrics and logs, select **Next: Single sign-on**.

#### Single sign-on

(Optional) If you use Azure Active Directory as your identity provider, activate single sign-on from the Azure portal to Datadog.

If you're linking the Datadog resource to an existing Datadog organization, you can't set up single sign-on at this step. Instead, set up single sign-on after creating the Datadog resource. For more information, see [Reconfigure single sign-on][4].

{{< img src="integrations/azure/azure-us3-create-dd-resource4.png" alt="Azure US3 create a Datadog resource single sign-on" responsive="true" style="width:90%;">}}

To establish single sign-on through Azure Active directory, select the checkbox for "Enable single sign-on through Azure Active Directory".

The Azure portal retrieves the appropriate Datadog application(s) from Azure Active Directory. Datadog Enterprise app(s) created prior to starting the Datadog resource creation process are available here.

Select the Datadog app you wish to use. If you haven't created one, refer to the documentation on [creating an Azure AD Enterprise Gallery app](#saml-sso-configuration).

{{< img src="integrations/azure/azure-us3-create-dd-resource5.png" alt="Azure US3 enable single sign-on" responsive="true" style="width:90%;">}}

Select **Next: Tags**.

#### Tags {#tags-us3}

(Optional) Set up custom tags for your new Datadog resource. Provide name and value pairs for the tags to apply to the Datadog resource.

{{< img src="integrations/azure/azure-us3-create-dd-resource6.png" alt="Azure US3 create a Datadog resource add tags" responsive="true" style="width:90%;">}}

When you've finished adding tags, select **Next: Review + create**.

#### Review + create

Review your selections and the terms of use. After validation completes, select "Create". Azure then deploys the Datadog resource.

{{< img src="integrations/azure/azure-us3-create-dd-resource7.png" alt="Azure US3 create a Datadog resource validation" responsive="true" style="width:90%;">}}

After the deployment process is complete, select "Go to Resource" to see your Datadog resource.

{{< img src="integrations/azure/azure-us3-deploy-complete.png" alt="Azure US3 Datadog deploy complete" responsive="true" style="width:90%;">}}

### Access Datadog

After your Datadog resource is created, access the associated Datadog organization. Access is dependent on whether you created a new organization or linked an existing organization.

{{< tabs >}}
{{% tab "Create" %}}

#### SSO 

If you created a new Datadog organization with SSO configured, use the link in the Datadog resource blade to login. This is a SAML link that logs you in directly to your Datadog org from the Datadog resource in Azure.

{{< img src="integrations/azure/azure-us3-access-dd.png" alt="Azure US3 access Datadog" responsive="true" style="width:90%;">}}

#### No SSO

If you created a new Datadog organization without SSO configured, use the Datadog organization link in the overview blade to set your Datadog password. After your Datadog password is set, the link is a [standard Datadog URL][1].


[1]: http://us3.datadoghq.com
{{% /tab %}}
{{% tab "Link" %}}

If you linked to an existing Datadog organization, there is no change to the way you access your Datadog organization.

{{% /tab %}}
{{< /tabs >}}

### SAML SSO configuration

To use Security Assertion Markup Language (SAML) Single sign-on (SSO) within the Datadog resource, you must set up an enterprise application.

To add an enterprise application, you need the role of global administrator, cloud application administrator, application administrator, or owner of the service principal.

Use the following steps to set up the enterprise application:
1. Go to Azure portal and select "Azure Active Directory".
2. In the left pane, select "Enterprise applications".
3. Select "New Application".
4. In Add from the gallery, search for Datadog. Select the search result then select Add.

    {{< img src="integrations/azure/azure-us3-dd-sso-add-app.png" alt="Azure US3 access Datadog" responsive="true" style="width:90%;">}}

5. Once the app is created, go to properties from the side panel. Set "User assignment required?" to No, and select "Save".

    {{< img src="integrations/azure/azure-us3-dd-sso-app-prop.png" alt="Azure US3 access Datadog" responsive="true" style="width:90%;">}}

6. Go to single sign-on from the side panel, then select SAML.

    {{< img src="integrations/azure/azure-us3-dd-sso.png" alt="Azure US3 access Datadog" responsive="true" style="width:90%;">}}

7. Select "Yes" when prompted to save your single sign-on settings.

    {{< img src="integrations/azure/azure-us3-basic-saml.png" alt="Azure US3 Basic SAML Configuration" responsive="true" style="width:90%;">}}

8. The setup of single sign-on is complete.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/azure/marketplace/azure-consumption-commitment-benefit
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[4]: https://docs.microsoft.com/en-us/azure/partner-solutions/datadog/manage#reconfigure-single-sign-on
