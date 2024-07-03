---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-cisco-class-based-qos
app_uuid: 97f3eada-2bd0-4100-94f7-fe7f20132442
assets:
  dashboards:
    RapDev Cisco QOS Dashboard: assets/dashboards/rapdev_cisco_classbased_qos_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.cisco_class_based_qos.devices_monitored
      metadata_path: metadata.csv
      prefix: rapdev.cisco_class_based_qos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10457427
    source_type_name: cisco_class_based_qos
  logs: {}
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: sales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- network
- snmp
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_cisco_class_based_qos
integration_id: rapdev-cisco-class-based-qos
integration_title: Cisco Quality of Service (QOS)
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_cisco_class_based_qos
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.cisco_class_based_qos
  product_id: cisco
  short_description: Unit price per QOS device
  tag: qos_host
  unit_label: QOS device
  unit_price: 20
public_title: Cisco Quality of Service (QOS)
short_description: Monitor the network traffic using Cisco class-based Quality of
  Service
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Category::Network
  - Category::SNMP
  - Category::Metrics
  configuration: README.md#Setup
  description: Monitor the network traffic using Cisco class-based Quality of Service
  media:
  - caption: QOS Dashboard - Lightmode 1/3
    image_url: images/dashboard_light_1.jpg
    media_type: image
  - caption: QOS Dashboard - Lightmode 2/3
    image_url: images/dashboard_light_2.jpg
    media_type: image
  - caption: QOS Dashboard - Lightmode 3/3
    image_url: images/dashboard_light_3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Quality of Service (QOS)
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Quality of Service (QoS) in Cisco Networks is a set of technologies and practices designed to manage traffic and ensure that various network services meet performance requirements. Cisco's QoS involves prioritizing certain types of network traffic over others to ensure that critical applications like voice and video conferencing receive the bandwidth and low latency they need to function properly, especially in times of network congestion.

Key components of Cisco QoS include:
- Classification and Marking: Identifying traffic types and marking them for differential handling. This process involves inspecting packets and assigning them to different classes based on policies.
- Queuing: Managing traffic congestion and ensuring the prioritized handling of higher-class traffic. This involves algorithms like Priority Queuing, Weighted Fair Queuing (WFQ), and Class-Based Weighted Fair Queuing (CBWFQ).
- Congestion Management and Avoidance: Using tools like Tail Drop or Random Early Detection (RED) to prevent network congestion by managing traffic flow and discarding packets in a controlled manner.
- Traffic Shaping and Policing: Regulating the traffic flow to conform to defined bandwidth limits. Traffic shaping smooths out traffic flow, while policing drops traffic exceeding the specified rate.
- Link Efficiency Mechanisms: Techniques such as Link Fragmentation and Interleaving (LFI) and compression methods to improve the efficiency of the network link.

The integration periodically polls the Cisco device for the selected MIB objects. The collected data shows the performance and usage statistics of different QoS policies, allowing network administrators to analyze traffic patterns, verify QoS policy effectiveness, and make adjustments as needed.

The Cisco Class-based Quality of Service integration monitors the statistics of [class-based traffic policing][2] on your SNMP-enabled Cisco devices. Class-based policing allows you to control the maximum rate of traffic that is transmitted or received on an interface. You can observe the various classes of network traffic flowing through their device, both pre- and post-policy, as well as how different policies affect this traffic. 

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][8]  
- Sales: [sales@rapdev.io][9]  
- Chat: [rapdev.io][10]  
- Phone: 855-857-0222

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos_plcshp/configuration/xe-16/qos-plcshp-xe-16-book/qos-plcshp-class-plc.html
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://sourceforge.net/projects/net-snmp/
[6]: https://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/7282-12.html
[7]: https://community.cisco.com/t5/networking-knowledge-base/configuration-template-for-snmpv3/ta-p/4666450
[8]: mailto:support@rapdev.io  
[9]: mailto:sales@rapdev.io  
[10]: https://www.rapdev.io/#Get-in-touch  
[11]: https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-cisco-class-based-qos" target="_blank">Click Here</a> to purchase this application.