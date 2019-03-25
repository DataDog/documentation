---
title:UNIX Agent for AIX
kind: documentation
further_reading:
---

<div class="alert alert-info">
The Datadog UNIX agent is separate from Agents 5 and 6 that only support Linux and Windows  
</div>

This page outlines the installation and configuration of the Datadog UNIX Agent for AIX.

**Note:** The Datadog UNIX Agent supports AIX 6.1, 7.1 and 7.2.

## Installation

Download links for the latest releases can be found on [this page][1].

The installer may be executed as follows (as root):

```shell
installp -aXYgd ./datadog-unix-agent-<version>.powerpc.bff -e dd-aix-install.log datadog-unix-agent
```

This installs the agent in `/opt/datadog-agent`.

Note: Agent installation logs can be found in the `dd-aix-install.log` file. To disable this logging, remove the `-e` parameter in the installation command.


## Commands

| Description                        | Command (as root)                   |
| --------------------               | --------------------                |
| Start Agent as a service           | `startsrc -s datadog-agent`         |
| Stop Agent running as a service    | `stopsrc -s datadog-agent`          |
| Status of Agent service            | `lssrc -s datadog-agent`            |
| Status page of running Agent       | `datadog-agent status`              |
| Send flare                         | `datadog-agent flare`               |
| Display command usage              | `datadog-agent --help`              |

## Configuration

The configuration files and folders for the Agent are located in:
`/etc/datadog-agent/datadog.yaml`
That said, configuration file is searched in this order (with the first match being taken):

* `/etc/datadog-agent/datadog.yaml`
* `./etc/datadog-agent/datadog.yaml`
* `./datadog.yaml`

A sample configuration file may be found in `/opt/datadog-agent/etc/datadog-agent`.

A basic configuration typically requires a destination `dd_url` and your Datadog API key. Occasionally, a proxy configuration must be specified depending on your network setup.


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

DogStatsD allows collecting and submitting custom metrics to Datadog. It listens on a UDP port and StatsD metrics may be submitted to it. These are then relayed to Datadog.

DogStatsD relies on the same configuration file defined for the agent and runs in a separate process. To enable DogStatsD do:

```
cd /opt/datadog-agent/agent
./dogstatsd.py
```
**Note:** DogStatsD does not daemonize and runs in the foreground.

There are also facilities to run the Agent via the known python supervisor, this might be your preferred way to manage the Agent daemon if you are familiar with the tool. There are entries for both the Agent and DogStatsD.

## Uninstall

To remove an installed Agent run the following `installp` command:

```
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

Note: Agent un-installation logs can be found in the `dd-aix-install.log` file. To disable this logging, remove the `-e` parameter in the un-installation command.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-unix-agent/releases
