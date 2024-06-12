---
app_id: sortdb
app_uuid: 02cd7f3d-5394-4d08-8364-35c9d1af1377
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sortdb.stats.total_requests
      metadata_path: metadata.csv
      prefix: sortdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10205
    source_type_name: Sortdb
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: namrata.deshpande4@gmail.com
  support_email: namrata.deshpande4@gmail.com
categories:
- data stores
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sortdb/README.md
display_on_public_website: true
draft: false
git_integration_title: sortdb
integration_id: sortdb
integration_title: Sortdb
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sortdb
public_title: Sortdb
short_description: sortdb の監視を Datadog がサポート
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  configuration: README.md#Setup
  description: sortdb の監視を Datadog がサポート
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sortdb
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Sortdb][1] サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Sortdb 統計を可視化および監視できます。
- Sortdb フェイルオーバーに関する通知を受けることができます。
- 複数インスタンスの健全性をチェックし、統計を取得します。

## 計画と使用

Sortdb チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Sortdb チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-sortdb==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Sortdb の[メトリクス](#メトリクスの収集)を収集するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `sortdb.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル sortdb.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `sortdb` を探します。

## 互換性

SortDB チェックは、すべての主要プラットフォームと互換性があります。

## リアルユーザーモニタリング

### データセキュリティ

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][9] を参照してください。

### ヘルプ
{{< get-service-checks-from-git "sortdb" >}}


## ヘルプ

SortDB チェックには、イベントは含まれません。


[1]: https://github.com/jehiah/sortdb
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/datadog_checks/sortdb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/assets/service_checks.json