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
- https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md
display_name: HBase master
draft: false
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
integration_id: hbase-master
integration_title: Hbase Master
integration_version: 1.1.0
is_public: true
kind: インテグレーション
maintainer: everpeace@gmail.com
manifest_version: 1.0.0
metric_prefix: hbase.
metric_to_check: hbase.master.assignmentmanager.rit_oldest_age
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

Hbase_master チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Hbase_master チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Hbase_master の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーで `hbase_master.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hbase_master.d/conf.yaml][5] を参照してください。

    **注**: Agent 6 を使用する場合は、[`hbase_master.d/metrics.yaml`][6] ファイルを修正して boolean キーを引用符で囲みます。

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

2. [Agent を再起動します][7]。

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
   使用可能なすべての構成オプションの詳細については、[サンプル hbase_master.d/conf.yaml][8] を参照してください。

3. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `hbase_master` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hbase_master" >}}


### イベント

Hbase_master チェックには、イベントは含まれません。

### サービスのチェック

Hbase_master チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。




## HBase RegionServer インテグレーション

## 概要

HBase RegionServer サービスからメトリクスをリアルタイムに取得して

- HBase RegionServer の状態を視覚化および監視できます。
- HBase RegionServer のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

HBase RegionServer チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い HBase RegionServer チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Hbase RegionServer の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーで `hbase_regionserver.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hbase_regionserver.d/conf.yaml][10] を参照してください。

2. [Agent を再起動します][7]。

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
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hbase_regionserver.d/conf.yaml][10] を参照してください。

3. [Agent を再起動します][7]。

## 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `hbase_regionserver` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hbase_regionserver" >}}


### イベント

HBase RegionServer チェックには、イベントは含まれません。

### サービスのチェック

HBase RegionServer チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: http://docs.datadoghq.com/help
[10]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example