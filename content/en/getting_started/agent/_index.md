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

This guide provides an introduction to the Agent and how you can use it to send system level metrics to the Datadog platform. It walks through an example Agent installation on Ubuntu. It covers:

  - Agent installation
  - Verifying that the Agent is running
  - Configuring Agent features
  - Troubleshooting resources

## Overview

### About the Agent

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. It can run on your local hosts (Windows, MacOS), containerized environments (Docker, Kubernetes), and in on-premises data centers. You can install and configure it using configuration management tools (Chef, Puppet, Ansible). 

The Agent is able to collect 75 to 100 system level metrics every 15 to 20 seconds. With additional setup and configuration, the Agent can also send live processes, logs, and traces to the Datadog Platform. The Datadog Agent is open source and its source code is available on GitHub at [DataDog/datadog-agent][1].

### Agent overhead

The amount of space and resources the Agent takes up depends on the configuration and what data the Agent is configured to send. At the onset, you can expect around 0.08% CPU used on average with a disk space of roughly 830MB to 880MB. 

See [Agent Overhead][2] to learn more about these benchmarks.

### Data Collected

#### Agent metrics

The following Agent metrics are information the Agent sends to Datadog about itself, so that you can determine things like what hosts or containers have running Agents, when an Agent starts, and what version of Python it's running.

| Metric                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `datadog.agent.python.version` | Shows a value of `1` if the Agent is reporting to Datadog. The metric is tagged with the `python_version`. |
| `datadog.agent.running`        | Shows a value of `1` if the Agent is reporting to Datadog.                                                 |
| `datadog.agent.started        | A count sent with a value of `1` when the Agent starts (available in v6.12+).                                        |

See the [Agent Metrics][3] integration for a full list of Agent metrics.

#### Checks

Depending on your platform, the Agent has several core checks enabled by default that collect metrics.

| Check       | Metrics       | Platforms          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][4]  | All                |
| Disk        | [Disk][5]    | All                |
| IO          | [System][4]  | All                |
| Memory      | [System][4]  | All                |
| Network     | [Network][6] | All                |
| NTP         | [NTP][7]     | All                |
| Uptime      | [System][4]  | All                |
| File Handle | [System][4]  | All except Mac     |
| Load        | [System][4]  | All except Windows |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [System][4]  | Windows            |

To collect metrics from other technologies, see the [Integrations][9] page.

## Differences between Agents for hosts and containers

There are a few differences in the way the Agent runs in a containerized environment from how it runs on a host.

1. While on a host, the Agent is configured using a YAMLS file (as you will see later in this guide), the Agent configuration options for a container's Agent are passed in with [environment variables][10], for example:
    - `DD_API_KEY` for the Datadog API key
    - `DD_SITE` for the Datadog site

2. Similarly, while on a host, [integrations][9] are identified through the Agent configuration file, whereas in a container environment, integrations are automatically identified through Datadog's Autodiscovery feature. See [Basic Agent Autodiscovery][11] to learn more.

See the [Docker Agent][12] or [Kubernetes][13] for a walkthrough on running the Agent in a containerized environment.

## Why Should I Install the Agent?

The Agent needs to be installed to send data from any one of the many Agent based Integrations. The Agent is not necessarily required to forward data to the Datadog Platform, for example, you can send Logs and Metrics through the Datadog API. However, the Agent is the recommended method to forward your data to the Datadog Platform. 

The Agent collects host data every 15 seconds to provide an accurate understanding of what is happening across your environments. Additionally, it comes with over 50 default metrics to provide greater insight on system level data.

## Setup

### Prerequisites

1. Create a [Datadog account][14].

2. Have your [Datadog API key][15] on hand. 

3. Have the Datadog UI open.

**Note:** This walkthrough will be using the Ubuntu operating system. See the [Basic Agent Usage][16] page for a full list of supported platforms. 

### Installation

In the Datadog UI, go to the [Agent Installation Page][17] for Ubuntu, **Integrations > Agent** 

To install the Datadog Agent on a host, use the [one line install command][18] updated with your [Datadog API key][2]:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

### Validation

#### Terminal command

Run the Agent's [status command][19] to verify installation.

```shell
sudo datadog-agent status
```
A successful installation returns an Agent Status report that begins with Agent information like this:

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

In the Datadog UI, go to the Events Explorer Page **Events > Explorer**. The Agent sends events to Datadog when an Agent is started or restarted. The following message displays if your Agent successfully installs:

```text
Datadog agent (v. 7.XX.X) started on <Hostname>
```

#### Service checks

The Agent is set up to provide the following service checks:

  - `datadog.agent.up`:
    Returns `OK` if the Agent connects to Datadog.

  - `datadog.agent.check_status`:
    Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

These checks can be used in the Datadog Platform to visualize the Agent status through monitors and dashboards at a quick glance. See [Service Check Overview][20] to learn more.

#### Metrics

In the Datadog UI, go to the Metrics Summary page **Metrics > Summary** and search for the metric `datadog.agent.started` or the metric `datadog.agent.running`. If these metrics are not visible right away, it may take a few minutes for the Agent to send the data to the Datadog Platform.

Click on either of the metrics and a Metric panel opens to show additional metadata about where these metrics are collected from and any associated tags. Because so far in this walkthrough no tags are configured on this host, you should see only the default tags that Datadog assigns to the metrics including `version` and `host`. See the following section on Agent Configuration Files to learn more about how to add tags.

Explore other default metrics such as `ntp.offset` or `system.cpu.idle`.

## Agent Configuration Files

The Agent's main configuration file is `datadog.yaml`. The required parameters are:
- your [Datadog API key][15], which is used to associate your Agent's data with your organization, and 
- the Datadog site ({{< region-param key="dd_site" code="true" >}}). 

See the [sample config_template.yaml][21] for all available configuration options.

You can adjust the Agent configuration files to take advantage of other Datadog features including tags.

#### Setting Tags through the Agent Configuration file

Tags add an additional layer of metadata to your metrics and events. This allows you to scope and compare your data in Dataodg visualizations. When data is sent to Datadog from multiple hosts, tagging this information allows you to scope down to the data you are most interested in visualising. 

For example, let's say you have data that is collected from your staging and production environments and you are only interested in seeing the metrics from your production environment, tagging those specific hosts with either the `env:staging` or `env:production` tag gives you the ability to filter down to the metrics that are tagged with `env:production`. See [Getting Started with Tags][22] to learn more about tagging your data.

1. Locate your Agent's [main configuration file][23]. For Ubuntu, the file locations is `/etc/datadog-agent/datadog.yaml`.

2. In the `datadog.yaml` file, locate the `tags` parameter. Host level tags can be set in the `datadog.yaml` configuration to apply tags on all metrics, traces and logs forwarded from this host.

```yaml
## @param tags  - list of key:value elements - optional	
## @env DD_TAGS - space separated list of strings - optional
## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
##
## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
## tags to be set in a configuration file (`tags`), and additional tags to be added
## with an environment variable (`DD_EXTRA_TAGS`).
##
## Learn more about tagging: https://docs.datadoghq.com/tagging/
#
# tags:
#   - team:infra
#   - <TAG_KEY>:<TAG_VALUE>
```

3. Uncomment the tags parameter and the provided example `team:infra` tag. You can also add your own custom tag, for example `env:agent_walkthrough`. 
```yaml
## @param tags  - list of key:value elements - optional	
## @env DD_TAGS - space separated list of strings - optional
## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
##
## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
## tags to be set in a configuration file (`tags`), and additional tags to be added
## with an environment variable (`DD_EXTRA_TAGS`).
##
## Learn more about tagging: https://docs.datadoghq.com/tagging/
#
tags:
   - team:infra
   - env:agent_walkthrough
```

4. Restart the Agent by running the Agent’s [restart command][24]. The Ubuntu restart command:

```shell
sudo service datadog-agent restart
```

5. After a few minutes, go to the Metrics Summary page again **Metrics > Summary**, and click on the metric `datadog.agent.started`. In addition to the default `host` and `version` tags, you can also see the `team` tag and whatever personal tags you added. You can also filter metrics by the `Tag` field at the top of the page.

6. Go to the Events Explorer page **Events > Explorer** and find the custom tags displayed with the latest Agent Event. 

## Commands

See [Agent Commands][25] to [Start][26], [Stop][27] or [Restart][24] your Agent.

## Troubleshooting

For help troubleshooting the Agent:

- See [Agent Troubleshooting][28]
- View the [Agent Log Files][29]
- Contact [Datadog support][30]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Next steps

{{< whatsnext desc="After the Agent is installed:">}}
{{< nextlink href="/getting_started/integrations" >}}Learn about Integrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Learn about the Datadog UI{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Learn how to collect Logs through the Agent{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Learn how to collect Traces through the Agent{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /agent/basic_agent_usage/?tab=agentv6v7#agent-overhead
[3]: /integrations/agent_metrics/
[4]: /integrations/system/#metrics
[5]: /integrations/disk/#metrics
[6]: /integrations/network/#metrics
[7]: /integrations/ntp/#metrics
[8]: /agent/docker/data_collected/#metrics
[9]: /getting_started/integrations/
[10]: /agent/guide/environment-variables/#overview
[11]: /getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[12]: /agent/docker/?tab=standard
[13]: /agent/kubernetes/installation?tab=operator
[14]: https://www.datadoghq.com
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /agent/basic_agent_usage/?tab=agentv6v7
[17]: https://app.datadoghq.com/account/settings#agent/ubuntu
[18]: /tracing/
[19]: /agent/guide/agent-commands/#agent-status-and-information
[20]: /developers/service_checks/#visualize-your-service-check-in-datadog
[21]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[22]: /getting_started/tagging/
[23]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[24]: /agent/guide/agent-commands/#restart-the-agent
[25]: /agent/guide/agent-commands/
[26]: /agent/guide/agent-commands/#start-the-agent
[27]: /agent/guide/agent-commands/#stop-the-agent
[28]: /agent/troubleshooting/
[29]: /agent/guide/agent-log-files/
[30]: /help/
