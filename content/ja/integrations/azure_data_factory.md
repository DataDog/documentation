---
"aliases":
- /integrations/azure_datafactory
"categories":
- azure
- cloud
- data stores
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Data Factory metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_data_factory/"
"draft": false
"git_integration_title": "azure_data_factory"
"has_logo": true
"integration_id": "azure-datafactory"
"integration_title": "Microsoft Azure Data Factory"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_data_factory"
"public_title": "Datadog-Microsoft Azure Data Factory Integration"
"short_description": "Track key Azure Data Factory metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Data Factory is a cloud data integration service, to compose data storage, movement, and processing services into automated data pipelines.

Use the Datadog Azure integration to collect metrics from Data Factory.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_data_factory" >}}


### Events

The Azure Data Factory integration does not include any events.

### Service Checks

The Azure Data Factory integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/help/

