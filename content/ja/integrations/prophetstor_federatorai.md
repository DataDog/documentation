---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
author:
  homepage: https://www.prophetstor.com/
  name: ProphetStor Data Services, Inc.
categories:
  - containers
  - orchestration
  - マーケットプレイス
creates_events: false
ddtype: check
dependencies: []
display_name: Federator.ai.license
draft: false
git_integration_title: prophetstor_federatorai
guid: 1f828e2b-4558-43f1-914f-92d4e679fb75
integration_id: prophetstor-federatorai-license
integration_title: ProphetStor Federator.ai
is_public: true
kind: integration
maintainer: support@prophetstor.com
manifest_version: 1.0.0
metric_prefix: federatorai.
metric_to_check: ''
name: prophetstor_federatorai
pricing:
  - billing_type: flat_fee
    unit_price: 2000
public_title: ProphetStor Federator.ai
short_description: Kubernetes アプリケーションを最適化するための Federator.ai ライセンス
support: パートナー
supported_os:
  - linux
terms:
  eula: assets/eula.pdf
  legal_email: dd_subscription@prophetstor.com
---
## 概要

[ProphetStor Federator.ai][1] は AI ベースのソリューションで、企業が Kubernetes 上のアプリケーションのリソースを管理、最適化、オートスケールする手助けをします。Federator.ai は高度な機械学習アルゴリズムでアプリケーションのワークロードを予測することで、ベストなタイミングで適切な量のリソースをスケーリングし、アプリケーションのパフォーマンスを最適化します。

* Kubernetes クラスター内のコンテナ化されたアプリケーションと VMware クラスター内の VM の AI ベースのワークロード予測
* ワークロード予測、アプリケーション、Kubernetes などの関連するメトリクスに基づくリソースの提案
* アプリケーションコンテナの自動スケーリング
* Kubernetes クラスターと VM クラスターのワークロード予測に基づくマルチクラウドのコスト分析と提案
* クラスター、Kubernetes アプリケーション、VM、Kubernetes ネームスペースの提案に基づく実際のコストと潜在的な節約

ProphetStor Federator.ai ライセンスを使用すると、AI ベースのソリューションを適用して、Kubernetes コンテナ、ネームスペース、クラスターノードのリソース使用量を追跡および予測し、コストのかかるオーバープロビジョニングやパフォーマンスに影響を与えるアンダープロビジョニングを防ぐための適切な提案を作成できます。Federator.ai は、アプリケーションのワークロード予測を利用して、適切なタイミングでアプリケーションコンテナを自動スケーリングし、Kubernetes HPA または [Datadog Watermark Pod Autoscaling (WPA)][3] を介して適切な数のコンテナレプリカでパフォーマンスを最適化します。

この Federator.ai ライセンスとは別に、すぐに使用できるダッシュボードと推奨モニターを備えた公式の [Datadog インテグレーション][9]を利用できます。Federator.ai の詳細については、[ProphetStor Federator.ai 機能デモ][2]ビデオをご覧ください。

## サポート

サポートやリクエストについては、[ProphetStor サポート](mailto:support@prophetstor.com)にお問い合わせください。


[1]: https://prophetstor.com/federator-ai-2/
[2]: https://www.youtube.com/watch?v=IooFJnB8bb8&t=1s
[3]: https://github.com/DataDog/watermarkpodautoscaler
[4]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[5]: images/add_cluster_window.png
[6]: https://www.datadoghq.com/
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[8]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[9]: https://app.datadoghq.com/account/settings#integrations/federatorai