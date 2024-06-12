---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-ibm-cloud
app_uuid: 4ac8d719-9aff-4b83-8bb4-8341ccc7b74e
assets:
  dashboards:
    'RapDev IBM Cloud: Auxiliary Services': assets/dashboards/rapdev_ibm_cloud_auxiliary_services.json
    'RapDev IBM Cloud: Code Engine': assets/dashboards/rapdev_ibm_cloud_code_engine.json
    'RapDev IBM Cloud: Containers API': assets/dashboards/rapdev_ibm_cloud_containers_api.json
    'RapDev IBM Cloud: VPC API': assets/dashboards/rapdev_ibm_cloud_vpc_api.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.ibm_cloud.vpc.count
      metadata_path: metadata.csv
      prefix: rapdev.ibm_cloud
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10415
    source_type_name: RapDev IBM Cloud
  logs: {}
  monitors:
    IBM Cloud Integration is Unable to Run: assets/monitors/ibm_cloud_api_connection.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- クラウド
- incident-teams
- プロビジョニング
- オーケストレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_ibm_cloud
integration_id: rapdev-ibm-cloud
integration_title: IBM Cloud
integration_version: ''
is_public: true
kind: インテグレーション
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_ibm_cloud
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.ibm_cloud
  product_id: ibm-cloud
  short_description: 請求対象の IBM Cloud エンティティの単価
  tag: billable_entity
  unit_label: 請求対象の VPC、K8s、またはコードエンジンエンティティ
  unit_price: 1
public_title: IBM Cloud
short_description: IBM Cloud アカウントのリソースとアクティビティを監視する
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
  - Category::Cloud
  - Category::Containers
  - Category::Provisioning
  - Category::Orchestration
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: IBM Cloud アカウントのリソースとアクティビティを監視する
  media:
  - caption: 補助サービスダッシュボード
    image_url: images/auxiliary_dash.png
    media_type: image
  - caption: コードエンジンダッシュボード
    image_url: images/code_engine_dash.png
    media_type: image
  - caption: コンテナ API ダッシュボード
    image_url: images/containers_api_dash.png
    media_type: image
  - caption: VPC API ダッシュボード (pt. 1)
    image_url: images/vpc_api_dash.png
    media_type: image
  - caption: VPC API ダッシュボード (pt. 2)
    image_url: images/vpc_api_dash_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: IBM Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
IBM Cloud Integration を使用すると、IBM Cloud アカウントから利用可能な API を監視できます。メタデータ情報とさまざまな補助サービスの詳細を取り込むことで、このインテグレーションは、セキュリティ、コンプライアンス、ネットワーキング、QA、または開発などのチームが、クラウドインフラストラクチャーが継続的に健全で、安全で、規制基準に準拠していることを確認するのに役立ちます。

インテグレーションは以下の IBM Cloud API をサポートしています。
- Kubernetes API
- VPC API
- トランジットゲートウェイ
- コードエンジン
- ダイレクトリンクプロバイダー
- シークレットマネージャー
- クラウドオブジェクトストレージ
- イベントストリーム管理者
- コンテナレジストリ


## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-v6-python-3/?tab=hostagent
[2]: https://cloud.ibm.com/login
[3]: https://cloud.ibm.com/docs/account?topic=account-userapikey&interface=ui#create_user_key
[4]: https://cloud.ibm.com/docs/key-protect?topic=key-protect-retrieve-instance-ID&interface=ui
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information 

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-ibm-cloud" target="_blank">こちらをクリック</a>してください。