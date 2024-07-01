---
title: Getting Started with Azure
further_reading:
    - link: 'https://docs.datadoghq.com/integrations/azure/#overview'
      tag: 'Documentation'
      text: 'Microsoft Azure integration'
    - link: 'https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/'
      tag: 'Guide'
      text: 'Azure Integration Architecture and Configuration'
    - link: 'https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/'
      tag: 'Guide'
      text: 'Why should I install the Datadog Agent on my cloud instances?'
    - link: 'https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension'
      tag: 'Guide'
      text: 'Managing the Azure Native Integration'
    - link: 'https://www.datadoghq.com/blog/azure-integration-configuration/'
      text: 'Fine-tune observability configurations for all your Azure integrations in one place'
      tag: 'Blog'
---



## Overview

There are multiple configuration options when integrating Azure with Datadog. This guide provides an overview of the various options available for getting started with Azure, with links to Azure resources and tutorials that address specific use cases.

## Prerequisites

If you haven't already, create a [Datadog account][2]. 

## Deciding which way to go 
<br>
{{< img src="/getting_started/integrations/azure/GSwAzure_addNewIntegration.mp4" alt="Add New Integration" video=true >}}

This section can help you decide which configuration option best fits your organization and business needs.

If your organization is using the [US3 site][3], you have the ability to use the **Azure Native integration** to streamline management and data collection for your Azure environment. 

If you are on [any one of the available sites][3], including the US3 site, you can use the **Standard Azure integration** which requires: 
- the [App Registration credential][4] process for implementing metric collection
- the [Event Hub setup][5] for sending Azure Platform Logs

You also have the option to _manually_ or _programmatically_ configure your Azure integration with Datadog. 

See the following table for a summary of the various configuration options available to you by organization site:

| ORGANIZATION SITE | AZURE NATIVE INTEGRATION | STANDARD AZURE INTEGRATION | MANUAL CONFIGURATION | AUTOMATIC CONFIGURATION |
| --- | ---- |-------- |---| ----|
| US3 site   | Yes    |Yes    |Yes<br><br> You can create the `Datadog resource in Azure`, deploy the Datadog Agent directly in Azure with the `VM extension` or `AKS Cluster extension`, and optional configuration of single sign-on (SSO).|Yes<br><br> You can use `Terraform` to set up Datadog's Azure Native integration with the Datadog resource in Azure.  |
| All sites   | No    | Yes    |Yes<br><br>You can use the `Azure portal` or `Azure CLI`, as well as `deploying the Datadog Agent directly in Azure` with the VM extension or AKS Cluster extension. |Yes<br><br> You can set up the integration through `Terraform` or the `Azure CLI`, deploy the Datadog Agent natively in Azure through the `Datadog Azure VM Extension`, and run `automated scripts` to enable log collection.|

***_All sites_** configurations can be used in the US3 site orgs, but only US3 site orgs can use the Azure Native integration.

<div class="alert alert-warning"> <strong>Note</strong>: <a href="https://docs.datadoghq.com/cloud_cost_management/azure/?tab=billingaccounts&site=us3#overview">Cloud cost management</a> and <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">log archives </a> are only supported with App registration. For US3 sites that have set up the Datadog Azure Native integration, you need to create an <a href=""> App registration</a> to access these functionalities.
</div>

## Setup

{{% site-region region="us,us5,eu,ap1,us-fed" %}}

Follow the instructions on this page to set up the **Standard Azure integration**, which is available for all Datadog sites. 

**Note**: If you are on the US3 site, you can use the **Azure Native integration** for enhanced functionality and streamlined setup. Change the site selector on the right side of this page for the instructions on how to set this up.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Site selector for US3 site" video=true >}}

{{% /site-region %}}


{{% site-region region="us3" %}}

### Azure Native integration

For automatic configuration of the Azure Native integration through Terraform, see the [Azure Native Integration Programmatic Management Guide][201].

For manual configuration of the Azure Native integration through creation of the Datadog resource in Azure, see the [Azure Native Integration Manual Setup Guide][202].

[201]: /integrations/guide/azure-native-programmatic-management/
[202]: /integrations/guide/azure-native-manual-setup/

{{% /site-region %}}



### Standard Azure integration

For automatic configuration for the Standard Azure integration, see the [Standard Azure Integration Programmatic Management Guide][6] for step-by-step instructions.

For manual configuration for the Standard Azure integration, see the [Standard Azure Integration Manual Setup Guide][7] for instructions specific to the Azure portal and CLI.


## Metric collection
Datadog's Azure integration is built to collect all metrics from [Azure Monitor][8]. See the [Integrations page][9] for a full listing of the available sub-integrations. Many of these integrations are installed by default when Datadog recognizes data coming in from your Azure account. 

You can find your Azure metrics in the metrics summary page in the Datadog platform by navigating to `Metrics > Summary` and searching for `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Metric summary image" style="width:100%;" >}}



## Log collection 
{{% site-region region="us,us5,eu,ap1,us-fed" %}}

Follow the instructions on this page to set up log collection through the **Standard Azure integration**. 
If you are on the US3 site and use the Azure Native Integration, use the site selector on the right side of this page to select `US3` for instructions on [log collection using the Azure Native integration][18]. 

 {{% /site-region %}}

{{% site-region region="us3" %}}

### Azure Native integration
If you are using the Azure Native integration, see the [Send Azure Logs with the Datadog Resource][18] guide for instructions on sending your _subscription level_, _Azure resource_, and _Azure Active Directory_ logs to Datadog.

<div class="alert alert-warning"> <strong>Note</strong>: <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">log archives </a> are only supported with App registration. For US3 sites that have set up the Datadog Azure Native integration, you need to create an <a href="https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=manual#creating-the-app-registration"> App registration</a> to access these functionalities.
</div>

{{% /site-region %}}


### Standard Azure integration
If you are using the Standard Azure integration, see the [Send Azure Logs to Datadog guide][10] for instructions on sending your Azure logs to Datadog with Event Hub. You can choose between an automatic or manual process to enable log collection. 

You can find your Azure logs in the log explorer page in the Datadog platform by navigating to the Logs Explorer and querying for `source:azure*`.

{{< img src="/getting_started/integrations/azure/GSwAzure_logExplorer.png" alt="Log explorer image" style="width:100%;" >}}



## Get more from the Datadog Platform 

### Installing the agent for greater visibility into your application
After you set up your Azure integration, Datadog crawlers automatically collect Azure metrics, but you can gain even deeper visibility into your Azure instances with the [Datadog Agent][1].

#### Azure Native Agent installation

The simplest way to install the Datadog Agent is directly in Azure with the [VM Extension][11] or [natively within Azure AKS][12], thus avoiding the complexity of third-party management tools. 

#### Standard Azure Agent installation

You can use the [Azure extension to install the Datadog Agent on your Windows and Linux VMs][13] or use the [AKS Cluster Extension to deploy the Agent to your AKS Clusters][14].

Installing the Datadog Agent into your environment allows you to collect additional data including, but not limited to: 
- **application health** 
- **process utilization**
- **system level metrics** 

You can also use the built-in StatsD client to send custom metrics from your application to correlate what's happening with your application, your users, and your system.

See the guide on [_Why should I install the Datadog Agent on my cloud instances?_][15]  for more information on the benefits of installing the Datadog Agent on your instances.


## Troubleshooting
See the [Azure Troubleshooting guide][16].

Still need help? Contact [Datadog support][17].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/agent/
[2]: https://www.datadoghq.com/
[3]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
[4]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=manual#creating-the-app-registration
[5]: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[6]: https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/?tab=windows
[7]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=azurecli
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: https://docs.datadoghq.com/integrations/#cat-azure
[10]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/?tab=automatedinstallation
[11]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension#install
[12]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=aksclusterextension#install
[13]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=vmextension#agent-installation
[14]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=aksclusterextension#agent-installation
[15]: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/
[17]: https://docs.datadoghq.com/help/
[18]: https://docs.datadoghq.com/logs/guide/azure-native-logging-guide/
