---
title: Azure App Service - Windows Code
aliases:
  - /infrastructure/serverless/azure_app_services/
further_reading:
- link: "/integrations/guide/azure-portal/"
  tag: "Documentation"
  text: "Azure Portal Integration Guide"
- link: "https://www.datadoghq.com/blog/azure-app-service-extension/"
  tag: "Blog"
  text: "Monitor .NET web apps with the Datadog extension for Azure App Service"
- link: "https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services"
  tag: "Pricing"
  text: "Azure App Service APM Pricing"
- link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
  tag: "Blog"
  text: "Deploy ASP.NET Core applications to Azure App Service"

---

## Overview

The Datadog extension for Azure App Service provides additional monitoring capabilities.

- Full distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD]({{ "/developers/dogstatsd" | absLangURL }}).

## Setup

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-setup language=".NET" %}}
{{% /aas-setup %}}
{{% /tab %}}

{{% tab "Java" %}}

{{% aas-setup language="Java" %}}

{{% /aas-setup %}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{% aas-setup language="Node.js" %}}

{{% /aas-setup %}}
{{% /tab %}}
{{< /tabs >}}

## Custom Metrics

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-custom-metrics language=".NET" %}}

{{% /tab %}}
{{% tab "Java" %}}

{{% aas-custom-metrics language="Java" %}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{% aas-custom-metrics language="Node.js" %}}

{{% /tab %}}
{{< /tabs >}}

## Logging

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-logging language=".NET" %}}

{{% /tab %}}
{{% tab "Java" %}}

{{% aas-logging language="Java" %}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{% aas-logging language="Node.js" %}}

{{% /tab %}}
{{< /tabs >}}

## Programmatic management

{{< tabs >}}
{{% tab ".NET" %}}

Datadog provides scripts to update or install the Azure App Service Extension using Powershell. Scripted extension management enables you to [update extensions in bulk by resource group](#powershell-resource-group) and [designate the installation of specific versions of the site extension](#powershell-specific-version). You can also use scripts to programmatically add the extension in CI/CD pipelines, as well as discover and update extensions that are already installed.

### Prerequisites

- The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) or [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview).
- Azure App Service [user-scope credentials](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials). If you do not already have credentials, go to your [Azure portal](https://portal.azure.com/) and access your Web App or Function App. Navigate to **Deployment** > **Deployment Center** to create or retrieve your user-scope credentials.

### Installing the extension for the first time {#powershell-first-time}

The install script adds the latest version of the extension to an Azure Web App or Azure Function App. This occurs on a per-app basis, rather than at a resource group level.

1. Open the Azure CLI or Azure Cloud Shell.
2. Download the installation script using the following command:

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Run the following command, passing in required and optional arguments as needed.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION>
    ```

**Note**: The following arguments are required for the above command:

- `<USERNAME>`: Your Azure user scope username.
- `<PASSWORD>`: Your Azure user scope password.
- `<SUBSCRIPTION_ID>`: Your Azure [subscription ID](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to).
- `<RESOURCE_GROUP_NAME>`: Your Azure resource group name.
- `<SITE_NAME>`: The name of your app.
- `<DATADOG_API_KEY>`: Your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys).

Also, set `DATADOG_SITE` to your [Datadog site][32]. `DATADOG_SITE` defaults to `datadoghq.com`. Your site is: {{< region-param key="dd_site" code="true" >}}.

[32]: /getting_started/site/

### Updating the extension for a resource group {#powershell-resource-group}

The update script applies to an entire resource group. This script updates every Web App or Function App that has the extension installed. App Service apps that do not have the Datadog extension installed are not affected.

1. Open the Azure CLI or Azure Cloud Shell.
2. Download the update script using the following command:

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Run the following command. All arguments are required.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```

### Install a specific version of the extension {#powershell-specific-version}

The Azure App Service UI does not support the ability to install a specific version of an extension. You may do this with the install or update script.

#### Install specific version on a single resource

To install a specific version on a single instance, follow the [instructions for installing the extension for the first time](#powershell-first-time) and add the `-ExtensionVersion` parameter to the installation command.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

Replace `<EXTENSION_VERSION>` with the version of the extension you wish to install. For instance, `1.4.0`.

#### Install specific version on an entire resource group

To install a specific version for a resource group, follow the [instructions for updating the extension for a resource group](#powershell-resource-group) and add the `-ExtensionVersion` parameter to the installation command.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

Replace `<EXTENSION_VERSION>` with the version of the extension you wish to install. For instance, `1.4.0`.

### ARM template

Many organizations use [Azure Resource Management (ARM) templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) to implement the practice of infrastructure-as-code. To build the App Service Extension into these templates, incorporate [Datadog's App Service Extension ARM template](https://github.com/DataDog/datadog-aas-extension/tree/master/ARM) into your deployments to add the extension and configure it alongside your App Service resources.

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-warning">Support for Java Web Apps is in Preview for extension v2.4+. Programmatic management is not available for Java Web Apps.<br/><br/>
    Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a Preview becomes available.</div>

{{% /tab %}}
{{< /tabs >}}

## Deployment

{{% aas-workflow-windows %}}

## Troubleshooting

### If your apps are identified as being misconfigured in the Serverless View and/or you are missing corresponding metrics for your traces

It is likely that you do not have the Azure integration configured to monitor your application. Proper configuration improves your ability to correlate metrics, traces, and logs in the Datadog platform. Without the Azure integration configured, you are missing critical context for your traces. To fix this:

1. Go to the Azure integration tile.

2. Ensure you have installed the [Azure integration]({{ "/integrations/azure/" | absLangURL }}) for the Azure subscription where your application is running.

3. Ensure that any App Service plan filtering rules you have applied include the App Service plan where the app is running. If an App Service plan is not included, all apps and functions hosted on it are also not included. Tags on the app itself are not used for filtering by Datadog.

### If APM traces are not appearing in Datadog

1. Verify you've set `DD_SITE` and `DD_API_KEY` correctly.

2. Do a full stop and start of your application.

3. If not resolved, try uninstalling the extension and re-installing (this also ensures you are running the latest version).

**Note**: To expedite the process of investigating application errors with the support team, set `DD_TRACE_DEBUG:true` and add the content of the Datadog logs directory (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) to your email.

Still need help? Contact [Datadog support][31].

[31]: /help

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /tracing/setup/dotnet/

[5]: /profiler/enabling/dotnet/?tab=azureappservice
[6]: /tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration

[14]: /integrations/guide/azure-portal/
[15]: /security/application_security/serverless/?tab=serverlessframework#azure-app-service

[18]: /tracing/setup/java/
[21]: /tracing/trace_collection/library_config/nodejs/#configuration-settings
[22]: https://github.com/brightcove/hot-shots

[29]: https://learn.microsoft.com/en-us/azure/templates/microsoft.datadog/monitors?pivots=deployment-language-arm-template
