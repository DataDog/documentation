---
algolia:
  subcategory: Marketplace Integrations
app_id: crest-data-systems-cisco-asa
app_uuid: 384341e7-e5b4-42a0-917d-a52db20ce507
assets:
  dashboards:
    CDS Cisco ASA - Application Firewall Details: assets/dashboards/cds_cisco_asa_application_firewall_details.json
    CDS Cisco ASA - Identity-Based Firewall Details: assets/dashboards/cds_cisco_asa_identity_based_firewall_details.json
    CDS Cisco ASA - Overview: assets/dashboards/cds_cisco_asa_overview.json
    CDS Cisco ASA - Transparent Firewall Details: assets/dashboards/cds_cisco_asa_transparent_firewall_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10384
    source_type_name: crest_data_systems_cisco_asa
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- security
- network
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_asa
integration_id: crest-data-systems-cisco-asa
integration_title: Cisco ASA
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_asa
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-asa
  short_description: Flat fee per month for Cisco-ASA integration.
  unit_price: 1995.0
public_title: Cisco ASA
short_description: Visualize Cisco ASA Syslog data
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Network
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualize Cisco ASA Syslog data
  media:
  - caption: CDS Cisco ASA - Overview
    image_url: images/cds_cisco_asa_overview.png
    media_type: image
  - caption: CDS Cisco ASA - Identity-Based Firewall Details
    image_url: images/cds_cisco_asa_identity_based_firewall_details.png
    media_type: image
  - caption: CDS Cisco ASA - Transparent Firewall Details
    image_url: images/cds_cisco_asa_transparent_firewall_details.png
    media_type: image
  - caption: CDS Cisco ASA - Application Firewall Details
    image_url: images/cds_cisco_asa_application_firewall_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ASA
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

* Cisco ASA (Adaptive Security Appliance) is a multifunctional network security device produced by Cisco Systems. It combines various security features, including firewall, VPN (Virtual Private Network) capabilities, intrusion prevention, and content security. 
* Cisco ASA acts as a primary line of defense for networks by protecting them from unauthorized access, malicious threats, and data breaches.
* Cisco ASA is a versatile security appliance that offers robust protection for networks of various sizes, from small businesses to large enterprises. It combines multiple security features in a single device, simplifying network security management and ensuring a secure and reliable network infrastructure.

This integration monitors and visualizes the following data sources:
* Application Firewall
* Transparent Firewall
* Identity-based Firewall
* User Authentication
* User Session
* Intrusion Detection System
* System
* Command Interface

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][2]
- Sales Email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://www.cisco.com/c/en/us/td/docs/security/asa/asa916/configuration/firewall/asa-916-firewall-config/access-sfr.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_ASA.pdf
[9]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-asa" target="_blank">Click Here</a> to purchase this application.