---
"algolia":
  "subcategory": Marketplace インテグレーション
"app_id": "crest-data-systems-netapp-bluexp"
"app_uuid": "3f01fc26-b405-4956-9b64-f7fa2c7ee05c"
"assets":
  "dashboards":
    "NetApp BlueXP: Aggregate": assets/dashboards/crest_data_netapp_bluexp_aggregate.json
    "NetApp BlueXP: Cluster": assets/dashboards/crest_data_netapp_bluexp_cluster.json
    "NetApp BlueXP: Disk": assets/dashboards/crest_data_netapp_bluexp_disk.json
    "NetApp BlueXP: Inventory": assets/dashboards/crest_data_netapp_bluexp_inventory.json
    "NetApp BlueXP: Network": assets/dashboards/crest_data_netapp_bluexp_network.json
    "NetApp BlueXP: Node": assets/dashboards/crest_data_netapp_bluexp_node.json
    "NetApp BlueXP: Volume": assets/dashboards/crest_data_netapp_bluexp_volume.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": cds.netapp.bluexp.cluster.dc
      "metadata_path": metadata.csv
      "prefix": cds.netapp.bluexp.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "11493382"
    "source_type_name": crest_data_systems_netapp_bluexp
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- data stores
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_netapp_bluexp"
"integration_id": "crest-data-systems-netapp-bluexp"
"integration_title": "NetApp BlueXP"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_netapp_bluexp"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.netapp_bluexp
  "product_id": netapp-bluexp
  "short_description": Per Netapp instance per month
  "tag": netapp_bluexp_serial_number
  "unit_label": Server Serial Number of Netapp BlueXP
  "unit_price": !!float "495.0"
"public_title": "NetApp BlueXP"
"short_description": "Monitors NetApp BlueXP inventory and digital advisor logs and metrics"
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
  - "Category::Data Stores"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Monitors NetApp BlueXP inventory and digital advisor logs and metrics
  "media":
  - "caption": "NetApp BlueXP: Aggregate"
    "image_url": images/crest_data_netapp_bluexp_aggregate.png
    "media_type": image
  - "caption": "NetApp BlueXP: Cluster"
    "image_url": images/crest_data_netapp_bluexp_cluster.png
    "media_type": image
  - "caption": "NetApp BlueXP: Inventory"
    "image_url": images/crest_data_netapp_bluexp_inventory.png
    "media_type": image
  - "caption": "NetApp BlueXP: Disk"
    "image_url": images/crest_data_netapp_bluexp_disk.png
    "media_type": image
  - "caption": "NetApp BlueXP: Network"
    "image_url": images/crest_data_netapp_bluexp_network.png
    "media_type": image
  - "caption": "NetApp BlueXP: Node"
    "image_url": images/crest_data_netapp_bluexp_node.png
    "media_type": image
  - "caption": "NetApp BlueXp: Volume"
    "image_url": images/crest_data_netapp_bluexp_volume.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": NetApp BlueXP
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

NetApp BlueXP provides your organization with a single control plane that helps you build, protect, and govern data across your on-premises and cloud environments. The BlueXP SaaS platform includes services that provide storage management, data mobility, data protection, and data analysis and control.

NetApp BlueXP's Datadog Integration fetches server and component stats and periodically sends them to Datadog. It supports Cluster, Node, Network, Aggregate, Volume, Disk, and Firmware versions, alongside Digital Advisor references. It also includes inventory data like Resources, workspaces, users, and audits, with preconfigured dashboards and monitors for quick insights and efficient data management.

### Data types

The following types of data are collected in Netapp BlueXP's Datadog Integration:

| Data type                   | Details fetched                         |
| -------------------------- | ------------------------------------ |
| Inventory                  | Account, Workspace, Resources, Audit | 
| Digital Advisory           | Cluster, Node, Aggregate, Disk, Volume, Network Interface, Network Ports  | 

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: datadog.integrations@crestdata.ai
- Sales Email: datadog-sales@crestdata.ai
- Website: [crestdata.ai][8]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][9]

[1]: https://docs.datadoghq.com/agent/?tab=Linux
[2]: https://docs.netapp.com/us-en/bluexp-setup-admin/task-managing-netapp-accounts.html#manage-a-workspace-admins-workspaces
[3]: https://docs.netapp.com/us-en/active-iq/task_generate_tokens_API_services.html
[4]: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/account_management/api-app-keys/
[6]: https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: https://www.crestdata.ai/
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://docs.crestdata.ai/datadog-integrations-readme/NetApp_BlueXP.pdf

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-bluexp" target="_blank">Click Here</a> to purchase this application.
