---
categories:
- cloud
- data store
- caching
- azure
ddtype: crawler
description: Track cache hits, misses, evictions, connected clients, and more.
doc_link: https://docs.datadoghq.com/integrations/azure_redis_cache/
git_integration_title: azure_redis_cache
has_logo: true
integration_title: Microsoft Azure Redis Cache
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_redis_cache
public_title: Datadog-Microsoft Azure Redis Cache Integration
short_description: Track cache hits, misses, evictions, connected clients, and more.
version: '1.0'
---

## Overview
Azure Redis Cache is a managed data cache for your Azure applications.

Get metrics from Azure Redis Cache to:

* Visualize the performance of your Redis Caches
* Correlate the performance of your Redis Caches with your applications

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration first](https://docs.datadoghq.com/integrations/azure/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "azure_redis_cache" >}}


### Events
The Azure Redis Cache integration does not include any event at this time.

### Service Checks
The Azure Redis Cache integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
