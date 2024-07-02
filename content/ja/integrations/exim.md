---
"app_id": "exim"
"app_uuid": "c84e4868-f96b-49b6-8243-2031dde179af"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": exim.queue.count
      "metadata_path": metadata.csv
      "prefix": exim.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10291"
    "source_type_name": exim
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": JeanFred1@gmail.com
  "support_email": JeanFred1@gmail.com
"categories": []
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/exim/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "exim"
"integration_id": "exim"
"integration_title": "Exim"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "exim"
"public_title": "Exim"
"short_description": "Exim integration to monitor mail queues"
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
  "configuration": "README.md#Setup"
  "description": Exim integration to monitor mail queues
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Exim
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Exim][1] through the Datadog Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the exim check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-exim==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `exim.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your exim performance data. See the [sample exim.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `exim` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "exim" >}}


### イベント

The Exim integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "exim" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://www.exim.org/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/exim/datadog_checks/exim/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/exim/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/exim/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

