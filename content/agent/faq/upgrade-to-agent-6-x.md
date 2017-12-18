---
title: Upgrade to Agent 6.x
kind: faq
customnav: agentnav
---

## What is Agent 6?

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

## How do I upgrade?

The new Datadog Agent is currently in beta. You can learn how to join the beta by reading [the documentation](https://github.com/DataDog/datadog-agent/tree/master/docs/beta).
