---
"categories":
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS Certificate Manager metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_certificate_manager/"
"draft": false
"git_integration_title": "amazon_certificate_manager"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Certificate Manager"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_certificate_manager"
"public_title": "Datadog-AWS Certificate Manager Integration"
"short_description": "Track key AWS Certificate Manager metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Certificate Manager lets you provision, manage, and deploy SSL/TLS certificates for use with AWS services and internal connected resources.

Enable this integration to see all your Certificate Manager metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `CertificateManager` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Certificate Manager integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_certificate_manager" >}}


### Events

The AWS Certificate Manager integration supports certificate expiration and state change events from EventBridge.

### Service Checks

The AWS Certificate Manager integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-certificate-manager
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_certificate_manager/amazon_certificate_manager_metadata.csv
[5]: https://docs.datadoghq.com/help/

