---
title: Azure Functions .NET APM Extension
---

## Overview

The Datadog .NET APM Extension provides full APM tracing for .NET Azure Functions running on Windows with a Dedicated (App Service) or Premium plan.

**Requirements:**
- .NET runtime
- Windows OS
- Dedicated (App Service) or Premium hosting plan
- A deployment slot (strongly recommended — required for reliable installs and upgrades)

For all other Azure Functions configurations (different runtime, OS, or hosting plan), use the [Serverless Compatibility Layer][1].

If you haven't already, set up the [Datadog-Azure integration][2] first.

## Installation

<div class="alert alert-warning">Both initial install and upgrades require the app to be fully stopped. If you are using a deployment slot, install on the slot, then swap to production. <code>WEBSITE_PRIVATE_EXTENSIONS=0</code> is required on the slot to prevent MoveDirectory failures, but it also prevents the runtime from loading private extensions. The extension will become active after you swap the slot to production. Do not set <code>WEBSITE_PRIVATE_EXTENSIONS=0</code> on production.</div>

{{< tabs >}}
{{% tab "Bicep" %}}

Use the [Function App slot Bicep template](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates/install-function-app-slot.bicep):

```bicep
// Version: 1.0.0
// Description: Install Datadog APM extension on an Azure Function App deployment slot.

@secure()
param datadogApiKey string

param webAppName string
param slotName string

@description('Names of app settings already marked slot-sticky on this Function App. Pass [] for a new app with no existing sticky settings. This template does a full replace of slotConfigNames — omitting an existing sticky setting name will de-sticky it.')
param existingStickyAppSettingNames array
param ddSite string = 'datadoghq.com'
param ddService string = ''
@description('Environment tag — set a distinct value for each slot')
param ddEnv string = 'staging'
param ddVersion string = ''

resource webApp 'Microsoft.Web/sites@2025-03-01' existing = {
  name: webAppName
}

// WEBSITE_PRIVATE_EXTENSIONS=0 prevents the Functions runtime from holding file locks
// on C:\home\SiteExtensions\ so Kudu can complete the MoveDirectory step during install.
// Include all your existing slot app settings in this resource — ARM replaces the full set.
resource slot 'Microsoft.Web/sites/slots@2025-03-01' = {
  parent: webApp
  name: slotName
  properties: {
    siteConfig: {
      appSettings: [
        // Add your existing slot app settings here (e.g. AzureWebJobsStorage, FUNCTIONS_WORKER_RUNTIME)
        { name: 'WEBSITE_PRIVATE_EXTENSIONS', value: '0' }
        { name: 'DD_API_KEY', value: datadogApiKey }
        { name: 'DD_SITE', value: ddSite }
        { name: 'DD_SERVICE', value: ddService }
        { name: 'DD_ENV', value: ddEnv }
        { name: 'DD_VERSION', value: ddVersion }
      ]
    }
  }
}

// Marks WEBSITE_PRIVATE_EXTENSIONS as slot-sticky. Replaces the full slotConfigNames list —
// existingStickyAppSettingNames must include any settings already marked sticky or they will be de-stickied.
resource stickySettings 'Microsoft.Web/sites/config@2025-03-01' = {
  name: 'slotConfigNames'
  parent: webApp
  properties: {
    appSettingNames: union(existingStickyAppSettingNames, ['WEBSITE_PRIVATE_EXTENSIONS'])
  }
  dependsOn: [slot]
}

// Only .NET is supported for Azure Function Apps.
resource datadogExtension 'Microsoft.Web/sites/slots/siteextensions@2025-03-01' = {
  parent: slot
  name: 'Datadog.AzureAppServices.DotNet'
  dependsOn: [stickySettings]
}
```

Deploy:

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file install-function-app-slot.bicep
```

**Note:** The `slotConfigNames` resource does a full replace of the sticky-settings list, so you need to include all existing slot app settings in the `appSettings` array. Pass your existing slot-sticky setting names in `existingStickyAppSettingNames` or pass `[]` for a new app. Any name omitted from `existingStickyAppSettingNames` will be de-stickied.

After the deployment completes, swap the slot to production:

```shell
az webapp deployment slot swap --resource-group <RESOURCE GROUP> --name <SITE_NAME> --slot <SLOT_NAME> --target-slot production
```

**The extension only loads after the swap.** Because we set `WEBSITE_PRIVATE_EXTENSIONS=0`, the runtime does not load private extensions. Production must not have `WEBSITE_PRIVATE_EXTENSIONS=0`. Production will load the extension and send data as expected.

{{% /tab %}}
{{% tab "ARM Template" %}}

Use the [Function App slot ARM template](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates/install-function-app-slot.json):

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "metadata": {
    "description": "Install Datadog APM extension on an Azure Function App deployment slot. Applies WEBSITE_PRIVATE_EXTENSIONS=0 as a sticky slot setting to prevent MoveDirectory file-lock failures.",
    "version": "1.0.0"
  },
  "parameters": {
    "webAppName": {
      "type": "string",
      "metadata": { "description": "Name of the Azure Function App" }
    },
    "slotName": {
      "type": "string",
      "metadata": { "description": "Name of the deployment slot (e.g. staging)" }
    },
    "datadogApiKey": {
      "type": "securestring",
      "metadata": { "description": "Your Datadog API key" }
    },
    "ddSite": {
      "type": "string",
      "defaultValue": "datadoghq.com",
      "metadata": { "description": "Your Datadog site (e.g. datadoghq.com, datadoghq.eu)" }
    },
    "ddService": {
      "type": "string",
      "defaultValue": "",
      "metadata": { "description": "Service name for unified service tagging" }
    },
    "ddEnv": {
      "type": "string",
      "defaultValue": "staging",
      "metadata": { "description": "Environment tag — set a distinct value for each slot" }
    },
    "ddVersion": {
      "type": "string",
      "defaultValue": "",
      "metadata": { "description": "Version for unified service tagging" }
    },
    "existingStickyAppSettingNames": {
      "type": "array",
      "metadata": { "description": "Names of app settings already marked slot-sticky on this Function App. Pass [] for a new app with no existing sticky settings. This template does a full replace of slotConfigNames — omitting an existing sticky setting name will de-sticky it." }
    }
  },
  "resources": [
    {
      "type": "Microsoft.Web/sites/slots/config",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/appsettings')]",
      "properties": {
        "WEBSITE_PRIVATE_EXTENSIONS": "0",
        "DD_API_KEY": "[parameters('datadogApiKey')]",
        "DD_SITE": "[parameters('ddSite')]",
        "DD_SERVICE": "[parameters('ddService')]",
        "DD_ENV": "[parameters('ddEnv')]",
        "DD_VERSION": "[parameters('ddVersion')]"
      }
    },
    {
      "type": "Microsoft.Web/sites/config",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/slotConfigNames')]",
      "properties": {
        "appSettingNames": "[union(parameters('existingStickyAppSettingNames'), createArray('WEBSITE_PRIVATE_EXTENSIONS'))]"
      },
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites/slots/config', parameters('webAppName'), parameters('slotName'), 'appsettings')]"
      ]
    },
    {
      "type": "Microsoft.Web/sites/slots/siteextensions",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/Datadog.AzureAppServices.DotNet')]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites/config', parameters('webAppName'), 'slotConfigNames')]",
        "[resourceId('Microsoft.Web/sites/slots/config', parameters('webAppName'), parameters('slotName'), 'appsettings')]"
      ]
    }
  ]
}
```

Deploy:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file install-function-app-slot.json
```

**Note:** The `slotConfigNames` resource does a full replace of the sticky-settings list, so you need to include all existing slot app settings in the `appSettings` array. Pass your existing slot-sticky setting names in `existingStickyAppSettingNames` or pass `[]` for a new app. Any name omitted from `existingStickyAppSettingNames` will be de-stickied.

After the deployment completes, swap the slot to production:

```bash
az webapp deployment slot swap --resource-group <RESOURCE GROUP> --name <SITE_NAME> --slot <SLOT_NAME> --target-slot production
```

**The extension only loads after the swap.** Because we set `WEBSITE_PRIVATE_EXTENSIONS=0`, the runtime does not load private extensions. Production must not have `WEBSITE_PRIVATE_EXTENSIONS=0`. Production will load the extension and send data as expected.

{{% /tab %}}
{{% tab "Manual" %}}

1. In the [Azure Portal][5], navigate to your Function App and open **Deployment slots**. Select your deployment slot.

2. In the slot, open **Configuration** and add the following Application Settings:

   `WEBSITE_PRIVATE_EXTENSIONS`
   : **Value**: `0`<br>
   Prevents the Functions runtime from holding file locks on `C:\home\SiteExtensions\` during extension install. Must be marked as a **Deployment slot setting** (sticky) in step 3.<br>

   `DD_API_KEY`
   : **Value**: Your [Datadog API key][6].<br>

   `DD_SITE`
   : **Value**: Your [Datadog site][7]. Defaults to `datadoghq.com`.<br>

   `DD_SERVICE`
   : **Value**: Your application's service name.<br>

   `DD_ENV`
   : **Value**: Your application's environment (for example, `staging`).<br>

   `DD_VERSION`
   : **Value**: Your application's version.<br>

3. Click **Save**. Then open **Configuration** → **General settings** → **Deployment slot settings** and mark `WEBSITE_PRIVATE_EXTENSIONS` as a slot setting. This ensures it stays on this slot after swaps and never propagates to production.

4. **Stop the slot** by navigating to the slot's **Overview** page and clicking **Stop**.
   <div class="alert alert-danger">You must stop the slot before installing the extension.</div>

5. Navigate to **Extensions** and add the Datadog APM extension for your runtime.

6. **Start the slot** by clicking **Start** on the slot's **Overview** page.

7. **Swap the slot to production.** On the slot's **Overview** page, click **Swap** and select `production` as the target, or run:

   ```shell
   az webapp deployment slot swap --resource-group <RESOURCE GROUP> --name <SITE_NAME> --slot <SLOT_NAME> --target-slot production
   ```
**The extension only loads after the swap.** Because we set `WEBSITE_PRIVATE_EXTENSIONS=0`, the runtime does not load private extensions. Production must not have `WEBSITE_PRIVATE_EXTENSIONS=0`. Production will load the extension and send data as expected.

[5]: https://portal.azure.com/
[6]: /account_management/api-app-keys/
[7]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

## Custom metrics

The Azure App Service extension includes an instance of [DogStatsD][dogstatsd], Datadog's metrics aggregation service. This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Function Apps with the extension.

{{% aas-custom-metrics-dotnet %}}

**Note**: To send only custom metrics (while disabling tracing) set the following variables in your application's config:
  - Set `DD_TRACE_ENABLED` to `false`.
  - Set `DD_AAS_ENABLE_CUSTOM_METRICS` to `true`.

Learn more about [custom metrics][5].

## Logging

### Application logging

{{% aas-logging-dotnet %}}

### Environment variables for logging

Configure these environment variables in your Azure App Service Application Settings for optimal log collection:

| Variable | Description | Example |
|----------|-------------|---------|
| `DD_SERVICE` | Your application's service name | `my-function-app` |
| `DD_ENV` | Your application's environment | `production`, `staging`, `development` |
| `DD_LOGS_INJECTION` | Enable trace-log correlation | `true` |

### Logging best practices

- **Enable trace correlation**: Set `DD_LOGS_INJECTION=true` to correlate logs with traces
- **Set proper service names**: Use `DD_SERVICE` to ensure logs appear with the correct service name
- **Use structured logging**: Implement structured logging in your application for better log parsing

**Note**: Trace ID injection occurs inside your application. Azure Resource logs are generated by Azure in the management plane, and therefore do not include the trace ID.

{{% aas-logging-dotnet-code-example %}}

## Programmatic management

Datadog provides a PowerShell script for installing or updating the extension on a per-app basis. This script can handle configuration for variables such as `DD_SERVICE` and `DD_ENV`. When `-SlotName` is provided, the script automatically applies the `WEBSITE_PRIVATE_EXTENSIONS=0` sticky slot setting before stopping and installing. Scripted extension management enables you to [update extensions in bulk by resource group](#powershell-resource-group) and [designate the installation of specific versions of the site extension](#powershell-specific-version). You can also use scripts to programmatically add the extension in CI/CD pipelines, as well as discover and update extensions that are already installed.

### Prerequisites

- The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) or [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview).
- Azure App Service [user-scope credentials](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials).

### Installing the extension for the first time {#powershell-first-time}

The install script adds the latest version of the extension to an Azure Web App or Azure Function App. This occurs on a per-app basis, rather than at a resource group level.

1. Open the Azure CLI or Azure Cloud Shell.
2. Download the installation script using the following command:

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Run the following command, passing in required and optional arguments as needed.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION> [-SlotName <SLOT_NAME>]
    ```

**Note**: The following arguments are required for the above command:

- `<USERNAME>`: Your Azure user scope username.
- `<PASSWORD>`: Your Azure user scope password.
- `<SUBSCRIPTION_ID>`: Your Azure [subscription ID](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to).
- `<RESOURCE_GROUP_NAME>`: Your Azure resource group name.
- `<SITE_NAME>`: The name of your app.
- `<DATADOG_API_KEY>`: Your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys).

Also, set `DATADOG_SITE` to your [Datadog site][32]. `DATADOG_SITE` defaults to `datadoghq.com`. Your site is: {{< region-param key="dd_site" code="true" >}}.

To target a deployment slot instead of the main app, add `-SlotName <SLOT_NAME>`. On Azure Function Apps, this also automatically applies the `WEBSITE_PRIVATE_EXTENSIONS=0` sticky slot setting to prevent extension install failures.

After the script completes, swap the slot to production:

```shell
az webapp deployment slot swap --resource-group <RESOURCE_GROUP_NAME> --name <SITE_NAME> --slot <SLOT_NAME> --target-slot production
```

**The extension only loads after the swap.** Because we set `WEBSITE_PRIVATE_EXTENSIONS=0`, the runtime does not load private extensions. Production must not have `WEBSITE_PRIVATE_EXTENSIONS=0`. Production will load the extension and send data as expected.

[32]: /getting_started/site/

### Updating the extension for a resource group {#powershell-resource-group}

The update script applies to an entire resource group. This script updates every app that has the extension installed. Apps that do not have the Datadog extension installed are not affected.

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

## Troubleshooting

### Extension install fails with "Could not execute MoveDirectory"

Azure Function Apps can fail with a "Could not execute MoveDirectory" error during extension install. This happens because the Functions runtime holds file locks on `C:\home\SiteExtensions\` after a code deployment, preventing Kudu from moving the staged extension into place.

The fix is `WEBSITE_PRIVATE_EXTENSIONS=0` set as a **sticky slot setting** on the deploy slot. If you are using the PowerShell script with `-SlotName`, the workaround is applied automatically. If you are using ARM or Bicep, confirm the templates above are deployed before attempting the extension install, and that the `WEBSITE_PRIVATE_EXTENSIONS` setting is present and sticky on your slot.

After installation, **swap the slot to production**. The extension will not load on the slot itself because `WEBSITE_PRIVATE_EXTENSIONS=0` prevents private extension loading — this is expected. Telemetry only begins after the swap, when production installs the extension.

**Without a slot (production-direct installs):** Fully stop the Function App before installing, then start it after. Do not set `WEBSITE_PRIVATE_EXTENSIONS=0` on production — the extension loads normally after the app starts.

### APM traces are not appearing

1. Verify `DD_SITE` and `DD_API_KEY` are set correctly on the production app.
2. If you installed via a deployment slot, confirm you swapped the slot to production.
3. Do a full stop and start of the production app.
4. If not resolved, uninstall and reinstall the extension, then swap again.

Still need help? Contact [Datadog support][4].

[1]: /serverless/azure_functions/
[2]: /integrations/azure/
[3]: /getting_started/site/
[4]: /help
[5]: /metrics/custom_metrics/
[dogstatsd]: /extend/dogstatsd/
