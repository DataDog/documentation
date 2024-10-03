---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-cyberark-pam
app_uuid: ababa86d-29f6-4503-b70a-40ef3772d764
assets:
  dashboards:
    'CDS CyberArk PAM : Application Details': assets/dashboards/crest_data_systems_cyberark_pam_application_details.json
    'CDS CyberArk PAM : Audit Logs': assets/dashboards/crest_data_systems_cyberark_pam_audit_logs.json
    'CDS CyberArk PAM : Inventory Overview': assets/dashboards/crest_data_systems_cyberark_pam_inventory_overview.json
    'CDS CyberArk PAM : Safe Details': assets/dashboards/crest_data_systems_cyberark_pam_safe_details.json
    'CDS CyberArk PAM : User, Account, Group Details': assets/dashboards/crest_data_systems_cyberark_pam_user_account_group_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.cyberark.pam.safe.retention_days
      metadata_path: metadata.csv
      prefix: cds.cyberark.pam
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7095797
    source_type_name: crest_data_systems_cyberark_pam
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- セキュリティ
- ネットワーク
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cyberark_pam
integration_id: crest-data-systems-cyberark-pam
integration_title: CyberArk PAM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cyberark_pam
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cyberark_pam
  product_id: cyberark-pam
  short_description: CyberArk PAM 1 ユーザーあたり/月
  tag: user_id
  unit_label: CyberArk PAM ユーザー
  unit_price: 0.5
public_title: CyberArk PAM
short_description: API と syslog を使用して CyberArk PAM のデータを監視
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
  description: API と syslog を使用して CyberArk PAM のデータを監視
  media:
  - caption: 'CDS CyberArk PAM : 監査ログ'
    image_url: images/crest_data_systems_cyberark_pam_audit_logs_details.png
    media_type: image
  - caption: 'CDS CyberArk PAM : 保管庫の詳細'
    image_url: images/crest_data_systems_cyberark_pam_safe_details.png
    media_type: image
  - caption: 'CDS CyberArk PAM : アプリケーションの詳細'
    image_url: images/crest_data_systems_cyberark_pam_application_details.png
    media_type: image
  - caption: 'CDS CyberArk PAM : インベントリ概要'
    image_url: images/crest_data_systems_cyberark_pam_inventory_overview.png
    media_type: image
  - caption: 'CDS CyberArk PAM : ユーザー、アカウント、グループの詳細'
    image_url: images/crest_data_systems_cyberark_pam_users_groups_accounts_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CyberArk PAM
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

CyberArk Privileged Access Manager (PAM) は、特権 ID や秘密情報、企業向け SSH キーを管理するための完全なライフサイクルソリューションで、あらゆる種類の特権 ID に関連する全アクティビティを、安全にプロビジョニング、管理、制御、監視することができます。

CyberArk PAM の機能には、以下のものが含まれます。

* **特権アカウントの管理:** 特権アカウントとそのアクティビティを管理します。
* **特権 SSO:** 必要なパスワードやキーを知らなくても、また指定しなくても、リモートシステムやアプリケーションに接続できます。
* **セッションの監視:** 特権アカウントの管理や、詳細なセッション監査の作成、リモートマシン上の IT 管理者の特権セッションのビデオ録画を行うために、データ保管技術を使用して、重要システムおよびアプリケーションへの特権アクセスを安全に制御および監視します。
* **セキュリティ:** CyberArk PAM プラットフォームで管理されている特権アカウントだけでなく、まだ管理されていないアカウントの使用状況を監視することで、CyberArk プラットフォームの不正使用や誤用がないかを確認します。
* **レポートと監査:** 保管活動に関するレポートを生成し、このデータをサードパーティツールにエクスポートします。

このインテグレーションでは、CyberArk Privileged Access Manager (PAM) をソースとして使用し、CyberArk PAM の REST API v13.2 を利用して、ポータルから保管庫、ユーザー、グループ、アカウント、およびアプリケーションに関連するデータを収集します。また、このインテグレーションでは、Syslog を使用してポータルから監査ログを収集します。

> **注:** このインテグレーションは CyberArk On-Prem のみをサポートしています。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート: [datadog.integrations@crestdata.ai][5]
- セールス: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][12]
## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.cyberark.com/Product-Doc/OnlineHelp/PAS/Latest/en/Content/PASIMP/DV-Integrating-with-SIEM-Applications.htm#ConfigureSIEMintegration
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/CyberArk_PAM.pdf
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cyberark-pam" target="_blank">こちらをクリック</a>してください。