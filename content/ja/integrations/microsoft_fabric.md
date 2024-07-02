---
"app_id": "microsoft-fabric"
"app_uuid": "6bc8105a-8d3a-4d3a-9cf2-d28d78e49b31"
"assets":
  "dashboards":
    "microsoft-fabric": assets/dashboards/microsoft_fabric_overview.json
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - azure.synapse_workspaces_sqlpools.active_queries
      "metadata_path": metadata.csv
      "prefix": azure.synapse_workspaces_sqlpools.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "18661396"
    "source_type_name": Microsoft Fabric
  "monitors":
    "[Azure] Synapse CPU Utilization is Abnormally High": assets/monitors/azure_fabric_cpu_usage_high.json
    "[Azure] Synapse DWU Utilization is Abnormally High": assets/monitors/azure_fabric_dwu_usage_high.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com (日本語対応)
  "support_email": help@datadoghq.com
"categories":
- azure
- ai/ml
- モニター
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "microsoft_fabric"
"integration_id": "microsoft-fabric"
"integration_title": "Microsoft Fabric"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "microsoft_fabric"
"public_title": "Microsoft Fabric"
"short_description": "Use the Datadog integration to collect metrics from Azure Synapse in Microsoft Fabric."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Azure"
  - "Category::AI/ML"
  - "Category::Metrics"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Use the Datadog integration to collect metrics from Azure Synapse in Microsoft Fabric.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Microsoft Fabric
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Microsoft Fabric is an end-to-end data and analytics platform for enterprises. Fabric integrates workloads such as Synapse Data Engineering, Synapse Warehousing, and Power BI into a single SaaS solution. Use the Datadog integration to collect metrics from Azure Synapse in Microsoft Fabric.

## セットアップ

### インストール
[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "microsoft_fabric" >}}


### サービスチェック

The Microsoft Fabric Integration does not include any service checks.

### イベント

The Microsoft Fabric Integration does not include any events.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/microsoft_fabric/metadata.csv
[3]: https://docs.datadoghq.com/help/

