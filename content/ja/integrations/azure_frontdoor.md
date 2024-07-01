---
"categories":
- cloud
- azure
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Front Door metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_frontdoor/"
"draft": false
"git_integration_title": "azure_frontdoor"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Azure Front Door"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_frontdoor"
"public_title": "Datadog-Microsoft Azure Front Door Integration"
"short_description": "Track key Azure Front Door metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Front Door is Microsoft’s modern cloud Content Delivery Network (CDN) that provides fast, reliable, and secure access between your users and your applications’ static and dynamic web content across the globe.

Use the Datadog Azure integration to collect metrics from Azure Front Door.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_frontdoor" >}}


**Note**: The Classic tier uses the `azure.network_frontdoors.*` namespace as shown. On the Standard and Premium tiers, metrics appear under the `azure.cdn_profiles.*` namespace instead.

### Events

The Azure Front Door integration does not include any events.

### Service Checks

The Azure Front Door integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_frontdoor/azure_frontdoor_metadata.csv
[3]: https://docs.datadoghq.com/help/

