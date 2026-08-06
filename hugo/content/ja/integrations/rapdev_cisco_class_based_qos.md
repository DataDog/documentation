---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-cisco-class-based-qos
app_uuid: 97f3eada-2bd0-4100-94f7-fe7f20132442
assets:
  dashboards:
    RapDev Cisco QOS Dashboard: assets/dashboards/rapdev_cisco_classbased_qos_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.cisco_class_based_qos.devices_monitored
      metadata_path: metadata.csv
      prefix: rapdev.cisco_class_based_qos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10457427
    source_type_name: cisco_class_based_qos
  logs: {}
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: sales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- ネットワーク
- snmp
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_cisco_class_based_qos
integration_id: rapdev-cisco-class-based-qos
integration_title: Cisco Quality of Service (QOS)
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_cisco_class_based_qos
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.cisco_class_based_qos
  product_id: cisco
  short_description: QOS デバイス 1 台あたりの単価
  tag: qos_host
  unit_label: QOS デバイス
  unit_price: 20
public_title: Cisco Quality of Service (QOS)
short_description: Cisco クラスベースの QoS を使用してネットワークトラフィックを監視
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Category::Network
  - Category::SNMP
  - Category::Metrics
  configuration: README.md#Setup
  description: Cisco クラスベースの QoS を使用してネットワークトラフィックを監視
  media:
  - caption: QOS ダッシュボード - ライトモード 1/3
    image_url: images/dashboard_light_1.jpg
    media_type: image
  - caption: QOS ダッシュボード - ライトモード 2/3
    image_url: images/dashboard_light_2.jpg
    media_type: image
  - caption: QOS ダッシュボード - ライトモード 3/3
    image_url: images/dashboard_light_3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Quality of Service (QOS)
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Cisco ネットワークにおける QoS (Quality of Service) は、トラフィックを管理し、各種ネットワークサービスがパフォーマンス要件を満たすように設計された技術と手法の集合体です。Cisco の QoS は、音声やビデオ会議などの重要なアプリケーションが適切に機能するよう、特にネットワーク輻輳時に必要な帯域幅と低レイテンシーを確保するため、特定のトラフィックを優先的に扱うことで機能します。

Cisco QoS の主なコンポーネントには以下が含まれます。
- 分類とマーキング: トラフィックの種類を識別し、異なる処理のためにマーキングします。これは、パケットを検査し、ポリシーに基づいて異なるクラスに割り当てるプロセスです。
- キューイング: トラフィック混雑を管理し、優先度の高いトラフィックを確実に処理します。これには、優先キューイング、加重公平キューイング (WFQ)、クラスベース加重公平キューイング (CBWFQ) などのアルゴリズムが含まれます。
- 輻輳管理および回避: Tail Drop や Random Early Detection (RED) などのツールを使用して、トラフィックフローを管理し、パケットを制御された形で破棄することで、ネットワークの輻輳を防止します。
- トラフィックシェーピングとポリシング: 定義された帯域幅制限に従ってトラフィックフローを調整します。トラフィックシェーピングはフローをスムーズにし、ポリシングは指定されたレートを超えたトラフィックを破棄します。
- リンク効率化メカニズム: リンクフラグメンテーションおよびインターリーブ (LFI) や圧縮技術を利用してネットワークリンクの効率を向上させます。

インテグレーションは、選択された MIB オブジェクトについて Cisco デバイスを定期的にポーリングし、収集されたデータは QoS ポリシーのパフォーマンスと使用状況の統計を示します。これにより、ネットワーク管理者はトラフィックパターンを分析し、QoS ポリシーの効果を検証し、必要に応じて調整を行うことができます。

Cisco クラスベースの QoS インテグレーションは、SNMP 対応の Cisco デバイス上で[クラスベースのトラフィックポリシング][2]の統計を監視します。クラスベースのポリシングを使用すると、インターフェイス上で送信または受信されるトラフィックの最大レートを制御できます。デバイスを流れるさまざまなクラスのネットワークトラフィックを、ポリシー適用前後の両方で観測でき、異なるポリシーがこのトラフィックにどのように影響を与えるかも確認することが可能です。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][8]  
- セールス: [sales@rapdev.io][9]  
- チャット: [rapdev.io][10]  
- 電話: 855-857-0222

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos_plcshp/configuration/xe-16/qos-plcshp-xe-16-book/qos-plcshp-class-plc.html
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://sourceforge.net/projects/net-snmp/
[6]: https://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/7282-12.html
[7]: https://community.cisco.com/t5/networking-knowledge-base/configuration-template-for-snmpv3/ta-p/4666450
[8]: mailto:support@rapdev.io  
[9]: mailto:sales@rapdev.io  
[10]: https://www.rapdev.io/#Get-in-touch  
[11]: https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-cisco-class-based-qos" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。