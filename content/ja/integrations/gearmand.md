---
aliases:
  - /ja/integrations/gearman
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md'
display_name: Gearman
git_integration_title: gearmand
guid: bdd65394-92ff-4d51-bbe3-ba732663fdb2
integration_id: gearman
integration_title: Gearman
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gearmand.
metric_to_check: gearman.unique_tasks
name: gearmand
process_signatures:
  - gearmand
  - gearman
public_title: Datadog-Gearman インテグレーション
short_description: キューにあるジョブと実行中のジョブの合計数またはタスク別の数を追跡
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

Gearman のメトリクスを収集して、以下のことができます。

* Gearman のパフォーマンスを視覚化できます。
* キューに置かれているタスクまたは実行中のタスクの数を知ることができます。
* Gearman のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

Gearman チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション


1. Gearman のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `gearmand.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル gearmand.d/conf.yaml][4] を参照してください。
    ```yaml
    init_config:

    instances:
        - server: localhost
          port: 4730
    ```

2. [Agent を再起動します][5]。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `gearmand` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "gearmand" >}}


### イベント
Gearmand チェックには、イベントは含まれません。

### サービスのチェック

`gearman.can_connect`:

Agent が Gearman に接続してメトリクスを収集できない場合は、`Critical` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/gearmand/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}