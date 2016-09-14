---
title: Datadog-PHP-FPM Integration
integration_title: PHP-FPM
kind: integration
doclevel: basic
newhlevel: true
---

# Overview

![PHP overview](/static/images/phpfpmoverview.png)
{: style="max-width: 600px;"}
Enable the PHP-FPM check to monitor the state of your FPM pool and track requests performance.

# Installation

No installation steps are required for this integration.

# Configuration

1.  Configure the Agent to connect to your FPM status endpoint (look at your pools definition). Edit conf.d/php_fpm.yaml:

        init_config:

        instances:
          - status_url: http://localhost/status
            ping_url: http://localhost/ping
            ping_reply: pong
            tags:
              - instance:foo

1.  Restart the Agent

# Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:

    Checks
    ======

      [...]

      php_fpm
      -------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events



