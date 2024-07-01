---
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon Athena metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_athena/"
"draft": false
"git_integration_title": "amazon_athena"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Athena"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_athena"
"public_title": "Datadog-Amazon Athena Integration"
"short_description": "Track key Amazon Athena metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Athena is an interactive query service that makes it easy to analyze data directly in Amazon Simple Storage Service (Amazon S3) using standard SQL.

Enable this integration to see all your Athena metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Athena` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Athena integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_athena" >}}


### Events

The Amazon Athena integration does not include any events.

### Service Checks

The Amazon Athena integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-athena
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_athena/amazon_athena_metadata.csv
[5]: https://docs.datadoghq.com/help/

