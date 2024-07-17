---
title: Agent 5 Log Files
kind: Guide
disable_toc: false
---

## Overview

This page covers Agent 5 log files. Datadog recommends installing or upgrading to Agent 7 for the latest features. For information on installing the latest version of the Agent, follow the [Agent 7 Installation Instructions][1]. For information on upgrading to Agent 7 from an earlier version, see [Upgrade to Datadog Agent v7][2].

The Datadog Agent does a logs rollover every 10MB by default. When a rollover occurs, one backup (`agent.log.1`) is kept. If a previous backup exists, it is overwritten during the rollover. To set the maximum size of one log file and the maximum number of backup files to keep, use `log_file_max_size`(default: 10485760 bytes) and `log_file_max_rolls`(default: 1) in the [Agent configuration file][3].

## Agent log directory

| Platform                             | Command                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008, Vista and newer | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003, XP or older     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Source build                         | `~/.datadog-agent/supervisord/logs/`                                 |

**Note**: For Windows Server 2008, Vista, and newer systems, the Agent logs are located in `C:\ProgramData\Datadog\logs`. `ProgramData` is a hidden folder.

## Agent log files

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

## Agent installation log files

| Platform                             | Location and file name        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/versions/upgrade_to_agent_v7/
[3]: /agent/guide/agent-5-configuration-files#agent-main-configuration-file
