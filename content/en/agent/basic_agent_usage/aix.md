---
title: Basic Agent Usage for AIX
further_reading:
- link: "/agent/basic_agent_usage/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
- link: "https://www.datadoghq.com/blog/announcing-ibm-aix-agent/"
  tag: "Blog"
  text: "Monitor AIX with the Datadog Unix Agent"
algolia:
  tags: ['uninstall', 'uninstalling']
---

<div class="alert alert-info">
The Datadog UNIX Agent is being developed for specific system architectures, and is not the same as the Windows, Linux, and MacOS Agents.
</div>

This page outlines the installation and configuration of the Datadog UNIX Agent for AIX.

**Note:** The Datadog Unix Agent supports PowerPC 8 or greater and the following versions of AIX:

* AIX 6.1 TL9 SP6+
* AIX 7.1 TL5 SP3+
* AIX 7.2 TL3 SP0+

## Installation

A one-step ksh install script is provided on the [Agent download page][1] within Datadog. The script supports the following environment variables:

* **CHANNEL**: defaults to stable. Specifies the package repository channel.
  * Values: `stable`, `beta`, `unstable`
* **VERSION**: defaults to latest. Specifies the package version.
* **PROXY**: defaults to none. Specifies the proxy URI.
  * Example: `http://proxy.foo.com`
* **PROXY_USER**: defaults to empty. Specifies the proxy server username.
* **PROXY_PASSWORD**: defaults to empty. Specifies the proxy server password. For the process/container Agent, this variable is required for passing in an authentication password and cannot be renamed.
* **INSECURE**: defaults to `false`. Allows skipping TLS validation.

Alternatively, download links for the latest releases can be found on [this page][2].

The installer may be executed as follows (as root):

{{< code-block lang="shell" wrap="true" >}}
installp -aXYgd ./datadog-unix-agent-<VERSION>.bff -e dd-aix-install.log datadog-unix-agent
{{< /code-block >}}

This installs the Agent in `/opt/datadog-agent`.

### Installation log files

You can find the Agent installation log in the `dd-aix-install.log` file. To disable this logging, remove the `-e dd-aix-install.log` parameter in the installation command.

## Commands

| Description                     | Command (as root)           |
|---------------------------------|-----------------------------|
| Start Agent as a service        | `startsrc -s datadog-agent` |
| Stop Agent running as a service | `stopsrc -s datadog-agent`  |
| Status of Agent service         | `lssrc -s datadog-agent`    |
| Status page of running Agent    | `datadog-agent status`      |
| Send flare                      | `datadog-agent flare`       |
| Display command usage           | `datadog-agent --help`      |

## Configuration

The configuration files and folders for the Agent are located in `/etc/datadog-agent/datadog.yaml`

A sample configuration file can be found in `/etc/datadog-agent/datadog.yaml.example`.

A basic configuration typically requires your Datadog API key. To submit your metrics to a different site (for example, the EU instance), the `site` configuration option is available.

Occasionally a proxy configuration must be specified depending on your network setup.

**Configuration files for Integrations:**
`/etc/datadog-agent/conf.d/`

## Integrations

The Unix Agent collects system metrics for:

* cpu
* filesystem
* iostat
* load
* memory
* uptime
* disk
* network

Additionally, the following integrations can be enabled to collect further metrics:

* process
* lparstats
* [ibm_was (Websphere Application Server)][3]

Enable the above integrations by copying and editing the sample configuration files provided. These are found in `/etc/datadog-agent/conf.d`. The name of the YAML configuration file should match that of the integration: `/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml` enables the integration `<INTEGRATION_NAME>`, and set its configuration. Example configuration files can be found at `/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml.example`

**Note**: Some of the available metrics differ between the integrations for the Unix Agent and the integrations for Linux, Windows and MacOS. Although it is possible to monitor processes and network metrics with the Unix Agent, the Live Process Monitoring and Network Performance Monitoring capabilities aren't available. Log Management is also not available with the Unix Agent.

<div class="alert alert-info">The Unix Agent has no trace-agent component, so APM tracing and profiling is not supported.</div>

## Running DogStatsD

DogStatsD allows collecting and submitting custom metrics to Datadog. It listens on a UDP port and DogStatsD metrics may be submitted to it. These are then relayed to Datadog.

DogStatsD relies on the same configuration file defined for the Agent, where a DogStatsD configuration section is available. The DogStatsD server typically runs within the same Agent process—but should you need a dedicated process, it may also be launched in standalone mode.

To enable DogStatsD, edit `/etc/datadog-agent/datadog.yaml` and set the relevant configuration options.

{{< code-block lang="yaml" filename="/etc/datadog-agent/datadog.yaml" >}}
dogstatsd:                        # DogStatsD configuration options
  enabled: true                   # disabled by default
  bind_host: localhost            # address we'll be binding to
  port: 8125                      # DogStatsD UDP listening port
  non_local_traffic: false        # listen to non-local traffic
{{< /code-block >}}

**Note:** DogStatsD does not daemonize and runs in the foreground.

There are also facilities to run the Agent with the known Python supervisor. This might be your preferred way to manage the Agent daemon if you are familiar with the tool. There are entries for both the Agent and DogStatsD.

## Uninstall the Agent

To remove an installed Agent, run the following `installp` command:

{{< code-block lang="shell" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

Note: Agent uninstallation logs can be found in the `dd-aix-install.log` file. To disable this logging, remove the `-e` parameter in the uninstallation command.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: https://github.com/DataDog/datadog-unix-agent/blob/master/checks/bundled/ibm_was/README.md
