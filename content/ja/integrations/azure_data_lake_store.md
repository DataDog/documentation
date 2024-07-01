---
"aliases":
- /integrations/azure_datalakestore
"categories":
- azure
- cloud
- data stores
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Data Lake Store metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_data_lake_store/"
"draft": false
"git_integration_title": "azure_data_lake_store"
"has_logo": true
"integration_id": "azure-datalakestore"
"integration_title": "Microsoft Azure Data Lake Store"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_data_lake_store"
"public_title": "Datadog-Microsoft Azure Data Lake Store Integration"
"short_description": "Track key Azure Data Lake Store metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Data Lake Store is a no limits data lake that powers big data analytics.

Use the Datadog Azure integration to collect metrics from Data Lake Store.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_data_lake_store" >}}


**Note**: This integration only collects metrics for Data Lake Storage Gen 1. Data Lake Storage Gen 2 is built on Azure Blob Storage, so its metrics can be found in Datadog under the Blob Storage namespace: `azure.storage_storageaccounts_blobservices.*`. For additional details, see the [Azure Data Lake Storage Gen 2][3] documentation.

### Events

The Azure Data Lake Store integration does not include any events.

### Service Checks

The Azure Data Lake Store integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
[4]: https://docs.datadoghq.com/help/

