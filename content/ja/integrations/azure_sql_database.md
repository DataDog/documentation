---
"categories":
- "cloud"
- "data stores"
- "caching"
- "azure"
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure SQL Database metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_sql_database/"
"draft": false
"git_integration_title": "azure_sql_database"
"has_logo": true
"integration_id": "azure-sql-database"
"integration_title": "Microsoft Azure SQL Database"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_sql_database"
"public_title": "Datadog-Microsoft Azure SQL Database Integration"
"short_description": "Track key Azure SQL Database metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure SQL Database gives you a robust datastore with the flexibility to scale to meet demand.

Get metrics from Azure SQL Database to:

- Visualize the performance of your SQL Database.
- Correlate the performance of your SQL Database with your applications.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_sql_database" >}}


### Events

The Azure SQL Database integration does not include any events.

### Service Checks

The Azure SQL Database integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_database/azure_sql_database_metadata.csv
[3]: https://docs.datadoghq.com/help/

