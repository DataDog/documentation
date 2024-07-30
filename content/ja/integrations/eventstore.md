---
app_id: eventstore
app_uuid: b0c2527f-671e-4a98-aa74-807d7f1826e3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: eventstore.proc.mem
      metadata_path: metadata.csv
      prefix: eventstore.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10221
    source_type_name: Eventstore
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- キャッシュ
- data stores
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md
display_on_public_website: true
draft: false
git_integration_title: eventstore
integration_id: eventstore
integration_title: Eventstore
integration_version: 2.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: eventstore
public_title: Eventstore
short_description: Eventstore のメトリクスを収集
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Eventstore のメトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Eventstore
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

EventStore からメトリクスをリアルタイムに取得して、以下のことができます。

* EventStore のキューを視覚化および監視できます。
* 以下の API エンドポイントで、使用可能なすべてのメトリクスをキャプチャします。統計、ノード情報、非過渡的な予測、サブスクリプション、クラスターゴシップ（スクレープするエンドポイントのリストは構成できます）

## 計画と使用

EventStore チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い EventStore チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. EventStore の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `eventstore.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル eventstore.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `eventstore` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "eventstore" >}}


### ヘルプ

eventstore チェックには、イベントは含まれません。

### ヘルプ

eventstore チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、このインテグレーションの[メインテナー][9]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json