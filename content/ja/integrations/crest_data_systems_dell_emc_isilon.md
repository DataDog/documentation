---
app_id: crest-data-systems-dell-emc-isilon
app_uuid: 1c1b7c48-0c7c-46f2-9f0c-f68c74419244
assets:
  dashboards:
    Crest Dell EMC Isilon - Cluster Information: assets/dashboards/dell_emc_isilon_cluster_information.json
    Crest Dell EMC Isilon - File System: assets/dashboards/dell_emc_isilon_file_system.json
    Crest Dell EMC Isilon - Monitors Summary: assets/dashboards/dell_emc_isilon_monitors_summary.json
    Crest Dell EMC Isilon - Node Details: assets/dashboards/dell_emc_isilon_node_details.json
    Crest Dell EMC Isilon - Protocol Details: assets/dashboards/dell_emc_isilon_protocol_details.json
    Crest Dell EMC Isilon - Quota Information: assets/dashboards/dell_emc_isilon_quota_information.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.emc.isilon.cluster_inventory.license_details
      metadata_path: metadata.csv
      prefix: cds.emc.isilon.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: crest_data_systems_dell_emc_isilon
  logs: {}
  monitors:
    '[crest_data_systems_dell_emc_isilon] CPU Usage for each Node of Cluster': assets/recommended_monitors/cds_cpu_usage_for_each_node_and_cluster.json
    '[crest_data_systems_dell_emc_isilon] Disk Usage for each Node of Cluster': assets/recommended_monitors/cds_disk_usage_for_each_node_and_cluster.json
    '[crest_data_systems_dell_emc_isilon] Memory Usage for each Node of Cluster': assets/recommended_monitors/cds_memory_usage_for_each_node_and_cluster.json
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- キャッシュ
- data store
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_dell_emc_isilon
integration_id: crest-data-systems-dell-emc-isilon
integration_title: Dell EMC Isilon
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_dell_emc_isilon
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.dell_emc_isilon
  product_id: dell-emc-isilon
  short_description: 指定された費用は、1 クラスターあたりの月額です。
  tag: cds.emc.isilon.cluster
  unit_label: Dell EMC Isilon Cluster
  unit_price: 995.0
public_title: Dell EMC Isilon
short_description: Dell EMC Isilon クラスターのパフォーマンスと使用量の監視
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Store
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Dell EMC Isilon クラスターのパフォーマンスと使用量の監視
  media:
  - caption: Dell EMC Isilon - クラスター情報
    image_url: images/cds-dell-emc-isilon-cluster-information.png
    media_type: image
  - caption: Dell EMC Isilon - ノードの詳細
    image_url: images/cds-dell-emc-isilon-node-details.png
    media_type: image
  - caption: Dell EMC Isilon - プロトコルの詳細
    image_url: images/cds-dell-emc-isilon-protocol-details.png
    media_type: image
  - caption: Dell EMC Isilon - ファイルシステム
    image_url: images/cds-dell-emc-isilon-file-system.png
    media_type: image
  - caption: Dell EMC Isilon - クォータ情報
    image_url: images/cds-dell-emc-isilon-quota-information.png
    media_type: image
  - caption: Dell EMC Isilon - モニター概要
    image_url: images/cds-dell-emc-isilon-monitors-summary.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Dell EMC Isilon
  uninstallation: README.md#Uninstallation
---

## 概要

このインテグレーションは、Dell EMC Isilon クラスターとノードのパフォーマンスと使用量を監視します。重要なメトリクスを取得し、Dell EMC Isilon クラスターの健全性と運用に関する洞察を提供します。このインテグレーションは、各ノードおよびクラスターの CPU、メモリ、およびディスクの使用量を警告するモニターもサポートします。

| ダッシュボード名      | 説明                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| クラスター情報 | このダッシュボードでは、クラスターレベルの情報を提供します。                                      |
| ノードの詳細        | このダッシュボードでは、ノードレベルの情報を提供します。                                         |
| プロトコルの詳細    | このダッシュボードでは、クラスター全体のプロトコルの詳細を提供します。                                  |
| ファイルシステム         | このダッシュボードでは、ノードレベルのファイルシステムの詳細を提供します。                          |
| クォータ情報   | このダッシュボードでは、クォータ情報を提供します。                                              |
| モニター概要    | このダッシュボードでは、このインテグレーションでサポートされるモニターの概要を提供します。 |

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- メール: datadog.integrations@crestdatasys.com
- Web サイト: [crestdatasys.com](https://www.crestdatasys.com/)

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の Crest Data Systems のインテグレーションで Dell EMC Isilon を監視する][1]
- [セットアップガイド: Datadog Platform における Dell EMC Isilon モニター][2]

[1]: https://www.datadoghq.com/blog/dell-emc-isilon-monitoring-crest-data-systems-datadog-marketplace/
[2]: https://www.crestdatasys.com/data_sheet/datadog-setup-monitor/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-dell-emc-isilon" target="_blank">こちらをクリック</a>してください。