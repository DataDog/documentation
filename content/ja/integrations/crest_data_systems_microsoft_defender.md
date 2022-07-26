---
app_id: crest-data-systems-microsoft-defender
app_uuid: 137062cb-83a8-4c46-83e6-7a84efa859ef
assets:
  dashboards:
    Crest Microsoft Defender - Alerts Overview: assets/dashboards/microsoft_defender_alerts_overview.json
    Crest Microsoft Defender - Endpoints Details: assets/dashboards/microsoft_defender_endpoints_details.json
    Crest Microsoft Defender - Endpoints Overview: assets/dashboards/microsoft_defender_endpoints_overview.json
    Crest Microsoft Defender - Incidents Overview: assets/dashboards/microsoft_defender_incidents_overview.json
    Crest Microsoft Defender - Microsoft Defender Integration Overview: assets/dashboards/microsoft_defender_integration_overview.json
    Crest Microsoft Defender - Software Details: assets/dashboards/microsoft_defender_software_details.json
    Crest Microsoft Defender - Software Overview: assets/dashboards/microsoft_defender_software_overview.json
    Crest Microsoft Defender - Threats and Vulnerabilities Overview: assets/dashboards/microsoft_defender_threats_and_vulnerabilities_overview.json
    Crest Microsoft Defender - Vulnerabilities Details: assets/dashboards/microsoft_defender_vulnerabilities_details.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.ms.defender.endpoint.organization_exposure_level
      metadata_path: metadata.csv
      prefix: cds.ms.defender.endpoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: crest_data_systems_microsoft_defender
  monitors:
    '[Crest Data Systems Microsoft Defender] Missing KBs of Endpoint': assets/recommended_monitors/cds_missing_kbs_of_endpoint.json
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- モニタリング
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_microsoft_defender
integration_id: crest-data-systems-microsoft-defender
integration_title: Microsoft Defender
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_microsoft_defender
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.microsoft_defender
  product_id: microsoft-defender
  short_description: Specified cost is per active endpoint per month.
  tag: cds_ms_defender_endpoint_active_endpoint
  unit_label: Microsoft Defender アクティブエンドポイント
  unit_price: 1.0
public_title: Microsoft Defender インテグレーション
short_description: エンドポイント、脆弱性、アラート、インシデントの詳細を提供します
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Monitoring
  - Offering::Integration
  configuration: README.md#Setup
  description: エンドポイント、脆弱性、アラート、インシデントの詳細を提供します
  media:
  - caption: Microsoft Defender インテグレーションの概要
    image_url: images/cds-microsoft-defender-integration-overview.png
    media_type: image
  - caption: Microsoft Defender - エンドポイントの概要
    image_url: images/cds-microsoft-defender-endpoints-overview.png
    media_type: image
  - caption: Microsoft Defender - エンドポイントの詳細
    image_url: images/cds-microsoft-defender-endpoints-details.png
    media_type: image
  - caption: Microsoft Defender - ソフトウェアの概要
    image_url: images/cds-microsoft-defender-software-overview.png
    media_type: image
  - caption: Microsoft Defender - ソフトウェアの詳細
    image_url: images/cds-microsoft-defender-software-details.png
    media_type: image
  - caption: Microsoft Defender - 脅威と脆弱性の概要
    image_url: images/cds-microsoft-defender-threats-and-vulnerabilities-overview.png
    media_type: image
  - caption: Microsoft Defender - アラートの概要
    image_url: images/cds-microsoft-defender-alerts-overview.png
    media_type: image
  - caption: Microsoft Defender - インシデントの概要
    image_url: images/cds-microsoft-defender-incidents-overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Defender インテグレーション
---



## 概要

このインテグレーションは、Microsoft 365 Defender for Endpoint プラットフォームから、エンドポイントの詳細、脆弱性、アラート、インシデントを収集します。また、エンドポイント上の KB の欠落に関する情報も提供します。このインテグレーションは、エンドポイント上の KB の欠落を警告するためのさまざまなすぐに使えるダッシュボードとモニターを提供します。

### アラート設定

 - エンドポイントの欠落 KB

### ダッシュボード  

 - Microsoft Defender エンドポイントの概要
 - エンドポイントの概要
 - アラートの概要
 - 脅威と脆弱性の概要
 - ソフトウェアの概要
 - インシデントの概要

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

 - メール: datadog.integrations@crestdatasys.com