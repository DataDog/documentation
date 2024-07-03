---
algolia:
  subcategory: Marketplace Integrations
app_id: kitepipe-atomwatch
app_uuid: c9c6ace5-9793-48da-a4be-7bbd4c3e9b06
assets:
  dashboards:
    AtomWatch Boomi Cluster Monitoring: assets/dashboards/boomi_cluster_monitoring2.json
    AtomWatch Boomi Compute Monitoring: assets/dashboards/boomi_compute_monitoring2.json
    AtomWatch Boomi Workload Monitoring: assets/dashboards/boomi_workload_monitoring2.json
    AtomWatch Overview: assets/dashboards/atomwatch_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: kitepipe.atomwatch.integration_completed
      metadata_path: metadata.csv
      prefix: kitepipe.atomwatch.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10355
    source_type_name: AtomWatch
  monitors:
    AtomWatch is Down: assets/monitors/atomwatch_down.json
    'AtomWatch: Boomi Cluster Node "View File" is Missing': assets/monitors/cluster_view_file_missing.json
    'AtomWatch: Boomi Cluster Node "View File" is Too Old': assets/monitors/cluster_view_file_too_old.json
    'AtomWatch: Boomi Cluster Problem': assets/monitors/cluster_view_file_problem.json
    'AtomWatch: Execution Duration Anomaly': assets/monitors/execution_duration_anomaly.json
    'AtomWatch: Failure calling Boomi Platform API': assets/monitors/failed_boomi_platform_api_call.json
    'AtomWatch: Infrastructure - API Gateway Node CPU Usage High': assets/monitors/api_gw_node_cpu.json
    'AtomWatch: Infrastructure - API Gateway Node Disk Usage High': assets/monitors/api_gw_node_disk.json
    'AtomWatch: Infrastructure - API Gateway Node Memory Usage High': assets/monitors/api_gw_node_ram.json
    'AtomWatch: Infrastructure - Molecule Node CPU Usage High': assets/monitors/molecule_node_cpu.json
    'AtomWatch: Infrastructure - Molecule Node Disk Usage High': assets/monitors/molecule_node_disk.json
    'AtomWatch: Infrastructure - Molecule Node Memory Usage High': assets/monitors/molecule_node_ram.json
    'AtomWatch: Runtime Online Status': assets/monitors/boomi_online_status.json
author:
  homepage: https://www.kitepipe.com
  name: Kitepipe
  sales_email: AtomWatch.Sales@kitepipe.com
  support_email: AtomWatch.Support@kitepipe.com
  vendor_id: kitepipe
categories:
- alerting
- aws
- event management
- log collection
- marketplace
- notifications
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: kitepipe_atomwatch
integration_id: kitepipe-atomwatch
integration_title: Kitepipe AtomWatch
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: kitepipe_atomwatch
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.kitepipe.atomwatch
  product_id: atomwatch
  short_description: Unit price per Boomi Atom or Molecule Node
  tag: billing_key
  unit_label: Boomi Atom or Molecule Node
  unit_price: 200
public_title: Kitepipe AtomWatch
short_description: Monitor Boomi processes and infrastructure
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Alerting
  - Category::AWS
  - Category::Event Management
  - Category::Log Collection
  - Category::Marketplace
  - Category::Notifications
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitor Boomi processes and infrastructure
  media:
  - caption: Enhanced Process Reporting lets you look back more than 30 days and filter
      by more fields, with wildcards.
    image_url: images/enhanced_process_reporting.png
    media_type: image
  - caption: See long-running processes at a glance and receive alerts with anomaly
      detection.
    image_url: images/execution_duration_anomalies.png
    media_type: image
  - caption: Extensive infrastructure monitoring including CPU, RAM, Disk, Network.
    image_url: images/infrastructure_monitoring.png
    media_type: image
  - caption: Cluster monitoring that exceeds Boomi's published recommendations.
    image_url: images/cluster_monitoring.png
    media_type: image
  - caption: Toplists and graphs of errored Boomi processes.
    image_url: images/error_monitoring.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://atomwatch.refined.site/space/CS/11108353
  - resource_type: blog
    url: https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/
  support: README.md#Support
  title: Kitepipe AtomWatch
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Kitepipe の AtomWatch は Agent ベースのインテグレーションで、Boomi プロセス、クラスターノード、関連インフラストラクチャーからメトリクスを収集し、Datadog と Boomi の両方のお客様にインテグレーションの健全性を知らせることができます。

AtomWatch version 1.0 contains 4 dashboards, 13 custom metrics, and 13 monitors that report on Boomi execution statistics, cluster status, and infrastructure health. These metrics are available to Datadog and Boomi customers for extended time-trending analysis (over the standard of 30 days for Boomi Process Reporting availability).

AtomWatch を購入した Datadog のお客様は、Boomi Java Runtime を Atom または Molecule のいずれかの構成で管理する必要があります。Kitepipe では、14 日間の無料トライアルに 1 時間のセットアップと構成セッションが含まれています。

### Kitepipe について

Kitepipe は Boomi Platinum Implementation Partner であり、北米における最高峰の Boomi インテグレーション開発チームです。Kitepipe は、この強力なインテグレーションプラットフォームのすべての約束を実現できる、Boomi に特化したサービスチームの必要性に応えて、2011 年に設立されました。

現在、Kitepipe の Boomi 認定オンショア開発者チームは、業界をリードする Boomi インテグレーションプラットフォームで、数十社の Boomi のお客様が迅速にビジネス価値を達成できるよう支援しています。

Datadog のサービス AtomWatch は、AWS における Boomi マネージドサービスを中心とした Kitepipe の新しい提案です。Kitepipe は、Boomi プロセスの AWS マイグレーション、AWS マネージド Boomi、Boomi で構築されたバイオテクノロジーの垂直ソリューション、NetSuite、SAP、Coupa、Workday、HRIS、Data Mart/BI などのエンドポイントを含む多くのインテグレーション分野、業界、ドメインでリーダーとして活躍しています。

### ログ収集

このインテグレーションは、お客様に代わって Boomi プラットフォームへの API 呼び出しを行い、実行レコードを取得し、Datadog にログとして送信します。

### イベント

このインテグレーションは、Boomi API から AuditLog レコードを取得し、Datadog にイベントとして送信します。イベントは、Boomi Workload Monitoring Dashboard または[イベントエクスプローラー][1]でフィルターされた形で見ることができます。フィルタリングされていない AuditLog レコードを検査するために、独自のモニターを構築することができます。

### メトリクス

このインテグレーションは、メトリクスを送信します。メトリクスの一覧は、**Data Collected** タブで確認することができます。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから AtomWatch にお問い合わせください。

- メール: [AtomWatch.Support@kitepipe.com][11]

Kitepipe の AtomWatch のサポート時間は、米国とカナダのタイムゾーンで午前 9 時から午後 3 時の営業時間内に指定されています。AtomWatch のトラブルシューティングリクエストは、AtomWatch のメールエイリアスへの通知受信から 24 時間から 48 時間以内に回答されます。

お客様名、Boomi の構成、イベントやトラブルシューティングの質問の簡単な説明を含めると、最高の回答結果が得られます。リクエストに応じて、Kitepipe の強化されたサポートプログラムをご利用いただけます。

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [AtomWatch ドキュメント][9]
- [Monitor your Boomi integrations with Kitepipe's offering in the Datadog Marketplace][12]

[1]: https://app.datadoghq.com/event/explorer
[2]: https://help.boomi.com/bundle/atomsphere_platform/page/int-Adding_API_tokens.html
[3]: https://help.boomi.com/bundle/integration/page/t-atm-Attaching_a_role_to_an_Environment.html
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/account/settings#agent/overview
[6]: https://help.boomi.com/bundle/integration/page/r-atm-Startup_Properties_panel.html
[7]: https://help.boomi.com/bundle/integration/page/r-atm-Cluster_Status_panel.html
[8]: https://help.boomi.com/bundle/api_management/page/api-API_Gateway_settings.html
[9]: https://atomwatch.refined.site/space/CS/11108353
[10]: https://www.kitepipe.com/
[11]: mailto:AtomWatch.Support@kitepipe.com
[12]: https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/kitepipe-atomwatch" target="_blank">こちらをクリック</a>してください。