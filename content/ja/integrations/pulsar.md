---
"app_id": "pulsar"
"app_uuid": "2a3a1555-3c19-42a9-b954-ce16c4aa6308"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": pulsar.active_connections
      "metadata_path": metadata.csv
      "prefix": pulsar.
    "process_signatures":
    - java org.apache.pulsar.PulsarStandaloneStarter
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10143"
    "source_type_name": pulsar
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- message queues
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/pulsar/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pulsar"
"integration_id": "pulsar"
"integration_title": "Pulsar"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "pulsar"
"public_title": "Pulsar"
"short_description": "Monitor your Pulsar clusters."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Message Queues"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor your Pulsar clusters.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Pulsar
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Pulsar][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Pulsar チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

1. pulsar のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `pulsar.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[pulsar.d/conf.yaml のサンプル][4]を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `pulsar` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "pulsar" >}}



### ログ収集

1. Pulsar ログインテグレーションは、Pulsar の[デフォルトログフォーマット][8]をサポートします。異なるフォーマットがある場合は、[インテグレーションパイプライン][9]を複製し、編集してください。

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。
   ```yaml
   logs_enabled: true
   ```

3. `pulsar.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、パスパラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[pulsar.d/conf.yaml のサンプル][4]を参照してください。
   ```yaml
    logs:
      - type: file
        path: /pulsar/logs/pulsar.log
        source: pulsar
   ```
4. [Agent を再起動します][5]。

### イベント

Pulsar インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "pulsar" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://pulsar.apache.org
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/pulsar/metadata.csv
[8]: https://pulsar.apache.org/docs/en/reference-configuration/#log4j
[9]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[10]: https://github.com/DataDog/integrations-core/blob/master/pulsar/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

