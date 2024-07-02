---
"app_id": "papertrail"
"app_uuid": "630c6ff6-e853-4ef7-8be4-371a55269208"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "147"
    "source_type_name": "PaperTrail"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "event management"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "papertrail"
"integration_id": "papertrail"
"integration_title": "Papertrail"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "papertrail"
"public_title": "Papertrail"
"short_description": "View, search on, and discuss Papertrail logs in your Datadog event stream."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Event Management"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": "View, search on, and discuss Papertrail logs in your Datadog event stream."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Papertrail"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/papertrail/papertrailexample.png" alt="Papertrail example" popup="true">}}

## Overview

Use Papertrail and Datadog to:

- Turn freeform log data into actionable metrics.
- Avoid silo-ed operational knowledge. See and correlate log-derived metrics alongside app- and system-level metrics.

## セットアップ

### インストール

To capture metrics from Papertrail:

1. In Papertrail's [event viewer][1], save a search for the log event(s) which should be graphed.
2. Enter the name for the search and click the **Save & Setup an Alert** button.
3. Choose Datadog under Graphing & Metrics.
    {{< img src="integrations/papertrail/papertrailnotify.png" style="max-width:500px;" alt="Papertrail notifications" popup="true">}}

4. Choose your alert frequency and other details.
5. Provide your Datadog API key, enter what you want to name your metric, and optionally enter some tags to associate with the metric.
    {{< img src="integrations/papertrail/papertraildetails.png" style="max-width:500px;" alt="Papertrail notifications" popup="true">}}

6. Click the **Create Alert** button.

Papertrail updates Datadog at your chosen interval.

### 構成

No configuration steps are required for this integration.

## 収集データ

### メトリクス

The Papertrail integration does not include any metrics.

### イベント

The Papertrail integration does not include any events.

### サービスチェック

The Papertrail integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][2].

[1]: https://papertrailapp.com/events
[2]: https://docs.datadoghq.com/help/

