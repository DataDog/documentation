---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-palo-alto-prisma-cloud-enterprise
app_uuid: 80470a28-fc81-4b4c-8d35-e5287b4edee4
assets:
  dashboards:
    Palo Alto Prisma Cloud Enterprise - Cloud Security Alerts: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_alerts.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Applications: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_applications.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Assets: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_assets.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Audit: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_audit.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Compliances: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_compliances.json
    Palo Alto Prisma Cloud Enterprise - Cloud Security Vulnerabilities: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_vulnerabilities.json
    Palo Alto Prisma Cloud Enterprise - Overview: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_cloud_security_overview.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Compliances: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_compliances.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Containers: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_containers.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Hosts: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_hosts.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Images: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_images.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Packages: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_packages.json
    Palo Alto Prisma Cloud Enterprise - Runtime Security Vulnerabilities: assets/dashboards/crest_data_systems_palo_alto_prisma_cloud_enterprise_runtime_security_vulnerabilities.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cd.palo.alto.prisma.cloud.enterprise.application_stats.newly_discovered_apps
      metadata_path: metadata.csv
      prefix: cd.palo.alto.prisma.cloud.enterprise
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30878647
    source_type_name: crest_data_systems_palo_alto_prisma_cloud_enterprise
  logs:
    source: crest-data-systems-palo-alto-prisma-cloud-enterprise
  monitors:
    Applications with Critical Alerts Detected: assets/monitors/crest_data_systems_applications_with_critical_alerts_detected.json
    Applications with Critical Vulnerabilities Detected: assets/monitors/crest_data_systems_applications_with_critical_vulnerabilities_detected.json
    Total Critical Alerts Exceeds Limit: assets/monitors/crest_data_systems_total_critical_alerts_exceeds_limit.json
    Total Critical Compliances Exceeds Limit: assets/monitors/crest_data_systems_total_critical_compliances_exceeds_limit.json
    Total Open Critical Vulnerabilities Exceeds Limit: assets/monitors/crest_data_systems_total_open_critical_vulnerabilities_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- cloud
- marketplace
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_palo_alto_prisma_cloud_enterprise
integration_id: crest-data-systems-palo-alto-prisma-cloud-enterprise
integration_title: Palo Alto Prisma Cloud Enterprise
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_palo_alto_prisma_cloud_enterprise
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.palo_alto_prisma_cloud_enterprise
  product_id: palo-alto-prisma-cloud-enterprise
  short_description: Prisma Cloud の月間クレジット使用量あたり。
  tag: credit_usage_count
  unit_label: Prisma Cloud Credit Usage
  unit_price: 1.0
public_title: Palo Alto Prisma Cloud Enterprise
short_description: クラウドおよびランタイム セキュリティ向けに、Palo Alto Prisma Cloud のログとメトリクスを監視するインテグレーション。
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
  - Category::Cloud
  - Category::Marketplace
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: クラウドおよびランタイム セキュリティ向けに、Palo Alto Prisma Cloud のログとメトリクスを監視するインテグレーション。
  media:
  - caption: Palo Alto Prisma Cloud Enterprise - Cloud Security Assets
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-assets.png
    media_type: image
  - caption: Palo Alto Prisma Cloud Enterprise - Cloud Security Alerts
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-alerts.png
    media_type: image
  - caption: Palo Alto Prisma Cloud Enterprise - Cloud Security Applications
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-applications.png
    media_type: image
  - caption: Palo Alto Prisma Cloud Enterprise - Cloud Security Audit
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-audit.png
    media_type: image
  - caption: Palo Alto Prisma Cloud Enterprise - Cloud Security Compliances
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-compliances.png
    media_type: image
  - caption: Palo Alto Prisma Cloud Enterprise - Cloud Security Vulnerabilities
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-cloud-security-vulnerabilities.png
    media_type: image
  - caption: Palo Alto Prisma Cloud Enterprise - Overview
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-overview.png
    media_type: image
  - caption: Palo Alto Prisma Cloud Enterprise - Runtime Security Hosts
    image_url: images/crest-data-systems-palo-alto-prisma-cloud-enterprise-runtime-security-hosts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Palo Alto Prisma Cloud Enterprise
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[Palo Alto Prisma Cloud Enterprise][1] は、開発ライフサイクル全体を通じてアプリケーション、データ、そしてクラウド ネイティブ テクノロジー スタック全体を保護するために設計された、包括的なクラウド ネイティブ セキュリティ プラットフォームです。Prisma Cloud は、ハイブリッドおよびマルチ クラウド環境全体にわたる安全なクラウド リソース、ワークロード、アプリケーションに対する可視性と制御を提供します。

このインテグレーションにより、Palo Alto Prisma Cloud のデータを Datadog でログとメトリクスとして収集・可視化できます。 Palo Alto Prisma Cloud の強力なスキャン機能を活用すると、次の内容を確認できます:

- **クラウド セキュリティ**: アセット、アラート、脆弱性、アプリケーション、コンプライアンス、アイデンティティ、監査ログ
- **ランタイム セキュリティ**: ホスト、イメージ、コンテナ、脆弱性、コンプライアンス、パッケージ

### ダッシュボード
このインテグレーションは、すぐに使えるダッシュボードを 13 個提供します。

**Palo Alto Prisma Cloud Enterprise - Overview** ダッシュボードは、Palo Alto Prisma Cloud Enterprise プラットフォームの概要を提供します。クラウド セキュリティのアセット、アラート、脆弱性、アプリケーション、コンプライアンス、アイデンティティ、監査に関する詳細に加えて、ランタイム セキュリティのホスト、イメージ、コンテナ、脆弱性、コンプライアンス、パッケージもカバーします。

その他の利用可能なダッシュボード:

- Palo Alto Prisma Cloud Enterprise - Cloud Security Alerts
- Palo Alto Prisma Cloud Enterprise - Cloud Security Vulnerabilities
- Palo Alto Prisma Cloud Enterprise - Cloud Security Assets
- Palo Alto Prisma Cloud Enterprise - Cloud Security Applications
- Palo Alto Prisma Cloud Enterprise - Cloud Security Compliances
- Palo Alto Prisma Cloud Enterprise - Cloud Security Audit
- Palo Alto Prisma Cloud Enterprise - Runtime Security Vulnerabilities
- Palo Alto Prisma Cloud Enterprise - Runtime Security Hosts
- Palo Alto Prisma Cloud Enterprise - Runtime Security Containers
- Palo Alto Prisma Cloud Enterprise - Runtime Security Images
- Palo Alto Prisma Cloud Enterprise - Runtime Security Compliances
- Palo Alto Prisma Cloud Enterprise - Runtime Security Packages

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][9]
- 営業メール: [datadog-sales@crestdata.ai][10]
- Web サイト: [crestdata.ai][11]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]


[1]: https://www.paloaltonetworks.com/prisma/cloud
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Palo_Alto_Prisma_Cloud_Enterprise.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/
[12]: https://app.ind.prismacloud.io/home/runtime?computeState=%252Fmanage%252Fsystem%252Futilities

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-palo-alto-prisma-cloud-enterprise" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。