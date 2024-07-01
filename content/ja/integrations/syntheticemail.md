---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-syntheticemail"
"app_uuid": "c3b29bd1-fb32-44ed-aaf5-34d6b8d84bbb"
"assets":
  "dashboards":
    "Synthetic Email": assets/dashboards/synthetic_email.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.syntheticemail.rtt
      "metadata_path": metadata.csv
      "prefix": rapdev.syntheticemail.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10111"
    "source_type_name": Synthetic Email
  "monitors":
    "Hop-count change": assets/monitors/hop_count_change.json
    "Performance degraded": assets/monitors/performance_degraded.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "syntheticemail"
"integration_id": "rapdev-syntheticemail"
"integration_title": "Synthetic Email"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "syntheticemail"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.syntheticemail
  "product_id": syntheticemail
  "short_description": Unit price per mailbox
  "tag": mailbox
  "unit_label": Mailbox
  "unit_price": !!int "250"
"public_title": "Synthetic Email"
"short_description": "Monitor round-trip email mailbox performance from around the world"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Marketplace"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor round-trip email mailbox performance from around the world
  "media":
  - "caption": Synthetic Email Introduction
    "image_url": images/video.png
    "media_type": video
    "vimeo_id": !!int "630489712"
  - "caption": Synthetic Email and Response Times
    "image_url": images/1.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Synthetic Email
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## Overview

This integration monitors email mailboxes and measures full send-receive synthetic messages deliveries. The integration uses three geographical source locations for the synthetic email deliveries: Virginia (US), Frankfurt (EU) and Sydney (AP). The check works by sending a test email from the address `probe@synth-rapdev.io` and then waiting for a auto-reply from your mailbox back to us.  The integration measures the number of hops, round-trip-time, and the test results (pass/fail).

## Support
For support or feature requests please contact RapDev.io through the following channels: 

 - Email: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222 

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-syntheticemail" target="_blank">Click Here</a> to purchase this application.
