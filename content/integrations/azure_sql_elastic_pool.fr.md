---
categories:
- cloud
- azure
- data store
- provisioning
- configuration & deployment
ddtype: crawler
description: Track key Azure SQL Elastic Pool metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/
git_integration_title: azure_sql_elastic_pool
has_logo: true
integration_title: Microsoft Azure SQL Elastic Pool
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_sql_elastic_pool
public_title: Datadog-Microsoft Azure SQL Elastic Pool Integration
short_description: Track key Azure SQL Elastic Pool metrics.
version: '1.0'
---

## Overview
Elastic pools provide a simple and cost effective solution for managing the performance of multiple databases.

Get metrics from Azure SQL Elastic Pool to:

* Visualize the performance of your SQL Elastic Pools
* Correlate the performance of your SQL Elastic Pools with your applications

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration first](https://docs.datadoghq.com/integrations/azure/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "azure_sql_elastic_pool" >}}


### Events
The Azure SQL Elastic pools integration does not include any event at this time.

### Service Checks
The Azure SQL Elastic pools integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
