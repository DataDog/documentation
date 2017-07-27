---
title: Process check
integration_title: Process Check
newhlevel: true
kind: integration
---
## Overview

  * Capture metrics from specific running processes on a system such as CPU %, memory, and I/O.
  * Monitor the status of running processes with [Process Monitors][1] 
  (**Requires Datadog Agent >= 5.1.0**).

## Installation

No installation required.

## Configuration

Configure the Agent to connect to your processes. Our example configuration will monitor the `ssh`, `sshd`, and `postgres` processes.

1.  Edit `/etc/dd-agent/conf.d/process.yaml`

        init_config:
          # used to override the default procfs path, e.g. for docker
          # containers to see the processes of the host at /host/proc
          # procfs_path: /proc
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']

          - name: postgres
            search_string: ['postgres']

          - name: pid_process
            pid: 1278
            # Do not use search_string when searching by pid or multiple processes will be grabbed

2.  Restart the Agent

        sudo /etc/init.d/datadog-agent restart

Refer to the comments in the [process.yaml.example](https://github.com/DataDog/integrations-core/blob/master/process/conf.yaml.example) file for more options.

After the Agent has sent data to Datadog you can visit the [New Monitor section of the application](https://app.datadoghq.com/monitors#create/process) to set up a Monitor. If you only see information on how to configure the process check in the Agent, Datadog has not yet received any process information from the Agent. Use the instructions below to validate whether the Agent has been configured correctly.

{{< insert-example-links conf="process" check="process" >}}

## Validation

1.  Execute the info command

        sudo /etc/init.d/datadog-agent info

2.  Verify that the check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell>}}
Checks
======

[...]

process
---------
    - instance #0 [OK]
    - Collected 18 metrics & 0 events & 2 service checks
{{< highlight shell>}}

Each instance, regardless of the number of search strings used, counts for a single instance in the info command output.

## Metrics

Visit the Metrics Explorer to see the new metrics available. You will find all the metrics under `system.processes`.

{{< get-metrics-from-git "system" "system.processes" >}}


[1]: /guides/monitors



