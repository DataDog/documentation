---
title: Getting Started with the Agent
description: Guide to installing and configuring the Datadog Agent to collect system-level metrics, events, and logs from hosts.
further_reading:
    - link: "agent/"
      tag: "Documentation"
      text: "The Datadog Agent"
    - link: 'https://dtdg.co/fe'
      tag: 'Foundation Enablement'
      text: 'Join an interactive session to power up your Infrastructure monitoring'
    - link: '/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/'
      tag: 'FAQ'
      text: 'Why should I install the Datadog Agent on my cloud instances?'
---

## Overview

This guide introduces the Datadog Agent and covers:

  - [Introduction to the Agent](#the-datadog-agent)
  - [Installation](#installing-the-agent)
  - [Data collected by the Agent](#data-collected-by-the-agent)
  - [Advanced configurations and features](#advanced-configurations-and-features)
  - [Troubleshooting](#troubleshooting)


## What is the Datadog Agent?

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. 

The Agent can run on:
- Local hosts (Windows, MacOS), 
- Containerized environments (Docker, Kubernetes),
- On-premises data centers. 

You can also install and configure the Agent using configuration management tools like Chef, Puppet, or Ansible.

The Agent can collect 75-100 system-level metrics every 15-20 seconds. With additional configuration, it can send live data, logs, and traces from running processes to the Datadog Platform. The Datadog Agent is open source, and its source code is available on GitHub at [DataDog/datadog-agent][1].

### The Agent configuration file

The Agent's main configuration file is `datadog.yaml`. The required parameters are:
- Your [Datadog API key][16], which is used to associate the Agent's data with your organization. 
- Your [Datadog site][41] ({{< region-param key="dd_site" code="true" >}}).

See the [sample `config_template.yaml` file][23] for all available configuration options. You can adjust the Agent configuration files to take advantage of other Datadog features.


## Installation

### Prerequisites
1. Create a [Datadog account][15].

2. Have your [Datadog API key][16] on hand.

### Setup

Use [Fleet Automation][39], the Datadog in-app workflow, to install, upgrade, configure, and troubleshoot the Datadog Agent on a single host or at scale. 

See the [Agent documentation][40] for additional Agent configuriation for your specific platform.


## Data collected by the Agent

To give you full visibility into your infrastructure, the Datadog Agent reports metrics about its own health and configuration, as well as metrics gathered from your hosts and services through its default checks.

### Agent metrics

The Agent reports the following metrics to Datadog about itself. These metrics provide information about which hosts or containers have running Agents, when each Agent started, and the Python version the Agent is using.

| Metric                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `datadog.agent.python.version` | The metric is tagged with the `python_version`. |
| `datadog.agent.running`        | Shows a value of `1` if the Agent is reporting to Datadog.                                                 |
| `datadog.agent.started`        | A count sent with a value of `1` when the Agent starts (available in v6.12+).                                        |

See the [Agent Metrics][3] integration for a full list of Agent metrics.

### Checks

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



### Service checks

The Agent is set up to provide the following service checks:

  - `datadog.agent.up`: Returns **OK** if the Agent connects to Datadog.
  - `datadog.agent.check_status`: Returns **CRITICAL** if an Agent check is unable to send metrics to Datadog, otherwise returns **OK**.

These checks can be used in the Datadog Platform to visualize the Agent status through monitors and dashboards at a quick glance. See [Service Check Overview][21] to learn more.


## Advanced configurations and features

{{% collapse-content title="Differences between Agent for hosts and containers" level="h4" expanded=false id="id-for-anchoring" %}}

There are key differences between installing Agents on a host and in a containerized environment: 

- **Configuration differences**: 
    - **Host**: The Agent is configured using a YAML file.
    - **Container**: Configuration options are passed using [environment variables][10], for example:
    
    ```sh 
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **Integrations detection**: 
    - **Host**: [Integrations][9] are identified through the Agent configuration file
    - **Container**: Integrations are automatically identified using Datadog's Autodiscovery feature. See [Basic Agent Autodiscovery][11] to learn more.

Additionally, see the [Docker Agent][12] or [Kubernetes][13] for a walkthrough on running the Agent in a containerized environment.
{{% /collapse-content %}} 


{{% collapse-content title="Setting tags through the Agent configuration file" level="h4" expanded=false id="id-for-anchoring" %}}

Tags add an additional layer of metadata to your metrics and events. They allow you to scope and compare your data in Datadog visualizations. When data is sent to Datadog from multiple hosts, tagging this information allows you to scope down to the data you are most interested in visualizing.

For example, let's say you have data that is collected from different teams and you are only interested in seeing the metrics from team alpha, tagging those specific hosts with either the `team:alpha` or `team:bravo` tag gives you the ability to filter down to the metrics that are tagged with `team:alpha`. See [Getting Started with Tags][24] to learn more about tagging your data.

1. Locate your Agent's [main configuration file][25]. For Ubuntu, the file location is `/etc/datadog-agent/datadog.yaml`.

2. In the `datadog.yaml` file, locate the `tags` parameter. Host-level tags can be set in the `datadog.yaml` configuration to apply tags on all metrics, traces and logs forwarded from this host.

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

3. Uncomment the tags parameter and the provided example `team:infra` tag. You can also add your own custom tag, for example `test:agent_walkthrough`.
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
      - test:agent_walkthrough
   ```

4. Restart the Agent by running the Agent's [restart command][26]. The Ubuntu restart command:

   ```shell
   sudo service datadog-agent restart
   ```

5. After a few minutes, go to the [Metrics Summary page][22] again, and click on the metric `datadog.agent.started`. In addition to the default `host` and `version` tags, you can also see the `team` tag and any personal tags you added. You can also filter metrics by the `Tag` field at the top of the page.

6. Go to the [Events Explorer page][20] and find the custom tags displayed with the latest Agent Event.

{{% /collapse-content %}} 

{{% collapse-content title="Finding metrics in the Datadog UI" level="h4" expanded=false id="id-for-anchoring" %}}

In the Datadog UI, go to the [Metrics Summary page][22] and search for the metric `datadog.agent.started` or the metric `datadog.agent.running`. If these metrics are not visible right away, it may take a few minutes for the Agent to send the data to the Datadog Platform.

Click on either of the metrics and a Metric panel opens up. This panel shows additional metadata about where these metrics are collected from and any associated tags. Because so far in this walkthrough no tags are configured on this host, you should see only the default tags that Datadog assigns to the metrics including `version` and `host`. See the following section on Agent Configuration Files to learn more about how to add tags.

Explore other default metrics such as `ntp.offset` or `system.cpu.idle`.
{{% /collapse-content %}} 


{{% collapse-content title="Agent overhead" level="h4" expanded=false id="id-for-anchoring" %}}

The amount of space and resources the Agent takes up depends on the configuration and what data the Agent is configured to send. At the onset, you can expect around 0.08% CPU used on average with a disk space of roughly 880MB to 1.3GB.

See [Agent Overhead][2] to learn more about these benchmarks.
{{% /collapse-content %}}

{{% collapse-content title="Additional configuration options" level="h4" expanded=false id="id-for-anchoring" %}}

The collection of [logs][27], [traces][28], and [processes][29] data can be enabled through the Agent configuration file. These are not features that are enabled by default. For example, in the configuration file, the `logs_enabled` parameter is set to false.

```yaml
##################################
## Log collection Configuration ##
##################################

## @param logs_enabled - boolean - optional - default: false
## @env DD_LOGS_ENABLED - boolean - optional - default: false
## Enable Datadog Agent log collection by setting logs_enabled to true.
#
# logs_enabled: false
```

Other Datadog features that can be configured through the Agent configuration file include:
- Enabling [OTLP Trace Ingestion][30]
- [Customizing log collection][31] to filter or scrub sensitive data
- Configuring custom data through [DogStatsD][32]

Throughout your setup, when the documentation refers to the `datadog.yaml` file or the Agent configuration file, this is the file you need to configure.

{{% /collapse-content %}} 


## Commands

See [Agent Commands][33] to [Start][34], [Stop][35] or [Restart][26] your Agent.

## Troubleshooting

For help troubleshooting the Agent:

- See [Agent Troubleshooting][36]
- View the [Agent Log Files][37]
- Contact [Datadog support][38]

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
[14]: /getting_started/agent/#checks
[15]: https://www.datadoghq.com
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: /agent/supported_platforms
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /developers/service_checks/#visualize-your-service-check-in-datadog
[22]: https://app.datadoghq.com/metric/summary
[23]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[24]: /getting_started/tagging/
[25]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[26]: /agent/configuration/agent-commands/#restart-the-agent
[27]: /logs/
[28]: /tracing/
[29]: /infrastructure/process/?tab=linuxwindows#introduction
[30]: /opentelemetry/otlp_ingest_in_the_agent/?tab=host
[31]: /agent/logs/advanced_log_collection/
[32]: /developers/dogstatsd/?tab=hostagent
[33]: /agent/configuration/agent-commands/
[34]: /agent/configuration/agent-commands/#start-the-agent
[35]: /agent/configuration/agent-commands/#stop-the-agent
[36]: /agent/troubleshooting/
[37]: /agent/configuration/agent-log-files/
[38]: /help/
[39]: /agent/fleet_automation/
[40]: /agent/?tab=Host-based
[41]: /getting_started/site/
