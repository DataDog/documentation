---
app_id: trino
app_uuid: 5d6fa7f8-e827-408c-9cf1-8f2bd64b45d3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: trino.memory.reserved_distributed_bytes
      metadata_path: metadata.csv
      prefix: trino.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10282
    source_type_name: Trino
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/trino/README.md
display_on_public_website: true
draft: false
git_integration_title: trino
integration_id: trino
integration_title: Trino
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: trino
public_title: Trino
short_description: Trino クラスターのパフォーマンスと使用量を収集する
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Trino クラスターのパフォーマンスと使用量を収集する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Trino
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックでは、以下の例のような [Trino][1] メトリクスを収集します。

- 全体的なアクティビティメトリクス: 完了/失敗したクエリ、データ入力/出力サイズ、実行時間。
- パフォーマンスメトリクス: クラスターメモリ、入力 CPU 時間、実行 CPU 時間。

## 計画と使用

### インフラストラクチャーリスト

Agent v7.33.0 以降の場合は、下記の手順に従い Trino チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-trino==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `trino.d/conf.yaml` ファイルを編集して、
   Trino パフォーマンスデータの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル trino.d/conf.yaml][4] を参照してください。

   このチェックは、1 インスタンスあたり 350 メトリクスの制限があります。返されたメトリクスの数は、Datadog Agent の [status コマンド][5]を実行したときに表示されます。
   [構成][4]を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェック][6]を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][7]までお問い合わせください。

2. [Agent を再起動します][8]。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで Trino を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "trino" >}}


### ヘルプ

Trino インテグレーションには、イベントは含まれません。

### ヘルプ

Trino インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://trino.io/
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/trino/datadog_checks/trino/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/integrations/java/
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-extras/blob/master/trino/metadata.csv