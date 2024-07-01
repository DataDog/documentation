---
"app_id": "portworx"
"app_uuid": "e682ab93-39cd-403b-a16f-8082961bc081"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": portworx.cluster.cpu_percent
      "metadata_path": metadata.csv
      "prefix": portworx.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10021"
    "source_type_name": Portworx
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Portworx
  "sales_email": paul@portworx.com
  "support_email": paul@portworx.com
"categories":
- kubernetes
- data stores
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "portworx"
"integration_id": "portworx"
"integration_title": "Portworx"
"integration_version": "1.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "portworx"
"public_title": "Portworx"
"short_description": "Collect runtime metrics from a Portworx Instance."
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Kubernetes"
  - "Category::Data Stores"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Collect runtime metrics from a Portworx Instance.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/portworx-integration/"
  "support": "README.md#Support"
  "title": Portworx
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Portworx service in real time to:

- Monitor health and performance of your Portworx Cluster
- Track disk usage, latency and throughput for Portworx volumes

## Setup

The Portworx check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Portworx check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-portworx==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `portworx.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Portworx [metrics](#metrics). See the [sample portworx.d/conf.yaml][5] for all available configuration options.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_endpoint: http://localhost:9001/metrics
    ```

2. [Restart the Agent][6]

### Validation

[Run the Agent's `info` subcommand][7], you should see something like the following:

## Compatibility

The Portworx check is compatible with Portworx 1.4.0 and possible earlier versions.

## Data Collected

### Metrics
{{< get-metrics-from-git "portworx" >}}


### Events

The Portworx check does not include any events.

## Troubleshooting

### Agent cannot connect

```text
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Check that the `url` in `portworx.yaml` is correct.

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitoring multi-cloud container storage with Portworx and Datadog][9]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/faq/agent-status-and-information/
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[9]: https://www.datadoghq.com/blog/portworx-integration/

