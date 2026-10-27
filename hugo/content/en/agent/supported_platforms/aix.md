---
title: AIX
description: "Install and manage the Datadog Agent on IBM AIX systems."
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
- link: "/extend/dogstatsd/"
  tag: "Documentation"
  text: "Send custom metrics with DogStatsD"
- link: "/agent/architecture/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
aliases:
  - /agent/basic_agent_usage/aix/
algolia:
  tags: ['uninstall', 'uninstalling']
---

This page covers Agent 7 on AIX. For AIX versions earlier than 7.2 TL5, see the legacy [Datadog UNIX Agent][12].

## Overview
The Datadog Agent brings host-level monitoring to IBM AIX (PowerPC 8+) so you can visualize system metrics, enable additional Datadog products, and troubleshoot services that still run on-prem.

**Note**: JMX-based integrations, container and Kubernetes checks, eBPF-based checks, Cloud Network Monitoring, remote configuration updates, and remote Agent updates are not supported on AIX.

See [Supported Platforms][5] for the complete list of supported AIX versions.

This page walks you through installing, operating, and removing the Datadog Agent on AIX.

## Installation

### Prerequisites
- Root privileges (or sudo) on each host
- Outbound HTTPS (443) to `.datadoghq.com`
- curl or ksh (shipped on AIX by default)
- Verify your host is running a [Supported AIX version][5]

### Install the Agent

To install the Agent on AIX, follow the [in-app instructions in Fleet Automation][6], and run the generated script on your hosts.

{{< img src="/agent/basic_agent_usage/aix_img2_july_25.png" alt="The Datadog Agent installation step for AIX hosts." style="width:90%;">}}



### Installation log files

You can find the Agent installation log in the `dd-aix-install.log` file. To disable this logging, remove the `-e dd-aix-install.log` parameter in the installation command.

## Commands

| Description   | Command (as root)           |
|---------------|-----------------------------|
| Start Agent   | `startsrc -g datadog-agent` |
| Stop Agent    | `stopsrc -g datadog-agent`  |
| Status of Agent services | `lssrc -g datadog-agent`|
| Agent status page | `datadog-agent status`      |
| Send flare | `datadog-agent flare` |
| Show all commands | `datadog-agent --help`  |


## Configure the Agent

The [Datadog Agent configuration file][7] is located in `/etc/datadog-agent/datadog.yaml`. This YAML file holds the host-wide connection details used to send data to Datadog including:
- `api_key`: Your organization's [Datadog API key][8]
- `site`: Target Datadog region (see [Datadog Sites][1])
- `proxy`: HTTP/HTTPS proxy endpoints for outbound traffic (see [Datadog Agent Proxy Configuration][9])
- Default tags, log level, and Datadog configurations

A fully commented reference file, located in `/etc/datadog-agent/datadog.yaml.example`, lists every available option for comparison or to copy and paste.

Alternatively, see the [datadog-agent_aix.yaml.example file][10] for all available configuration options.


### Integration files

Configuration files for integrations exist in `/etc/datadog-agent/conf.d/`.
Each integration has its own subdirectory, `<INTEGRATION>.d/`, that contains:
- `conf.yaml`: The active configuration controlling how the integration gathers metrics and logs
- `conf.yaml.example`: A sample illustrating supported keys and defaults

To request support for an integration on AIX, open a feature request with [Datadog Support][13].

## Monitor Agent uptime

You can use the metric `datadog.agent.running` to monitor the uptime of an Agent. The metric emits a value of `1` if the Agent is reporting to Datadog.

## Uninstall the Agent

To remove an installed Agent, run the following `installp` command:

{{< code-block lang="shell" >}}
installp -u datadog-agent
{{< /code-block >}}

Uninstalling the Agent removes the Agent services and the boot entry.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/#access-the-datadog-site
[5]: /agent/supported_platforms/?tab=aix
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aix
[7]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_aix.yaml.example
[12]: /agent/guide/install-unix-agent-aix/
[13]: /help/