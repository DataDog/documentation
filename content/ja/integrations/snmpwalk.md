---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
- notification
- network
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md
display_name: Snmpwalk
draft: false
git_integration_title: snmpwalk
guid: a2864821-994c-4ebb-8532-b6879ea9a9ab
integration_id: snmpwalk
integration_title: SNMP walk
integration_version: 1.0.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: snmpwalk
public_title: SNMP walk
short_description: snmpwalk の説明
support: contrib
supported_os:
- linux
- mac_os
- windows
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