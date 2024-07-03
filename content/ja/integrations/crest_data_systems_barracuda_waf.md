---
algolia:
  subcategory: Marketplace Integrations
app_id: crest-data-systems-barracuda-waf
app_uuid: 6d143b10-1da5-44e6-9143-19506722385f
assets:
  dashboards:
    CDS Barracuda WAF - Access Details: assets/dashboards/cds_barracuda_waf_access_details.json
    CDS Barracuda WAF - Audit Details (WAAS): assets/dashboards/cds_barracuda_waf_audit_details_waas.json
    CDS Barracuda WAF - Audit Details (WAF): assets/dashboards/cds_barracuda_waf_audit_details_waf.json
    CDS Barracuda WAF - Event Details: assets/dashboards/cds_barracuda_waf_event_details.json
    CDS Barracuda WAF - Network Firewall Details: assets/dashboards/cds_barracuda_waf_network_firewall_details.json
    CDS Barracuda WAF - System Details: assets/dashboards/cds_barracuda_waf_system_details.json
    CDS Barracuda WAF - Web Firewall Details: assets/dashboards/cds_barracuda_waf_web_firewall_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10380
    source_type_name: crest_data_systems_barracuda_waf
  monitors:
    '[Barracuda WAF] Server Responding with Status Code lying in Range: [400-599]': assets/monitors/cds_server_response_error_status_code.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- event management
- log collection
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_barracuda_waf
integration_id: crest-data-systems-barracuda-waf
integration_title: Barracuda WAF
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_barracuda_waf
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: barracuda-waf
  short_description: Flat fee per month for Barracuda WAF integration.
  unit_price: 295.0
public_title: Barracuda WAF
short_description: Visualize Barracuda WAF and Barracuda WAAS data via Syslog or API
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
  - Category::Marketplace
  - Category::Event Management
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualize Barracuda WAF and Barracuda WAAS data via Syslog or API
  media:
  - caption: CDS Barracuda WAF - Access Details
    image_url: images/cds_barracuda_waf_access_details.png
    media_type: image
  - caption: CDS Barracuda WAF - Audit Details (WAF)
    image_url: images/cds_barracuda_waf_audit_details_waf.png
    media_type: image
  - caption: CDS Barracuda WAF - Audit Details (WAAS)
    image_url: images/cds_barracuda_waf_audit_details_waas.png
    media_type: image
  - caption: CDS Barracuda WAF - Network Firewall Details
    image_url: images/cds_barracuda_waf_network_firewall_details.png
    media_type: image
  - caption: CDS Barracuda WAF - System Details
    image_url: images/cds_barracuda_waf_system_details.png
    media_type: image
  - caption: CDS Barracuda WAF - Web Firewall Details
    image_url: images/cds_barracuda_waf_web_firewall_details.png
    media_type: image
  - caption: CDS Barracuda WAF - Event Details
    image_url: images/cds_barracuda_waf_event_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Barracuda WAF
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

This Barracuda WAF integration monitors and visualizes Barracuda WAF as well as Barracuda WAAS.

### Barracuda Web Application Firewall (WAF)

**Barracuda Web Application Firewall (WAF)** is a security solution designed to protect web applications from various types of cyber threats and attacks. It acts as a gateway between the web application server and the internet, monitoring and filtering incoming and outgoing traffic to ensure the application's security and availability. 

### Barracuda Web Application Firewall as-a-service (WAAS)

**Barracuda WAF-as-a-Service (WAAS)** provides cloud-delivered, enterprise-grade application security without the administrative overhead of an appliance. With Barracuda WAF-as-a-Service, you can secure your applications within minutes, regardless of where they are hosted. There is nothing to deploy, scale, size, or maintain.

### Features

| Product | Method | Captured Logs | Docs Reference Link | 
  | ---- | ----------- | -------- | --------- | 
  | WAF | Syslog | Network Firewall, Access, Web Firewall, Audit, System| [Barracuda WAF][9]|
  | WAAS | Syslog | Web Firewall, Access, Event| [Barracuda WAAS Syslog][10]|
  | WAAS  | API | Web Firewall, Access, Audit| [Barracuda WAAS API][11]|


## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support: [datadog.integrations@crestdata.ai][2]
- Sales: [datadog-sales@crestdata.ai][3]
- Website: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][15]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://campus.barracuda.com/product/webapplicationfirewall/doc/92767342/adding-a-syslog-server
[8]: https://campus.barracuda.com/product/WAAS/doc/91980986/managing-administrator-roles/
[9]: https://campus.barracuda.com/product/webapplicationfirewall/doc/92767349/exporting-log-formats/
[10]: https://campus.barracuda.com/product/WAAS/doc/79462622/log-export
[11]: https://blog.barracuda.com/2021/10/18/barracuda-waf-as-a-service-rest-api
[12]: https://docs.crestdata.ai/datadog-integrations-readme/barracuda_WAF.pdf
[13]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[14]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[15]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-barracuda-waf" target="_blank">Click Here</a> to purchase this application.