---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-swiftmq
app_uuid: 93738439-2cde-4718-a7f6-004f2da0177e
assets:
  dashboards:
    RapDev SwiftMQ Summary: assets/dashboards/summary.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.swiftmq.env
      metadata_path: metadata.csv
      prefix: rapdev.swiftmq
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10378
    source_type_name: RapDev SwiftMQ
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- メッセージキュー
- マーケットプレイス
- モニター
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_swiftmq
integration_id: rapdev-swiftmq
integration_title: SwiftMQ
integration_version: ''
is_public: true
kind: インテグレーション
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_swiftmq
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.swiftmq
  product_id: swiftmq
  short_description: インスタンス 1 個あたりの単価。
  tag: swiftmq_endpoint
  unit_label: SwiftMQ インスタンス
  unit_price: 10
public_title: SwiftMQ
short_description: SwiftMQ インスタンスの健全性とアクティビティを監視する
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Message Queues
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: SwiftMQ インスタンスの健全性とアクティビティを監視する
  media:
  - caption: SwiftMQ サマリーダッシュボード (1/3)
    image_url: images/swiftmq_dash_one.png
    media_type: image
  - caption: SwiftMQ サマリーダッシュボード (2/3)
    image_url: images/swiftmq_dash_two.png
    media_type: image
  - caption: SwiftMQ サマリーダッシュボード (3/3)
    image_url: images/swiftmq_dash_three.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SwiftMQ
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## 概要

[SwiftMQ][1] は、エンタープライズメッセージング、リアルタイムストリーミング分析、およびマイクロサービスプラットフォームです。JMS と AMQP 1.0 標準プロトコルと、IoT クライアント用の MQTT 3.1 または 3.1.1 を通してビジネスアプリケーションをサポートします。動的ルーティングを内蔵しており、あらゆる送信元から宛先への透過的な送信が可能で、拡張性の高いアーキテクチャに最適化されています。


このインテグレーションは、[Flow Director][5] で [SwiftMQ Prometheus モニタリングアプリ][6]を使用して、[SwiftMQ][1] の健全性とオペレーションに関するメトリクスをレポートします。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: [support@rapdev.io][4]
- 営業: [sales@rapdev.io][3]
- チャット: [rapdev.io][2]
- 電話: 855-857-0222

---

ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][4]から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*


[1]: https://www.swiftmq.com/
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: mailto:support@rapdev.io
[5]: https://www.flowdirector.io/start/
[6]: https://www.flowdirector.io/apps/prometheus/swiftmqprometheus/
[7]: https://help.flowdirector.io/spma/install-the-app
[8]: https://help.flowdirector.io/spma/quick-setup
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-swiftmq" target="_blank">こちらをクリック</a>してください。