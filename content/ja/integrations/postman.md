---
"app_id": "postman"
"app_uuid": "9ba70e31-8e84-4d6b-84a1-95d6ba713df9"
"assets":
  "dashboards":
    "Postman API Dashboard": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": postman.monitor.run.total_latency
      "metadata_path": metadata.csv
      "prefix": postman
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10162"
    "source_type_name": Postman
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Postman
  "sales_email": integrations-partnerships@postman.com
  "support_email": integrations-partnerships@postman.com
"categories": []
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/postman/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "postman"
"integration_id": "postman"
"integration_title": "Postman"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "postman"
"public_title": "Postman"
"short_description": "Analyze metrics and generate events in Datadog from Postman Monitoring runs."
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
  "configuration": "README.md#Setup"
  "description": Analyze metrics and generate events in Datadog from Postman Monitoring runs.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Postman
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Postman][1] is an API platform that simplifies the steps of building an API and streamlines 
collaboration so you can create better APIs-faster.

This integration helps you stay on top of your monitors' health. It enables you to:

- Analyze the metrics of Postman Monitoring runs in Datadog

- Generate events for successful and failed monitoring runs.

## セットアップ

You can find detailed instructions in [Postman's documentation][2]. Postman Integrations require a Postman [Team, Business, or Enterprise plan][3].

### 構成

1. Generate a Datadog [API key][4].
2. Sign in to your Postman account and navigate to the [Datadog integration][5].
3. Select "Add Integration."
4. To send your monitor metrics and events to Datadog:
   - Name your new integration.
   - Select the monitor whose data you would like to send to Datadog.
   - Enter your Datadog API key.
   - Select the Datadog region you would like to use.
   - Optionally choose if you want to send events, metrics or both for each run.
5. Then select "Add Integration" to finish setting up the integration.

![Configure Integration][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "postman" >}}


### サービスチェック

Postman does not include any service checks.

### イベント

An event is generated each time a monitor runs in Postman. The severity of the event is based on the tests in the Postman monitor:

| Severity | Description                                                           |
|----------|-----------------------------------------------------------------------|
| `Low`    | If all the tests pass                                                 |
| `Normal` | If some tests fail, or an error occurs in the execution of any event. |

## トラブルシューティング

Need help? Contact [Postman Support][8].

[1]: https://www.postman.com/
[2]: https://learning.postman.com/docs/integrations/available-integrations/datadog/
[3]: https://www.postman.com/pricing/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://go.postman.co/integrations/service/datadog
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/postman/images/add-integration-datadog.jpeg
[7]: https://github.com/DataDog/integrations-extras/blob/master/postman/metadata.csv
[8]: https://www.postman.com/support/

