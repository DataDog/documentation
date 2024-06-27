---
title: Agent 5 Configuration Files
kind: Guide
disable_toc: false
---

## Overview

This page covers Agent 5 configuration files. Datadog recommends installing or upgrading to Agent 7 for the latest features. For information on installing the latest version of the Agent, follow the [Agent 7 Installation Instructions][1]. For information on upgrading to Agent 7 from an earlier version, see [Upgrade to Datadog Agent v7][2].

## Agent main configuration file

| Platform                             | Command                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows Server 2008, Vista and newer | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

See the [sample `config_template.yaml` file][3] for all available configuration options.

## Agent configuration directory

| Platform                             | Command                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Source                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista and newer | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

## JMX configuration file

JMX Agent checks have an additional `metrics.yaml` file in their configuration folder. It is a list of all the beans that the Datadog Agent collects by default. This way, you do not need to list all of the beans manually when you configure a check through [Docker labels or k8s annotations][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[4]: /agent/kubernetes/integrations/#configuration
