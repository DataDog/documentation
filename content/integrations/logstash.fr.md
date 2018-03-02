---
categories:
- logging
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/logstash/
git_integration_title: logstash
guid: 9d110885-cbdf-44e5-83b8-7a6514724e98
has_logo: false
integration_title: Logstash
is_public: true
kind: integration
maintainer: ervansetiawan@gmail.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: logstash
public_title: Datadog-Logstash Integration
short_description: Monitor and collect runtime metrics from a Logstash instance
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

Get metrics from Logstash service in real time to:

* Visualize and monitor Logstash states.
* Be notified about Logstash events.

## Setup
### Installation

Install the `dd-check-logstash` package manually or with your favorite configuration manager.

### Configuration

Edit the `logstash.yaml` file to point to your server and port, set the masters to monitor.

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

      logstash 
      -----------------
        - instance #0 [OK]
        - Collected 61 metrics, 0 events & 1 service check

## Compatibility

The Logstash check is compatible with Logstash 5.6 and possible earlier versions. Currently it does not support the new pipelines metrics in Logstash 6.0 yet.

## Data Collected
### Metrics
{{< get-metrics-from-git "logstash" >}}


### Events
The Logstash check does not include any events at this time.

### Service checks

`logstash.can_connect`:

Returns `Critical` if the Agent cannot connect to Logstash to collect metrics.

## Troubleshooting

### Agent cannot connect
```
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Check that the `url` in `logstash.yaml` is correct.

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
