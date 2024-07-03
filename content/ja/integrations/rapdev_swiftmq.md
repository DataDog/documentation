---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-swiftmq
app_uuid: 93738439-2cde-4718-a7f6-004f2da0177e
assets:
  dashboards:
    RapDev SwiftMQ Summary: assets/dashboards/summary.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.swiftmq.env
      metadata_path: metadata.csv
      prefix: rapdev.swiftmq
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10378
    source_type_name: RapDev SwiftMQ
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- message queues
- marketplace
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_swiftmq
integration_id: rapdev-swiftmq
integration_title: SwiftMQ
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_swiftmq
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.swiftmq
  product_id: swiftmq
  short_description: Unit price per instance.
  tag: swiftmq_endpoint
  unit_label: SwiftMQ Instance
  unit_price: 10
public_title: SwiftMQ
short_description: Monitor the health and activity of your SwiftMQ instances
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Message Queues
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor the health and activity of your SwiftMQ instances
  media:
  - caption: SwiftMQ Summary Dashboard (1/3)
    image_url: images/swiftmq_dash_one.png
    media_type: image
  - caption: SwiftMQ Summary Dashboard (2/3)
    image_url: images/swiftmq_dash_two.png
    media_type: image
  - caption: SwiftMQ Summary Dashboard (3/3)
    image_url: images/swiftmq_dash_three.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SwiftMQ
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## Overview

[SwiftMQ][1] is an enterprise messaging, realtime streaming analytics, and microservice platform. It supports business applications through JMS and AMQP 1.0 standard protocols, as well as MQTT 3.1 or 3.1.1 for IoT clients. It is optimized for highly scalable architectures, with built-in dynamically routing that allows sending from any source to destination transparently. 


This integration reports metrics about the health and operation of [SwiftMQ][1] using [SwiftMQ Prometheus Monitoring App][6] in [Flow Director][5].

## Support
For support or feature requests, contact RapDev.io through the following channels:
- Support: [support@rapdev.io][4]
- Sales: [sales@rapdev.io][3]
- Chat: [rapdev.io][2]
- Phone: 855-857-0222

---

Made with ❤️ in Boston
*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][4], and we'll build it!!*


[1]: https://www.swiftmq.com/
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: mailto:support@rapdev.io
[5]: https://www.flowdirector.io/start/
[6]: https://www.flowdirector.io/apps/prometheus/swiftmqprometheus/
[7]: https://help.flowdirector.io/spma/install-the-app
[8]: https://help.flowdirector.io/spma/quick-setup
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-swiftmq" target="_blank">Click Here</a> to purchase this application.