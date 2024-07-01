---
"app_id": "data-runner"
"app_uuid": "ad7b5a3c-497d-45e0-9bcf-50f2d1365247"
"assets":
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://datadoghq.com"
  "name": Datadog
  "sales_email": sales@datadog.com
  "support_email": help@datadoghq.com
"categories": []
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/data_runner/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "data_runner"
"integration_id": "data-runner"
"integration_title": "The Data Runner"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "data_runner"
"public_title": "The Data Runner"
"short_description": "An idle game of metrics hunting for the Datadog dashboard."
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
  - "Offering::UI Extension"
  "configuration": "README.md#Setup"
  "description": An idle game of metrics hunting for the Datadog dashboard.
  "media":
  - "caption": The Data Runner
    "image_url": images/data-runner.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": The Data Runner
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Data Runner is a game in which your character searches a library environment for a player-specified metric. When the character finds the specified metric, the metric's value is added to the player's score. You can add Data Runner to your Datadog dashboard as a widget. 

This extension is made possible by [Datadog apps][1] which extends the user-interface with third party content not supported natively. If you are interested in extending your Datadog experience for business or for fun, you can [build out an app or game of your own][1].

For more details about Data Runner, see [stuartlangridge/data-runner][2] on GitHub.

## Setup

1. To display Data Runner on your dashboard, open the [dashboard][3] to which you want to add your widget.

2. Use the **+ Add Widgets** button to open a list of available widgets. Drag and drop the Data Runner widget into your desired position on the dashboard.

3. Choose a metric for the game character to find.

## Data Collected

### Metrics

Data Runner does not provide any metrics.

### Events

Data Runner does not include any events.

### Service Checks

Data Runner does not include any service checks.

## Support

Need help? Contact [Datadog support][4].

To build your own Datadog app, refer to the [Datadog apps developer documentation][1].

[1]: https://docs.datadoghq.com/developers/datadog_apps
[2]: https://github.com/stuartlangridge/data-runner
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://www.datadoghq.com/support/

