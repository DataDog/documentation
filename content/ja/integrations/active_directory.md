---
app_id: active-directory
app_uuid: e03a0916-8708-4417-82e4-1f0c7bbee655
assets:
  dashboards:
    Active Directory: assets/dashboards/active_directory.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: active_directory.dra.inbound.objects.persec
      metadata_path: metadata.csv
      prefix: active_directory.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10068
    source_type_name: Active Directory
  monitors:
    '[Active Directory] Anomalous number of sessions for connected LDAP clients for host: {{host.name}}': assets/monitors/ldap_client_sessions.json
    '[Active Directory] Anomalous number of successful LDAP bindings for host: {{host.name}}': assets/monitors/ldap_binding_successful.json
    '[Active Directory] Elevated LDAP binding duration for host {{host.name}}': assets/monitors/ldap_binding.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/active_directory/README.md
display_on_public_website: true
draft: false
git_integration_title: active_directory
integration_id: active-directory
integration_title: Active Directory
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: active_directory
public_title: Active Directory
short_description: Microsoft Active Directory のメトリクスを収集してグラフ化
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS とシステム
  configuration: README.md#Setup
  description: Microsoft Active Directory のメトリクスを収集してグラフ化
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Active Directory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Microsoft Active Directory からメトリクスを取得して、パフォーマンスを視覚化および監視します。

## 計画と使用

### インフラストラクチャーリスト

Agent の Active Directory チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

Datadog Agent をドメイン環境にインストールするには、[Agent のインストール要件][2]を参照してください。

### ブラウザトラブルシューティング

#### メトリクスの収集

1. Active Directory のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `active_directory.d/conf.yaml` ファイルを編集します。デフォルトのセットアップでは、ローカルホストのメトリクスが収集されます。使用可能なすべての構成オプションについては、[サンプル active_directory.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

**注**: このチェックのバージョン 1.13.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][6]を参照してください。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションの `active_directory` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "active_directory" >}}


### ヘルプ

Active Directory チェックには、イベントは含まれません。

### ヘルプ

Active Directory チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/7.33.x/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/