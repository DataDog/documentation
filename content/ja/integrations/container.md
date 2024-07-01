---
"app_id": "container"
"app_uuid": "ac3cc203-5b28-457d-8737-bbe32fa7c3b9"
"assets":
  "dashboards":
    "Containers": assets/dashboards/containers.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": container.uptime
      "metadata_path": metadata.csv
      "prefix": container.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10242"
    "source_type_name": Container
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/container/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "container"
"integration_id": "container"
"integration_title": "Container"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "container"
"public_title": "Container"
"short_description": "Track your container metrics with Datadog"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": Track your container metrics with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Container
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check reports a set of metrics about any running containers, regardless of the runtime used to start them.

**NOTE**: The `container` check is different from the `containerd` check. The `container` checks report standardized metrics for all containers found on the system, regardless of the container runtime.
The `containerd` is dedicated to `containerd` runtime and publishes metrics in the `containerd.*` namespace.

## Setup

### Installation

Container is a core Datadog Agent check and is automatically activated if any supported container runtime is detected.
Configuring access to supported container runtimes (Docker, containerd) may be required depending on your environment.

#### Installation on containers

The `container` check requires some folders to be mounted to allow for automatic activation. This is handled by the official Helm Chart, the Datadog Operator, and as documented set ups for Kubernetes, Docker, ECS, and ECS Fargate.

### Configuration

The `container` check does not expose any specific configuration settings. To customize common fields or to force the activation of the `container` check, follow these steps:

1. Create the `container.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory.

2. [Restart the Agent][1]

The `container` check can collect metrics about CPU, Memory, Network and Disks IO.
Some metrics may not be available depending on your environment (Linux / Windows, for instance).

### Validation

[Run the Agent's `status` subcommand][1] and look for `container` under the **Checks** section.

## Data Collected

### Metrics

See [metadata.csv][2] for a list of metrics provided by this integration.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv
[3]: https://docs.datadoghq.com/help/

