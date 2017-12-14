---
title: Basic Agent Usage for OS X
kind: documentation
platform: OS X
servicename: /usr/local/bin/datadog-agent
serviceinfoname: /usr/local/bin/datadog-agent info
configdirectory: ~/.datadog-agent/
logdirectory: /var/log/datadog/
supervisorlog: /var/log/datadog/supervisord.log
os: osx
aliases:
    - /guides/basic_agent_usage/osx/
---

## Overview

This page outlines the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[here](https://app.datadoghq.com/account/settings#agent/mac).  

By default, your Agent is installed in its own sandbox located at `/opt/datadog-agent`. You’re free to move this folder wherever you like.
However, we assume that the Agent is installed in its default location, so be sure to modify the instructions accordingly if you decide to move it to another location.

## Starting and Stopping the Agent
To manually start the Agent:
```
/usr/local/bin/datadog-agent start
```
To stop the Agent:
```
/usr/local/bin/datadog-agent stop
```
To restart the Agent and reload the configuration files:
```
/usr/local/bin/datadog-agent restart
```

## Status and Information
To check if the Agent is running: (since 3.8.0)
```
/usr/local/bin/datadog-agent status
```
To receive information about the Agent’s state:
```
/usr/local/bin/datadog-agent info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
/usr/local/bin/datadog-agent info -v
```
More information about the metrics, events, and service checks for an [integrations](/integrations) can be retrieved with the check command:
```
/usr/local/bin/datadog-agent check [integration]
```
Add the check_rate argument to get the most recent values for rates:
```
/usr/local/bin/datadog-agent check [integration] check_rate
```

## Configuration
The configuration file for the Agent is located at `~/.datadog-agent/datadog.conf`

Configuration files for integrations are located in `~/.datadog-agent/conf.d/`

## Troubleshooting
Try running the [info command](#status-and-information) to see the state of the Agent.

Logs for the subsystems are in the following files:

* `/var/log/datadog/supervisord.log` *(since 3.8.0)*
* `/var/log/datadog/collector.log`
* `/var/log/datadog/dogstatsd.log`
* `/var/log/datadog/forwarder.log`

If you're still having trouble, [our support team](/help) will be glad to provide further assistance.
