---
"algolia":
  "subcategory": Marketplace インテグレーション
"app_id": "crest-data-systems-commvault"
"app_uuid": "dd1aca96-e034-4812-8ff3-f5a6e9aa36c1"
"assets":
  "dashboards":
    "Commvault - Commcell , Jobs and SLA Details": assets/dashboards/crest_data_commvault_commcell_jobs_sla.json
    "Commvault - Environment, Server and Space Utilization Details": assets/dashboards/crest_data_commvault_environment_server_space.json
    "Commvault - Job Operations": assets/dashboards/crest_data_commvault_job_operations.json
    "Commvault - Monitoring": assets/dashboards/crest_data_commvault_monitoring.json
    "Commvault - Storage and Library": assets/dashboards/crest_data_commvault_storage_library.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": cds.commvault.freeSpace
      "metadata_path": metadata.csv
      "prefix": cds.commvault.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "13830234"
    "source_type_name": crest_data_systems_commvault
  "logs":
    "source": crest-data-systems-commvault
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- モニター
- ログの収集
- data stores
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_commvault"
"integration_id": "crest-data-systems-commvault"
"integration_title": "Commvault"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_commvault"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.commvault
  "product_id": commvault
  "short_description": Per Terabyte used space of storagepool per month
  "tag": terrabyte_count
  "unit_label": Commvault Storagepool Used Space (TB)
  "unit_price": !!float "99.0"
"public_title": "Commvault"
"short_description": "Monitors Commvault Logs"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Marketplace"
  - "Category::Metrics"
  - "Category::Log Collection"
  - "Category::Data Stores"
  - "Category::Security"
  - "Offering::Integration"
  - "Submitted Data Type::Logs"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitors Commvault Logs
  "media":
  - "caption": Commvault - Job Operations
    "image_url": images/crest_data_commvault_job_operations.png
    "media_type": image
  - "caption": Commvault - Commcell, Jobs, and SLA Details
    "image_url": images/crest_data_commvault_jobs_and_sla_details.png
    "media_type": image
  - "caption": Commvault - Monitoring
    "image_url": images/crest_data_commvault_monitoring.png
    "media_type": image
  - "caption": Commvault - Server and Space Utilization Details
    "image_url": images/crest_data_commvault_server_and_space_utilization_details.png
    "media_type": image
  - "caption": Commvault - Storage and Library
    "image_url": images/crest_data_commvault_storage_and_library.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Commvault
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Commvault simplifies data management and backup across different cloud platforms and on-premises setups. It ensures data security, compliance, scalability, and efficiency across diverse environments, and provides centralized control for backup, recovery, and archival processes.

This Commvault integration monitors and visualizes cloud/SaaS as well as on-premises.

The Commvault Datadog integration retrieves data for the following endpoints:

- ダッシュボード  
- Storage
    - Library Operations
    - Storage Pool Operations
    - Local Storage
- モニタリング
    - Alert Operations
- Job Operations

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][5]
- Sales Email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/agent/?tab=Linux
[8]: https://docs.datadoghq.com/help/
[9]: https://docs.datadoghq.com/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Commvault.pdf
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-commvault" target="_blank">Click Here</a> to purchase this application.
