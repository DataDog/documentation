---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/filebeat/README.md'
display_name: Filebeat
draft: false
git_integration_title: filebeat
guid: 3bb6a789-d1e3-465c-9bff-ea2a43ae2f59
integration_id: filebeat
integration_title: Filebeat
is_public: true
kind: インテグレーション
maintainer: jean@tripping.com
manifest_version: 1.0.0
metric_prefix: filebeat.
name: filebeat
public_title: Datadog-Filebeat インテグレーション
short_description: 軽量ログシッパー
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Filebeat サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Filebeat の状態を視覚化および監視できます。
- Filebeat のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Filebeat チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従ってホストに Filebeat チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `filebeat` パッケージをビルドします。

   ```shell
   ddev -e release build filebeat
   ```

5. [Datadog Agent をダウンロードして起動][1]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -w <PATH_OF_FILEBEAT_ARTIFACT_>/<FILEBEAT_ARTIFACT_NAME>.whl
   ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Filebeat の[メトリクス](#メトリクスの収集)を収集するには、[Agent のコンフィギュレーションディレクトリ][7]のルートにある `conf.d/` フォルダーの `filebeat.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル filebeat.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]

## 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `filebeat` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "filebeat" >}}


### イベント

Filebeat チェックには、イベントは含まれません。

### サービスのチェック

`filebeat.can_connect`:

Agent が Filebeat に接続してメトリクスを収集できない場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング


ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/