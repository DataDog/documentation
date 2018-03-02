---
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/upsc/
git_integration_title: upsc
guid: f14607ca-0e30-4c7f-9564-fbdb46ca3030
has_logo: true
integration_title: UPSC
is_public: true
kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: upsc
public_title: Datadog-UPSC Integration
short_description: UPSC stats collector for UPS batteries
support: contrib
supported_os:
- linux
version: 0.1.0
---



## Overview

Get metrics from UPSD service via upsc in real time to:

* Visualize and monitor UPS battery health and states
* Be notified about UPS failovers and events.

## Installation

Install the `dd-check-upsc` package manually or with your favorite configuration manager

## Configuration

Edit the `upsc.yaml` file to point to your server and port, set the masters to monitor

## Validation

When you run `datadog-agent info` you should see something like the following:

    Checks
    ======

        upsc
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The UPSC check is compatible with linux-based platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "upsc" >}}


### Events
Push UPS failovers and events into your [Datadog Even Stream](https://docs.datadoghq.com/graphing/event_stream/) 

### Service Checks
The UPSD check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
