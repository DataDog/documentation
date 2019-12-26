---
assets:
  dashboards:
    CockroachDB Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - クラウド
  - データストア
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cockroachdb/README.md'
display_name: CockroachDB
git_integration_title: cockroachdb
guid: d66151ed-2e98-4037-ad89-bf4400e45f34
integration_id: cockroachdb
integration_title: CockroachDB
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cockroachdb.
metric_to_check: cockroachdb.sys.uptime
name: cockroachdb
public_title: Datadog-CockroachDB インテグレーション
short_description: CockroachDB クラスターの全体的な健全性とパフォーマンスを監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

CockroachDB チェックは、[CockroachDB][1] クラスターの全体的な健全性とパフォーマンスを監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

CockroachDB チェックは [Datadog Agent][3] パッケージに含まれているため、
サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `cockroachdb.d/conf.yaml` ファイルを編集して、
   cockroachdb パフォーマンスデータの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル cockroachdb.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `cockroachdb` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cockroachdb" >}}


### サービスのチェック

CockroachDB チェックには、サービスのチェック機能は含まれません。

### イベント

CockroachDB チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料
役に立つドキュメント、リンクや記事:

* [Datadog を使用した CockroachDB パフォーマンスメトリクスの監視][10]

[1]: https://www.cockroachlabs.com/product/cockroachdb
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files
[5]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog


{{< get-dependencies >}}