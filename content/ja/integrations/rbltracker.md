---
"app_id": "rbltracker"
"app_uuid": "4b512bd9-ca9d-4d6a-b4f2-5fec54ce75bc"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": "metadata.csv"
      "prefix": "rbltracker."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10007"
    "source_type_name": "RBLTracker"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "RBL Tracker"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "security"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rbltracker/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rbltracker"
"integration_id": "rbltracker"
"integration_title": "RBLTracker"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rbltracker"
"public_title": "RBLTracker"
"short_description": "RBLTracker provides easy-to-use, real-time blacklist monitoring."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Security"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "RBLTracker provides easy-to-use, real-time blacklist monitoring."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "RBLTracker"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

RBLTracker provides easy-to-use, real-time blacklist monitoring, for your email, website, and social media.

Connect your [RBLTracker][1] account to Datadog to:

- Push listing events from RBLTracker to your dashboard.
- Push de-listing events from RBLTracker to your dashboard.

## セットアップ

Setting up RBLTracker using webhooks:

1. In Datadog, [copy your API key][2] from the **Integrations -> APIs** section.
2. In [RBLTracker][1], create a new Datadog contact type from the **Manage -> Contacts** section of the RBLTracker portal.
3. Paste the Datadog **API Key**.
4. (optional) adjust the contact schedule for this new contact.

RBLTracker sends listing and delisting alerts to your Datadog events dashboard. See [Adding a Datadog Contact Type][3] for a full integration guide.

## 収集データ

### メトリクス

The RBLTracker check does not include any metrics.

### イベント

Push your RBLTracker listing/de-listing events into your [Datadog Event Stream][4].

### サービスチェック

The RBLTracker check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://rbltracker.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://rbltracker.com/docs/adding-a-datadog-contact-type
[4]: https://docs.datadoghq.com/events/
[5]: https://docs.datadoghq.com/help/

