---
app_id: crest-data-systems-netskope
app_uuid: d0754e39-56d8-47e0-8c1f-0f217bd1f8e5
assets:
  dashboards:
    Netskope - Alerts: assets/dashboards/crest_data_systems_netskope_alerts.json
    Netskope - Application Events: assets/dashboards/crest_data_systems_netskope_application_events.json
    Netskope - Audit Events: assets/dashboards/crest_data_systems_netskope_audit_events.json
    Netskope - Connection Events: assets/dashboards/crest_data_systems_netskope_connection_events.json
    Netskope - Incident Events: assets/dashboards/crest_data_systems_netskope_incident_events.json
    Netskope - Infrastructure Events: assets/dashboards/crest_data_systems_netskope_infrastructure_events.json
    Netskope - Network Events: assets/dashboards/crest_data_systems_netskope_network_events.json
    Netskope - Overview: assets/dashboards/crest_data_systems_netskope_overview.json
  integration:
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
    source_type_name: crest_data_systems_netskope
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- data store
- アラート設定
- event management
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netskope
integration_id: crest-data-systems-netskope
integration_title: Netskope
integration_version: ''
is_public: true
custom_kind: integration
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
  - Category::Data Store
  - Category::Alerting
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
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



## 概要

Netskope はクラウドセキュリティプラットフォームで、クラウドベースのアプリケーションやデータを管理し、安全に保護するためのセキュリティソリューションを提供します。いくつかの機能には、クラウドアクセスセキュリティブローカー (CASB)、データ損失防止 (DLP)、脅威保護、Web セキュリティが含まれます。

このインテグレーションは、Netskope でトリガーされたアラート、およびインフラストラクチャー、ネットワーク、接続、監査、アプリケーション、インシデントに対して発生したイベントを監視します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- サポートメール: datadog.integrations@crestdatasys.com
- 営業メール: sales@crestdatasys.com
- Web サイト: [crestdatasys.com][3]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdatasys.com/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netskope" target="_blank">こちらをクリック</a>してください。