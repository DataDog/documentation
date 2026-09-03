---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-upguard
app_uuid: e3923c3d-cfbe-4de6-8933-eaa6bc4df7b2
assets:
  dashboards:
    UpGuard: assets/dashboards/crest_data_systems_upguard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.upguard.organization.score_overall
      metadata_path: metadata.csv
      prefix: cds.upguard
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35272816
    source_type_name: crest_data_systems_upguard
  monitors:
    Critical risk detected: assets/monitors/crest_data_systems_critical_risk_detected.json
    Critical vulnerability detected: assets/monitors/crest_data_systems_critical_vulnerability_detected.json
    Domain score dropped below 600: assets/monitors/crest_data_systems_domain_score_dropped_below_600.json
    Exploited vulnerability detected: assets/monitors/crest_data_systems_known_exploited_vulnerability.json
    Identity breach detected: assets/monitors/crest_data_systems_identity_breach_vip_email.json
    Organization's Score dropped below 600: assets/monitors/crest_data_systems_organization_score_dropped_below_600.json
    Vendor score dropped below 600: assets/monitors/crest_data_systems_vendor_score_dropped_below_600.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- network
- log collection
- metrics
- issue tracking
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_upguard
integration_id: crest-data-systems-upguard
integration_title: UpGuard
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_upguard
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: upguard
  short_description: 月額の定額料金。
  unit_price: 195.0
public_title: UpGuard
short_description: UpGuard BreachSight が提供する、自社向けセキュリティ レーティングのインサイト
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
  - Category::Network
  - Category::Log Collection
  - Category::Metrics
  - Category::Issue Tracking
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: UpGuard BreachSight が提供する、自社向けセキュリティ レーティングのインサイト
  media:
  - caption: UpGuard - Organization Overview
    image_url: images/crest_data_systems_upguard_1.png
    media_type: image
  - caption: UpGuard - IPs and Vulnerabilities
    image_url: images/crest_data_systems_upguard_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: UpGuard
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[**UpGuard**][1] は、自社およびサードパーティのリスクを監視するためのソフトウェア ソリューションです。脆弱性検出、セキュリティ レーティング、侵害検知、コンプライアンス モニタリングを提供し、IT インフラを保護します。継続的なリスク アセスメントと自動アラートにより、UpGuard は脅威を先回りして低減できるよう支援します。

このインテグレーションを使うと、セキュリティ態勢を継続的に監視し、データ露出や漏えいした認証情報を検出できます。また、このインテグレーションにより、Datadog で **侵害リスク データ** をメトリクスとして、**監査ログ** をログとして収集できます。

### ダッシュボード
このインテグレーションには、**すぐに使えるダッシュボードが 1 つ**含まれます:

1. **UpGuard**: 自社のセキュリティ スコアやリスク、ドメイン、IP、脆弱性、侵害、タイポスクワッティング、ベンダー サマリを監視・可視化します。さらに、重要な監査アクティビティを表示する **Notifications** セクションも含まれています。


## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][10]
- 営業メール: [datadog-sales@crestdata.ai][11]
- Web サイト: [crestdata.ai][12]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]


[1]: https://www.UpGuard.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/UpGuard.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://cyber-risk.upguard.com/settings/orgApi
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: mailto:datadog.integrations@crestdata.ai
[11]: mailto:datadog-sales@crestdata.ai
[12]: https://www.crestdata.ai/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-upguard" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。