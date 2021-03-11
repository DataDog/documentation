---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Red Hat Gluster Storage: assets/dashboards/red_hat_gluster_storage.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    brick status: assets/monitors/brick_status.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/glusterfs/README.md'
display_name: GlusterFS
draft: true
git_integration_title: glusterfs
guid: 1cb9a21c-8cc4-4727-a4b1-ab7015c7ae24
integration_id: glusterfs
integration_title: Red Hat Gluster Storage
is_public: false
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: glusterfs.
metric_to_check: glusterfs.cluster.nodes.count
name: GlusterFS
process_signatures:
  - glusterd
  - gluster
public_title: Red Hat Gluster Storage
short_description: GlusterFS クラスターノード、ボリューム、ブリックステータスのメトリクスを監視します。
support: コア
supported_os:
  - linux
---
## 概要

このチェックは、Datadog Agent を介して [RedHat Gluster Storage][1] クラスターの状態、ボリューム、ブリックステータスを監視します。
この GlusterFS インテグレーションは、RedHat ベンダーバージョンとオープンソースバージョンの GlusterFS の両方と互換性があります。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

GlusterFS チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. GlusterFS のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `glusterfs.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル glusterfs.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

    ## @param gstatus_path - string - optional - default: /opt/datadog-agent/embedded/sbin/gstatus
    ## Path to the gstatus command.
    ##
    ## A version of the gstatus is shipped with the Agent binary.
    ## If you are using a source install, specify the location of gstatus.
    #
    # gstatus_path: /opt/datadog-agent/embedded/sbin/gstatus

    instances:
      -
        ## @param min_collection_interval - number - optional - default: 60
        ## The GlusterFS integration collects cluster-wide metrics which can put additional workload on the server.
        ## Increase the collection interval to reduce the frequency.
        ##
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        #
        min_collection_interval: 60
   ```

   **注**: デフォルトでは、[`gstatus`][4] はスーパーユーザーとして実行する必要がある `gluster` コマンドを内部的に呼び出します。次のような行を `sudoers` ファイルに追加します。

   ```text
    dd-agent ALL=(ALL) NOPASSWD:/path/to/your/gstatus
   ```

   GlusterFS 環境が root を必要としない場合は、`use_sudo` コンフィギュレーションオプションを `false` に設定します。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `glusterfs` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "glusterfs" >}}


### サービスのチェック

**glusterfs.brick.health**:<br>
サブボリュームが 'degraded' の場合は `CRITICAL` を返します。'up' の場合は `OK` を返します。

**glusterfs.volume.health**:<br>
ボリュームが 'degraded' の場合は `CRITICAL` を返します。'up' の場合は `OK` を返します。

**glusterfs.cluster.health**:<br>
クラスターが 'degraded' の場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

### イベント

GlusterFS には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://www.redhat.com/en/technologies/storage/gluster
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example
[4]: https://github.com/gluster/gstatus#install
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/