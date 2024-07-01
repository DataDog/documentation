---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-sophos"
"app_uuid": "86b68ae7-ba52-4160-bbf5-e1455fafa677"
"assets":
  "dashboards":
    "RapDev Sophos Dashboard": assets/dashboards/rapdev_sophos_dashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.sophos.endpoint.registered
      "metadata_path": metadata.csv
      "prefix": rapdev.sophos.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10192"
    "source_type_name": RapDev Sophos
  "logs": {}
  "monitors":
    "[RapDev Sophos] Managed Endpoint Health has Changed": assets/monitors/sophos_endpoint_health.json
    "[RapDev Sophos] Sophos Service on Managed Endpoint is Stopped": assets/monitors/sophos_service_running.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_sophos"
"integration_id": "rapdev-sophos"
"integration_title": "Sophos"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_sophos"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.sophos
  "product_id": sophos
  "short_description": Unit price per endpoint
  "tag": endpoint_name
  "unit_label": Registered Endpoint
  "unit_price": !!int "1"
"public_title": "Sophos"
"short_description": "Monitor the health of your Sophos managed endpoints"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::Security"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor the health of your Sophos managed endpoints
  "media":
  - "caption": Sophos Dashboard
    "image_url": images/dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Sophos
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

The Sophos Integration monitors the overall health of your Sophos managed endpoints to make sure your managed devices are in good health. The integration comes pre-built with 1 dashboard that provides a broad overview of several metrics that can be used to monitor the health of your devices. The Sophos Integration also comes with 2 monitors that can be used to alert when a device is no longer in good health, or if one of the Sophos services on the device stops.

### Monitors
1. Managed Endpoint Health has Changed
2. Sophos Service on Managed Endpoint is Stopped

### Dashboards
1. RapDev Sophos Dashboard

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/rapdev_sophos/datadog_checks/rapdev_sophos/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-sophos" target="_blank">Click Here</a> to purchase this application.
