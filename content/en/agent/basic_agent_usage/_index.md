---
title: Basic Agent Usage
aliases:
    - /guides/basic_agent_usage/
    - /agent/faq/where-is-the-configuration-file-for-the-agent/
    - /agent/faq/log-location
further_reading:
- link: "/agent/faq/how-datadog-agent-determines-the-hostname/"
  tag: "FAQ"
  text: "How does Datadog determine the Agent hostname?"
- link: "/agent/configuration/agent-commands/"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "/agent/configuration/agent-configuration-files/"
  tag: "FAQ"
  text: "Location of all Agent configuration files"
- link: "https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/"
  tag: "Blog"
  text: "Performance Improvements in the Datadog Agent Metrics Pipeline"
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Managing the Agent

You can manage your Agent installation using the Datadog Agent Manager GUI or from the command line.

### Datadog Agent Manager GUI

<div class="alert alert-info">The Agent GUI is not supported on 32-bit Windows platforms.</div>

Use the Datadog Agent Manager GUI to:
- View the status information for your Agent
- View all running checks
- View the Agent log
- Edit the Agent configuration file (`datadog.yaml`)
- Add or edit Agent checks
- Send flares

The Datadog Agent Manager GUI is enabled by default on Windows and macOS, and runs on port `5052`. Use the `datadog-agent launch-gui` command to open the GUI in your default web browser.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/troubleshooting/send_a_flare/
[2]: /agent/configuration/agent-commands/
[6]: /agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /agent/guide/integration-management/
[9]: /agent/configuration/agent-configuration-files/
[10]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /getting_started/site/
[12]: /agent/configuration/agent-log-files/
