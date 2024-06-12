---
app_id: gnatsd
app_uuid: 91ef7414-0d7b-4ccd-b1a0-d23ef8b6780f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gnatsd.connz.connections.in_bytes
      metadata_path: metadata.csv
      prefix: gnatsd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10234
    source_type_name: Gnatsd
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: dev@goldstar.com
  support_email: dev@goldstar.com
categories:
- message queues
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gnatsd/README.md
display_on_public_website: true
draft: false
git_integration_title: gnatsd
integration_id: gnatsd
integration_title: Gnatsd
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: gnatsd
public_title: Gnatsd
short_description: Datadog で gnatsd クラスターを監視。
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
  - Category::Message Queues
  - Category::Notifications
  configuration: README.md#Setup
  description: Datadog で gnatsd クラスターを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gnatsd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Gnatsd サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Gnatsd の状態を視覚化および監視できます。
- Gnatsd のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

Gnatsd チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Gnatsd チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2
]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-gnatsd==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Gnatsd [メトリクス](#メトリクス)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーで `gnatsd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gnatsd.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `gnatsd` を探します。

## 互換性

gnatsd チェックは、すべての主要プラットフォームと互換性があります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "gnatsd" >}}


**注**: カスタム Nats クラスター名を使用する場合、メトリクスは次のようになります。
`gnatsd.connz.connections.cluster_name.in_msgs`

### ヘルプ

gnatsd チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "gnatsd" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/