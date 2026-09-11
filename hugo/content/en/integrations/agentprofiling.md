---
integration_title: Agent Profiling Check
name: agentprofiling
custom_kind: integration
git_integration_title: agentprofiling
updated_for_agent: 7.66
description: 'Generates flare with profiles based on user-defined memory and CPU thresholds.'
is_public: true
public_title: Datadog-Agent Profiling
short_description: 'Generates flare with profiles based on user-defined memory and CPU thresholds.'
supported_os:
    - linux
    - mac_os
    - windows
integration_id: "agentprofiling"
---

## Overview

This check should be used when troubleshooting a memory or CPU issue in the Agent. After a user-configured memory or CPU threshold is exceeded, a flare with profiles is automatically generated. This flare can be generated locally or sent directly to a Datadog Support case. A valid `ticket_id` and `user_email` must be provided in the `conf.yaml` for the flare to be sent directly to a Support case. It is otherwise generated locally.   

## Setup

### Installation

The System check is included in the [Datadog Agent][1] package. No additional installation is needed on your server.

### Configuration

1. Edit the `agentprofiling.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample agentprofiling.d/conf.yaml][3] for all available configuration options. **Note**: At least one entry is required under `instances` to enable the check, for example:

    ```yaml
    init_config:
    instances:
        - memory_threshold: 1GB
          cpu_threshold: 50
          ticket_id: # Given by Support
          user_email: # Email used in correspondence with Support
    ```

2. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][1] and look for `agentprofiling` under the Checks section.

## Data collected

### Metrics

The Agent Profiling check does not include any metrics.

### Events

The Agent Profiling check does not include any events.

### Service checks

The Agent Profiling check does not include any service checks.

[1]: /agent/guide/agent-commands/#agent-status-and-information
[2]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/agentprofiling.d/conf.yaml.example
[4]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example
