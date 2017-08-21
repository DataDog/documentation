---
title: Datadog-Memcached Integration
integration_title: Memcached
git_integration_title: mcache
kind: integration
newhlevel: true
updated_for_agent: 5.8.5
aliases:
  - /integrations/memcached
description: "{{< get-desc-from-git >}}"
---
## Overview

Connect Memcached to Datadog in order to:

* Visualize its performance
* Correlate the performance of Memcached with the rest of your applications


## Setup
### Configuration

1.  Configure the Agent to connect to the Memcached server. Edit `conf.d/mcache.yaml`:
{{< highlight yaml>}}
init_config:

instances:
  - url: localhost  # url used to connect to the memcached instance
  #   socket: /socket/path # if url missing; 'dd-agent' user must have read/write permission
  #   port: 11211 # If this line is not present, port will default to 11211
    tags:
      - optional_tag

    options:
      items: false  # set to true if you wish to collect items memcached stats.
      slabs: false  # set to true if you wish to collect slabs memcached stats.
{{< /highlight >}}

2.  Restart the Agent

### Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]

      mcache
      ------
        - instance #0 [OK]
        - Collected 8 metrics & 0 events

## Data Collected
### Metrics

{{< get-metrics-from-git "mcache" >}}

To learn more details about the different metrics, go to [this blog entry](http://www.pal-blog.de/entwicklung/perl/memcached-statistics-stats-command.html).


