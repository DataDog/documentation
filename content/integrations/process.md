---
title: Process check
integration_title: Process Check

kind: integration
---
### Overview

  * Capture metrics from specific running processes on a system such as CPU %, memory, and I/O.
  * Monitor the status of running processes with [Process Monitors][1] (**Requires Datadog Agent >= 5.1.0**).

### Installation

N/A

### Configuration

Configure the Agent to connect to your processes. Our example configuration will monitor the `ssh`, `sshd`, and `postgres` processes.

1.  Edit `/etc/dd-agent/conf.d/process.yaml`

        init_config:

        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']

          - name: postgres
            search_string: ['postgres']

2.  Restart the Agent

        sudo /etc/init.d/datadog-agent restart

Refer to the comments in the [process.yaml.example](https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example) file for more options.

After the Agent has sent data to Datadog you can visit the [New Monitor section of the application](https://app.datadoghq.com/monitors#create/process) to set up a Monitor. If you only see information on how to configure the process check in the Agent, Datadog has not yet received any process information from the Agent. Use the instructions below to validate whether the Agent has been configured correctly.

### Validation

1.  Execute the info command

        datadog-agent info

2.  Verify that the check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        process
        ---------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events & 4 service checks

Each instance, regardless of the number of search strings used, counts for a single instance in the info command output.

### Metrics

Visit the Metrics Explorer to see the new metrics available. You will find all the metrics under `system.processes`.

| Process Check Metrics |
|-------------------|
| system.processes.cpu.pct |
| system.processes.mem.rss |
| system.processes.mem.vms |
| system.processes.number |
| system.processes.threads |
| system.processes.involuntary_ctx_switches |
| system.processes.open_file_descriptors |
| system.processes.voluntary_ctx_switches |
{:.table}

   [1]: /guides/monitoring#process
   [2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/process.py
   [3]: https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example



