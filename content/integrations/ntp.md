---
title: Datadog-NTP Check Integration
integration_title: NTP Check
kind: integration
doclevel: basic
newhlevel: true
---

# Overview

The Network Time Protocol (NTP) integration is enabled by default and reports the time offset from an ntp server every 15 minutes.

# Installation

No installation steps are required for this integration.

# Configuration

1.  The ntp check is enabled by default. If you would like to make any changes to the configuration, move `ntp.yaml.default` to `ntp.yaml` and edit:

        init_config:

        instances:
          - offset_threshold: 60

1.  Restart the agent

## Configuration Options

* `host` (Optional) - Host name of alternate ntp server, for example `pool.ntp.org`
* `port` (Optional) - What port to use
* `version` (Optional) - ntp version
* `timeout` (Optional) - Response timeout

# Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:



    Checks
    ======
      [...]
      ntp
      -----
          - instance #0 [OK]
          - Collected 1 metric & 0 events

# Usage

# Metrics

|**ntp.offset**<br>(gauge) | Offset in seconds from the ntp server|
{: .table}


# Events

No events are included with this integration.

