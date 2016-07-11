---
title: Datadog-PowerDNS Integration
integration_title: PowerDNS Recursor
kind: integration
git_integration_title: powerdns_recursor
newhlevel: true
doclevel: basic
---

# Overview

Connect your PowerDNS Recursor to Datadog to:

* Visualize its performance
* Understand query latency
* Get alerted when something fails or when you're under attack.

# Configuration

Configure the Agent to connect to the PowerDNS Recursor. Edit conf.d/powerdns_recursor.yaml
    
    init_config:

    instances:
      - host: 127.0.0.1
        port: 8082
        api_key: pdns_api_key


<%= insert_example_links%>

# Validation

1.  Restart the Agent
2.  Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]

          powerdns_recursor
          -----------------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events


# Metrics

<%= get_metrics_from_git()%>
