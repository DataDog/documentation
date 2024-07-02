---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-infoblox-ddi"
"app_uuid": "d497c205-6215-4fcc-87d3-bb17c66fbeb7"
"assets":
  "dashboards":
    "CDS Infoblox DDI - DHCP Details": assets/dashboards/cds_infoblox_ddi_dhcp_details.json
    "CDS Infoblox DDI - DNS Details": assets/dashboards/cds_infoblox_ddi_dns_details.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10383"
    "source_type_name": crest_data_systems_infoblox_ddi
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- security
- network
- marketplace
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_infoblox_ddi"
"integration_id": "crest-data-systems-infoblox-ddi"
"integration_title": "Infoblox DNS & DHCP"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_infoblox_ddi"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": infoblox-ddi
  "short_description": Flat fee per month for Infoblox-DDI integration.
  "unit_price": !!float "95.0"
"public_title": "Infoblox DNS & DHCP"
"short_description": "Visualize Infoblox DDI Syslog data"
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
  - "Category::Security"
  - "Category::Network"
  - "Category::Marketplace"
  - "Offering::Integration"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Visualize Infoblox DDI Syslog data
  "media":
  - "caption": CDS Infoblox DDI - DHCP Details
    "image_url": images/cds_infoblox_ddi_dhcp_details.png
    "media_type": image
  - "caption": CDS Infoblox DDI - DNS Details
    "image_url": images/cds_infoblox_ddi_dns_details.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Infoblox DNS & DHCP
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

* Infoblox DDI is a platform that automates and controls core network services.
* Their solutions help organizations efficiently manage DNS, DHCP, and IPAM operations, simplifying network management tasks and enhancing overall network reliability and security.
* Infoblox DDI focuses on providing secure DNS and DHCP services to protect against threats and ensure the integrity of network infrastructure.

This integration monitors and visualizes the following data sources:

* DHCP Logs
* DNS Logs

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support email: [datadog.integrations@crestdata.ai][2]
- Sales email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://insights.infoblox.com/resources-deployment-guides/infoblox-deployment-guide-vnios-deployment-on-vmware-vsphere
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.infoblox.com/space/NAG8/22252249/Using+a+Syslog+Server#Specifying-Syslog-Servers
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Infoblox_DDI.pdf
[10]: https://docs.datadoghq.com/agent/?tab=Linux
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-infoblox-ddi" target="_blank">Click Here</a> to purchase this application.
