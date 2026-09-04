---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-commvault
app_uuid: 2d6e8413-e850-4eff-a139-170946be2ffc
assets:
  dashboards:
    Rapdev Commvault Overview: assets/dashboards/rapdev_commvault_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.rapdev.commvault
      metadata_path: metadata.csv
      prefix: rapdev.commvault
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10438
    source_type_name: Rapdev Commvault
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- クラウド
- マーケットプレイス
- コンプライアンス
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_commvault
integration_id: rapdev-commvault
integration_title: Commvault
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_commvault
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.commvault
  product_id: commvault
  short_description: 月額料金 (1 テラバイトあたり)
  tag: terrabyte_count
  unit_label: テラバイト
  unit_price: 10.0
public_title: Commvault
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
  title: Commvault
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Commvault は、データベース、仮想マシン、アプリケーションなど、さまざまなソースからのデータをバックアップすることで、データ保護、サイバーリカバリー、サイバーレジリエンスを簡素化します。

Rapdev Commvault インテグレーションにより、バックアップ環境をリアルタイムで把握することができます。このインテグレーションでは、進行中のジョブ、ストレージライブラリ、コンソールアラート、イベントに関連するさまざまなメトリクスを追跡できます。

- アラートに関する詳細データを取得することで、アラートの性質、発生時間、総数を把握でき、問題に迅速に対応することが可能です。
- ジョブ監視機能では、各バックアップジョブに関する重要な情報をキャプチャします。これには、バイト単位のデータサイズやジョブの所要時間などが含まれ、パフォーマンスの最適化やトレンド分析に役立ちます。
- ストレージライブラリ監視機能では、ストレージ環境を詳細に把握でき、各ライブラリの詳細、使用可能バイト数、過去 1 時間にバックアップされたデータ量、総容量、空き容量、最後のバックアップ時刻などを確認できます。

Rapdev Commvault インテグレーションは、Command Center から Datadog アカウントにデータを引き込み、Datadog の強化されたダッシュボードの視覚化、監視、アラート機能を活用できるようにします。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: [support@rapdev.io][4]  
- セールス: [sales@rapdev.io][5]  
- チャット: [rapdev.io][6]  
- 電話: 855-857-0222

[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[2]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7  
[3]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[4]: mailto:support@rapdev.io  
[5]: mailto:sales@rapdev.io  
[6]: https://www.rapdev.io/#Get-in-touch  
[7]: https://documentation.commvault.com/v11/essential/4237_web_console.html 

---
ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に必要な重要な機能が欠けていますか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください。私たちがその機能を構築します！*
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-commvault" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。