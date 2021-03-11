---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: hbase
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md'
display_name: HBase master
draft: false
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
integration_id: hbase-master
integration_title: Hbase Master
is_public: true
kind: インテグレーション
maintainer: everpeace
manifest_version: 1.0.0
metric_prefix: hbase.
name: hbase_master
public_title: Datadog-Hbase Master インテグレーション
short_description: HBase master インテグレーション。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Hbase_master サービスからメトリクスをリアルタイムに取得して

- Hbase_master の状態を視覚化および監視できます。
- Hbase_master のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Hbase_master チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][4]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Hbase_master の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーで `hbase_master.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hbase_master.d/conf.yaml][7] を参照してください。

    **注**: Agent 6 を使用する場合は、[`hbase_master.d/metrics.yaml`][8] ファイルを修正して boolean キーを引用符で囲みます。

    ```yaml
      - include:
         domain: Hadoop
         bean:
         - Hadoop:service=HBase,name=Master,sub=Server
         attribute:
         # Is Active Master
         tag.isActiveMaster:
            metric_type: gauge
            alias: hbase.master.server.tag.is_active_master
            values: {"true": 1, "false": 0, default: 0}
    ```

2. [Agent を再起動します][9]

### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Hbase_master ログの収集を開始するには、次のコンフィギュレーションブロックを `hbase_master.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   `path` のパラメーター値を変更し、環境に合わせて構成してください。
   使用可能なすべてのコンフィギュレーションオプションについては、[hbase_master.d/conf.yaml のサンプル][10]を参照してください。

3. [Agent を再起動します][9]。

### 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `hbase_master` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hbase_master" >}}


### イベント

Hbase_master チェックには、イベントは含まれません。

### サービスのチェック

Hbase_master チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。




## HBase RegionServer インテグレーション

## 概要

HBase RegionServer サービスからメトリクスをリアルタイムに取得して

- HBase RegionServer の状態を視覚化および監視できます。
- HBase RegionServer のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

HBase RegionServer チェックは [Datadog Agent][4] パッケージに含まれて**いません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに HBase RegionServer チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent ガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][4]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Hbase RegionServer の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーで `hbase_regionserver.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hbase_regionserver.d/conf.yaml][12] を参照してください。

2. [Agent を再起動します][9]

### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Hbase_regionserver ログの収集を開始するには、次のコンフィギュレーションブロックを `hbase_regionserver.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   `path` のパラメーター値を変更し、環境に合わせて構成してください。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hbase_regionserver.d/conf.yaml][12] を参照してください。

3. [Agent を再起動します][9]。

## 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `hbase_regionserver` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hbase_regionserver" >}}


### イベント

HBase RegionServer チェックには、イベントは含まれません。

### サービスのチェック

HBase RegionServer チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[11]: http://docs.datadoghq.com/help
[12]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example