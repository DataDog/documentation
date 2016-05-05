---
title: Datadog-StatsD
integration_title: StatsD
kind: integration
git_integration_title: statsd
---

# Overview

Enable the Datadog-StatsD to:

  * Monitor uptime and availability of a StatsD server.
  * Collecting metrics from a StatsD server's admin interface

**Please note the Datadog Agent includes [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) which serves as a statsd forwarder. This integration is inteded for monitoring external StatsD servers, and is not needed to send metrics to datadog using the StatsD protocol.**

# Configuration

To configure the agent to connect to StatsD, edit `/etc/dd-agent/conf.d/statsd.yaml`.
An example configuration can be found at [statsd.yaml.example](https://github.com/gphat/dd-agent/blob/master/conf.d/statsd.yaml.example).

    init_config:

    instances:
      - host: localhost
        port: 8126


**HOST**: Set the host name or ip address of the StatsD server being monitored.

**PORT**: The admin port of the StatsD server being monitored.

# Validation

Execute the info command `/etc/init.d/datadog-agent info` and verify that the integration check was successful.
