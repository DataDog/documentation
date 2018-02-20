---
title: Agent V5
kind: documentation
description: Install & configure Agent v5 to collect data
---

<div class="alert alert-info">
This documentation covers Agent <strong>versions prior to 6.0.0</strong><br>
Agent v6 is now available, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">upgrade to the newest version </a> to benefit from all new functionalities 
</div>

{{< partial name="platforms/platforms.html" >}}


## What is the Agent?

The Agent has three main parts: the collector, DogStatsD, and the forwarder:

* **The collector**: runs checks on the current machine for whatever [integrations](/integrations) you have and it captures system metrics such as memory and CPU.

* **DogStatsD**: It is a statsd backend server you can send [custom metrics](/getting_started/custom_metrics/) to from an application.

* **The forwarder**: retrieves data from both DogStatsD and the collector and then queues it up to be sent to Datadog.

This is all controlled by one supervisor process. We keep this separate so you don't have to have the overhead of each application if you don't want to run all parts, although we generally recommend you do.


## Supported OSs version

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

**Note**: Source install may work on operating systems not listed here and is supported on a best effort basis.