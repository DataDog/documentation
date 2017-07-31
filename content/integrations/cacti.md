---
title: Datadog-Cacti Integration
integration_title: Cacti
kind: integration
doclevel: basic
git_integration_title: cacti
---
## Overview

Connect Cacti to Datadog to:

* Visualize Cacti metrics in Datadog.
* Correlate metrics captured by Cacti with the rest of your applications.

## Configuration

To capture Cacti metrics you need to install the Datadog Agent.

1. Create a datadog user with read-only rights to the Cacti database

2. Configure the Agent to connect to MySQL, edit `conf.d/cacti.yaml`
{{< highlight yaml>}}
init_config:

instances:
    -   mysql_host: localhost
        mysql_user: datadog
        mysql_password: 
    Generate Password

        rrd_path: /path/to/cacti/rra
        #field_names:
        #    - ifName
        #    - dskDevice
        #    - ifIndex
        #rrd_whitelist: /path/to/rrd_whitelist.txt
{{< /highlight >}}
3. Give the dd-agent user access to the RRD files

4. Restart the Agent

Find more information about this integration [here](https://app.datadoghq.com/account/settings#integrations/cacti):

{{< insert-example-links >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

{{< highlight shell >}}
Checks
======

  [...]

  cacti
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}
