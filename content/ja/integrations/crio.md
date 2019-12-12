---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/crio/README.md'
display_name: CRI-O
git_integration_title: crio
guid: 40fd8230-d178-4e8e-9e6a-6ce4acc19a85
integration_id: cri-o
integration_title: CRI-O
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: crio.
metric_to_check: crio.operations.count
name: crio
public_title: Datadog-CRI-O インテグレーション
short_description: CRI-O のすべてのメトリクスを Datadog で追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [CRI-O][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

このインテグレーションは、CRI-O の `--enable-metrics` オプションに依存します。このオプションはデフォルトでは無効です。有効にした場合は、`127.0.0.1:9090/metrics` でメトリクスが公開されます。

### コンフィグレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `crio.d/conf.yaml` ファイルを編集して、
   CRI-O パフォーマンスデータの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル crio.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `crio` を探します。

## 収集データ

CRI-O は、ランタイムによって実行される操作のカウントとレイテンシーに関するメトリクスを収集します。
さらに、Datadog-CRI-O インテグレーションは、CRI-O Golang バイナリ自体の CPU 使用率とメモリ使用量を収集します。

### メトリクス
{{< get-metrics-from-git "crio" >}}


### サービスのチェック

CRI-O には、メトリクスエンドポイントの到達可能性に関するサービスのチェック機能が含まれています。

### イベント

CRI-O には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: http://cri-o.io
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[7]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}