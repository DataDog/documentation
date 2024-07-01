---
"categories":
- "azure"
- "cloud"
- "configuration & deployment"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Track by-set metrics: bytes in/out, disk operations, CPU usage, and more."
"doc_link": "https://docs.datadoghq.com/integrations/azure_vm_scale_set/"
"draft": false
"git_integration_title": "azure_vm_scale_set"
"has_logo": true
"integration_id": "azure-vm-scale-set"
"integration_title": "Microsoft Azure VM Scale Set"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_vm_scale_set"
"public_title": "Datadog-Microsoft Azure VM Scale Set Integration"
"short_description": "Track by-set bytes in/out, disk ops, CPU usage, more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="azure vm scale set dashboard" popup="true">}}

## Overview

Virtual machine scale sets are an Azure Compute resource used to deploy, manage, and autoscale a set of identical VMs.

Get metrics from Azure Virtual Machine Scale Set to:

- Visualize the performance of your Virtual Machine Scale Sets.
- Correlate the performance of your Virtual Machine Scale Sets with your applications.

## Setup

### Installation

Integration metrics are included as part of the [Microsoft Azure integration][1]. To collect metrics with the Datadog Agent, follow the instructions to deploy Agents:

- If your organization is on Datadog's US3 site and you've configured the Datadog resource in Azure, use the instructions on the [Azure Native Integration Manual Setup Guide][2]. 
- **All sites** can use the instructions on the [Azure Integration Manual Setup Guide][3] or [Azure Programmatic Management Guide][4].

### Log collection

To collect logs from specific Windows events, add channels to the `conf.d/win32_event_log.d/conf.yaml` file manually, or using the Datadog Agent Manager. For example:

```yaml
logs:
  - type: windows_event
    channel_path: '<CHANNEL_1>'
    source: '<CHANNEL_1>'
    service: myservice
    sourcecategory: windowsevent
   - type: windows_event
    channel_path: '<CHANNEL_2>'
    source: '<CHANNEL_2>'
    service: myservice
    sourcecategory: windowsevent
```

For additional details, see the information for the [Win 32 event log][5] integration.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_vm_scale_set" >}}


### Events

The Azure Virtual machine scale sets integration does not include any events.

### Service Checks

The Azure Virtual machine scale sets integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://docs.datadoghq.com/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/integrations/win32_event_log/#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm_scale_set/azure_vm_scale_set_metadata.csv
[7]: https://docs.datadoghq.com/help/

