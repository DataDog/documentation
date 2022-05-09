---
title: Datadog in the Azure Portal
kind: guide
further_reading:
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Azure integration"
  - link: "https://www.datadoghq.com/blog/azure-datadog-partnership"
    tag: Blog
    text: "Microsoft partnership embeds Datadog natively in the Azure portal"
---

<div class="alert alert-warning">
  This guide is for Datadog customers using US3 with Azure.
</div>

This guide is for managing the integration between Azure and Datadog in the Azure portal using the Datadog resource. The Datadog resource in Azure represents the connection between a Datadog organization and an Azure subscription. [Create a Datadog resource][1] in Azure before proceeding with this guide.

With the Datadog resource, you can manage the following within the associated Azure subscription:
- Configure the collection of Azure metrics and platform logs
- Verify the Azure resources sending metrics and logs
- View API keys and set the key default for your Datadog resource Agent deployments
- Deploy the Datadog VM Agent to your Azure VMs and view details about running Agents
- Deploy the Datadog .NET extension to your Azure Web Apps and view details about installed extensions
- Reconfigure single sign-on
- Change the billing plan for your Datadog organization (Azure Marketplace only)
- Enable or disable the Azure integration
- Delete the Datadog resource

This page describes the Azure Portal experience. If you prefer to use CLI, see the [Azure CLI for Datadog][2].

## Overview

Select "Overview" in the left sidebar to view information for your Datadog resource.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="Azure US3 Resource overview" responsive="true" style="width:100%;">}}

### Essentials

The overview page displays essential information about your Datadog resource including: resource group name, location (region), subscription, tags, Datadog organization link, status, pricing plan, and billing term.

**Note**: The Datadog organization link is a SAML link if SSO is enabled. If the Datadog organization was created with the Azure marketplace, set a password the first time you use this link.

### Links

The overview page provides links to view Datadog dashboards, logs, and host maps.

### Resource summary

The overview page provides a summary table of the resources sending logs and metrics to Datadog. This table includes the following columns:

| Column             | Description                                                               |
|--------------------|---------------------------------------------------------------------------|
| Resource type      | The Azure resource type                                                   |
| Total resources    | The count of all resources for the resource type                          |
| Logs to Datadog    | The count of resources sending logs to Datadog through the integration    |
| Metrics to Datadog | The count of resources sending metrics to Datadog through the integration |

### Disable

To stop sending logs and metrics from Azure to Datadog, select "Disable" on the overview page, then click "OK".

{{< img src="integrations/guide/azure_portal/disable.png" alt="Azure US3 Disable integration" responsive="true" style="width:100%;">}}

**Note**: Disabling the Datadog resource stops the submission of metrics and platform logs to Datadog for the associated subscription. Any resources in the subscription submitting data directly to Datadog through the Agent or extension are unaffected.

### Enable

To start sending logs and metrics from Azure to Datadog, select "Enable" on the overview page, then click "OK". Any previous configuration for logs and metrics is retrieved and enabled.

{{< img src="integrations/guide/azure_portal/enable.png" alt="Azure US3 Enable integration" responsive="true" style="width:100%;">}}

### Delete

To delete the Datadog resource, select "Delete" on the overview page. Confirm deletion by typing `yes`, then click "Delete".

{{< img src="integrations/guide/azure_portal/delete.png" alt="Azure US3 delete Datadog resource" responsive="true" style="width:100%;">}}

For Datadog organizations billed through the Azure Marketplace:
- If the deleted Datadog resource is the only Datadog resource mapped to its associated Datadog organization, logs and metrics are no longer sent to Datadog and all billing stops for Datadog through Azure. Datadog support will reach out to confirm next steps with your account.
- If there are additional Datadog resources mapped to the associated Datadog organization, deleting a Datadog resource only stops sending logs and metrics for its associated Azure subscription.

If your Datadog organization is NOT billed through the Azure Marketplace, deleting a Datadog resource just removes the integration for that Azure subscription.

### Change plan

Select "Change Plan" on the overview page to change your Datadog billing plan.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="Azure US3 Change plan" responsive="true" style="width:100%;">}}

The portal retrieves all the available Datadog plans for your tenant, this includes any private offers. Select the appropriate plan and click "Change Plan".

## Datadog org configurations
### Metrics and logs

Select “Metrics and logs” in the left sidebar to change the configuration rules for metrics and logs. All rules are applied dynamically across the entire subscription as resources are added or tags change.

Any changes to metric or log configuration settings should take effect within a few minutes.

#### Metric collection
By default, metrics for all Azure resources within the subscription are collected automatically. To send all metrics to Datadog, there is no action needed.

Optionally, limit metric collection for Azure VMs and App Service Plans using Azure tags attached to your resources. 

##### Tag rules for sending metrics
 
 * Virtual machines, virtual machine scale sets, and App Service Plans with `include` tags send metrics to Datadog.  
 * Virtual machines, virtual machine scale sets, and App Service Plans with `exclude` tags don’t send metrics to Datadog.  
 * If there’s a conflict between inclusion and exclusion rules, exclusion takes priority.  
 * There is no option to limit metric collection for other resource types.

#### Log collection
There are two types of logs that can be emitted from Azure to Datadog.

**Subscription level logs** provide insight into the operations on your resources at the [control plane][3]. Updates on service health events are also included. Use the activity log to determine the what, who, and when for any write operations (PUT, POST, DELETE).

To send subscription level logs to Datadog, select “Send subscription activity logs”. If this option is left unchecked, none of the subscription level logs are sent to Datadog.

**Azure resource logs** provide insight into operations taken on Azure resources at the [data plane][3]. For example, getting a secret from a key vault or making a request to a database are data plane operations. The content of resource logs varies by the Azure service and resource type.

To send Azure resource logs to Datadog, select “Send Azure resource logs for all defined resources”. The types of Azure resource logs are listed in the [Azure Monitor Resource Log categories][4]. When this option is selected, all resource logs are sent to Datadog, including any new resources created in the subscription.

You can optionally filter the set of Azure resources sending logs to Datadog using Azure resource tags.

##### Tag rules for sending logs

* Azure resources with `include` tags send logs to Datadog.
* Azure resources with `exclude` tags don’t send logs to Datadog.
* If there’s a conflict between inclusion and exclusion rules, exclusion takes priority.

For example, the screenshot below shows a tag rule where only virtual machines, virtual machine scale sets, and app service plans tagged with `Datadog = True` send metrics to Datadog. Resources (of all types) tagged with `Datadog = True` send logs to Datadog.

{{< img src="integrations/guide/azure_portal/metrics-and-logs-tag-rules.png" alt="A screenshot showing a metric tag rule of Datadog=true set for virtual machines, virtual machine scale sets, and app service plans. The logs section is also configured with tag rule of Datadog=true" responsive="true" style="width:100%;">}}

### Monitored resources

Select "Monitored Resources" in the left sidebar to see a list of resources emitting logs and metrics to Datadog. Use the search to filter the list by resource name, type, group, location, logs to Datadog, or metrics to Datadog.

{{< img src="integrations/guide/azure_portal/monitored-resources.png" alt="Azure US3 Monitored resources" responsive="true" style="width:100%;">}}

The "Logs to Datadog" column displays `Sending` if the resource is sending logs to Datadog. Otherwise, this field indicates why logs aren't being sent. Possible reasons:

| Reason                                    | Description                                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Resource doesn't support sending logs     | Only resource types with monitoring log categories can be configured to send logs to Datadog.                           |
| Limit of five diagnostic settings reached | Each Azure resource can have a maximum of five diagnostic settings. For more information, see [diagnostic settings][5]. |
| Error                                     | The resource is configured to send logs to Datadog, but is blocked by an error.                                         |
| Logs not configured                       | Only Azure resources with appropriate resource tags are configured to send logs to Datadog.                             |
| Region not supported                      | The Azure resource is in a region that doesn't support sending logs to Datadog.                                         |
| Datadog Agent not configured              | Virtual machines without the Datadog Agent installed don't emit logs to Datadog.                                        |

### Virtual machine agent

To see a list of virtual machines (VMs) in the subscription, select "Virtual machine agent" in the left sidebar. On this page, you can install the Datadog Agent on a VM as an extension.

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

To install the Datadog Agent, select the appropriate VM, then click "Install Agent". The portal asks for confirmation to install the Agent with the default key. Select "OK" to begin installation. Azure shows the status as `Installing` until the Agent is installed and provisioned. After the Datadog Agent is installed, the status changes to `Installed`.

#### Uninstall

If the Datadog Agent was installed with the Azure VM extension, you can uninstall the Agent by selecting the appropriate VM, then click "Uninstall Agent".

If the Agent was installed using a different method, you can not use the Datadog resource to deploy or remove the Agent, but information about the Agent is still reflected on this page.

### App Service extension

Select "App Service extension" in the left sidebar to see a list of app services in the subscription. On this page, you can install the Datadog extension on Azure App Service to enable APM tracing and custom metrics.

For each app service, the following information is displayed:

| Column            | Description                                                                                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name     | The app name                                                                                                                                                                 |
| Resource status   | Whether the app service is stopped or running. The app service must be running to initiate install. If the app service is stopped, installing the Datadog Agent is disabled. |
| App service plan  | The specific plan configured for the app service                                                                                                                             |
| Extension version | The Datadog extension version number                                                                                                                                         |

#### Install

To install the [Datadog extension][6], select the appropriate app, then click "Install Extension". The portal asks for confirmation to install the extension. Select "OK" to begin installation. This restarts your app and adds the following settings:

- `DD_API_KEY:<DEFAULT_API_KEY>`
- `DD_SITE:us3.datadoghq.com`
- `DD_LOGS_INJECTION:true`

Azure shows the status as `Installing` until the Agent is installed and provisioned. After the Datadog Agent is installed, the status changes to `Installed`.

**Note**: Ensure you are adding the extension to apps with [supported runtimes][7]. The Datadog resource does not limit or filter the list of apps.

#### Uninstall

To uninstall the Datadog extension, select the appropriate app, then click "Uninstall Extension".

## Settings
### Single sign-on

Select "Single sign-on" in the left sidebar to reconfigure single sign-on.

To activate single sign-on through Azure Active Directory, select "Enable single sign-on". The portal retrieves the appropriate Datadog application from Azure Active Directory. The app name is the enterprise app name you chose when setting up the integration. Select the Datadog application name as shown below:

{{< img src="integrations/guide/azure_portal/sso.png" alt="Azure US3 Single sign-on" responsive="true" style="width:100%;">}}

### API keys

Select "Keys" in the left sidebar to view a list of API keys for your Datadog resource.

{{< img src="integrations/guide/azure_portal/api-keys.png" alt="Azure US3 API keys" responsive="true" style="width:100%;">}}

The Azure portal provides a read-only view of the API keys. To manage the keys, select the "Datadog portal" link. After making changes in Datadog, refresh the Azure portal view.

The Azure Datadog integration allows you to install the Datadog Agent on a VM or app service. If there is no default key selected, a Datadog Agent installation fails.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#create-datadog-resource
[2]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[5]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings
[6]: /serverless/azure_app_services
[7]: /serverless/azure_app_services/#requirements
