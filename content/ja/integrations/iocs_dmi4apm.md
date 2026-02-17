---
algolia:
  subcategory: Marketplace インテグレーション
app_id: iocs-dmi4apm
app_uuid: 29b4a34d-e40d-4975-ba55-4fc019685959
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: iocs_dmi4apm.ioconnect.dmi4apm.agent
      metadata_path: metadata.csv
      prefix: iocs_dmi4apm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 9762172
    source_type_name: iocs_dmi4apm
author:
  homepage: https://www.novacloud.io/
  name: Nova
  sales_email: products.sales@novacloud.io
  support_email: support_ddp@novacloud.io
  vendor_id: ioconnect
categories:
- cloud
- marketplace
- developer tools
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dmi4apm
integration_id: iocs-dmi4apm
integration_title: Mule®  for APM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: iocs_dmi4apm
pricing:
- billing_type: tag_count
  includes_assets: false
  metric: datadog.marketplace.ioconnect.dmi4apm.agent
  product_id: dmi4apm
  short_description: ホスト単位の課金
  tag: hosts-unmute-a-host
  unit_label: ホスト
  unit_price: 50
public_title: Mule® Integration for APM
short_description: アプリケーション パフォーマンス モニタリング向け Datadog MuleSoft インテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Marketplace
  - Category::Developer Tools
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: アプリケーション パフォーマンス モニタリング向け Datadog MuleSoft インテグレーション
  media:
  - caption: 'DMI4APM: ログのトレース'
    image_url: images/dmi_apm_logs.png
    media_type: image
  - caption: 'DMI4APM: トレースの詳細'
    image_url: images/dmi_apm_trace.png
    media_type: image
  - caption: 'DMI4APM: トレースリスト'
    image_url: images/dmi_apm_traces.png
    media_type: image
  - caption: 'DMI4APM: 分散スパン'
    image_url: images/dmi_distributed_span.png
    media_type: image
  - caption: 'DMI4APM: 分散スパン トレース'
    image_url: images/dmi_distributed_trace.png
    media_type: image
  - caption: 'DMI4APM: スパン リスト'
    image_url: images/dmi_distributed.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mule® Integration for APM
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
MuleSoft は、インテグレーションおよび API 管理ソリューションを提供するソフトウェア企業です。主力製品の Anypoint Platform は、オンプレミスとクラウドの環境をまたいでアプリケーション、データ、デバイスを接続できるインテグレーション プラットフォームです。

このインテグレーションは MuleSoft アプリケーションから APM トレースを取得し、アプリケーションのパフォーマンスや問題点に関するインサイトを提供します。APM トレースにより、開発チームと運用チームは、このインテグレーションのパフォーマンスを深く可視化し、ボトルネックやエラー、パフォーマンス低下をリアルタイムで特定できます。

### **Datadog Mule 4 コネクタを使用して Mule アプリケーションをインスツルメントします**


Datadog APM と併用できる Datadog Connector for Mule 4 を使うと、すぐに使えるパフォーマンス ダッシュボードで可視性を高められます。

スパンを使用して、フロー内の操作のパフォーマンスを必要に応じて詳細に測定します。

また、トランザクション内で生成されたログを 1 つのトレースに関連付けて、パフォーマンスの最適化またはトラブルシューティングの範囲を絞り込みます。


## サポート
Datadog Mule® Integration for APM の設定手順については、[前提条件とインストール][7] と [コネクター ドキュメント][8] をご確認ください。

サポートや機能リクエストは、次の窓口から Nova Support へご連絡ください:

- 営業: [products.sales@novacloud.io][2]
- 技術サポート: [support_ddp@novacloud.io][6]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: mailto:products.sales@novacloud.io
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: mailto:support_ddp@novacloud.io
[7]: https://docs.ioconnectservices.com/dmi4apm/apm-datadog-integration
[8]: https://docs.ioconnectservices.com/dmi4apm/apm-global-elements

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/iocs-dmi4apm" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。