---
algolia:
  subcategory: Marketplace インテグレーション
app_id: avio-consulting-mulesoft-observability
app_uuid: 54de8550-348d-4b1b-a8e1-1e2efc633bff
assets:
  dashboards:
    Anypoint Platform - Business Group Summary: assets/dashboards/anypoint_platform_-_business_group_summary.json
    Anypoint Platform - Executive: assets/dashboards/anypoint_platform_-_executive.json
    Anypoint Platform - Root Organization: assets/dashboards/anypoint_platform_-_root_organization.json
    Mule Application Dashboard: assets/dashboards/mule_application_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    metrics:
      check:
      - avio.mule.app.message.count
      metadata_path: metadata.csv
      prefix: avio
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17618199
    source_type_name: MuleSoft Observability
author:
  homepage: https://www.avioconsulting.com
  name: AVIO Consulting
  sales_email: sales@avioconsulting.com
  support_email: datadog-support@avioconsulting.com
  vendor_id: avio-consulting
categories:
- metrics
- tracing
- marketplace
- automation
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avio_consulting_mulesoft_observability
integration_id: avio-consulting-mulesoft-observability
integration_title: MuleSoft Observability
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avio_consulting_mulesoft_observability
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.avio_consulting.mulesoft_observability
  product_id: mulesoft-observability
  short_description: 本番アプリケーションあたりの単価
  tag: app.prod.identifier
  unit_label: インスツルメント済みの本番 MuleSoft アプリケーション
  unit_price: 30
public_title: MuleSoft Observability
short_description: MuleSoft アプリケーションの監視用 OTel メトリクス、トレース、ログ
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Tracing
  - Category::Marketplace
  - Category::Automation
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Setup
  description: MuleSoft アプリケーションの監視用 OTel メトリクス、トレース、ログ
  media:
  - caption: MuleSoft アプリケーションの分散トレース可視化
    image_url: images/mulesoft_observability_trace.png
    media_type: image
  - caption: MuleSoft Anypoint Platform のルート組織用ダッシュボード
    image_url: images/mulesoft_observability_anypoint_root_organization.png
    media_type: image
  - caption: MuleSoft Anypoint Platform のビジネス グループ アプリケーション用ダッシュボード
    image_url: images/mulesoft_observability_anypoint_business_groups.png
    media_type: image
  - caption: MuleSoft Anypoint Platform のエグゼクティブ サマリー用ダッシュボード
    image_url: images/mulesoft_observability_anypoint_executive.png
    media_type: image
  - caption: MuleSoft アプリケーションのリソース使用率とパフォーマンス用ダッシュボード
    image_url: images/mulesoft_observability_mule_application.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: MuleSoft Observability
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

MuleSoft は、オンプレミスおよびクラウド環境にわたってデータ、アプリケーション、デバイスを接続できるよう企業を支援するエンタープライズ インテグレーション プラットフォームです。

この MuleSoft Observability インテグレーションは OpenTelemetry ベースのインテグレーションで、MuleSoft アプリケーションの可観測性およびテレメトリ データを Datadog に送信します。MuleSoft モジュールにより、MuleSoft アプリケーションはすべてのフローと設定可能なプロセッサ セットに対して分散トレースを収集し、スパンを生成できます。また、本インテグレーションは Anypoint Platform およびアプリケーション レベルのメトリクスの送信をサポートし、MuleSoft アプリケーション内で使用できる OpenTelemetry 互換の Log4j アペンダーも提供します。

プラットフォーム レベルおよびアプリケーション レベルのメトリクスを可視化するため、次の標準ダッシュボードが用意されています:
1. Anypoint Platform - Organization and Business Groups: 組織で利用できるリソースとその使用状況を把握するためのダッシュボードです。
1. Anypoint Platform - Executive Summary: Anypoint Platform サブスクリプション全体の利用状況を高レベルで把握できるダッシュボードです。
1. Mule Applications: CPU、JVM、MuleSoft メトリクスなど、1 つ以上の MuleSoft アプリケーションにおけるアプリケーションおよびシステム レベルのメトリクスを可視化します。

## サポート
サポートまたは機能リクエストについては、以下のチャネルから AVIO Support までお問い合わせください:

- メール: [datadog-support@avioconsulting.com][2]
- [AVIO Support Portal][3]

### 参考資料
[MuleSoft OpenTelemtry Documentation][4]  
[OTLP Ingestion by the Datadog Agent][5]  
[OpenTelemetry Collector and Datadog Exporter][6]  

[1]: https://github.com/DataDog/marketplace/blob/master/avio_consulting_mulesoft_observability/metadata.csv
[2]: mailto:datadog-support@avioconsulting.com
[3]: https://datadog-support.avioconsulting.com
[4]: https://avioconsulting.github.io/mule-opentelemetry-module/
[5]: https://docs.datadoghq.com/ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[6]: https://docs.datadoghq.com/ja/opentelemetry/collector_exporter/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/avio-consulting-mulesoft-observability" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。