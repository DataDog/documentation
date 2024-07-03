---
aliases:
- /ja/logs/log_collection/adobe_experience_manager
categories:
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/adobe_experience_manager.md
description: Collect Adobe Experience Manager logs to track errors, request response
  time, and track badly performing web pages.
doc_link: /integrations/adobe_experience_manager/
further_reading:
- link: logs/
  tag: Documentation
  text: Log Management
has_logo: true
integration_id: adobe
integration_title: Adobe Experience Manager
is_public: true
name: adobe_experience_manager
public_title: Datadog-Adobe Experience Manager
short_description: Collect logs to track errors, request response time, etc.
supported_os:
- linux
- mac_os
- windows
title: Adobe Experience Manager
---

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">The Adobe Experience Manager integration is not available for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

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

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
[4]: /ja/help/