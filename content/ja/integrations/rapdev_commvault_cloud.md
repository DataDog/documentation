---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-commvault-cloud
app_uuid: 1d9b599d-54ec-4051-897e-74e943010ce7
assets:
  dashboards:
    Rapdev Commvault Cloud Overview: assets/dashboards/rapdev_commvault_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.commvault_cloud.jobs.count
      metadata_path: metadata.csv
      prefix: rapdev.commvault_cloud
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10455
    source_type_name: Rapdev Commvault Cloud
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- クラウド
- marketplace
- コンプライアンス
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_commvault_cloud
integration_id: rapdev-commvault-cloud
integration_title: Commvault Cloud
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_commvault_cloud
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.commvault_cloud
  product_id: commvault-cloud
  short_description: Datadog において Commvault Cloud / Metallic.io による監視を行う場合、ジョブ実行ごとに
    5 ドルの料金が発生します。
  tag: unique_job
  unit_label: ジョブ
  unit_price: 1
public_title: Commvault Cloud
short_description: Commvault ジョブ、ライブラリステータス、アラート、イベントの監視
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
  - Category::Marketplace
  - カテゴリ::コンプライアンス
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Commvault ジョブ、ライブラリステータス、アラート、イベントの監視
  media:
  - caption: Commvault 概要ダッシュボード
    image_url: images/full_view.png
    media_type: image
  - caption: Commvault 概要ダッシュボード 環境の概要 セクション 1/5
    image_url: images/overview.png
    media_type: image
  - caption: Commvault 概要ダッシュボード アラートとイベントの概要 セクション 2/5
    image_url: images/alerts_and_events.png
    media_type: image
  - caption: Commvault 概要ダッシュボード ジョブ操作の概要 セクション 3/5
    image_url: images/jobs.png
    media_type: image
  - caption: Commvault 概要ダッシュボード ライブラリ操作 セクション 4/5
    image_url: images/libraries.png
    media_type: image
  - caption: Commvault 概要ダッシュボード ストレージプール セクション 5/5
    image_url: images/storage_pools.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Commvault Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Commvault は、データベース、仮想マシン、アプリケーションなど、さまざまなソースからのデータをバックアップすることで、データ保護、サイバーリカバリー、サイバーレジリエンスを簡素化します。

Rapdev Commvault Cloud インテグレーションにより、バックアップ環境をリアルタイムで把握することができます。このインテグレーションでは、進行中のジョブ、ストレージライブラリ、コンソールアラート、イベントに関連するさまざまなメトリクスを追跡できます。

- アラートに関する詳細データを取得することで、アラートの性質、発生時間、総数を把握でき、問題に迅速に対応することが可能です。
- ジョブ監視機能では、各バックアップジョブに関する重要な情報をキャプチャします。これには、バイト単位のデータサイズやジョブの所要時間などが含まれます。これにより、パフォーマンスとトレンド分析が最適化されます。
- ストレージライブラリ監視機能では、ストレージ環境を詳細に把握でき、各ライブラリの詳細、使用可能バイト数、過去 1 時間にバックアップされたデータ量、総容量、空き容量、最後のバックアップ時刻などを確認できます。

Rapdev Commvault Cloud インテグレーションは、Command Center から Datadog アカウントにデータを引き込みます。これにより、Datadog の強化されたダッシュボードの視覚化、監視、アラート機能を活用できるようになります。

Commvault On-Prem を監視するには、[Commvault On-Prem インテグレーション][8]をご覧ください。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: [support@rapdev.io][4]  
- セールス: [sales@rapdev.io][5]  
- チャット: [rapdev.io][6]  
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*


[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[2]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7  
[3]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[4]: mailto:support@rapdev.io  
[5]: mailto:sales@rapdev.io  
[6]: https://www.rapdev.io/#Get-in-touch 
[7]: https://api.metallic.io
[8]: https://app.datadoghq.com/marketplace/app/rapdev-commvault/overview

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-commvault-cloud" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。