---
"app_id": "grpc-check"
"app_uuid": "f0317cd5-e4b9-4147-998e-25c69fad94ed"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - grpc_check.healthy
      - grpc_check.unhealthy
      "metadata_path": metadata.csv
      "prefix": grpc_check.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10296"
    "source_type_name": gRPC Check
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": help@datadoghq.com
  "support_email": keisuke.umegaki.630@gmail.com
"categories": []
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/grpc_check/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "grpc_check"
"integration_id": "grpc-check"
"integration_title": "gRPC Health"
"integration_version": "1.0.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "grpc_check"
"public_title": "gRPC Health"
"short_description": "Monitor gRPC servers based on gRPC Health Checking Protocol"
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
  "configuration": "README.md#Setup"
  "description": Monitor gRPC servers based on gRPC Health Checking Protocol
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Troubleshooting"
  "title": gRPC Health
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors endpoints implementing [gRPC Health Checking Protocol][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

#### Host

To install the grpc_check check on your host:

```bash
sudo -u dd-agent datadog-agent integration install -t datadog-grpc-check==1.0.2
```

#### Dockerfile

Build the Agent image with this Dockerfile.

```Dockerfile
FROM datadog/agent:7
RUN agent integration install -r -t datadog-grpc-check==1.0.2 \
  && /opt/datadog-agent/embedded/bin/pip3 install grpcio grpcio-health-checking
```

### Configuration

1. Edit the `grpc_check.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your grpc_check performance data. See the [sample grpc_check.d/conf.yaml][3] for all available configuration options.

2. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][5] and look for `grpc_check` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "grpc_check" >}}


### Events

The grpc_check integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "grpc_check" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/datadog_checks/grpc_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/metadata.csv
[7]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/assets/service_checks.json
[8]: help@datadoghq.com

