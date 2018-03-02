---
categories:
- web
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/twemproxy/
git_integration_title: twemproxy
guid: a5cca58a-9984-4226-ad1c-8dff73c9d6ac
has_logo: true
integration_title: Twemproxy
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: twemproxy
public_title: Datadog-Twemproxy Integration
short_description: Visualize twemproxy performance and correlate with the rest of
  your applications
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Overview

Track overall and per-pool stats on each of your twemproxy servers. This Agent check collects metrics for client and server connections and errors, request and response rates, bytes in and out of the proxy, and more.

## Setup
### Installation

The Agent's twemproxy check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on each of your Twemproxy servers.

### Configuration

Create a file `twemproxy.yaml` in the Agent's `conf.d` directory. See the [sample twemproxy.yaml](https://github.com/DataDog/integrations-core/blob/master/twemproxy/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
    - host: localhost
      port: 2222 # change if your twemproxy doesn't use the default stats monitoring port
```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending twemproxy metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `twemproxy` under the Checks section:

```
  Checks
  ======
    [...]

    twemproxy
    -------
      - instance #0 [OK]
      - Collected 20 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The twemproxy check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "twemproxy" >}}


### Events
The Twemproxy check does not include any event at this time.

### Service Checks

`twemproxy.can_connect`:

Returns CRITICAL if the Agent cannot connect to the Twemproxy stats endpoint to collect metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

