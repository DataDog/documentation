---
app_id: snmpwalk
app_uuid: bc37c561-7ac5-4799-a56b-d85347bc9ff1
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: snmpwalk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Snmpwalk
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- monitoring
- notification
- network
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md
display_on_public_website: true
draft: false
git_integration_title: snmpwalk
integration_id: snmpwalk
integration_title: SNMP walk
integration_version: 1.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: snmpwalk
oauth: {}
public_title: SNMP walk
short_description: snmpwalk の説明
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
  - Category::モニタリング
  - Category::通知
  - Category::ネットワーク
  configuration: README.md#Setup
  description: snmpwalk の説明
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SNMP walk
---



## 概要

SNMP walk サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- SNMP walk の状態を視覚化および監視できます。
- SNMP walk のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

 SNMP walk チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い  SNMP walk チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-snmpwalk==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. SNMP walk [メトリクス](#メトリクス) を収集するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `snmpwalk.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル snmpwalk.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

## 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `snmpwalk` を探します。

## 収集データ

### メトリクス

SNMP walk チェックには、メトリクスは含まれません。

### イベント

SNMP walk チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "snmpwalk" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/assets/service_checks.json
[9]: http://docs.datadoghq.com/help