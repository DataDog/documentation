---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "kitepipe-atomwatch"
"app_uuid": "c9c6ace5-9793-48da-a4be-7bbd4c3e9b06"
"assets":
  "dashboards":
    "AtomWatch Boomi Cluster Monitoring": assets/dashboards/boomi_cluster_monitoring2.json
    "AtomWatch Boomi Compute Monitoring": assets/dashboards/boomi_compute_monitoring2.json
    "AtomWatch Boomi Workload Monitoring": assets/dashboards/boomi_workload_monitoring2.json
    "AtomWatch Overview": assets/dashboards/atomwatch_overview.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": kitepipe.atomwatch.integration_completed
      "metadata_path": metadata.csv
      "prefix": kitepipe.atomwatch.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10355"
    "source_type_name": AtomWatch
  "monitors":
    "AtomWatch is Down": assets/monitors/atomwatch_down.json
    "AtomWatch: Boomi Cluster Node \"View File\" is Missing": assets/monitors/cluster_view_file_missing.json
    "AtomWatch: Boomi Cluster Node \"View File\" is Too Old": assets/monitors/cluster_view_file_too_old.json
    "AtomWatch: Boomi Cluster Problem": assets/monitors/cluster_view_file_problem.json
    "AtomWatch: Execution Duration Anomaly": assets/monitors/execution_duration_anomaly.json
    "AtomWatch: Failure calling Boomi Platform API": assets/monitors/failed_boomi_platform_api_call.json
    "AtomWatch: Infrastructure - API Gateway Node CPU Usage High": assets/monitors/api_gw_node_cpu.json
    "AtomWatch: Infrastructure - API Gateway Node Disk Usage High": assets/monitors/api_gw_node_disk.json
    "AtomWatch: Infrastructure - API Gateway Node Memory Usage High": assets/monitors/api_gw_node_ram.json
    "AtomWatch: Infrastructure - Molecule Node CPU Usage High": assets/monitors/molecule_node_cpu.json
    "AtomWatch: Infrastructure - Molecule Node Disk Usage High": assets/monitors/molecule_node_disk.json
    "AtomWatch: Infrastructure - Molecule Node Memory Usage High": assets/monitors/molecule_node_ram.json
    "AtomWatch: Runtime Online Status": assets/monitors/boomi_online_status.json
"author":
  "homepage": "https://www.kitepipe.com"
  "name": Kitepipe
  "sales_email": AtomWatch.Sales@kitepipe.com
  "support_email": AtomWatch.Support@kitepipe.com
  "vendor_id": kitepipe
"categories":
- alerting
- aws
- event management
- log collection
- marketplace
- notifications
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "kitepipe_atomwatch"
"integration_id": "kitepipe-atomwatch"
"integration_title": "Kitepipe AtomWatch"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "kitepipe_atomwatch"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.kitepipe.atomwatch
  "product_id": atomwatch
  "short_description": Unit price per Boomi Atom or Molecule Node
  "tag": billing_key
  "unit_label": Boomi Atom or Molecule Node
  "unit_price": !!int "200"
"public_title": "Kitepipe AtomWatch"
"short_description": "Monitor Boomi processes and infrastructure"
"supported_os":
- linux
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Category::Alerting"
  - "Category::AWS"
  - "Category::Event Management"
  - "Category::Log Collection"
  - "Category::Marketplace"
  - "Category::Notifications"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  - "Submitted Data Type::Events"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Monitor Boomi processes and infrastructure
  "media":
  - "caption": Enhanced Process Reporting lets you look back more than 30 days and filter by more fields, with wildcards.
    "image_url": images/enhanced_process_reporting.png
    "media_type": image
  - "caption": See long-running processes at a glance and receive alerts with anomaly detection.
    "image_url": images/execution_duration_anomalies.png
    "media_type": image
  - "caption": Extensive infrastructure monitoring including CPU, RAM, Disk, Network.
    "image_url": images/infrastructure_monitoring.png
    "media_type": image
  - "caption": Cluster monitoring that exceeds Boomi's published recommendations.
    "image_url": images/cluster_monitoring.png
    "media_type": image
  - "caption": Toplists and graphs of errored Boomi processes.
    "image_url": images/error_monitoring.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://atomwatch.refined.site/space/CS/11108353"
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/"
  "support": "README.md#Support"
  "title": Kitepipe AtomWatch
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

AtomWatch by Kitepipe is an Agent-based integration that collects metrics from Boomi processes, cluster nodes, and related infrastructure to inform both Datadog and Boomi customers about the health of the integration.

AtomWatch version 1.0 contains 4 dashboards, 13 custom metrics, and 13 monitors that report on Boomi execution statistics, cluster status, and infrastructure health. These metrics are available to Datadog and Boomi customers for extended time-trending analysis (over the standard of 30 days for Boomi Process Reporting availability).

Datadog customers who purchase AtomWatch must manage the Boomi Java Runtime in either an Atom or Molecule configuration. Kitepipe includes a one hour set-up and configuration session with the initial 14 Day Free Trial.

### About Kitepipe

Kitepipe is a Boomi Platinum Implementation Partner, and is the premier Boomi integration development team in North America. Kitepipe was founded in 2011 in response to the need for a Boomi-focused services team that could deliver all the promises of this powerful integration platform. 

Today, the Kitepipe team of certified Boomi on-shore developers help dozens of Boomi customers quickly achieve business value with the industry-leading Boomi integration platform.

The Datadog service AtomWatch is a new offering from Kitepipe with a focus on Boomi managed services in AWS. Kitepipe is the leader in a number of integration areas, verticals, and domains, including AWS migrations of Boomi processes, AWS managed Boomi, Biotech vertical solutions built on Boomi, NetSuite, SAP, Coupa, Workday, and HRIS, Data Mart/BI, and more endpoints.

### Log Collection

This integration makes API calls to the Boomi Platform on your behalf, retrieving execution records and sending them to Datadog as logs.

### Events

This integration retrieves AuditLog records from the Boomi API, and sends them to Datadog as events. The events are visible in filtered form in the Boomi Workload Monitoring Dashboard or in the [Events Explorer][1]. You can build your own monitors to inspect the unfiltered AuditLog records.

### Metrics

This integration submits metrics. You can explore a list of metrics in the **Data Collected** tab. 

## Support

For support or feature requests, reach out to AtomWatch through the following channel:

- Email: [AtomWatch.Support@kitepipe.com][11]

Kitepipe support hours for AtomWatch are designated during the business hours of 9AM to 3PM across US and Canadian time zones. AtomWatch troubleshooting requests will be answered within 24 to 48 hours from the notification receipt to the AtomWatch email alias.

For best response results, include the customer name, Boomi configuration, and a brief description of the event or troubleshooting question. Enhanced support programs are available from Kitepipe upon request.

### Further Reading

Additional helpful documentation, links, and articles:

- [AtomWatch Documentation][9]
- [Monitor your Boomi integrations with Kitepipe's offering in the Datadog Marketplace][12]

[1]: https://app.datadoghq.com/event/explorer
[2]: https://help.boomi.com/bundle/atomsphere_platform/page/int-Adding_API_tokens.html
[3]: https://help.boomi.com/bundle/integration/page/t-atm-Attaching_a_role_to_an_Environment.html
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/account/settings#agent/overview
[6]: https://help.boomi.com/bundle/integration/page/r-atm-Startup_Properties_panel.html
[7]: https://help.boomi.com/bundle/integration/page/r-atm-Cluster_Status_panel.html
[8]: https://help.boomi.com/bundle/api_management/page/api-API_Gateway_settings.html
[9]: https://atomwatch.refined.site/space/CS/11108353
[10]: https://www.kitepipe.com/
[11]: mailto:AtomWatch.Support@kitepipe.com
[12]: https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/kitepipe-atomwatch" target="_blank">Click Here</a> to purchase this application.
