---
"categories":
- cloud
- azure
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Service Bus metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_service_bus/"
"draft": false
"git_integration_title": "azure_service_bus"
"has_logo": true
"integration_id": "azure-service-bus"
"integration_title": "Microsoft Azure Service Bus"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_service_bus"
"public_title": "Datadog-Microsoft Azure Service Bus Integration"
"short_description": "Track key Azure Service Bus metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Microsoft Azure Service Bus is a fully managed enterprise integration message broker.

Get metrics from Azure Service Bus to:

- Visualize the performance of your Service Bus.
- Correlate the performance of your Service Buses with your applications.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps that need to be performed.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_service_bus" >}}


### Events

The Azure Service Bus integration does not include any events.

### Service Checks

The Azure Service Bus integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_service_bus/azure_service_bus_metadata.csv
[3]: https://docs.datadoghq.com/help/

