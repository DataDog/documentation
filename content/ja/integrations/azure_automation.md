---
"categories":
- automation
- azure
- cloud
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Automation metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_automation/"
"draft": false
"git_integration_title": "azure_automation"
"has_logo": true
"integration_id": "azure-automation"
"integration_title": "Microsoft Azure Automation"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_automation"
"public_title": "Datadog-Microsoft Azure Automation Integration"
"short_description": "Track key Azure Automation metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Automation delivers a cloud-based automation and configuration service that provides consistent management across your Azure and non-Azure environments.

Use the Datadog Azure integration to collect metrics from Azure Automation.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_automation" >}}


### Events

The Azure Automation integration does not include any events.

### Service Checks

The Azure Automation integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/help/

