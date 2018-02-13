---
title: Basic Agent Usage for SUSE
kind: documentation
platform: SUSE
aliases:
    - /guides/basic_agent_usage/suse/
---

## Overview

This page outlines the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[in the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent/centos).

The process to upgrade from the previous version of the agent is to re-run the installation.


## Commands

Datadog Agent has some commands and only the _lifecycle commands_ (i.e. `start`/`stop`/`restart`/`status` on the Agent service) should be run with `sudo service`/`sudo initctl`/`sudo systemctl`, all other commands need to be run with the `datadog-agent` command.

{{% table responsive="true" %}}
| Agent v5                                  |  Agent v6                          | Notes
| ----------------------------------------------- | --------------------------------------- | ----------------------------- |
| `sudo service datadog-agent start`              | `sudo service datadog-agent start`      | Start Agent as a service |
| `sudo service datadog-agent stop`               | `sudo service datadog-agent stop`       | Stop Agent running as a service |
| `sudo service datadog-agent restart`            | `sudo service datadog-agent restart`    | Restart Agent running as a service |
| `sudo service datadog-agent status`             | `sudo service datadog-agent status`     | Status of Agent service |
| `sudo service datadog-agent info`               | `sudo datadog-agent status`             | Status page of running Agent |
| `sudo service datadog-agent flare`              | `sudo datadog-agent flare`              | Send flare |
| `sudo service datadog-agent`                    | `sudo datadog-agent --help`             | Display command usage |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent --datadog-agent check <check_name>` | Run a check |
{{% /table %}}

More information about the metrics, events, and service checks for an [integrations](/integrations) can be retrieved with the check command:
```shell
sudo service datadog-agent check [integration]
```

Add the check_rate argument to get the most recent values for rates:
```shell
sudo service datadog-agent check [integration] check_rate
```

**NB**: If `service` is not available on your system, use:

* on `upstart`-based systems: `sudo start/stop/restart datadog-agent`
* on `systemd`-based systems: `sudo systemctl start/stop/restart datadog-agent`
* on `initctl`-based systems: `sudo initctl start/stop/restart datadog-agent`

## Configuration

The configuration file for the Agent is located at:

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/datadog.conf`| `/etc/datadog-agent/datadog.yaml` |

Configuration files for [integrations](/integrations):

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/conf.d/`|`/etc/datadog-agent/conf.d/`|

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