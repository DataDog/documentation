---
"app_id": "redis-sentinel"
"app_uuid": "207e2b2c-5fad-40a4-a4fc-09f119e142d3"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": "redis.sentinel.known_sentinels"
      "metadata_path": "metadata.csv"
      "prefix": "redis."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10210"
    "source_type_name": "Redis Sentinel"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Community"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "redis_sentinel"
"integration_id": "redis-sentinel"
"integration_title": "Redis Sentinel"
"integration_version": "1.1.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "redis_sentinel"
"public_title": "Redis Sentinel"
"short_description": "Redis Sentinel provides high availability for Redis."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::OS & System"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Redis Sentinel provides high availability for Redis."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Redis Sentinel"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Redis's Sentinel service in real time to:

- Visualize and monitor sentinels states
- Be notified about failovers

## Setup

The Redis Sentinel check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Redis Sentinel check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-redis_sentinel==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `redis_sentinel.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Redis Sentinel [metrics](#metrics).
   See the [sample upsc.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6]

## Validation

Run the [Agent's status subcommand][7] and look for `redis_sentinel` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "redis_sentinel" >}}


### Events

The Redis's Sentinel check does not include any events.

### Service Checks
{{< get-service-checks-from-git "redis_sentinel" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/assets/service_checks.json
[10]: http://docs.datadoghq.com/help

