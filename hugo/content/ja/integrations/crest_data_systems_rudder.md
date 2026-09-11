---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-rudder
app_uuid: ce24a620-979e-4954-ac5d-f90b66061e1f
assets:
  dashboards:
    Rudder - Change Requests: assets/dashboards/crest_data_systems_rudder_change_requests.json
    Rudder - Directives: assets/dashboards/crest_data_systems_rudder_directives.json
    Rudder - Groups: assets/dashboards/crest_data_systems_rudder_groups.json
    Rudder - Nodes: assets/dashboards/crest_data_systems_rudder_nodes.json
    Rudder - Rules: assets/dashboards/crest_data_systems_rudder_rules.json
    Rudder - Techniques: assets/dashboards/crest_data_systems_rudder_techniques.json
    Rudder Overview: assets/dashboards/crest_data_systems_rudder_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cd.rudder.compliance_stats.compliance_error
      metadata_path: metadata.csv
      prefix: cd.rudder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35801079
    source_type_name: crest_data_systems_rudder
  logs:
    source: crest-data-systems-rudder
  monitors:
    A system security update is available: assets/monitors/crest_data_systems_a_system_security_update_is_available.json
    CPU Usage Exceeds Limit: assets/monitors/crest_data_systems_cpu_usage_exceeds_limit.json
    Global Compliance Fell Below Defined Limit: assets/monitors/crest_data_systems_global_compliance_fell_below_defined_limit.json
    Total Critical Vulnerabilities Exceed Limit: assets/monitors/crest_data_systems_total_critical_vulnerabilities_exceed_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- log collection
- automation
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_rudder
integration_id: crest-data-systems-rudder
integration_title: Rudder
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_rudder
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.rudder
  product_id: rudder
  short_description: Rudder ノード 1 台あたり / 月
  tag: node_id
  unit_label: Rudder Nodes
  unit_price: 1.0
public_title: Rudder
short_description: Rudder からコンプライアンス データ、ディレクティブ、グループ、テクニック、ルール、ノード、脆弱性情報、およびユーザー
  テレメトリを収集します。
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
  - Category::Log Collection
  - Category::Automation
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Rudder からコンプライアンス データ、ディレクティブ、グループ、テクニック、ルール、ノード、脆弱性情報、およびユーザー テレメトリを収集します。
  media:
  - caption: Rudder Overview
    image_url: images/crest_data_systems_rudder_overview.png
    media_type: image
  - caption: Rudder - Nodes
    image_url: images/crest_data_systems_rudder_nodes.png
    media_type: image
  - caption: Rudder - Groups
    image_url: images/crest_data_systems_rudder_groups.png
    media_type: image
  - caption: Rudder - Directives
    image_url: images/crest_data_systems_rudder_directives.png
    media_type: image
  - caption: Rudder - Change Requests
    image_url: images/crest_data_systems_rudder_change_requests.png
    media_type: image
  - caption: Rudder - Rules
    image_url: images/crest_data_systems_rudder_rules.png
    media_type: image
  - caption: Rudder - Techniques
    image_url: images/crest_data_systems_rudder_techniques.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Rudder
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[**Rudder**][1] は、 IT インフラの自動化とコンプライアンスのために設計された、堅牢で扱いやすい Web ベースのソリューションです。構成を継続的に監視して準拠状況を確認し、インフラ全体の状態をリアルタイムに可視化します。サーバーやクラウド インスタンス、組み込み型 IoT デバイスなど、どのような環境でも、 Rudder が構成管理を 1 つのプラットフォームに集約します。

このインテグレーションは、 Rudder から送信される次のイベントを Datadog にログおよびメトリクスとして取り込みます。

### メトリクス ###
  - グローバル コンプライアンス

### ログ ###
  - ノード コンプライアンス
  - ディレクティブ
  - グループ
  - テクニック
  - ルール
  - ノードの脆弱性
  - 変更リクエスト
  - ユーザー管理

> **注**: 既定ではノードに関するログが収集され、インベントリ、オペレーティング システムの情報、マシン 関連のデータなどの重要な情報が取り込まれます。

### ダッシュボード
このインテグレーションには、**すぐに使える 7 種類のダッシュボード** が含まれています。

 1. **Rudder Overview**: グローバル コンプライアンス、ディレクティブ、グループ、テクニック、ルール、ノード、変更リクエスト、ユーザー管理といった主要な領域の概要をまとめて表示し、ノードに関連する脆弱性やコンプライアンスの状況も可視化します。
 2. **Rudder - Nodes**
 3. **Rudder - Directives**
 4. **Rudder - Techniques**
 5. **Rudder - Groups**
 6. **Rudder - Rules**
 7. **Rudder - Change Requests**

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][9]
- 営業メール: [datadog-sales@crestdata.ai][10]
- Web サイト: [crestdata.ai][11]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]


[1]: https://www.rudder.io/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Rudder.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-rudder" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。