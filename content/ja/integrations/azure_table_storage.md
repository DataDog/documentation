---
"categories":
- azure
- cloud
- data stores
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Table Storage metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_table_storage/"
"draft": false
"git_integration_title": "azure_table_storage"
"has_logo": true
"integration_id": "azure-table-storage"
"integration_title": "Microsoft Azure Table Storage"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_table_storage"
"public_title": "Datadog-Microsoft Azure Table Storage Integration"
"short_description": "Track key Azure Table Storage metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Table Storage is a NoSQL key-value store for rapid development using massive semi-structured datasets

Get metrics from Azure Table Storage to:

- Visualize the performance of your Table Storage.
- Correlate the performance of your Table Storage with your applications.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps that need to be performed.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_table_storage" >}}


### Events

The Azure Table Storage integration does not include any events.

### Service Checks

The Azure Table Storage integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/help/

