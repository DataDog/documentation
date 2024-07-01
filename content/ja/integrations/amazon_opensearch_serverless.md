---
"app_id": "amazon-opensearch-serverless"
"app_uuid": "d9d5508c-1d26-4923-a49e-e679eec28d53"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - aws.aoss.active_collection
      "metadata_path": metadata.csv
      "prefix": aws.aoss.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "17708826"
    "source_type_name": Amazon OpenSearch Serverless
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- cloud
- metrics
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_opensearch_serverless"
"integration_id": "amazon-opensearch-serverless"
"integration_title": "Amazon OpenSearch Serverless"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_opensearch_serverless"
"public_title": "Amazon OpenSearch Serverless"
"short_description": "Amazon OpenSearch Serverless is a search configuration which automatically adjusts to handle versatile workloads."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::Metrics"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Amazon OpenSearch Serverless is a search configuration which automatically adjusts to handle versatile workloads.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Amazon OpenSearch Serverless
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon OpenSearch Serverless is an on-demand serverless configuration for OpenSearch, providing an easy way to query and analyze large volumes of data. OpenSearch Serverless collections provide the same benefits as self-managed clusters, without the added complexity of configuration and tuning.

Vector search collections are specifically designed for high-performance similarity searches in machine learning (ML) and artificial intelligence (AI) applications, and can be used to automatically create knowledge bases on Bedrock.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Configuration

1. In the [AWS integration page][2], ensure that OpenSearch Serverless is enabled under the **Metric Collection** tab.
2. Install the [Datadog - Amazon OpenSearch Serverless integration][3].


## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_opensearch_serverless" >}}


### Service Checks

Amazon OpenSearch Serverless does not include any service checks.

### Events

Amazon OpenSearch Serverless does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-opensearch-serverless
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_opensearch_serverless/metadata.csv
[5]: https://docs.datadoghq.com/help/

