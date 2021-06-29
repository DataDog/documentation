---
title: Datadog in the Azure Portal
kind: guide
---

{{< site-region region="us,eu,gov" >}}
<div class="alert alert-warning">
  This guide is for Datadog customers using US3 with Azure.
</div>
{{< /site-region >}}

This is a guide for managing the integration between Azure and Datadog in the Azure portal using the Datadog resource. What is a Datadog resource? A Datadog resource in Azure represents the connection between a Datadog organization and an Azure subscription. If you haven’t created a Datadog resource in Azure yet, do that first. 

A Datadog resource allows you to easily take the following actions within its associated Azure subscription:
- Configure the collection of Azure metrics and Platform Logs
- Verify which Azure resources are sending metrics and logs
- View API keys and set the default for your Datadog resource agent deployments
- Deploy the Datadog VM agent onto your Azure VMs and view details about running agents
- Deploy the Datadog .NET extension onto your Azure Web Apps and view details about installed extensions
- Reconfigure Single-Sign-On
- Change billing plan for your Datadog organization (Azure Marketplace only)
- Enable/disable the Azure integration
- Delete the Datadog resource

## Resource overview

To see details of your Datadog resource, select Overview in the left pane.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="Azure US3 Resource overview" responsive="true" style="width:100%;">}}

The details include:
- Resource group name
- Location/Region
- Subscription
- Tags
- Link to Datadog organization
  - This link will be a SAML link if SSO is enabled
  - This link will be a set password link the first time you access a new Datadog organization that was created via the Azure marketplace
- Datadog offer/plan
- Billing term

It also provides links to Datadog dashboards, logs, and host maps.

The overview screen provides a summary of the resources sending logs and metrics to Datadog.

- Resource type – Azure resource type.
- Total resources – Count of all resources for the resource type.
- Resources sending logs – Count of resources sending logs to Datadog through the integration.
- Resources sending metrics – Count of resources sending metrics to Datadog through the integration.

## Reconfigure rules for metrics and logs

To change the configuration rules for metrics and logs, select "Metrics and logs" in the left pane.

{{< img src="integrations/guide/azure_portal/metrics-and-logs.png" alt="Azure US3 Metrics and logs" responsive="true" style="width:100%;">}}

For more information, see [Configure metrics and logs][1].

## Monitored resources

To see the list of resources emitting logs and/or metrics to Datadog, select Monitored Resources in the left pane.

{{< img src="integrations/guide/azure_portal/monitored-resources.png" alt="Azure US3 Monitored resources" responsive="true" style="width:100%;">}}

You can filter the list of resources by resource type, resource group name, location, and whether the resource is sending logs and metrics.

The column "Logs to Datadog" indicates whether the resource is sending logs to Datadog. If the resource isn't sending logs, this field indicates why logs aren't being sent to Datadog. The reasons could be:

- Resource doesn't support sending logs. Only resource types with monitoring log categories can be configured to send logs to Datadog.
- Limit of five diagnostic settings reached. Each Azure resource can have a maximum of five diagnostic settings. For more information, see diagnostic settings.
- Error. The resource is configured to send logs to Datadog, but is blocked by an error.
- Logs not configured. Only Azure resources that have the appropriate resource tags to match the rules are configured to send logs to Datadog.
- Region not supported. The Azure resource is in a region that doesn't currently support sending logs to Datadog.
- Virtual machines do not support sending resource logs via diagnostic settings; however, you can send logs using the Datadog agent, and this status will be reflected here

## API keys

To view the list of API keys for your Datadog resource, select the Keys in the left pane. You see information about the keys.

{{< img src="integrations/guide/azure_portal/api-keys.png" alt="Azure US3 API keys" responsive="true" style="width:100%;">}}

The Azure portal provides a read-only view of the API keys. To manage the keys, select the Datadog portal link. After making changes in the Datadog portal, refresh the Azure portal view.

The Azure Datadog integration provides you the ability to install Datadog agent on a virtual machine or app service. If a default key isn't selected, the Datadog agent installation fails.

## Monitor virtual machines using the Datadog agent
You can install Datadog agents on virtual machines as an extension. Go to Virtual machine agent under the Datadog org configurations in the left pane. This screen shows the list of all virtual machines in the subscription.

For each virtual machine, the following data is displayed:
- Resource Name – Virtual machine name
- Resource Status – Whether the virtual machine is stopped or running. The Datadog agent can only be installed on virtual machines that are running. If the virtual machine is stopped, installing the Datadog agent will be disabled.
- Agent version – The Datadog agent version number.
- Agent status – Whether the Datadog agent is running on the virtual machine.
- Integrations enabled – The key metrics that are being collected by enabled integrations in the Datadog agent.
- Install Method – The specific tool used to install the Datadog agent. For example, Chef or Azure VM extension.
- Sending logs – Whether the Datadog agent is sending logs to Datadog.

Select the virtual machine to install the Datadog agent on. Select Install Agent.
The portal asks for confirmation that you want to install the agent with the default key. Select OK to begin installation. Azure shows the status as Installing until the agent is installed and provisioned.

After the Datadog agent is installed, the status changes to Installed.

You can uninstall Datadog agents that have been installed with the Azure VM extension by selecting the virtual machine and selecting Uninstall agent. If the agent was installed using another method, you will not be able to use the Datadog resource to deploy or remove the agent, but information about the agent will still be reflected correctly in this blade.

## Deploy the Datadog App Service Extension

You can install the Datadog extension on Azure App Services to enable APM tracing and custom metrics. Go to the App Service extension in the left pane. This screen shows the list of all App Services in the subscription.

For each app service, the following data elements are displayed:
- Resource Name – App name.
- Resource Status – Whether the app service is stopped or running. The Datadog agent must be running to initiate install. If the app service is stopped, installing the Datadog agent is disabled.
- App service plan – The specific plan configured for the app service.
- Extension version – The Datadog extension version number.

To install the Datadog extension, select the Web App you want to add and press Install Extension to add the latest Datadog extension on the app(s).

**Note**: Ensure you are only adding the extension to Web Apps with runtimes that are supported. The Datadog resource does not limit or filter the list of Web Apps.

The portal confirms that you want to install the Datadog extension, which will restart your application. This install process also adds the necessary application settings for the selected apps:

- `DD_API_KEY:<default_api_key>`
- `DD_SITE:us3.datadoghq.com`
- `DD_LOGS_INJECTION:true`

Select OK to begin the installation process for the Datadog agent. The portal shows the status as Installing until the agent is installed. After the Datadog agent is installed, the status changes to Installed. You can verify success by checking that APM traces begin populating in Datadog.

To uninstall Datadog agents on the app service, go to App Service Extension. Select the app service and Uninstall Extension

## Reconfigure single sign-on

If you would like to reconfigure single sign-on, select Single sign-on in the left pane.

To establish single sign-on through Azure Active directory, select Enable single sign-on through Azure Active Directory.

The portal retrieves the appropriate Datadog application from Azure Active Directory. The app comes from the enterprise app name you selected when setting up integration. Select the Datadog app name as shown below:

{{< img src="integrations/guide/azure_portal/sso.png" alt="Azure US3 Single sign-on" responsive="true" style="width:100%;">}}

## Change plan

To change the Datadog billing plan, go to Overview and select Change Plan.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="Azure US3 Change plan" responsive="true" style="width:100%;">}}

The portal retrieves all the available Datadog plans for your tenant - this will include any private offers. Select the appropriate plan and click on Change Plan.

{{< img src="integrations/guide/azure_portal/change-plan2.png" alt="Azure US3 Change plan" responsive="true" style="width:100%;">}}

## Disable or enable integration

You can stop sending logs and metrics from Azure to Datadog. You'll continue to be billed for other Datadog services that aren't related to monitoring metrics and logs.

To disable the Azure integration with Datadog, go to Overview. Select Disable and OK.

{{< img src="integrations/guide/azure_portal/disable.png" alt="Azure US3 Disable integration" responsive="true" style="width:100%;">}}

To enable the Azure integration with Datadog, go to Overview. Select Enable and OK. Selecting Enable retrieves any previous configuration for metrics and logs. The configuration determines which Azure resources emit metrics and logs to Datadog. After completing the step, metrics and logs are sent to Datadog.

{{< img src="integrations/guide/azure_portal/enable.png" alt="Azure US3 Enable integration" responsive="true" style="width:100%;">}}

## Delete a Datadog resource

Go to Overview in left pane and select Delete. Confirm that you want to delete the Datadog resource. Select Delete.

{{< img src="integrations/guide/azure_portal/delete.png" alt="Azure US3 delete Datadog resource" responsive="true" style="width:100%;">}}

For Datadog Organizations billed through Azure Marketplace:
- If the deleted Datadog resource is the only Datadog resource mapped to its associated Datadog organization, logs and metrics are no longer sent to Datadog and all billing stops for Datadog through Azure - Datadog support will reach out to confirm next steps with your account
- If there are additional Datadog resources mapped to the associated Datadog organization, deleting a Datadog resource only stops sending logs and metrics for its associated Azure subscription.

If your Datadog organization is NOT billed via Azure Marketplace, deleting a Datadog resource simply removes the integration for that Azure subscription.


[1]: https://docs.microsoft.com/en-us/azure/partner-solutions/datadog/create#configure-metrics-and-logs
