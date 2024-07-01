---
"aliases":
- /integrations/azure_dbforpostgresql
"categories":
- azure
- cloud
- data stores
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure DB for PostgreSQL metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_db_for_postgresql/"
"draft": false
"git_integration_title": "azure_db_for_postgresql"
"has_logo": true
"integration_id": "azure-db-for-postgresql"
"integration_title": "Microsoft Azure DB for PostgreSQL"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_db_for_postgresql"
"public_title": "Datadog-Microsoft Azure DB for PostgreSQL Integration"
"short_description": "Track key Azure DB for PostgreSQL metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Database for PostgreSQL provides fully managed, enterprise-ready community PostgreSQL database as a service.

Get metrics from Azure DB for PostgreSQL to:

- Visualize the performance of your PostgreSQL databases.
- Correlate the performance of your PostgreSQL databases with your applications.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps that need to be performed.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_db_for_postgresql" >}}


### Events

The Azure DB for PostgreSQL integration does not include any events.

### Service Checks

The Azure DB for PostgreSQL integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/help/

