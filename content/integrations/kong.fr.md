---
categories:
- web
- api
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/kong/
git_integration_title: kong
guid: f1098d6f-b393-4374-81c0-47c0a142aeef
has_logo: true
integration_title: Kong
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: kong
public_title: Datadog-Kong Integration
short_description: Track total requests, response codes, client connections, and more.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

The Agent's Kong check tracks total requests, response codes, client connections, and more.

## Setup
### Installation

The Kong check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Kong servers.

If you need the newest version of the Kong check, install the `dd-check-kong` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a `kong.yaml` in the Datadog Agent's `conf.d` directory. See the [sample kong.yaml](https://github.com/DataDog/integrations-core/blob/master/kong/conf.yaml.example) for all available configuration options:

```
init_config:

instances:

-   kong_status_url: http://example.com:8001/status/
    tags:
    - instance:foo



```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending Kong metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `kong` under the Checks section:

```
  Checks
  ======
    [...]

    kong
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The kong check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "kong" >}}


### Events
The Kong check does not include any event at this time.

### Service Checks

`kong.can_connect`:

Returns CRITICAL if the Agent cannot connect to Kong to collect metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Monitor Kong with our new Datadog integration](https://www.datadoghq.com/blog/monitor-kong-datadog/)

