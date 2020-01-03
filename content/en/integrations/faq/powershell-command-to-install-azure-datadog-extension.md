---
title: Powershell command to install Azure Datadog Extension
kind: faq
disable_toc: true
---

Datadog provides an Azure extension to assist with Agent deployment on Azure instances:

* [Introducing Azure monitoring with one-click Datadog deployment][1]
* [Azure integration documentation][2]

An alternative to the GUI install is via Powershell.
To run the Datadog Agent in your Azure instances as an extension, use the following syntax:

```powershell
$Settings="{'api_key': '$(DatadogApiKey)'}"
Set-AzureRmVMExtension -Publisher "Datadog.Agent" -ExtensionType "DatadogWindowsAgent" -Settings $Settings
```

More information on the syntax to set Azure instance extensions can be found [in the Microsoft documentation][3].

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /integrations/azure/#deploy-agents
[3]: https://docs.microsoft.com/en-us/powershell/module/azurerm.compute/set-azurermvmextension?view=azurermps-6.2.0
