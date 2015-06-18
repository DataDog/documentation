---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Process check
---

### Overview
{:#int-overview}

- Capture metrics from specific running processes on a system such as CPU %, memory, and I/O.
- Monitor the status of running processes with [Process Monitors](/guides/monitoring#process) (**Requires Datadog Agent >= 5.1.0**).


From the Agent:

* [Process check script](https://github.com/DataDog/dd-agent/blob/master/checks.d/process.py)
* [Process check configuration example](https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example)

### Configuration
{:#int-configuration}

 *To capture Process metrics you need to install the Datadog Agent.*

1. Configure the Agent to connect to your processes. Our example configuration will monitor the `sshd` and `postgres` processes.  
   Edit `/etc/dd-agent/conf.d/process.yaml`

        init_config:

        instances:
         - name: ssh
           search_string: ['ssh', 'sshd']

         - name: postgres
           search_string: ['postgres']

         - name: All
           search_string: ['All']

2. Restart the Agent
        sudo /etc/init.d/datadog-agent restart

3. Execute the info command

        sudo /etc/init.d/datadog-agent info

    and verify that the check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        process
        ---------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events
