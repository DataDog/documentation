---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
creates_events: true
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md
display_name: Gnatsd streaming
draft: false
git_integration_title: gnatsd_streaming
guid: 0a849512-5823-4d9b-b378-aa9d8fb06231
integration_id: gnatsd-streaming
integration_title: Gnatsd Streaming
integration_version: 1.0.0
is_public: true
kind: インテグレーション
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
metric_to_check: gnatsd.streaming.serverz.clients
name: gnatsd_streaming
public_title: Gnatsd Streaming
short_description: NATS サーバーストリーミング
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

gnatsd_streaming サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- gnatsd_streaming の状態を視覚化および監視できます。
- gnatsd_streaming のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

gnatsd_streaming チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い gnatsd_streaming チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-gnatsd_streaming==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. GnatsD のストリーミング[メトリクス](#metric)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `gnatsd_streaming.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル gnatsd_streaming.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `gnatsd_streaming` を探します。

## 互換性

gnatsd_streaming チェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gnatsd_streaming" >}}


Nats ストリーミングサーバーのメトリクスは、"nss-cluster_id" のような名前でタグ付けされます。

### イベント

Nats ストリーミングサーバーをフォールトトレラントグループ内で実行している場合、サーバーのステータスが `FT_STANDBY` と `FT_ACTIVE` の間で切り替わると、Nats ストリーミングフェイルオーバーイベントが発行されます。

### サービスのチェック
{{< get-service-checks-from-git "gnatsd_streaming" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/assets/service_checks.json
[10]: http://docs.datadoghq.com/help