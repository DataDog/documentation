---
app_id: glusterfs
app_uuid: 3c3562fb-8dce-4265-a8de-eacaa30974e1
assets:
  dashboards:
    Red Hat Gluster Storage: assets/dashboards/red_hat_gluster_storage.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: glusterfs.cluster.nodes.count
      metadata_path: metadata.csv
      prefix: glusterfs.
    process_signatures:
    - glusterd
    - gluster
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10145
    source_type_name: GlusterFS
  logs:
    source: glusterfs
  monitors:
    brick status: assets/monitors/brick_status.json
  saved_views:
    glusterfs_processes: assets/saved_views/glusterfs_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/glusterfs/README.md
display_on_public_website: true
draft: false
git_integration_title: glusterfs
integration_id: glusterfs
integration_title: Red Hat Gluster Storage
integration_version: 1.7.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: glusterfs
public_title: Red Hat Gluster Storage
short_description: GlusterFS クラスターノード、ボリューム、ブリックステータスのメトリクスを監視します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Data Stores
  - Category::Log Collection
  configuration: README.md#Setup
  description: GlusterFS クラスターノード、ボリューム、ブリックステータスのメトリクスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Red Hat Gluster Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を介して [RedHat Gluster Storage][1] クラスターの状態、ボリューム、ブリックステータスを監視します。
この GlusterFS インテグレーションは、RedHat ベンダーバージョンとオープンソースバージョンの GlusterFS の両方と互換性があります。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

GlusterFS チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. GlusterFS のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `glusterfs.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル glusterfs.d/conf.yaml][4] を参照してください。

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

   **注**: デフォルトでは、[`gstatus`][5] はスーパーユーザーとして実行する必要がある `gluster` コマンドを内部的に呼び出します。次のような行を `sudoers` ファイルに追加します。

   ```text
    dd-agent ALL=(ALL) NOPASSWD:/path/to/your/gstatus
   ```

   GlusterFS 環境が root を必要としない場合は、`use_sudo` コンフィギュレーションオプションを `false` に設定します。

2. [Agent を再起動します][6]。

#### 収集データ


1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. GlusterFS のログの収集を開始するには、`glusterfs.d/conf.yaml` ファイルでこのコンフィギュレーションブロックを編集します。

    ```yaml
    logs:
      - type: file
        path: /var/log/glusterfs/glusterd.log
        source: glusterfs
      - type: file
        path: /var/log/glusterfs/cli.log
        source: glusterfs
    ```

  `path` パラメーターの値を環境に合わせて変更します。使用可能なすべてのコンフィギュレーションオプションについては、[conf.yaml のサンプル][4]を参照してください。

  3. [Agent を再起動します][6]。

Kubernetes 環境でのログ収集のための Agent の構成については、[Kubernetes ログの収集][7]を参照してください。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `glusterfs` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "glusterfs" >}}


### ヘルプ

GlusterFS には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "glusterfs" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://www.redhat.com/en/technologies/storage/gluster
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example
[5]: https://github.com/gluster/gstatus#install
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/