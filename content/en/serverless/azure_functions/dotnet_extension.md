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

<div class="alert alert-warning">Both initial install and upgrades require the app to be fully stopped. Use a deployment slot to avoid downtime.</div>

{{< tabs >}}
{{% tab "Bicep" %}}

Use the [Function App slot Bicep template](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates/install-function-app-slot.bicep):

```bicep
// Version: 1.0.0
@secure()
param datadogApiKey string

param webAppName string
param slotName string
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

// Marks WEBSITE_PRIVATE_EXTENSIONS as slot-sticky so it survives swaps and never
// propagates to production. WARNING: replaces the full sticky-settings list —
// add any other slot-specific setting names to appSettingNames.
resource stickySettings 'Microsoft.Web/sites/config@2025-03-01' = {
  name: 'slotConfigNames'
  parent: webApp
  properties: {
    appSettingNames: [
      'WEBSITE_PRIVATE_EXTENSIONS'
      // Add any other setting names you want to keep slot-specific
    ]
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

**Note:** Include all existing slot app settings in the `slot` resource's `appSettings` array — ARM replaces the full list. `slotConfigNames` also replaces the entire sticky-settings list; add any other slot-sticky setting names to `appSettingNames`.

{{% /tab %}}
{{% tab "ARM Template" %}}

Use the [Function App slot ARM template](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates/install-function-app-slot.json):

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "metadata": { "version": "1.0.0" },
  "parameters": {
    "webAppName": { "type": "string" },
    "slotName": { "type": "string" },
    "datadogApiKey": { "type": "securestring" },
    "ddSite": { "type": "string", "defaultValue": "datadoghq.com" },
    "ddService": { "type": "string", "defaultValue": "" },
    "ddEnv": { "type": "string", "defaultValue": "staging" },
    "ddVersion": { "type": "string", "defaultValue": "" }
  },
  "resources": [
    {
      "comments": "WEBSITE_PRIVATE_EXTENSIONS=0 prevents Functions runtime file locks during install. Include all your existing slot app settings here — ARM replaces the full list.",
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
        // Add your existing slot app settings here
      }
    },
    {
      "comments": "Marks WEBSITE_PRIVATE_EXTENSIONS sticky so it stays on this slot after swaps. WARNING: replaces the full sticky-settings list.",
      "type": "Microsoft.Web/sites/config",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/slotConfigNames')]",
      "properties": {
        "appSettingNames": [
          "WEBSITE_PRIVATE_EXTENSIONS"
          // Add any other setting names you want to keep slot-specific
        ]
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

**Note:** Include all existing slot app settings in the `appsettings` properties object. `slotConfigNames` also replaces the entire sticky-settings list; add any other slot-sticky setting names to `appSettingNames`.

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

[5]: https://portal.azure.com/
[6]: /account_management/api-app-keys/
[7]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

## Custom metrics

The Azure App Service extension includes an instance of [DogStatsD][1], Datadog's metrics aggregation service. This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Function Apps with the extension.

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

Datadog provides a PowerShell script for installing or updating the extension on a per-app basis. When `-SlotName` is provided against a Function App, the script automatically applies the `WEBSITE_PRIVATE_EXTENSIONS=0` sticky slot setting before stopping and installing.

### Prerequisites

- The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) or [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview).
- Azure App Service [user-scope credentials](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials).

### Installing or updating the extension {#powershell-install}

1. Open the Azure CLI or Azure Cloud Shell.
2. Download the install script:

   ```powershell
   Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
   ```

3. Run the script with `-SlotName`:

   ```powershell
   .\install-latest-extension.ps1 `
     -SubscriptionId <SUBSCRIPTION_ID> `
     -ResourceGroup <RESOURCE_GROUP_NAME> `
     -SiteName <FUNCTION_APP_NAME> `
     -SlotName <SLOT_NAME> `
     -DDApiKey <DATADOG_API_KEY> `
     -DDSite <DATADOG_SITE>
   ```

**Required arguments:**
- `<SUBSCRIPTION_ID>`: Your Azure [subscription ID](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to).
- `<RESOURCE_GROUP_NAME>`: Your Azure resource group name.
- `<FUNCTION_APP_NAME>`: The name of your Function App.
- `<SLOT_NAME>`: Your deployment slot name (for example, `staging`).
- `<DATADOG_API_KEY>`: Your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys).

Set `<DATADOG_SITE>` to your [Datadog site][3]. Defaults to `datadoghq.com`.

## Troubleshooting

### Extension install fails with "Could not execute MoveDirectory"

Azure Function Apps can fail with a "Could not execute MoveDirectory" error during extension install. This happens because the Functions runtime holds file locks on `C:\home\SiteExtensions\` after a code deployment, preventing Kudu from moving the staged extension into place.

The fix is `WEBSITE_PRIVATE_EXTENSIONS=0` set as a **sticky slot setting**. If you are using the PowerShell script with `-SlotName`, the workaround is applied automatically. If you are using ARM or Bicep, ensure the templates above are deployed before attempting the extension install, and that the `WEBSITE_PRIVATE_EXTENSIONS` setting is present and sticky on your slot.

**Without a slot (production-direct installs):** fully stop the Function App before installing, then start it after. The sticky setting workaround is not available without a slot.

### APM traces are not appearing

1. Verify `DD_SITE` and `DD_API_KEY` are set correctly on the slot.
2. Do a full stop and start of the slot (not the main app).
3. If not resolved, uninstall and reinstall the extension.

Still need help? Contact [Datadog support][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/azure_functions/
[2]: /integrations/azure/
[3]: /getting_started/site/
[4]: /help
[5]: /metrics/custom_metrics/
