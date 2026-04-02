---
algolia:
  subcategory: Marketplace インテグレーション
app_id: continuous-ai-netsuite
app_uuid: e458cb71-5229-4385-bfb1-0089221ff276
assets:
  dashboards:
    Netsuite Continuous AI Overview: assets/dashboards/netsuite_continuous_ai_overview.json
    Netsuite System, Script, Audit Logs: assets/dashboards/netsuite_continuous_ai_suiteql.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26840441
    source_type_name: Continuous AI NetSuite
author:
  homepage: https://www.continuous-ai.com
  name: Continuous AI
  sales_email: sales@continuous-ai.com
  support_email: support@continuous-ai.com
  vendor_id: continuous-ai
categories:
- ログの収集
- marketplace
- コスト管理
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: continuous_ai_netsuite
integration_id: continuous-ai-netsuite
integration_title: NetSuite
integration_version: ''
is_public: true
legal_terms:
  eula: assets/continuous_ai_netsuite_eula.pdf
manifest_version: 2.0.0
name: continuous_ai_netsuite
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: netsuite
  short_description: NetSuite のログデータ量にかかわらず、定額のサブスクリプション料金。
  unit_price: 299
public_title: NetSuite
short_description: NetSuite の SuiteScript のパフォーマンスとログ記録を監視します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Category::Cost Management
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: NetSuite SuiteScript のパフォーマンスとログの作成を監視します
  media:
  - caption: NetSuite 概要ダッシュボード
    image_url: images/dashboard_overview.png
    media_type: image
  - caption: NetSuite 概要ダッシュボード - パフォーマンス分析
    image_url: images/dashboard_perf.png
    media_type: image
  - caption: NetSuite 概要ダッシュボード - スクリプトトレーシング
    image_url: images/dashboard_exec.png
    media_type: image
  - caption: NetSuite 概要ダッシュボード - 生ログ
    image_url: images/dashboard_raw.png
    media_type: image
  - caption: NetSuite システムログ
    image_url: images/dashboard_suiteql1.png
    media_type: image
  - caption: NetSuite システムログの詳細
    image_url: images/dashboard_suiteql2.png
    media_type: image
  - caption: NetSuite ログイン監査とスクリプトログ
    image_url: images/dashboard_suiteql3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NetSuite
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

NetSuite はクラウドベースの ERP ソフトウェアスイートで、財務管理、顧客関係管理、電子商取引のための統合プラットフォームを企業に提供します。このインテグレーションは、標準機能およびカスタム機能を対象に、NetSuite からメトリクスとログを収集し、レポートします。例えば次のとおりです:

+ 標準およびカスタムの SuiteScript
+ Suitelet および RESTlet
+ スクリプトログ
+ パフォーマンスとスクリプトの実行時間
+ エラーおよび後方互換性のない変更
+ ユーザーアクティビティ

Datadog でこのテレメトリーデータを可視化・監視することで、パフォーマンスの把握や NetSuite スクリプト実行時の問題の特定に役立ちます。

### ダッシュボード

このインテグレーションは、すぐに使える **Continuous AI NetSuite Dashboard** を提供します。このダッシュボードは、Datadog に送信された NetSuite のデータを時系列で表示し、特定の NetSuite アカウント、子会社、部署に絞り込めるテンプレート変数を備えています。

## サポート

サポートまたは機能リクエストについては、以下の方法で Continuous AI にお問い合わせください。

- サポート: [support@continuous-ai.com][2]
- セールス: [sales@continuous-ai.com][4]

### 要件

具体的なご要望をお聞かせください。私たちがお手伝いします。[sales@continuous-ai.com][4] までご連絡ください。

---

私たちは可観測性を大切にしています。Continuous AI。

[1]: https://docs.datadoghq.com/ja/getting_started/agent/
[2]: mailto:support@continuous-ai.com 
[3]: https://system.netsuite.com/pages/customerlogin.jsp?country=US
[4]: mailto:sales@continuous-ai.com
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/continuous-ai-netsuite" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。