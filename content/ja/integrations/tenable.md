---
"app_id": "tenable"
"app_uuid": "09a46b1b-a940-4aba-8e9f-bde9e5ae2c3f"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10089"
    "source_type_name": Tenable
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/tenable/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tenable"
"integration_id": "tenable"
"integration_title": "Tenable Nessus"
"integration_version": "1.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "tenable"
"public_title": "Tenable Nessus"
"short_description": "Track nessus backend and webserver logs"
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
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Track nessus backend and webserver logs
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Tenable Nessus
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Overview

This integration monitors [Tenable Nessus][1] logs through the Datadog Agent.

## Setup

Follow the instructions below configure this integration for an Agent running on a host.

### Installation

To install the Tenable integration configuration on your Agent:

**Note**: This step is not necessary for Agent version >= 7.18.0.

1. [Install][2] the 1.0 release (`tenable==1.0.0`).

### Configuration

The Agent tails the Tenable Nessus `webserver` and `backend` logs to collect data on Nessus scans.

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Uncomment and edit this configuration block at the bottom of your `tenable.d/conf.yaml`:

   See the [sample tenable.d/conf.yaml][3] for available configuration options.

   ```yaml
      logs:
       - type: file
         path: /opt/nessus/var/nessus/logs/backend.log
         service: nessus_backend
         source: tenable

       - type: file
         path: /opt/nessus/var/nessus/logs/www_server.log
         service: nessus_webserver
         source: tenable
   ```

    Customize the `path` and `service` parameter values if necessary for your environment.

3. [Restart the Agent][4].

#### Log data collected

1. Nessus backend logs collect data on scan names, start time, stop time, durations, target(s)
2. Nessus web server logs collect data on access logs for the Nessus web server including Client IPs, User Agents, and login attempts/successes/failures.

### Metrics

This integration does not include any metrics.

### Events

This integration does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://www.tenable.com/products/nessus
[2]: https://docs.datadoghq.com/agent/guide/integration-management/#install
[3]: https://github.com/DataDog/integrations-core/blob/master/tenable/datadog_checks/tenable/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/help/

