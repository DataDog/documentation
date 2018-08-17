---
title: Basic Agent Usage for Source Installation
kind: documentation
platform: Source
aliases:
    - /guides/basic_agent_usage/source/
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---
## Overview

This page outlines the basic features of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [in the Datadog Agent Integration page][1]. 

By default, your Agent is installed in its own sandbox at `~/.datadog-agent`. You're free to move this folder wherever you like. However, this article assumes that the Agent is installed in its default location, so be sure to modify the instructions accordingly if you decide to move them.

## Commands

Datadog Agent has some commands and only the _lifecycle commands_ (i.e. `start`/`stop`/`restart`/`status` on the Agent) should be run with `sudo`.

| Agent v5                                        | Agent v6                                | Notes                         |
| ----------------------------------------------- | --------------------------------------- | ----------------------------- |
| `sudo ~/.datadog-agent/bin/agent start`         | `sudo ./bin/agent/agent start`          | Start Agent                   |
| `sudo ~/.datadog-agent/bin/agent stop`          | `sudo ./bin/agent/agent  stop`          | Stop Agent                    |
| `sudo ~/.datadog-agent/bin/agent info`          | `sudo ./bin/agent/agent  info`          | Status page of running Agent  |
| `sudo ~/.datadog-agent/bin/agent flare`         | `sudo ./bin/agent/agent  flare`         | Send flare                    |
| `sudo ~/.datadog-agent/bin/agent help`          | `sudo ./bin/agent/agent  help`          | Display command usage         |

## Configuration

The configuration files and folders for the Agent are located at:

| Agent v5                     | Agent v6                          |
| :-----                       | :----                             |
| `/etc/dd-agent/datadog.conf` | `/etc/datadog-agent/datadog.yaml` |

Configuration files for [Integrations][2]:

| Agent v5                | Agent v6                     |
| :-----                  | :----                        |
| `/etc/dd-agent/conf.d/` | `/etc/datadog-agent/conf.d/` |

## Troubleshooting

Run the info or status command to see the state of the Agent.
The Agent logs are located in the `/var/log/datadog/` directory:

* For Agent v6 all logs are in the `agent.log` file
* For Agent v5 logs are in:
    
    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

If you're still having trouble, [our support team][3] is glad to provide further assistance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/source
[2]: /integrations
[3]: /help
