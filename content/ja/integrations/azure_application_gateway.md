---
"aliases":
- /integrations/azure_applicationgateway
"categories":
- cloud
- azure
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Application Gateway metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_application_gateway/"
"draft": false
"git_integration_title": "azure_application_gateway"
"has_logo": true
"integration_id": "azure-applicationgateway"
"integration_title": "Microsoft Azure Application Gateway"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_application_gateway"
"public_title": "Datadog-Microsoft Azure Application Gateway Integration"
"short_description": "Track key Azure Application Gateway metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications.

Use the Datadog Azure integration to collect metrics from Azure Application Gateway.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_application_gateway" >}}


### Events

The Azure Application Gateway integration does not include any events.

### Service Checks

The Azure Application Gateway integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_application_gateway/azure_application_gateway_metadata.csv
[3]: https://docs.datadoghq.com/help/

