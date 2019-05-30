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
The Agent is lightweight software installed on your hosts. It reports metrics and events from your host to Datadog. With additional setup, the Agent can report [live processes][1], [logs][2], and [traces][3].

## Setup
If you haven't already, create a [Datadog account][4].

### Installation
The Agent can be installed on many different platforms. Most systems have a one-line install option.

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}}

### Configuration
The Agent's [main configuration file][5] is `datadog.yaml`. The only required parameter is your [Datadog API key][6] which is used to associate your Agent's data with your organization. See the [sample config_template.yaml][7] for all available configuration options.

### Validation
Run the Agent's [status command][8] to verify installation.

### Commands
Refer to the [Agent Commands][9] page to [Start][10], [Stop][11] or [Restart][12] your Agent.

## Data Collected

### Metrics
By default, the Agent collects metrics with the following checks. To collect metrics from other technologies, see the [Integrations][13] page.

* [Disk][14]
* [Network][15]
* [NTP][16]
* [System][17]

### Events
The Agent sends events to Datadog when an Agent is started or restarted.

### Service Checks
**datadog.agent.up**:  
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**:  
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting
For help troubleshooting the Agent:

* Visit the [Agent Troubleshooting][18] page.
* View the [Agent Log Files][19]
* Contact [Datadog support][20]

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}
<p>

## Next Steps
{{< whatsnext desc="After the Agent is installed:">}}
    {{< nextlink href="/getting_started/integrations" tag="Documentation" >}}Learn about Integrations{{< /nextlink >}}
    {{< nextlink href="/getting_started" tag="Documentation" >}}Learn about the Datadog UI{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /graphing/infrastructure/process
[2]: /logs
[3]: /tracing
[4]: https://www.datadoghq.com
[5]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[8]: /agent/guide/agent-commands/#agent-status-and-information
[9]: /agent/guide/agent-commands
[10]: /agent/guide/agent-commands/#start-the-agent
[11]: /agent/guide/agent-commands/#stop-the-agent
[12]: /agent/guide/agent-commands/#restart-the-agent
[13]: /integrations
[14]: /integrations/disk
[15]: /integrations/network
[16]: /integrations/ntp
[17]: /integrations/system
[18]: /agent/troubleshooting
[19]: /agent/guide/agent-log-files
[20]: /help
