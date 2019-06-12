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
The Agent can be installed on many different platforms either directly on the host or as a [containerized version][8]. Most systems have a one-line install option.

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}}

### Configuration

{{< tabs >}}
{{% tab "Datadog US Site" %}}

The Agent's [main configuration file][1] is `datadog.yaml`. The only required parameter is your [Datadog API key][2] which is used to associate your Agent's data with your organization. See the [sample config_template.yaml][3] for all available configuration options.

For the [container Agent][4], `datadog.yaml` configuration options are passed in with [environment variables][5]. For example, the Datadog API key environment variable is `DD_API_KEY`.

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[5]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
{{% /tab %}}
{{% tab "Datadog EU Site" %}}

The Agent's [main configuration file][1] is `datadog.yaml`. The required parameters are your [Datadog API key][2] which is used to associate your Agent's data with your organization and the Datadog Site (`datadoghq.eu`). See the [sample config_template.yaml][3] for all available configuration options.

For the [container Agent][4], `datadog.yaml` configuration options are passed in with [environment variables][5], for example:

* `DD_API_KEY` for the Datadog API key
* `DD_SITE` for the Datadog site

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://app.datadoghq.eu/account/settings#api
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[5]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
{{% /tab %}}
{{< /tabs >}}

### Validation
Run the Agent's [status command][9] to verify installation.

### Commands
Refer to the [Agent Commands][10] page to [Start][11], [Stop][12] or [Restart][13] your Agent.

## Data Collected

### Metrics
By default, the Agent collects metrics with the following checks. To collect metrics from other technologies, see the [Integrations][14] page.

* [Disk][15]
* [Network][16]
* [NTP][17]
* [System][18]

### Events
The Agent sends events to Datadog when an Agent is started or restarted.

### Service Checks
**datadog.agent.up**:  
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**:  
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting
For help troubleshooting the Agent:

* Visit the [Agent Troubleshooting][19] page.
* View the [Agent Log Files][20]
* Contact [Datadog support][21]

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
[9]: /agent/guide/agent-commands/#agent-status-and-information
[10]: /agent/guide/agent-commands
[11]: /agent/guide/agent-commands/#start-the-agent
[12]: /agent/guide/agent-commands/#stop-the-agent
[13]: /agent/guide/agent-commands/#restart-the-agent
[14]: /getting_started/integrations
[15]: /integrations/disk
[16]: /integrations/network
[17]: /integrations/ntp
[18]: /integrations/system
[19]: /agent/troubleshooting
[20]: /agent/guide/agent-log-files
[21]: /help
