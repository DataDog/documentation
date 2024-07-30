---
algolia:
  subcategory: Marketplace インテグレーション
app_id: agentil-software-sap-hana
app_uuid: 75784ba6-6a1a-4059-849e-c4cbdb56f258
assets:
  dashboards:
    SAP HANA services overview: assets/dashboards/agentil_software_sap_hana_services_overview.json
    SAP HANA systems overview: assets/dashboards/agentil_software_sap_hana_overview.json
    SAP HANA tables overview: assets/dashboards/agentil_software_sap_hana_tables_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_hana.system
      metadata_path: metadata.csv
      prefix: agentil_software.hana
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10388
    source_type_name: AGENTIL Software SAP HANA
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- マーケットプレイス
- sap
- data stores
- イベント管理
- モニター
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_hana
integration_id: agentil-software-sap-hana
integration_title: SAP HANA
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_hana
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_hana.system
  product_id: sap-hana
  short_description: 監視する SAP HANA システム (SID で識別) ごとに 1 ライセンスユニットをカウントする
  tag: uri
  unit_label: SAP システム ID (SID)
  unit_price: 190
public_title: SAP HANA
short_description: 単一のコレクターから SAP HANA データベースを一元的に監視する
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Category::Data Stores
  - Supported OS::Linux
  - Category::Event Management
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 単一のコレクターから SAP HANA データベースを一元的に監視する
  media:
  - caption: SAP HANA データベースの概要
    image_url: images/dashboard_db_overview.png
    media_type: image
  - caption: SAP HANA テーブルの概要
    image_url: images/hana_tables_overview.png
    media_type: image
  - caption: SAP HANA サービスの概要
    image_url: images/hana_services_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP HANA
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
SAP HANA インテグレーションは、メモリデータベースシステムの SAP HANA を監視します。
システムは複数のデータベーススキーマをホストでき、複数のノードにデプロイできます。

リモート**エージェントレス**接続と事前設定された監視テンプレートを使用することで、このインテグレーションはわずか**数分**で本稼働することができます。

監視は AGENTIL Software の [Pro.Monitor プラットフォーム][1]を利用しています。すぐに使える構成で、**バックアップ、トランザクション、サービスリソース、テーブルの増加など**、データベースの最も関連性の高い KPI をカバーします。

このインテグレーションは、システムからデータをリアルタイムに収集・分析し、メトリクスとイベントを Datadog に送信します。Pro.Monitor を構成してメトリクスに直接 Datadog モニターを作成することで、アラートを細かく調整できます。

Agent ベースのソリューションとは異なり、このプラットフォームのすべての監視構成は 1 か所に集中されるため、監視対象システムに何かを変更したりインストールしたりする必要はありません。

### 監視対象モジュール

- HANA ノード
- ガイド
- バックアップ
- サービス CPU
- サービスメモリ
- サービスディスク
- ブロックされたトランザクション
- Ruby
- スレッド
- レプリケーションステータス
- レプリケーション統計
- テーブルサイズ (レコード、マージサイズ、ディスクサイズ)
- カスタム SQL リクエスト
- オンデマンドモニター

## Agent

AGENTIL Software では、SAP のエキスパートと開発者のチームがサポートを提供し、機能強化や機能追加のリクエストを受け付けています。
以下のチャンネルからお問い合わせください。

- メール: [support@agentil-software.com][2]

*SAP や他のプラットフォームとの特定のインテグレーションのための信頼できるパートナーをお探しなら、ぜひ当社にご連絡ください。*

---
この製品は、スイスのジュネーブで設計・開発されています。

[1]: https://www.agentil-software.com
[2]: mailto:support@agentil-software.com
[3]: https://wiki.agentil-software.com/doku.php?id=products:promonitor:6.8:userguide:configuration
[4]: https://wiki.agentil-software.com/doku.php?id=products:cockpit:1.0:installguide:installjava
[5]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-hana" target="_blank">こちらをクリック</a>してください。