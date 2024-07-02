---
"app_id": "unitq"
"app_uuid": "7781542f-b4a2-40e2-86cd-9987980a0ead"
"assets":
  "dashboards":
    "unitQ": assets/dashboards/unitq_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": unitq.user_feedback
      "metadata_path": metadata.csv
      "prefix": unitq.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10303"
    "source_type_name": unitQ
"author":
  "homepage": "https://www.unitq.com/"
  "name": unitQ
  "sales_email": hello@unitq.com
  "support_email": hello@unitq.com
"categories":
- metrics
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/unitq/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "unitq"
"integration_id": "unitq"
"integration_title": "unitQ"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "unitq"
"public_title": "unitQ"
"short_description": "Harness the power of user feedback to improve product quality."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Harness the power of user feedback to improve product quality.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": unitQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

unitQ is your consolidated, searchable platform for user feedback. Our AI technology extracts data-driven insights from what users are saying to help you increase product quality.

The unitQ Datadog integration allows you to forward metrics from unitQ to Datadog. By delivering unitQ metrics to Datadog, users can leverage Datadog's graphing and alerting capabilities to track user feedback - ensuring a happy customer base.

## セットアップ

### 構成

1. In unitQ, go to **Integrations**.
2. Select the Datadog tile
3. Fill in the following details:
   - **Datadog Site**:
     - Enter `https://api.datadoghq.com` if you use the Datadog US region.
     - Enter `https://api.datadoghq.eu` if you use the Datadog EU region.
   - **API Key**: Enter your [Datadog API key][1].

## 収集データ

### メトリクス
{{< get-metrics-from-git "unitq" >}}


### サービスチェック

unitQ does not include any service checks.

### イベント

unitQ does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://github.com/DataDog/integrations-extras/blob/master/unitq/metadata.csv
[3]: https://docs.datadoghq.com/help/

