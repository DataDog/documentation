---
title: Agent 6 Log Files
kind: Guide
disable_toc: false
---

## Overview

The Datadog Agent does a logs rollover every 10MB by default. When a rollover occurs, one backup (`agent.log.1`) is kept. If a previous backup exists, it is overwritten during the rollover. To set the maximum size of one log file and the maximum number of backup files to keep, use `log_file_max_size`(default: 10485760 bytes) and `log_file_max_rolls`(default: 1) in the [Agent main configuration file][1].

## Agent log directory

| Platform                              | Command                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ and v6.28+        | `/opt/datadog-agent/logs`      |
| macOS, Agent older than 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Agent log files

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` for Agent >= 7.24.0/6.24.0
* `dogstatsd.log` for Agent >= 7.46.0


## Agent installation log files

| Platform                             | Location and file name        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

[1]: /agent/guide/agent-6-configuration-files#agent-main-configuration-file