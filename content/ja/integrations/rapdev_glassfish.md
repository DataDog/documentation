---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-glassfish
app_uuid: 58392a75-5d53-43ad-aeb9-62129ccf086b
assets:
  dashboards:
    RapDev Glassfish Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.glassfish.up_time
      metadata_path: metadata.csv
      prefix: rapdev.glassfish.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10424
    source_type_name: RapDev Glassfish
  monitors:
    Glassfish Virtual Server State: assets/monitors/virtual_server_state.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- developer tools
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_glassfish
integration_id: rapdev-glassfish
integration_title: Glassfish
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_glassfish
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.glassfish
  product_id: glassfish
  short_description: Unit price per instance.
  tag: glassfish_instance
  unit_label: Glassfish Instance
  unit_price: 10
public_title: Glassfish
short_description: Monitor the health of your Glassfish applications and services
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitor the health of your Glassfish applications and services
  media:
  - caption: Applications Overview
    image_url: images/applications-overview.png
    media_type: image
  - caption: HTTP Service Overivew
    image_url: images/http-service-overview.png
    media_type: image
  - caption: JVM, Network, and Transaction Service Overviews
    image_url: images/jvm-network-ts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Glassfish
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
GlassFish is the Eclipse implementation of Jakarta EE (formerly the reference implementation from Oracle) and supports Jakarta REST, Jakarta CDI, Jakarta Security, Jakarta Persistence, Jakarta Transactions, Jakarta Servlet, Jakarta Faces, Jakarta Messaging, and more. This allows developers to create enterprise applications that are portable and scalable, and that integrate with legacy technologies. The Glassfish integration allows users to monitor several different modules within Glassfish, such as applications, the HTTP service, the JMS service, JVM metrics, networking, and the transaction service.


## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][6]
- Sales: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][6], and we'll build it!!*

[1]: https://docs.oracle.com/cd/E19355-01/820-1072/6ncp48v4e/index.html
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-glassfish" target="_blank">Click Here</a> to purchase this application.