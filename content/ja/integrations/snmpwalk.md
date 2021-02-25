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
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md'
display_name: Snmpwalk
draft: false
git_integration_title: snmpwalk
guid: a2864821-994c-4ebb-8532-b6879ea9a9ab
integration_id: snmpwalk
integration_title: SNMP walk
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: snmpwalk
public_title: Datadog-SNMP walk インテグレーション
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

SNMP walk チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに SNMP walk チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][1]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-snmpwalk==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. SNMP walk [メトリクス](#メトリクス) を収集するには、[Agent の構成ディレクトリ][6]のルートにある `conf.d/` フォルダーの `snmpwalk.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル snmpwalk.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

## 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションで `snmpwalk` を探します。

## 収集データ

### メトリクス

SNMP walk チェックには、メトリクスは含まれません。

### イベント

SNMP walk チェックには、イベントは含まれません。

### サービスのチェック

**`snmpwalk.can_check`**

チェックは次の内容を返します。

- `snmpwalk` からメトリクスを収集できる場合は `OK`。
- `snmpwalk` からメトリクスを収集するときにエラーを検出した場合は `CRITICAL`。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: http://docs.datadoghq.com/help