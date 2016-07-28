---
title: Datadog-Lighttpd Integration
integration_title: Lighttpd
kind: integration
doclevel: basic
git_integration_title: lighttpd
newhlevel: true
---
# Overview

![Lighttpd Dashboard](/static/images/lighttpddashboard.png)

Bring Lighttpd metrics to Datadog to:

* Visualize your web server performance.
* Correlate the performance of Ligttpd with the rest of your applications.

<%= insert_example_links%>

# Installation

1.  Make sure that `mod_status` is installed on your Lighttpd server

# Configuration

1.  Configure the Agent to connect to Lighttpd. Edit conf.d/lighttpd.yaml


        init_config:

        instances:
            # For every instance, you have an `lighttpd_status_url` and (optionally)
            # a list of tags.

            -   lighttpd_status_url: http://example.com/server-status?auto
                tags:
                    -   instance:foo
        
2.  Restart the Agent

# Validation

1.  Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]

          lighttpd
          --------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events

# Metrics

The following metrics are collected for either Lighttpd1 and Lighttpd2:

<%= get_metrics_from_git() %>

|Metrics collected for Lighttpd1|
|--------------------------------|
|lighttpd.net.bytes|
|lighttpd.net.bytes_per_s|
|lighttpd.net.hits|
|lighttpd.net.request_per_s|
|lighttpd.performance.busy_servers|
|lighttpd.performance.idle_server|
|lighttpd.performance.uptime|
{:.table}

|Metrics collected for Lighttpd2|
|--------------------------------|
|lighttpd.connections.state_handle_request|
|lighttpd.connections.state_keep_alive|
|lighttpd.connections.state_read_header|
|lighttpd.connections.state_start|
|lighttpd.connections.state_write_response|
|lighttpd.net.bytes_in|
|lighttpd.net.bytes_in_avg|
|lighttpd.net.bytes_in_avg_5sec|
|lighttpd.net.bytes_out|
|lighttpd.net.bytes_out_avg|
|lighttpd.net.bytes_out_avg_5sec|
|lighttpd.net.connections_avg|
|lighttpd.net.connections_avg_5sec|
|lighttpd.net.connections_total|
|lighttpd.net.requests_avg|
|lighttpd.net.requests_avg_5sec|
|lighttpd.net.requests_total|
|lighttpd.performance.memory_usage|
|lighttpd.performance.uptime|
|lighttpd.response.status_1xx|
|lighttpd.response.status_2xx|
|lighttpd.response.status_3xx|
|lighttpd.response.status_4xx|
|lighttpd.response.status_5xx|
{:.table}


