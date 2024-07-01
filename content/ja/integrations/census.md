---
"app_id": "census"
"app_uuid": "7f4f3919-5b0a-4b4b-93e5-7f0c035f3887"
"assets":
  "dashboards":
    "Census Overview": assets/dashboards/census_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check":
      - census.syncs.rows_processed
      - census.syncs.sync_completed
      "metadata_path": metadata.csv
      "prefix": census
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10336"
    "source_type_name": Census
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://www.getcensus.com/"
  "name": Census
  "sales_email": sales@getcensus.com
  "support_email": support@getcensus.com
"categories":
- automation
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/census/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "census"
"integration_id": "census"
"integration_title": "Census"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "census"
"public_title": "Census"
"short_description": "Send your Census sync metrics and events to Datadog."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Offering::Integration"
  - "Submitted Data Type::Events"
  - "Submitted Data Type::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Send your Census sync metrics and events to Datadog.
  "media":
  - "caption": Census Syncs Overview - Dashboard
    "image_url": images/census_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Census
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Census][1] is a reverse ETL platform that turns your data warehouse into a hub for marketing and business operations, empowering teams with trustworthy and actionable data. Sync data from a source of truth like a data warehouse to a system of actions like a CRM, advertising platform, or other SaaS app to operationalize data.

Census integrates with Datadog to provide developers the ability to monitor their Census workflows and track the number of successful and failed syncs. This integration sends [metrics](#metrics) and events to Datadog from Census.

## Requirements

A Census Platform tier (or higher) subscription is required to enable this integration.

## Setup

1. Login to your [Census account][2].
2. Navigate to the Census workspace that you wish to connect to your Datadog account.
3. Go to the workspace settings tab, and click on **Configure** on the Datadog tile.
4. Click on **Connect** to connect to your Datadog account through OAuth2.
5. Return to Datadog and open the out-of-the-box Census dashboard.

### Validation

Execute a sync on your Census workspace, and check for the corresponding metrics and events on the Census dashboard in your Datadog account. Events and metrics for a sync may take up to a couple of minutes to be transmitted to Datadog after sync completion.

## Data Collected

### Metrics
{{< get-metrics-from-git "census" >}}


### Service Checks

Census does not include any service checks.

### Events

This integration sends sync completion events to Datadog.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://www.getcensus.com/
[2]: https://app.getcensus.com/
[3]: https://github.com/DataDog/integrations-extras/blob/master/census/metadata.csv
[4]: https://docs.datadoghq.com/help/

