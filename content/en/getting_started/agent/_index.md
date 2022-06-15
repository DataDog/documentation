---
title: Getting Started with the Agent
kind: documentation
aliases:
    - /getting_started/agent
further_reading:
    - link: '/agent/basic_agent_usage/'
      tag: 'Documentation'
      text: 'Basic Agent Usage'
    - link: '/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/'
      tag: 'FAQ'
      text: 'Why should I install the Datadog Agent on my cloud instances?'
---

This guide provides a high level overview and introduction of the Agent and how you can use it to pull system level metrics into the Datadog Platform. It also provides a walkthrough of an example Agent installation on an Ubuntu environment covering:
- Agent Installation
- Verifying the Agent is running
- Useful Agent Commands
- Troubleshooting 

## Overview

### About the Agent

<!-- The Agent is software installed on your hosts. It reports metrics and events from your host to Datadog using [integrations][1], [DogStatsD][2], or the [API][3]. With additional setup, the Agent can report [live processes][4], [logs][5], and [traces][6]. -->

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. It can run on your local hosts (Windows, MacOS), containerized environments (Docker, Kubernetes), on premises data centers, and supports configuration management tools (Chef, Puppet, Ansible). The Agent is able to collect 75-100 system level metrics every 15-20 seconds. With additional setup and configuration, the Agent can also report live processes, logs, and traces. The Datadog Agent is open source and its source code is available on GitHub at DataDog/datadog-agent.

### Agent Overhead

The amount of space and resources the Agent takes up will depend on the configuration and what data the Agent pulls. At the onset, you can expect around 0.08% CPU used on average with a disk spalce of roughly 830MB to 880MB. 

See the [Agent Overhead][7] to learn more about these benchmarks.

### Data Collected

#### Agent Metrics

<!-- The metrics below are available with Agent v6. For Agent v5, see the [Agent Metrics][8] integration. -->

| Metric                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **datadog.agent.python.version** | Shows a value of `1` if the Agent is reporting to Datadog. The metric is tagged with the `python_version`. |
| **datadog.agent.running**        | Shows a value of `1` if the Agent is reporting to Datadog.                                                 |
| **datadog.agent.started**        | A count sent with a value of `1` when the Agent starts (available in v6.12+).                                        |

#### Checks

Depending on your platform, the Agent has several core checks enabled by default that collect metrics.

| Check       | Metrics       | Platforms          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][9]  | All                |
| Disk        | [Disk][10]    | All                |
| Docker      | [Docker][11]  | Docker             |
| File Handle | [System][9]  | All except Mac     |
| IO          | [System][9]  | All                |
| Load        | [System][9]  | All except Windows |
| Memory      | [System][9]  | All                |
| Network     | [Network][12] | All                |
| NTP         | [NTP][13]     | All                |
| Uptime      | [System][9]  | All                |
| Winproc     | [System][9]  | Windows            |

To collect metrics from other technologies, see the [Integrations][14] page.

To collect Logs, Traces, and Processes, these features need to be enabled through the Agent Configuration file.

## Containerized Environments

There are a few differences in the way the Agent runs in a containerized environment. 

1. The Agent configuration options are passed in with [Environment Variables][15], for example:
    - `DD_API_KEY` for the Datadog API key
    - `DD_SITE` for the Datadog site
2. Integrations are automatically identified through Datadog's Autodiscovery feature. See [Basic Agent Autodiscovery][16] to learn more.

## Why Should I Install the Agent?

In order to pull data from any one of our Agent based Integrations, you will need to install the Agent. The Agent is not necessarily required to forward all data to Datadog, for example, you can send Logs and Metrics through the Datadog API. However, the Agent is the recommended method to forward your data to the Datadog Platform. 

The Agent samples host data  every 15 seconds to provide a more accurate understanding of what is happening across your environments. Additionally, it comes with over 50 default metrics to provide greater insight on system level data.

## Setup

### Prerequisites

1. Create a [Datadog account][17].
2. You will need access to your [Datadog API key][18]. 
3. Have the Datadog UI open.
4. Set up a [Vagrant Ubuntu 16.04 virtual machine][19] using the following commands. For more information about Vagrant, see their [Getting Started][20] page. 

**Note** This step is optional, you can use any other platforms listed in the [Basic Agent Usage][21] page. This walkthrough will be using the Ubuntu platform.

```text
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

### Installation

<!-- The Agent can be installed on many different platforms either directly on the host or as a [containerized version][22]. Most systems have a one-line install option.

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}} -->

In the Datadog UI, go to the [Agent Installation Page][23] for Ubuntu, **Integrations > Agent** 

To install the Datadog Agent on a host, use the [one line install command][6] updated with your [Datadog API key][7]:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

### Validation

#### Terminal Command

Run the Agent's [status command][24] to verify installation.

```shell
sudo datadog-agent status
```
A successfull installation will return an Agent Status report that begins with Agent information like this:

```shell
===============
Agent (v7.36.1)
===============

  Status date: 2022-06-15 15:54:48.364 EDT / 2022-06-15 19:54:48.364 UTC (1655322888364)
  Agent start: 2022-06-15 15:54:29.85 EDT / 2022-06-15 19:54:29.85 UTC (1655322869850)
  Pid: 9801
  Go Version: go1.17.6
  Python Version: 3.8.11
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 6
  Log Level: info
```

#### Events

In the Datadog UI, go to the Events Explorer Page **Events > Explorer**. The Agent sends events to Datadog when an Agent is started or restarted. The following message will display if your Agent successfully installed:

```text
Datadog agent (v. 7.XX.X) started on <Hostname>
```

### Service Checks

The Agent is set up to provide the following service checks:
**datadog.agent.up**:
Returns `OK` if the Agent is able to connect to Datadog.

**datadog.agent.check_status**:
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

These checks can be used in the Datadog Platform to visualize the Agent status through Monitors and Dashboards at a quick glance. See [Service Check Overview][] to learn more.

#### Metrics

In the Datadog UI, go to the Metrics Summary page **Metrics > Summary** and search for the metric **datadog.agent.started** or the metric **datadog.agent.running**. If these metrics are not visible right away, it may take a few minutes to the Agent to send the data to the Datadog Platform.

Click on either of the metrics and notice 

### Configuration

The Agent's [main configuration file][25] is `datadog.yaml`. The required parameters are your [Datadog API key][18] which is used to associate your Agent's data with your organization and the Datadog site ({{< region-param key="dd_site" code="true" >}}). See the [sample config_template.yaml][26] for all available configuration options.

For the [container Agent][22], `datadog.yaml` configuration options are passed in with [environment variables][15], for example:

- `DD_API_KEY` for the Datadog API key
- `DD_SITE` for the Datadog site


### Commands

See [Agent Commands][27] to [Start][28], [Stop][29] or [Restart][30] your Agent.


### Events

The Agent sends events to Datadog when an Agent is started or restarted.

### Service checks

**datadog.agent.up**:
Returns `OK` if the Agent is able to connect to Datadog.

**datadog.agent.check_status**:
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting

For help troubleshooting the Agent:

- See [Agent Troubleshooting][31]
- View the [Agent Log Files][32]
- Contact [Datadog support][33]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Next steps

{{< whatsnext desc="After the Agent is installed:">}}
{{< nextlink href="/getting_started/integrations" >}}Learn about Integrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Learn about the Datadog UI{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /integrations/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: /api/
[4]: /infrastructure/process/
[5]: /logs/
[6]: /tracing/
[7]: /agent/basic_agent_usage/?tab=agentv6v7#agent-overhead
[8]: /integrations/agent_metrics/
[9]: /integrations/system/#metrics
[10]: /integrations/disk/#metrics
[11]: /agent/docker/data_collected/#metrics
[12]: /integrations/network/#metrics
[13]: /integrations/ntp/#metrics
[14]: /getting_started/integrations/
[15]: /agent/guide/environment-variables/#overview
[16]: /getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[17]: https://www.datadoghq.com
[18]: https://app.datadoghq.com/organization-settings/api-keys
[19]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[20]: https://www.vagrantup.com/intro/getting-started
[21]: /agent/basic_agent_usage/?tab=agentv6v7
[22]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[23]: https://app.datadoghq.com/account/settings#agent/ubuntu
[24]: /agent/guide/agent-commands/#agent-status-and-information
[25]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[26]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[27]: /agent/guide/agent-commands/
[28]: /agent/guide/agent-commands/#start-the-agent
[29]: /agent/guide/agent-commands/#stop-the-agent
[30]: /agent/guide/agent-commands/#restart-the-agent
[31]: /agent/troubleshooting/
[32]: /agent/guide/agent-log-files/
[33]: /help/
