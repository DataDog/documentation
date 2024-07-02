---
"app_id": "sendgrid"
"app_uuid": "828968b6-254c-4c82-8736-998004d6e607"
"assets":
  "dashboards":
    "Sendgrid-Overview": assets/dashboards/Sendgrid-Overview_dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": sendgrid.emails.requests
      "metadata_path": metadata.csv
      "prefix": sendgrid.emails.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "620"
    "source_type_name": SendGrid
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- モニター
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "sendgrid"
"integration_id": "sendgrid"
"integration_title": "SendGrid"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sendgrid"
"public_title": "SendGrid"
"short_description": "Collect metrics for Sendgrid."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Metrics"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Collect metrics for Sendgrid.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": SendGrid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/sendgrid/sendgrid_dashboard_overview.png" alt="The Sendgrid dashboard in Datadog" popup="true">}}

## Overview

Twilio SendGrid is an email platform that businesses use for sending transactional and marketing email. Use this integration to collect your SendGrid email delivery and engagement metrics and logs.

## セットアップ

### Generate SendGrid API Key

1. Login to your [SendGrid account][1].
2. Open the **Settings** dropdown.
3. Click **API Keys**.
4. Click **Create API Key** at the top right.
5. Fill out the _API Key Name_. Select **Full Access** or, for restricted access, **Stats** - **Read Access** and **User Account** - **Read Access**.
6. Copy the API Key to somewhere secure. The API key will be needed when you set up the SendGrid Integration on Datadog's user interface.

### 構成

#### Send metrics

1. Navigate to the configuration tab inside the Datadog [SendGrid integration tile][2].
2. Enter a unique identifying name for the SendGrid account in Datadog.
3. Paste in the API Key that was generated in the steps above.
4. Optionally, add custom tags to associate tags with all metrics collected for this integration.

#### Send Logs

1. Copy the generated URL inside the Datadog [SendGrid integration tile][2].
2. Go to your [SendGrid account][1].
3. Open the **Settings** dropdown.
4. Click **Mail Settings**.
5. Click **Edit** on the **Event Webhook** setting.
6. Paste in the generated URL in step 1 to the **HTTP Post URL**.
7. Leave **Authorization Method** set to _None_.
8. Select what delivery and engagement events you'd like to receive.
9. Enable the **Event Webhook Status**.
10. Click **Save**.

## 収集データ

### メトリクス
{{< get-metrics-from-git "sendgrid" >}}


### Logs

Sendgrid delivery and engagement events will show up as logs under the source `sendgrid`.

### イベント

The SendGrid integration does not include any events.

### サービスチェック

The SendGrid integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://app.sendgrid.com/
[2]: https://app.datadoghq.com/account/settings#integrations/sendgrid
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/sendgrid/metadata.csv
[4]: https://docs.datadoghq.com/help

