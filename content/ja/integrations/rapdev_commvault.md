---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-commvault"
"app_uuid": "2d6e8413-e850-4eff-a139-170946be2ffc"
"assets":
  "dashboards":
    "Rapdev Commvault Overview": assets/dashboards/rapdev_commvault_overview.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": datadog.marketplace.rapdev.commvault
      "metadata_path": metadata.csv
      "prefix": rapdev.commvault
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10438"
    "source_type_name": Rapdev Commvault
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- cloud
- marketplace
- compliance
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_commvault"
"integration_id": "rapdev-commvault"
"integration_title": "Commvault"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_commvault"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.commvault
  "product_id": commvault
  "short_description": Monthly fee per Terrabyte
  "tag": terrabyte_count
  "unit_label": Terrabyte
  "unit_price": !!int "100"
"public_title": "Commvault"
"short_description": "Monitor your Commvault Jobs, Library statuses, Alerts and Events"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Cloud"
  - "Category::Marketplace"
  - "Category::Compliance"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Monitor your Commvault Jobs, Library statuses, Alerts and Events
  "media":
  - "caption": Commvault Overview Dashboard
    "image_url": images/full_view.png
    "media_type": image
  - "caption": Commvault Overview Dashboard environment overview section 1 of 5
    "image_url": images/overview.png
    "media_type": image
  - "caption": Commvault Overview Dashboard alerts and events overview section 2 of 5
    "image_url": images/alerts_and_events.png
    "media_type": image
  - "caption": Commvault Overview Dashboard job operations overview section 3 of 5
    "image_url": images/jobs.png
    "media_type": image
  - "caption": Commvault Overview Dashboard library operations section 4 of 5
    "image_url": images/libraries.png
    "media_type": image
  - "caption": Commvault Overview Dashboard storage pools section 5 of 5
    "image_url": images/storage_pools.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Commvault
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Commvault simplifies data protection, cyber recovery, and cyber resilience by backing up your data from various sources including databases, virtual machines, applications, and more.  

The Rapdev Commvault integration offers real-time insights into your backup environment. This integration enables you to track various metrics related to ongoing jobs, storage libraries, console alerts, and events. 

- By pulling detailed data on alerts, it keeps you informed about the nature, age, and total count of alerts, allowing prompt response to any issues. 
- The job monitoring aspect captures crucial information about each backup job, including the size of data in bytes and the duration of the job, allowing for performance optimization and trend analysis. 
- Storage library monitoring offers a granular view of your storage environment, with specifics on each library, available bytes, data backed up in the past hour, total capacity, free space, and the time of the last backup.  

The Rapdev Commvault integration pulls data from your Command Center into your Datadog account, which allows you to leverage enhanced dashboard visualizations, monitoring, and alerting capabilities in Datadog.

## Support
For support or feature requests, contact RapDev.io through the following channels:
- Support: [support@rapdev.io][4]  
- Sales: [sales@rapdev.io][5]  
- Chat: [rapdev.io][6]  
- Phone: 855-857-0222

[1]: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[2]: https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7  
[3]: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[4]: mailto:support@rapdev.io  
[5]: mailto:sales@rapdev.io  
[6]: https://www.rapdev.io/#Get-in-touch  
[7]: https://documentation.commvault.com/v11/essential/4237_web_console.html 

---
Made with ❤️ in Boston
*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-commvault" target="_blank">Click Here</a> to purchase this application.
