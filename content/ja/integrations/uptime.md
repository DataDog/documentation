---
"app_id": "uptime"
"app_uuid": "937f96ea-644f-4903-9f74-cdc5e8b46dd8"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": "uptime.response_time"
      "metadata_path": "metadata.csv"
      "prefix": "uptime"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10001"
    "source_type_name": "Uptime"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Uptime"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "notifications"
- "metrics"
- "event management"
- "os & system"
- "testing"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/uptime/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "uptime"
"integration_id": "uptime"
"integration_title": "Uptime.com"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "uptime"
"public_title": "Uptime.com"
"short_description": "Uptime & performance monitoring made easy"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Notifications"
  - "Category::Metrics"
  - "Category::Event Management"
  - "Category::OS & System"
  - "Category::Testing"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Uptime & performance monitoring made easy"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Uptime.com"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get events and metrics from your app in real time to:

- Track and notify of any downtime or interruptions.
- Visualize response time metrics from synthetic requests.

![Uptime.com Graph][1]

## セットアップ

### 構成

To activate the Datadog integration within your Uptime account, go to [Notifications > Integrations][2] then choose Datadog as the provider type when adding a new push notifications profile.

The following describes the fields shown when configuring Datadog within your Uptime account:
shell
- Name: The reference name you desire to assign to your Datadog profile. It can assist you with organizing multiple provider profiles within your Uptime account.

- API key: <span class="hidden-api-key">\${api_key}</span>

- Application Key: <span class="app_key" data-name="uptime"></span>

After configuring your Datadog profile, assign the profile to a contact group located under _Alerting > Contacts_. The profile is assigned in the **Push Notifications** field within the contact group.

## 収集データ

### メトリクス
{{< get-metrics-from-git "uptime" >}}


### イベント

The Uptime integration sends an event to your Datadog Event Stream when an alert happens or resolves.

### サービスチェック

The Uptime check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptime/images/snapshot.png
[2]: https://uptime.com/integrations/manage/
[3]: https://github.com/DataDog/integrations-extras/blob/master/uptime/metadata.csv
[4]: https://docs.datadoghq.com/help/

