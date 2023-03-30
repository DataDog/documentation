---
app_id: agentil-software-sap-netweaver
app_uuid: 5b070928-c509-4826-93db-8b5e9206c355
assets:
  dashboards:
    ABAP transactions response times: assets/dashboards/agentil_software_abap_transactions_response_times.json
    SAP ABAP Transactions Details: assets/dashboards/agentil_software_abap_transactions_details.json
    SAP Netweaver overview: assets/dashboards/agentil_software_sap_global_overview.json
    SAP Netweaver system dashboard: assets/dashboards/agentil_software_sap_netweaver_system.json
    SAP System IDOCS: assets/dashboards/agentil_software_system_idocs.json
    SAP System Shortdumps: assets/dashboards/agentil_software_system_shortdumps.json
    SAP jobs details: assets/dashboards/agentil_software_sap_jobs_details.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_netweaver.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: AGENTIL Software SAP NetWeaver
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- マーケットプレイス
- cloud
- モニタリング
- sap
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_netweaver
integration_id: agentil-software-sap-netweaver
integration_title: SAP S/4HANA & NetWeaver
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_netweaver
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_netweaver.system
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
  - Supported OS::Linux
  - Category::Marketplace
  - Category::Cloud
  - Category::Monitoring
  - Category::SAP
  - Offering::Integration
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
  support: README.md#Support
  title: SAP S/4HANA & NetWeaver
  uninstallation: README.md#Uninstallation
---



## 概要
SAP NetWeaver インテグレーションは、SAP **NetWeaver** および **S/4HANA** アプリケーションプラットフォームの ABAP および J2EE スタックを監視します。

リモート**エージェントレス**接続と事前設定された監視テンプレートを使用することで、このインテグレーションはわずか**数分**で本稼働することができます

モニタリングには、AGENTIL Software の [Pro.Monitor](https://www.agentil-software.com) プラットフォームが使用されています。SAP システムの最も関連性の高いモジュールとトランザクションをカバーするように、すぐに設定することができます (**ショートダンプ、SAP ジョブ、トランザクション応答時間、ワークプロセスなど**)。

このインテグレーションは、システムからデータをリアルタイムに収集・分析し、メトリクスとアクション可能なイベントを生成します。Pro.Monitor の設定によりアラートを細かく調整し、メトリクスに直接 Datadog モニターを作成することができます。

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

## サポート
サポートや機能のリクエストについては、AGENTIL Software (support@agentil-software.com) までお問い合わせください。

*SAP や他のプラットフォームとの特定のインテグレーションのための信頼できるパートナーをお探しなら、ぜひ当社にご連絡ください。*

---
この製品は、スイスのジュネーブで設計・開発されています。


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-netweaver" target="_blank">こちらをクリック</a>してください。