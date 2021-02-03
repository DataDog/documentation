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

1. [Datadog Agent をダウンロードして起動][1]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-filebeat==<INTEGRATION_VERSION>
   ```
3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Filebeat の[メトリクス](#メトリクスの収集)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `filebeat.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル filebeat.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

## 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションで `filebeat` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "filebeat" >}}


### イベント

Filebeat チェックには、イベントは含まれません。

### サービスのチェック

`filebeat.can_connect`:

Agent が Filebeat に接続してメトリクスを収集できない場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング


ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/