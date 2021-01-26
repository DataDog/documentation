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

The Agent is lightweight software installed on your hosts. It reports metrics and events from your host to Datadog via [integrations][1], [DogStatsD][2], or the [API][3]. With additional setup, the Agent can report [live processes][4], [logs][5], and [traces][6].

## Setup

If you haven't already, create a [Datadog account][7].

### Installation

The Agent can be installed on many different platforms either directly on the host or as a [containerized version][8]. Most systems have a one-line install option.

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}}

### Configuration

The Agent's [main configuration file][9] is `datadog.yaml`. The required parameters are your [Datadog API key][10] which is used to associate your Agent's data with your organization and the Datadog site ({{< region-param key="dd_site" code="true" >}}). See the [sample config_template.yaml][11] for all available configuration options.

For the [container Agent][8], `datadog.yaml` configuration options are passed in with [environment variables][12], for example:

- `DD_API_KEY` for the Datadog API key
- `DD_SITE` for the Datadog site

### Validation

Run the Agent's [status command][13] to verify installation.

### Commands

Refer to the [Agent Commands][14] page to [Start][15], [Stop][16] or [Restart][17] your Agent.

## Data Collected

### Metrics

#### Agent

The metrics below are available with Agent v6. For Agent v5, see the [Agent Metrics][18] integration.

| Metric                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **datadog.agent.python.version** | Shows a value of `1` if the Agent is currently reporting to Datadog. The metric is tagged with the `python_version`. |
| **datadog.agent.running**        | Shows a value of `1` if the Agent is currently reporting to Datadog.                                                 |
| **datadog.agent.started**        | A count sent with a value of `1` when the Agent starts (available in v6.12+).                                        |

#### Checks

Depending on your platform, the Agent has several core checks enabled by default that collect metrics.

| Check       | Metrics       | Platforms          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][19]  | All                |
| Disk        | [Disk][20]    | All                |
| Docker      | [Docker][21]  | Docker             |
| File Handle | [System][19]  | All except Mac     |
| IO          | [System][19]  | All                |
| Load        | [System][19]  | All except Windows |
| Memory      | [System][19]  | All                |
| Network     | [Network][22] | All                |
| NTP         | [NTP][23]     | All                |
| Uptime      | [System][19]  | All                |
| Winproc     | [System][19]  | Windows            |

To collect metrics from other technologies, see the [Integrations][24] page.

### Events

The Agent sends events to Datadog when an Agent is started or restarted.

### Service checks

**datadog.agent.up**:
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**:
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting

For help troubleshooting the Agent:

- Visit the [Agent Troubleshooting][25] page.
- View the [Agent Log Files][26]
- Contact [Datadog support][27]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Next steps

{{< whatsnext desc="After the Agent is installed:">}}
{{< nextlink href="/getting_started/integrations" tag="Documentation" >}}Learn about Integrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" tag="Documentation" >}}Learn about the Datadog UI{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /integrations/
[2]: /developers/metrics/dogstatsd_metrics_submission/
[3]: /api/
[4]: /infrastructure/process/
[5]: /logs/
[6]: /tracing/
[7]: https://www.datadoghq.com
[8]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[9]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[12]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
[13]: /agent/guide/agent-commands/#agent-status-and-information
[14]: /agent/guide/agent-commands/
[15]: /agent/guide/agent-commands/#start-the-agent
[16]: /agent/guide/agent-commands/#stop-the-agent
[17]: /agent/guide/agent-commands/#restart-the-agent
[18]: /integrations/agent_metrics/
[19]: /integrations/system/#metrics
[20]: /integrations/disk/#metrics
[21]: /agent/docker/data_collected/#metrics
[22]: /integrations/network/#metrics
[23]: /integrations/ntp/#metrics
[24]: /getting_started/integrations/
[25]: /agent/troubleshooting/
[26]: /agent/guide/agent-log-files/
[27]: /help/
