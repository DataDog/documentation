---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/trino/README.md
display_name: Trino
draft: false
git_integration_title: trino
guid: f82a7dd0-5d8a-4d1c-ac99-5463da28d890
integration_id: trino
integration_title: Trino
integration_version: 1.0.0
is_public: true
kind: integration
maintainer: '@ndrluis'
manifest_version: 1.0.0
metric_prefix: trino.
metric_to_check: trino.memory.reserved_distributed_bytes
name: trino
public_title: Trino
short_description: Trino クラスターのパフォーマンスと使用量を収集する
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックでは、以下の例のような [Trino][1] メトリクスを収集します。

- 全体的なアクティビティメトリクス: 完了/失敗したクエリ、データ入力/出力サイズ、実行時間。
- パフォーマンスメトリクス: クラスターメモリ、入力 CPU 時間、実行 CPU 時間。

## セットアップ

### インストール

Agent v7.33.0 以降の場合は、下記の手順に従い Trino チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-trino==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "trino" >}}


### イベント

Trino インテグレーションには、イベントは含まれません。

### サービスのチェック

Trino インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。


[1]: https://trino.io/
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/trino/datadog_checks/trino/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/integrations/java/
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-extras/blob/master/trino/metadata.csv