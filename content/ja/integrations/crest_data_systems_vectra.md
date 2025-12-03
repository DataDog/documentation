---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-vectra
app_uuid: e54f4b47-79b9-4b3c-9788-5716764c0bce
assets:
  dashboards:
    Vectra Cloud - Detection Events: assets/dashboards/crest_data_systems_vectra_detection_events.json
    Vectra Cloud - Detections: assets/dashboards/crest_data_systems_vectra_detections.json
    Vectra Cloud - Entities: assets/dashboards/crest_data_systems_vectra_entities.json
    Vectra Cloud - Entity Events: assets/dashboards/crest_data_systems_vectra_entity_events.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.crest_data_systems.vectra
      metadata_path: metadata.csv
      prefix: crest_data_systems
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28455858
    source_type_name: crest_data_systems_vectra
  logs:
    source: crest-data-systems-vectra
  monitors:
    Total Threat Detections Exceeds Limit: assets/monitors/crest_data_systems_total_threat_detections_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- クラウド
- marketplace
- ログの収集
- security
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_vectra
integration_id: crest-data-systems-vectra
integration_title: Vectra Cloud
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_vectra
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.vectra
  product_id: vectra
  short_description: Vectra Cloud エンティティ 1 件あたり / 月
  tag: entity_id
  unit_label: Vectra Cloud エンティティ
  unit_price: 1.0
public_title: Vectra Cloud
short_description: Vectra Cloud からエンティティ、検出、エンティティ イベント、検出イベントのログを収集します。
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
  configuration: README.md#Setup
  description: Vectra Cloud からエンティティ、検出、エンティティイベント、検出イベントのログを収集します。
  media:
  - caption: Vectra Cloud - エンティティ
    image_url: images/crest_data_systems_vectra_entities.png
    media_type: image
  - caption: Vectra Cloud - 検出
    image_url: images/crest_data_systems_vectra_detections.png
    media_type: image
  - caption: Vectra Cloud - エンティティ イベント
    image_url: images/crest_data_systems_vectra_entity_events.png
    media_type: image
  - caption: Vectra Cloud - 検出イベント
    image_url: images/crest_data_systems_vectra_detection_events.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Vectra Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Vectra AI Inc (Vectra AI) は、脅威の検知と対応ソリューションを含むサイバー セキュリティ ソリューションのプロバイダーです。また、クラウド セキュリティ、ランサムウェアの検出、リモート ワーク拠点の安全確保、脅威の探索と調査に加えて、調査サービスやリスクおよびコンプライアンス関連のサービスも提供しています。

このインテグレーションは、以下の種類のデータについてログを収集します。

* エンティティ
* Detections
* エンティティ イベント
* 検出イベント

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート: [datadog.integrations@crestdata.ai][5]
- セールス: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][10]


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Vectra.pdf
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-vectra" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。