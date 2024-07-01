---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-netapp-eseries-santricity"
"app_uuid": "018234fd-7290-4477-9982-38d8df86803e"
"assets":
  "dashboards":
    "NetApp ESeries SANtricity Configuration - Array Summary": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Configuration-ArraySummary.json
    "NetApp ESeries SANtricity Performance - Array by Controller": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ArraybyController.json
    "NetApp ESeries SANtricity Performance - Array by Drive Channel": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ArraybyDriveChannel.json
    "NetApp ESeries SANtricity Performance - Array by Host Channel": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ArraybyHostChannel.json
    "NetApp ESeries SANtricity Performance - Cache Hits by Volume": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-CacheHitsbyVolume.json
    "NetApp ESeries SANtricity Performance - Controller by Volume Group/Pool": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ControllerbyVolumeGroup_Pool.json
    "NetApp ESeries SANtricity Performance - Volume Group/Pool by Drive": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyDrive.json
    "NetApp ESeries SANtricity Performance - Volume Group/Pool by Volume": assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyVolume.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": cds.netapp.eseries.santricity.array.configuration.controller.summary
      "metadata_path": metadata.csv
      "prefix": cds.netapp.eseries.santricity.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10322"
    "source_type_name": crest_data_systems_netapp_eseries_santricity
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- data stores
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_netapp_eseries_santricity"
"integration_id": "crest-data-systems-netapp-eseries-santricity"
"integration_title": "NetApp ESeries SANtricity"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_netapp_eseries_santricity"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.netapp_eseries_santricity
  "product_id": netapp-eseries-santricity
  "short_description": Priced per storage array per month.
  "tag": cds_netapp_eseries_santricity_instance
  "unit_label": NetApp ESeries SANtricity Storage Array
  "unit_price": !!float "495.0"
"public_title": "NetApp ESeries SANtricity"
"short_description": "Monitors the performance and configuration of the system."
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
  "description": Monitors the performance and configuration of the system.
  "media":
  - "caption": NetApp ESeries SANtricity Configuration - Array Summary
    "image_url": images/CDS_NetAppESeriesSANtricity_Configuration-ArraySummary.png
    "media_type": image
  - "caption": NetApp ESeries SANtricity Performance - Array by Controller
    "image_url": images/CDS_NetAppESeriesSANtricity_Performance-ArraybyController.png
    "media_type": image
  - "caption": NetApp ESeries SANtricity Performance - Volume Group/Pool by Volume
    "image_url": images/CDS_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyVolume.png
    "media_type": image
  - "caption": NetApp ESeries SANtricity Performance - Controller by Volume Group/Pool
    "image_url": images/CDS_NetAppESeriesSANtricity_Performance-ControllerbyVolumeGroup_Pool.png
    "media_type": image
  - "caption": NetApp ESeries SANtricity Performance - Array by Drive Channel
    "image_url": images/CDS_NetAppESeriesSANtricity_Performance-ArraybyDriveChannel.png
    "media_type": image
  - "caption": NetApp ESeries SANtricity Performance - Array by Host Channel
    "image_url": images/CDS_NetAppESeriesSANtricity_Performance-ArraybyHostChannel.png
    "media_type": image
  - "caption": NetApp ESeries SANtricity Performance - Cache Hits by Volume
    "image_url": images/CDS_NetAppESeriesSANtricity_Performance-CacheHitsbyVolume.png
    "media_type": image
  - "caption": NetApp ESeries SANtricity Performance - Volume Group/Pool by Drive
    "image_url": images/CDS_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyDrive.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": NetApp ESeries SANtricity
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

This integration collects configuration and performance details from the NetApp ESeries SANtricity platform by capturing crucial metrics and visualizing the performance of array configured in the NetApp ESeries SANtricity.

## Support

For support or feature requests, contact Crest Data through the following channels:

- Support Email: [datadog.integrations@crestdata.ai][9]
- Sales Email: [datadog-sales@crestdata.ai][10]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][8]

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.crestdata.ai/datadog-integrations-readme/NetApp_ESeries_SANtricity.pdf
[6]: https://docs.datadoghq.com/agent/?tab=Linux
[7]: https://docs.datadoghq.com/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-eseries-santricity" target="_blank">Click Here</a> to purchase this application.
