---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md'
display_name: HBase マスター
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
integration_id: hbase-master
integration_title: Hbase マスター
is_public: true
kind: integration
maintainer: everpeace
manifest_version: 1.0.0
metric_prefix: hbase.
name: hbase_master
public_title: Datadog-Hbase Master インテグレーション
short_description: HBase マスターインテグレーション。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Hbase_master サービスからメトリクスをリアルタイムに取得して

* Hbase_master の状態を視覚化および監視できます。
* Hbase_master のフェイルオーバーとイベントの通知を受けることができます。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Hbase_master チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [開発ツールキット][4]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `hbase_master` パッケージをビルドします。

    ```
    ddev -e release build hbase_master
    ```

5. [Datadog Agent をダウンロードして起動][5]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_HBASE_MASTER_ARTIFACT_>/<HBASE_MASTER_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Hbase_master の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `hbase_master.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル hbase_master.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]。

## 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `hbase_master` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "hbase_master" >}}


### イベント
Hbase_master チェックには、イベントは含まれません。

### サービスのチェック
Hbase_master チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/metadata.csv
[12]: http://docs.datadoghq.com/help


{{< get-dependencies >}}


## HBase RegionServer インテグレーション

## 概要

HBase RegionServer サービスからメトリクスをリアルタイムに取得して

* HBase RegionServer の状態を視覚化および監視できます。
* HBase RegionServer のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

HBase RegionServer チェックは [Datadog Agent][1] パッケージに含まれて**いません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに HBase RegionServer チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `hbase_regionserver` パッケージをビルドします。

    ```
    ddev -e release build hbase_regionserver
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_HBASE_REGIONSERVER_ARTIFACT_>/<HBASE_REGIONSERVER_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. HBase RegionServer の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `hbase_regionserver.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル hbase_regionserver.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

## 検証

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `hbase_regionserver` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "hbase_regionserver" >}}


### イベント
HBase RegionServer チェックには、イベントは含まれません。

### サービスのチェック
HBase RegionServer チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}