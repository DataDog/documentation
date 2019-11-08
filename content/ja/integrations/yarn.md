---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/yarn/README.md'
display_name: Yarn
git_integration_title: yarn
guid: 3223c2e3-29dd-4cfb-82a2-51b951c648eb
integration_id: yarn
integration_title: Yarn
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: yarn.
metric_to_check: yarn.metrics.total_mb
name: yarn
public_title: Datadog-Yarn インテグレーション
short_description: クラスター全体の健全性メトリクスを収集し、アプリケーションの進捗状況を追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Hadoop Yarn][1]

## 概要

このチェックは、YARN ResourceManager からメトリクスを収集します。以下は、メトリクスの一例です。

* クラスター全体のメトリクス (実行中のアプリ、実行中のコンテナ、異常なノードの数など)
* アプリケーションごとのメトリクス (アプリの進捗状況、経過した実行時間、実行中のコンテナ数、メモリ使用量など)
* ノードメトリクス (使用可能な vCores、最新の健全性更新時間など)

### 非推奨のお知らせ
`yarn.apps` メトリクスは `GAUGE` ではなく `RATE` として誤って報告されるため、`yarn.apps.<METRIC>` メトリクスは非推奨になりました。`yarn.apps.<METRIC>_gauge` メトリクスを使用してください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

YARN チェックは [Datadog Agent][3] パッケージに含まれています。YARN ResourceManager に追加でインストールする必要はありません。

### コンフィグレーション

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `yarn.d/conf.yaml` ファイルを編集します。

    ```yaml
        init_config:

        instances:
          - resourcemanager_uri: http://localhost:8088 # or whatever your resource manager listens
            cluster_name: MyCluster # used to tag metrics, i.e. 'cluster_name:MyCluster'; default is 'default_cluster'
            collect_app_metrics: true
    ```

    <mrk mid="36" mtype="seg">すべてのチェックオプションの一覧と説明については、[チェック構成の例][5]を参照してください。</mrk>

2. [Agent を再起動][6]すると、Datadog への YARN メトリクスの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `yarn` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "yarn" >}}


### イベント
Yarn チェックには、イベントは含まれません。

### サービスのチェック
**yarn.can_connect**:

Agent が ResourceManager URI に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**yarn.application.status**:

[`conf.yaml`][5] ファイルで指定されたマッピングに応じて、アプリケーションのステータスごとに返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

* [Hadoop アーキテクチャの概要][10]
* [Hadoop メトリクスの監視方法][11]
* [Hadoop メトリクスの収集方法][12]
* [Datadog を使用した Hadoop の監視方法][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/yarn/images/yarn_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/yarn/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[11]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[12]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[13]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog


{{< get-dependencies >}}