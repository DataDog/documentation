---
title: Datadog UNIX Agent for AIX
description: "Install and manage the Datadog UNIX Agent on IBM AIX systems for infrastructure monitoring and custom metrics collection."
further_reading:
- link: "/agent/architecture/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
- link: "https://www.datadoghq.com/blog/announcing-ibm-aix-agent/"
  tag: "Blog"
  text: "Monitor AIX with the Datadog UNIX Agent"
algolia:
  tags: ['uninstall', 'uninstalling']
---

This page covers the legacy Datadog UNIX Agent. Datadog recommends installing or upgrading to [Agent 7 on AIX][12] for the latest features and ongoing support. See [Supported Platforms][5] for the AIX versions that Agent 7 supports.

## Overview
The [Datadog UNIX Agent][4] brings host-level monitoring to IBM AIX (PowerPC 8+) so you can visualize system metrics, enable additional Datadog products, and troubleshoot services that still run on-prem.

The UNIX Agent supports Infrastructure Monitoring and Custom Metrics using [DogStatsD][11]. Other products, such as APM, Live Process Monitoring, Cloud Network Monitoring, and Log Management, are not supported on the UNIX Agent. See [Supported Platforms][5] for the complete list of supported AIX versions.

This page walks you through installing, operating, and removing the Datadog UNIX Agent on AIX.

## Installation

### Prerequisites
- Root privileges (or sudo) on each host
- Outbound HTTPS (443) to `.datadoghq.com`
- curl or ksh (shipped on AIX by default)
- Verify your host is running a [supported AIX version][5]

### Install the Agent

To install the Agent on AIX, run the following command, replacing `<DATADOG_API_KEY>` with your [Datadog API key][8]:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

### Installation log files

You can find the Agent installation log in the `dd-aix-install.log` file. To disable this logging, remove the `-e dd-aix-install.log` parameter in the installation command.

## Commands

| Description   | Command (as root)           |
|---------------|-----------------------------|
| Start Agent   | `startsrc -s datadog-agent` |
| Stop Agent    | `stopsrc -s datadog-agent`  |
| Status of Agent service | `lssrc -s datadog-agent`|
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

Alternatively, see the [datadog.yaml.example file][10] for all available configuration options.


### Integration files

Configuration files for integrations exist in `/etc/datadog-agent/conf.d/`.
Each integration has its own subdirectory, `<INTEGRATION>.d/`, that contains:
- `conf.yaml`: The active configuration controlling how the integration gathers metrics and logs
- `conf.yaml.example`: A sample illustrating supported keys and defaults


## Available integrations

Out-of-the-box integrations
: `cpu`
: `filesystem`
: `iostat`
: `load`
: `memory`
: `uptime`
: `disk`
: `network`

Additional integrations
: `process`
: `lparstats`
: `ibm_was` (WebSphere Application Server)


**Note:** Metric coverage can differ from the UNIX, Linux, Windows, and macOS integrations.


## Monitor Agent uptime

You can use the metric `datadog.agent.running` to monitor the uptime of an Agent. The metric emits a value of `1` if the Agent is reporting to Datadog.

## Uninstall the Agent

To remove an installed Agent, run the following `installp` command:

{{< code-block lang="shell" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

**Note:** Agent uninstallation logs can be found in the `dd-aix-uninstall.log` file. To disable this logging, remove the `-e` parameter in the uninstallation command.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/#access-the-datadog-site
[4]: https://github.com/DataDog/datadog-unix-agent/blob/master/README.md
[5]: /agent/supported_platforms/?tab=aix
[7]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-unix-agent/blob/master/docs/datadog.yaml.example
[11]: /extend/dogstatsd/?tab=hostagent
[12]: /agent/supported_platforms/aix/