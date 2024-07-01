---
"aliases":
- /integrations/azure_containerinstances
"categories":
- azure
- cloud
- containers
- provisioning
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Container Instances metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_container_instances/"
"draft": false
"git_integration_title": "azure_container_instances"
"has_logo": true
"integration_id": "azure-containerinstances"
"integration_title": "Microsoft Azure Container Instances"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_container_instances"
"public_title": "Datadog-Microsoft Azure Container Instances Integration"
"short_description": "Track key Azure Container Instances metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Container Instances is a service that enables developers to deploy containers without the need to provision or manage any underlying infrastructure.

Use the Datadog Azure integration to collect metrics from Azure Container Instances.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_container_instances" >}}


### Events

The Azure Container Instances integration does not include any events.

### Service Checks

The Azure Container Instances integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_instances/azure_container_instances_metadata.csv
[3]: https://docs.datadoghq.com/help/

