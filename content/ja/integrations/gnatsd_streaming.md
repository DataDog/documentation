---
app_id: gnatsd-streaming
app_uuid: 264e486e-d704-4851-987a-d33c11036521
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: gnatsd.streaming.serverz.clients
      metadata_path: metadata.csv
      prefix: gnatsd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10235
    source_type_name: Gnatsd streaming
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: dev@goldstar.com
  support_email: dev@goldstar.com
categories:
- network
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md
display_on_public_website: true
draft: false
git_integration_title: gnatsd_streaming
integration_id: gnatsd-streaming
integration_title: Gnatsd Streaming
integration_version: 1.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: gnatsd_streaming
public_title: Gnatsd Streaming
short_description: NATS サーバーストリーミング
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::ネットワーク
  - Supported OS::macOS
  configuration: README.md#Setup
  description: NATS サーバーストリーミング
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gnatsd Streaming
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

gnatsd_streaming サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- gnatsd_streaming の状態を視覚化および監視できます。
- gnatsd_streaming のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

gnatsd_streaming チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い gnatsd_streaming チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-gnatsd_streaming==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. GnatsD のストリーミング[メトリクス](#metric)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `gnatsd_streaming.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル gnatsd_streaming.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `gnatsd_streaming` を探します。

## 互換性

gnatsd_streaming チェックは、すべての主要プラットフォームと互換性があります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "gnatsd_streaming" >}}


Nats ストリーミングサーバーのメトリクスは、"nss-cluster_id" のような名前でタグ付けされます。

### ヘルプ

Nats ストリーミングサーバーをフォールトトレラントグループ内で実行している場合、サーバーのステータスが `FT_STANDBY` と `FT_ACTIVE` の間で切り替わると、Nats ストリーミングフェイルオーバーイベントが発行されます。

### ヘルプ
{{< get-service-checks-from-git "gnatsd_streaming" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/assets/service_checks.json
[10]: http://docs.datadoghq.com/help