---
"app_id": "configcat"
"app_uuid": "22b2d616-b246-457e-8883-a79bee8c467d"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": configcat.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10094"
    "source_type_name": ConfigCat
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": ConfigCat
  "sales_email": developer@configcat.com
  "support_email": developer@configcat.com
"categories":
- configuration & deployment
- notifications
- provisioning
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/configcat/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "configcat"
"integration_id": "configcat"
"integration_title": "ConfigCat"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "configcat"
"public_title": "ConfigCat"
"short_description": "Setting change events tracked by Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Notifications"
  - "Category::Provisioning"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Setting change events tracked by Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": ConfigCat
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Manage features and change your software configuration using [ConfigCat feature flags][1], without the need to re-deploy code. A [10 minute trainable Dashboard][2] allows even non-technical team members to manage features directly. Deploy anytime, release when confident. Target a specific group of users first with new ideas. Supports A/B/n testing and soft launching. Provides [open-source SDKs][3] for easy integration with any web, mobile or backend application.

This integration ensures that every setting change in ConfigCat is sent to Datadog as an Event.

*Example:*
![DatadogEvent][4]

## セットアップ

1. Have a [Datadog subscription][5].
2. Get a [Datadog API Key][6].
    ![DatadogEvent][7] 
4. Open the [integrations tab][8] on ConfigCat Dashboard.
5. Click on Datadog's _CONNECT_ button and set your Datadog API key.
6. You're all set. Go ahead and make some changes on your feature flags then check your Events in Datadog.


### Un-installation

1. Open the [integrations tab][8] on ConfigCat Dashboard.
2. Click on Datadog's DISCONNECT button and set your Datadog API key.

## 収集データ

### メトリクス

ConfigCat integration does not include any metrics.

### イベント

All ConfigCat related events collected appear within the Datadog Event Stream with the `source:configcat` property are tagged with your product, config and environment names.

For example here is how to search for events that happened in the production environment: `source:configcat production`:

![Filtering][9]

### サービスチェック

ConfigCat integration does not include any service checks.

## トラブルシューティング

Need help? See the [ConfigCat documentation][10] or contact [ConfigCat support][11].

[1]: https://configcat.com
[2]: https://app.configcat.com
[3]: https://github.com/configcat
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_event.png
[5]: https://www.datadoghq.com
[6]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_apikey.png
[8]: https://app.configcat.com/product/integrations
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_filtering.png
[10]: https://configcat.com/docs/integrations/datadog/
[11]: https://configcat.com/support

