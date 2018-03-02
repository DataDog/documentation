---
categories:
- cloud
- azure
- os & system
ddtype: crawler
description: Track Azure VM resource usage, network statistics, and more.
doc_link: https://docs.datadoghq.com/integrations/azure_vm/
git_integration_title: azure_vm
has_logo: true
integration_title: Microsoft Azure VM
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_vm
public_title: Datadog-Microsoft Azure VM Integration
short_description: Track Azure VM resource usage, network statistics, and more.
version: '1.0'
---

## Overview
Azure Virtual Machine allows you to flexibly run virtualized environments with the ability to scale on-demand.

Get metrics from Azure VM to:

* Visualize the performance of your VMs
* Correlate the performance of your VMs with your applications

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration first](https://docs.datadoghq.com/integrations/azure/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "azure_vm" >}}


### Events
The Azure Virtual Machine integration does not include any event at this time.

### Service Checks
The Azure Virtual Machine integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
