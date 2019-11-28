---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - monitoring
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md'
display_name: Gnatsd ストリーミング
git_integration_title: gnatsd_streaming
guid: 0a849512-5823-4d9b-b378-aa9d8fb06231
integration_id: gnatsd-streaming
integration_title: Gnatsd_streaming
is_public: true
kind: integration
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
name: gnatsd_streaming
public_title: Datadog-Gnatsd_streaming インテグレーション
short_description: NATS サーバーストリーミング
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

gnatsd_streaming サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* gnatsd_streaming の状態を視覚化および監視できます。
* gnatsd_streaming のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに gnatsd_streaming チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [開発ツールキット][4]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `gnatsd_streaming` パッケージをビルドします。

    ```
    ddev -e release build gnatsd_streaming
    ```

5. [Datadog Agent をダウンロードして起動][5]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_GNATSD_STREAMING_ARTIFACT_>/<GNATSD_STREAMING_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィグレーション

1. GnatsD のストリーミング[メトリクス](#metric-collection)の収集を開始するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `gnatsd_streaming.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル gnatsd_streaming.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `gnatsd_streaming` を探します。

## 互換性

gnatsd_streaming チェックは、すべての主要プラットフォームと互換性があります。

## 収集データ
### メトリクス
{{< get-metrics-from-git "gnatsd_streaming" >}}


Nats ストリーミングサーバーのメトリクスは、"nss-cluster_id" のような名前でタグ付けされます。

### イベント

Nats ストリーミングサーバーをフォールトトレラントグループ内で実行している場合、サーバーのステータスが `FT_STANDBY` と `FT_ACTIVE` の間で
切り替わると、Nats ストリーミングフェイルオーバーイベントが発行されます。

### サービスのチェック
この gnatsd_streaming チェックは、収集するすべてのサービスチェックに次のタグを付けます。

  * `server_name:<server_name_in_yaml>`
  * `url:<host_in_yaml>`

`gnatsd_streaming.can_connect`:
Agent が _monitoring_ エンドポイントから 200 を受信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[12]: http://docs.datadoghq.com/help


{{< get-dependencies >}}