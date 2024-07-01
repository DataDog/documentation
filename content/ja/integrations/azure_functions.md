---
"categories":
- azure
- cloud
- provisioning
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Functions metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_functions/"
"draft": false
"git_integration_title": "azure_functions"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Azure Functions"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_functions"
"public_title": "Datadog-Microsoft Azure Functions Integration"
"short_description": "Track key Azure Functions metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Functions is an event-driven serverless compute platform that can also solve complex orchestration problems. Build and debug locally without additional setup, deploy and operate at scale in the cloud, and integrate services using triggers and bindings.

Get metrics from Azure Functions to:

- Visualize your function performance and utilization.
- Correlate the performance of your Azure Functions with the rest of your apps.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_functions" >}}


### Events

The Azure Functions integration does not include any events.

### Service Checks

The Azure Functions integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_functions/azure_functions_metadata.csv
[3]: https://docs.datadoghq.com/help/

