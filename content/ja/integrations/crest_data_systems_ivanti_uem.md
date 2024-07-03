---
algolia:
  subcategory: Marketplace Integrations
app_id: crest-data-systems-ivanti-uem
app_uuid: dcebef22-7079-4ba8-b741-ad90fe0b9138
assets:
  dashboards:
    Ivanti UEM (Cloud) - Device: assets/dashboards/crest_data_systems_ivanti_uem_cloud_device.json
    Ivanti UEM (Cloud) - User: assets/dashboards/crest_data_systems_ivanti_uem_cloud_user.json
    Ivanti UEM (On-Prem) - Device Details: assets/dashboards/crest_data_systems_ivanti_uem_onprem_device_details.json
    Ivanti UEM (On-Prem) - Overview: assets/dashboards/crest_data_systems_ivanti_uem_onprem_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.crest_data_systems.ivanti.uem
      metadata_path: metadata.csv
      prefix: crest_data_systems
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10365
    source_type_name: crest_data_systems_ivanti_uem
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- automation
- event management
- marketplace
- mobile
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_ivanti_uem
integration_id: crest-data-systems-ivanti-uem
integration_title: Ivanti UEM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_ivanti_uem
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.ivanti.uem
  product_id: ivanti-uem
  short_description: Per Devices(Endpoints) per month.
  tag: device
  unit_label: Ivanti Device
  unit_price: 1.0
public_title: Ivanti UEM
short_description: Monitor the performance and usage of Ivanti UEM devices
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
  - Category::Automation
  - Category::Event Management
  - Category::Marketplace
  - Category::Mobile
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitor the performance and usage of Ivanti UEM devices
  media:
  - caption: Ivanti UEM (On-Prem) - Overview
    image_url: images/ivanti-uem-on-prem-overview.png
    media_type: image
  - caption: Ivanti UEM (On-Prem) - Device Details
    image_url: images/ivanti-uem-on-prem-device-details.png
    media_type: image
  - caption: Ivanti UEM (Cloud) - Device
    image_url: images/ivanti-uem-cloud-device.png
    media_type: image
  - caption: Ivanti UEM (Device) - User
    image_url: images/ivanti-uem-cloud-user.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ivanti UEM
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[Ivanti UEM][7] is a comprehensive Unified Endpoint Management (UEM) solution developed by Ivanti. UEM refers to the management of all types of endpoints, such as desktops, laptops, mobile devices, and virtual machines, from a single platform.

Ivanti UEM is designed to simplify and streamline the management of endpoints in an organization. It provides IT administrators with tools and features to centrally manage user profiles, applications, data, and security policies across various devices and operating systems.

This integration monitors enrolled `Devices` of Ivanti UEM (On-Prem), also known as Ivanti EPM, as well as `Devices` and `Users` of Ivanti UEM (Cloud), also known as Ivanti MDM.

## Support

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

-   Support Email: [datadog.integrations@crestdata.ai][5]
-   Sales Email: [datadog-sales@crestdata.ai][6]
-   Website: [crestdata.ai][3]
-   FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.ivanti.com/solutions/unified-endpoint-management
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Ivanti_UEM.pdf
[9]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[10]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-ivanti-uem" target="_blank">Click Here</a> to purchase this application.