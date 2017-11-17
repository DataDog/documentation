---
aliases: []
description: 'Track by-set metrics: bytes in and out, disk operations, CPU usage,
  and more.'
git_integration_title: azure_vm_scale_set
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Microsoft Azure Virtual Machine Scale Set Integration
---

{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="azure vm scale set dashboard" responsive="true" >}}

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
{{< get-metrics-from-git >}}

### Events
The Azure Virtual machine scale sets integration does not include any event at this time.

### Service Checks
The Azure Virtual machine scale sets integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)