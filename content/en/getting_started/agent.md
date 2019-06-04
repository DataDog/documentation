---
title: Getting Started with the Agent
kind: documentation
further_reading:
- link: "/agent/basic_agent_usage/"
  tag: "Documentation"
  text: "Basic Agent Usage"
- link: "/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "FAQ"
  text: "Why should I install the Datadog Agent on my cloud instances?"
---

## Overview
The Agent is lightweight software installed on your hosts. It reports metrics and events from your host to Datadog via [integrations][1], [DogStatsD][2], or the [API][3]. With additional setup, the Agent can report [live processes][4], [logs][5], and [traces][6].

## Setup
If you haven't already, create a [Datadog account][7].

### Installation
The Agent can be installed on many different platforms either directly on the host or as [containerized version][8]. Most systems have a one-line install option.

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}}

### Configuration
The Agent's [main configuration file][9] is `datadog.yaml`. The only required parameter is your [Datadog API key][10] which is used to associate your Agent's data with your organization. See the [sample config_template.yaml][11] for all available configuration options.

For the [container Agent][8], `datadog.yaml` configuration options are passed in with [environment variables][12]. For example, the Datadog API key environment variable is `DD_API_KEY`.

### Validation
Run the Agent's [status command][13] to verify installation.

### Commands
Refer to the [Agent Commands][14] page to [Start][15], [Stop][16] or [Restart][17] your Agent.

## Data Collected

### Metrics
By default, the Agent collects metrics with the following checks. To collect metrics from other technologies, see the [Integrations][18] page.

* [Disk][19]
* [Network][20]
* [NTP][21]
* [System][22]

### Events
The Agent sends events to Datadog when an Agent is started or restarted.

### Service Checks
**datadog.agent.up**:  
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**:  
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting
For help troubleshooting the Agent:

* Visit the [Agent Troubleshooting][23] page.
* View the [Agent Log Files][24]
* Contact [Datadog support][25]

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}
<p>

## Next Steps
{{< whatsnext desc="After the Agent is installed:">}}
    {{< nextlink href="/getting_started/integrations" tag="Documentation" >}}Learn about Integrations{{< /nextlink >}}
    {{< nextlink href="/getting_started" tag="Documentation" >}}Learn about the Datadog UI{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /integrations
[2]: /developers/dogstatsd
[3]: /api
[4]: /graphing/infrastructure/process
[5]: /logs
[6]: /tracing
[7]: https://www.datadoghq.com
[8]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[9]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[12]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
[13]: /agent/guide/agent-commands/#agent-status-and-information
[14]: /agent/guide/agent-commands
[15]: /agent/guide/agent-commands/#start-the-agent
[16]: /agent/guide/agent-commands/#stop-the-agent
[17]: /agent/guide/agent-commands/#restart-the-agent
[18]: /integrations
[19]: /integrations/disk
[20]: /integrations/network
[21]: /integrations/ntp
[22]: /integrations/system
[23]: /agent/troubleshooting
[24]: /agent/guide/agent-log-files
[25]: /help
