---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/upsc/README.md'
display_name: UPSC
git_integration_title: upsc
guid: f14607ca-0e30-4c7f-9564-fbdb46ca3030
integration_id: upsc
integration_title: UPSC
is_public: true
kind: インテグレーション
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: upsc.
name: upsc
public_title: Datadog-UPSC インテグレーション
short_description: UPS バッテリーの UPSC 統計コレクター
support: contrib
supported_os:
  - linux
---
## 概要

UPSC 経由で UPSD サービスからメトリクスをリアルタイムに取得すると、以下のことができます。

- UPS バッテリーの健全性と状態を視覚化および監視できます。
- UPS のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

UPSC チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに UPSD チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `upsc` パッケージをビルドします。

   ```shell
   ddev -e release build upsc
   ```

5. [Datadog Agent をダウンロードして起動][1]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -w <PATH_OF_UPSC_ARTIFACT_>/<UPSC_ARTIFACT_NAME>.whl
   ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. UPSC の[メトリクス](#metric-collection)を収集するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `upsc.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル upsc.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]

## 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `upsc` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "upsc" >}}


### イベント

UPSC チェックには、イベントは含まれません。

### サービスのチェック

UPSC チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/upsc/datadog_checks/upsc/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/upsc/metadata.csv
[12]: http://docs.datadoghq.com/help