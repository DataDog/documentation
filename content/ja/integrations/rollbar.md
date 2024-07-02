---
"app_id": "rollbar"
"app_uuid": "63175032-65a1-4bc8-82da-251a27005f1f"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "137"
    "source_type_name": "Rollbar"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "issue tracking"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rollbar"
"integration_id": "rollbar"
"integration_title": "Rollbar"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rollbar"
"public_title": "Rollbar"
"short_description": "Send exceptions, errors, and code deployments to your Datadog event stream."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Issue Tracking"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": "Send exceptions, errors, and code deployments to your Datadog event stream."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Rollbar"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/rollbar/rollbar_error.png" alt="Rollbar error event" popup="true">}}

## Overview

Rollbar helps developers build better software, faster. With Rollbar developers can view exceptions from all of of their frameworks, platforms, and environments in one place.

Connect Rollbar to Datadog to:

- Get notified of exceptions, errors, and code deployments in the Events Explorer.
- Filter notifications by severity, environment, host, users, and more.
- Search for exceptions in your graphs.
- Discuss exceptions with your team.
- Spend less time debugging issues.

## セットアップ

### インストール

1. Navigate to the [Rollbar integration tile][1] and click **Install Integration**.
2. From the integration tile, click to choose an existing API key or create a new one for this integration.

### 構成

Configuration is per-project in Rollbar.

1. In Rollbar, navigate to your Projects page.
2. Click the plus button **\[ + \]** to add an integration to your project.

   {{< img src="/integrations/rollover/rollover_project.png" alt="Rollbar project page" style="width:100%" >}}

3. Choose Datadog from the list.
4. Copy your API Key from your Rollbar integration tile in Datadog and paste it into the API Key box in Rollbar.

At this point, click the **Send Test Notification** button to ensure things are configured properly. After clicking this, you should see an event from Rollbar in the [Events Explorer][2].

## 収集データ

### メトリクス

The Rollbar integration does not include any metric.

### イベント

The Rollbar integration pushes exceptions, errors, and code deployments into Datadog as events.

### サービスチェック

The Rollbar integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://app.datadoghq.com/account/settings#integrations/rollbar
[2]: https://app.datadoghq.com/event/explorer
[3]: https://docs.datadoghq.com/help/

