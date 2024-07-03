---
algolia:
  subcategory: Marketplace Integrations
app_id: crest-data-systems-cisco-ise
app_uuid: 68dcc9fc-a128-42be-b122-28e68e04c4ed
assets:
  dashboards:
    CDS Cisco ISE - Authentication Details: assets/dashboards/cds_cisco_ise_authentication_details.json
    CDS Cisco ISE - Client Provisioning Details: assets/dashboards/cds_cisco_ise_client_provisioning_details.json
    CDS Cisco ISE - Compliance Details: assets/dashboards/cds_cisco_ise_compliance_details.json
    CDS Cisco ISE - Device Details: assets/dashboards/cds_cisco_ise_device_details.json
    CDS Cisco ISE - Overview: assets/dashboards/cds_cisco_ise_overview.json
    CDS Cisco ISE - Posture Details: assets/dashboards/cds_cisco_ise_posture_details.json
    CDS Cisco ISE - Profiler Details: assets/dashboards/cds_cisco_ise_profiler_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10364
    source_type_name: crest_data_systems_cisco_ise
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- security
- log collection
- provisioning
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_ise
integration_id: crest-data-systems-cisco-ise
integration_title: Cisco ISE
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_ise
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-ise
  short_description: Flat fee per month for Cisco ISE integration.
  unit_price: 1995.0
public_title: Cisco ISE
short_description: Visualize Cisco ISE Syslog data
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
  - Category::Log Collection
  - Category::Provisioning
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualize Cisco ISE Syslog data
  media:
  - caption: CDS Cisco ISE - Overview
    image_url: images/cds_cisco_ise_overview.png
    media_type: image
  - caption: CDS Cisco ISE - Authentication Details
    image_url: images/cds_cisco_ise_authentication_details.png
    media_type: image
  - caption: CDS Cisco ISE - Profiler Details
    image_url: images/cds_cisco_ise_profiler_details.png
    media_type: image
  - caption: CDS Cisco ISE - Device Details
    image_url: images/cds_cisco_ise_device_details.png
    media_type: image
  - caption: CDS Cisco ISE - Posture Details
    image_url: images/cds_cisco_ise_posture_details.png
    media_type: image
  - caption: CDS Cisco ISE - Compliance Details
    image_url: images/cds_cisco_ise_compliance_details.png
    media_type: image
  - caption: CDS Cisco ISE - Client Provisioning Details
    image_url: images/cds_cisco_ise_client_provisioning_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ISE
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Cisco Identity Services Engine (ISE) is a next-generation identity and access control policy platform that enables enterprises to enforce compliance, enhance infrastructure security, and streamline their service operations. The unique architecture of Cisco ISE allows enterprises to gather real-time contextual information from networks, users, and devices.  

The administrator can then use that information to make proactive governance decisions by tying identity to various network elements including access switches, wireless LAN controllers (WLCs), virtual private network (VPN) gateways, and data center switches.

This integration has visualizations for the following types of logs:
   * 認証
   * Posture 
   * Profiler
   * Client Provisioning

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][2]
- Sales Email: [datadog-sales@crestdata.ai][3]
- Website: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][9]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_ISE.pdf
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-ise" target="_blank">Click Here</a> to purchase this application.