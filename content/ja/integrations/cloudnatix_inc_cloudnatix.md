---
algolia:
  subcategory: Marketplace インテグレーション
app_id: cloudnatix-cloudnatix
app_uuid: 96ab2cb5-ce57-48ea-9a19-e065261c7430
assets: {}
author:
  homepage: https://cloudnatix.com/
  name: CloudNatix Inc.
  sales_email: sales@cloudnatix.com
  support_email: support@cloudnatix.com
  vendor_id: cloudnatix
categories:
- クラウド
- kubernetes
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudnatix_inc_cloudnatix
integration_id: cloudnatix-cloudnatix
integration_title: CloudNatix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: cloudnatix_inc_cloudnatix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.cloudnatix
  product_id: cloudnatix
  short_description: CloudNatix の価格は、CPU コアごとに月額で設定されています。より大きなコミットメントには、追加のインセンティブが用意されています。
  tag: cpu_core
  unit_label: CPU コア
  unit_price: 37.96
public_title: CloudNatix
short_description: CloudNatix は k8s のコスト、キャパシティ、支出に関する洞察を提供します
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
  - Category::Kubernetes
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: CloudNatix は k8s のコスト、キャパシティ、支出に関する洞察を提供します
  media:
  - caption: CloudNatix ダッシュボード
    image_url: images/cloudnatix-app-dashboard.png
    media_type: image
  - caption: CloudNatix ワークロード
    image_url: images/cloudnatix-app-workload.png
    media_type: image
  - caption: CloudNatix ワークロードオートパイロット
    image_url: images/cloudnatix-app-autopilot.png
    media_type: image
  - caption: CloudNatix クラスターオートパイロット
    image_url: images/cloudnatix-app-cluster.png
    media_type: image
  - caption: ダッシュボード
    image_url: images/cloudnatix-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CloudNatix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[CloudNatix][1] は、k8s クラスターの VM、ノード、およびワークロードを監視し、クラスターの総コストを削減できるように、CPU/メモリリクエストの構成を変更したり、ノードのインスタンスタイプを変更したりするなど、運用の最適化に関する洞察を提供します。

すぐに使えるインテグレーションは、監視された支出と CloudNatix の運用最適化の洞察をダッシュボードに視覚化します。


## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから CloudNatix にお問い合わせください。

- メール: [CloudNatix サポート][4] 
- Slack: [CloudNatix コミュニティ][3]

[1]: https://cloudnatix.com/
[2]: mailto:support@cloudnatix.com
[3]: https://join.slack.com/t/a7t/shared_invite/zt-1fooygi86-wefZeBK_pGcBr_4_WhntnQ
[4]: mailto:support@cloudnatix.com
[5]: https://app.datadoghq.com/integrations/cloudnatix

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/cloudnatix-cloudnatix" target="_blank">こちらをクリック</a>してください。