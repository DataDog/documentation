---
"app_id": "amazon-bedrock"
"app_uuid": "ca7ffbc0-a346-4880-ab41-d6ef2dbd0ba3"
"assets":
  "dashboards":
    "amazon-bedrock": assets/dashboards/amazon_bedrock_overview.json
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - aws.bedrock.invocations
      "metadata_path": metadata.csv
      "prefix": aws.bedrock.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "370"
    "source_type_name": Amazon Bedrock
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- metrics
- cloud
- ai/ml
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_bedrock"
"integration_id": "amazon-bedrock"
"integration_title": "Amazon Bedrock"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_bedrock"
"public_title": "Amazon Bedrock"
"short_description": "Amazon Bedrock makes AI foundation models available through an API."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  - "Category::AI/ML"
  "configuration": "README.md#Setup"
  "description": Amazon Bedrock makes AI foundation models available through an API.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/"
  "support": "README.md#Support"
  "title": Amazon Bedrock
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon Bedrock is a fully managed service that makes [foundation models][1] (FMs) from Amazon and leading AI
startups available through an API, so you can choose from various FMs to find the model that's best
suited for your use case.

Enable this integration to see all your Bedrock metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][2] first.

### Metric collection

1. In the [AWS integration page][3], ensure that `Bedrock` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Bedrock integration][4].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_bedrock" >}}


### Events

The Amazon Bedrock integration does not include any events.

### Service Checks

The Amazon Bedrock integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Amazon Bedrock with Datadog][7]

[1]: https://aws.amazon.com/what-is/foundation-models/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-bedrock
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_bedrock/metadata.csv
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/

