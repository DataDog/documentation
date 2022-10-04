---
title: Powershell command to install Azure Datadog Extension
kind: faq
---

Datadog provides an Azure extension to assist with Agent deployment on Azure instances:

* [Introducing Azure monitoring with one-click Datadog deployment][1]
* [Azure integration documentation][2]

An alternative to the GUI install is via Powershell.
To run the Datadog Agent in your Azure instances as an extension, use the following syntax:

{{< tabs >}}
{{% tab "Windows" %}}

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "datadoghq.com"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "$(DatadogApiKey)"} -DisableAutoUpgradeMinorVersion
```
More information on the syntax to set Azure instance extensions can be found in the [Azure Extension Set-AzureVMExtension documentation][3].

The Azure Extension supports two type of settings: normal settings and protected settings.
The normal settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `site` | String | Set the Datadog intake site, for example: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | The Agent version to install, following the format x.y.z or latest |
| `agentConfiguration` | (optional) Url to the Azure blob contaning the Agent configuration as a zip. |
| `agentConfigurationChecksum` | The SHA256 checksum of the Agent configuration zip file, mandatory if `agentConfiguration` is specified. |

The protected settings are encrypted and only decrypted on the target virtual machine. The protected configuration is useful when the execution command includes secrets such as the `api_key`.

| Variable | Type | Description  |
|----------|------|--------------|
| `api_key`| String | Adds the Datadog API KEY to the configuration file. |

**Note**: If `agentConfiguration` and `api_key` are specified at the same time, the API key found in the `agentConfiguration` takes precedence. Also note that for now, if an API key is set on the target machine, it's not possible to change it with `Set-AzureVMExtension`.

A few additional examples:

### Specifying a configuration URI
The Datadog Agent configuration URI must be an Azure blob storage URI.
The Datadog Windows Agent Azure Extension will check that the `agentConfiguration` URI comes from the `.blob.core.windows.net` domain.
The Datataog Agent configuration should be created from the `%PROGRAMDATA%\Datadog` folder.

```powershell
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "datadoghq.com"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<CONFIGURATION_URI>.zip"; "agentConfigurationCheckSum" = "9AB6ADCEF012305B32EBDE3A7022F1420C09825D889D3CE11FB8550856D7A474"} -DisableAutoUpgradeMinorVersion
```

### Set a specific version of the Agent
This example shows how to specify a version of the Agent to install. By default the Datadog Windows Agent Azure Extension will install the latest version of the Datadog Agent.

**Note**: Downgrades are **not* supported, so it's not possible to install a *lower* version of the Datadog Agent than the one currently installed on the target machine. To install a lower version of the Datadog Agent, uninstall the previous version first by removing the Datadog Windows Agent Azure Extension on the target machine. Removing the Datadog Windows Agent Azure Extension does not remove the Datadog Agent configuration.

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "datadoghq.com"; "agentVersion" = "7.39.0"} -ProtectedSettings @{"api_key" = "$(DatadogApiKey)"} -DisableAutoUpgradeMinorVersion
```

{{% /tab %}}
{{% tab "Linux" %}}

```bash
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 5.0 --settings '{"site":"datadoghq.com", "agentVersion":"7.39.0"}' --protected-settings '{"api_key":"$(DatadogApiKey)"}' --no-auto-upgrade-minor-version
```
More information on the syntax to set Azure instance extensions can be found in the [Azure Extension CLI reference][4].

The Azure Extension supports two type of settings: normal settings and protected settings.
The normal settings include:

| Variable | Type | Description  |
|----------|------|--------------|
| `site` | String | Set the Datadog intake site, for example: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | The Agent version to install, following the format x.y.z or latest |

The protected settings are encrypted and only decrypted on the target virtual machine. The protected configuration is useful when the execution command includes secrets such as the `api_key`.

| Variable | Type | Description  |
|----------|------|--------------|
| `api_key`| String | Adds the Datadog API KEY to the configuration file. |

{{% /tab %}}
{{< /tabs >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /integrations/azure/#deploy-agents
[3]: https://learn.microsoft.com/en-us/powershell/module/servicemanagement/azure.service/set-azurevmextension
[4]: https://learn.microsoft.com/en-us/cli/azure/vm/extension