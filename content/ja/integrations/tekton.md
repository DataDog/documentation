---
"app_id": "tekton"
"app_uuid": "4e8f129e-1c9b-4078-a966-f0099dbf9465"
"assets":
  "dashboards":
    "Tekton Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - tekton.pipelines_controller.go.alloc
      - tekton.triggers_controller.go.alloc
      "metadata_path": metadata.csv
      "prefix": tekton.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "5667413"
    "source_type_name": Tekton
  "monitors":
    "[Tekton] High number of throttled TaskRuns": assets/monitors/throttled_taskruns.json
    "[Tekton] Increasing number of failed PieplineRuns": assets/monitors/increasing_failed_pipelineruns.json
    "[Tekton] Increasing number of failed TaskRuns": assets/monitors/increasing_failed_taskruns.json
  "saved_views":
    "tekton_errors": assets/saved_views/tekton_errors.json
    "tekton_overview": assets/saved_views/tekton_overview.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com (日本語対応)
  "support_email": help@datadoghq.com
"categories":
- ログの収集
- 開発ツール
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/tekton/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tekton"
"integration_id": "tekton"
"integration_title": "Tekton"
"integration_version": "1.0.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "tekton"
"public_title": "Tekton"
"short_description": "Track all your Tekton metrics with Datadog."
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
  - "Category::Log Collection"
  - "Category::Developer Tools"
  "configuration": "README.md#Setup"
  "description": Track all your Tekton metrics with Datadog.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Tekton
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Tekton][1] through the Datadog Agent. Tekton is a powerful and flexible open source framework for creating CI/CD systems, allowing developers to build, test, and deploy across cloud providers and on-premise systems.

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Starting from Agent release 7.53.0, the Tekton check is included in the [Datadog Agent][3] package. No additional installation is needed on your server.

This check uses [OpenMetrics][4] to collect metrics from the OpenMetrics endpoint that Tekton exposes, which requires Python 3.

### 構成

1. Edit the `tekton.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Tekton performance data. See the [sample tekton.d/conf.yaml][5] for all available configuration options.

2. [Agent を再起動します][6]。

### 検証

[Run the Agent's status subcommand][7] and look for `tekton` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "tekton" >}}


### イベント

The Tekton integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "tekton" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://tekton.dev/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/tekton/datadog_checks/tekton/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/tekton/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/tekton/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

