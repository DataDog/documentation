---
app_id: unbound
app_uuid: 33cd72ba-822b-4a74-92eb-f1240ea71975
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: unbound.time.up
      metadata_path: metadata.csv
      prefix: unbound.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10165
    source_type_name: Unbound
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: david.byron@avast.com
  support_email: david.byron@avast.com
categories:
- キャッシュ
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md
display_on_public_website: true
draft: false
git_integration_title: unbound
integration_id: unbound
integration_title: Unbound
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: unbound
public_title: Unbound
short_description: unbound メトリクスを収集する Datadog インテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: unbound メトリクスを収集する Datadog インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Unbound
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [Unbound][1] を監視します。

unbound サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- unbound の状態を視覚化して監視します。

## 計画と使用

Unbound チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Unbound チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `unbound.d/conf.yaml` ファイルを編集して、
   unbound メトリクスの収集を開始します。
    使用可能なすべての構成オプションの詳細については、[サンプル unbound.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `unbound` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "unbound" >}}


### ヘルプ

Unbound チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "unbound" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unbound/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/