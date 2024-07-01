---
"app_id": "iam-access-analyzer"
"app_uuid": "13a88901-3d20-43b3-9a3c-3b20b2adf1cc"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": iam_access_analyzer.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10081"
    "source_type_name": AWS IAM Access Analyzer
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/iam_access_analyzer/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "iam_access_analyzer"
"integration_id": "iam-access-analyzer"
"integration_title": "AWS IAM Access Analyzer"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "iam_access_analyzer"
"public_title": "AWS IAM Access Analyzer"
"short_description": "AWS IAM Access Analyzer identifies publicly accessible resources"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": AWS IAM Access Analyzer identifies publicly accessible resources
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": AWS IAM Access Analyzer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Use AWS Identity and Access Management (IAM) Access Analyzer across your Amazon account to continuously analyze IAM permissions granted with any of your account policies. Datadog integrates with Amazon IAM Access Analyzer using a Lambda function that ships its findings as logs to Datadog.

## Setup

### Log collection

1. If you haven't already, set up the [Datadog Forwarder][1] Lambda function.

2. Create a new rule with type `Rule with an event pattern` in AWS EventBridge.

3. For the event source configuration, select `Other`. For `Creation method`, select `Custom pattern (JSON editor)`. For `Event pattern`, copy and paste the following JSON:

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. Select `AWS service` to use as the target type. Select `Lambda function` as the target and select the Datadog Forwarder Lambda or enter the ARN.

5. Save your rule.

6. Once the AWS Access Analyzer runs and produces findings, the events will be picked up by the Datadog Lambda Forwarder tagged with `source:access-analyzer`. See the [Log Explorer][2] to start exploring your logs.

## Data Collected

### Metrics

This integration does not include any metrics.

### Service Checks

This integration does not include any service checks.

### Logs

This integration can be configured to send logs.

### Events

This integration does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: /logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs?query=source%3Aaccess-analyzer
[3]: https://docs.datadoghq.com/help

