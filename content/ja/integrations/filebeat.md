---
app_id: filebeat
app_uuid: 50405147-1148-405a-9d81-ea48be4f613b
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: filebeat.registry.unprocessed_bytes
      metadata_path: metadata.csv
      prefix: filebeat.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10127
    source_type_name: Filebeat
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: jean@tripping.com
  support_email: jean@tripping.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/filebeat/README.md
display_on_public_website: true
draft: false
git_integration_title: filebeat
integration_id: filebeat
integration_title: Filebeat
integration_version: 1.3.0
is_public: true
manifest_version: 2.0.0
name: filebeat
public_title: Filebeat
short_description: 軽量ログシッパー
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::OS とシステム
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 軽量ログシッパー
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Filebeat
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Filebeat サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Filebeat の状態を視覚化および監視できます。
- Filebeat のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

Filebeat チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Filebeat チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-filebeat==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Filebeat の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `filebeat.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル filebeat.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

## 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `filebeat` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "filebeat" >}}


### ヘルプ

Filebeat チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "filebeat" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/