---
categories:
- cloud
- configuration & deployment
- network
- azure
ddtype: crawler
description: Track trigger workflows, action latency, failed actions, and more.
doc_link: https://docs.datadoghq.com/integrations/azure_logic_app/
git_integration_title: azure_logic_app
has_logo: true
integration_title: Microsoft Azure Logic App
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_logic_app
public_title: Datadog-Microsoft Azure Logic App Integration
short_description: Track trigger workflows, action latency, failed actions, and more.
version: '1.0'
---

## Overview
Logic App allows developers to design workflows that articulate intent via a trigger and series of steps.

Get metrics from Azure Logc App to:

* Visualize the performance of your Logic App workflows
* Correlate the performance of your Logic App workflows with your applications

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration first](https://docs.datadoghq.com/integrations/azure/). There are no other installation steps that need to be performed.


## Data Collected
### Metrics
{{< get-metrics-from-git "azure_logic_app" >}}


### Events
The Azure Logic App integration does not include any event at this time.

### Service Checks
The Azure Logic App integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
