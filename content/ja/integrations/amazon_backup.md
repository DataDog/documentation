---
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS Backup metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_backup/"
"draft": false
"git_integration_title": "amazon_backup"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Backup"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_backup"
"public_title": "Datadog-AWS Backup Integration"
"short_description": "Track key AWS Backup metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Backup enables you to centralize and automate data protection across AWS
services and hybrid workloads.

Enable this integration to see your Backup metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `Backup` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Backup integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_backup" >}}


### Events

The AWS Backup integration does not include any events.

### Service Checks

The AWS Backup integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-backup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_backup/amazon_backup_metadata.csv
[5]: https://docs.datadoghq.com/help/

