---
app_id: hbase-master
app_uuid: e53ed650-6454-4f69-abfc-2cedd35ec2c3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hbase.master.assignmentmanager.rit_oldest_age
      metadata_path: metadata.csv
      prefix: hbase.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10228
    source_type_name: HBase master
  logs:
    source: hbase
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: everpeace@gmail.com
  support_email: everpeace@gmail.com
categories:
- data stores
- log collection
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md
display_on_public_website: true
draft: false
git_integration_title: hbase_master
integration_id: hbase-master
integration_title: Hbase Master
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: hbase_master
public_title: Hbase Master
short_description: HBase master インテグレーション。
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
  - Category::Data Stores
  - Category::ログの収集
  configuration: README.md#Setup
  description: HBase master インテグレーション。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hbase Master
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Hbase_master サービスからメトリクスをリアルタイムに取得して

- Hbase_master の状態を視覚化および監視できます。
- Hbase_master のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

Hbase_master チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Hbase_master チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

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

### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hbase_master" >}}


### ヘルプ

Hbase_master チェックには、イベントは含まれません。

### ヘルプ

Hbase_master チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。




<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## HBase RegionServer インテグレーション

## 概要

HBase RegionServer サービスからメトリクスをリアルタイムに取得して

- HBase RegionServer の状態を視覚化および監視できます。
- HBase RegionServer のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

HBase RegionServer チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い HBase RegionServer チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Hbase RegionServer の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーで `hbase_regionserver.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hbase_regionserver.d/conf.yaml][10] を参照してください。

2. [Agent を再起動します][7]。

### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hbase_regionserver" >}}


### ヘルプ

HBase RegionServer チェックには、イベントは含まれません。

### ヘルプ

HBase RegionServer チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: http://docs.datadoghq.com/help
[10]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example