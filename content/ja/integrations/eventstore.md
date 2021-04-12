---
aliases: []
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md'
display_name: Eventstore
draft: false
git_integration_title: eventstore
guid: 4BEB8E51-E7DA-4145-B780-E3B3A6A8CD60
integration_id: eventstore
integration_title: Eventstore
is_public: true
kind: インテグレーション
maintainer: '@xorima'
manifest_version: 1.1.0
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
* 以下の API エンドポイントで、使用可能なすべてのメトリクスをキャプチャします。統計、ノード情報、非過渡的な予測、サブスクリプション、クラスターゴシップ（スクレープするエンドポイントのリストは構成できます）

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに EventStore チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][4]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. EventStore の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `eventstore.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル eventstore.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `eventstore` を探します。

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

ご不明な点は、このインテグレーションの[メインテナー][11]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json