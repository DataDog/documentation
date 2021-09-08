---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Active Directory: assets/dashboards/active_directory.json
  logs:
    source: ruby
  metrics_metadata: metadata.csv
  monitors:
    '[Active Directory] Anomalous number of sessions for connected LDAP clients for host: {{host.name}}': assets/monitors/ldap_client_sessions.json
    '[Active Directory] Anomalous number of successful LDAP bindings for host: {{host.name}}': assets/monitors/ldap_binding_successful.json
    '[Active Directory] Elevated LDAP binding duration for host {{host.name}}': assets/monitors/ldap_binding.json
  service_checks: assets/service_checks.json
categories:
  - os & system
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/active_directory/README.md'
description: Microsoft Active Directory のメトリクスを収集してグラフ化
display_name: Active Directory
draft: false
git_integration_title: active_directory
guid: ba667ff3-cf6a-458c-aa4b-1172f33de562
integration_id: active-directory
integration_title: Active Directory
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: active_directory.
metric_to_check: active_directory.dra.inbound.objects.persec
name: active_directory
public_title: Datadog-Active Directory インテグレーション
short_description: Microsoft Active Directory のメトリクスを収集してグラフ化
support: コア
supported_os:
  - windows
---
## 概要

Microsoft Active Directory からメトリクスとログを取得して、パフォーマンスを視覚化および監視します。

## セットアップ

### インストール

Agent の Active Directory チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

Datadog Agent をドメイン環境にインストールするには、[Agent のインストール要件][2]を参照してください。

### コンフィギュレーション

#### メトリクスの収集

1. Active Directory のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `active_directory.d/conf.yaml` ファイルを編集します。デフォルトのセットアップでは、ローカルホストのメトリクスが収集されます。使用可能なすべての構成オプションについては、[サンプル active_directory.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Active Directory のログの収集を開始するには、次のコンフィギュレーションブロックを `active_directory.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: ruby
       service: "<MY_SERVICE>"
   ```

   `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。
   使用可能なすべての構成オプションについては、[サンプル active_directory.d/conf.yaml][4] を参照してください。

3. このインテグレーションは、[Active Directory Module for Ruby][6] を対象としています。この Ruby モジュールを使用していない場合は、`source` の値を `active_directory` に変更し、`path` を環境に合わせて構成してください。

4. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションの `active_directory` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "active_directory" >}}


### イベント

Active Directory チェックには、イベントは含まれません。

### サービスのチェック

Active Directory チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.rubydoc.info/gems/activedirectory/0.9.3
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/