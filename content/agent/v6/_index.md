---
title: Agent V6
kind: documentation
description: Install & configure the Agent to collect data
---

<div class="alert alert-info">
This documentation covers Agent <strong>versions superior to 6.0.0</strong>
</div>

{{< partial name="platforms/platforms.html" >}}

Agent 6 is the latest major version of the Datadog Agent. The big difference between Agent 5 and Agent 6 is that Agent 6 is a complete rewrite of the core Agent in Golang. Don’t worry! We still support the python checks.

## What’s Better?

Golang has allowed us to take advantage of concurrency. In place of the three processes the Agent used to run--the Forwarder, the Collector, and DogStatsD--there is now only one process: the Agent. It also comes with a number of other core improvements:

### Improved Resource Usage

Agent 6 has significantly improved resource usage over Agent 5.
It has decreased CPU usage:
{{< img src="agent/faq/cpu_usage.png" alt="CPU Usage" responsive="true" popup="true">}}

It has a decrease Memory usage:
{{< img src="agent/faq/memory_usage.png" alt="Memory Usage" responsive="true" popup="true">}}

It uses fewer File Descriptors:
{{< img src="agent/faq/file_descriptor.png" alt="Dile descriptor" responsive="true" popup="true">}}

It has an all around decreased footprint.

### Better Windows Support

We wrote the agent with windows in mind from day 1. Our support for windows is much improved

### Containers are first class citizens

Container support is better and more robust in the new agent. It has been built with containers in mind, ensuring that the agent runs better on containers and gathers data better from within containers.

### Autodiscovery

Service Discovery is now Autodiscovery. It’s been renamed and revamped. The new Auto Discovery is highly decoupled and it allows us to add more sources beyond docker.

### Global Percentiles

We can now do global percentiles on the server. It allows us to calculate real, effective global percentiles.

### More Configurable

We have improved configuration of the agent and made it much better and easier!

### DogStatsD Over Sockets

You can now use [DogStatsD](/developers/dogstatsd) over a unix socket instead of over udp!

### More Build Options

You can now custom build the agent and [DogStatsD](/developers/dogstatsd) much easier and with much more configuration options, to include or exclude almost anything. We even have a “puppy” agent, that’s a truly minimal installation.

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

