---
title: Datadog-Marathon Integration
integration_title: Marathon
kind: integration
git_integration_title: marathon
updated_for_agent: 5.8.0
newhlevel: true
---
# Overview

Connects Marathon to Datadog in order to:

* Visualize your Marathon framework's performance
* Correlate the performance of Marathon with the rest of your Mesos applications

<%= insert_example_links%>

# Configuration

*NOTICE : If you include the acs_url parameter in the marathon.yaml config, the user and password will be used to generate an ACS token, not as basic auth for the marathon api.

1.  Configure the Agent to connect to Marathon. Edit conf.d/marathon.yaml:

        init_config:
        default_timeout: 5
        instances:
        # url: the API endpoint of your Marathon master
        - url: https://server:port
        # user: the user for marathon API or ACS token authentication
        - user: username
        # password: the password for marathon API or ACS token authentication
        - password: password
        # acs_url: the base ACS endpoint url if an ACS token is required to access the marathon API
        - acs_url: https://server:port

1.  Restart the Agent

# Validation

1.  Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        marathon
        --------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events

# Metrics

<%= get_metrics_from_git() %>
