---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/storm/README.md'
display_name: storm
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
integration_id: storm
integration_title: Storm
is_public: true
kind: integration
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: storm.
name: storm
public_title: Datadog-Storm インテグレーション
short_description: Apache Storm 1.x.x トポロジー実行統計
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Storm サービスからリアルタイムにメトリクスを取得して、以下のことができます。

* Storm のクラスターメトリクスとトポロジーメトリクスを視覚化して監視できます。
* Storm のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Storm チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Storm チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `storm` パッケージをビルドします。

    ```
    ddev -e release build storm
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_STORM_ARTIFACT_>/<STORM_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Storm の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `storm.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル storm.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]

## 検証

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `storm` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "storm" >}}


### イベント
Storm チェックには、イベントは含まれません。

### サービスのチェック
**`topology_check.{TOPOLOGY NAME}`**

チェックは次の内容を返します。

* `OK` - トポロジーがアクティブな場合。
* `CRITICAL` - トポロジーがアクティブでない場合。

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
[9]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}