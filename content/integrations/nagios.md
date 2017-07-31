---
title: Datadog-Nagios Integration
integration_title: Nagios
kind: integration
doclevel: basic
---

## Overview

Capture Nagios activity in Datadog to:

  * Identify trends in service failures at a glance.
  * Recall issue resolutions with a single click.
  * Discuss service failures with your team.

## Configuration 
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
