---
app_id: pdh
app_uuid: 75f6813c-934c-4f1a-b8f4-71f9f1911165
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10065
    source_type_name: PDH
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md
display_on_public_website: true
draft: false
git_integration_title: pdh_check
integration_id: pdh
integration_title: PDH Check
integration_version: 2.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: pdh_check
public_title: PDH Check
short_description: Windows のパフォーマンスカウンターを収集およびグラフ化。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS とシステム
  configuration: README.md#Setup
  description: Windows のパフォーマンスカウンターを収集およびグラフ化。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PDH Check
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

**注:** PDH チェックの使用は推奨されません。代わりに [Windows パフォーマンスカウンターチェック][1]を使用してください。

Windows のパフォーマンスカウンターからメトリクスをリアルタイムに取得して、以下のことができます。

- PDH API を使用して Windows のパフォーマンスカウンターを視覚化および監視できます。

## 計画と使用

### インフラストラクチャーリスト

PDH チェックは [Datadog Agent][2] パッケージに含まれています。追加のインストールは必要ありません。

### ブラウザトラブルシューティング

1. Windows のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `pdh_check.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル pdh_check.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンド][6]を実行し、Checks セクションの `pdh_check` を探します。

## リアルユーザーモニタリング

### データセキュリティ

PDH チェックにより収集されたすべてのメトリクスは、[カスタムメトリクス][7]として Datadog に送信できますが、これはお客様への[請求][8]に影響します。

### ヘルプ

PDH チェックには、イベントは含まれません。

### ヘルプ

PDH チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/windows_performance_counters/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[9]: https://docs.datadoghq.com/ja/help/