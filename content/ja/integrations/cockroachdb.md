---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    CockroachDB Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - data store
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cockroachdb/README.md'
display_name: CockroachDB
draft: false
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

### インストール

CockroachDB チェックは [Datadog Agent][2] パッケージに含まれているため、
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. CockroachDB のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `cockroachdb.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cockroachdb.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                    |
| -------------------- | -------------------------------------------------------- |
| `<インテグレーション名>` | `cockroachdb`                                            |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                            |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_url":"http://%%host%%:8080/_status/vars"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `cockroachdb` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cockroachdb" >}}


### サービスのチェック

CockroachDB チェックには、サービスのチェック機能は含まれません。

### イベント

CockroachDB チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した CockroachDB パフォーマンスメトリクスの監視][5]


[1]: https://www.cockroachlabs.com/product/cockroachdb
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog