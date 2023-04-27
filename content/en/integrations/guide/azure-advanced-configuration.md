---
title: Azure Advanced Configuration
kind: guide
description: "Advanced configuration options for the Datadog Azure integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/azure/"
  tag: "Documentation"
  text: "Azure Integration"

---

## Overview

This guide provides detailed information and reference architectures for users configuring Datadog’s Azure integration, as well as alternative configuration options for specific use cases.

### Reference Architectures

The reference architectures in this guide provide a visual representation of the configuration process and outcome when following the steps in the [Azure Integration page][1]. This provides a more detailed overview of Datadog's interaction with your Azure environment, and answers common security, compliance, and governance questions.

### Alternate Configurations

The setup processes documented in the Azure Integration page are the recommended steps and result in the ideal configuration for the vast majority of users. Alternate configuration options in this document may be preferable for certain use cases, and any trade-offs in performance, features, or ease-of-management are outlined as needed.

## Azure Metric and Data Collection

### Overview of Metric and Data Collection

Enabling Datadog’s Azure integration allows Datadog to:

  - Discover and monitor all resources in all subscriptions within the given scope
  - Automatically update the metric definitions, to ensure that all of the metrics available from Azure Monitor are collected
  - Ingest a range of both general and resource-specific metadata (including custom Azure tags), and apply it to the associated resource metrics in Datadog as tags
  - Query Azure Metadata APIs and use the responses to [generate useful metrics in Datadog][2] for insights that Azure Monitor does not support

The Azure APIs used and data collected are identical regardless of whether you use the standard or Azure Native version of the integration.

{{% site-region region="us,us5,eu,gov,ap1" %}}

### Standard Azure Integration Metric and Data Collection

_Available in all Datadog Sites_

Follow these steps to enable the standard Azure integration:

  1. Create an app registration in your Active Directory and enter the credentials in the [Datadog Azure integration page][2].
  2. Give the application read-access (`Monitoring Reader` role) to the subscriptions or management group you would like to monitor.

The diagram below outlines the process and resulting architecture of the Azure Integration configuration described in the main documentation.

{{< img src="integrations/guide/azure_advanced_configuration/app_registration_integration_setup.png" alt="Diagram of the App Registration integration setup" >}}

Once this is completed, data collection begins automatically. The App Registration information entered in Datadog allows Datadog to [request a token from Azure Active Directory][1] (AD). Datadog uses this token as the authorization for API calls to various Azure APIs, to discover resources within the scope provided and collect data. This continuous process runs with two-minute intervals by default, and is used to discover and collect data from your Azure environment. This process is pictured below.

{{< img src="integrations/guide/azure_advanced_configuration/app_registration_metric_collection.png" alt="Diagram of the App Registration integration setup" >}}

[1]: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/
[2]: https://app.datadoghq.com/integrations/azure
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native integration metric collection
_Available only in the Datadog US3 site_

Follow these steps to enable the Azure Native integration:

1. Confirm that your Datadog account is hosted on the US3 [Datadog site][1], or [create one][2].
2. Create a Datadog resource in Azure that links at least one subscription.
3. Optionally, update the Datadog resource to include other subscriptions.

The Datadog resource in Azure is a link between your Azure environment and your Datadog account. This link enables the same data collection as the standard Azure integration available for other Datadog sites, but with a different authentication mechanism. Its access is assigned using a **System Managed Identity** associated with the Datadog resource in Azure, rather than a user-created and configured **App Registration**.

When the Datadog resource is created, its resource ID and other information is passed to Datadog. Datadog uses its own App Registration to request a token from Azure AD, authenticating with Azure as Datadog. Datadog then uses this Datadog token along with the user's Datadog resource ID to request a user token from a bespoke Azure service created for the Azure Native integration. This Azure service verifies Datadog’s identity, confirms the user has granted access with the Datadog resource, and then returns a short-lived token to Datadog. Datadog uses this token as the authorization for API calls made to Azure APIs in the user's environment, to discover resources within the scope provided and collect data.

The `Monitoring Reader` role assignment happens automatically during the creation of the Datadog resource, and is scoped to the parent subscription of the Datadog resource. If you add additional subscriptions for monitoring to the Datadog resource, this scope is updated for the Managed Identity automatically.

The diagram below outlines the process and resulting architecture of the Azure Native Integration configuration.

{{< img src="integrations/guide/azure_advanced_configuration/azure_native_integration_setup.png" alt="Diagram of the Azure Native integration setup" >}}

Once this is completed, data collection begins automatically. Datadog continuously discovers and collects metrics from your Azure environment, as pictured below.

{{< img src="integrations/guide/azure_advanced_configuration/azure_native_metric_collection.png" alt="Diagram of the Azure Native metric collection setup" >}}

### Alternate configuration options for metric collection

Whether you use the standard or the Azure Native integration, Datadog strongly recommends using the default configuration. This is because the integration is continually enhanced to provide new and differentiated insights, as well as improved performance and reliability of data collection. These improvements can be inhibited by alternate configurations for metric collection, which use more restrictive configurations.

#### Options for restricting access

The following sections detail options for restricting access and their implications.

##### 1. Assigning access below subscription level

You can assign Datadog access below the subscription level:

  - By resource group	
  - By individual resource

**Note**: This access is managed through the **App Registration** for the standard Azure Integration, and through the **System Managed Identity** associated with the Datadog resource for the Azure Native integration.

If you update the scope of the access below subscription level, Datadog is still able to discover resources and their available metrics, and ingest them dynamically within the given scope.

The implications of restricting access below the subscription level are:

  - Inhibits the ability to batch metric calls, which leads to delays beyond the typical one to two minutes before they populate in Datadog. Restricting by individual resource has a greater impact than restricting by resource group. The actual delay is heavily dependent on the size, composition, and distribution of your Azure environment; there may be no noticeable effect in some cases, or latency of up to 45 minutes in others.
  - Increases Azure API calls, which may result in higher costs within Azure.
  - Limits autodiscovery of resources.
  - Requires manual updating of the role assignment's scope for any new resources, resource groups, or subscriptions to be monitored.

##### 2.Assigning more restrictive role(s) than Monitoring Reader

The **Monitoring Reader** role provides broad access to monitor resources and subscription-level data. This read-only access enables Datadog to provide the best user experience for both existing features and new capabilities. Azure AD roles allow the extension of this access into tenant-level Azure AD resources.

The implications of restricting access below the Monitoring Reader role are:

  - Partial or total loss of monitoring data
  - Partial or total loss of metadata in the form of tags on your resource metrics
  - Partial or total loss of data for [CSPM][3] or [Resource Catalog][4]
  - Partial or total loss of Datadog-generated metrics

The implications of restricting or omitting the the Azure AD roles are:

  - Partial or total loss of metadata for Azure AD resources in CSPM
  - Partial or total loss of credential expiration monitoring for Azure AD resources

[1]: /getting_started/site/
[2]: https://www.datadoghq.com/
[3]: /security/cspm/
[4]: /security/cspm/resource_catalog/
{{% /site-region %}}

## Azure Log Collection

{{% site-region region="us,us5,eu,gov,ap1" %}}

### Standard Azure Integration Log Collection
_Available in all Datadog Sites_

The diagram below provides a reference architecture for forwarding logs from Azure to Datadog, as described in the [Log collection section][1] of the Azure integration page.

{{< img src="integrations/guide/azure_advanced_configuration/manual_log_forwarding.png" alt="Diagram of the manual log forwarding setup" >}}

### Alternate Configuration Options for Log Forwarding with the Standard Azure Integration

The default architecture above is suitable for most users. Depending on the scale and composition of your Azure environment, as well as the methods your organization uses to implement this architecture, the sections below detail additional considerations that may be relevant.

#### Using the provided templates

The **Deploy to Azure** button in the main Azure [log collection section][1] provides a template for creating an Event Hub and Forwarder Function pair. In addition to using this template to deploy directly, you can use the underlying ARM templates as a starting point for your own Infrastructure-as-Code deployments.

These templates do not add diagnostic settings (except for, optionally, one diagnostic setting for Activity Logs). For Resource Logs, Datadog recommends utilizing ARM templates or Terraform to add diagnostic settings to your resources programmatically. These diagnostic settings must be added to every resource that needs to send resource logs to Datadog.

#### Region considerations

Diagnostic settings can only send resource logs to Event Hubs in the same region as the resource. Add an Event Hub and Forwarder Function pair in each region that contains resources you want to send resource logs to Datadog.

However, diagnostic settings are not limited to sending logs to Event Hubs in the same subscription as the resource. If you have multiple subscriptions within your Azure Tenant, they can share a single Event Hub and Forwarder Function within the same region.

#### High-volume log considerations

As the volume of logs scales, you may see bottlenecks, typically arising in the Event Hubs. If you plan to submit high log volumes, you may want to consider adding additional partitions or using a Premium or Dedicated tier.
For especially high log volumes, you may consider adding additional Event Hub and Forwarder Function pairs within the same region, and splitting traffic between them.

[1]: /integrations/azure/#log-collection
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native Integration Log Collection (US3 only)

Available in all Datadog US3 Site

The diagram below outlines the process and resulting architecture of the Azure Native integration log forwarding configuration.

{{< img src="integrations/guide/azure_advanced_configuration/azure_native_log_forwarding.png" alt="Diagram of the Azure Native log forwarding setup" >}}

With the Azure Native integration, the user does not need to configure anything outside of the Datadog resource to implement Azure resource or activity log forwarding to Datadog. Diagnostic settings are added or removed automatically to match your configuration using only the tag rules specified in the Datadog resource.

**Note**: You can implement a `send resource logs for everything` rule by enabling resource logs without adding any filters, as shown below.

{{< img src="integrations/guide/azure_advanced_configuration/datadog_agent_build_metrics_and_logs.png" alt="Diagram of the Datadog Agent build" >}}

The Datadog resource adds diagnostic settings with the following characteristics:
  - All log categories are included
  - It is configured to `Send to Partner Solution` and specifies the Datadog resource that created it 
  - It follows the naming format `DATADOG_DS_V2_<UNIQUE_IDENTIFIER>`.

Any manual changes to the resource, including deleting it, are reverted within a few minutes.

See below an example of a Diagnostic Setting created by a Datadog resource:

{{< img src="integrations/guide/azure_advanced_configuration/diagnostic_setting.png" alt="Diagram of the diagnostic setting" >}}

### Alternate Configuration Options for Log Forwarding with the Azure Native Integration

The one-click buttons to enable logs in the Datadog resource automate the process of adding diagnostic settings. In some cases, organizations may want to manage and configure diagnostic settings themselves, while still taking advantage of the automated log forwarding capability with the Azure Native integration. 

Reasons for manually managing Diagnostic Settings include:

  1. Infrastructure-as-code Policies
       Strict internal policies around IaC that require all resources to to be created and managed deterministically (for example, if automatic creation of diagnostic settings by the Datadog resource would cause an unresolvable conflict between the desired and the actual state).

  2. Limiting Resource Log Categories
       As the diagnostic settings created automatically by the Datadog resource include all log categories, specifying a subset of these categories requires you to create diagnostic settings yourself.

**Note**: You can also use [exclusion filters][1] to exclude these logs from being indexed upon ingestion into Datadog.

  3. Cross-subscription log forwarding

       Some organizations may want to take advantage of the capability to ship logs across subscriptions. One reason for this might be if you are only using Datadog for logs and wish to limit the scope of metric and data collection. In this scenario, you can manually implement diagnostic settings that ship logs to a single Datadog resource in a different subscription.

  4. Testing

       Users may want to get examples of logs into Datadog to better understand what information a particular type of log may contain, or support other “one-off” investigations or use cases. In these cases sometimes it’s easier to just add the diagnostic setting directly to the resource(s) you want logs from rather than updating tags and/or the log forwarding settings and then waiting for the automatic process to create it.


This architecture is shown below, including the (optional) cross-subscription set up:

{{< img src="integrations/guide/azure_advanced_configuration/custom_azure_native_log_forwarding.png" alt="Diagram of the custom Azure Native log forwarding setup" >}}

#### General Notes on Manual Log Forwarding
Diagnostic settings you create manually will not be impacted by log settings on the Datadog resource:
Manually created diagnostic settings will not be deleted based on the tag rules specified in the Datadog resource.
Resource logs do not have to be enabled on the Datadog resource in order for the manual log forwarding to work.
The Datadog resource being used for log forwarding must not be in a disabled state.
In most cases it will make sense to choose either manual or automatic log forwarding, but hybrid setups are also valid.

#### Notes on Cross-Subscription log forwarding: 

Utilizing the automated log forwarding capability with the Azure Native integration does still require at least one Datadog resource per tenant.
The Datadog resource used for log forwarding will still collect metrics and data from its own subscription at a minimum.
You must register the Resource Provider  “Microsoft.Datadog” in each subscription from which you plan to send logs before creating the diagnostic settings.

{{< img src="integrations/guide/azure_advanced_configuration/datadog_agent_build_resource_providers" alt="Diagram of the custom Azure Native log forwarding setup" >}}

[1]: /logs/log_configuration/indexes/#exclusion-filters
{{% /site-region %}}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
