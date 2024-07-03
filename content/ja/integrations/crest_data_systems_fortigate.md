---
algolia:
  subcategory: Marketplace Integrations
app_id: crest-data-systems-fortigate
app_uuid: 161092c6-b52c-465b-b46b-442b82768e67
assets:
  dashboards:
    CDS FortiGate Overview: assets/dashboards/crest_data_systems_fortigate_overview.json
    CDS FortiGate System: assets/dashboards/crest_data_systems_fortigate_system.json
    CDS FortiGate Traffic: assets/dashboards/crest_data_systems_fortigate_traffic.json
    CDS FortiGate UTM: assets/dashboards/crest_data_systems_fortigate_utm.json
    CDS FortiGate User Audit: assets/dashboards/crest_data_systems_fortigate_user_audit.json
    CDS FortiGate Wireless Network and VPN: assets/dashboards/crest_data_systems_fortigate_wireless_network_and_vpn.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.fortigate.system_metrics
      metadata_path: metadata.csv
      prefix: cds.fortigate.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10362
    source_type_name: crest_data_systems_fortigate
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- network
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_fortigate
integration_id: crest-data-systems-fortigate
integration_title: FortiGate
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_fortigate
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: fortigate
  short_description: Flat fee per month for fortigate integration.
  unit_price: 995.0
public_title: FortiGate
short_description: Monitors all FortiGate forwarded logs
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitors all FortiGate forwarded logs
  media:
  - caption: CDS FortiGate - Overview
    image_url: images/crest_data_systems_fortigate_overview.png
    media_type: image
  - caption: CDS FortiGate - System
    image_url: images/crest_data_systems_fortigate_system.png
    media_type: image
  - caption: CDS FortiGate - Traffic
    image_url: images/crest_data_systems_fortigate_traffic.png
    media_type: image
  - caption: CDS FortiGate - User Audit
    image_url: images/crest_data_systems_fortigate_user_audit.png
    media_type: image
  - caption: CDS FortiGate - UTM
    image_url: images/crest_data_systems_fortigate_utm.png
    media_type: image
  - caption: CDS FortiGate - Wireless Network and VPN
    image_url: images/crest_data_systems_fortigate_wireless_network_and_vpn.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: FortiGate
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

- FortiGate provides a full range of threat protection capabilities, including firewall, intrusion prevention, antivirus, SSL inspection, and application control. FortiGate reduces complexity with automated visibility into applications, users, and networks, and provides security ratings to adopt security best practices.

  This integration collects the following log types and subtypes:

  | Type    | Description                                                                             | SubType                                                            |
  | ------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
  | Traffic | Records traffic flow information such as an HTTP/HTTPS request and its response, if any | FORWARD, LOCAL                                                     |
  | Event   | Records system and administrative events                                                | SYSTEM, USER, VPN, WIRELESS |
  | UTM     | Records UTM Events                                                                      | IPS, WEB                    |


> **NOTE**: Support for the metric has been discontinued and its related panels are now deprecated in integration v1.1.0. We plan to completely remove the same in upcoming releases of the integration 

## Troubleshooting

- If you see a **Permission denied** error while port binding in agent logs, follow the instructions below:

  1. Binding to a port number under 1024 requires elevated permissions. Follow the instructions below to set this up.

     - Grant access to the port using the setcap command:

       ```sh
       sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
       ```

     - Verify the setup is correct by running the getcap command:

       ```sh
       sudo getcap /opt/datadog-agent/bin/agent/agent
       ```

       With the expected output:

       ```sh
       /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
       ```

       Note: Re-run this setcap command every time you upgrade the Agent.

  2. [Restart the Agent][1].

- If the firewall is enabled, make sure traffic is bypassed from the configured port.

- If you see the **Port 514 Already in Use** error, follow the below instructions (the example given below is for PORT-NO = 514):

  - On systems with Syslog, if the Agent is listening for FortiGate logs on port 514, the following error can appear in the Agent logs: **Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use**.

  - This happens because, by default, Syslog is listening on port 514. To resolve this error, you can disable Syslog, or have the Agent listen on the available port that is not occupied by other services.

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][6]
- Sales Email: [datadog-sales@crestdata.ai][7]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://community.fortinet.com/t5/FortiGate/Technical-Tip-How-to-configure-logging-in-memory-in-later/ta-p/193637
[6]: mailto:datadog.integrations@crestdata.ai
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Fortigate.pdf
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-fortigate" target="_blank">Click Here</a> to purchase this application.