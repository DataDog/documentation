---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-microsoft-defender
app_uuid: 137062cb-83a8-4c46-83e6-7a84efa859ef
assets:
  dashboards:
    CDS Microsoft 365 Defender - Alerts: assets/dashboards/cds_ms_365_defender_alerts_overview.json
    CDS Microsoft 365 Defender - Cloud App Events: assets/dashboards/cds_ms_365_defender_cloudapp.json
    CDS Microsoft 365 Defender - Email Events: assets/dashboards/cds_ms_365_defender_emails.json
    CDS Microsoft 365 Defender - Endpoint Software: assets/dashboards/cds_ms_365_defender_software_overview.json
    CDS Microsoft 365 Defender - Endpoint Threats and Vulnerabilities: assets/dashboards/cds_ms_365_defender_threats_and_vulnerabilities_overview.json
    CDS Microsoft 365 Defender - Endpoints: assets/dashboards/cds_ms_365_defender_endpoints.json
    CDS Microsoft 365 Defender - Identity: assets/dashboards/cds_ms_365_defender_identities.json
    CDS Microsoft 365 Defender - Incidents: assets/dashboards/cds_ms_365_defender_incidents_overview.json
    CDS Microsoft 365 Defender - Investigations: assets/dashboards/cds_ms_365_defender_investigations.json
    CDS Microsoft 365 Defender - Overview: assets/dashboards/cds_ms_365_defender_overview.json
    CDS Microsoft 365 Defender - Secure Score Control Profile: assets/dashboards/cds_ms_365_defender_securescore_controlprofile.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - cds.ms.defender.endpoint.organization_exposure_level
      - cds.ms.365.defender.organization_exposure_level
      metadata_path: metadata.csv
      prefix: cds.ms.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10263
    source_type_name: crest_data_systems_microsoft_defender
  monitors:
    Missing KBs of Endpoint: assets/monitors/cds_missing_kbs_of_endpoint.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- インシデント
- マーケットプレイス
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_microsoft_defender
integration_id: crest-data-systems-microsoft-defender
integration_title: Microsoft 365 Defender
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_microsoft_defender
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.microsoft_defender
  product_id: microsoft-defender
  short_description: 指定されたコストは、アクティブなエンドポイント/ユーザーあたりの月額です。
  tag: cds_ms_defender_endpoint_active_endpoint
  unit_label: Microsoft 365 Defender アクティブエンドポイント/ユーザー
  unit_price: 1.0
public_title: Microsoft 365 Defender
short_description: エンドポイント、脆弱性、アラート、インシデントの詳細を提供します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: エンドポイント、脆弱性、アラート、インシデントの詳細を提供します
  media:
  - caption: CDS Microsoft 365 Defender - エンドポイント
    image_url: images/cds_ms_365_defender_endpoints.png
    media_type: image
  - caption: CDS Microsoft 365 Defender- エンドポイントソフトウェア
    image_url: images/cds_ms_365_defender_software.png
    media_type: image
  - caption: CDS Microsoft 365 Defender - エンドポイントの脅威と脆弱性
    image_url: images/cds_ms_365_defender_vulnerability.png
    media_type: image
  - caption: CDS Microsoft 365 Defender - アラート
    image_url: images/cds_ms_365_defender_alerts.png
    media_type: image
  - caption: CDS Microsoft 365 Defender - インシデント
    image_url: images/cds_ms_365_defender_incidents.png
    media_type: image
  - caption: CDS Microsoft 365 Defender - メールイベント
    image_url: images/cds_ms_365_defender_emails.png
    media_type: image
  - caption: CDS Microsoft 365 Defender - クラウドアプリイベント
    image_url: images/cds_ms_365_defender_cloudapp.png
    media_type: image
  - caption: CDS Microsoft 365 Defender - アイデンティティ
    image_url: images/cds_ms_365_defender_identity.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft 365 Defender
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Microsoft 365 Defender は、エンドポイント、アイデンティティ、メール、アプリケーション全体で検出、防止、調査、対応をネイティブに連携させ、高度な攻撃に対する統合的な保護を提供する、侵入前後の統合エンタープライズ防御スイートです。

このインテグレーションは、アラート、インシデント、エンドポイント、アイデンティティ、メール、セキュリティスコア、セキュアスコアコントロールプロファイル、ソフトウェア、脆弱性、調査のログデータを Microsoft 365 Defender から収集します。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][9]
- 営業メール: [datadog-sales@crestdata.ai][10]
- Web サイト: [crestdata.ai][4]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][2]

[1]: https://docs.crestdata.ai/datadog-integrations-readme/Microsoft_365_defender.pdf
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[3]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[4]: https://www.crestdata.ai/microsoft-365-defender-integration/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://docs.crestdata.ai/datadog-integrations-readme/datadog_ms_defender_365_script.pdf
[12]: https://github.com/crestdatasystems/datadog-crest_data_microsoft_defender/blob/master/azure_app_registrator.py
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-microsoft-defender" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。