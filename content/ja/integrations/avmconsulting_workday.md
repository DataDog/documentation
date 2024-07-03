---
algolia:
  subcategory: Marketplace Integrations
app_id: avmconsulting-workday
app_uuid: 72aa287e-21c7-473a-9efd-523d9687f7f1
assets:
  dashboards:
    AVM Consulting Workday Integrations Trends: assets/dashboards/workday_integrations_trends.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: avmconsulting.workday.total_jobs
      metadata_path: metadata.csv
      prefix: avmconsulting.workday.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10251
    source_type_name: AVM Consulting Workday
  monitors:
    AVM Consulting Workday Connection Status: assets/monitors/workday_connect.json
    AVM Consulting Workday Integration Status: assets/monitors/workday_integrations_monitor.json
author:
  homepage: https://avmconsulting.net/
  name: AVMConsulting
  sales_email: integrations@avmconsulting.net
  support_email: integrations@avmconsulting.net
  vendor_id: avmconsulting
categories:
- log collection
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avmconsulting_workday
integration_id: avmconsulting-workday
integration_title: Workday
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avmconsulting_workday
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.avmconsulting.workday
  product_id: workday
  short_description: Workday pricing per job
  tag: job_id
  unit_label: Workday Job
  unit_price: 1
public_title: Workday
short_description: Provides observability into the status of Workday integrations
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Provides observability into the status of Workday integrations
  media:
  - caption: Workday Integrations Summary
    image_url: images/Workday_integration_trends.png
    media_type: image
  - caption: Workday Integrations Summary
    image_url: images/Workday_integration_trends_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Workday
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

This Workday integration monitors the state of your integrations in Workday, offering rich metrics regarding job executions, including total job executions, failure job executions, and the duration of each job execution. This integration also retrieves job execution logs and provides monitors that alert on the state of each integration.

### モニター

This integration includes the following recommended monitors:

1. Connect to Workday, which monitors your connection to Workday.
2. Workday Integration Status, a multi-monitor that is grouped by integrations and checks the last Workday integration event state.

### ダッシュボード

This integration includes an out-of-the-box dashboard named **Workday Integrations Trends** that provides a visual summary of Workday job executions, as well as the state of the monitors configured for each Workday integration.

### Log Collection

This integration uses the Workday API to collect logs for integration executions and submit those logs to Datadog through the Datadog REST API. Execution-related tags are assigned dynamically to those logs.

## Support

For support or feature requests, contact AVM Consulting through the following channels: 

 - Email: [integrations@avmconsulting.net][6] 
 - Phone: 855-AVM-0555 

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Workday with AVM Consulting’s integration in the Datadog Marketplace][5]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux
[5]: https://www.datadoghq.com/blog/workday-monitoring-with-avm-and-datadog/
[6]: mailto:integrations@avmconsulting.net

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/avmconsulting-workday" target="_blank">Click Here</a> to purchase this application.