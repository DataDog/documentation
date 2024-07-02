---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "hardware-sentry"
"app_uuid": "daade024-2095-4a73-afe5-35afbe9e2b12"
"assets":
  "dashboards":
    "Hardware Sentry - Host": assets/dashboards/host.json
    "Hardware Sentry - Main": assets/dashboards/main.json
    "Hardware Sentry - Site": assets/dashboards/site.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": hardware_sentry.agent.info
      "metadata_path": metadata.csv
      "prefix": hardware_sentry.
    "service_checks":
      "metadata_path": service_checks.json
    "source_type_id": !!int "10286"
    "source_type_name": Hardware Sentry
  "logs": {}
  "monitors":
    "Hardware Sentry - Agent-NoData": assets/monitors/agent-nodata.json
    "Hardware Sentry - Connector Failed": assets/monitors/connector-failed.json
    "Hardware Sentry - Critical Fan Speed": assets/monitors/critical-fan-speed.json
    "Hardware Sentry - Critical Temperature": assets/monitors/critical-temperature.json
    "Hardware Sentry - Errors": assets/monitors/errors.json
    "Hardware Sentry - High Temperature": assets/monitors/high-temperature.json
    "Hardware Sentry - High Voltage": assets/monitors/high-voltage.json
    "Hardware Sentry - Intrusion": assets/monitors/intrusion.json
    "Hardware Sentry - Link Down": assets/monitors/network-link-down.json
    "Hardware Sentry - Low Battery": assets/monitors/low-battery.json
    "Hardware Sentry - Low Fan Speed": assets/monitors/low-fan-speed.json
    "Hardware Sentry - Low Fan Speed %": assets/monitors/low-fan-speed-percent.json
    "Hardware Sentry - Low Voltage": assets/monitors/low-voltage.json
    "Hardware Sentry - Lun Multipathing": assets/monitors/lun-multipathing.json
    "Hardware Sentry - Missing Device": assets/monitors/missing-device.json
    "Hardware Sentry - Network Errors": assets/monitors/errors-network.json
    "Hardware Sentry - Power Capacity": assets/monitors/power-capacity.json
    "Hardware Sentry - Predicted Failure": assets/monitors/predicted-failure.json
    "Hardware Sentry - Status Degraded": assets/monitors/status-degraded.json
    "Hardware Sentry - Status Failed": assets/monitors/status-failed.json
    "Hardware Sentry - Tape Drive Cleaning": assets/monitors/tape-drive-cleaning.json
"author":
  "homepage": "https://sentrysoftware.com"
  "name": Sentry Software
  "sales_email": datadog@sentrysoftware.com
  "support_email": support@sentrysoftware.com
  "vendor_id": sentry-software
"categories":
- cost management
- marketplace
- network
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "sentry_software_hardware_sentry"
"integration_id": "hardware-sentry"
"integration_title": "Hardware Sentry"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "sentry_software_hardware_sentry"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": hardware_sentry.host.configured
  "product_id": hardware-sentry
  "short_description": The price of the monthly subscription is based on the number of hosts monitored with Hardware Sentry OpenTelemetry Collector. The subscription grants access to the support services provided by Sentry Desk.
  "tag": host
  "unit_label": monitored host
  "unit_price": !!int "8"
"public_title": "Hardware Sentry"
"short_description": "Hardware & sustainability metrics for 100+ systems (Cisco, Dell EMC, HPE, Hitachi, Lenovo, NetApp, NVIDIA, Pure, etc.)"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cost Management"
  - "Category::Marketplace"
  - "Category::Network"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Hardware & sustainability metrics for 100+ systems (Cisco, Dell EMC, HPE, Hitachi, Lenovo, NetApp, NVIDIA, Pure, etc.)
  "media":
  - "caption": The main Hardware Sentry dashboard provides an overview of the energy usage and carbon emissions of all data centers and server rooms. It leverages the metrics collected by Hardware Sentry OpenTelemetry Collector.
    "image_url": images/dashboard-main.png
    "media_type": image
  - "caption": "Architecture diagram: Hardware Sentry OpenTelemetry Collector runs on-prem, monitors your servers, switches and storage systems, and pushes metrics to your Datadog environment."
    "image_url": images/architecture.png
    "media_type": image
  - "caption": For each monitored host, Hardware Sentry monitors its electronic components (CPUs, memory, disks, NICs, sensors, etc.), its power consumption, and carbon emissions.
    "image_url": images/dashboard-host.png
    "media_type": image
  - "caption": For each site (data center or server room), energy and carbon emissions are estimated for 1 day, 1 month and 1 year. Recommendation of optimal temperature is made with its potential energy savings over a year.
    "image_url": images/dashboard-site.png
    "media_type": image
  - "caption": All hardware problems (disks, memory modules, NICs, power supplies, etc.) are monitored with specific monitors, with detailed messages.
    "image_url": images/events-explorer.png
    "media_type": image
  - "caption": The Hardware Sentry integration comes with a collection of recommended monitors to report hardware problems in your infrastructure.
    "image_url": images/triggered-monitors.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Hardware Sentry
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

**[Hardware Sentry][1]** is an agent specialized in the monitoring of the hardware components of any server, network switch, or storage system in your data center, packaged with a collection of dashboards and monitors for Datadog.

### Hardware monitoring

**Hardware Sentry** is a monitoring agent capable of reporting the physical health of servers, network switches, and storage systems. It collects metrics periodically to report the status of each processor, controller, disk, or power supply, the temperatures, the speed of the fans, the link status and speed of the network cards, and more.

* **Remote**: One agent to monitor hundreds of systems, through SNMP, WBEM, WMI, SSH, IPMI, REST APIs, and more.
* **Multi-platform**: 100+ platforms already supported with 250+ connectors (Cisco, Dell EMC, HP, Huawei, IBM, Lenovo, NetApp, Oracle, Pure, and more. For the full list of supported platforms, see the [Hardware Sentry documentation][2].
* **Simple**: Monitoring a system requires minimal configuration effort to specify the hostname or IP address and credentials. **Hardware Sentry** will automatically detect the available instrumentation and start the monitoring right away.
* **Normalized**: All the necessary information is reported through standardized metrics in Datadog. The same `hw.temperature` metric, for example, is used to represent the temperature in a NetApp filer, an HP BladeSystem, a Dell PowerEdge running Windows, a Cisco UCS running Linux, or any other platform. These metrics follow [OpenTelemetry's semantic conventions][3].

**Hardware Sentry** comes with predefined monitors to detect and even predict failures in processors, memory modules, disks, network cards, controllers, power supplies, fans, temperature sensors, and more.

### Energy usage and carbon footprint reports

In addition to physical health monitoring, **Hardware Sentry** also reports the energy usage of each monitored system. Combined with metrics representing the electricity cost and the carbon density, the provided dashboards report the electricity usage of your infrastructure in kWh and its carbon footprint in tons of CO2.

**100% Software**: No smart PDUs required, even for systems that are not equipped with an internal power sensor!

### ダッシュボード

This integration comes with a set of dashboards that leverage the metrics collected by **[Hardware Sentry OpenTelemetry Collector][4]**:

| Dashboard | Description |
|---|---|
| Hardware Sentry - Main | Overview of all monitored hosts, with a focus on sustainability |
| Hardware Sentry - Site | Metrics associated to one *site* (a data center or a server room) and its monitored *hosts* |
| Hardware Sentry - Host | Metrics associated to one *host* and its internal devices |

## Support

A subscription to **Hardware Sentry** through the Datadog Marketplace grants access to all services provided by [Sentry Desk][12]:

* Technical Support through [Jira Service Management][13]
* Knowledge Base
* Patches

Upon subscription, your organization will receive an invitation to manage your *Sentry Desk* account.

### Further Reading:

Additional helpful documentation, links, and articles:

- [Track your carbon footprint with Hardware Sentry’s offering in the Datadog Marketplace][14]

[1]: https://www.sentrysoftware.com/products/hardware-sentry.html
[2]: https://www.sentrysoftware.com/docs/hws-doc/latest/platform-requirements.html
[3]: https://opentelemetry.io/docs/reference/specification/metrics/semantic_conventions/hardware-metrics/
[4]: https://www.sentrysoftware.com/products/hardware-sentry-opentelemetry-collector.html
[5]: https://www.sentrysoftware.com/docs/hws-doc/latest/integration/datadog.html
[6]: https://www.sentrysoftware.com/downloads/products-for-opentelemetry.html
[7]: https://www.sentrysoftware.com/products/hardware-sentry.html
[8]: https://www.sentrysoftware.com/docs/hws-doc/latest/install.html
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[10]: https://www.sentrysoftware.com/docs/hws-doc/latest/configuration/configure-agent.html
[11]: https://www.sentrysoftware.com/docs/hws-otel-collector/latest/install.html
[12]: https://www.sentrysoftware.com/desk
[13]: https://sentrydesk.atlassian.net/servicedesk/customer/portals
[14]: https://www.datadoghq.com/blog/sustainability-monitoring-carbon-footprint-hardware-sentry-datadog/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/hardware-sentry" target="_blank">Click Here</a> to purchase this application.
