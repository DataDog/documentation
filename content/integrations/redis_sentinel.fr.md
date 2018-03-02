---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/redis_sentinel/
git_integration_title: redis_sentinel
has_logo: false
integration_title: Redis Sentinel
is_public: true
kind: integration
maintainer: krasnoukhov
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: redis_sentinel
parameters:
  creates_events: false
  metrics_to_check:
  - redis.sentinel.known_sentinels
  user_configured: false
public_title: Datadog-Redis Sentinel Integration
short_description: Redis Sentinel provides high availability for Redis.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Overview

Get metrics from Redis's Sentinel service in real time to:

* Visualize and monitor sentinels states
* Be notified about failovers

## Setup
### Installation

Install the `dd-check-redis-sentinel` package manually or with your favorite configuration manager.

### Configuration

Edit the `redis_sentinel.yaml` file to point to your server and port, set the masters to monitor.

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

        redis_sentinel
        --------------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The Redis Sentinel check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "redis_sentinel" >}}


### Events
The Redis Sentinel check does not include any events at this time.

### Service Checks
The Redis Sentinel check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
