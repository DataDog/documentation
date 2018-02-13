---
title: Agent V6
kind: documentation
description: Install & configure the Agent to collect data
---

<div class="alert alert-info">
This documentation covers Agent <strong>versions superior to 6.0.0</strong>
</div>

{{< partial name="platforms/platforms.html" >}}

Agent 6 is the latest major version of the Datadog Agent. The big difference between Agent 5 and Agent 6 is that Agent 6 is a complete rewrite of the core Agent in Golang.

## Migration

To automatically transition between agent configuration paths and formats from Agent v5 to Agent v6, use the agent command:  
`sudo -u dd-agent -- datadog-agent import`. 

The command parses an existing `datadog.conf` and convert all the bits that
the new Agent still supports to the new format, in the new file. It also copies
configuration files for checks that are currently enabled.

## What is the Agent v6?

Golang has allowed us to take advantage of concurrency. In place of the three processes [the Agent v5](/agent/v5) used to run --*the Forwarder*, *the Collector*, and *DogStatsD*-- there is now only one process: the Agent. It also comes with a number of other core improvements:

* Agent v6 has significantly improved resource usage over Agent v5:
    
    * It has decreased CPU usage:
    * It has a decrease Memory usage:
    * It uses fewer File Descriptors:
    * It has an all around decreased footprint.

* Global percentiles can be performed on the server directly to calculate real, effective global percentiles.

* [DogStatsD](/developers/dogstatsd) can be used over a unix socket instead of over udp.

* Custom build your agent v6 and [DogStatsD](/developers/dogstatsd) much easier and with much more configuration options, to include or exclude almost anything. There is also a “puppy” agent, that’s a truly minimal installation.

## Supported OSs versions

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
