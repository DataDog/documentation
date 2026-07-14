---
title: Source Installation
description: "Learn how to install, configure, and manage the Datadog Agent when building from source code."
platform: Source
aliases:
    - /guides/basic_agent_usage/source/
    - /agent/basic_agent_usage/source/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Collect your processes"
- link: "/tracing/"
  tag: "Documentation"
  text: "Collect your traces"
- link: "/agent/architecture/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
algolia:
  tags: ['uninstall', 'uninstalling']
---
## Overview

This page outlines the basic features of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [in the Datadog Agent Integration page][1].

By default, your Agent is installed in its own sandbox at `~/.datadog-agent`. You're free to move this folder anywhere. However, this article assumes that the Agent is installed in its default location, so be sure to modify the instructions accordingly if you decide to move them.

## Commands

Datadog Agent has some commands and only the _lifecycle commands_, such as `start`/`stop`/`restart`/`status`, should be run with `sudo`.

| Description                   | Command                                 |
| ----------------------------- | --------------------------------------- |
| Start Agent                   | `sudo ./bin/agent/agent start`          |
| Stop Agent                    | `sudo ./bin/agent/agent  stop`          |
| Status page of running Agent  | `sudo ./bin/agent/agent  info`          |
| Send flare                    | `sudo ./bin/agent/agent  flare`         |
| Display command usage         | `sudo ./bin/agent/agent  help`          |

## Configuration

The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml`

Configuration files for [Integrations][2]:

* `/etc/datadog-agent/conf.d/`

## Troubleshooting

See the [Agent Troubleshooting documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=source
[2]: /integrations/
[3]: /agent/troubleshooting/

