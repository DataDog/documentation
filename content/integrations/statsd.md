---
title: Datadog-StatsD
integration_title: StatsD
kind: integration
git_integration_title: statsd
---

# Overview

Enable the Datadog StatsD integration to:

  * Monitor uptime and availability of a StatsD server
  * Collecting metrics from a StatsD server's admin interface

**Please note the Datadog Agent includes [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) which serves as a StatsD forwarder. If you want to send metrics from a statsd server, just point it to the forwarder listening on port 17123.**

**This integration is intended for monitoring external StatsD servers, and is not needed to send metrics to Datadog using the StatsD protocol.**

# Configuration

To configure the Agent to connect to StatsD, edit `/etc/dd-agent/conf.d/statsd.yaml`.
An example configuration can be found at [statsd.yaml.example](https://github.com/gphat/dd-agent/blob/master/conf.d/statsd.yaml.example).

    init_config:

    instances:
      - host: localhost
        port: 8126


**HOST**: Set the host name or ip address of the StatsD server being monitored.

**PORT**: The admin port of the StatsD server being monitored.

<%= insert_example_links%>

# Validation

Execute the [info command](http://docs.datadoghq.com/guides/basic_agent_usage/) (`/etc/init.d/datadog-agent info` on *NIX) and verify that the integration check was successful.
