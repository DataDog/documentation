---
"categories":
- cloud
- azure
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Queue Storage metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_queue_storage/"
"draft": false
"git_integration_title": "azure_queue_storage"
"has_logo": true
"integration_id": "azure-queue-storage"
"integration_title": "Microsoft Azure Queue Storage"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_queue_storage"
"public_title": "Datadog-Microsoft Azure Queue Storage Integration"
"short_description": "Track key Azure Queue Storage metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Queue Storage is a service for storing large numbers of messages that can be accessed from anywhere in the world with authenticated calls using HTTP or HTTPS.

Get metrics from Azure Queue Storage to:

- Visualize the performance of your Queue Storage.
- Correlate the performance of your Queue Storage with your applications.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps that need to be performed.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_queue_storage" >}}


### Events

The Azure Queue Storage integration does not include any events.

### Service Checks

The Azure Queue Storage integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/help/

