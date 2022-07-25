---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    riakcs: assets/dashboards/riakcs_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    riak-cs_processes: assets/saved_views/riak-cs_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/riakcs/README.md
display_name: RiakCS
draft: false
git_integration_title: riakcs
guid: 55ba6b94-8eeb-486b-aa94-6366a044fdf0
integration_id: riak-cs
integration_title: Riak CS
integration_version: 2.9.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: riakcs.
metric_to_check: riakcs.bucket_list_pool.workers
name: riakcs
process_signatures:
- riak-cs start
public_title: Riak CS インテグレーション
short_description: GET、PUT、DELETE などの速度と平均レイテンシーを追跡。
support: コア
supported_os:
- linux
- mac_os
- windows
---



![RiakCS ダッシュボード][1]

## 概要

Datadog で RiakCS のメトリクスをキャプチャして、以下のことができます。

- RiakCS のキーメトリクスを視覚化できます。
- RiakCS のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

## セットアップ

### インストール

RiakCS チェックは [Datadog Agent][2] パッケージに含まれています。RiakCS ノードに追加でインストールする必要はありません。

### コンフィギュレーション

1. [Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `riakcs.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル riakcs.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param access_id - string - required
     ## Enter you RiakCS access key.
     #
     - access_id: "<ACCESS_KEY>"

       ## @param access_secret - string - required
       ## Enter the corresponding RiakCS access secret.
       #
       access_secret: "<ACCESS_SECRET>"
   ```

2. [Agent を再起動します][5]。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `riakcs` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "riakcs" >}}
 大部分の S3 API メトリクスとメモリ統計を含みます。いくつかが除外されています。

- bucket*acl*(get|put)
- object*acl*(get|put)
- bucket*policy*(get|put|delete)
- _in_(one|total)
- _time_error_\*
- \_time_100

除外されたメトリクスや追加のメトリクス (1000 以上) は、`instance_config`の `metrics` キーを使って `riakcs.d/conf.yaml` コンフィギュレーションファイルに追加することができます。値はメトリクス名のリストである必要があります。

[利用可能なメトリクスの全リスト][8]を参照してください。

### イベント

RiakCS チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "riakcs" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Riak CS のパフォーマンスと可用性を監視][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riakcs/images/riakcs_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/riakcs/datadog_checks/riakcs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/riakcs/metadata.csv
[8]: https://github.com/basho/riak_cs/wiki/Riak-cs-and-stanchion-metrics
[9]: https://github.com/DataDog/integrations-core/blob/master/riakcs/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability