---
algolia:
  subcategory: Marketplace インテグレーション
app_id: bordant-technologies-camunda
app_uuid: a8413249-3027-48ad-b5bd-2ac72edd7ded
assets:
  dashboards:
    Camunda 8 - Overview: assets/dashboards/camunda_8_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: camunda8.broker.zeebe.health
      metadata_path: metadata.csv
      prefix: camunda8.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11136032
    source_type_name: Camunda 8
author:
  homepage: https://www.bordant.com
  name: Bordant Technologies
  sales_email: contact@bordant.com
  support_email: support@bordant.com
  vendor_id: bordant-technologies
categories:
- marketplace
- モニター
- オーケストレーション
- kubernetes
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bordant_technologies_camunda
integration_id: bordant-technologies-camunda
integration_title: Camunda 8
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: bordant_technologies_camunda
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: camunda8
  short_description: Monthly flat fee for Camunda 8 integration
  unit_price: 600
public_title: Camunda 8
short_description: Camunda 8 ワークフローエンジンの健全性とパフォーマンスを監視します。
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
  - Category::Marketplace
  - Category::Metrics
  - Category::Orchestration
  - Offering::Integration
  - Category::Kubernetes
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Camunda 8 ワークフローエンジンの健全性とパフォーマンスを監視します。
  media:
  - caption: Camunda 8 ダッシュボードでプロセスエンジンの全体的な健全性を監視します。
    image_url: images/Camunda_8-Overview_1.png
    media_type: image
  - caption: ダッシュボードでは、Camunda 8 ワークフローエンジンの各コンポーネントを個別に監視できます。
    image_url: images/Camunda_8-Overview_2.png
    media_type: image
  - caption: ダッシュボードに表示されるメトリクスには、パフォーマンスメトリクス、実行統計、リソース使用率、エンジンスループットなどが含まれます。
    image_url: images/Camunda_8-Overview_3.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/bordant-technologies-camunda-8-datadog-marketplace/
  support: README.md#Support
  title: Camunda 8
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Camunda 8 は、マイクロサービス全体でビジネスプロセスを管理するために開発者を支援するよう設計された、ワークフローと意思決定自動化のプラットフォームです。このプラットフォームは、ビジネスチームと IT チームのコラボレーションを促進し、幅広い統合オプションを提供し、リアルタイムのプロセス実行監視を可能にします。

Camunda 8 ワークフローエンジンの高度な監視機能を解放しましょう。このインテグレーションは、モニタリング環境にスムーズに組み込まれ、システム管理者や DevOps エンジニアに Camunda 8 に関する深い洞察を提供します。エンジンの健全性を監視し、スループットを最適化し、Camunda 設定のボトルネックを特定します。

### 機能
- **エンジンの健全性の監視**: エンジンがスムーズに動作していることを確認します。

- **スループットの最適化**: リアルタイムでプロセスの実行を監視することで、エンジンにかかる圧力をより正確に理解し、負荷に対処できるかを確認します。

- **ボトルネックの特定**: エンジンの各コンポーネントを個別に監視し、それらの相互作用を把握することで、スループットを制限する要因を特定します。

### ハイライト

- **簡単なセットアップ**: インテグレーションは迅速にセットアップでき、複雑な構成や技術的な調整は不要です。Datadog の全機能を活用して Camunda 8 の監視を開始しましょう。

- **360度の監視**: 基本的な監視を超えて、Camunda 8 エンジンの全体像を把握できます。パフォーマンスメトリクス、実行統計、リソース使用率、エンジンスループットなど、幅広い Camunda 8 メトリクスが Datadog に報告されます。

- **直感的なインサイト**: すぐに使える可視化機能を利用するか、独自のものを作成できます。Camunda 8 ダッシュボードは、すぐに利用を開始でき、簡単に拡張することも可能です。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Bordant Technologies にお問い合わせください。

- サポート: [support@bordant.com][2]

### その他の参考資料
お役に立つドキュメント、リンクや記事:

- [Bordant Technologies の Datadog インテグレーションで Camunda 8 コンポーネントの可視性を高める][6]

[1]: https://docs.camunda.io/docs/self-managed/platform-deployment/overview/
[2]: mailto:support@bordant.com
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=kubernetesadv2
[6]: https://www.datadoghq.com/blog/bordant-technologies-camunda-8-datadog-marketplace/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/bordant-technologies-camunda" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。