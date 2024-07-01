---
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon Kinesis Data Analytics metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_kinesis_data_analytics/"
"draft": false
"git_integration_title": "amazon_kinesis_data_analytics"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Kinesis Data Analytics"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_kinesis_data_analytics"
"public_title": "Datadog-Amazon Kinesis Data Analytics Integration"
"short_description": "Track key Amazon Kinesis Data Analytics metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Kinesis Data Analytics enables you to easily transform, query, and
analyze streaming data in real-time using Apache Flink.

Enable this integration to see all your Amazon Kinesis Data Analytics metrics in
Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Kinesis Analytics` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Kinesis Data Analytics integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_kinesis_data_analytics" >}}


### Events

The Amazon Kinesis Data Analytics integration does not include any events.

### Service Checks

The Amazon Kinesis Data Analytics integration does not include any service
checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-kinesis-data-analytics
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis_data_analytics/amazon_kinesis_data_analytics_metadata.csv
[5]: https://docs.datadoghq.com/help/

