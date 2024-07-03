---
algolia:
  subcategory: Marketplace Integrations
app_id: iocs-dmi
app_uuid: d546c16a-7623-42dd-8158-c98bb9656d81
assets:
  dashboards:
    'IO Connect Services Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Services Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Services Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Services Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Services Operations: RTF Infrastructure': assets/dashboards/rtf_infrastructure.json
    'IO Connect Services Operations: RTF Resource Allocation and Usage': assets/dashboards/rtf_resource_allocation.json
    'IO Connect Services Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
      metadata_path: metadata.csv
      prefix: ioconnect.mulesoft.anypoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10390703
    source_type_name: IO_Connect_DMI
  monitors:
    Servers status: assets/monitors/server_disconnected_monitor.json
    '[CloudHub] Apps status': assets/monitors/cloudhub_app_stopped_monitor.json
    '[CloudHub] CPU load': assets/monitors/cloudhub_cpu_load_monitor.json
    '[CloudHub] Memory usage': assets/monitors/cloudhub_memory_usage_monitor.json
    '[CloudHub] Overload queue': assets/monitors/cloudhub_queue_overload_monitor.json
    '[On-Prem] Apps errors': assets/monitors/onpremise_app_error_monitor.json
    '[On-Prem] Apps status': assets/monitors/onpremise_app_stopped_monitor.json
    '[On-Prem] CPU load': assets/monitors/onpremise_cpu_load_monitor.json
    '[On-Prem] Memory usage': assets/monitors/onpremise_memory_usage_monitor.json
    '[RTF] App Status Pending': assets/monitors/rtf_application_status_pending.json
    '[RTF] App Status Stopped': assets/monitors/rtf_applications_has_been_stopped.json
    '[RTF] CPU Total Usage': assets/monitors/rtf_cpu_total_usage.json
    '[RTF] Memory Total Usage': assets/monitors/rtf_memory_usage.json
author:
  homepage: https://www.ioconnectservices.com/
  name: IO Connect Services
  sales_email: dmi@ioconnectservices.com
  support_email: support_ddp@ioconnectservices.com
  vendor_id: ioconnect
categories:
- cloud
- marketplace
- network
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dmi
integration_id: iocs-dmi
integration_title: Mule®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: iocs_dmi
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.ioconnect.iocs_dmi
  product_id: dmi
  short_description: Unit Price per Production and Sandbox vCore
  tag: vcoreid
  unit_label: Production and Sandbox vCore
  unit_price: 35
public_title: Mule®
short_description: Collect metrics from MuleSoft products and upload them into Datadog.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Collect metrics from MuleSoft products and upload them into Datadog.
  media:
  - caption: 'Operations: APIs dashboard'
    image_url: images/dmi_ops_apis.png
    media_type: image
  - caption: 'Operations: Infrastructure dashboard'
    image_url: images/dmi_ops_infra.png
    media_type: image
  - caption: 'Operations: Resources allocation and usage dashboard'
    image_url: images/dmi_ops_allocation.png
    media_type: image
  - caption: 'Development: Optimizations dashboard'
    image_url: images/dmi_dev_optimization.png
    media_type: image
  - caption: 'Executives: Cost optimization dashboard'
    image_url: images/dmi_exec_cost_optimization.png
    media_type: image
  - caption: Datadog Connector for Mule 4
    image_url: images/dmi_mule_connector.png
    media_type: image
  - caption: Datadog APM
    image_url: images/dmi_apm_traces.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mule®
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[IO Connect Services][10] is a company specializing in Information Technology Consultancy Services. Our practices are Cloud Technologies, Systems Integration, Big Data, Cybersecurity, and Software Engineering. We provide services in all North America, Europe, and Latin America. Our headquarters are located in the NYC metropolitan area and we also have offices in Guadalajara, Mexico and Madrid, Spain.

The Datadog Mule® Integration is an Agent-based integration that collects metrics from MuleSoft products and uploads them into Datadog. 

{{< img src="marketplace/iocs_dmi/images/dmi_bundle.png" alt="Datadog Mule® Integration Bundle" >}}


You can collect the following metrics from MuleSoft products:

- Mule runtime for CloudHub, Runtime Fabric, and on-premise standalone servers 
- Anypoint Runtime Fabric
- Anypoint API Manager and API Analytics
- Anypoint Exchange 
- Anypoint Access Management 
- Object Store v2  

You can use these metrics to take advantage of Datadog's out-of-the-box dashboards and monitors, or you can create your own visualizations.

### **The observability you need for your Mule applications**

#### Operations (_Infrastructure, APIs, Alerts and Resource Allocation Dashboards_) 

- Monitor the health of your Mule servers, applications, APIs, and other IT infrastructure 
- Receive and visualize alerts about your Mule infrastructure 
- Gain insights about your Anypoint Platform resources allocation of your organization 

{{< img src="marketplace/iocs_dmi/images/dmi_ops_infra.png" alt="Operations: Infrastructure dashboard" >}}

{{< img src="marketplace/iocs_dmi/images/dmi_ops_apis.png" alt="Operations: APIs dashboard" >}}

{{< img src="marketplace/iocs_dmi/images/dmi_ops_allocation.png" alt="Operations: Resources allocation and usage dashboard" >}}

#### Development (_Optimization Dashboard_) 

- Quickly identify memory, CPU, and network issues in your Mule applications 
- Find bottlenecks in your Mule applications to optimize performance 
- Instrument your Mule applications with our Datadog Connector for Mule 4 for troubleshooting purposes 

{{< img src="marketplace/iocs_dmi/images/dmi_dev_optimization.png" alt="Development: Optimizations dashboard" >}}

#### Executive (_Cost-optimization and Downtime Dashboard_) 

- Analyze and forecast your ROI based on used and unused resources 
- Get visibility of the system uptime of your Mule investment 

{{< img src="marketplace/iocs_dmi/images/dmi_exec_cost_optimization.png" alt="Executives: Cost optimization dashboard" >}}


### **Instrument your Mule applications with our Datadog Mule 4 Connector**

{{< img src="marketplace/iocs_dmi/images/dmi_mule_connector.png" alt="Datadog Connector for Mule 4" >}}

Use the Datadog Connector for Mule 4 with Datadog APM tracing to gain visibility using the out-of-the-box performance dashboards.

{{< img src="marketplace/iocs_dmi/images/dmi_apm_traces.png" alt="Datadog APM" >}}

Measure the performance of the operations in your flows as granular as needed using spans.

Also, correlate the logs generated within a transaction in a single trace to narrow down any performance optimization or troubleshooting scope.

### **Troubleshooting**

Need help? Contact [support_ddp@ioconnectservices.com][9].

## 収集データ

### メトリクス
{{< get-metrics-from-git "iocs_dmi" >}}

### イベント

The Datadog Mule® Integration does not include any events.

## Support

For support or feature requests, contact IO Connect Services Support through the following channels:

- Email: [support_ddp@ioconnectservices.com][9]


[1]: https://www.ioconnectservices.com
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/datadog_checks/iocs_dmi/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/metadata.csv
[7]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux
[9]: mailto:support_ddp@ioconnectservices.com
[10]: https://www.ioconnectservices.com
[11]: https://app.datadoghq.com/account/settings#agent/overview
[12]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/service_checks.json

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/iocs-dmi" target="_blank">Click Here</a> to purchase this application.