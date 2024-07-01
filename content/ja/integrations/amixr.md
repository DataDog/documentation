---
"app_id": "amixr"
"app_uuid": "051b4bbe-d7cc-46bf-9a66-169ab7d5a4aa"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": amixr.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10103"
    "source_type_name": Amixr
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Amixr
  "sales_email": ildar@amixr.io
  "support_email": ildar@amixr.io
"categories":
- alerting
- automation
- collaboration
- incidents
- notifications
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/amixr/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "amixr"
"integration_id": "amixr"
"integration_title": "Amixr"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amixr"
"public_title": "Amixr"
"short_description": "Developer-friendly Alert Management with a brilliant Slack integration"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Automation"
  - "Category::Collaboration"
  - "Category::Incidents"
  - "Category::Notifications"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Developer-friendly Alert Management with a brilliant Slack integration
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Amixr
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Use Amixr to manage alerts with a Slack integration:

- Collect & analyze alerts and other events from Datadog
- Set up on-call rotations with Google calendar or in Slack
- Configure automatic escalation chains
- Receive alerts with phone calls and SMS
- Orchestrate incident management with GitOps

![Amixr_Interface][1]

## Setup

### Installation

No additional installation is needed on your server.

### Configuration

In Amixr:

1. Go to *Settings > Connect New Monitorings > Datadog > How to connect*
2. Copy Datadog webhook URL

In Datadog:

1. Navigate to the **Integrations** page from the sidebar.
2. Search for **webhook** in the search bar.
3. Enter a name for the integration, for example: `amixr-alerts-prod`.
4. Paste the webhook URL from the above step.
5. Click the save button.

### Validation

In Datadog:

1. Navigate to the **Events** page from the sidebar.
2. Type `@webhook-<integration name><YOUR TEXT HERE>`, for example: `@webhook-amixr-alerts-prod test alert`.
3. Click the post button.

In Amixr:

1. Navigate to **Incidents** from the sidebar to check if the alert was received.

## Data Collected

### Metrics

The Amixr integration does not include any metrics.

### Service Checks

The Amixr integration does not include any service checks.

### Events

The Amixr integration does not include any events.

## Troubleshooting

Need help? Contact [Amixr support][2].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/amixr/images/amixr-interface.png
[2]: https://amixr.io/support/

