---
"app_id": "boundary"
"app_uuid": "61898266-9c80-442d-89d3-22e7aeeafb94"
"assets":
  "dashboards":
    "Boundary Overview": assets/dashboards/boundary_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": boundary.worker.proxy.websocket.active_connections
      "metadata_path": metadata.csv
      "prefix": boundary.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10280"
    "source_type_name": Boundary
  "monitors":
    "[Boundary] High active connections": assets/monitors/active_connections.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- configuration & deployment
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/boundary/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "boundary"
"integration_id": "boundary"
"integration_title": "Boundary"
"integration_version": "2.2.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "boundary"
"public_title": "Boundary"
"short_description": "Monitor Boundary controllers and workers."
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
  - "Category::Configuration & Deployment"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor Boundary controllers and workers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Boundary
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Boundary][1] through the Datadog Agent. The minimum supported version of Boundary is `0.8.0`.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Boundary check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

#### Listener

A listener with an `ops` purpose must be set up in the `config.hcl` file to enable metrics collection. Here's an example listener stanza:

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "postgresql://<username>:<password>@10.0.0.1:5432/<database_name>"
  }
}

listener "tcp" {
  purpose = "api"
  tls_disable = true
}

listener "tcp" {
  purpose = "ops"
  tls_disable = true
}
```

The `boundary.controller.health` [service check](#service-checks) submits as `WARNING` when the controller is shutting down. To enable this shutdown grace period, update the `controller` block with a defined wait duration:

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "env://BOUNDARY_PG_URL"
  }
  graceful_shutdown_wait_duration = "10s"
}
```

#### Datadog Agent

1. Edit the `boundary.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your boundary performance data. See the [sample boundary.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `boundary` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "boundary" >}}


### Events

The Boundary integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "boundary" >}}


### Log collection

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. To start collecting your Boundary logs, add this configuration block to your `boundary.d/conf.yaml` file:

    ```yaml
    logs:
       - type: file
         source: boundary
         path: /var/log/boundary/events.ndjson
    ```

    Change the `path` parameter value based on your environment. See the [sample `boundary.d/conf.yaml` file][4] for all available configuration options.

## Troubleshooting

Need help? Contact [Datadog support][9].

[1]: https://www.boundaryproject.io
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/boundary/datadog_checks/boundary/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/boundary/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/boundary/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/

