---
"categories":
- aws
- cloud
- log collection
- network
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS PrivateLink metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_privatelink/"
"draft": false
"git_integration_title": "amazon_privatelink"
"has_logo": true
"integration_id": ""
"integration_title": "AWS PrivateLink"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_privatelink"
"public_title": "Datadog-AWS PrivateLink Integration"
"short_description": "Track key AWS PrivateLink metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS PrivateLink provides private connectivity between VPCs, AWS services, and your on-premises networks.

Enable this integration to monitor the health and performance of your VPC endpoints or endpoint services with Datadog.

**Important:** If you would like to send telemetry data to Datadog through PrivateLink, follow [these instructions][1].

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][2] first.

### Metric collection

1. In the [AWS integration page][3], ensure that `PrivateLinkEndPoints` and `PrivateLinkServices` are enabled
   under the `Metric Collection` tab.
2. Install the [Datadog - AWS PrivateLink integration][4].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_privatelink" >}}


### Events

The AWS PrivateLink integration does not include any events.

### Service Checks

The AWS PrivateLink integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://docs.datadoghq.com/agent/guide/private-link/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-privatelink
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_privatelink/amazon_privatelink_metadata.csv
[6]: https://docs.datadoghq.com/help/

