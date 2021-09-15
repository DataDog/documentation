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

## Overview

The Agent is lightweight software installed on your hosts. It reports metrics and events from your host to Datadog using [integrations][1], [DogStatsD][2], or the [API][3]. With additional setup, the Agent can report [live processes][4], [logs][5], and [traces][6].

## Setup

If you haven't already, create a [Datadog account][7].

### Installation

The Agent can be installed on many different platforms either directly on the host or as a [containerized version][8]. Most systems have a one-line install option.

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}}

### Configuration

The Agent's [main configuration file][9] is `datadog.yaml`. The required parameters are your [Datadog API key][10] which is used to associate your Agent's data with your organization and the Datadog site ({{< region-param key="dd_site" code="true" >}}). See the [Datadog Agent configuration guide][11] or [sample config_template.yaml][12] for all available configuration options.

For the [container Agent][8], `datadog.yaml` configuration options are passed in with [environment variables][13], for example:

- `DD_API_KEY` for the Datadog API key
- `DD_SITE` for the Datadog site

### Validation

Run the Agent's [status command][14] to verify installation.

### Commands

See [Agent Commands][15] to [Start][16], [Stop][17] or [Restart][18] your Agent.

## Data Collected

### Metrics

#### Agent

The metrics below are available with Agent v6. For Agent v5, see the [Agent Metrics][19] integration.

| Metric                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **datadog.agent.python.version** | Shows a value of `1` if the Agent is reporting to Datadog. The metric is tagged with the `python_version`. |
| **datadog.agent.running**        | Shows a value of `1` if the Agent is reporting to Datadog.                                                 |
| **datadog.agent.started**        | A count sent with a value of `1` when the Agent starts (available in v6.12+).                                        |

#### Checks

Depending on your platform, the Agent has several core checks enabled by default that collect metrics.

| Check       | Metrics       | Platforms          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][20]  | All                |
| Disk        | [Disk][21]    | All                |
| Docker      | [Docker][22]  | Docker             |
| File Handle | [System][20]  | All except Mac     |
| IO          | [System][20]  | All                |
| Load        | [System][20]  | All except Windows |
| Memory      | [System][20]  | All                |
| Network     | [Network][23] | All                |
| NTP         | [NTP][24]     | All                |
| Uptime      | [System][20]  | All                |
| Winproc     | [System][20]  | Windows            |

To collect metrics from other technologies, see the [Integrations][25] page.

### Events

The Agent sends events to Datadog when an Agent is started or restarted.

### Service checks

**datadog.agent.up**:
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**:
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting

For help troubleshooting the Agent:

- See [Agent Troubleshooting][26]
- View the [Agent Log Files][27]
- Contact [Datadog support][28]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Next steps

{{< whatsnext desc="After the Agent is installed:">}}
{{< nextlink href="/getting_started/integrations" tag="Documentation" >}}Learn about Integrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" tag="Documentation" >}}Learn about the Datadog UI{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /integrations/
[2]: /metrics/dogstatsd_metrics_submission/
[3]: /api/
[4]: /infrastructure/process/
[5]: /logs/
[6]: /tracing/
[7]: https://www.datadoghq.com
[8]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[9]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: https://app.datadoghq.com/account/settings#api
[11]: /getting_started/agent/configuration/
[12]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[13]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
[14]: /agent/guide/agent-commands/#agent-status-and-information
[15]: /agent/guide/agent-commands/
[16]: /agent/guide/agent-commands/#start-the-agent
[17]: /agent/guide/agent-commands/#stop-the-agent
[18]: /agent/guide/agent-commands/#restart-the-agent
[19]: /integrations/agent_metrics/
[20]: /integrations/system/#metrics
[21]: /integrations/disk/#metrics
[22]: /agent/docker/data_collected/#metrics
[23]: /integrations/network/#metrics
[24]: /integrations/ntp/#metrics
[25]: /getting_started/integrations/
[26]: /agent/troubleshooting/
[27]: /agent/guide/agent-log-files/
[28]: /help/
