---
title: Adobe Experience Manager
name: adobe_experience_manager
kind: integration
description: 'Collect Adobe Experience Manager logs to track errors, request response time, and track badly performing web pages.'
short_description: 'Collect logs to track errors, request response time, etc.'
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/adobe_experience_manager.md']
categories:
    - log collection
doc_link: /integrations/adobe_experience_manager/
aliases:
    - logs/log_collection/adobe_experience_manager
has_logo: true
integration_title: Adobe Experience Manager
is_public: true
public_title: Datadog-Adobe Experience Manager
supported_os:
    - linux
    - mac_os
    - windows
further_reading:
    - link: 'logs/'
      tag: 'Documentation'
      text: 'Log Management'
integration_id: "adobe"
---

## Overview

Collect Adobe Experience Manager logs to track errors, request response time, and track badly performing web pages.

## Setup

### Installation

[Install the agent][1] on the instance that runs Adobe Experience Manager.

#### Log collection

_Available for Agent version >6.0_

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file with:

    ```yaml
    logs_enabled: true
    ```

2. Create `adobe.experience.manager.d/conf.yaml` in your [conf.d directory][2] and add the configuration below to start collecting your logs:

    ```yaml
    logs:
        - type: file
          path: cq-installation-dir/crx-quickstart/logs/*.log
          service: '<MY_APPLICATION>'
          source: adobe.experience.manager
    ```

      Change the `path` and `service` parameter values and configure them for your environment.

3. [Restart the Agent][3].

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /agent/guide/agent-commands/#restart-the-agent
[4]: /help/
