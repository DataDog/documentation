---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-fortigate
app_uuid: 161092c6-b52c-465b-b46b-442b82768e67
assets:
  dashboards:
    CDS FortiGate Overview: assets/dashboards/crest_data_systems_fortigate_overview.json
    CDS FortiGate System: assets/dashboards/crest_data_systems_fortigate_system.json
    CDS FortiGate Traffic: assets/dashboards/crest_data_systems_fortigate_traffic.json
    CDS FortiGate UTM: assets/dashboards/crest_data_systems_fortigate_utm.json
    CDS FortiGate User Audit: assets/dashboards/crest_data_systems_fortigate_user_audit.json
    CDS FortiGate Wireless Network and VPN: assets/dashboards/crest_data_systems_fortigate_wireless_network_and_vpn.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.fortigate.system_metrics
      metadata_path: metadata.csv
      prefix: cds.fortigate.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10362
    source_type_name: crest_data_systems_fortigate
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- network
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_fortigate
integration_id: crest-data-systems-fortigate
integration_title: FortiGate
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_fortigate
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: fortigate
  short_description: fortigate インテグレーションの月額定額料金。
  unit_price: 995.0
public_title: FortiGate
short_description: すべての FortiGate 転送ログの監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: すべての FortiGate 転送ログの監視
  media:
  - caption: CDS FortiGate - 概要
    image_url: images/crest_data_systems_fortigate_overview.png
    media_type: image
  - caption: CDS FortiGate - システム
    image_url: images/crest_data_systems_fortigate_system.png
    media_type: image
  - caption: CDS FortiGate - トラフィック
    image_url: images/crest_data_systems_fortigate_traffic.png
    media_type: image
  - caption: CDS FortiGate - ユーザー監査
    image_url: images/crest_data_systems_fortigate_user_audit.png
    media_type: image
  - caption: CDS FortiGate - UTM
    image_url: images/crest_data_systems_fortigate_utm.png
    media_type: image
  - caption: CDS FortiGate - ワイヤレスネットワークと VPN
    image_url: images/crest_data_systems_fortigate_wireless_network_and_vpn.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: FortiGate
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

- FortiGate は、ファイアウォール、侵入防止、アンチウイルス、SSL 検査、アプリケーション 制御など、幅広い脅威対策機能を備えています。FortiGate は、アプリケーション、ユーザー、ネットワークを自動的に可視化して運用の複雑さを抑え、セキュリティ ベスト プラクティスの採用を後押しするセキュリティ 評価も提供します。

  このインテグレーションは、以下のログタイプとサブタイプを収集します。

  | タイプ    | 説明                                                                             | サブ タイプ                                                            |
  | ------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
  | Traffic | HTTP/HTTPS リクエストと (存在する場合は) そのレスポンスなど、トラフィック フロー情報を記録します | FORWARD, LOCAL                                                     |
  | Event   | システムおよび管理に関するイベントを記録します                                                | SYSTEM, USER, VPN, WIRELESS |
  | UTM     | UTM イベントを記録します                                                                      | IPS, WEB                    |


> **注**: メトリクスのサポートは終了しており、関連パネルは integration v1.1.0 以降で非推奨になっています。今後のインテグレーション リリースでは、これらを完全に削除する予定です。

このインテグレーションには、モニタリングとセキュリティを強化するため、次の [Datadog Cloud SIEM][11] 検知ルールが含まれます:

1. FortiGate detected access to malicious or risky websites
2. FortiGate activity detected from new or suspicious location
3. FortiGate detected rogue access point
4. Received FortiGate event with critical severity
5. FortiGate observed frequent large amounts of data transferred to file-sharing sites
6. FortiGate detected high number of blocked actions
7. FortiGate observed multiple authentication failures
8. FortiGate received multiple intrusion prevention events from a single source
9. FortiGate observed unusual network traffic

> **注**: 標準の検出ルールを使用するには、Datadog で該当のインテグレーションがインストールされ、Cloud SIEM が有効化されている必要があります。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート メール: [datadog.integrations@crestdata.ai][6]
- 営業メール: [datadog-sales@crestdata.ai][7]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][10]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://community.fortinet.com/t5/FortiGate/Technical-Tip-How-to-configure-logging-in-memory-in-later/ta-p/193637
[6]: mailto:datadog.integrations@crestdata.ai
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Fortigate.pdf
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: https://docs.datadoghq.com/ja/security/cloud_siem/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-fortigate" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。