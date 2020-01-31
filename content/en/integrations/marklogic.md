---
categories:
    - log collection
description: Gather your logs from Marklogic and send them to Datadog.
has_logo: true
integration_title: Marklogic
is_public: true
kind: integration
name: marklogic
public_title: Datadog-Marklogic Integration
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/marklogic.md"]
short_description: Gather your logs from Marklogic and send them to Datadog.
---

## Overview

Gather your logs from Marklogic and send them to Datadog.

## Setup

### Installation

The Marklogic integration is included in the [Datadog Agent][1] package, so you don't need to install anything else on your host.

### Configuration

#### Log Collection

**Available for Agent >6.0**

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in `datadog.yaml`:

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
[2]: /agent/guide/agent-commands/#restart-the-agent
[3]: /agent/guide/agent-commands/#agent-status-and-information
