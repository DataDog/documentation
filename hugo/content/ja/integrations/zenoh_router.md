---
app_id: zenoh-router
app_uuid: 8ef30e8d-955c-4456-b176-a01f2560bda1
assets:
  dashboards:
    Zenoh routers - Overview: assets/dashboards/zenoh_routers_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: zenoh.router.sessions
      metadata_path: metadata.csv
      prefix: zenoh.router.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10445
    source_type_name: Zenoh router
  monitors:
    No active sessions: assets/monitors/zenoh_router_disconnected.json
author:
  homepage: https://zenoh.io/
  name: ZettaScale
  sales_email: contact@zettascale.tech
  support_email: alexander@bushnev.pro
categories:
- ネットワーク
- iot
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/README.md
display_on_public_website: true
draft: false
git_integration_title: zenoh_router
integration_id: zenoh-router
integration_title: Zenoh router
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: zenoh_router
public_title: Zenoh router
short_description: Zenoh ルーターからネットワークメトリクスを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Network
  - Category::IoT
  - Offering::Integration
  - Queried Data Type::Metrics
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Zenoh ルーターからネットワークメトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zenoh router
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは Zenoh ルーターを監視します。

[Zenoh][1] はオープンソースのゼロオーバーヘッドネットワークプロトコルです。

Zenoh (/zeno/) は、移動中のデータ、静止中のデータ、および計算を統合する pub/sub/query プロトコルです。Zenoh は、従来の pub/sub と地理的に分散したストレージ、クエリ、および計算をエレガントに融合し、主流のスタックをはるかに超える時間および空間効率を維持します。

Zenoh ルーターのインテグレーションにより、Datadog でルーターのメトリクスやルーター/ピア/クライアントの接続ステータスを監視できるようになります。

## セットアップ

### Datadog Agent によるインストール (v7.21+ および v6.21+)

Agent v7.21+ / v6.21+ を使用している場合は、以下の手順に従ってホストに Zenoh ルーターチェックをインストールしてください。

1. ホスト上で、以下のコマンドを実行して Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-zenoh_router==<INTEGRATION_VERSION>
   ```

### ソースコードからのインストール

Zenoh ルーターのチェックをホストにインストールするには

1. マシンに[開発ツールキット][2]をインストールします。

2. `ddev release build zenoh_router` を実行してパッケージをビルドします。

3. ビルドアーティファクトを、[Agent がインストールされている][3]任意のホストにアップロードします。

4. ホスト上で、`datadog-agent integration install -w path/to/zenoh_router/dist/<ARTIFACT_NAME>.whl` を実行します。

### 構成

1. [Zenoh REST API プラグイン][4]が有効になっていることを確認してください。

2. Zenoh ルーターの[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `zenoh_router.d/conf.yaml` ファイルを編集します。
使用可能なすべてのコンフィギュレーションオプションについては、[zenoh_router.d/conf.yaml のサンプル][6]を参照してください。

3. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `zenoh_router` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "zenoh-router" >}}


### イベント

Zenoh ルーターには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "zenoh-router" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://zenoh.io/
[2]: https://docs.datadoghq.com/ja/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://zenoh.io/docs/apis/rest/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/datadog_checks/zenoh_router/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/