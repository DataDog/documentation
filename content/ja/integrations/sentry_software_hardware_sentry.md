---
app_id: hardware-sentry
app_uuid: daade024-2095-4a73-afe5-35afbe9e2b12
assets:
  dashboards:
    Hardware Sentry - Host: assets/dashboards/host.json
    Hardware Sentry - Main: assets/dashboards/main.json
    Hardware Sentry - Site: assets/dashboards/site.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: hardware_sentry.agent.info
      metadata_path: metadata.csv
      prefix: hardware_sentry.
    service_checks:
      metadata_path: service_checks.json
    source_type_name: Hardware Sentry
  logs: {}
  monitors:
    Hardware Sentry - Agent-NoData: assets/monitors/agent-nodata.json
    Hardware Sentry - Connector Failed: assets/monitors/connector-failed.json
    Hardware Sentry - Critical Fan Speed: assets/monitors/critical-fan-speed.json
    Hardware Sentry - Critical Temperature: assets/monitors/critical-temperature.json
    Hardware Sentry - Errors: assets/monitors/errors.json
    Hardware Sentry - High Temperature: assets/monitors/high-temperature.json
    Hardware Sentry - High Voltage: assets/monitors/high-voltage.json
    Hardware Sentry - Intrusion: assets/monitors/intrusion.json
    Hardware Sentry - Link Down: assets/monitors/network-link-down.json
    Hardware Sentry - Low Battery: assets/monitors/low-battery.json
    Hardware Sentry - Low Fan Speed: assets/monitors/low-fan-speed.json
    Hardware Sentry - Low Fan Speed %: assets/monitors/low-fan-speed-percent.json
    Hardware Sentry - Low Voltage: assets/monitors/low-voltage.json
    Hardware Sentry - Lun Multipathing: assets/monitors/lun-multipathing.json
    Hardware Sentry - Missing Device: assets/monitors/missing-device.json
    Hardware Sentry - Network Errors: assets/monitors/errors-network.json
    Hardware Sentry - Power Capacity: assets/monitors/power-capacity.json
    Hardware Sentry - Predicted Failure: assets/monitors/predicted-failure.json
    Hardware Sentry - Status Degraded: assets/monitors/status-degraded.json
    Hardware Sentry - Status Failed: assets/monitors/status-failed.json
    Hardware Sentry - Tape Drive Cleaning: assets/monitors/tape-drive-cleaning.json
author:
  homepage: https://sentrysoftware.com
  name: Sentry Software
  sales_email: datadog@sentrysoftware.com
  support_email: support@sentrysoftware.com
  vendor_id: sentry-software
categories:
- モニタリング
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry_software_hardware_sentry
integration_id: hardware-sentry
integration_title: Hardware Sentry
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: sentry_software_hardware_sentry
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: hardware_sentry.host.configured
  product_id: hardware-sentry
  short_description: 月額サブスクリプションの価格は、Hardware Sentry OpenTelemetry Collector で監視するホストの台数によって決まります。サブスクリプションは、Sentry
    Desk が提供するサポートサービスへのアクセスを許可します。
  tag: ホスト
  unit_label: 監視ホスト
  unit_price: 8
public_title: Hardware Sentry
short_description: サーバー、ネットワーク、ストレージのハードウェアとその二酸化炭素排出量の監視
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Monitoring
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: サーバー、ネットワーク、ストレージのハードウェアとその二酸化炭素排出量の監視
  media:
  - caption: Hardware Sentry のメインダッシュボードでは、すべてのデータセンターとサーバールームのエネルギー使用量と二酸化炭素排出量の概要が表示されます。これは、Hardware
      Sentry OpenTelemetry Collector によって収集されたメトリクスを活用したものです。
    image_url: images/dashboard-main.png
    media_type: image
  - caption: 'アーキテクチャ図: Hardware Sentry OpenTelemetry Collector はオンプレミスで動作し、サーバー、スイッチ、ストレージシステムを監視し、Datadog
      環境にメトリクスをプッシュします。'
    image_url: images/architecture.png
    media_type: image
  - caption: Hardware Sentry は、監視対象ホストごとに、その電子部品 (CPU、メモリ、ディスク、NIC、センサーなど)、電力消費量、二酸化炭素排出量を監視しています。
    image_url: images/dashboard-host.png
    media_type: image
  - caption: 各サイト (データセンター、サーバールーム) において、1 日、1 か月、1 年間のエネルギーと二酸化炭素排出量を試算しています。1 年間の省エネ効果を考慮した最適な温度を提案します。
    image_url: images/dashboard-site.png
    media_type: image
  - caption: すべてのハードウェアの問題 (ディスク、メモリーモジュール、NIC、電源など) は、特定のモニターで監視され、詳細なメッセージが表示されます。
    image_url: images/events-explorer.png
    media_type: image
  - caption: Hardware Sentry インテグレーションには、インフラストラクチャーにおけるハードウェアの問題を報告するための推奨モニターのコレクションが付属しています。
    image_url: images/triggered-monitors.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Hardware Sentry
---



## 概要

**[Hardware Sentry](https://www.sentrysoftware.com/products/hardware-sentry-opentelemetry-collector.html)** は、データセンター内のサーバー、ネットワークスイッチ、ストレージシステムのハードウェアコンポーネントの監視に特化した Agent (*OpenTelemetry Collector*) で、Datadog 用のダッシュボードやモニターのコレクションとパッケージ化されています。

### ハードウェアの監視

**Hardware Sentry** は、サーバー、ネットワークスイッチ、ストレージシステムの物理的な健全性を報告することができる監視 Agent です。定期的にメトリクスを収集し、各プロセッサ、コントローラ、ディスク、電源の状態、温度、ファンの回転数、ネットワークカードのリンク状態や速度などを報告します。

* **リモート**: SNMP、WBEM、WMI、SSH、IPMI、REST API などを通じて、1 つの Agent で数百のシステムを監視することができます。
* **マルチプラットフォーム**: 100 以上のプラットフォームを 250 以上のコネクターでサポート済み (Cisco、Dell EMC、HP、Huawei、IBM、Lenovo、NetApp、Oracle、Pure など。[全リストを見る](https://sentrysoftware.com/docs/hws-otel-collector/latest/platform-requirements.html))
* **シンプル**: システムの監視は、ホスト名または IP アドレスと認証情報を指定する最小限の構成作業で済みます。**Hardware Sentry** は、利用可能なインスツルメンテーションを自動的に検出し、すぐに監視を開始します。
* **正規化**: 必要な情報はすべて、Datadog の標準化されたメトリクスを通じて報告されます。例えば、同じ `hw.temperature` メトリクスは、NetApp ファイラー、HP BladeSystem、Windows を実行しているDell PowerEdge、Linux を実行している Cisco UCS、またはその他のプラットフォームの温度を表すために使用されています。これらのメトリクスは、[OpenTelemetry のセマンティック規約](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/metrics/semantic_conventions)に従っています。

**Hardware Sentry** は、プロセッサ、メモリモジュール、ディスク、ネットワークカード、コントローラ、電源、ファン、温度センサーなどの障害を検出・予測するための定義済みモニターを搭載しています。

### エネルギー使用量とカーボンフットプリントレポート

物理的な健全性の監視に加え、**Hardware Sentry** は各監視対象システムのエネルギー使用量も報告します。電気料金や炭素濃度を表すメトリクスと組み合わせて、提供されるダッシュボードは、インフラストラクチャーの電気使用量を kWh で、炭素フットプリントを CO2 トン単位で報告します。

**100% ソフトウェア開発**: 電力センサーを内蔵していないシステムでも、スマート PDU は不要です。

### ダッシュボード  

このインテグレーションには、**[Hardware Sentry OpenTelemetry Collector](https://www.sentrysoftware.com/products/hardware-sentry-opentelemetry-collector.html)** が収集したメトリクスを活用するダッシュボードのセットが付属しています。

| ダッシュボード   | 説明 |
|---|---|
| Hardware Sentry - メイン | サステナビリティを重視した監視対象全ホストの概要 |
| Hardware Sentry - サイト | 1 つの*サイト* (データセンターまたはサーバールーム) とその監視対象*ホスト*に関連するメトリクス |
| Hardware Sentry - ホスト | 1 つの*ホスト*とその内部デバイスに関連するメトリクス |

## サポート

Datadog Marketplace を通じた Hardware Sentry のサブスクリプションにより、[Sentry Desk](https://www.sentrysoftware.com/desk) が提供するすべてのサービスにアクセスすることができるようになります。

* [Jira Service Management](https://sentrydesk.atlassian.net/servicedesk/customer/portals) による技術サポート
* ナレッジベース
* パッチ

ご契約後、お客様の組織に *Sentry Desk* のアカウント管理のための招待状が届きます。