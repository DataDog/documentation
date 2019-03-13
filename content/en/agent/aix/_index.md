---
title: UNIX Agent for AIX
kind: documentation
aliases:
  - /agent/aix
further_reading:
- link: "agent/faq/getting-further-with-docker"
  tag: "FAQ"
  text: "Getting further with Docker"
---

This page outlines the installation and configuration of the Datadog UNIX Agent for AIX.

**Note:** The Datadog UNIX Agent supports AIX 6.1, 7.1 and 7.2.

## Installation

Download links for the latest releases can be found on [this page][1].

The installer may be executed as follows (as root):

```shell
installp -aXYgd ./datadog-unix-agent-<version>.powerpc.bff -e dd-aix-install.log datadog-unix-agent
```

This will install the agent in `/opt/datadog-agent`.

Note how we're logging to dd-aix-install.log, you may skip that by removing the `-e` switch.


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
That said, config file will be searched in this order (with the first match being taken):

* `/etc/datadog-agent/datadog.yaml`
* `./etc/datadog-agent/datadog.yaml`
* `./datadog.yaml`

A sample configuration file may be found in `/opt/datadog-agent/etc/datadog-agent`.

A basic configuration will typically require a destination `dd_url` and your datadog API key. Occasionally, a proxy configuration must be specified depending on your network setup.


**Configuration files for Integrations:**
`/etc/datadog-agent/conf.d/`

## Integrations
Additional integrations currently available or in development:

* process
* lparstats
* hmc

For non-core integrations, a configuration file should be put in place to enable the integration. These are expected to be found in `./etc/datadog-agent/conf.d`. The name of the YAML configuration file should match that of the integration: `./etc/datadog-agent/conf.d/foo.yaml` will enable integration `foo`, and set its configuration.

## Running dogstatsd
Dogstatsd allows collecting and submitting custom metrics to datadog. It listens on a UDP port and statsd metrics may be submitted to it. These will then be relayed to Datadog.

Dogstatsd relies on the same configuration file defined for the agent and runs in a separate process. To run dogstatsd you may do the following:

```
cd /opt/datadog-agent/agent
./dogstatsd.py
```
**Note:** Dogstatsd does not currently daemonize and will run in the foreground.

There are also facilities to run the agent via the known python supervisor, this might be your preferred way to manage the agent daemon if you are familiar with the tool. There are currently entries for both the agent and dogstatsd.

## Uninstall
To remove an installed agent you will run a similar `installp` command:

```
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

Note how we're again logging to dd-aix-install.log, you may skip that by removing the -e switch.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-unix-agent/releases
