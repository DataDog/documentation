---
title: Commands to install the Azure Datadog Extension
kind: guide
aliases:
  - "/integrations/faq/powershell-command-to-install-azure-datadog-extension"
further_reading:
- link: "https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/"
  tag: "Blog"
  text: "Successfully migrate to Azure with the Microsoft Cloud Adoption Framework and Datadog"
- link: "https://www.datadoghq.com/blog/azure-arc-integration/"
  tag: "Blog"
  text: "Monitor your Azure Arc hybrid infrastructure with Datadog"
---

## Install on Azure

Datadog provides an Azure extension to assist with Agent deployment on Azure instances:

* [Introducing Azure monitoring with one-click Datadog deployment][1]
* [Azure integration documentation][2]

An alternative to the GUI installation is the command line.
To run the Datadog Agent in your Azure instances as an extension, use the command that matches your environment. Replace `<SITE_PARAMETER>` with your Datadog account **site parameter** value in the [Datadog sites page][3], and `<DATADOG_API_KEY>` with your [Datadog API key][4]. 

{{< tabs >}}
{{% tab "Windows" %}}

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
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
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "6.4" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
```

**Note**: Once the Datadog Agent is installed, the configuration can only be changed when upgrading to a newer version.

### Set a specific version of the Agent
This example shows how to specify a version of the Agent to install. By default the Datadog Windows Agent Azure Extension will install the latest version of the Datadog Agent.

**Note**: Downgrades are *not* supported, so it's not possible to install a *lower* version of the Datadog Agent than the one currently installed on the target machine. To install a lower version of the Datadog Agent, uninstall the previous version first by removing the Datadog Windows Agent Azure Extension on the target machine. Removing the Datadog Windows Agent Azure Extension does not remove the Datadog Agent configuration.

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "6.4" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "7.40.0"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
```

[1]: https://learn.microsoft.com/en-us/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

```bash
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 6.0 --settings '{"site":"datadoghq.com", "agentVersion":"7.40.0"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
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
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 6.0 --settings '{"site":"datadoghq.com", "agentVersion":"7.40.0", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
```


[1]: https://learn.microsoft.com/en-us/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

## Install on Azure Arc

To run the Datadog Agent in your [Azure Arc][5] instances as an extension, use the command that matches your environment.

{{< tabs >}}
{{% tab "Windows" %}}

```powershell
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogWindowsAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
```

{{% /tab %}}
{{% tab "Linux" %}}

```bash
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogLinuxAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
```

{{% /tab %}}
{{< /tabs >}}

More information on the syntax to set Azure `connectedmachine` extensions can be found in the [az connectedmachine extension][6] page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /integrations/azure/#deploy-agents
[3]: /getting_started/site/#access-the-datadog-site
[4]: /account_management/api-app-keys/#api-keys
[5]: /integrations/azure_arc/
[6]: https://learn.microsoft.com/en-us/cli/azure/connectedmachine/extension