---
app_id: arangodb
app_uuid: 2851c4fa-97d2-4949-9673-b21671b57b0a
assets:
  dashboards:
    ArangoDB Overview: assets/dashboards/arangodb_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: arangodb.process.system_time
      metadata_path: metadata.csv
      prefix: arangodb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: ArangoDB
  logs:
    source: arangodb
  monitors:
    '[ArangoDB] High server Kernel mode percentage usage': assets/recommended_monitors/high_server_kernel_mode.json
    '[ArangoDB] High server User mode percentage usage': assets/recommended_monitors/high_server_user_mode.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- キャッシュ
- data store
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/arangodb/README.md
display_on_public_website: true
draft: false
git_integration_title: arangodb
integration_id: arangodb
integration_title: ArangoDB
integration_version: 1.4.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: arangodb
public_title: ArangoDB
short_description: ArangoDB の構成に関するメトリックスを追跡します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Store
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: ArangoDB の構成に関するメトリックスを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ArangoDB
---



## 概要

このチェックでは、Datadog Agent を通じて [ArangoDB][1] を監視します。ArangoDB 3.8 以降に対応しています。

Datadog-ArangoDB インテグレーションを有効にすると、以下のことができます。

- ユーザー定義のしきい値に基づいて、遅いクエリを特定する。
- 長いリクエストの影響を理解し、レイテンシーの問題をトラブルシュートする。
- RocksDB のメモリ、ディスク、キャッシュの制限を監視する。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]を参照してこの手順を行ってください。

### インストール

ArangoDB チェックは [Datadog Agent][3] パッケージに含まれています。

### コンフィギュレーション

1. ArangoDB のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `arangodb.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル arangodb.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `arangodb` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "arangodb" >}}


### ログの収集

_Agent バージョン 6.0 以降で利用可能_

ArangoDB インスタンスからログを収集するには、まず ArangoDB がログをファイルに出力するよう構成されていることを確認します。
例えば、`arangod.conf` ファイルを使って ArangoDB インスタンスを構成する場合、以下のように記述してください。

```
# ArangoDB コンフィギュレーションファイル
#
# ドキュメント:
# https://www.arangodb.com/docs/stable/administration-configuration.html
#

...

[log]
file = /var/log/arangodb3/arangod.log 

...
```

ArangoDB のログには、ログの冗長性と出力ファイルのための[多くのオプション][8]が含まれています。Datadog のインテグレーションパイプラインは、デフォルトの変換パターンをサポートしています。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `arangodb.d/conf.yaml` ファイルのログ構成ブロックのコメントを解除して編集します。

   ```yaml
   logs:
      - type: file
        path: /var/log/arangodb3/arangod.log
        source: arangodb
   ```

### イベント

ArangoDB インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "arangodb" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問い合わせください。


[1]: https://www.arangodb.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/arangodb/datadog_checks/arangodb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/arangodb/metadata.csv
[8]: https://www.arangodb.com/docs/3.8/programs-arangod-log.html
[9]: https://github.com/DataDog/integrations-core/blob/master/arangodb/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/