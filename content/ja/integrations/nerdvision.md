---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "nerdvision"
"app_uuid": "dace6217-8e5b-4b96-ae65-b0b58d44cc3e"
"assets":
  "dashboards":
    "NerdVision Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": nerdvision.clients
      "metadata_path": metadata.csv
      "prefix": nerdvision.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10140"
    "source_type_name": NerdVision
"author":
  "homepage": "https://nerd.vision"
  "name": NerdVision
  "sales_email": support@nerd.vision
  "support_email": support@nerd.vision
  "vendor_id": nerdvision
"categories":
- log collection
- marketplace
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "nerdvision"
"integration_id": "nerdvision"
"integration_title": "NerdVision"
"integration_version": ""
"is_public": true
"kind": "integration"
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "nerdvision"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.nerdvision.clients
  "product_id": clients
  "short_description": Debugging and data collection tool.
  "tag": hostname
  "unit_label": client
  "unit_price": !!int "2"
"public_title": "NerdVision"
"short_description": "Live debugger for .NET, Java, Python and Node"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Marketplace"
  - "Offering::Integration"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Live debugger for .NET, Java, Python and Node
  "media":
  - "caption": Interactive debugger in NerdVision.
    "image_url": images/debugger.png
    "media_type": image
  - "caption": List of captured errors in NerdVision.
    "image_url": images/error_list.png
    "media_type": image
  - "caption": NerdVision dashboard in Datadog.
    "image_url": images/screenshot_datadog.png
    "media_type": image
  - "caption": Snapshot details in NerdVision.
    "image_url": images/snapshot_details.png
    "media_type": image
  - "caption": List of snapshots in NerdVision.
    "image_url": images/snapshot_list.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": NerdVision
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

### What is NerdVision?

NerdVision is a live debugging platform that allows you to gather deep insight into your application at any time. NerdVision
allows you to install tracepoints into your application to collect data about the state of your applications without restarting or
changing the code.

After signup, this integration creates a dashboard and syncs all events and logs from the NerdVision group to your Datadog
organization.

#### Watchers and Conditionals

Use Conditionals to narrow the trigger of your tracepoint to the specific case you are interested in. Add watchers to enhance the
context to include data that are most important to the issue or are not part of the variable capture.

### NerdVision Datadog Dashboard

The Datadog dashboard gives you the insight you need to see where in your code the tracepoints are being triggered. Allowing you to
identify hotspots of debug activity.

### Events

Each tracepoint that is triggered will be sent to Datadog as an event, containing the appropriate tags, and a link to view the
data in NerdVision. Tracepoints allow you to gather the full stack and variables that are active at the frame the tracepoint is
triggered.

### Logs

With dynamic logging you can inject new log messages at any point of you code to add that extra data you missed. Each log message
that is triggered will be synced with Datadog as soon as it has been processed by NerdVision.

### Metrics

NerdVision produces metrics for online clients and tracepoint triggers.

### Service Checks

NerdVision does not include any service checks.

## Support

For support or feature requests, contact NerdVision through the following channel:

- Email: [support@nerd.vision][4]

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor debugging data with NerdVision's integration in the Datadog Marketplace][5]
- [NerdVision Documentation][6]

[1]: https://app.nerd.vision
[2]: https://app.nerd.vision/setup
[3]: https://app.nerd.vision
[4]: mailto:support@nerd.vision
[5]: https://www.datadoghq.com/blog/monitor-nerdvision-datadog-marketplace/
[6]: https://docs.nerd.vision/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/nerdvision" target="_blank">Click Here</a> to purchase this application.
