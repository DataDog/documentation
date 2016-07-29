---
title: Datadog-HAProxy Integration
integration_title: HAProxy
kind: integration
git_integration_title: haproxy
updated_for_agent: 5.8.5
newhlevel: true
---

# Overview

![HAProxy default dashboard](/static/images/haproxydash.png)

Capture HAProxy activity in Datadog to:

* Visualize HAProxy load-balancing performance.
* Know when a server goes down.
* Correlate the performance of HAProxy with the rest of your applications.

# Installation

Make sure that stats are enabled on your HAProxy configuration

# Configuration

1.  Configure the Agent to connect to HAProxy. Edit conf.d/haproxy.yaml:

        init_config:

        instances:
            -   username: username
                password: password
                url: https://localhost/admin?stats

1.  Restart the Agent

# Validation

1.  Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        haproxy
        -------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events

Learn more about how to monitor HAProxy performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor HAProxy.

<%= insert_example_links%>

### Metrics

<%= get_metrics_from_git() %>

