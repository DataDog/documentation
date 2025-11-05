---
title: Agent
description: Install and configure the Agent to collect data
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Collect your processes"
- link: "/tracing/"
  tag: "Documentation"
  text: "Collect your traces"
- link: "/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "Documentation"
  text: "Why install the Agent on cloud instances?"
- link: "https://www.datadoghq.com/blog/dont-fear-the-agent/"
  tag: "Blog"
  text: "Don't fear the Agent"
aliases:
  - /agent/faq/agent-check-directory-structure
  - /agent/faq/install-core-extra
  - /logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
  - /agent/faq/the-datadog-agent-for-logs-or-traces-only
  - /agent/basic_agent_usage/
  - /guides/basic_agent_usage/
  - /agent/faq/where-is-the-configuration-file-for-the-agent/
  - /agent/faq/log-location
cascade:
- _target:
    path: /agent/basic_agent_usage/chef
    lang: en
  tags: ['uninstall']
- _target:
    path: /infrastructure/**/*
    lang: en
  algolia:
    tags: ['agent']
    rank: 80
---

<div class="alert alert-info">
Agent v7 is available. <a href="/agent/versions/upgrade_to_agent_v7">Upgrade to the newest version</a> to benefit from all new functionality.
</div>

## Overview

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. The Datadog Agent is open source and its source code is available on GitHub at [DataDog/datadog-agent][1].

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog recommends you update Datadog Agent with every minor and patch release, or, at a minimum, monthly. </p>
<p>
Upgrading to a major Datadog Agent version and keeping it updated is the only supported way to get the latest Agent functionality and fixes.</p>
<p> **It is recommended to fully install the Agent.** However, a standalone DogStatsD package is available for Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE, and Ubuntu. This package is used in containerized environments where DogStatsD runs as a sidecar or environments running a DogStatsD server without full Agent functionality.</p>
</div>

## Managing the Agent

### Managing the Agent with Fleet Automation (recommended)
[Fleet Automation][15] is the primary, in-app workflow for installing, upgrading, configuring, and troubleshooting the Datadog Agent at scale.

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="The Fleet Automation view that allows you to centrally manage your Datadog Agents in one place." style="width:100%;">}}


- **View configuration & history**: View every Agent in your fleet, its version, enabled products, configuration files, and historical changes from a single page.
- **[Upgrade outdated Agents][13]**: Trigger remote upgrades for your Agents to keep your fleet updated in a few clicks.
- **[Send a flare for support][14]**: From the Support tab of a host, generate a flare and attach it to an existing or new Support case without having to use the command line.
- **Audit API-key usage**: Identify which Agents are using a specific API key and rotate keys safely.


### Datadog Agent Manager GUI

<div class="alert alert-info">The Agent GUI is not supported on 32-bit Windows platforms.</div>

Use the Datadog Agent Manager GUI to:
- View the status information for your Agent
- View all running checks
- View the Agent log
- Edit the Agent configuration file (`datadog.yaml`)
- Add or edit Agent checks
- Send flares

The Datadog Agent Manager GUI is enabled by default on Windows and macOS, and runs on port `5002`. Use the `datadog-agent launch-gui` command to open the GUI in your default web browser.

You can change the GUI's default port in your `datadog.yaml` configuration file. To disable the GUI, set the port's value to `-1`. On Linux, the GUI is disabled by default.

GUI requirements:
- Cookies must be enabled in your browser. The GUI generates and saves a token in your browser, which is used for authenticating all communications with the GUI server.
- To start the GUI, the user must have the required permissions. If you are able to open `datadog.yaml`, you are able to use the GUI.
- For security reasons, the GUI can **only** be accessed from the local network interface (`localhost`/`127.0.0.1`), therefore you must be on the host where the Agent is running. You can't run the Agent on a VM or a container and access it from the host machine.

### Command-line interface

From Agent 6 and later, the Agent command-line interface is based on subcommands. For a full list of Agent subcommands, see [Agent Commands][2].

## Getting further with the Datadog Agent

### Update the Agent

To manually update the Datadog Agent core between two minor versions on a given host, run the [corresponding installation command for your platform][7].

**Note**: If you want to manually update one specific Agent integration, see the [Integration Management guide][8].

### Configuration files

See the [Agent configuration files documentation][9].

### Datadog site

Edit the [Agent's main configuration file][10], `datadog.yaml`, to set the `site` parameter (defaults to `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Note**: See the [Getting Started with Datadog Sites documentation][11] for further details on the `site` parameter.

### Log location

See the [Agent log files documentation][12].

## Agent overhead

An example of the Datadog Agent resource consumption is below. Tests were made on an Amazon EC2 machine `c5.xlarge` instance (4 VCPU/ 8GB RAM) and comparable performance was seen for ARM64-based instances with similar resourcing. The vanilla `datadog-agent` was running with a process check to monitor the Agent itself. Enabling more integrations may increase Agent resource consumption.
Enabling JMX Checks forces the Agent to use more memory depending on the number of beans exposed by the monitored JVMs. Enabling the trace and process Agents increases the resource consumption as well.

* Agent Test version: 7.34.0
* CPU: ~ 0.08% of the CPU used on average
* Memory: ~ 130MB of RAM used (RSS memory)
* Network bandwidth: ~ 140 B/s ▼ | 800 B/s ▲
* Disk:
  * Linux 830MB to 880MB depending on the distribution
  * Windows: 870MB

**Log Collection**:

The results below are obtained from a collection of *110KB of logs per seconds* from a file with the [HTTP forwarder][6] enabled. It shows the evolution of resource usage for the different compression levels available.

{{< tabs >}}
{{% tab "HTTP compression level 6" %}}

* Agent Test version: 6.15.0
* CPU: ~ 1.5% of the CPU used on average
* Memory: ~ 95MB of RAM used.
* Network bandwidth: ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "HTTP compression level 1" %}}

* Agent Test version: 6.15.0
* CPU: ~ 1% of the CPU used on average
* Memory: ~ 95MB of RAM used.
* Network bandwidth: ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP Uncompressed" %}}

* Agent Test version: 6.15.0
* CPU: ~ 0.7% of the CPU used on average
* Memory: ~ 90MB of RAM used (RSS memory)
* Network bandwidth: ~ 200 KB/s ▲
 
{{% /tab %}}
{{< /tabs >}}


## Additional resources
{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: Install and configure the Cluster Agent for Kubernetes, a version of the Datadog Agent built to efficiently gather monitoring data from across an orchestrated cluster.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Install and configure the Datadog Agent on Amazon ECS.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: Install and configure the Datadog Agent with Amazon ECS on AWS Fargate{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: Install and configure the Datadog IoT Agent, a version of the Datadog Agent optimized for monitoring IoT devices and embedded applications.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Log Collection</u>: Enable and configure log collection in the Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>Proxy</u>: If your network configuration restricts outbound traffic, use a proxy for Agent traffic.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>Versions</u>: Agent 7 is the latest major version of the Datadog Agent. Learn about changes between major Agent versions and how to upgrade.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Troubleshooting</u>: Find troubleshooting information for the Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guides</u>: These are in-depth, step-by-step tutorials for using the Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Security</u>: Information on the main security capabilities and features available to customers to ensure their environment is secure.{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Configure Observability Pipelines and Datadog</u>: Deploy the Observability Pipelines Worker as an aggregator to collect, transform, and route all of your logs and metrics to any destination.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /agent/configuration/agent-commands/
[6]: /agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /agent/guide/integration-management/
[9]: /agent/configuration/agent-configuration-files/
[10]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /getting_started/site/
[12]: /agent/configuration/agent-log-files/
[13]: /agent/fleet_automation/remote_management/#remotely-upgrade-your-agents
[14]: /agent/troubleshooting/send_a_flare/?tab=agent#send-a-flare-from-the-datadog-site
[15]: /agent/fleet_automation
