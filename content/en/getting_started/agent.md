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

## Data Collected

### Metrics
By default, the Agent collects metrics from the following checks. To collect metrics from other technologies, see the [Integrations][9] page.

* [Disk][10]
* [Network][11]
* [NTP][12]
* [System][13]

### Events
The Agent send events to Datadog when an Agent is started or restarted.

### Service Checks
**datadog.agent.up**:  
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**:  
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Troubleshooting
Need help? Contact [Datadog support][14].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/infrastructure/process
[2]: /logs
[3]: /tracing
[4]: https://www.datadoghq.com
[5]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[8]: /agent/guide/agent-commands/#agent-status-and-information
[9]: /integrations
[10]: /integrations/disk
[11]: /integrations/network
[12]: /integrations/ntp
[13]: /integrations/system
[14]: /help
