---
categories:
    - log collection
description: Gather your logs from Sidekiq and send them to Datadog.
has_logo: true
integration_title: Sidekiq
is_public: true
kind: integration
name: sidekiq
public_title: Datadog-Stunnel Integration
short_description: Gather your logs from Sidekiq and send them to Datadog.
---

## Overview

Connect Sidekiq logs to Datadog in order to track requests per second, bytes served, troubleshoot errors and monitor document updates.

This integration supports the access log as well as the error ones.

## Setup
### Installation


The Sidekiq integration is included in the [Datadog Agent][1] package, so you don't need to install anything else on your host.

### Configuration
#### Log Collection

**Available for Agent >6.0**

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `sidekiq.d/conf.yaml` file to start collecting your Sidekiq Logs:

    ```yaml
      logs:
          - type: file
            path: <SIDEKIQ_LOG_FILE_PATH>
            source: sidekiq
            sourcecategory: jobrunner
            service: <SERVICE>
    ```

    Change the `path` and `service` parameter values and configure them for your environment. If you cannot find your logs, [you can look in the sidekiq documentation to see how to change your logging][2].

3. [Restart the Agent][3].

### Validation

[Run the Agent's `status` subcommand][4] and look for `sidekiq` under the Checks section.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[3]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[4]: /agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
