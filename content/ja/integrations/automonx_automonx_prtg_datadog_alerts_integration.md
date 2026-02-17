---
algolia:
  subcategory: Marketplace インテグレーション
app_id: automonx-prtg-datadog-alerts
app_uuid: 0ac61364-d76e-4cff-afa8-213c4e952686
assets:
  dashboards:
    PRTG Alerts Dashboard: assets/dashboards/automonx_prtg_events.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20041432
    source_type_name: automonx_prtg_datadog_alerts_integration
  monitors:
    Device is Down due to Ping: assets/monitors/Device-PingDown.json
    'HPE ProLiant System Health: Error caused by lookup value ''Failed'' in channel ''Overall Status''': assets/monitors/ILO-HardwareError.json
    HPE Server is degraded in channel 'Power Supply': assets/monitors/ILO-Degraded.json
    Network Interface Traffic is High: assets/monitors/NetworkInterface-TrafficHigh.json
    Server Available Memory is too Low: assets/monitors/ServerFreeMemory-Down.json
    Server CPU is High: assets/monitors/ServerCPU-Down.json
    Server Disk Utilization is High: assets/monitors/ServerDiskUtil-Down.json
author:
  homepage: https://www.automonx.com/smartnotif
  name: AutoMonX
  sales_email: sales@automonx.com
  support_email: support@automonx.com
  vendor_id: autononx
categories:
- イベント管理
- marketplace
- alerting
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: automonx_automonx_prtg_datadog_alerts_integration
integration_id: automonx-prtg-datadog-alerts
integration_title: PRTG 向けスマート通知
integration_version: ''
is_public: true
legal_terms:
  eula: assets/AutomonX-EULA.pdf
manifest_version: 2.0.0
name: automonx_automonx_prtg_datadog_alerts_integration
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: automonx-prtg-datadog-alerts
  short_description: AutoMonX スマート通知インテグレーションの年間料金
  unit_price: 60
public_title: PRTG 向けスマート通知
short_description: 当社のスマート通知エンジンで PRTG Network Monitor のノイズの多いアラートを削減
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Event Management
  - Category::Marketplace
  - Category::Alerting
  - Offering::Integration
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 当社のスマート通知エンジンで PRTG Network Monitor のノイズの多いアラートを削減
  media:
  - caption: PRTG-Datadog インテグレーション向けの AutoMonX スマート通知  - ネットワークデバイスからのサンプルイベント
    image_url: images/AutoMonX_PRTG_NetworkIn_DD_Event.png
    media_type: image
  - caption: PRTG-Datadog インテグレーション向けの AutoMonX スマート通知  - モニタリングイベントのフロー
    image_url: images/AutoMonX_Events_from_PRTG_to_DD.png
    media_type: image
  - caption: PRTG-Datadog インテグレーション向けの AutoMonX スマート通知  - イベントモニターのサンプル
    image_url: images/AutoMonX_Event_Monitors.png
    media_type: image
  - caption: PRTG-Datadog インテグレーション向けの AutoMonX スマート通知  - イベントダッシュボード
    image_url: images/AutoMonX_Event_Dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: PRTG 向けスマート通知
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

PRTG Network Monitor ユーザー向けに設計された当社のソリューションで、オンプレミスのシステムおよびネットワーク モニタリングを強化しましょう。AutoMonX の [スマート通知][1] をご紹介します。当社の革新的な通知エンジンは高度なフィルタリング メカニズムを備え、最も重要なアラートのみをチームに届けます。Datadog と PRTG Network Monitor にシームレスに統合されることで、ネットワークおよびシステム管理者が問題を先取りできる、信頼性の高いフォーカスされた通知を実現します。

このノーコードのインテグレーションにより、オンプレミスの既存のモニタリングシステムを即座に活用し、より広範な Datadog の観測可能性プラットフォームのエコシステムへと拡張することができます。

Paessler の PRTG Network Monitor は、オンプレミス、クラウド、またはハイブリッド環境に関わらず、企業の ITインフラストラクチャ全体の監視を支援する IT モニタリングソフトウェアです。

スマートなフィルタリングアルゴリズムにより、スマート通知はモニタリングエラーと実際のシステムまたはネットワークの問題を区別し、これらの問題を適切な管理者 (MonitorOps またはネットワーク/システム管理者) にルーティングします。内蔵の相関付け機能により、深刻なネットワーク障害時のノイズをさらに減らすことができ、ネットワークおよびシステムの担当チームはより優先度の高い問題に集中することができます。

### イベント
このインテグレーションは、 PRTG Network Monitor のアラートをイベントとして Datadog へ送信します。イベントには、問題の発生源を絞り込むのに役立つ関連タグが含まれています。これらのタグは PRTG 側で設定されます。

## サポート
サポートが必要な場合は、[support@automonx.com][3] までご連絡ください。

[1]: https://www.automonx.com/smartnotif
[2]: http://www.automonx.com/downloads
[3]: mailto:support@automonx.com

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/automonx-prtg-datadog-alerts" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。