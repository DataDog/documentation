---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-intel-one-api
app_uuid: f1e37e32-2d31-4f46-8633-e7e6958c909c
assets:
  dashboards:
    CDS Intel oneAPI: assets/dashboards/cds_intel_oneapi.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.intel.one.api.Hotspots_by_CPU_Utilization.Elapsed_Time
      metadata_path: metadata.csv
      prefix: cds.intel.one.api.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28998791
    source_type_name: crest_data_systems_intel_one_api
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- 開発ツール
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_intel_one_api
integration_id: crest-data-systems-intel-one-api
integration_title: Intel oneAPI
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_intel_one_api
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: intel-one-api
  short_description: Intel oneAPI インテグレーションの月額定額料金。
  unit_price: 295.0
public_title: Intel oneAPI
short_description: Intel oneAPI の VTune Profiler で生成されたレポートからメトリクスを収集し、視覚化します。
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Developer Tools
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Intel OneAPI の vtune プロファイラーを通じて生成されたレポートからメトリクスを収集し、視覚化します。
  media:
  - caption: CDS Intel oneAPI
    image_url: images/cds_intel_oneapi.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Intel oneAPI
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

**Intel oneAPI** は、異なるアーキテクチャ間での開発を簡素化するために設計された統一プログラミングモデルです。oneAPI のコンポーネントである **Intel VTune Profiler** は、開発者によるアプリケーションの最適化を支援するプロファイリングツールです。

このインテグレーションは、VTune レポートからメトリクスを収集して視覚化し、Datadog 内でアプリケーションのパフォーマンスを直接監視・分析することを可能にします。

### 機能

- VTune のさまざまな解析タイプからメトリクスを収集します。以下の解析タイプを含みます:
  - **Performance Snapshot**
  - **Hotspot Analysis**
  - **Memory Access Analysis**
  - **Threading Analysis**
  - **System Overview**
  - **HPC Performance Characterization**
- Datadog で視覚化するため、VTune レポートから意味のあるメトリクスを抽出します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][3]
- 営業メール: [datadog-sales@crestdata.ai][4]
- Web サイト: [crestdata.ai][5]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][6]


[1]: https://docs.datadoghq.com/ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: mailto:datadog.integrations@crestdata.ai
[4]: mailto:datadog-sales@crestdata.ai
[5]: https://www.crestdata.ai
[6]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Intel_oneAPI.pdf
[8]: https://visualstudio.microsoft.com/downloads/
[9]: https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-intel-one-api" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。