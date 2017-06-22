---
title: System Check
integration_title: System Check
newhlevel: true
kind: integration
git_integration_title: system
updated_for_agent: 5.8.5
---
## Overview

Get metrics from your base system about the CPU, IO, load, memory, processes, swap, and uptime. Other system-related checks can be found here:

* [Directory Check](/integrations/directory) - Capture metrics from the files in given directories.
* [Disk Check](/integrations/disk) - Capture metrics about the disk
* [Process check](/integrations/process/) - Capture metrics from specific running processes on a system.

## Configuration

No configuration is necessary for the system.

## Metrics

{{< get-metrics-from-git "system" "system.cpu system.io system.load system.mem system.proc system.processes system.swap system.uptime" >}}