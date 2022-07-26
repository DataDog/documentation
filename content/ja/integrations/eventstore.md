---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md
display_name: Eventstore
draft: false
git_integration_title: eventstore
guid: 4BEB8E51-E7DA-4145-B780-E3B3A6A8CD60
integration_id: eventstore
integration_title: Eventstore
integration_version: 2.0.0
is_public: true
kind: インテグレーション
maintainer: '@xorima'
manifest_version: 1.0.0
metric_prefix: eventstore.
metric_to_check: eventstore.proc.mem
name: eventstore
public_title: Eventstore
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

EventStore チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い EventStore チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. EventStore の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `eventstore.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル eventstore.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `eventstore` を探します。

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

ご不明な点は、このインテグレーションの[メインテナー][9]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json