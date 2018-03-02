---
categories:
- cloud
- azure
ddtype: crawler
description: 'Track by-set metrics: bytes in and out, disk operations, CPU usage,
  and more.'
doc_link: https://docs.datadoghq.com/integrations/azure_vm_scale_set/
git_integration_title: azure_vm_scale_set
has_logo: true
integration_title: Microsoft Azure Virtual Machine Scale Set
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_vm_scale_set
public_title: Datadog-Microsoft Azure Virtual Machine Scale Set Integration
short_description: 'Track by-set metrics: bytes in and out, disk operations, CPU usage,
  and more.'
version: '1.0'
---

{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="azure vm scale set dashboard" responsive="true" popup="true">}}

## Overview
Virtual machine scale sets are an Azure Compute resource you can use to deploy, manage, and autoscale a set of identical VMs.

Get metrics from Azure Virtaul Machine Scale Set to:

* Visualize the performance of your Virtual Machine Scale Sets
* Correlate the performance of your Virtual Machine Scale Sets with your applications

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration first](https://docs.datadoghq.com/integrations/azure/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "azure_vm_scale_set" >}}


### Events
The Azure Virtual machine scale sets integration does not include any event at this time.

### Service Checks
The Azure Virtual machine scale sets integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
