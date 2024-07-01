---
"app_id": "meraki"
"app_uuid": "c34bd865-7ddf-4336-9cf2-02e1a2f05bbd"
"assets":
  "dashboards":
    "meraki": assets/dashboards/meraki_overview.json
  "integration":
    "auto_install": false
    "metrics":
      "check":
      - meraki.port.usageInKb.recv
      - snmp.devStatus
      "metadata_path": metadata.csv
      "prefix": meraki.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "602"
    "source_type_name": Meraki
  "monitors":
    "[Meraki] A Meraki Device Uplink is Failing": assets/monitors/uplink_device_is_failing.json
    "[Meraki] A Meraki Device is in an Alerting State": assets/monitors/device_is_in_alert_state.json
    "[Meraki] Abnormally High Latency on a Meraki Uplink": assets/monitors/high_latency_on_uplink.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- network
- log collection
- security
- snmp
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "meraki"
"integration_id": "meraki"
"integration_title": "Cisco Meraki"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "meraki"
"public_title": "Cisco Meraki"
"short_description": "Monitor your Cisco Meraki Environment with Network Device Monitoring, Logs, and Cloud SIEM"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Network"
  - "Category::Log Collection"
  - "Category::Security"
  - "Category::SNMP"
  - "Submitted Data Type::Logs"
  - "Submitted Data Type::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor your Cisco Meraki Environment with Network Device Monitoring, Logs, and Cloud SIEM
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/network_monitoring/devices/"
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-meraki/"
  "support": "README.md#Support"
  "title": Cisco Meraki
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
<div class="alert alert-info">The Cisco Meraki integration is in public beta.</div>

## Overview

This integration provides comprehensive visibility into your Cisco Meraki Enviroment by collecting metrics for [Network Device Monitoring][1], Network Event Logs, and Security Event Logs for [Cloud SIEM][2].

**Network Device Monitoring**

[Network Device Monitoring][1] helps ensure the overall health of network infrastructure is up to standard by identifying potential bottlenecks and device configuration errors.

This integration collects metrics for the following devices:

* _MR (Wireless Access Points):_ Track metrics like client count, connection status, and throughput.
* _MS (Switches):_ Monitor switch performance metrics such as port status, traffic, and error rates.
* _MX (Security Appliances):_ Collect metrics on VPN status, firewall rules, and overall device performance.

This integration dynamically pulls in device tags and metadata from Meraki environments to easily drill down into specific device groups, locations, or device types.

**Security Event Logs**

[Security Event Logs][3] alert on events such as intrusion detections, firewall rule violations, and malware threat detections to helpy identify and respond to potential security threats.

Create your own rules or leverage the [out-of-the-box Cloud SIEM rules][4] for real-time threat detection and incident response.

**Network Event Logs**

[Network Event Logs][5] help network administrators analyze historical network events and troubleshoot issues efficiently.

These logs track the following topics:

* _Configuration Changes:_ Track changes in network configurations to ensure compliance and troubleshoot connection issues.
* _Client Associations:_ Monitor client associations with wireless access points for user connectivity insights.
* _Network Health Events:_ Identify and address issues affecting network health, such as high packet loss on specific switches.

<br />

In addition to the recommended monitors included with this integration, additional monitors can be configured to notify administrators of critical events, allowing for proactive network management.

To collect metrics from your Meraki Cloud Controller, configure the [SNMP integration][6] with the Meraki Profile.


## Setup

### Installation

1. In the app, open the [Meraki integration tile][7].
1. Click **+ Add Account**.
1. Choose a name for your Meraki account.
1. Add a Meraki API key. Find instructions on how to generate a Meraki API key in the [Cisco Meraki Dashboard API][8].

### Generate the Meraki API key

1. Go to the Meraki Dashboard.
2. Enable API access by going to Organization > Settings > Dashboard API access.
3. Go to the My Profile page on the Meraki dashboard to generate the key.

### Metric collection

To configure collection of NDM Metrics, an API key is required from Meraki.

#### Device Tag Filters

Device Tag Filters allow you to specify which devices to monitor
within NDM. You can specify multiple tags by separating them
with a comma. If no tags are specified, all devices will be
monitored.

### Log collection

To configure collection of network event logs and security event logs, an API key is required from Meraki.

For more information, see the [Cisco Meraki Dashboard API][9].

## Data Collected

### Metrics

<div class="alert alert-info">Data for Meraki devices (MR, MS, MX) in Network Device Monitoring—including network level, device level, uplink level, and interface (switch port) level metrics and tags—are in beta.</div>

Configure the [SNMP integration][6] with the Meraki Profile to collect metrics from your Meraki devices.

{{< get-metrics-from-git "meraki" >}}

### Events

The Meraki integration does not include any events.

### Service Checks

The Meraki integration does not include any service checks.

## Troubleshooting
Datadog sometimes encounters issues accessing Meraki from its servers. Add Datadog's IPs to your IP address allow list to ensure that crawling works as expected.

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Network Device Monitoring][11]
- [Monitor Cisco Meraki with Datadog][12]

[1]: https://app.datadoghq.com/devices
[2]: https://app.datadoghq.com/security/home
[3]: https://developer.cisco.com/meraki/api/get-network-appliance-security-events/
[4]: https://app.datadoghq.com/logs/pipelines?search=meraki
[5]: https://developer.cisco.com/meraki/api/get-network-events/
[6]: https://docs.datadoghq.com/integrations/snmp/
[7]: https://app.datadoghq.com/integrations/meraki
[8]: https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API
[9]: https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API#Enable_API_access
[10]: https://docs.datadoghq.com/help/
[11]: https://docs.datadoghq.com/network_monitoring/devices/
[12]: https://www.datadoghq.com/blog/monitor-meraki/

