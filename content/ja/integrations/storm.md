---
app_id: storm
app_uuid: a3c93ee5-077d-467d-87d7-a2325bdcf782
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: storm.bolt.last_60.acked
      metadata_path: metadata.csv
      prefix: storm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: storm
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/storm/README.md
display_on_public_website: true
draft: false
git_integration_title: storm
integration_id: storm
integration_title: Storm
integration_version: 1.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: storm
public_title: Storm
short_description: Apache Storm 1.x.x トポロジー実行統計
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Category::Event Management
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Apache Storm 1.x.x トポロジー実行統計
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Storm
---



## 概要

Storm サービスからリアルタイムにメトリクスを取得して、以下のことができます。

- Storm のクラスターメトリクスとトポロジーメトリクスを視覚化して監視できます。
- Storm のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Storm チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Storm チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-storm==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Storm の[メトリクス](#メトリクス) を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `storm.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル storm.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

## 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `storm` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "storm" >}}


### イベント

Storm チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "storm" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/storm/assets/service_checks.json
[10]: http://docs.datadoghq.com/help