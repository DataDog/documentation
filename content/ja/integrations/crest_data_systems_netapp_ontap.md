---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-netapp-ontap"
"app_uuid": "c744f76a-7d04-4daf-bf7b-0902fbedd76d"
"assets":
  "dashboards":
    "NetApp OnTap - Cluster Performance": assets/dashboards/crest_data_systems_netapp_ontap_cluster_performance.json
    "NetApp OnTap - Disk": assets/dashboards/crest_data_systems_netapp_ontap_disk.json
    "NetApp OnTap - Events": assets/dashboards/crest_data_systems_netapp_ontap_events.json
    "NetApp OnTap - LUN": assets/dashboards/crest_data_systems_netapp_ontap_lun.json
    "NetApp OnTap - Network": assets/dashboards/crest_data_systems_netapp_ontap_network.json
    "NetApp OnTap - Overview": assets/dashboards/crest_data_systems_netapp_ontap_overview.json
    "NetApp OnTap - Snapshot": assets/dashboards/crest_data_systems_netapp_ontap_snapshot.json
    "NetApp OnTap - Volume": assets/dashboards/crest_data_systems_netapp_ontap_volume.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": cds.netapp.ontap.cluster_inventory.license_details
      "metadata_path": metadata.csv
      "prefix": cds.netapp.ontap
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10325"
    "source_type_name": crest_data_systems_netapp_ontap
  "monitors":
    "[NetApp ONTAP] Aggregate plex status": assets/monitors/cds_plex_status.json
    "[NetApp ONTAP] Aggregate raid status": assets/monitors/cds_raid_status.json
    "[NetApp ONTAP] Aggregate utilization": assets/monitors/cds_aggregate_utilization.json
    "[NetApp ONTAP] Battery status of Node": assets/monitors/cds_node_battery.json
    "[NetApp ONTAP] CPU disk busy percent": assets/monitors/cds_disk_busy_percent.json
    "[NetApp ONTAP] Cluster utilization": assets/monitors/cds_cluster_used_capacity.json
    "[NetApp ONTAP] Ethernet Port status": assets/monitors/cds_ethernet_port_status.json
    "[NetApp ONTAP] Fan failed for node": assets/monitors/cds_failed_power_supply.json
    "[NetApp ONTAP] High IOPS of LUN": assets/monitors/cds_lun_iops.json
    "[NetApp ONTAP] High IOPS of cluster": assets/monitors/cds_cluster_iops.json
    "[NetApp ONTAP] High IOPS of volume": assets/monitors/cds_volume_iops.json
    "[NetApp ONTAP] High latency of Disk": assets/monitors/cds_disk_latency.json
    "[NetApp ONTAP] High latency of LUN": assets/monitors/cds_lun_latency.json
    "[NetApp ONTAP] High latency of cluster": assets/monitors/cds_cluster_latency.json
    "[NetApp ONTAP] High latency of volume": assets/monitors/cds_volume_latency.json
    "[NetApp ONTAP] High utilization of volume": assets/monitors/cds_volume_utilization.json
    "[NetApp ONTAP] Low throughput of cluster": assets/monitors/cds_cluster_throughput.json
    "[NetApp ONTAP] Low throughput of volume": assets/monitors/cds_volume_throughput.json
    "[NetApp ONTAP] Network Interface status": assets/monitors/cds_network_interface_status.json
    "[NetApp ONTAP] Node Health": assets/monitors/cds_node_health.json
    "[NetApp ONTAP] Node Temperature": assets/monitors/cds_node_temperature.json
    "[NetApp ONTAP] Power supply failed for node": assets/monitors/cds_failed_fan_count.json
    "[NetApp ONTAP] Size used by snapshot exceeds reserved size": assets/monitors/cds_snapshot_size_exceed.json
    "[NetApp ONTAP] Volume Status": assets/monitors/cds_volume_offline.json
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- data stores
- marketplace
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_netapp_ontap"
"integration_id": "crest-data-systems-netapp-ontap"
"integration_title": "NetApp OnTap"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_netapp_ontap"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.netapp_ontap
  "product_id": netapp-ontap
  "short_description": Per cluster per month
  "tag": cds_netapp_ontap_instance
  "unit_label": NetApp ONTAP instance
  "unit_price": !!float "495.0"
"public_title": "NetApp OnTap"
"short_description": "Monitor the performance and usage of NetApp ONTAP cluster"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Data Stores"
  - "Category::Marketplace"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor the performance and usage of NetApp ONTAP cluster
  "media":
  - "caption": NetApp OnTap - Overview
    "image_url": images/crest_data_systems_netapp_ontap_overview.png
    "media_type": image
  - "caption": NetApp OnTap - Disk
    "image_url": images/crest_data_systems_netapp_ontap_disk.png
    "media_type": image
  - "caption": NetApp OnTap - LUN
    "image_url": images/crest_data_systems_netapp_ontap_lun.png
    "media_type": image
  - "caption": NetApp OnTap - Volume
    "image_url": images/crest_data_systems_netapp_ontap_volume.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": NetApp OnTap
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

This integration monitors the performance and usage of NetApp OnTap clusters and nodes. It captures crucial metrics and provides insight into the storage and performance of the NetApp OnTap cluster.

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][9]
- Sales Email: [datadog-sales@crestdata.ai][10]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][8]

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.crestdata.ai/datadog-integrations-readme/NetApp_OnTap.pdf
[6]: https://docs.datadoghq.com/agent/?tab=Linux
[7]: https://docs.datadoghq.com/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-ontap" target="_blank">Click Here</a> to purchase this application.
