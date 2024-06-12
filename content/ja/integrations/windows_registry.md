---
app_id: windows-registry
app_uuid: cc166a5c-6742-4811-b3e1-93dbec0ac5b2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8444609
    source_type_name: windows-registry
author:
  homepage: https://www.datadoghq.com
  name: Ruby
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_registry/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_registry
integration_id: windows-registry
integration_title: Windows レジストリ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: windows_registry
public_title: Windows レジストリ
short_description: Windows ホストでレジストリキーの変更を監視します。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  configuration: README.md#Setup
  description: Windows ホストでレジストリキーの変更を監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Windows レジストリ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Windows レジストリキーの変更を監視し、Datadog に転送します。このインテグレーションを有効にすることで、以下のことが可能になります。

- Windows レジストリの値を通じて、システムとアプリケーションレベルの健全性と状態を把握する。
- セキュリティおよびコンプライアンス要件に影響を与える予期せぬ変更を監視する。

## 計画と使用

### インフラストラクチャーリスト

Windows レジストリインテグレーションは、[Datadog Agent][1] パッケージに含まれています。追加のインストールは必要ありません。

### ブラウザトラブルシューティング

このインテグレーションは、次の両方の方法を使用して Windows レジストリ情報を収集し、レポートします。

- [Datadog メトリクス][2]として
- [Datadog ログ][3]として


1. Agent の[構成ディレクトリ][4]の root にある `conf.d/` フォルダ内の `windows_registry.d/conf.yaml` ファイルを編集して、Windows レジストリ情報の収集を開始します。利用可能なすべての構成オプションについては、[windows_registry.d/conf.yaml のサンプル][5]を参照してください。

2. レジストリの値や変更をログとして送信するには、Datadog Agent でログ収集を有効にする必要があります。ログ収集を有効にするには、`datadog.yaml` ファイルに以下を追加します。

    ```yaml
    logs_enabled: true
    ```

3. [Agent を再起動します][6]。


### 検証

Datadog Agent Manager の情報ページを確認するか、Agent の `status` [サブコマンド][7]を実行し、**Checks** セクションで `windows_registry` を探します。

## リアルユーザーモニタリング

### データセキュリティ

Windows レジストリインテグレーションにより収集されたすべてのメトリクスは、[カスタムメトリクス][11]として Datadog に送信できますが、これはお客様への請求に影響します。

### ワークフローの自動化

Windows レジストリのインテグレーションによって収集されたログはすべて Datadog に転送され、[ログの請求][8]の対象となります。

### ヘルプ

Windows レジストリインテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ヘルプが必要ですか？[Datadog サポート][9]に [Agent Flare][10] でお問い合わせください。

[10]:https://docs.datadoghq.com/ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[11]:https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/?tab=countrate
[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://docs.datadoghq.com/ja/metrics/#overview
[3]: https://docs.datadoghq.com/ja/logs/
[4]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/windows_registry.d/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/?tab=gui#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/account_management/billing/log_management/
[9]: https://docs.datadoghq.com/ja/help/