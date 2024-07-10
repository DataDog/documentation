---
algolia:
  subcategory: Marketplace インテグレーション
app_id: prophetstor-federatorai-license
app_uuid: 965e6142-3b99-4999-a7c6-09a00775e511
assets:
  integration:
    auto_install: false
    configuration:
      spec: ''
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: federatorai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10187
    source_type_name: Federator.ai.license
author:
  homepage: https://www.prophetstor.com/
  name: ProphetStor
  sales_email: dd_subscription@prophetstor.com
  support_email: support@prophetstor.com
  vendor_id: prophetstor
categories:
- containers
- kubernetes
- マーケットプレイス
- orchestration
- ai/ml
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: prophetstor_federatorai
integration_id: prophetstor-federatorai-license
integration_title: ProphetStor Federator.ai
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: prophetstor_federatorai
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: federatorai-license
  short_description: 月額 2000 ドル
  unit_price: 2000
public_title: ProphetStor Federator.ai
short_description: Kubernetes アプリケーションを最適化するための Federator.ai ライセンス
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Orchestration
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Kubernetes アプリケーションを最適化するための Federator.ai ライセンス
  media:
  - caption: ProphetStor Federator.ai クラスター概要ダッシュボードは、Kubernetes クラスターやノードのリソース使用量の予測価と推奨値、および過去の使用量を表示します。
    image_url: images/Federator_ai_Datadog_Cluster_Overview.png
    media_type: image
  - caption: ProphetStor Federator.ai アプリケーション概要ダッシュボードは、アプリケーションごとに CPU とメモリの使用量の予測値と推奨値を表示します。
    image_url: images/Federator_ai_Datadog_Application_Overview.png
    media_type: image
  - caption: ProphetStor Federator.ai Kafka 概要ダッシュボードは、Kafka のコンシューマーレプリカのオートスケールに関する使用情報と推奨事項を表示します。
    image_url: images/Federator_ai_Datadog_Kafka_Overview.png
    media_type: image
  - caption: ProphetStor Federator.ai コスト分析概要ダッシュボードでは、Kubernetes クラスターの導入コストと、パブリッククラウドのサービスプロバイダーで導入した場合のクラスターコンフィギュレーションや推定コスト/節約額の推奨事項を示します。
    image_url: images/Federator_ai_Datadog_Cost_Analysis_Overview.png
    media_type: image
  - caption: Federator.ai ダッシュボードには、Kubernetes や VM のクラスターやアプリケーションのワークロード予測とリソースの推奨値が表示されます。
    image_url: images/Federator_ai_Dashboard.png
    media_type: image
  - caption: Federator.ai は、クラスター、ノード、ネームスペース、アプリケーション、コントローラーの予測とリソースの推奨値を提供します。
    image_url: images/Federator_ai_Workload_Prediction.png
    media_type: image
  - caption: Federator.ai は、クラスターのワークロード予測に基づいて、異なるパブリッククラウドプロバイダーに対して最もコスト効率の良いクラスターコンフィギュレーションを推奨します。
    image_url: images/Federator_ai_Multicloud_Cost_Analysis.png
    media_type: image
  - caption: Federator.ai は、個々のネームスペースのコスト傾向を分析・予測します。
    image_url: images/Federator_ai_Cost_Allocation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ProphetStor Federator.ai
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[ProphetStor Federator.ai][1] は AI ベースのソリューションで、企業が Kubernetes 上のアプリケーションのリソースを管理、最適化、オートスケールする手助けをします。Federator.ai は高度な機械学習アルゴリズムでアプリケーションのワークロードを予測することで、ベストなタイミングで適切な量のリソースをスケーリングし、アプリケーションのパフォーマンスを最適化します。

* Kubernetes クラスター内のコンテナ化されたアプリケーションと VMware クラスター内の VM の AI ベースのワークロード予測
* ワークロード予測、アプリケーション、Kubernetes などの関連するメトリクスに基づくリソースの提案
* アプリケーションコンテナの自動スケーリング
* Kubernetes クラスターと VM クラスターのワークロード予測に基づくマルチクラウドのコスト分析と提案
* クラスター、Kubernetes アプリケーション、VM、Kubernetes ネームスペースの提案に基づく実際のコストと潜在的な節約

ProphetStor Federator.ai ライセンスを使用すると、AI ベースのソリューションを適用して、Kubernetes コンテナ、ネームスペース、クラスターノードのリソース使用量を追跡および予測し、コストのかかるオーバープロビジョニングやパフォーマンスに影響を与えるアンダープロビジョニングを防ぐための適切な提案を作成できます。Federator.ai は、アプリケーションのワークロード予測を利用して、適切なタイミングでアプリケーションコンテナを自動スケーリングし、Kubernetes HPA または [Datadog Watermark Pod Autoscaling (WPA)][3] を介して適切な数のコンテナレプリカでパフォーマンスを最適化します。

この Federator.ai ライセンスとは別に、すぐに使用できるダッシュボードと推奨モニターを備えた公式の [Datadog インテグレーション][9]を利用できます。Federator.ai の詳細については、[ProphetStor Federator.ai 機能デモ][2]ビデオをご覧ください。

## Agent

サポートやリクエストについては、[ProphetStor サポート](mailto:support@prophetstor.com)にお問い合わせください。


[1]: https://prophetstor.com/federator_ai/
[2]: https://youtu.be/AeSH8yGGA3Q
[3]: https://github.com/DataDog/watermarkpodautoscaler
[4]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[5]: images/add_cluster_window.png
[6]: https://www.datadoghq.com/
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[8]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[9]: /ja/integrations/federatorai

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/prophetstor-federatorai-license" target="_blank">こちらをクリック</a>してください。