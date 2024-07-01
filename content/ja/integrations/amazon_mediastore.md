---
"categories":
- aws
- cloud
- data stores
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS Elemental MediaStore metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_mediastore/"
"draft": false
"git_integration_title": "amazon_mediastore"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Elemental MediaStore"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_mediastore"
"public_title": "Datadog-AWS Elemental MediaStore Integration"
"short_description": "Track key AWS Elemental MediaStore metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Elemental MediaStore is an AWS storage service optimized for media.

Enable this integration to see all your AWS Elemental MediaStore metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration tile][2], ensure that `MediaStore` is checked
   under metric collection.
2. Install the [Datadog - AWS Elemental MediaStore integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_mediastore" >}}


### Events

The AWS Elemental MediaStore integration does not include any events.

### Service Checks

The AWS Elemental MediaStore integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediastore
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediastore/amazon_mediastore_metadata.csv
[5]: https://docs.datadoghq.com/help/

