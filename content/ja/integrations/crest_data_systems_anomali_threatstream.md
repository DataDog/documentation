---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-anomali-threatstream
app_uuid: 40102d95-f0e5-4028-855d-2a6218913a86
assets:
  dashboards:
    Anomali ThreatStream - Incidents: assets/dashboards/crest_data_systems_anomali_threatstream_incidents.json
    Anomali ThreatStream - Observables: assets/dashboards/crest_data_systems_anomali_threatstream_observables.json
    Anomali ThreatStream - Overview: assets/dashboards/crest_data_systems_anomali_threatstream_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.anomali.threatstream.observables.confidence
      metadata_path: metadata.csv
      prefix: cds.anomali.threatstream
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10375
    source_type_name: crest_data_systems_anomali_threatstream
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: datadog-sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- data stores
- slos
- イベント管理
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_anomali_threatstream
integration_id: crest-data-systems-anomali-threatstream
integration_title: Anomali ThreatStream
integration_version: ''
is_public: true
kind: インテグレーション
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_anomali_threatstream
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: anomali-threatstream
  short_description: Anomali ThreatStream インテグレーションの月額定額料金。
  unit_price: 495.0
public_title: Anomali ThreatStream
short_description: Anomali ThreatStream Observables & Incident ThreatModel イベントの監視
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
  description: Anomali ThreatStream Observables & Incident ThreatModel イベントの監視
  media:
  - caption: Anomali ThreatStream - 概要
    image_url: images/crest_data_systems_anomali_threatstream_overview.png
    media_type: image
  - caption: Anomali ThreatStream - Observables - 1
    image_url: images/crest_data_systems_anomali_threatstream_observables_1.png
    media_type: image
  - caption: Anomali ThreatStream - Observables - 2
    image_url: images/crest_data_systems_anomali_threatstream_observables_2.png
    media_type: image
  - caption: Anomali ThreatStream - Incidents
    image_url: images/crest_data_systems_anomali_threatstream_incidents.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Anomali ThreatStream
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Anomali ThreatStream の脅威インテリジェンス管理は、生データの収集と処理を自動化し、ノイズをフィルターして、セキュリティチームにとって適切で実用的な脅威インテリジェンスに変換します。

Anomali ThreatStream は、アクター、脆弱性、攻撃パターン、マルウェア、インシデントなど、複数の脅威モデルをサポートしています。脅威モデリングとは、構造的な脆弱性や適切なセーフガードの不在など、潜在的な脅威を特定、列挙し、対策の優先順位を決定するプロセスです。

Anomali ThreatStream は、環境内で生成される Observable もサポートしています。Observabl とは、潜在的な脅威を検知するための技術情報の一部です。これらは、インテリジェンスシステム (Anomali ThreatStream) に含まれるすべてのデータから導き出されますが、常にコンテキスト化されているわけではありません。

このインテグレーションは、Anomali ThreatStream でトリガーされた `Observables` と `Incident` 脅威モデルに対して生成されたイベントを監視します。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- サポートメール: [datadog.integrations@crestdatasys.com][5]
- 営業メール: [datadog-sales@crestdatasys.com][6]
- Web サイト: [crestdatasys.com][3]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdatasys.com/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdatasys.com
[6]: mailto:datadog-sales@crestdatasys.com
[7]: https://www.crestdatasys.com/datadog-integrations-readme/Anomali_Threatstream.pdf

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-anomali-threatstream" target="_blank">こちらをクリック</a>してください。