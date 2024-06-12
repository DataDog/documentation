---
app_id: bind9
app_uuid: b37533b0-6f0e-4259-9971-083f08086fac
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bind9.nsstat_AuthQryRej
      metadata_path: metadata.csv
      prefix: bind9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10222
    source_type_name: BIND 9
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: ashuvyas45@gmail.com
  support_email: ashuvyas45@gmail.com
categories:
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_on_public_website: true
draft: false
git_integration_title: bind9
integration_id: bind9
integration_title: bind9
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: bind9
public_title: bind9
short_description: bind9 サーバーのメトリクスを収集する Datadog インテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Network
  - Supported OS::macOS
  configuration: README.md#Setup
  description: bind9 サーバーのメトリクスを収集する Datadog インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: bind9
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Bind9 DNS サーバーからメトリクスを取得すると、以下のことができます。

- bind9 統計を視覚化および監視できます。

![スナップ][1]

## 計画と使用

Bind9 チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Bind9 チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-bind9==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Bind9 の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `bind9.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル bind9.d/conf.yaml][6] を参照してください。

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [Agent を再起動します][7]。

### 検証

[Agent の `status` サブコマンドを実行][8]し、Checks セクションで `bind9` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "bind9" >}}


### ヘルプ

bind9 チェックにはイベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "bind9" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help