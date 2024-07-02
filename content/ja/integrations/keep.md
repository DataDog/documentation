---
"app_id": "keep"
"app_uuid": "40ac95c0-35bd-49c8-a5f0-b21037bc87b4"
"assets":
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://www.keephq.dev"
  "name": Keep
  "sales_email": founders@keephq.dev
  "support_email": tal@keephq.dev
"categories":
- alerting
- developer tools
- incidents
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/keep/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "keep"
"integration_id": "keep"
"integration_title": "Keep"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "keep"
"public_title": "Keep"
"short_description": "Send monitor metrics from Keep's AIOps platform into Datadog"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Developer Tools"
  - "Category::Incidents"
  - "Queried Data Type::Metrics"
  - "Queried Data Type::Logs"
  - "Queried Data Type::Events"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Send monitor metrics from Keep's AIOps platform into Datadog
  "media":
  - "caption": A short product tour to Keep
    "image_url": images/alerts-page.png
    "media_type": video
    "vimeo_id": !!int "906118097"
  - "caption": Keep's alerts page
    "image_url": images/alerts-page.png
    "media_type": image
  - "caption": Keep's noise-reduction rules builder page
    "image_url": images/alert-rules.png
    "media_type": image
  - "caption": Keep's workflows viewer
    "image_url": images/workflows.png
    "media_type": image
  - "caption": Keep's workflow builder page
    "image_url": images/workflow-builder.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Keep
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Keep][1] is an open source AIOps alert management and automation platform, which offers capabilities for consolidating, automating, and reducing noise across various parts of your observability stack. With this integration, you can harness the strength of both platforms, providing a unified and efficient approach to alert management and event correlation.

Keep uses Datadog's monitors, logs, and events data to correlate alerts and reduce noise.

Key features of this integration include:

- Centralized Alert Management: Consolidate all your Datadog alerts into Keep's single pane of glass, offering streamlined control and visibility.
- Reduced Alert Noise: Minimize alert fatigue by filtering and prioritizing Datadog alerts, ensuring your team addresses the most critical alerts promptly.
- Comprehensive Analysis: Leverage Keep's analytical tools to derive insights from Datadog alerts, aiding in proactive decision-making and trend analysis.

This integration is ideal for teams seeking to enhance their alert capabilities, improve operational efficiency, and make data-driven decisions with **reduced noise and distraction**.

For more information, see the [official Keep documentation][2].



## セットアップ

### インストール

Use the [integration tile][3] on your Datadog account to install the Keep integration with [OAuth2][4].

To set up the Keep integration:

1. Click on the Keep integration tile and select **Install Integration**.
2. Users are redirected to Keep's platform to sign into their Keep account.
3. Users are redirected back to Datadog to review and confirm the required scopes from their Datadog account.
4. Once confirmed, users are redirected back to the Keep platform to see whether installation was successfully completed.

Once installed successfully, Keep automatically creates a new `Webhook` integration in Datadog, and modifies your monitors to send alerts.

## Uninstallation

- Once this integration has been uninstalled, any previous authorizations are revoked. 
- Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys page][5].
- Confirm that the `Webhooks` integration does not contain `keep-datadog-webhook-integration-UUID` on the [Integrations page][6].

### Validation

To validate that the Keep integration is properly working, follow the next steps:
1. Navigate to the [Webhook Integration page][6].
2. In the installed `Webhooks` list, look for a `Webhook` that starts with `keep-datadog-webhook-integration-UUID`.

## 収集データ

### メトリクス

The Keep integration does not include any metrics.

### サービスチェック

The Keep integration does not include any service checks.

### イベント

The Keep integration does not include any events.

## トラブルシューティング

Need help? Contact [Keep's Support team][7].

[1]: https://www.keephq.dev/
[2]: https://docs.keephq.dev/providers/documentation/datadog-provider
[3]: https://app.datadoghq.com/integrations/keephq
[4]: /developers/authorization/oauth2_in_datadog/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/integrations/webhooks
[7]: mailto:rnd@keephq.dev?subject=[Datadog]%20OAuth%20Integration%20Support

