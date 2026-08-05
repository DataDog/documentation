---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-cofense-triage
app_uuid: 186de352-c901-4479-aa8b-429e99210856
assets:
  dashboards:
    Cofense Triage - Executive Summary: assets/dashboards/crest_data_systems_cofense_triage_executive_summary.json
    Cofense Triage - Overview: assets/dashboards/crest_data_systems_cofense_triage_overview.json
    Cofense Triage - Reporting Output: assets/dashboards/crest_data_systems_cofense_triage_reporting_output.json
    Cofense Triage - System Status: assets/dashboards/crest_data_systems_cofense_triage_system_status.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.cofense_triage.health.cpu_usage_percent
      metadata_path: metadata.csv
      prefix: cds.cofense_triage
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33375357
    source_type_name: crest_data_systems_cofense_triage
  logs:
    source: crest-data-systems-cofense-triage
  monitors:
    Cofense Triage - CPU Usage Monitor: assets/monitors/crest_data_systems_cofense_triage_cpu_usage_monitor.json
    Cofense Triage - Free Memory Available: assets/monitors/crest_data_systems_cofense_triage_memory_available.json
    Cofense Triage - Partition Usage Monitor: assets/monitors/crest_data_systems_cofense_triage_partition_usage_monitor.json
    Cofense Triage - System Status Monitor: assets/monitors/crest_data_systems_cofense_triage_system_status.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- ログの収集
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cofense_triage
integration_id: crest-data-systems-cofense-triage
integration_title: Cofense Triage
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cofense_triage
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cofense_triage
  product_id: cofense-triage
  short_description: Cofense Triage ホストあたり
  tag: cds_cofense_triage_host
  unit_label: Cofense Triage ホスト
  unit_price: 95.0
public_title: Cofense Triage
short_description: Datadog で Cofense Triage のフィッシング インシデントを監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Datadog で Cofense Triage のフィッシング インシデントを監視
  media:
  - caption: Cofense Triage - Overview
    image_url: images/crest-data-systems-cofense-triage-overview.png
    media_type: image
  - caption: Cofense Triage - System Status
    image_url: images/crest-data-systems-cofense-triage-system-status.png
    media_type: image
  - caption: Cofense Triage - Executive Summary
    image_url: images/crest-data-systems-cofense-triage-executive-summary.png
    media_type: image
  - caption: Cofense Triage - Reporting Output
    image_url: images/crest-data-systems-cofense-triage-reporting-output.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cofense Triage
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Cofense Triage は、ユーザーからの報告データを活用して、フィッシング メールの検出・分析・対応を自動化するフィッシング 脅威管理プラットフォームです。このインテグレーションは、Datadog 内で Cofense Triage によって特定されたフィッシング インシデントをリアルタイムに可視化し、迅速かつ連携した対応を可能にすることで、セキュリティ ワークフローを強化します。

このインテグレーションは、以下を収集します:

### メトリクス

- ステータス
- エグゼクティブ サマリー

### ログ

- レポート
- 脅威インジケーター
- URL
- ドメイン
- 添付ファイル
- 添付ファイルのペイロード
- クラスター
- ヘッダー
- ホスト名
- プレイブック
- ルール
- カテゴリ
- コメント
- アイデンティティ プロバイダー
- インテグレーション
- 動的レポート出力

### イベント

- 認証
- 構成の検証


### ダッシュボード

このインテグレーションには、すぐに使える次のダッシュボードが含まれます:

1. **Status**: Cofense Triage サーバーの CPU 使用率やパーティション使用率を含む、システム ステータス情報を提供します。
2. **Executive Summary**: Cofense Triage のレポーティング データのサマリーを提供します。
3. **Reporting Output**: レポートとそれに対応するデータで構成された、詳細なレポート出力を表示します。
4. **Overview**: 上記の各ダッシュボードから厳選した詳細を含みます。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][1]
- 営業メール: [datadog-sales@crestdata.ai][2]
- Web サイト: [crestdata.ai][3]
- FAQ: [Crest Data の Datadog Marketplace 統合に関する FAQ][10]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: mailto:datadog.integrations@crestdata.ai
[2]: mailto:datadog-sales@crestdata.ai
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[10]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: https://www.crestdatasys.com/datadog-integrations-readme/Cofense_Triage.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cofense-triage" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。