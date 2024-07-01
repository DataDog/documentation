---
"aliases":
- /integrations/azure_apimanagement
"categories":
- cloud
- azure
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure API Management metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_api_management/"
"draft": false
"git_integration_title": "azure_api_management"
"has_logo": true
"integration_id": "azure-apimanagement"
"integration_title": "Microsoft Azure API Management"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_api_management"
"public_title": "Datadog-Microsoft Azure API Management Integration"
"short_description": "Track key Azure API Management metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure API Management is a fully managed service that enables customers to publish, secure, transform, maintain, and monitor APIs.

Use the Datadog Azure integration to collect metrics from Azure API Management.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_api_management" >}}


### Events

The Azure API Management integration does not include any events.

### Service Checks

The Azure API Management integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/help/

