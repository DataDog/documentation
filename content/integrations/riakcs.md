---
title: Datadog-RiakCS Integration
integration_title: RiakCS
git_integration_title: riakcs
kind: integration
description: "{{< get-desc-from-git >}}"
---

## Overview

Capture Riak CS (Cloud Storage) metrics in Datadog to:

* Visualize key RiakCS metrics.
* Correlate RiakCS performance with the rest of your applications.

## Setup
### Installation

The RiakCS check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your RiakCS nodes. If you need the newest version of the check, install the `dd-check-riakcs` package.

### Configuration

To capture RiakCS metrics you need to install the Datadog Agent.

1. Configure the Agent to connect to RiakCS, edit `conf.d/riakcs.yaml`:
{{< highlight yaml>}}
init_config:

instances:
  - access_id: access-key
    access_secret: access-secret
    #is_secure: True  # Uncomment and change to false if you are not using ssl
    #host: localhost  # Hostname/IP of your riakcs node
    #port: 8080  # port used by your riakcs node
    #s3_root: s3.amazonaws.com 
{{< /highlight >}}

2. Restart the Agent

{{< insert-example-links >}}

### Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell>}}
Checks
======

  [...]

  riakcs
  ------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

### Service Checks

**riakcs.can_connect**:

Returns CRITICAL if the Agent cannot connect to the RiakCS endpoint to collect metrics, otherwise OK.