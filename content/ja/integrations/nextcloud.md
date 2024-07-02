---
"app_id": "nextcloud"
"app_uuid": "a48ccc77-3e72-4e3b-b439-3ebe7e2688b7"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": nextcloud.server.database.size
      "metadata_path": metadata.csv
      "prefix": nextcloud.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10214"
    "source_type_name": Nextcloud
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": emeric.planet@gmail.com
  "support_email": emeric.planet@gmail.com
"categories":
- collaboration
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nextcloud"
"integration_id": "nextcloud"
"integration_title": "Nextcloud"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "nextcloud"
"public_title": "Nextcloud"
"short_description": "Track overall statistics from your Nextcloud instance"
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
  - "Category::Collaboration"
  "configuration": "README.md#Setup"
  "description": Track overall statistics from your Nextcloud instance
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Nextcloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Nextcloud][1].

## セットアップ

The Nextcloud check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Nextcloud check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-nextcloud==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `nextcloud.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5] to start collecting your Nextcloud [metrics](#metrics). See the [sample nextcloud.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7]

### Validation

Run the [Agent's status subcommand][8] and look for `nextcloud` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "nextcloud" >}}


### イベント

Nextcloud does not include any events.

### サービスチェック
{{< get-service-checks-from-git "nextcloud" >}}


## トラブルシューティング

Need help? Contact [Datadog support][11].


[1]: https://nextcloud.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

