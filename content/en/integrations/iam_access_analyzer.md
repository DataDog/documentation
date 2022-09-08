---
"app_id": "iam-access-analyzer"
"app_uuid": "13a88901-3d20-43b3-9a3c-3b20b2adf1cc"
"assets":
  "integration":
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": "metadata.csv"
      "prefix": "iam_access_analyzer."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "AWS IAM Access Analyzer"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "security"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/iam_access_analyzer/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "iam_access_analyzer"
"integration_id": "iam-access-analyzer"
"integration_title": "AWS IAM Access Analyzer"
"integration_version": ""
"is_public": true
"kind": "integration"
"manifest_version": "2.0.0"
"name": "iam_access_analyzer"
"oauth": {}
"public_title": "AWS IAM Access Analyzer"
"short_description": "AWS IAM Access Analyzer identifies publicly accessible resources"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "AWS IAM Access Analyzer identifies publicly accessible resources"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "AWS IAM Access Analyzer"
---



## Overview

Use AWS Identity and Access Management (IAM) Access Analyzer across your Amazon account to continuously analyze IAM permissions granted with any of your account policies. Datadog integrates with Amazon IAM Access Analyzer using a Lambda function that ships its logs to Datadog.

## Setup

### Log collection

1. If you haven't already, set up the [Datadog Forwarder][1] Lambda function.

2. Create a new rule in AWS EventBridge.

3. Define a custom event pattern with the following:

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. Select an event bus and define the Datadog Lambda function as the target.

5. Save your rule.

6. See the [Log Explorer][2] to start exploring your logs.

## Data Collected

### Metrics

This integration does not not collect metrics 

### Service Checks

This integration does not include any service checks.

### Logs

This integration can be configured to send Logs.

### Events

This integration does not send events

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: /logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: https://docs.datadoghq.com/help

