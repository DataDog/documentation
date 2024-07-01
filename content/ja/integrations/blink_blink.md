---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "blink-blink"
"app_uuid": "eaa3426f-383b-44b4-a7f9-ff9706ed37f8"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10327"
    "source_type_name": Blink_blink
"author":
  "homepage": "https://blinkops.com"
  "name": Blink
  "sales_email": support@blinkops.com
  "support_email": support@blinkops.com
  "vendor_id": blink-subscription
"categories":
- orchestration
- notifications
- automation
- cloud
- security
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "blink_blink"
"integration_id": "blink-blink"
"integration_title": "Blink"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "blink_blink"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": blink
  "short_description": Up to 5000 actions and 10 users.
  "unit_price": !!int "500"
"public_title": "Blink"
"short_description": "Blink is a no-code automation platform for security and infrastructure"
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
  - "Category::Orchestration"
  - "Category::Notifications"
  - "Category::Automation"
  - "Category::Cloud"
  - "Category::Security"
  - "Category::Marketplace"
  - "Offering::Software License"
  "configuration": "README.md#Setup"
  "description": Blink is a no-code automation platform for security and infrastructure
  "media":
  - "caption": Automatically create and update Datadog incidents using interactive Blink workflows.
    "image_url": images/incident.png
    "media_type": image
  - "caption": Quickly reference a list of all active Datadog incidents from within your Blink automation.
    "image_url": images/list-incidents.png
    "media_type": image
  - "caption": Connect the Blink integration to begin creating automations that take action in response to Datadog incidents.
    "image_url": images/connection-creation.png
    "media_type": image
  - "caption": Use scheduled Blink automations to automatically create Datadog incidents for regular events.
    "image_url": images/new-incident.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Blink
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[Blink][1] is a low-code/no-code (LNCN) platform that enables automated incident response, cloud-native operations, and security operations workflows. Blink transforms manual tasks into interactive automations backed by the security and reliability of a cloud-native platform. Every script or ticket becomes a fully-managed automation. 

The user interface and [automation library][2] come with 5,000 cloud-native workflows that make it easy to create new automations. Blink helps you achieve better cloud efficiency and more competitive SLA's, with fewer operational bottlenecks.

Visit our [out-of-the-box integration][6], which allows you to:

- Trigger event-based Blink automations using Datadog incidents
- Create and update Datadog incidents automatically from within Blink
- View incidents or events from the Datadog Events Explorer in Blink
- Automatically enrich and remediate Datadog incidents using Blink automations

For more information about Blink, see the [Blink documentation][3].

## Support

Need help? Contact [Datadog support][3].

[1]: https://blinkops.com/
[2]: https://library.blinkops.com/
[3]: https://www.docs.blinkops.com/
[4]: https://www.docs.blinkops.com/docs/Integrations/Datadog/
[5]: https://docs.datadoghq.com/help/
[6]: https://app.datadoghq.com/integrations/blink
[7]: https://app.blinkops.com/signup
[8]: mailto:support@blinkops.com

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/blink-blink" target="_blank">Click Here</a> to purchase this application.
