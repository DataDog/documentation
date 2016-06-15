---
title: Datadog-Fluentd Integration
integration_title: Fluentd
kind: integration
doclevel: basic
git_integration_title: fluentd
newhlevel: true
---


# Overview
Get metrics from Fluentd in real time to

* Visualize Fluentd performance.
* Correlate the performance of Fluentd with the rest of your applications.

![Fluentd Dashboard](/static/images/snapshot-fluentd.png)

# Installation

Configure your fluentd to use a monitor agent and plugin id (see doc), for instance:

    <source>
      type monitor_agent
      bind 0.0.0.0
      port 24220
    </source>
    <match test>
      id   plg1
      type forward
      <server>
        host localhost
      </server>
    </match>

    <match **>
      id   plg2
      type forward
      <server>
        host localhost
      </server>
    </match>

# Configuration

Configure the Agent to connect to fluentd, and set the plugins id you want to monitor
Edit conf.d/fluentd.yaml

    init_config:

    instances:
        # For every instance, you have an `monitor_agent_url`
        # and (optionally) a list of tags.
        -  monitor_agent_url: http://example.com:24220/api/plugins.json
           plugin_ids:
             - plg1
             - plg2

# Validation

1.  Restart the Agent
2.  Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]

          fluentd
          -------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events

Not sure how to execute the last two steps? Visit the Agent Usage Guide for more detailed instructions.

## Metrics

<%= get_metrics_from_git()  %>
