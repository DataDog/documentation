---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-picus-security
app_uuid: 770decf4-4d68-442d-87fe-6e4b2ec3fed4
assets:
  dashboards:
    Picus Security - Activity: assets/dashboards/crest_data_systems_picus_security_activity.json
    Picus Security - Inventory: assets/dashboards/crest_data_systems_picus_security_inventory.json
    Picus Security - Threats: assets/dashboards/crest_data_systems_picus_security_threats.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35190397
    source_type_name: crest_data_systems_picus_security
  logs:
    source: crest_data_systems_picus_security
author:
  homepage: https://crestdata.ai
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
git_integration_title: crest_data_systems_picus_security
integration_id: crest-data-systems-picus-security
integration_title: Picus Security
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_picus_security
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: picus-security
  short_description: 月額の定額料金。
  unit_price: 95
public_title: Picus Security
short_description: インベントリ データ用のログに加え、Picus Security の脅威ログとアクティビティ ログを収集します。
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
  configuration: README.md#Setup
  description: インベントリ データ用のログに加え、Picus Security の脅威ログとアクティビティ ログを収集します。
  media:
  - caption: Picus Security - Inventory
    image_url: images/crest_data_systems_picus_security_inventory.png
    media_type: image
  - caption: Picus Security - Threats
    image_url: images/crest_data_systems_picus_security_threats.png
    media_type: image
  - caption: Picus Security - Activity
    image_url: images/crest_data_systems_picus_security_activity.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Picus Security
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[**Picus Security**][1] は、組織の防御態勢を評価し、強化するためのセキュリティ検証プラットフォームです。現実世界のサイバー攻撃 (例: フィッシング、マルウェア) をシミュレーションし、ファイアウォール、侵入防止システム、エンドポイント セキュリティ ソリューションなどのセキュリティ コントロールを評価します。

- **Picus Security Datadog Integration** を利用すると、Picus Security のデータを Datadog にログとして収集し、可視化できます。収集されるデータは次のとおりです:

- **インベントリ データ**: Picus Agents、Integrations、Integration Agents、Mitigation Devices、Simulations
- **脅威データ**
- **アクティビティ データ**

このインテグレーションには、監視とセキュリティを強化するための [Datadog Cloud SIEM](https://docs.datadoghq.com/security/cloud_siem/) 検知ルールが、すぐ使える形で含まれています:

  1. Picus Security で失敗したログイン試行が異常に多いことを検知
  2. Picus Security で新規または不審なロケーションからのアクティビティを検知

### ダッシュボード
このインテグレーションには、すぐに利用できるダッシュボードが 3 つ含まれています:

1. **Picus Security - Inventory**: ユーザーが指定した `interval_for_inventory` で収集した、Picus Agents、Integrations、Integration Agents、Mitigation Devices、Simulations のデータを可視化します。
2. **Picus Security - Threats**: `min_collection_interval` で収集した脅威データを表示します。
3. **Picus Security - Activity**: Picus Security Web Application 上で実行されたアクティビティを監視します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート: [datadog.integrations@crestdata.ai][9]
- 営業: [datadog-sales@crestdata.ai][10]
- Web サイト: [crestdata.ai][11]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]

[1]: https://app.picussecurity.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Picus_Security.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/
[12]: https://docs.datadoghq.com/ja/security/cloud_siem/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-picus-security" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。