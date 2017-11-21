---
title: Basic Agent Usage for Fedora
kind: documentation
platform: Fedora
servicename: /etc/init.d/datadog-agent
serviceinfoname: /etc/init.d/datadog-agent info
configdirectory: /etc/dd-agent/
logdirectory: /var/log/datadog/
supervisorlog: /var/log/supervisor/datadog-supervisord.log
aliases:
    - /guides/basic_agent_usage/fedora/
---

## Overview

This page outlines the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[here](https://app.datadoghq.com/account/settings#agent/fedora).

The process to upgrade from the previous version of the agent is to simply re-run the installation.

## Starting and Stopping the Agent

To manually start the Agent:
```shell
sudo /etc/init.d/datadog-agent start
```

To stop the Agent:
```shell
sudo /etc/init.d/datadog-agent stop
```

To restart the Agent and to reload the configuration files:
```shell
sudo /etc/init.d/datadog-agent restart
```

## Status and Information
To check if the Agent is running: *(since 3.8.0)*
```shell
sudo /etc/init.d/datadog-agent status
```
To receive information about the Agent’s state:
```shell
sudo /etc/init.d/datadog-agent info
```

Tracebacks for errors can be retrieved by setting the `-v` flag: (since 3.8.0)
```shell
sudo /etc/init.d/datadog-agent info -v
```

More information about the metrics, events and service checks for an integration can be retrieved with the check command:
```shell
sudo /etc/init.d/datadog-agent check [integration]
```

Add the check_rate argument to get the most recent values for rates:
```shell
sudo /etc/init.d/datadog-agent check [integration] check_rate
```

## Configuration
The configuration file for the Agent is located at `/etc/dd-agent/datadog.conf`

Configuration files for integrations are located in `/etc/dd-agent/conf.d/

## Troubleshooting

Try running the [info command](#status-and-information) to see the state of the Agent.
Logs for the subsystems are in the following files:

* `/var/log/supervisor/datadog-supervisord.log (since 3.8.0)`
* `/var/log/datadog/collector.log`
* `/var/log/datadog/dogstatsd.log`
* `/var/log/datadog/forwarder.log`

If you're still having trouble, [our support team](/help) will be glad to provide further assistance.

