---
"app_id": "datadog-cluster-agent"
"app_uuid": "b6c2b71b-38c9-4769-86ad-516953849236"
"assets":
  "dashboards":
    "Datadog Cluster Agent - Overview": assets/dashboards/datadog_cluster_agent_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": datadog.cluster_agent.api_requests
      "metadata_path": metadata.csv
      "prefix": datadog.cluster_agent.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10108"
    "source_type_name": Datadog Cluster Agent
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "datadog_cluster_agent"
"integration_id": "datadog-cluster-agent"
"integration_title": "Datadog Cluster Agent"
"integration_version": "3.1.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "datadog_cluster_agent"
"public_title": "Datadog Cluster Agent"
"short_description": "Tracks metrics of the Datadog Cluster Agent"
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
  - "Category::Containers"
  "configuration": "README.md#Setup"
  "description": Tracks metrics of the Datadog Cluster Agent
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Datadog Cluster Agent
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors the [Datadog Cluster Agent][1] through the Datadog Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

The Datadog-Cluster-Agent check is included in the [Datadog Agent][2] package.
No additional installation is needed on your server.

### 構成

1. Edit the `datadog_cluster_agent.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your datadog_cluster_agent performance data. See the [sample datadog_cluster_agent.d/conf.yaml][3] for all available configuration options.

2. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][5] and look for `datadog_cluster_agent` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "datadog_cluster_agent" >}}


### イベント

The Datadog-Cluster-Agent integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "datadog_cluster_agent" >}}


## トラブルシューティング

Need help? Contact [Datadog support][8].


[1]: https://docs.datadoghq.com/agent/cluster_agent/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/assets/service_checks.json
[8]: https://docs.datadoghq.com/help/

