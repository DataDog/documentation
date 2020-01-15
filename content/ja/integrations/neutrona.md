---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - AZURE
  - クラウド
  - ネットワーク
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/neutrona/README.md'
display_name: Neutrona
git_integration_title: neutrona
guid: ced5a4ae-6623-49f0-b45b-dbb678a5baa2
integration_id: neutrona
integration_title: Neutrona
is_public: true
kind: インテグレーション
maintainer: david@neutrona.com
manifest_version: 1.0.0
metric_prefix: neutrona.
metric_to_check: ''
name: neutrona
public_title: Datadog-Neutrona インテグレーション
short_description: Neutrona Telemetry
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Azure (ExpressRoute) への [Neutrona][1] クラウド接続サービスを監視します。
 - Azure (ExpressRoute)

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Neutrona チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `neutrona` パッケージをビルドします。

    ```
    ddev -e release build neutrona
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_NEUTRONA_ARTIFACT_>/<NEUTRONA_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Neutrona の[メトリクス](#metric-collection)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `neutrona.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル neutrona.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `neutrona` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "neutrona" >}}


### サービスのチェック

現時点で、Neutrona には、サービスのチェック機能は含まれません。

### イベント

現時点で、Neutrona には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://telemetry.neutrona.com
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/datadog_checks/neutrona/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-core/blob/master/neutrona/metadata.csv
[13]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}