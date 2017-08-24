---
title: Datadog-Nagios Integration
integration_title: Nagios
kind: integration
doclevel: basic
---

## Overview

Send events from your Nagios-monitored infrastructure to Datadog for richer alerting and to help correlate Nagios events with metrics from your Datadog-monitored infrastructure.

This check watches your Nagios server's logs and sends events to your Datadog event stream: track service flaps, host state changes, passive service checks, host and service downtimes, and more. The check can also send Nagios Perfdata as metrics to Datadog.

* Watches your Nagios server's logs and sends events to your Datadog event stream. It emits eve

The check emits events for service flaps, host state changes, passive service checks, host and service downtimes, and more. It can also send Nagios Perfdata to Datadog as metrics.

## Setup
### Installation

The Nagios check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Nagios servers. If you need the newest version of the check, install the `dd-check-nagios` package.

### Configuration 
The Nagios integration requires the Datadog Agent.

1. Find the Nagios configuration file on your server (usually /etc/nagios3/nagios.cfg)
```
sudo find /etc -type f -name nagios.cfg
```

2. Configure the Datadog Agent to access Nagios, edit `conf.d/nagios.yaml`
{{< highlight yaml >}}
init_config:

instances:
    - nagios_conf: /etc/nagios3/nagios.cfg
      collect_events: True
{{< /highlight >}}

3. Restart the Agent

**Note**:To integrate with the Icinga fork of Nagios, you should be able to use the Nagios integration to pull in Icinga events. Just link to the Icinga configuration instead of the Nagios one.

{{< insert-example-links >}}

## Data Collected
### Metrics

With a default configuration, the Nagios check doesn't collect any metrics. But if you set `collect_host_performance_data` and/or `collect_service_performance_data` to `True`, the check watches for perfdata and sumbits it as gauge metrics to Datadog.


### Events

The check watches the Nagios events log for log lines containing these string, emitting an event for each such line:

- SERVICE FLAPPING ALERT
- ACKNOWLEDGE_SVC_PROBLEM
- SERVICE ALERT
- HOST ALERT
- PASSIVE SERVICE CHECK
- CURRENT SERVICE STATE
- ACKNOWLEDGE_HOST_PROBLEM
- CURRENT HOST STATE
- SERVICE NOTIFICATION
- HOST DOWNTIME ALERT
- PROCESS_SERVICE_CHECK_RESULT
- SERVICE DOWNTIME ALERT
