---
assets:
  dashboards:
    Etcd Overview: assets/dashboards/etcd_overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - containers
  - configuration & deployment
  - orchestration
  - autodiscovery
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/etcd/README.md'
display_name: etcd
git_integration_title: etcd
guid: a1cfafdb-5d88-4ae1-acdc-6356df755b73
integration_id: etcd
integration_title: etcd
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: etcd.
metric_to_check: etcd.store.watchers
name: etcd
process_signatures:
  - etcd
public_title: Datadog-etcd インテグレーション
short_description: 書き込み、更新、削除、ノード間レイテンシー、さまざまな Etcd メトリクスを追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Etcd ダッシュボード][1]

## 概要

Etcd のメトリクスを収集して、以下のことができます。

- Etcd クラスターの健全性を監視できます。
- ホスト構成が同期されていない可能性があることに気付くことができます。
- Etcd のパフォーマンスを他のアプリケーションと関連付けることができます。

## セットアップ

### インストール

Etcdチェックは [Datadog Agent][2] パッケージに含まれています。Etcd インスタンスに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. Etcd のパフォーマンスデータを収集するには、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `etcd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル etcd.d/conf.yaml][4] を参照してください。
2. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `etcd`                                               |
| `<INIT_CONFIG>`      | 空白または `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "http://%%host%%:2379/metrics"}` |

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `etcd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "etcd" >}}


Etcd メトリクスは、ノードのステータスに応じて `etcd_state:leader` または `etcd_state:follower` がタグ付けされるため、メトリクスをステータスごとに簡単に集計できます。

### イベント

Etcd チェックには、イベントは含まれません。

### サービスのチェック

`etcd.can_connect`:

Agent が Etcd API エンドポイントからメトリクスを収集できない場合は、'Critical' を返します。

`etcd.healthy`:

メンバーノードが異常である場合は、'Critical' を返します。Agent が `/health` エンドポイントに到達できない場合、あるいは健全性ステータスが見つからない場合は、'Unknown' を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

Etcd のインテグレーションをより便利に行う方法 (または理由) について理解するには、Datadog の[ブログ記事][10]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/etcd/images/etcd_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/etcd/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitor-etcd-performance