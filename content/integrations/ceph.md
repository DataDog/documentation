---
title: Datadog-Ceph Integration
integration_title: Ceph
kind: integration
git_integration_title: ceph
newhlevel: true
---
## Overview

Enable the Datadog-Ceph integration to:

  * Track disk usage across storage pools
  * Receive service checks in case of issues
  * Monitor I/O performance metrics


## Installation

The integration is meant to be enabled on each Ceph monitor host.

## Configuration

Adjust the configuration file to match your environment. By default the check will use `/usr/bin/ceph` to retrieve metrics; this can be overriden by using the `ceph_cmd` option. If sudo access is required to run it, please enable the use_sudo flag.

Any extra tags specific to the cluster can be specified under `tags`, as usual.

{{< insert-example-links >}}

## Validation

Execute the info command `/etc/init.d/datadog-agent info` and verify that the integration check was successful. The output should contain a section similar to the following:

        Checks
        ======

          [...]

          ceph
          ----
              - instance #0 [OK]
              - Collected 19 metrics, 0 events & 2 service checks


## Metrics

{{< get-metrics-from-git >}}
