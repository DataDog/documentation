---
"app_id": "botprise"
"app_uuid": "91806afb-9bd7-4ab2-91e4-7c7f2d05780f"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": botprise.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10113"
    "source_type_name": botprise
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Botprise
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- alerting
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "botprise"
"integration_id": "botprise"
"integration_title": "Botprise"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "botprise"
"public_title": "Botprise"
"short_description": "Botprise integration to monitor generated events"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Botprise integration to monitor generated events
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Botprise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Botprise's Datadog integration allows you to send generated [Botprise][1] events to Datadog using webhook. It helps to monitor your applications and to ensure Botprise is working as expected.

![image-datadog-botprise-events][2]

## セットアップ

To use the Botprise-Datadog integration, you must be a customer of Botprise. For more information about Botprise, see [https://www.botprise.com/][1].

### インストール


### 構成
1. Install the Datadog Agent on your lab devices.
2. After successful installation, your devices start sending data to Datadog. View the data on the [Datadog host list][3].
3. In Datadog, create a monitor for each of the hosts. Datadog generates alerts based on the monitor rules.
4. Configure each monitor for [metrics][4] and the respective threshold value.
5. Modify the monitor configuration to create a [ServiceNow][5] ticket for each of the incoming alerts.
6. Generate an [API key and an Application key][6] to call Datadog Rest APIs.


## 収集データ

### メトリクス

The Botprise integration does not provide metrics.

### サービスチェック

The Botprise integration does not include any service checks.

### イベント

All events are sent to the Datadog event stream.

### 構成
To use the Datadog API, you need to enter an [API key and an application key][6].

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://www.botprise.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/botprise/images/datadog-botprise-events.png
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/metrics/
[5]: https://developer.servicenow.com/dev.do#!/home
[6]: https://docs.datadoghq.com/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/help/

