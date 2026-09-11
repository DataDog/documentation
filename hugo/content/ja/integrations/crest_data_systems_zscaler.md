---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-zscaler
app_uuid: d5380f02-9141-4dd3-8053-e13bb501b7e8
assets:
  dashboards:
    'Zscaler ZIA: Audit': assets/dashboards/crest_data_systems_zscaler_zia_audit.json
    'Zscaler ZIA: DNS': assets/dashboards/crest_data_systems_zscaler_zia_dns.json
    'Zscaler ZIA: Endpoint': assets/dashboards/crest_data_systems_zscaler_zia_endpoint.json
    'Zscaler ZIA: Firewall': assets/dashboards/crest_data_systems_zscaler_zia_firewall.json
    'Zscaler ZIA: Tunnel': assets/dashboards/crest_data_systems_zscaler_zia_tunnel.json
    'Zscaler ZIA: Web': assets/dashboards/crest_data_systems_zscaler_zia_web.json
    'Zscaler ZPA: App Connector': assets/dashboards/crest_data_systems_zscaler_zpa_app_connector.json
    'Zscaler ZPA: App Protection': assets/dashboards/crest_data_systems_zscaler_zpa_app_protection.json
    'Zscaler ZPA: Audit': assets/dashboards/crest_data_systems_zscaler_zpa_audit.json
    'Zscaler ZPA: Browser Access': assets/dashboards/crest_data_systems_zscaler_zpa_browser_access.json
    'Zscaler ZPA: Private Service Edge': assets/dashboards/crest_data_systems_zscaler_zpa_private_service_edge.json
    'Zscaler ZPA: User Activity': assets/dashboards/crest_data_systems_zscaler_zpa_user_activity.json
    'Zscaler ZPA: User Status': assets/dashboards/crest_data_systems_zscaler_zpa_user_status.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31633910
    source_type_name: crest_data_systems_zscaler
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- ネットワーク
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_zscaler
integration_id: crest-data-systems-zscaler
integration_title: Zscaler
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_zscaler
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: zscaler
  short_description: Zscaler インテグレーションの月額定額料金。
  unit_price: 995.0
public_title: Zscaler
short_description: Zscaler Private Access と Zscaler Internet Access のログを監視し、洞察を得る
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
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Zscaler Private Access と Zscaler Internet Access のログを監視し、洞察を得る
  media:
  - caption: 'Zscaler ZIA: Audit'
    image_url: images/crest_data_systems_zscaler_zia_audit.png
    media_type: image
  - caption: 'Zscaler ZIA: DNS'
    image_url: images/crest_data_systems_zscaler_zia_dns.png
    media_type: image
  - caption: 'Zscaler ZIA: Endpoint'
    image_url: images/crest_data_systems_zscaler_zia_endpoint.png
    media_type: image
  - caption: 'Zscaler ZIA: Web'
    image_url: images/crest_data_systems_zscaler_zia_web.png
    media_type: image
  - caption: 'Zscaler ZPA: User-Status'
    image_url: images/crest_data_systems_zscaler_zpa_user_status.png
    media_type: image
  - caption: 'Zscaler ZPA: Audit'
    image_url: images/crest_data_systems_zscaler_zpa_audit.png
    media_type: image
  - caption: 'Zscaler ZPA: User Activity'
    image_url: images/crest_data_systems_zscaler_zpa_user_activity.png
    media_type: image
  - caption: 'Zscaler ZPA: App Connector'
    image_url: images/crest_data_systems_zscaler_zpa_app_connector.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zscaler
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Zscaler は、Zero Trust Exchange プラットフォームを通じて高度なセキュリティ機能を提供し、アプリケーションやインターネット リソースへのセキュアなアクセスを可能にします。**Zscaler Private Access (ZPA)** と **Zscaler Internet Access (ZIA)** により、企業はセキュアなリモート接続とインターネット トラフィックの管理を合理化できます。 

このインテグレーションは、以下のログタイプとサブタイプを収集します。

| タイプ                    | 説明                                                                 | サブタイプ                                             |
| ----------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| ZPA: App Connector       | App Connector のパフォーマンスと可用性に関連するメトリクスとステータス情報 | メトリクス、ステータス                                     |
| ZPA: Private Service Edge| Private Service Edge のパフォーマンスと接続に関連するメトリクスとステータス情報 | Metrics、Status                                     |
| ZPA: User                | エンド ユーザーのリクエスト、可用性、接続状況に関する情報       | アクティビティ、ステータス                                    |
| ZPA: Browser Access      | Browser Access アクティビティの HTTP ログの詳細                              | アクセス ログ                                         |
| ZPA: Audit               | ZPA Admin Portal のすべての管理者アクティビティのセッション情報        | 監査ログ                                          |
| ZPA: AppProtection       | AppProtection ポリシー アクティビティの詳細                                  | AppProtection                                       |
| ZIA: Web                 | Web トラフィックとアクセスに関するログ                                      | Web ログ                                            |
| ZIA: Firewall            | ファイアウォールのアクティビティの詳細を記録したログ                                            | ファイアウォール ログ                                       |
| ZIA: DNS                 | DNS クエリと応答に関する情報                                 | DNS ログ                                            |
| ZIA: Tunnel              | トンネル アクティビティに関するログ                                             | トンネル ログ                                         |
| ZIA: Audit               | 管理者操作を記録する管理監査ログ                           | 監査ログ                                          |
| ZIA: DLP                 | ポリシー違反を記録した Data Loss Prevention ログ                       | エンドポイント DLP ログ                                            |

このインテグレーションには、監視とセキュリティを強化するための、すぐに使える [Datadog Cloud SIEM][12] の検出ルールが含まれています:

1. Zscaler ZPA: App Connector Authentication Failure Anomaly (App Connector の認証失敗に関する異常)
2. Zscaler ZPA: Detection of activity from new or suspicious location (新規または疑わしい場所からのアクティビティの検出)
3. Zscaler ZPA: Anomaly in Fully Qualified Domain Name Error (完全修飾ドメイン名のエラーに関する異常)
4. Zscaler ZPA: User Authentication Failure Anomaly (ユーザー認証の失敗に関する異常)
5. Zscaler ZIA: DLP Policy Violation with High or Critical or Emergency Severity (深刻度が「高」「重大」「緊急」の DLP ポリシー違反)
6. Zscaler ZIA: DLP Alert for exempt ZDP mode in 1 Hour (過去 1 時間の ZDP の除外モードに関する DLP アラート)
7. Zscaler ZIA: Unusual Amount of Failed Authentications (認証失敗数の異常)
8. Zscaler ZIA: Multiple Policy Violations by Single User (単一ユーザーによる複数のポリシー違反)

> **注**: 標準の検出ルールを使用するには、Datadog で該当のインテグレーションがインストールされ、Cloud SIEM が有効化されている必要があります。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][7]
- 営業メール: [datadog-sales@crestdata.ai][8]
- Web サイト: [crestdata.ai][9]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]




[1]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Zscaler.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai
[9]: https://www.crestdata.ai/
[10]: https://help.zscaler.com/zpa/configuring-log-receiver
[11]: https://help.zscaler.com/zia/documentation-knowledgebase/analytics/nss/nss-feeds
[12]: https://docs.datadoghq.com/ja/security/cloud_siem/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-zscaler" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。