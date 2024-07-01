---
"app_id": "amazon-globalaccelerator"
"app_uuid": "344106fe-9dc6-4ca5-a386-6811332f174c"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - aws.globalaccelerator.processed_bytes_in
      "metadata_path": metadata.csv
      "prefix": aws.globalaccelerator.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10431"
    "source_type_name": Amazon GlobalAccelerator
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- metrics
- cloud
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_globalaccelerator"
"integration_id": "amazon-globalaccelerator"
"integration_title": "Amazon Global Accelerator"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_globalaccelerator"
"public_title": "Amazon Global Accelerator"
"short_description": "Global Accelerator uses accelerators to improve performance of applications."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Global Accelerator uses accelerators to improve performance of applications.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Amazon Global Accelerator
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

AWS Global Accelerator is a service in which you create accelerators to improve the performance of your applications for local and global users.

Enable this integration to see all your Global Accelerator metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that Global Accelerator is enabled under the **Metric Collection** tab.
2. Install the [Datadog - Amazon Global Accelerator integration][3].


## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_globalaccelerator" >}}


### Service Checks

Amazon Global Accelerator does not include any service checks.

### Events

Amazon Global Accelerator does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-globalaccelerator
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_globalaccelerator/metadata.csv
[5]: https://docs.datadoghq.com/help/

