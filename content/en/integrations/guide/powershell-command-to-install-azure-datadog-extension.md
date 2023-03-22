---
title: Commands to install the Azure Datadog Extension
kind: guide
aliases:
  - "/integrations/faq/powershell-command-to-install-azure-datadog-extension"
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog/"
  tag: "blog"
  text: "Monitor your Microsoft Azure VMs featuring Ampere Altra Arm-based CPUs with Datadog"
---

## Overview

Datadog provides an Azure extension to assist with Agent deployment on Azure instances:

* [Introducing Azure monitoring with one-click Datadog deployment][1]
* [Azure integration documentation][2]

You can install the extension through the CLI or Terraform
To run the Datadog Agent in your Azure instances as an extension, use the command that matches your environment:

### CLI

{{< tabs >}}
{{% tab "Windows" %}}

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<DATADOG_SITE>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY_VALUE>"} -DisableAutoUpgradeMinorVersion
```
More information on the syntax to set Azure instance extensions can be found in the [Azure Extension Set-AzureVMExtension documentation][1].

The Azure Extension can accept both normal settings and protected settings.

The normal settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `site` | String | Set the Datadog intake site, for example: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | String | The Agent version to install, following the format `x.y.z` or `latest` |
| `agentConfiguration` | URI | (optional) Url to the Azure blob contaning the Agent configuration as a zip. |
| `agentConfigurationChecksum` | String | The SHA256 checksum of the Agent configuration zip file, mandatory if `agentConfiguration` is specified. |

The protected settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `api_key`| String | Adds the Datadog API KEY to the configuration file. |

**Note**: If `agentConfiguration` and `api_key` are specified at the same time, the API key found in the `agentConfiguration` takes precedence. Also note that if an API key is set on the target machine, it's not possible to change it with `Set-AzureVMExtension`.

### Specifying a configuration URI
This example shows how to specify a configuration for the Datadog Agent to use.
The Datadog Agent configuration URI must be an Azure blob storage URI.
The Datadog Windows Agent Azure Extension will check that the `agentConfiguration` URI comes from the `.blob.core.windows.net` domain.
The Datataog Agent configuration should be created from the `%PROGRAMDATA%\Datadog` folder.

```powershell
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "6.4" -Settings @{"site" = "<DATADOG_SITE>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
```

**Note**: Once the Datadog Agent is installed, the configuration can only be changed when upgrading to a newer version.

### Set a specific version of the Agent
This example shows how to specify a version of the Agent to install. By default the Datadog Windows Agent Azure Extension will install the latest version of the Datadog Agent.

**Note**: Downgrades are *not* supported, so it's not possible to install a *lower* version of the Datadog Agent than the one currently installed on the target machine. To install a lower version of the Datadog Agent, uninstall the previous version first by removing the Datadog Windows Agent Azure Extension on the target machine. Removing the Datadog Windows Agent Azure Extension does not remove the Datadog Agent configuration.

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "6.4" -Settings @{"site" = "<DATADOG_SITE>"; "agentVersion" = "7.40.0"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY_VALUE>"} -DisableAutoUpgradeMinorVersion
```

[1]: https://learn.microsoft.com/en-us/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

```bash
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 6.0 --settings '{"site":"<DATADOG_SITE>", "agentVersion":"7.40.0"}' --protected-settings '{"api_key":"<DATADOG_API_KEY_VALUE>"}' --no-auto-upgrade-minor-version
```
More information on the syntax to set Azure instance extensions can be found in the [Azure Extension CLI reference][1].

The Azure Extension can accept both normal settings and protected settings.

The normal settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `site` | String | Set the Datadog intake site, for example: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | String | The Agent version to install, following the format `x.y.z` or `latest` |
| `agentConfiguration` | URI | (optional) URI to the Azure blob containing the Agent configuration as a zip. |
| `agentConfigurationChecksum` | String | The SHA256 checksum of the Agent configuration zip file, mandatory if `agentConfiguration` is specified. |

The protected settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `api_key`| String | Adds the Datadog API KEY to the configuration file. |

**Note**: If `agentConfiguration` and `api_key` are specified at the same time, the API key found in the `agentConfiguration` takes precedence. If an API key is set on the target machine, it's not possible to change it with the `api_key` setting.

### Specifying a configuration URI
This example shows how to specify a configuration for the Datadog Agent to use.
- The Datadog Agent configuration URI must be an Azure blob storage URI.
- The Datadog Linux Agent Azure Extension checks that the `agentConfiguration` URI comes from the `.blob.core.windows.net` domain.
- The Datataog Agent configuration should be created from the `/etc/datadog-agent/` folder.

```bash
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 6.0 --settings '{"site":"<DATADOG_SITE>", "agentVersion":"7.40.0", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY_VALUE>"}' --no-auto-upgrade-minor-version
```


[1]: https://learn.microsoft.com/en-us/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

### Terraform

You can use Terraform to create and manage the Datadog Agent extension. Follow these steps to install and configure the Agent on a single machine, and then upload a zipped configuration file to blob storage to be referenced in your VM Extension Terraform block.

1. [Install the Agent][3].
2. Apply any desired [Agent configurations][4].
3. For Windows Server 2008, Vista and newer, save the `%ProgramData%\Datadog` folder as a zip file. For Linux, save the `/etc/datadog-agent` folder as a zip file.
4. Upload the file to blob storage.
5. Reference the blob storage URL in the Terraform block to create the VM extension:

{{< tabs >}}
{{% tab "Windows" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogWindowsAgent"
  type_handler_version = "2.0"

   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS

   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY_VALUE>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}

{{% tab "Linux" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogLinuxAgent"
  type_handler_version = "2.0"

   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS

   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY_VALUE>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /integrations/azure/#deploy-agents
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
