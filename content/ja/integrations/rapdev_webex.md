---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-webex
app_uuid: f05f455f-3793-408c-8a8d-7a19a4d3b844
assets:
  dashboards:
    Rapdev Webex Dashboard: assets/dashboards/dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.webex.meetings
      metadata_path: metadata.csv
      prefix: rapdev.webex.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6643593
    source_type_name: RapDev Webex
  monitors:
    RapDev Webex Monitor: assets/monitors/monitor.json
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- collaboration
- event management
- marketplace
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_webex
integration_id: rapdev-webex
integration_title: Webex
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_webex
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.webex
  product_id: webex
  short_description: Unit price per active user
  tag: display_name
  unit_label: Active User
  unit_price: 1
public_title: Webex
short_description: Visualize Webex licensing, meeting, and participant details as
  metrics
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
  - Category::Collaboration
  - Category::Event Management
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Visualize Webex licensing, meeting, and participant details as metrics
  media:
  - caption: RapDev Webex Overview Dashboard
    image_url: images/dashboard_example.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Webex
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Webex, by Cisco, is a web and video conferencing application. The Webex suite comprises of applications such as Webex Meetings, Webex Teams, and Webex Devices.

The Webex integration reports meetings, participants, licences, people, locations, devices,
workspaces, and groups within your organization. Insights collected include the following:
- The number of currently active meetings by meeting host
- See the name and number of participants in each meeting
- Alert on licence utilization and Webex devices
- Debug issues with invites pending or login disabled on peoples
- Visualize geographic Webex locations

Note: The Webex integration does not currently support call quality functions because the scope required to pull this information is not supported.


## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][4]
- Sales: [sales@rapdev.io][1]
- Chat: [rapdev.io][5]
- Phone: 855-857-0222
---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][4], and we'll build it!!*

[1]: mailto:sales@rapdev.io
[2]: https://developer.webex.com/docs/integrations#scopes
[3]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: mailto:support@rapdev.io
[5]: https://www.rapdev.io/#Get-in-touch

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-webex" target="_blank">Click Here</a> to purchase this application.