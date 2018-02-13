---
title: Basic Agent Usage for OS X
kind: documentation
platform: OS X
os: osx
aliases:
    - /guides/basic_agent_usage/osx/
---

## Overview

This page outlines the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[in the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent/mac).  

By default, your Agent is installed in its own sandbox located at `/opt/datadog-agent`. You’re free to move this folder wherever you like.
However, we assume that the Agent is installed in its default location, so be sure to modify the instructions accordingly if you decide to move it to another location.

## Commands

_lifecycle commands_ (former `datadog-agent start`/`stop`/`restart`/`status` on the Agent 5) are replaced by `launchctl` commands on the `com.datadoghq.agent` service, and should be run under the logged-in user. For these commands, you can also use the Datadog Agent systray app, all the other commands can still be run with the `datadog-agent` command (located in the `PATH` (`/usr/local/bin/`) by default)

{{% table responsive="true" %}}
| Agent v5                   |  Agent v6                                      | Notes                              |
| ---------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` or systray app | Start Agent as a service           |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` or systray app  | Stop Agent running as a service    |
| `datadog-agent restart`            | _run `stop` then `start`_ or systray app             | Restart Agent running as a service |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app  | Status of Agent service            |
| `datadog-agent info`               | `datadog-agent status` or web GUI                    | Status page of running Agent       |
| `datadog-agent flare`              | `datadog-agent flare` or web GUI                     | Send flare                         |
| _not implemented_                  | `datadog-agent --help`                               | Display command usage              |
| `datadog-agent check <check_name>` | `datadog-agent check <check_name>`                   | Run a check           |
{{% /table %}}


## Configuration

The configuration file for the Agent is located at:

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`~/.datadog-agent/datadog.conf`| `~/.datadog-agent/datadog.yaml` |

Configuration files for [integrations](/integrations):

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`~/.datadog-agent/conf.d/`|`~/.datadog-agent/conf.d/`|


## Troubleshooting

Run the Agent info command to see the state of the Agent.
The Agent logs are located in the `/var/log/datadog/` directory:

* For Agent v6 all logs are in the `agent.log` file
* For Agent v5 logs are in:
    
    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

If you're still having trouble, [our support team](/help) will be glad to provide further assistance.