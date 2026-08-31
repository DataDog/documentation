---
algolia:
  subcategory: Marketplace インテグレーション
app_id: redpeaks-sap-netweaver
app_uuid: f65f3026-11a2-4ee9-8a19-4e99dd52ca2a
assets:
  dashboards:
    SAP ABAP Transactions Overview: assets/dashboards/redpeaks_abap_transactions_details.json
    SAP ABAP transactions response times: assets/dashboards/redpeaks_abap_transactions_response_times.json
    SAP IDOCS Overview: assets/dashboards/redpeaks_system_idocs.json
    SAP Jobs Overview: assets/dashboards/redpeaks_sap_jobs_details.json
    SAP NetWeaver Overview: assets/dashboards/redpeaks_sap_global_overview.json
    SAP NetWeaver System: assets/dashboards/redpeaks_sap_netweaver_system.json
    SAP Shortdumps Overview: assets/dashboards/redpeaks_system_shortdumps.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.redpeaks.sap_netweaver.system
      metadata_path: metadata.csv
      prefix: redpeaks
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10997
    source_type_name: Redpeaks SAP NetWeaver
author:
  homepage: https://www.redpeaks.io
  name: Redpeaks
  sales_email: sales@redpeaks.io
  support_email: support@redpeaks.io
  vendor_id: redpeaks
categories:
- marketplace
- sap
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: redpeaks_sap_netweaver
integration_id: redpeaks-sap-netweaver
integration_title: SAP S/4HANA & NetWeaver
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: redpeaks_sap_netweaver
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.redpeaks.sap_netweaver.system
  product_id: sap-netweaver
  short_description: 監視する SAP システム (SID で識別) ごとに 1 ライセンスユニットをカウントする
  tag: uri
  unit_label: SAP システム ID (SID)
  unit_price: 250
public_title: SAP S/4HANA & NetWeaver
short_description: S/4HANA と NetWeaver システムの ABAP および J2EE スタックを監視する
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: S/4HANA と NetWeaver システムの ABAP および J2EE スタックを監視する
  media:
  - caption: SAP NetWeaver グローバルオーバービュー
    image_url: images/dashboard_overview.png
    media_type: image
  - caption: SAP NetWeaver システムダッシュボード
    image_url: images/dashboard_netweaver.png
    media_type: image
  - caption: SAP NetWeaver のジョブログ
    image_url: images/logs_example_jobs.png
    media_type: image
  - caption: SAP ABAP トランザクション時間
    image_url: images/abap_transaction_response_time.png
    media_type: image
  - caption: SAP ABAP トランザクションの詳細
    image_url: images/abap_transaction_details.png
    media_type: image
  - caption: SAP IDOC メッセージ
    image_url: images/abap_idocs.png
    media_type: image
  - caption: SAP バックグラウンドジョブ
    image_url: images/abap_background_jobs.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
  support: README.md#Support
  title: SAP S/4HANA & NetWeaver
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
SAP NetWeaver インテグレーションは、SAP **NetWeaver** および **S/4HANA** アプリケーションプラットフォームの ABAP および J2EE スタックを監視します。

リモート**エージェントレス**接続と事前設定された監視テンプレートを使用することで、このインテグレーションはわずか**数分**で本稼働することができます。

モニタリングは [Redpeaks][1] によって提供されます (旧 Agentil Software - Pro.Monitor)。本インテグレーションは標準構成で、SAP システムの主要なモジュールやトランザクション (**ショートダンプ、SAP ジョブ、トランザクションの応答時間、ワークプロセスなど**) をカバーします。

このインテグレーションは、システムからのデータをリアルタイムに収集・分析し、メトリクスとアクション可能なイベントを生成します。Redpeaks の設定でアラートを細かく調整でき、メトリクスに対して直接 Datadog モニターを作成できます。

Redpeaks は、1 つのシステムから数百のシステムまで、あらゆる種類と規模の SAP デプロイメントと連携します。オンプレミス、プライベートクラウド、ハイブリッド環境、SAP RISE をサポートし、個別のニーズに柔軟に対応します。

### 監視対象モジュール

- ABAP インスタンスメモリ
- ABAP インスタンスの応答時間
- ABAP ロック
- ABAP パラメーター
- ABAP ショートダンプ
- アプリケーションログ
- バッチ入力
- 証明書
- カスタム CCMS モニタリング
- データベースのバックアップ
- データベースサイズ
- DB 排他ロック
- ディスパッチャキュー
- ICM の状態・使用状況
- IDOC 交換監視
- インスタンスの可用性
- 数値範囲
- PI/XI メッセージ ABAP
- プロセスチェーンモニタリング
- QRFC/TRFC
- リアルタイムデータ
- RFC の配信先の有無
- SAP バッファ
- SAP クライアントの設定変更
- SAPconnect (SCOT/SOST)
- SAP ジョブモニタリング
- SAP トランザクション時間
- SAP トランスポート
- SAP ユーザー
- スプール
- システムログ
- 更新リクエスト
- 更新サービス
- ワークプロセス
- J2EE プロセスとインスタンス
- J2EE インスタンスのメトリクス
- 外部データベースのメトリクス: Oracle、Sybase/ASE、DB2、MaxDB、MSSQL
- Web エンドポイント

## サポート

サポートや機能リクエストについては、以下の連絡先から Redpeaks にお問い合わせください。

- メール: [support@redpeaks.io][2]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の Redpeaks 製品で SAP NetWeaver を監視する][5]

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

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/redpeaks-sap-netweaver" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。