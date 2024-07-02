---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-sentinel-one"
"app_uuid": "76849771-0309-46bc-b498-36de630b0c98"
"assets":
  "dashboards":
    "CDS Sentinel One - Activity Details": assets/dashboards/cds_sentinel_one_activity_details.json
    "CDS Sentinel One - Endpoint Details": assets/dashboards/cds_sentinel_one_endpoint_details.json
    "CDS Sentinel One - Group & application Details": assets/dashboards/cds_sentinel_one_group_and_application_details.json
    "CDS Sentinel One - Threat Details": assets/dashboards/cds_sentinel_one_threat_details.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10417"
    "source_type_name": crest_data_systems_sentinel_one
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_sentinel_one"
"integration_id": "crest-data-systems-sentinel-one"
"integration_title": "SentinelOne"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_sentinel_one"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.sentinel_one
  "product_id": sentinel-one
  "short_description": Per SentineOne endpoint per month
  "tag": endpoint_id
  "unit_label": SentinelOne Endpoint
  "unit_price": !!float "1.0"
"public_title": "SentinelOne"
"short_description": "Monitors SentinelOne's agents, threats, activities, groups and applications."
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
  - "Category::Security"
  - "Offering::Integration"
  - "Submitted Data Type::Events"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitors SentinelOne's agents, threats, activities, groups and applications.
  "media":
  - "caption": CDS SentinelOne - Endpoint Details
    "image_url": images/cds_sentinel_one_endpoint_details.png
    "media_type": image
  - "caption": CDS SentinelOne - Group & Application Details
    "image_url": images/cds_sentinel_one_group_and_application_details.png
    "media_type": image
  - "caption": CDS SentinelOne - Activity Details
    "image_url": images/cds_sentinel_one_activity_details.png
    "media_type": image
  - "caption": CDS SentinelOne - Threat Details
    "image_url": images/cds_sentinel_one_threat_details.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": SentinelOne
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

SentinelOne is an enterprise cybersecurity platform, which offers unified prevention, detection, and response across a security estate. SentinelOne's Singularity platform simplifies modern endpoint, cloud, and identity protection through one centralized, autonomous platform for enterprise cybersecurity.  

This integration collects the following types of data:  

* Activities  
* Agents  
* Applications  
* Groups  
* Threats   

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support: [datadog.integrations@crestdata.ai][5]
- Sales: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]


[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Sentinel_One.pdf
[8]: https://docs.datadoghq.com/agent/?tab=Linux
[9]: https://docs.datadoghq.com/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sentinel-one" target="_blank">Click Here</a> to purchase this application.
