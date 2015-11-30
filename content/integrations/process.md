---
title: Process check
integration_title: Process Check

kind: integration
---
### Overview

  * Capture metrics from specific running processes on a system such as CPU %, memory, and I/O.
  * Monitor the status of running processes with [Process Monitors][1] (**Requires Datadog Agent >= 5.1.0**).

From the Agent:

* [Process check script][2]
* [Process check configuration example][3]

### Configuration

_To capture Process metrics you need to install the Datadog Agent._

Configure the Agent to connect to your processes. Our example configuration will monitor the `sshd` and `postgres` processes.

1. Edit `/etc/dd-agent/conf.d/process.yaml`

        init_config:

        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']

          - name: postgres
            search_string: ['postgres']

2. Restart the Agent

        sudo /etc/init.d/datadog-agent restart

3. Execute the info command

        sudo /etc/init.d/datadog-agent info

4. Verify that the check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        process
        ---------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events & 4 service checks

   [1]: /guides/monitoring#process
   [2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/process.py
   [3]: https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example



