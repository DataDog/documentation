---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - messaging
  - notification
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gnatsd/README.md'
display_name: Gnatsd
git_integration_title: gnatsd
guid: 7edcf450-d9cf-44aa-9053-ece04ac7c21d
integration_id: gnatsd
integration_title: Gnatsd
is_public: true
kind: integration
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
name: gnatsd
public_title: Datadog-Gnatsd インテグレーション
short_description: Datadog で gnatsd クラスターを監視
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Gnatsd サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* Gnatsd の状態を視覚化および監視できます。
* Gnatsd のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Gnatsd チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [開発ツールキット][4]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `gnatsd` パッケージをビルドします。

    ```
    ddev -e release build gnatsd
    ```

5. [Datadog Agent をダウンロードして起動][5]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_GNATSD_ARTIFACT_>/<GNATSD_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Gnatsd の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `gnatsd.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル gnatsd.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `gnatsd` を探します。

## 互換性

gnatsd チェックは、すべての主要プラットフォームと互換性があります。

## 収集データ
### メトリクス
{{< get-metrics-from-git "gnatsd" >}}


**注**: カスタム Nats クラスター名を使用する場合、メトリクスは次のようになります。
`gnatsd.connz.connections.cluster_name.in_msgs`

### イベント
gnatsd チェックには、イベントは含まれません。

### サービスのチェック
この gnatsd チェックは、収集するすべてのサービスチェックに次のタグを付けます。

* `server_name:<server_name_in_yaml>`
* `url:<host_in_yaml>`

`gnatsd.can_connect`:
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
[8]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[12]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}