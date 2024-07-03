---
algolia:
  subcategory: Marketplace Integrations
app_id: shoreline-software-license
app_uuid: d1da5605-5ef5-47bc-af8d-16005945e21e
assets: {}
author:
  homepage: https://shoreline.io/
  name: Shoreline.io
  sales_email: sales@shoreline.io
  support_email: support@shoreline.io
  vendor_id: shoreline
categories:
- automation
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: shoreline_license
integration_id: shoreline-software-license
integration_title: Shoreline.io
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: shoreline_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.shoreline.shoreline
  product_id: software-license
  short_description: Per host / month. No extra cost for pods or containers
  tag: host
  unit_label: Host
  unit_price: 25
public_title: Shoreline.io
short_description: Build automations to repair triggered monitors
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Automation
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Build automations to repair triggered monitors
  media:
  - caption: Remediation dashboard
    image_url: images/remediation_dashboard.png
    media_type: image
  - caption: Example of remediation automation setup
    image_url: images/automate_remediation.png
    media_type: image
  - caption: Example of fleetwide interactive debugging and repair
    image_url: images/fleetwide_interactive_debugging_and_repair.png
    media_type: image
  - caption: Example of fleetwide linux command details
    image_url: images/fleetwide_linux_command_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Shoreline.io
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Shoreline incident automation enables DevOps and Site Reliability Engineers (SREs) to interactively **debug at scale** and quickly **build remediations** to eliminate repetitive work.

The debug and repair feature allows you to execute commands in real-time across your server farm without needing to SSH into the servers individually. You can execute anything that can be typed at the Linux command prompt such as Linux commands, shell scripts, and calls to cloud provider APIs, and turn these debug sessions into automations connected to Datadog monitors.

The Shoreline app automatically executes the automation when the monitor is triggered, significantly reducing Mean Time to Repair (MTTR) and manual work.

Shoreline helps everyone on call be as good as your best SRE. Shoreline arms your on-call team with debugging tools and approved remediation actions, helping you fix incidents faster with fewer escalations and ensuring that incidents are fixed correctly the first time with fewer mistakes.

To get started, set up a trial account on [Shoreline][1].

## Support

For support and feature requests, contact Shoreline through the following channel:

- Email: [support@shoreline.io][2]

### Further Reading

Additional helpful documentation, links, and articles:

- [Debug issues and automate remediation with Shoreline and Datadog][11]
- [Shoreline Documentation][9]

[1]: https://shoreline.io/datadog?source=DatadogMarketplace
[2]: mailto:support@shoreline.io
[3]: https://docs.shoreline.io/installation
[4]: https://docs.shoreline.io/integrations/datadog#install-the-shoreline-integration
[5]: https://docs.shoreline.io/installation/kubernetes
[6]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[7]: https://docs.shoreline.io/installation/virtual-machines
[8]: https://docs.shoreline.io/integrations/datadog#install-the-shoreline-integration
[9]: https://docs.shoreline.io/
[10]: https://app.datadoghq.com/account/settings#integrations/shoreline-integration
[11]: https://www.datadoghq.com/blog/shoreline-io-marketplace-datadog/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/shoreline-software-license" target="_blank">Click Here</a> to purchase this application.