---
"categories":
- "azure"
- "caching"
- "cloud"
"custom_kind": "integration"
"dependencies": []
"description": "Track cache hits, misses, evictions, connected clients, and more."
"doc_link": "https://docs.datadoghq.com/integrations/azure_redis_cache/"
"draft": false
"git_integration_title": "azure_redis_cache"
"has_logo": true
"integration_id": "azure-redis-cache"
"integration_title": "Microsoft Azure Redis Cache"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_redis_cache"
"public_title": "Datadog-Microsoft Azure Redis Cache Integration"
"short_description": "Track cache hits, misses, evictions, connected clients, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Redis Cache is a managed data cache for your Azure applications.

Get metrics from Azure Redis Cache to:

- Visualize the performance of your Redis Caches.
- Correlate the performance of your Redis Caches with your applications.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_redis_cache" >}}


### Events

The Azure Redis Cache integration does not include any events.

### Service Checks

The Azure Redis Cache integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_redis_cache/azure_redis_cache_metadata.csv
[3]: https://docs.datadoghq.com/help/

