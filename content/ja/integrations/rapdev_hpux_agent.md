---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-hpux-agent"
"app_uuid": "5e611b0d-a099-4823-a4ba-e42b1012b3b5"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": datadog.marketplace.rapdev.hpux_agent
      "metadata_path": metadata.csv
      "prefix": rapdev.hpux_agent.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10185"
    "source_type_name": RapDev HP-UX Agent
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_hpux_agent"
"integration_id": "rapdev-hpux-agent"
"integration_title": "HP-UX Agent"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_hpux_agent"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.hpux_agent
  "product_id": hpux-agent
  "short_description": Unit price per host
  "tag": host
  "unit_label": HP-UX Agent
  "unit_price": !!int "40"
"public_title": "HP-UX Agent"
"short_description": "System agent providing metrics for HP-UX 11.31 for hppa and itanium"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": System agent providing metrics for HP-UX 11.31 for hppa and itanium
  "media":
  - "caption": Infrastructure List
    "image_url": images/1.png
    "media_type": image
  - "caption": Host Metrics
    "image_url": images/2.png
    "media_type": image
  - "caption": Logs
    "image_url": images/3.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": HP-UX Agent
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## Overview

The HP-UX Agent allows you to collect and report on system metrics within Datadog. The integration supports HP-UX 11.31 on both PA-RISC and Itanium architectures. The HP-UX Agent uses the default HP-UX Perl system distribution and does not require additional library dependencies, simplifying installation and compatibility.

The HP-UX Agent provides the host metadata required to support the Datadog Infrastructure List, enabling your organization to work with HP-UX host systems similar to other supported Datadog host operating systems.

The HP-UX Agent uses the same URLs and ports as the native agents. The HP-UX Agent currently supports core infrastructure metrics, process checks, and log tails. It does not support custom Agent checks, integrations, or service checks.

## Support

For support or feature requests, contact RapDev.io through the following channels: 

 - Email: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222 

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-hpux-agent" target="_blank">Click Here</a> to purchase this application.
