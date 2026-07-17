---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-dataminr
app_uuid: 67cf1858-6c79-4c78-82a6-2971c750197e
assets:
  dashboards:
    'Dataminr : Alerts': assets/dashboards/crest_data_systems_dataminr_alerts.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: ''
      metadata_path: metadata.csv
      prefix: ''
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 29480493
    source_type_name: crest_data_systems_dataminr
  logs:
    source: crest_data_systems_dataminr
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- ネットワーク
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_dataminr
integration_id: crest-data-systems-dataminr
integration_title: Dataminr
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_dataminr
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: dataminr
  short_description: Dataminr インテグレーションの月額定額料金。
  unit_price: 195.0
public_title: Dataminr
short_description: Dataminr のアラートを監視します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Dataminr のアラートを監視します
  media:
  - caption: 'Dataminr : アラート'
    image_url: images/crest_data_systems_dataminr_alerts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Dataminr
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Dataminr は、機械学習アルゴリズムを使用して、ソーシャルメディア、ニュース、ブログなどの膨大な公開データソースを監視・分析し、新たなイベントや重要な情報を特定するためのリアルタイムデータ・分析プラットフォームです。

このインテグレーションは、優先度の高いアラートを監視し、運用上の意思決定を強化するための効率化されたワークフローを提供します。これにより、リスクと機会をより先回りして、情報に基づいて管理できるようになります。

Dataminr Datadog インテグレーションを利用すると、Dataminr のアラートデータを Datadog にログとして収集し、可視化できます。

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
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Dataminr.pdf
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-dataminr" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。