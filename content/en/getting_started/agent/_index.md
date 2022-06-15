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

This guide provides an overview of the Agent and how you can use it to pull system level metrics into the Datadog Platform. It also provides a walkthrough of an example Agent installation on an Ubuntu environment covering:
- Agent Installation
- Verifying the Agent is running
- Useful Agent Commands
- Troubleshooting 

## Overview

### About the Agent

<!-- The Agent is software installed on your hosts. It reports metrics and events from your host to Datadog using [integrations][1], [DogStatsD][2], or the [API][3]. With additional setup, the Agent can report [live processes][4], [logs][5], and [traces][6]. -->

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. It can run on your local hosts (Windows, MacOS), containerized environments (Docker, Kubernetes), on premises data centers, and supports configuration management tools (Chef, Puppet, Ansible). The Agent is able to collect 75-100 system level metrics every 15-20 seconds providing a high resolution . With additional setup, the Agent can report live processes, logs, and traces. The Datadog Agent is open source and its source code is available on GitHub at DataDog/datadog-agent.

## Data Collected

### Metrics

#### Agent

The metrics below are available with Agent v6. For Agent v5, see the [Agent Metrics][7] integration.

| Metric                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **datadog.agent.python.version** | Shows a value of `1` if the Agent is reporting to Datadog. The metric is tagged with the `python_version`. |
| **datadog.agent.running**        | Shows a value of `1` if the Agent is reporting to Datadog.                                                 |
| **datadog.agent.started**        | A count sent with a value of `1` when the Agent starts (available in v6.12+).                                        |

#### Checks

Depending on your platform, the Agent has several core checks enabled by default that collect metrics.

| Check       | Metrics       | Platforms          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][8]  | All                |
| Disk        | [Disk][9]    | All                |
| Docker      | [Docker][10]  | Docker             |
| File Handle | [System][8]  | All except Mac     |
| IO          | [System][8]  | All                |
| Load        | [System][8]  | All except Windows |
| Memory      | [System][8]  | All                |
| Network     | [Network][11] | All                |
| NTP         | [NTP][12]     | All                |
| Uptime      | [System][8]  | All                |
| Winproc     | [System][8]  | Windows            |

To collect metrics from other technologies, see the [Integrations][13] page.

## Setup

If you haven't already, create a [Datadog account][14].

### Installation

The Agent can be installed on many different platforms either directly on the host or as a [containerized version][15]. Most systems have a one-line install option.

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}}

### Configuration

The Agent's [main configuration file][16] is `datadog.yaml`. The required parameters are your [Datadog API key][17] which is used to associate your Agent's data with your organization and the Datadog site ({{< region-param key="dd_site" code="true" >}}). See the [sample config_template.yaml][18] for all available configuration options.

For the [container Agent][15], `datadog.yaml` configuration options are passed in with [environment variables][19], for example:

- `DD_API_KEY` for the Datadog API key
- `DD_SITE` for the Datadog site

### Validation

Run the Agent's [status command][20] to verify installation.

### Commands

See [Agent Commands][21] to [Start][22], [Stop][23] or [Restart][24] your Agent.


### Events

The Agent sends events to Datadog when an Agent is started or restarted.

### Service checks

**datadog.agent.up**:
Returns `OK` if the Agent is able to connect to Datadog.

**datadog.agent.check_status**:
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting

For help troubleshooting the Agent:

- See [Agent Troubleshooting][25]
- View the [Agent Log Files][26]
- Contact [Datadog support][27]

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
[7]: /integrations/agent_metrics/
[8]: /integrations/system/#metrics
[9]: /integrations/disk/#metrics
[10]: /agent/docker/data_collected/#metrics
[11]: /integrations/network/#metrics
[12]: /integrations/ntp/#metrics
[13]: /getting_started/integrations/
[14]: https://www.datadoghq.com
[15]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[16]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[17]: https://app.datadoghq.com/organization-settings/api-keys
[18]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[19]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent#environment-variables
[20]: /agent/guide/agent-commands/#agent-status-and-information
[21]: /agent/guide/agent-commands/
[22]: /agent/guide/agent-commands/#start-the-agent
[23]: /agent/guide/agent-commands/#stop-the-agent
[24]: /agent/guide/agent-commands/#restart-the-agent
[25]: /agent/troubleshooting/
[26]: /agent/guide/agent-log-files/
[27]: /help/
