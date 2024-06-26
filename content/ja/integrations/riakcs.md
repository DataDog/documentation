---
app_id: riak-cs
app_uuid: 29e6a2b4-7f3a-4243-8e10-d065147c3da0
assets:
  dashboards:
    riakcs: assets/dashboards/riakcs_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: riakcs.bucket_list_pool.workers
      metadata_path: metadata.csv
      prefix: riakcs.
    process_signatures:
    - riak-cs start
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RiakCS
  saved_views:
    riak-cs_processes: assets/saved_views/riak-cs_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/riakcs/README.md
display_on_public_website: true
draft: false
git_integration_title: riakcs
integration_id: riak-cs
integration_title: Riak CS
integration_version: 2.10.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: riakcs
public_title: Riak CS
short_description: GET、PUT、DELETE などの速度と平均レイテンシーを追跡。
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
  - Category::データストア
  configuration: README.md#Setup
  description: GET、PUT、DELETE などの速度と平均レイテンシーを追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Riak CS
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
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/riakcs/datadog_checks/riakcs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/riakcs/metadata.csv
[8]: https://github.com/basho/riak_cs/wiki/Riak-cs-and-stanchion-metrics
[9]: https://github.com/DataDog/integrations-core/blob/master/riakcs/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability