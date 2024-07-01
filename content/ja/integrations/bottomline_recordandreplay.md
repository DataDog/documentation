---
"app_id": "bottomline-recordandreplay"
"app_uuid": "d87fbcfa-71db-4d62-8264-5d88ba2338ce"
"assets":
  "dashboards":
    "Bottomline Record and Replay Overview": assets/dashboards/bottomline_activity_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": bottomline.mainframe.activity.resource.duration
      "metadata_path": metadata.csv
      "prefix": bottomline.mainframe.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10324"
    "source_type_name": Bottomline Mainframe
  "monitors":
    "Mainframe resource taking long time to respond": assets/monitors/bottomline_mainframe_resource_has_problem.json
"author":
  "homepage": "https://www.bottomline.com/"
  "name": Bottomline Technologies
  "sales_email": partner.cfrm@bottomline.com
  "support_email": partner.cfrm@bottomline.com
  "vendor_id": bottomline
"categories":
- mainframes
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "bottomline_recordandreplay"
"integration_id": "bottomline-recordandreplay"
"integration_title": "Bottomline's Record and Replay: Mainframe"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "bottomline_recordandreplay"
"public_title": "Bottomline's Record and Replay: Mainframe"
"short_description": "Monitor your 3270/5250 Mainframe users and resources using network traffic"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Mainframes"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": Monitor your 3270/5250 Mainframe users and resources using network traffic
  "media":
  - "caption": Mainframe Record and Replay User Session
    "image_url": images/mainframe_replay.png
    "media_type": image
  - "caption": Mainframe Record and Replay Dashboard
    "image_url": images/bt_dashboard.png
    "media_type": image
  - "caption": Mainframe Record and Replay Overview
    "image_url": images/bt_replay.png
    "media_type": image
  - "caption": Mainframe Record and Replay Architecture
    "image_url": images/bt_architecture.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Bottomline's Record and Replay: Mainframe"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Bottomline's Mainframe Record and Replay solution is non-invasive in its capability to monitor 3270/5250 users via network traffic to help customers monitor users and systems.

With this integration, you can monitor Bottomline's' Record and Replay sessions in Datadog to provide visibility into resource utilization, resource performance, user activity, security events, and system monitors. Customers can also directly access user session replays through Datadog.

### Monitors

This integration includes a monitor that reports when a Mainframe Resource is experiencing a problem.

### Metrics

See [metadata.csv][1] for a list of metrics provided by this check.

### Dashboards

**Bottomline Record and Replay Overview**: This dashboard gives visibility into what resources are being used, resource performance, user activity, security events, and system monitors.

## Setup

Follow the step-by-step instructions below to install and configure this check for an Agent running on a host. 

### Prerequisites

The following items are required for this integration to run as intended:
  - You must have the Datadog Agent installed and running.
  - Access to the server running the Datadog Agent for installing Bottomline's Record and Replay and to modify the Datadog Agent configurations.
  - A supported database (Oracle or Postgres).
  - A Windows desktop to install Bottomline's Enterprise Manager for configuring Record and Replay.


### Setup

If you are not already a customer of Bottomline, visit [Bottomline's Marketplace listing][2] to purchase a license.

Follow the instructions outlined [here][3] to install the integration.

## Support
For support or feature requests, contact [Bottomline][4].


[1]: https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/metadata.csv
[2]: https://app.datadoghq.com/marketplace/app/bottomline-mainframe
[3]: https://github.com/nbk96f1/datadog/tree/main/Documentation
[4]: mailto:partner.cfrm@bottomline.com

