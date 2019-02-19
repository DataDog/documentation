---
categories:
    - log collection
description: Gather your logs from your Stunnel proxy and send them to Datadog.
has_logo: true
integration_title: Stunnel
is_public: true
kind: integration
name: Stunnel
public_title: Datadog-Stunnel Integration
short_description: Gather your logs from your Stunnel proxy and send them to Datadog.
---


## Overview

Stunnel is a proxy designed to add TLS encryption functionality to existing clients and servers without any changes in the programs' code.

Use the Datadog - Stunnel proxy integration to monitor potential network issues or DDoS attacks.

## Setup

### Installation

You must [install the Datadog Agent][1] on the server running Stunnel.

### Configuration

Create a `stunnel.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][2] to start collecting your Stunnel Proxy logs.

#### Log Collection

*Available for Agent v6 only*

1. Collecting logs is disabled by default in the Datadog Agent. You must enable it in the `datadog.yaml` file:

    ```
    logs_enabled: true
    ```

2. Add this configuration block to your `stunnel.d/conf.yaml` file to start collecting Stunnel Logs:

    ```
       logs:
         - type: file
           path: /var/log/stunnel.log
           source: stunnel
           service: <MY_SERVICE>
           sourcecategory: proxy
    ```

    Change the `path` and `service` parameter values and configure them for your environment.

3. [Restart the Agent][3]

### Validation

[Run the Agent's `status` subcommand][4] and look for `stunnel` under the Checks section.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/faq/agent-configuration-files/#agent-configuration-directory
[3]: /agent/faq/agent-commands/?tab=agentv6#start-stop-restart-the-agent
[4]: /agent/faq/agent-commands/#agent-status-and-information
