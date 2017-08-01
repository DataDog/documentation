---
title: Datadog-Ceph Integration
integration_title: Ceph
kind: integration
git_integration_title: ceph
newhlevel: true
---


{{< img src="integrations/ceph/ceph_graph.png" alt="Ceph Graph" >}}

## Overview

Enable the Datadog-Ceph integration to:

  * Track disk usage across storage pools
  * Receive service checks in case of issues
  * Monitor I/O performance metrics


## Installation

The Ceph check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Ceph servers.

## Configuration

Create a file `ceph.yaml` in the Agent's conf.d directory:
{{< highlight yaml>}}
init_config:

instances:
  - ceph_cmd: /path/to/your/ceph # default is /usr/bin/ceph
    use_sudo: true               # only if the ceph binary needs sudo on your nodes
{{< /highlight >}}
If you enabled use_sudo, add a line like the following to your sudoers file:

```
dd-agent ALL=(ALL) NOPASSWD:/path/to/your/ceph
```

{{< insert-example-links >}}

## Validation

Execute the info command `/etc/init.d/datadog-agent info` and verify that the integration check was successful. The output should contain a section similar to the following:
{{< highlight shell >}}
Checks
======

  [...]

  ceph
  ----
      - instance #0 [OK]
      - Collected 19 metrics, 0 events & 2 service checks
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}

## Further Reading

To get a better idea of how (or why) to integrate your Ceph cluster with Datadog, check out our [blog post](https://www.datadoghq.com/blog/monitor-ceph-datadog/) about it.
