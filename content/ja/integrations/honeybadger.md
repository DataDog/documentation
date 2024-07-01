---
"app_id": "honeybadger"
"app_uuid": "385c386e-6394-41f4-8c92-5944e6b203f5"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "130"
    "source_type_name": "Honeybadger"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "event management"
- "issue tracking"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "honeybadger"
"integration_id": "honeybadger"
"integration_title": "Honeybadger"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "honeybadger"
"public_title": "Honeybadger"
"short_description": "View, search on, and discuss exceptions from Honeybadger in your event stream."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Event Management"
  - "Category::Issue Tracking"
  "configuration": "README.md#Setup"
  "description": "View, search on, and discuss exceptions from Honeybadger in your event stream."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Honeybadger"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Honeybadger provides exception and uptime monitoring to keep your web apps error-free. Connect Honeybadger to Datadog to get Honeybadger alerts in your Datadog event stream.

## Setup

### Installation

To capture errors from Honeybadger:

1. Open your Honeybadger [project list][1].
2. Click on "Settings" for the project you want to monitor.
3. Click on "Alerts & Integrations".
4. Select "Datadog" as a new integration.
5. Add your [API key][2].
6. Save the integration.
7. Click the **Install Integration** button on the [Honeybadger Integration Tile][3].

## Data Collected

### Metrics

The Honeybadger integration does not include any metrics.

### Events

The Honeybadger integration does not include any events.

### Service Checks

The Honeybadger integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://app.honeybadger.io/users/sign_in
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings#integrations/honeybadger
[4]: https://docs.datadoghq.com/help/

