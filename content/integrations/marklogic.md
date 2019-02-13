---
categories:
    - log collection
description: Gather your logs from Marklogic and send them to Datadog.
has_logo: true
integration_title: Marklogic
is_public: true
kind: integration
name: marklogic
public_title: Datadog-Stunnel Integration
short_description: Gather your logs from Marklogic and send them to Datadog.
---


## Overview


## Setup
### Installation

The Marklogic integration is included in the [Datadog Agent][1] package, so you don't need to install anything else on your host.

### Configuration

#### Log Collection

**Available for Agent >6.0**

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `marklogic.d/conf.yaml` file to start collecting your MarkLogic Logs:

    ```
      logs:
          - type: file
            path: <MARKLOGIC_LOG_FILE_PATH>
            source: marklogic
            sourcecategory: database
            service: <SERVICE>
    ```

    Change the `path` and `service` parameter values and configure them for your environment.

3. [Restart the Agent][2].

### Validation

[Run the Agent's `status` subcommand][3] and look for `marklogic` under the Checks section.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[3]: /agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
