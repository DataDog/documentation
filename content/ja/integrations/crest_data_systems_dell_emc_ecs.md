---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-dell-emc-ecs"
"app_uuid": "27d7b888-4545-4b6b-b871-3e82f9056ecd"
"assets":
  "dashboards":
    "CDS Dell EMC ECS - Access Log": assets/dashboards/cds_dell_emc_ecs_access_log.json
    "CDS Dell EMC ECS - Alerts": assets/dashboards/cds_dell_emc_ecs_alerts.json
    "CDS Dell EMC ECS - Audit Events": assets/dashboards/cds_dell_emc_ecs_audit_events.json
    "CDS Dell EMC ECS - Audit Syslog": assets/dashboards/cds_dell_emc_ecs_audit_log.json
    "CDS Dell EMC ECS - Bucket Details": assets/dashboards/cds_dell_emc_ecs_bucket_details.json
    "CDS Dell EMC ECS - CAS Logs": assets/dashboards/cds_dell_emc_ecs_cas_access_analysis.json
    "CDS Dell EMC ECS - Capacity Utilization": assets/dashboards/cds_dell_emc_ecs_capacity_utilization.json
    "CDS Dell EMC ECS - Cluster Details": assets/dashboards/cds_dell_emc_ecs_cluster_details.json
    "CDS Dell EMC ECS - Disk Details": assets/dashboards/cds_dell_emc_ecs_disk_details.json
    "CDS Dell EMC ECS - Namespace": assets/dashboards/cds_dell_emc_ecs_namespace.json
    "CDS Dell EMC ECS - Node and Transaction Details": assets/dashboards/cds_dell_emc_ecs_node_details.json
    "CDS Dell EMC ECS - Overview": assets/dashboards/cds_dell_emc_ecs_overview.json
    "CDS Dell EMC ECS - Replication Group": assets/dashboards/cds_dell_emc_ecs_geo_replication.json
    "CDS Dell EMC ECS - VDC Details": assets/dashboards/cds_dell_emc_ecs_vdc_details.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - cds.dell.emc.ecs.storagepool_metric.nodes
      "metadata_path": metadata.csv
      "prefix": cds.dell.emc.ecs
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10413"
    "source_type_name": crest_data_systems_dell_emc_ecs
  "monitors":
    "Free disk space of Cluster has reached the set threshold value": assets/monitors/cds_disk_free_usage_of_cluster.json
    "Number of total unacknowledged critical alerts exceeds limit": assets/monitors/cds_total_unack_critical_alerts.json
    "Number of total unacknowledged error alerts exceeds limit": assets/monitors/cds_total_unack_error_alerts.json
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data Systems
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- cloud
- data stores
- marketplace
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_dell_emc_ecs"
"integration_id": "crest-data-systems-dell-emc-ecs"
"integration_title": "Dell EMC ECS"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_dell_emc_ecs"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.dell_emc_ecs
  "product_id": dell-emc-ecs
  "short_description": Specified cost is per host per month.
  "tag": dell_emc_ecs_host
  "unit_label": Dell EMC ECS Host
  "unit_price": !!float "995.0"
"public_title": "Dell EMC ECS"
"short_description": "Visulize Dell EMC ECS host's nodes, disks, VDCs, namespaces, and more."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Data Stores"
  - "Category::Marketplace"
  - "Category::Security"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Visulize Dell EMC ECS host's nodes, disks, VDCs, namespaces, and more.
  "media":
  - "caption": CDS Dell EMC ECS - Overview
    "image_url": images/CDS_Dell_EMC_ECS_Overview.png
    "media_type": image
  - "caption": CDS Dell EMC ECS - Alerts
    "image_url": images/CDS_Dell_EMC_ECS_Alerts.png
    "media_type": image
  - "caption": CDS Dell EMC ECS - Audit Events
    "image_url": images/CDS_Dell_EMC_ECS_Audit_Events.png
    "media_type": image
  - "caption": CDS Dell EMC ECS - Capacity Utilization
    "image_url": images/CDS_Dell_EMC_ECS_Capacity_Utilization.png
    "media_type": image
  - "caption": CDS Dell EMC ECS - Replication Group
    "image_url": images/CDS_Dell_EMC_ECS_Geo_Replication.png
    "media_type": image
  - "caption": CDS Dell EMC ECS - Namespace
    "image_url": images/CDS_Dell_EMC_ECS_Namespace.png
    "media_type": image
  - "caption": CDS Dell EMC ECS - CAS Logs
    "image_url": images/CDS_Dell_EMC_ECS_CAS_Log_Analysis.png
    "media_type": image
  - "caption": CDS Dell EMC ECS - Access Logs
    "image_url": images/CDS_Dell_EMC_ECS_Access_Logs.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Dell EMC ECS
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Dell EMC ECS is a flexible cloud-scale storage solution created to handle a wide range of workloads, from traditional to cutting-edge applications. It enables easy and distributed access to data across the globe through various protocols. With ECS, you can seamlessly offer scalable public cloud services while maintaining the reliability and control typically associated with a private cloud infrastructure, ensuring that your data storage needs are met comprehensively and efficiently.

This integration monitors Dell EMC ECS and send logs and metrics about your host's nodes, disks, VDCs, namespaces, and more into Datadog.

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support: [datadog.integrations@crestdata.ai][5]
- Sales: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.dell.com/support/manuals/en-in/ecs-appliance-/ecs_p_adminguide_3_5_0_1/add-a-syslog-server?guid=guid-f249bf08-ba24-4549-9756-40c5a3ef0c67&lang=en-us
[8]: https://docs.crestdata.ai/datadog-integrations-readme/DELL_EMC_ECS.pdf
[9]: https://docs.datadoghq.com/agent/?tab=Linux
[10]: https://docs.datadoghq.com/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-dell-emc-ecs" target="_blank">Click Here</a> to purchase this application.
