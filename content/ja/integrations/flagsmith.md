---
"app_id": "flagsmith"
"app_uuid": "0ad66873-2958-4ca5-ae25-ee893b4c6e31"
"assets":
  "dashboards":
    "Flagsmith Dashboard": assets/dashboards/flagsmith-dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": flagsmith.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10137"
    "source_type_name": Flagsmith
"author":
  "homepage": "https://flagsmith.com/"
  "name": Flagsmith
  "sales_email": support@flagsmith.com
  "support_email": support@flagsmith.com
"categories":
- issue tracking
- developer tools
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "flagsmith"
"integration_id": "flagsmith"
"integration_title": "Flagsmith"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "flagsmith"
"public_title": "Flagsmith"
"short_description": "Flag change events in Flagsmith appear in Datadog"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Issue Tracking"
  - "Category::Developer Tools"
  - "Offering::UI Extension"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Flag change events in Flagsmith appear in Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Flagsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Flagsmith][1] facilitates feature management across web, mobile, and server side applications. The Datadog Flagsmith integration enables you to view information about flag changes directly within Datadog.

Flagsmith provides the following integrations with Datadog:

### Events integration

All flag change events are sent to Datadog. These events are tagged with the environment they were changed in.

### Dashboard widget

Flagsmith's dashboard widget lets you view your Flagsmith Flags and Audit Logs directly in Datadog.

## セットアップ

In the [Flagsmith Dashboard][2], select the Integrations Menu and then add the Datadog Integration. Enter your [Datadog API Key][3]. For Base URL, enter `https://api.datadoghq.com` if you are using the US Datadog site, or `https://api.datadoghq.eu` if you are using the EU Datadog site.

### Flagsmith Dashboard widget

1. On the [Flagsmith integration tile][4], make sure the integration is installed.
1. Make sure you are logged into Flagsmith with the account you want to see in Datadog.
1. In Datadog, navigate to an existing dashboard or create a new one.
1. Press the **Add Widgets** button to expose the widget drawer.
1. Search for **Flagsmith** to find the Flagsmith widget in the **Apps** section of the widget drawer.
1. Select the **Flagsmith widget icon** to add it your your dashboard and open the **Flagsmith editor** modal. You can choose to add either the Flag or Audit log viewer widget.
1. Select the Flagsmith Organisation, Project and Environment you want to add to your dashboard.
1. Once selected, copy and paste the **Project ID** and **Environment ID** into Datadog.
1. Select the page size and, optionally, a widget title and Flagsmith Tag to filter on.
1. Click **Save** to finish configuring the dashboard widget.

## 収集データ

### メトリクス

The Flagsmith integration does not include any metrics.

### サービスチェック

The Flagsmith integration does not include any service checks.

### イベント

All Flagsmith events are sent to the Datadog event stream.

## トラブルシューティング

Need help? See the [Flagsmith documentation][5] or contact [Datadog Support][6].

[1]: https://www.flagsmith.com/
[2]: https://app.flagsmith.com/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/integrations/flagsmith
[5]: https://docs.flagsmith.com/integrations/datadog/
[6]: https://docs.datadoghq.com/help/

