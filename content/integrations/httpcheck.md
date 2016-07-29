---
title: HTTP check
integration_title: HTTP Check
kind: integration
newhlevel: true
update_for_agent: 5.8.5
---
# Overview

HTTP checks run in the agent and can verify whether or not a website is up or down, responds in a certain time, and/or contains specific text on the page.

# Installation

No installation is required

# Configuration

Edit the `http_check.yaml` file in your agent's `conf.d` directory. The following yaml file will check the Datadog home page for the text "Cloud-Scale Monitoring" within 5 seconds. The response time will be available in the metric `network.http.response_time`.

    init_config:

    instances:
      - name: My first service
        url: https://datadoghq.com
        timeout: 5

        content_match: 'Cloud-Scale Monitoring'
        collect_response_time: true
        skip_event: true

        tags:
          - url:datadoghq.com
          - env:production

There are many other choices available in the example yaml file that deal with specific SSL options.

<%= insert_example_links%>

# Validation

Execute the agent info command and verify that the integration check was successful. The output should contain a section similar to the following:

    http_check
    ----------
      - instance #0 [OK]
      - Collected 0 metrics, 0 events & 1 service check
