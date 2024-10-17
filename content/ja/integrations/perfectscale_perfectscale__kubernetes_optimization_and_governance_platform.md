---
algolia:
  subcategory: Marketplace インテグレーション
app_id: perfectscale-perfectscale
app_uuid: 5be9f1ea-2247-4116-97e2-6b506d828bfa
assets: {}
author:
  homepage: https://www.perfectscale.io/
  name: PerfectScale
  sales_email: sales@perfectscale.io
  support_email: support@perfectscale.io
  vendor_id: perfectscale
categories:
- alerting
- 自動化
- incident-teams
- kubernetes
- クラウド
- コスト管理
- プロビジョニング
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: perfectscale_perfectscale__kubernetes_optimization_and_governance_platform
integration_id: perfectscale-perfectscale
integration_title: PerfectScale
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: perfectscale_perfectscale__kubernetes_optimization_and_governance_platform
pricing:
- billing_type: tag_count
  includes_assets: false
  metric: datadog.marketplace.perfectscale.usage
  product_id: perfectscale
  short_description: K8s の安定性とレジリエンスを向上させながら、コストを最大 50% 削減
  tag: 1000_vcpu_core_hour
  unit_label: 1000 vCPU コア時間
  unit_price: 2.0
public_title: PerfectScale
short_description: データ主導の自律的なアクションで Kubernetes クラスターを最適化し、ピークパフォーマンスを確保しつつコストを削減
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Containers
  - Category::Kubernetes
  - Category::Cloud
  - Category::Cost Management
  - Category::Provisioning
  - Category::Marketplace
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Software License
  configuration: README.md#Setup
  description: データ主導の自律的なアクションで Kubernetes クラスターを最適化し、ピークパフォーマンスを確保しつつコストを削減
  media:
  - caption: マルチクラウド、マルチクラスターの Kubernetes 最適化およびガバナンスプラットフォーム
    image_url: images/PS Datadog 8@2x.png
    media_type: image
  - caption: 無駄を迅速に特定し、事前に排除し、レジリエンスの問題を解決
    image_url: images/Waste and Performance optimization.png
    media_type: image
  - caption: 基盤となるノードインフラストラクチャー全体に対する高度な可視性と最適化の洞察
    image_url: images/Infrastructure and Machine Optimization.png
    media_type: image
  - caption: K8s 環境全体でのコストとパフォーマンスのレポート
    image_url: images/Comprehensive analysis.png
    media_type: image
  - caption: PerfectScale のアラートを直接 Datadog に送信し、問題解決を迅速化
    image_url: images/Alerts Integration.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: PerfectScale
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

PerfectScale は、包括的でクラウドに依存しないソリューションであり、チームに継続的かつ自律的な Kubernetes 最適化機能を提供します。当社の主な目標は、チームがインフラストラクチャーを簡単に管理し、データ主導の迅速な意思決定を行い、可能な限り低いコストで最高のパフォーマンスを実現できるようにすることです。

PerfectScale は、**AWS**、**Azure**、**GCP**、**OpenShift**、および**オンプレミス**を含む、すべての Kubernetes 環境をサポートしています。

### K8s のクラウド支出を削減

PerfectScale の推奨事項により、クラウドの効率を高め、安定性やパフォーマンスに影響を与えることなく、Kubernetes の無駄を削減できます。
[さらに詳しく](https://docs.perfectscale.io/explore-metrics/podfit-vertical-pod-right-sizing)

### K8s のレジリエンスの問題を軽減

リソースのプロビジョニングにおける誤構成を事前に特定し、Kubernetes 環境のパフォーマンスとレジリエンスに影響を与える問題を排除します。
[さらに詳しく](https://docs.perfectscale.io/explore-metrics/podfit-vertical-pod-right-sizing/understanding-at-risk-indicators)

### 継続的な最適化を自動化

PerfectScale の自動化は、ワークロードリソースを動的かつ安全、そして正確に調整し、手動の介入を必要とせずに Kubernetes 環境の安定性と費用対効果を向上させます。
[さらに詳しく](https://docs.perfectscale.io/enable-automation)

### 構成可能なアラート

Kubernetes 環境で特定されたレジリエンスリスクの情報を取得し、タスクを優先順位付けして、パフォーマンスやユーザーエクスペリエンスに影響が出る前に問題を排除します。通知は Datadog アラートに直接統合可能です。
[さらに詳しく](https://docs.perfectscale.io/configure-alerts)


## サポート

PerfectScale についてサポートが必要ですか？[サポート](mailto:support@perfectscale.io)までご連絡ください。


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/perfectscale-perfectscale" target="_blank">こちらをクリック</a>してください。