---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-pfsense"
"app_uuid": "39d6eaf5-ff21-4fd6-a3c5-cbbad9b8a449"
"assets":
  "dashboards":
    "pfSense - DHCP": assets/dashboards/crest_data_systems_pfsense_DHCP_Details.json
    "pfSense - Firewall": assets/dashboards/crest_data_systems_pfsense_Firewall_Details.json
    "pfSense - NGINX": assets/dashboards/crest_data_systems_pfsense_NGINX_Details.json
    "pfSense - OpenVPN": assets/dashboards/crest_data_systems_pfsense_OpenVPN_Details.json
    "pfSense - Overview": assets/dashboards/crest_data_systems_pfsense_overview.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": cds.pfsense.packet_length
      "metadata_path": metadata.csv
      "prefix": cds.pfsense
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10347"
    "source_type_name": crest_data_systems_pfsense
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- security
- network
- log collection
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_pfsense"
"integration_id": "crest-data-systems-pfsense"
"integration_title": "pfSense"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_pfsense"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.pfsense
  "product_id": pfsense
  "short_description": Per pfSense instance per month
  "tag": cds_pfsense_host
  "unit_label": pfSense instance
  "unit_price": !!float "95.0"
"public_title": "pfSense"
"short_description": "Monitors forwarded logs from pfSense"
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
  - "Category::Network"
  - "Category::Log Collection"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitors forwarded logs from pfSense
  "media":
  - "caption": pfSense - Overview Dashboard
    "image_url": images/crest_data_systems_pfsense_overview.png
    "media_type": image
  - "caption": pfSense - Firewall Dashboard
    "image_url": images/crest_data_systems_pfsense_Firewall_Details.png
    "media_type": image
  - "caption": pfsense - OpenVPN Dashboard
    "image_url": images/crest_data_systems_pfsense_OpenVPN_Details.png
    "media_type": image
  - "caption": pfSense - DHCP Dashboard
    "image_url": images/crest_data_systems_pfsense_DHCP_Details.png
    "media_type": image
  - "caption": pfSense - NGINX Dashboard
    "image_url": images/crest_data_systems_pfsense_NGINX_Details.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": pfSense
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

pfSense is an open source customized distribution of FreeBSD that is specifically tailored for use as a firewall and router that can be managed through a web interface.

This integration monitors logs for firewalls, OpenVPN, NGINX, and DHCP from pfSense CE. This integration also captures metrics and provides insights into packet length and bytes sent per request from the collected logs.

## Support

For support or feature requests, contact Crest Data through the following channels:

- Support Email: datadog.integrations@crestdata.ai
- Sales Email: datadog-sales@crestdata.ai
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.netgate.com/pfsense/en/latest/monitoring/logs/settings.html
[6]: https://docs.netgate.com/pfsense/en/latest/config/general.html#localization
[7]: mailto:datadog.integrations@crestdata.ai
[8]: https://docs.crestdata.ai/datadog-integrations-readme/pFsense.pdf
[9]: https://docs.datadoghq.com/agent/?tab=Linux
[10]: https://docs.datadoghq.com/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-pfsense" target="_blank">Click Here</a> to purchase this application.
