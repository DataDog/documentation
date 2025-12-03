---
algolia:
  subcategory: Marketplace インテグレーション
app_id: redpeaks-sap-hana
app_uuid: 38708fc8-5c40-41c5-9511-867aa1b1692c
assets:
  dashboards:
    HANA services overview: assets/dashboards/redpeaks_sap_hana_services_overview.json
    HANA systems overview: assets/dashboards/redpeaks_sap_hana_overview.json
    HANA tables overview: assets/dashboards/redpeaks_sap_hana_tables_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.redpeaks.sap_hana.system
      metadata_path: metadata.csv
      prefix: redpeaks.hana
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10998
    source_type_name: redpeaks_sap_hana
author:
  homepage: https://www.redpeaks.io
  name: Redpeaks
  sales_email: sales@redpeaks.io
  support_email: support@redpeaks.io
  vendor_id: redpeaks
categories:
- marketplace
- sap
- data stores
- event management
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: redpeaks_sap_hana
integration_id: redpeaks-sap-hana
integration_title: SAP HANA
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: redpeaks_sap_hana
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.redpeaks.sap_hana.system
  product_id: sap-hana
  short_description: 監視する SAP HANA システム (SID で識別) ごとに 1 ライセンスユニットをカウントする
  tag: uri
  unit_label: SAP システム ID (SID)
  unit_price: 190.0
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
SAP HANA インテグレーションは、SAP HANA インメモリ データベース システムを監視します。
1 つのシステムで複数のデータベース スキーマを保持でき、複数ノード構成でデプロイすることもできます。

リモートの **エージェントレス** 接続と、あらかじめ用意された監視テンプレートにより、このインテグレーションは数分で運用を開始できます。

モニタリングは [Redpeaks][1] によって提供されます (旧称 Agentil Software - Pro.Monitor)。バックアップ、トランザクション、サービス リソース、テーブルの増加、レプリケーションなど、データベースの最重要 KPI をカバーするよう、最初から構成されています。

このインテグレーションは、システムからデータをリアルタイムに収集・分析し、メトリクスとアクション可能なイベントを生成します。Redpeaks  の設定によりアラートを細かく調整し、メトリクスに直接 Datadog モニターを作成することができます。

エージェント ベースのソリューションとは異なり、このプラットフォームでは監視設定が 1 か所に集約されているため、監視対象システム側で何かを変更したりインストールしたりする必要はありません。

Redpeaks は、単一システムから数百システムまで、あらゆる種類と規模の SAP 導入環境と連携します。オンプレミス構成、プライベート クラウド、ハイブリッド環境、SAP RISE などをサポートし、お客様固有のニーズに応えられる柔軟性を提供します。

### 監視対象モジュール

- HANA ノード
- アラート
- バックアップ
- サービス CPU
- サービスメモリ
- サービスディスク
- ブロックされたトランザクション
- 接続
- スレッド
- レプリケーションステータス
- レプリケーション統計
- テーブルサイズ (レコード、マージサイズ、ディスクサイズ)
- SDI
- カスタム SQL リクエスト
- オンデマンドモニター

## サポート

サポートや機能リクエストについては、[support@redpeaks.io][2] 宛てにメールで Redpeaks までお問い合わせください。

### 参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の Redpeaks の製品を使って SAP NetWeaver を監視する][5]

*SAP や他のプラットフォームとの特定のインテグレーションのための信頼できるパートナーをお探しなら、ぜひ当社にご連絡ください。*

---
この製品は、スイスのジュネーブで設計・開発されています。

[1]: https://www.redpeaks.io
[2]: mailto:support@redpeaks.io
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
[6]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:installguide:prerequisites
[7]: https://wiki.redpeaks.io/doku.php?id=products:cockpit:1.0:installguide:installjava
[8]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc
[9]: https://mvnrepository.com/artifact/com.sap.cloud.db.jdbc/ngdbc



---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/redpeaks-sap-hana" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。