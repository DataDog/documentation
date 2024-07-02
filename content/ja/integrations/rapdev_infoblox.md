---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-infoblox"
"app_uuid": "7712bdf0-a2eb-487c-8d1e-595c74b99e47"
"assets":
  "dashboards":
    "Infoblox Overview Dashboard": assets/dashboards/infoblox_overview_dashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.infoblox.utilization
      "metadata_path": metadata.csv
      "prefix": rapdev.infoblox.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10432"
    "source_type_name": RapDev Infoblox
  "monitors":
    "Infoblox DHCP Monitor": assets/monitors/infoblox_dhcp_monitor.json
    "Infoblox DNS Monitor": assets/monitors/infoblox_dns_monitor.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_infoblox"
"integration_id": "rapdev-infoblox"
"integration_title": "Infoblox"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_infoblox"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": infoblox
  "short_description": Flat fee for this integration
  "unit_price": !!int "100"
"public_title": "Infoblox"
"short_description": "Monitor the health of your Infoblox nodes and IPAM system as metrics"
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
  "description": Monitor the health of your Infoblox nodes and IPAM system as metrics
  "media":
  - "caption": RapDev Infoblox Overview Dashboard
    "image_url": images/infoblox_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Infoblox
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Infoblox provides cloud-first networking and security solutions. They focus on core network services like DNS, DHCP, and IP address management (IPAM). Their solutions help automate and secure these critical networking functions.

Network Identity Operating System (NIOS) is the operating system that powers Infoblox core network services. NIOS is the basis for Next Level Networking and ensures non-stop operation of network infrastructure. NIOS automates the error-prone and time-consuming manual tasks associated with deploying and managing DNS, DHCP, and IP address management (IPAM) required for continuous network availability and business uptime.

With this integration, monitor Infoblox node health and IPAM performance by reporting metrics and service checks on the summary reports that Infoblox produces.

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][6]
- Sales: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][6], and we'll build it!*

[1]: https://insights.infoblox.com/resources-deployment-guides/infoblox-deployment-infoblox-rest-api
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-infoblox" target="_blank">Click Here</a> to purchase this application.
