---
categories:
- cloud
- configuration & deployment
- azure
ddtype: crawler
description: Track key Azure Batch Service metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_batch/
git_integration_title: azure_batch
has_logo: true
integration_title: Microsoft Azure Batch
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_batch
public_title: Datadog-Microsoft Azure Batch Integration
short_description: Track key Azure Batch Service metrics.
version: '1.0'
---

## Overview
Azure Batch Service is a managed task scheduler and processor for your Azure applications.

Get metrics from Azure Batch Service to:

* Visualize the performance of your Batch Accounts
* Correlate the performance of your Batch Accounts with your applications

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration first](https://docs.datadoghq.com/integrations/azure/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "azure_batch" >}}


### Events
The Azure Batch Service integration does not include any event at this time.

### Service Checks
The Azure Batch Service integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

