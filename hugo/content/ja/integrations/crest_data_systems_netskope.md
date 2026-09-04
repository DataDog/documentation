---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-netskope
app_uuid: d0754e39-56d8-47e0-8c1f-0f217bd1f8e5
assets:
  dashboards:
    Netskope - Alerts: assets/dashboards/crest_data_systems_netskope_alerts.json
    Netskope - Application Events: assets/dashboards/crest_data_systems_netskope_application_events.json
    Netskope - Audit Events: assets/dashboards/crest_data_systems_netskope_audit_events.json
    Netskope - Clients: assets/dashboards/crest_data_systems_netskope_clients.json
    Netskope - Connection Events: assets/dashboards/crest_data_systems_netskope_connection_events.json
    Netskope - Incident Events: assets/dashboards/crest_data_systems_netskope_incident_events.json
    Netskope - Infrastructure Events: assets/dashboards/crest_data_systems_netskope_infrastructure_events.json
    Netskope - Network Events: assets/dashboards/crest_data_systems_netskope_network_events.json
    Netskope - Overview: assets/dashboards/crest_data_systems_netskope_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.netskope.connection_cci.cci
      metadata_path: metadata.csv
      prefix: cds.netskope
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10343
    source_type_name: crest_data_systems_netskope
  logs:
    source: crest_data_systems_netskope
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- data stores
- alerting
- イベント管理
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netskope
integration_id: crest-data-systems-netskope
integration_title: Netskope
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netskope
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems_netskope.volume
  product_id: netskope
  short_description: Netskope のイベント/アラート 100 万件あたり。
  tag: event_tag
  unit_label: 100 万件の Netskope イベント/アラート
  unit_price: 45.0
public_title: Netskope
short_description: Netskope のセキュリティイベントやアラートを監視する
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
  - Category::Alerting
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Netskope のセキュリティイベントやアラートを監視する
  media:
  - caption: Netskope - 概要
    image_url: images/crest_data_systems_netskope_overview.png
    media_type: image
  - caption: Netskope - アラート
    image_url: images/crest_data_systems_netskope_alerts.png
    media_type: image
  - caption: Netskope - アプリケーションイベント
    image_url: images/crest_data_systems_netskope_application_events.png
    media_type: image
  - caption: Netskope - 監査イベント
    image_url: images/crest_data_systems_netskope_audit_events.png
    media_type: image
  - caption: Netskope - 接続イベント
    image_url: images/crest_data_systems_netskope_connection_events.png
    media_type: image
  - caption: Netskope - インシデントイベント
    image_url: images/crest_data_systems_netskope_incident_events.png
    media_type: image
  - caption: Netskope - インフラストラクチャーイベント
    image_url: images/crest_data_systems_netskope_infrastructure_events.png
    media_type: image
  - caption: Netskope - ネットワークイベント
    image_url: images/crest_data_systems_netskope_network_events.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Netskope
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Netskope はクラウドセキュリティプラットフォームで、クラウドベースのアプリケーションやデータを管理し、安全に保護するためのセキュリティソリューションを提供します。いくつかの機能には、クラウドアクセスセキュリティブローカー (CASB)、データ損失防止 (DLP)、脅威保護、Web セキュリティが含まれます。

This integration monitors alerts triggered in Netskope as well as events generated for infrastructure, network, connection, audit, application, and incident. It also helps users visualize the alerts and events generated in Netskope by using various data-rich dashboards available out-of-the-box.

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][11]
- Sales Email: [datadog-sales@crestdata.ai][12]
- Web サイト: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.crestdata.ai/datadog-integrations-readme/Netskope.pdf
[6]: https://docs.datadoghq.com/ja/agent/
[7]: https://docs.netskope.com/en/netskope-help/data-security/real-time-protection/custom-category/rest-api-v2-overview/
[8]: https://docs.netskope.com/en/netskope-help/admin-console/rest-api/rest-api-v1-overview/
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: mailto:datadog.integrations@crestdata.ai
[12]: mailto:datadog-sales@crestdata.ai
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netskope" target="_blank">こちらをクリック</a>してください。
