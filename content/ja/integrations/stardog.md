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
  - 'https://github.com/DataDog/integrations-extras/blob/master/stardog/README.md'
display_name: Stardog
git_integration_title: stardog
guid: 1b32f0d4-49ef-40fb-aec3-365e4e7cd6ee
integration_id: stardog
integration_title: Stardog
is_public: true
kind: integration
maintainer: support@stardog.com
manifest_version: 1.0.0
metric_prefix: stardog.
name: stardog
public_title: Datadog-Stardog インテグレーション
short_description: Datadog 用の Stardog データコレクター。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Stardog サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* Stardog の状態を視覚化および監視できます。
* Stardog のフェイルオーバーとイベントの通知を受けることができます。


## セットアップ

Stardog チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Stardog チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `stardo` パッケージをビルドします。

    ```
    ddev -e release build stardog
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_STARDOG_ARTIFACT_>/<STARDOG_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Stardog の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `stardog.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル stardog.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]

## 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `stardog` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "stardog" >}}


### イベント
Stardog チェックには、イベントは含まれません。

### サービスのチェック
Stardog チェックには、サービスのチェック機能は含まれません。

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
[9]: https://github.com/DataDog/integrations-extras/blob/master/stardog/datadog_checks/stardog/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/stardog/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}