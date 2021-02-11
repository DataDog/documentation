---
title: Basic Agent Usage for AIX
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/announcing-ibm-aix-agent/"
  tag: "Blog"
  text: "Monitor AIX with the Datadog Unix Agent"
---

<div class="alert alert-info">
The Datadog Unix Agent is being developed for specific system architectures, and is not the same as Agents 5 and 6.
</div>

This page outlines the installation and configuration of the Datadog UNIX Agent for AIX.

**Note:** The Datadog Unix Agent currently supports the following versions of AIX:

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

{{< code-block lang="bash" wrap="true" >}}
installp -aXYgd ./datadog-unix-agent-<VEERSION>.powerpc.bff -e dd-aix-install.log datadog-unix-agent
{{< /code-block >}}

This installs the Agent in `/opt/datadog-agent`.

### Installation log files

You can find the Agent installation log in the `dd-aix-install.log` file. To disable this logging, remove the `-e` parameter in the installation command.

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

The configuration files and folders for the Agent are located in:
`/etc/datadog-agent/datadog.yaml`
That said, configuration files are searched in this order (with the first match being taken):

* `/etc/datadog-agent/datadog.yaml`
* `./etc/datadog-agent/datadog.yaml`
* `./datadog.yaml`

A sample configuration file can be found in `/opt/datadog-agent/etc/datadog-agent`.

A basic configuration typically requires your Datadog API key. To submit your metrics to the EU instance, the `site` configuration option is available.

You can also override `dd_url` manually, but that should not be required.

Occassionally a proxy configuration must be specified depending on your network setup.

**Configuration files for Integrations:**
`/etc/datadog-agent/conf.d/`

## Integrations

Additional integrations available:

* process
* lparstats
* disk
* network

To enable the above integrations, copy and edit the sample configuration files provided. These are expected to be found in `/etc/datadog-agent/conf.d`. The name of the YAML configuration file should match that of the integration: `/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.yaml` enables the integration `<INTEGRATION_NAME>`, and set its configuration.

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

There are also facilities to run the Agent via the known Python supervisor. This might be your preferred way to manage the Agent daemon if you are familiar with the tool. There are entries for both the Agent and DogStatsD.

## Uninstall

To remove an installed Agent, run the following `installp` command:

{{< code-block lang="bash" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

Note: Agent uninstallation logs can be found in the `dd-aix-install.log` file. To disable this logging, remove the `-e` parameter in the uninstallation command.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
