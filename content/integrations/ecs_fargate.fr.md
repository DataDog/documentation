---
category:
- aws
- containers
- orchestration
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/fargate/
git_integration_title: ecs_fargate
guid: 7484e55c-99ec-45ad-92f8-28e798796411
has_logo: true
integration_title: ECS-Fargate
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: ecs_fargate
private: true
public_title: Datadog-ECS-Fargate Integration
short_description: Track metrics for containers running with ECS Fargate
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

Get metrics from all your containers running in ECS Fargate:

* CPU/Memory usage & limit metrics
* I/O metrics

## Setup

### Installation

Install the `dd-check-ecs_fargate` package manually or with your favorite configuration manager

### Configuration

Edit the `ecs_fargate.yaml` file to point to your server and port, set the masters to monitor

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `ecs_fargate` under the Checks section:

    Checks
    ======

        ecs_fargate
        -----------
          - instance #0 [OK]
          - Collected 63 metrics, 0 events & 1 service checks

## Compatibility

The ecs_fargate check is compatible with all major platforms

## Data Collected

### Metrics
{{< get-metrics-from-git "ecs_fargate" >}}


### Events

The ECS Fargate check does not include any event at this time.

### Service Checks

The ECS Fargate check does not include any service check at this time.

## Troubleshooting

Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

