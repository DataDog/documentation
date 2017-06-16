---
title: TCP check
integration_title: TCP Check
kind: integration
newhlevel: true
update_for_agent: 5.8.5
---
# Overview

![Network Graphs](/static/images/netgraphs.png)

TCP checks run in the agent and can verify whether or not a TCP service is up or down and responds in a certain time.

Also see the related [HTTP Checks](/integrations/httpcheck).

# Installation

No installation is required

# Configuration

Edit the `tcp_check.yaml` file in your agent's `conf.d` directory. The following yaml file will check both ports 22 and 443 on 192.168.22.1 with timeouts of 10 seconds. The response time will be available in the metric `network.tcp.response_time`.

    init_config:

    instances:
      - name: SSH on Server
        host: 192.168.22.1
        port: 22
        timeout: 10
        collect_response_time: true
        skip_event: true
        tags:
          - demo:matt

      - name: 443 on Server
        host: 192.168.22.1
        port: 443
        timeout: 10
        skip_event: true
        collect_response_time: true
        tags:
          - demo:matt
{:.language-yaml}

## Configuration Options

* `name` (Required) - Name of the service. This will be included as a tag: `instance:<name>`.
* `host` (Required) - Host to be checked. This will be included as a tag: `url:<host>:<port>`.
* `port` (Required) - Port to be checked. This will be included as a tag: `url:<host>:<port>`.
* `timeout` (Optional) - Timeout for the check. Defaults to 10 seconds.
* `collect_response_time` (Optional) - Defaults to false. If this is not set to true, no response time metric will be collected. If it is set to true, the metric returned is `network.tcp.response_time`.
* `skip_event` (Optional) - Defaults to false. Set to true to skip creating an event. This option will be removed in a future version and will default to true.
* `tags` (Optional) - Tags to be assigned to the metric.

<%= insert_example_links%>

# Validation

Execute the agent info command and verify that the integration check was successful. The output should contain a section similar to the following:

    Checks
    ======

      tcp_check
      ---------
        - instance #0 [OK]
        - instance #1 [OK]
        - Collected 2 metrics, 0 events & 3 service checks
