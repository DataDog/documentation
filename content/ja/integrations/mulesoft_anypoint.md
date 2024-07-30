---
algolia:
  subcategory: Marketplace インテグレーション
app_id: ioconnect-mulesoft-anypoint
app_uuid: fdb057e7-9be6-459f-ab3e-e745766e9158
assets:
  dashboards:
    'IO Connect Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
      metadata_path: metadata.csv
      prefix: ioconnect.mulesoft.anypoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: IO Connect MuleSoft Anypoint
  monitors:
    Servers status: assets/monitors/server_disconnected_monitor.json
    '[CloudHub] Apps status': assets/monitors/cloudhub_app_stopped_monitor.json
    '[CloudHub] CPU load': assets/monitors/cloudhub_cpu_load_monitor.json
    '[CloudHub] Memory usage': assets/monitors/cloudhub_memory_usage_monitor.json
    '[CloudHub] Overload queue': assets/monitors/cloudhub_queue_overload_monitor.json
    '[On-Prem] Apps errors': assets/monitors/onpremise_app_error_monitor.json
    '[On-Prem] Apps status': assets/monitors/onpremise_app_stopped_monitor.json
    '[On-Prem] CPU load': assets/monitors/onpremise_cpu_load_monitor.json
    '[On-Prem] Memory usage': assets/monitors/onpremise_memory_usage_monitor.json
author:
  homepage: https://www.ioconnectservices.com/
  name: IO Connect Services
  sales_email: dmi@ioconnectservices.com
  support_email: support_ddp@ioconnectservices.com
  vendor_id: ioconnect
categories:
- クラウド
- マーケットプレイス
- ネットワーク
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mulesoft_anypoint
integration_id: ioconnect-mulesoft-anypoint
integration_title: Mule®
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA - IO Connect Services.pdf
manifest_version: 2.0.0
name: mulesoft_anypoint
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.ioconnect.mulesoft_anypoint
  product_id: mulesoft-anypoint
  short_description: プロダクション vCore 単価
  tag: vcoreid
  unit_label: プロダクション vCore
  unit_price: 200
public_title: Mule®
short_description: MuleSoft 製品からメトリクスを収集し、Datadog にアップロードします
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: MuleSoft 製品からメトリクスを収集し、Datadog にアップロードします
  media:
  - caption: 'オペレーション: API ダッシュボード'
    image_url: images/dmi_ops_apis.png
    media_type: image
  - caption: 'オペレーション: インフラストラクチャーダッシュボード'
    image_url: images/dmi_ops_infra.png
    media_type: image
  - caption: 'オペレーション: リソース配分と使用状況のダッシュボード'
    image_url: images/dmi_ops_allocation.png
    media_type: image
  - caption: '開発: 最適化ダッシュボード'
    image_url: images/dmi_dev_optimization.png
    media_type: image
  - caption: 'エグゼクティブ: コスト最適化ダッシュボード'
    image_url: images/dmi_exec_cost_optimization.png
    media_type: image
  - caption: Datadog Connector for Mule 4
    image_url: images/dmi_mule_connector.png
    media_type: image
  - caption: Datadog APM
    image_url: images/dmi_apm_traces.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mule®
  uninstallation: README.md#Uninstallation
---



## 概要

Datadog Mule® インテグレーションは、MuleSoft 製品からメトリクスを収集し、Datadog にアップロードする Agent ベースのインテグレーションです。

{{< img src="marketplace/mulesoft_anypoint/images/dmi_bundle.png" alt="Datadog Mule® インテグレーションバンドル" >}}

このメトリクスを使用して、すぐに使用できるダッシュボードとモニターを利用したり、独自の視覚化を作成したりできます。

### ** Mule アプリケーションに必要な可観測性**

#### オペレーション (_インフラストラクチャー、API、アラート、リソース割り当てダッシュボード_) 

- Mule サーバー、アプリケーション、API、その他の IT インフラストラクチャーの状態を監視します
- Mule インフラストラクチャーに関するアラートを受信して視覚化します
- 組織の Anypoint プラットフォームリソース割り当てに関する洞察を獲得します

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_infra.png" alt="オペレーション: インフラストラクチャーダッシュボード" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_apis.png" alt="オペレーション: API ダッシュボード" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_allocation.png" alt="オペレーション: リソースの割り当てと使用状況のダッシュボード" >}}

#### 開発 (_最適化ダッシュボード_) 

- Mule アプリケーションのメモリ、CPU、ネットワークの問題をすばやく特定します
- Mule アプリケーションのボトルネックを見つけて、パフォーマンスを最適化します
- トラブルシューティングの目的で、Mule 4 用の Datadog コネクタを使用して Mule アプリケーションをインスツルメントします

{{< img src="marketplace/mulesoft_anypoint/images/dmi_dev_optimization.png" alt="開発: 最適化ダッシュボード" >}}

#### エグゼクティブ (_コスト最適化とダウンタイムのダッシュボード_) 

- 使用済みおよび未使用のリソースに基づいて ROI を分析、予測します
- Mule 投資のシステムアップタイムを可視化します

{{< img src="marketplace/mulesoft_anypoint/images/dmi_exec_cost_optimization.png" alt="エグゼクティブ: コスト最適化ダッシュボード" >}}

#### メトリクスは、次の MuleSoft 製品から収集されます。

- CloudHub とオンプレミスのスタンドアロンサーバーの両方の Mule ランタイム
- Anypoint API Manager と API Analytics
- Anypoint Exchange 
- Anypoint Access Management 
- Object Store v2 

### **Datadog Mule 4 コネクタを使用して Mule アプリケーションをインスツルメントします**

{{< img src="marketplace/mulesoft_anypoint/images/dmi_mule_connector.png" alt="Mule 4 用 Datadog コネクタ" >}}

Datadog APM トレースを備えた Mule 4 用の Datadog コネクタを使えば、すぐに使用できるパフォーマンスダッシュボードを使用して可視性を獲得できます。

{{< img src="marketplace/mulesoft_anypoint/images/dmi_apm_traces.png" alt="Datadog APM" >}}

スパンを使用して、フロー内の操作のパフォーマンスを必要に応じて詳細に測定します。

また、トランザクション内で生成されたログを 1 つのトレースに関連付けて、パフォーマンスの最適化またはトラブルシューティングの範囲を絞り込みます。

### **トラブルシューティング**

サポートが必要な場合は、[support_ddp@ioconnectservices.com][9] までお問い合わせください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mulesoft_anypoint" >}}


### サービスのチェック

mulesoft_anypoint には、次のサービスチェックが含まれていました。

1. MuleSoft Anypoint。このサービスチェックは、メトリクスが MuleSoft Anypoint から正しく収集されたかどうかを示します。
2. MuleSoft インテグレーションライセンス。このサービスチェックは、Datadog 用のこの MuleSoft インテグレーションのライセンスが有効かどうかを理解するのに役立ちます。

### イベント

Datadog Mule® インテグレーションには、イベントは含まれません。

## サポート

サポートが必要な場合は、IO Connect Services ([support_ddp@ioconnectservices.com][9]) までお問い合わせください。

## IO Connect Services について

IO Connect Services は、情報技術コンサルティングサービスを専門とする企業です。私たちの業務は、クラウドテクノロジー、システムインテグレーション、ビッグデータ、サイバーセキュリティ、ソフトウェアエンジニアリングです。北米、ヨーロッパ、ラテンアメリカの全域でサービスを提供しています。本社はニューヨークの大都市圏にあり、メキシコのグアダラハラとスペインのマドリッドにもオフィスがあります。

[https://www.ioconnectservices.com][10] をご覧ください。

[1]: https://www.ioconnectservices.com
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/datadog_checks/mulesoft_anypoint/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/metadata.csv
[7]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux
[9]: mailto:support_ddp@ioconnectservices.com
[10]: https://www.ioconnectservices.com

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/ioconnect-mulesoft-anypoint" target="_blank">こちらをクリック</a>してください。