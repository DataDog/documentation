---
aliases: []
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - データストア
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md'
display_name: Eventstore
git_integration_title: eventstore
guid: 4BEB8E51-E7DA-4145-B780-E3B3A6A8CD60
integration_id: eventstore
integration_title: Eventstore
is_public: true
kind: インテグレーション
maintainer: '@xorima'
manifest_version: 1.0.0
metric_prefix: eventstore.
name: eventstore
public_title: Datadog-Eventstore インテグレーション
short_description: Eventstore のメトリクスを収集
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

EventStore からメトリクスをリアルタイムに取得して、以下のことができます。

* EventStore のキューを視覚化および監視できます。
* 統計 API で使用可能なすべてのメトリクスをキャプチャできます。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに EventStore チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [開発ツールキット][4]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `eventstore` パッケージをビルドします。

    ```
    ddev -e release build eventstore
    ```

5. [Datadog Agent をダウンロードして起動][5]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_EVENTSTORE_ARTIFACT_>/<EVENTSTORE_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィグレーション

1. EventStore の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `eventstore.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル eventstore.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `eventstore` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "eventstore" >}}


### イベント

eventstore チェックには、イベントは含まれません。

### サービスのチェック

eventstore チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、このインテグレーションの[メインテナー][12]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[12]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json


{{< get-dependencies >}}