---
"app_id": "amazon-codewhisperer"
"app_uuid": "63669bbe-096f-4391-9654-bc0cae65fc73"
"assets":
  "dashboards":
    "amazon-codewhisperer": assets/dashboards/amazon_codewhisperer_overview.json
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - aws.codewhisperer.invocations
      "metadata_path": metadata.csv
      "prefix": aws.codewhisperer.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "369"
    "source_type_name": Amazon CodeWhisperer
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
- developer tools
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_codewhisperer"
"integration_id": "amazon-codewhisperer"
"integration_title": "Amazon CodeWhisperer"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_codewhisperer"
"public_title": "Amazon CodeWhisperer"
"short_description": "Amazon CodeWhisperer is an ML-powered code recommendation service."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  - "Category::AI/ML"
  - "Category::Developer Tools"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Amazon CodeWhisperer is an ML-powered code recommendation service.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Amazon CodeWhisperer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon CodeWhisperer is a machine learning–powered service that helps improve developer productivity by generating code recommendations based on their comments in natural language and code in the integrated development environment (IDE).

Enable this integration to see all your CodeWhisperer metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `CodeWhisperer` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon CodeWhisperer integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_codewhisperer" >}}


### Events

The Amazon CodeWhisperer integration does not include any events.

### Service Checks

The Amazon CodeWhisperer integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-codewhisperer
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_codewhisperer/metadata.csv
[5]: https://docs.datadoghq.com/help/

