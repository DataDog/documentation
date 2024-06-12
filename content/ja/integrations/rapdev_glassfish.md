---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-glassfish
app_uuid: 58392a75-5d53-43ad-aeb9-62129ccf086b
assets:
  dashboards:
    RapDev Glassfish Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.glassfish.up_time
      metadata_path: metadata.csv
      prefix: rapdev.glassfish.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10424
    source_type_name: RapDev Glassfish
  monitors:
    Glassfish Virtual Server State: assets/monitors/virtual_server_state.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- 開発ツール
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_glassfish
integration_id: rapdev-glassfish
integration_title: Glassfish
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_glassfish
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.glassfish
  product_id: glassfish
  short_description: インスタンス 1 個あたりの単価。
  tag: glassfish_instance
  unit_label: Glassfish Instance
  unit_price: 10
public_title: Glassfish
short_description: Glassfish アプリケーションとサービスの健全性を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Glassfish アプリケーションとサービスの健全性を監視する
  media:
  - caption: アプリケーション概要
    image_url: images/applications-overview.png
    media_type: image
  - caption: HTTP サービス概要
    image_url: images/http-service-overview.png
    media_type: image
  - caption: JVM、ネットワーク、トランザクションサービスの概要
    image_url: images/jvm-network-ts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Glassfish
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
GlassFish は、Jakarta EE の Eclipse 実装 (旧 Oracle のリファレンス実装) であり、Jakarta REST、Jakarta CDI、Jakarta Security、Jakarta Persistence、Jakarta Transactions、Jakarta Servlet、Jakarta Faces、Jakarta Messaging などをサポートしています。これにより開発者は、移植性と拡張性に優れ、レガシーテクノロジーとインテグレーションできるエンタープライズアプリケーションを作成できます。Glassfish インテグレーションでは、ユーザーはアプリケーション、HTTP サービス、JMS サービス、JVM メトリクス、ネットワーキング、トランザクションサービスなど、Glassfish 内の複数の異なるモジュールを監視できます。


## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][6]
- 営業: [sales@rapdev.io][7]
- チャット: [rapdev.io][5]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][6]から RapDev にメッセージをお送りいただければ、導入をサポートいたします！*

[1]: https://docs.oracle.com/cd/E19355-01/820-1072/6ncp48v4e/index.html
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-glassfish" target="_blank">こちらをクリック</a>してください。