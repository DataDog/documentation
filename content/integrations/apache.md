---
title: Datadog-Apache Integration
integration_title: Apache
kind: integration
newhlevel: true
git_integration_title: apache
---

# Overview

![Apache Graph](/static/images/apachegraph.png)

Get metrics from Apache in real time; graph them and correlate them with other relevant system metrics and events.

  * Visualize your web server performance
  * Correlate the performance of Apache with the rest of your applications


# Installation

Make sure that [`mod_status`][3] is installed on your Apache server with `ExtendedStatus` set to `on`

# Configuration

*To capture Apache metrics you need to install the Datadog agent.*

1.  Configure the agent to connect to Apache. Edit `/etc/dd-agent/conf.d/apache.yaml`

        init_config:

        instances:
          - apache_status_url: http://example.com/server-status?auto
            # apache_user: example_user
            # apache_password: example_password
            tags:
              - instance:foo
            disable_ssl_validation: true # if you want to disable SSL cert validation
    {:.language-yaml}

2. Restart the agent

        sudo datadog-agent restart

<%= insert_example_links %>

# Validation

To ensure the integration is installed correctly, run the agent info command.

    sudo datadog-agent info

You should see something similar to the following if everything is working correctly:

    Checks
    ======

      [...]

      apache
      ------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events


# Metrics

The following metrics are collected by default with the Apache integration:

<%= get_metrics_from_git()%>


[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/apache.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/apache.py
[3]: http://httpd.apache.org/docs/2.0/mod/mod_status.html
