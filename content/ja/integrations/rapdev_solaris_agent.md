---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-solaris-agent"
"app_uuid": "a994f2cf-1f77-4e74-803d-fb833455e224"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": datadog.marketplace.rapdev.solaris_agent
      "metadata_path": metadata.csv
      "prefix": rapdev.solaris_agent.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10135"
    "source_type_name": RapDev Solaris Agent
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- oracle
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_solaris_agent"
"integration_id": "rapdev-solaris-agent"
"integration_title": "Solaris Agent"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_solaris_agent"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.solaris_agent
  "product_id": solaris-agent
  "short_description": Unit price per host
  "tag": host
  "unit_label": Solaris Agent
  "unit_price": !!int "40"
"public_title": "Solaris Agent"
"short_description": "Agent providing metrics for Solaris 10 and 11 on sparc and i86pc"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::Oracle"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Agent providing metrics for Solaris 10 and 11 on sparc and i86pc
  "media":
  - "caption": Infrastructure List
    "image_url": images/1.png
    "media_type": image
  - "caption": Host Infrastructure Details
    "image_url": images/2.png
    "media_type": image
  - "caption": Host Metrics
    "image_url": images/3.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Solaris Agent
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## Overview

The Solaris Agent allows you to collect and report on Solaris system metrics within Datadog. The integration supports both Solaris 10 and 11, as well as SPARC and i86pc architectures. The Solaris Agent uses the default Solaris Perl system distribution and does not require additional library dependencies, simplifying installation and compatibility.

The Solaris Agent provides the host metadata required to support the Datadog Infrastructure List, enabling your organization to work with Solaris host systems similar to other supported Datadog host operating systems.

The Solaris Agent uses the same URLs and ports as the native agents. The Solaris Agent supports core infrastructure metrics, process checks, and log tails. It does not support integrations or service checks. 

## Support

For support or feature requests, contact RapDev.io through the following channels: 

 - Email: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222 

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-solaris-agent" target="_blank">Click Here</a> to purchase this application.
