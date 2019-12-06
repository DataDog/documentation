---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/riakcs/README.md'
display_name: Riak CS
git_integration_title: riakcs
guid: 55ba6b94-8eeb-486b-aa94-6366a044fdf0
integration_id: riak-cs
integration_title: Riak CS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: riakcs.
metric_to_check: riakcs.bucket_list_pool.workers
name: riakcs
process_signatures:
  - riak-cs start
public_title: Datadog-Riak CS インテグレーション
short_description: GET、PUT、DELETE などの速度と平均レイテンシーを追跡 operations.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![RiakCS ダッシュボード][1]

## 概要

Datadog で RiakCS のメトリクスをキャプチャして、以下のことができます。

* RiakCS のキーメトリクスを視覚化できます。
* RiakCS のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

RiakCS チェックは [Datadog Agent][3] パッケージに含まれています。RiakCS ノードに追加でインストールする必要はありません。

### コンフィグレーション

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `riakcs.yamld/conf.` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル riakcs.d/conf.yaml][5] を参照してください。

    ```yaml
        init_config:

        instances:
          - host: localhost
            port: 8080
            access_id: <YOUR_ACCESS_KEY>
            access_secret: <YOUR_ACCESS_SECRET>
        #   is_secure: true # set to false if your endpoint doesn't use SSL
        #   s3_root: s3.amazonaws.com #
    ```

2. [Agent を再起動][6]すると、Datadog への RiakCS メトリクスの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `riakcs` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "riakcs" >}}
 大部分の S3 API メトリクスとメモリ統計を含みます。いくつかが除外されています。

* bucket_acl_(get|put)
* object_acl_(get|put)
* bucket_policy_(get|put|delete)
* _in_(one|total)
* _time_error_*
* _time_100

これらの除外されたメトリクスと、他の多くのメトリクス (1000 以上のメトリクスを選択可能) を任意に追加できます。それには、
`riakcs.d/conf.yaml` 構成ファイルの `instance_config` で `metrics` キーを使用してメトリクスを指定します。この値はメトリクス名のリストです。

[使用可能なメトリクスの完全なリスト][9]を確認してください。

### イベント
RiackCS チェックには、イベントは含まれません。

### サービスのチェック

**riakcs.can_connect**:

Agent が RiakCS エンドポイントに接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料
Riak CS のパフォーマンスと可用性を監視する方法 (または理由) について理解するには、Datadog の[一連のブログ記事][11]を参照してください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riakcs/images/riakcs_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/riakcs/datadog_checks/riakcs/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/riakcs/metadata.csv
[9]: https://github.com/basho/riak_cs/wiki/Riak-cs-and-stanchion-metrics
[10]: https://docs.datadoghq.com/ja/help
[11]: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability


{{< get-dependencies >}}