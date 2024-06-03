---
title: Basic Agent Usage for Source Installation
kind: documentation
platform: Source
aliases:
    - /guides/basic_agent_usage/source/
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
- link: "/agent/basic_agent_usage/#agent-architecture"
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

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Description                   | Command                                 |
| ----------------------------- | --------------------------------------- |
| Start Agent                   | `sudo ./bin/agent/agent start`          |
| Stop Agent                    | `sudo ./bin/agent/agent  stop`          |
| Status page of running Agent  | `sudo ./bin/agent/agent  info`          |
| Send flare                    | `sudo ./bin/agent/agent  flare`         |
| Display command usage         | `sudo ./bin/agent/agent  help`          |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                   | Command                                 |
| ----------------------------- | --------------------------------------- |
| Start Agent                   | `sudo ~/.datadog-agent/bin/agent start` |
| Stop Agent                    | `sudo ~/.datadog-agent/bin/agent stop`  |
| Status page of running Agent  | `sudo ~/.datadog-agent/bin/agent info`  |
| Send flare                    | `sudo ~/.datadog-agent/bin/agent flare` |
| Display command usage         | `sudo ~/.datadog-agent/bin/agent help`  |

{{% /tab %}}
{{< /tabs >}}

## Configuration

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml`

Configuration files for [Integrations][1]:

* `/etc/datadog-agent/conf.d/`

[1]: /integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

The configuration files and folders for the Agent are located in:

* `/etc/dd-agent/datadog.conf`

Configuration files for [Integrations][1]:

* `/etc/dd-agent/conf.d/`

[1]: /integrations/
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

See the [Agent Troubleshooting documentation][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=source
[2]: /agent/troubleshooting/
