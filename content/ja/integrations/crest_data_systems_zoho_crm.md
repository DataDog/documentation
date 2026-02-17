---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-zoho-crm
app_uuid: cdfd2c18-10a3-49a4-b7d8-1347afa2d158
assets:
  dashboards:
    'Zoho CRM: Campaigns, Tasks, Calls and Meetings': assets/dashboards/crest_data_systems_zoho_crm_campaigns_tasks.json
    'Zoho CRM: Cases and Solutions': assets/dashboards/crest_data_systems_zoho_crm_cases_solutions.json
    'Zoho CRM: Deals': assets/dashboards/crest_data_systems_zoho_crm_deals.json
    'Zoho CRM: Leads, Accounts and Contacts': assets/dashboards/crest_data_systems_zoho_crm_leads_contacts_accounts.json
    'Zoho CRM: Overview': assets/dashboards/crest_data_systems_zoho_crm_overview.json
    'Zoho CRM: Products, Vendors and Price Books': assets/dashboards/crest_data_systems_zoho_crm_products.json
    'Zoho CRM: Purchase Orders, Sales Orders, Invoices and Quotes': assets/dashboards/crest_data_systems_purchase_and_sales_orders.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.zoho.crm.active_users
      metadata_path: metadata.csv
      prefix: cds.zoho.crm
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38198692
    source_type_name: crest_data_systems_zoho_crm
  monitors:
    Leads Converted Today: assets/monitors/crest_data_systems_leads_converted.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- コラボレーション
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_zoho_crm
integration_id: crest-data-systems-zoho-crm
integration_title: Zoho CRM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_zoho_crm
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.zoho_crm
  product_id: zoho-crm
  short_description: 1 組織あたり月間の Zoho CRM アクティブ ユーザー数
  tag: cds_zoho_crm_user_id
  unit_label: Zoho CRM のアクティブなクライアント
  unit_price: 2.0
public_title: Zoho CRM
short_description: Zoho CRM モジュールを監視して、販売、顧客とのやり取り、業務を効率的に追跡します。
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
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Zoho CRM モジュールを監視して、販売、顧客とのやり取り、業務を効率的に追跡します。
  media:
  - caption: 'Zoho CRM: Overview'
    image_url: images/crest_data_systems_zoho_crm_overview.png
    media_type: image
  - caption: 'Zoho CRM: Leads, Accounts and Contacts'
    image_url: images/crest_data_systems_zoho_crm_leads.png
    media_type: image
  - caption: 'zoho CRM: Deals'
    image_url: images/crest_data_systems_zoho_crm_deals.png
    media_type: image
  - caption: 'Zoho CRM: Campaigns, Tasks, Calls, and Meetings'
    image_url: images/crest_data_systems_zoho_crm_campaigns.png
    media_type: image
  - caption: 'Zoho CRM: Cases and Solutions'
    image_url: images/crest_data_systems_zoho_crm_cases.png
    media_type: image
  - caption: 'Zoho CRM: Purchase Orders, Sales Orders, Invoices and Quotes'
    image_url: images/crest_data_systems_zoho_crm_purchase_order.png
    media_type: image
  - caption: 'Zoho CRM: Products, Vendors and Price Books'
    image_url: images/crest_data_systems_zoho_crm_products.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zoho CRM
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Zoho CRM は、営業、マーケティング、顧客エンゲージメント プロセスを合理化する強力な顧客関係管理プラットフォームです。Datadog と統合することで、企業は Zoho CRM 環境をリアルタイムで監視し、販売実績、顧客とのやり取り、パイプラインの健全性、業務効率に関するインサイトを得て、データ主導の意思決定を行うことができます。

このインテグレーションは、以下のデータを収集します:

- **Metrics**: Zoho CRM のアクティブ ユーザー数

- **ログ**: リード、連絡先、アカウント、商談、キャンペーン、通話、タスク、会議、ケース、ソリューション、発注書、受注書、請求書、見積書、製品、ベンダー、価格表

- **イベント**: 認証と構成の検証


### ダッシュボード
このインテグレーションには、すぐに使えるダッシュボードが 7 つ含まれます:

- **Zoho CRM - Overview**: 販売実績や顧客とのやり取りなど、すべての CRM 活動の概要を確認できます。
- **Zoho CRM - Leads, Contacts, and Accounts**: リード ジェネレーション、顧客の詳細情報、取引先を追跡し、関係管理とコンバージョンを改善します。 
- **Zoho CRM - Deals**: 営業パイプライン、商談ステージ、収益予測を監視し、営業パフォーマンスを最適化します。 
- **Zoho CRM - Campaigns, Tasks, Calls, and Meetings**: マーケティング キャンペーン、タスクの進捗状況、通話 ログ、会議を分析し、生産性とエンゲージメントを向上させます。
- **Zoho CRM - Cases and Solutions**: 顧客の問題やソリューションの管理を支援し、効果的なサポートとサービスの問題解決を保証します。
- **Zoho CRM - Products, Vendors, and Price Books**: 販売と調達を効率化するために、在庫、ベンダーとの関係、価格戦略に関するインサイトを提供します。
- **Zoho CRM - Purchase orders, Sales Orders, Invoices, and Quotes**: 提供された見積書、注文処理、価格情報を追跡し、業務を効率化します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][6]
- 営業メール: [datadog-sales@crestdata.ai][7]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][10]

### トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ja/help/
[6]: mailto:datadog.integrations@crestdata.ai
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.crestdata.ai/datadog-integrations-readme/ZohoCRM.pdf
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[12]: https://api-console.zoho.com/
[13]: https://www.zoho.com/crm/developer/docs/api/v7/multi-dc.html


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-zoho-crm" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。