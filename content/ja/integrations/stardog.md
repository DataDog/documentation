---
app_id: stardog
app_uuid: a4d874ba-7173-4c43-8cc8-09f966186be8
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: stardog.dbms.memory.native.max
      metadata_path: metadata.csv
      prefix: stardog.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Stardog
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Stardog
  sales_email: support@stardog.com
  support_email: support@stardog.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stardog/README.md
display_on_public_website: true
draft: false
git_integration_title: stardog
integration_id: stardog
integration_title: Stardog
integration_version: 2.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: stardog
public_title: Stardog
short_description: Datadog 用 Stardog データコレクター。
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
  - Category::データストア
  configuration: README.md#Setup
  description: Datadog 用 Stardog データコレクター。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Stardog
---



## 概要

Stardog サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Stardog の状態を視覚化および監視できます。
- Stardog のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Stardog チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Stardog チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-stardog==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Stardog の[メトリクス](#メトリクス) を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `stardog.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル stardog.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

## 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `stardog` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "stardog" >}}


### イベント

Stardog チェックには、イベントは含まれません。

### サービスのチェック

Stardog チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/stardog/datadog_checks/stardog/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/stardog/metadata.csv
[9]: http://docs.datadoghq.com/help