---
git_integration_title: ceph
integration_title: Ceph
kind: integration
newhlevel: true
placeholder: true
title: Datadog-Ceph Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/ceph/ceph_graph.png" alt="Ceph Graph" >}}

## Overview

Enable the Datadog-Ceph integration to:

  * Track disk usage across storage pools
  * Receive service checks in case of issues
  * Monitor I/O performance metrics


## Installation

The integration is meant to be enabled on each Ceph monitor host.

## Configuration

Adjust the configuration file to match your environment.  

The Ceph integration requires the Datadog Agent >= 5.7.0

1. Configure the Agent to connect to Ceph, edit `conf.d/ceph.yaml`
By default the check will use `/usr/bin/ceph` to retrieve metrics; this can be overriden by using the `ceph_cmd` option.
If sudo access is required to run it, please enable the use_sudo flag.
Any extra tags specific to the cluster can be specified under `tags`, as usual.
{{< highlight yaml>}}
init_config:

instances:
  - tags:
      - name:ceph_cluster

    ceph_cmd: /usr/bin/ceph

    #use_sudo: True
{{< /highlight >}}

2. If your environment requires sudo, you will need to add the agent to your sudoers file.
```
dd-agent ALL=(ALL) NOPASSWD:/usr/bin/ceph
```
Then, just uncomment the use_sudo line from the config above.

3. Restart the Agent

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