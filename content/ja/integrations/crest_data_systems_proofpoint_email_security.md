---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-proofpoint-email-security
app_uuid: 4e419332-b689-486b-ae36-09abecd41a9e
assets:
  dashboards:
    Crest Proofpoint - Isolation Dashboard: assets/dashboards/cds_proofpoint_isolation.json
    Crest Proofpoint - TAP Dashboard: assets/dashboards/cds_proofpoint_tap.json
    Crest Proofpoint On Demand - Email Security: assets/dashboards/cds_proofpoint_on_demand_email_security.json
    Crest Proofpoint On Demand - TLS Overview: assets/dashboards/cds_proofpoint_on_demand_tls_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.proofpoint.tap.messages_blocked.spamScore
      metadata_path: metadata.csv
      prefix: cds.proofpoint
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10379
    source_type_name: crest_data_systems_proofpoint_email_security
  monitors:
    Proofpoint Email Security Service Check Monitor: assets/monitors/cds_service_check_monitor.json
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- data stores
- イベント管理
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_proofpoint_email_security
integration_id: crest-data-systems-proofpoint-email-security
integration_title: Proofpoint Email Security
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_proofpoint_email_security
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems_proofpoint_email_security
  product_id: proofpoint-email-security
  short_description: Proofpoint 登録ユーザー 1 人あたり
  tag: webhooks-integration
  unit_label: Proofpoint 登録ユーザー
  unit_price: 1.0
public_title: Proofpoint Email Security
short_description: Proofpoint TAP、Proofpoint On-Demand、および Proofpoint Isolation を監視します
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
  - Category::Data Stores
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Proofpoint TAP、Proofpoint On-Demand、および Proofpoint Isolation を監視します
  media:
  - caption: Crest Proofpoint - TAP ダッシュボード
    image_url: images/crest_data_systems_proofpoint_tap_1.png
    media_type: image
  - caption: Crest Proofpoint - TAP ダッシュボード
    image_url: images/crest_data_systems_proofpoint_tap_2.png
    media_type: image
  - caption: Crest Proofpoint On Demand - Email Security
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_1.png
    media_type: image
  - caption: Crest Proofpoint On Demand - Email Security
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_2.png
    media_type: image
  - caption: Crest Proofpoint On Demand - Email Security
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_3.png
    media_type: image
  - caption: Crest Proofpoint On Demand - TLS 概要
    image_url: images/crest_data_systems_proofpoint_on_demand_tls_1.png
    media_type: image
  - caption: Crest Proofpoint On Demand - TLS 概要
    image_url: images/crest_data_systems_proofpoint_on_demand_tls_2.png
    media_type: image
  - caption: Crest Proofpoint - Isolation
    image_url: images/crest_data_systems_proofpoint_isolation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Proofpoint Email Security
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Proofpoint のメール セキュリティ連携は、[Proofpoint TAP][7]、[Proofpoint on Demand][8]、および [Proofpoint Isolation][9] を監視して可視化します。

### Proofpoint Targeted Attack Protection (TAP)

**Proofpoint Targeted Attack Protection (TAP)**は、今日の進化するセキュリティ環境における標的型攻撃から組織を守るために設計された高度な脅威対策ソリューションです。TAP は、高度なテクノロジー、脅威インテリジェンス、リアルタイム分析を組み合わせることで、高度なマルウェア、フィッシング攻撃、ソーシャルエンジニアリング手法など、メールベースの脅威に対する包括的な保護を提供します。また、メールを通じて人々を狙う高度な脅威の検出、軽減、ブロックも支援します。このソリューションは、悪意のある添付ファイルや URL を使用してマルウェアをインストールしたり、ユーザーを騙してパスワードやその他の機密情報を共有させたりする攻撃を検出します。

### Proofpoint on Demand

**Proofpoint on Demand** は、様々なサイバー脅威から企業を守るために設計された包括的なクラウドベースのサイバーセキュリティプラットフォームです。メールセキュリティ、脅威インテリジェンス、情報保護、コンプライアンスソリューションなど、多様なサービスを提供しています。これにより、十分な情報に基づいた意思決定を行い、全体的なセキュリティ態勢を強化するために必要な措置を講じることができます。さらに、このアプリは通信の暗号化ステータスに関する洞察に満ちた詳細を提供し、データ保護対策の理解をさらに深めます。

#### Proofpoint on Demand の主な機能

* **メールトラフィックの監視:** メッセージの流れを監視し、スパム、フィッシング、その他のメール関連の脅威を未然に特定・防止します。
* **コンプライアンス監視:** データ損失防止 (DLP)、ドメインベースのメッセージ認証、報告、および適合性 (DMARC)、およびその他の適用可能なガイドラインなどの内部ポリシーおよび外部規制の遵守を確認するためにメール通信を監視します。
* **インシデント調査:** メールセキュリティとコンプライアンスデータを活用し、潜在的なセキュリティインシデントを徹底的に調査します。これには、セキュリティ脅威の起源を追跡し、その影響を評価することが含まれます。
* **ユーザーの行動監視:** 内部脅威や不正アクセスの兆候を検出するために、メールに関連する行動を注視します。

### Proofpoint Isolation

**Proofpoint Isolation** は、潜在的に悪意のあるコンテンツを隔離し、ユーザーを保護することでサイバー セキュリティを強化するよう設計されています。主な目的は、ユーザーが危険または疑わしいコンテンツと直接やり取りすることを防ぎ、サイバー 脅威のリスクを低減することです。

このインテグレーションは、以下を監視します。
- Proofpoint TAP サーバーで処理される `Messages Blocked and Delivered` と `Clicks Blocked and Permitted`。
- Proofpoint on Demand Log Service をソースとして使用し、セキュアな WebSocket (WSS) プロトコルを利用したメッセージデータタイプ。
- Proofpoint Isolation サーバーでのユーザーのウェブ ブラウジングおよびメール アクティビティ。


## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][5]
- 営業メール: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 統合 FAQ][14]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.proofpoint.com/us/products/advanced-threat-protection/targeted-attack-protection
[8]: https://www.proofpoint.com/us/products/email-security-and-protection/email-protection
[9]: https://www.proofpoint.com/us/products/cloud-security/isolation
[10]: https://proofpointisolation.com
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Proofpoint_Email_Security.pdf
[12]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[13]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[14]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-proofpoint-email-security" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。