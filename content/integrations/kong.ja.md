---
doclevel: basic
git_integration_title: kong
integration_title: Kong
kind: integration
newhlevel: true
placeholder: true
title: Datadog-Kong Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>



## Overview

Connect Kong to Datadog to:

* Visualize Kong performance data
* Correlate the performance of Kong with the rest of your applications


## Configuration

Configure the Agent to connect to Kong. Edit conf.d/kong.yaml

    init_config:

    instances:
    # For every instance, you have an `kong_status_url` and (optionally)
    # a list of tags.

    -   kong_status_url: http://example.com:8001/status/
        tags:
            -   instance:foo

    -   kong_status_url: http://example2.com:8001/status/
        tags:
            -   instance:bar

{{< insert-example-links >}}

## Validation

To validate that the integration is working, restart the agent and then run the info command (For help on these steps, see [Getting Started with the Agent](/guides/basic_agent_usage/).  You should see output that validates that the check passed.

## Metrics

{{< get-metrics-from-git >}}