---
title: Agent
kind: documentation
description: Install & configure the Agent to collect data
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "/tracing"
  tag: "Documentation"
  text: Collect your traces
aliases:
  - /agent/faq/agent-check-directory-structure
---

<div class="alert alert-info">
    Agent v6 is now available, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">upgrade to the newest version </a> to benefit from all new functionality
</div>

## What is the Agent?

The Datadog Agent is a piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on
your behalf so that you can do something useful with your monitoring and performance data. The Datadog Agent is open source, view the source code on GitHub for [Agent v5](https://github.com/DataDog/dd-agent) and [Agent v6](https://github.com/DataDog/datadog-agent). To see all changes between Agent v5 and v6, [consult our dedicated changes documentation](https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md).

{{< partial name="platforms/platforms.html" >}}


The Agent has three main parts: the collector, DogStatsD, and the forwarder:

* **The collector**: runs checks on the current machine for whatever [integrations](/integrations) you have and it captures system metrics such as memory and CPU.

* **DogStatsD**: It is a statsd backend server you can send [custom metrics](/getting_started/custom_metrics/) to from an application.

* **The forwarder**: retrieves data from both DogStatsD and the collector and then queues it up to be sent to Datadog.

This is all controlled by one supervisor process. We keep this separate so you don't have to have the overhead of each application if you don't want to run all parts, although we generally recommend you do.


## What is the Agent v6?

Agent 6 is the latest major version of the Datadog Agent. The big difference between Agent 5 and Agent 6 is that Agent 6 is a complete rewrite of the core Agent in Golang. Golang has allowed us to take advantage of concurrency. In place of the three processes the Agent v5 used to run --*the Forwarder*, *the Collector*, and *DogStatsD*-- there is now only one process: the Agent. It also comes with a number of other core improvements:

* Agent v6 has significantly improved resource usage over Agent v5:

    * It has decreased CPU usage
    * It has decrease memory usage
    * It uses fewer file descriptors
    * It has an all around decreased footprint

* Global percentiles can be performed on the server directly to calculate real, effective global percentiles. (NOTE: this feature is currently in BETA. Contact support for details on how to have it enabled for your account.)

* [DogStatsD](/developers/dogstatsd) can be used over a unix socket instead of over udp.

* Custom build your agent v6 and [DogStatsD](/developers/dogstatsd) much easier and with much more configuration options, to include or exclude almost anything. There is also a “puppy” agent, that’s a truly minimal installation.

* Agent 6 blocks port 5000 and 5001. If you use these ports, update the port for `expvar_port` and `cmd_port` in the `datadog.yaml` file.

## Agent configuration files migration

To automatically transition between agent configuration paths and formats from Agent v5 to Agent v6, use the agent command:  

`sudo -u dd-agent -- datadog-agent import`

The command parses an existing `datadog.conf` and convert all the bits that the new Agent still supports to the new `datadog.yaml` configuration file. It also copies configuration files for checks that are currently enabled.  

For Mac and Windows environment use:  

`datadog-agent import <old_configuration_dir> <destination_dir>` 

**Note**: On Windows, `datadog.conf` should be automatically upgraded to `datadog.yaml` on upgrade.

## Configuration Files

Prior releases of Datadog Agent stored configuration files in `/etc/dd-agent`.
Starting with the 6.0 release configuration files will now be stored in
`/etc/datadog-agent`.

### Checks configuration files

In order to provide a more flexible way to define the configuration for a check,
from version 6.0.0 the Agent will load any valid YAML file contained in the folder:  

`/etc/datadog-agent/conf.d/<check_name>.d/`.

This way, complex configurations can be broken down into multiple files: for example,
a configuration for the `http_check` might look like this:

```
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Autodiscovery template files will be stored in the configuration folder as well,
for example this is how the `redisdb` check configuration folder looks like:

```
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

To keep backwards compatibility, the Agent will still pick up configuration files in the form `/etc/datadog-agent/conf.d/<check_name>.yaml` but migrating to the new layout is strongly recommended.

## CLI

The new command line interface for the Agent is sub-command based:

| Command         | Notes
| --------------- | -------------------------------------------------------------------------- |
| check           | Run the specified check |
| configcheck     | Print all configurations loaded & resolved of a running agent |
| diagnose        | Execute some connectivity diagnosis on your system |
| flare           | Collect a flare and send it to Datadog |
| health          | Print the current agent health |
| help            | Help about any command |
| hostname        | Print the hostname used by the Agent |
| import          | Import and convert configuration files from previous versions of the Agent |
| installservice  | Installs the agent within the service control manager |
| launch-gui      | starts the Datadog Agent GUI |
| regimport       | Import the registry settings into datadog.yaml |
| remove-service  | Removes the agent from the service control manager |
| restart-service | restarts the agent within the service control manager |
| start           | Start the Agent |
| start-service   | starts the agent within the service control manager |
| status          | Print the current status |
| stopservice     | stops the agent within the service control manager |
| version         | Print the version info |

To run a sub-command, the Agent binary must be invoked like this:
```
<path_to_agent_bin> <sub_command> <options>
```

Some options have their own set of flags and options detailed in a help message.
For example, to see how to use the `check` sub-command, run:
```
<agent_binary> check --help
```

## Using the GUI

The port which the GUI runs on can be configured in your `datadog.yaml` file.
Setting the port to -1 disables the GUI all together. By default it is enabled
on port `5002` on Windows and Mac, and is disabled on Linux.

Once the Agent is running, use the `datadog-agent launch-gui` command to launch
the GUI within your default web browser.

### Requirements

1. Cookies must be enabled in your browser. The GUI generates and saves a token
in your browser which is used for authenticating all communications with the GUI server.

2. The GUI will only be launched if the user launching it has the correct user
permissions: if you are able to open `datadog.yaml`, you are able to use the GUI.

3. For security reasons, the GUI can **only** be accessed from the local network interface (```localhost```/```127.0.0.1```), so you must be on the same host that the agent is running to use it. In other words, you can't run the agent on a VM or a container and access it from the host machine.

## Supported OSs versions
### Agent v6
|OS| Supported versions|
|:----|:----|
|[Debian x86_64](/agent/basic_agent_usage/deb) | Debian 7 (wheezy) and above (we do not support SysVinit)|
|[Ubuntu x86_64](/agent/basic_agent_usage/ubuntu) | Ubuntu 14.04 and above|
|[RedHat/CentOS x86_64](/agent/basic_agent_usage/redhat)| RedHat/CentOS 6 and above |
|[SUSE Enterprise Linux x86_64](/agent/basic_agent_usage/suse) | SUSE 11 SP4 and above (we do not support SysVinit)|
|[Fedora x86_64](/agent/basic_agent_usage/fedora) | Fedora 26 and above |
|[MacOS](/agent/basic_agent_usage/osx)| OSX 10.10 and above|
|[Windows server 64-bit](/agent/basic_agent_usage/windows)| Windows server 2008r2 or above|
|[Windows 64-bit](/agent/basic_agent_usage/windows)| Windows 7 or above|

**Note**: Source install may work on operating systems not listed here and is supported on a best effort basis.
### Agent v5

|OS| Supported versions|
|:----|:----|
|[Debian x86_64](/agent/basic_agent_usage/deb) | Debian 7 (wheezy) and above |
|[Ubuntu x86_64](/agent/basic_agent_usage/ubuntu) | Ubuntu 12.04 and above|
|[RedHat/CentOS x86_64](/agent/basic_agent_usage/redhat)| RedHat/CentOS 6 and above |
|[SUSE Enterprise Linux x86_64](/agent/basic_agent_usage/suse) | SUSE 11 SP4 and above|
|[Fedora x86_64](/agent/basic_agent_usage/fedora)| Fedora 26 and above |
|[MacOS](/agent/basic_agent_usage/osx)| OSX 10.10 and above|
|[Windows server 64-bit](/agent/basic_agent_usage/windows)| Windows server 2008r2 or above|
|[Windows 64-bit](/agent/basic_agent_usage/windows)| Windows 7 or above|

**Note**: Source install may work on operating systems not listed here and is

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
