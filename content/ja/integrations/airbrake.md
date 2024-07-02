---
"app_id": "airbrake"
"app_uuid": "9628996b-82c1-4920-a0c5-c5f32dabd4cf"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "metrics":
      "check":
      - "airbrake.exception_rate"
      "metadata_path": "metadata.csv"
      "prefix": "airbrake."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "34"
    "source_type_name": "Airbrake"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "metrics"
- "event management"
- "issue tracking"
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "airbrake"
"integration_id": "airbrake"
"integration_title": "Airbrake"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "airbrake"
"public_title": "Airbrake"
"short_description": "View, search on, and discuss Airbrake exceptions in your event stream."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Event Management"
  - "Category::Issue Tracking"
  "configuration": "README.md#Setup"
  "description": "View, search on, and discuss Airbrake exceptions in your event stream."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Airbrake"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Connect Airbrake to Datadog to:

- See exceptions in real time as [Events][1] in Datadog.
- Search for exceptions in your graphs.
- Discuss exceptions with your team.

{{< img src="integrations/airbrake/airbrakeevent.png" alt="airbrake" popup="true">}}

## セットアップ

### 構成

Set up Airbrake integration using webhooks:

1. Go to the Settings page in your Airbrake account.

2. For each project you want to enable, click **Integrations**.

3. Click **WebHooks** and enter this URL in the **URL** field:

    ```text
    https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
    ```

4. Click **Save**.

Go to the [Events Explorer][2] to see new errors from Airbrake.

## 収集データ

### メトリクス
{{< get-metrics-from-git "airbrake" >}}


### イベント

The Airbrake integration shows errors from Airbrake as events.

### サービスチェック

The Airbrake integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://docs.datadoghq.com/events/
[2]: https://app.datadoghq.com/event/explorer
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/airbrake/metadata.csv
[4]: https://docs.datadoghq.com/help/

