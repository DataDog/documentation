---
title: Basic Agent Usage for SUSE
kind: documentation
platform: SUSE
aliases:
    - /guides/basic_agent_usage/suse/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "/tracing"
  tag: "Documentation"
  text: Collect your traces
---

## Overview

This page outlines the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[in the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent/centos).

The process to upgrade from the previous version of the agent is to re-run the installation.


## Commands

Datadog Agent has some commands and only the _lifecycle commands_ (i.e. `start`/`stop`/`restart`/`status` on the Agent service) should be run with `sudo service`/`sudo initctl`/`sudo systemctl`, all other commands need to be run with the `datadog-agent` command.

{{% table responsive="true" %}}
| Agent v5                                  |  Agent v6                          | Notes
| ----------------------------------------------- | --------------------------------------- | ----------------------------- |
| `sudo service datadog-agent start`              | `sudo service datadog-agent start`      | Start Agent as a service |
| `sudo service datadog-agent stop`               | `sudo service datadog-agent stop`       | Stop Agent running as a service |
| `sudo service datadog-agent restart`            | `sudo service datadog-agent restart`    | Restart Agent running as a service |
| `sudo service datadog-agent status`             | `sudo service datadog-agent status`     | Status of Agent service |
| `sudo service datadog-agent info`               | `sudo datadog-agent status`             | Status page of running Agent |
| `sudo service datadog-agent flare`              | `sudo datadog-agent flare`              | Send flare |
| `sudo service datadog-agent`                    | `sudo datadog-agent --help`             | Display command usage |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent -- datadog-agent check <check_name>` | Run a check |
{{% /table %}}

More information about the metrics, events, and service checks for an [integrations](/integrations) can be retrieved with the check command:
```shell
sudo service datadog-agent check [integration]
```

Add the check_rate argument to get the most recent values for rates:
```shell
sudo service datadog-agent check [integration] check_rate
```

**NB**: If `service` is not available on your system, use:

* on `upstart`-based systems: `sudo start/stop/restart datadog-agent`
* on `systemd`-based systems: `sudo systemctl start/stop/restart datadog-agent`
* on `initctl`-based systems: `sudo initctl start/stop/restart datadog-agent`

## Configuration

The configuration files and folders for the Agent are located at:

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/datadog.conf`| `/etc/datadog-agent/datadog.yaml` |

Configuration files for [integrations](/integrations):

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/conf.d/`|`/etc/datadog-agent/conf.d/`|


## Upgrade to Agent 6

1. Set up Datadog's Yum repo on your system:

  ```
  [datadog-beta]
  name=Beta, Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/beta/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=0
  gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  ```

  or use this command to do it directly 

  ```shell
  echo -e '[datadog-beta]\nname = Beta, Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/suse/beta/6/x86_64/\nenabled=1\ngpgcheck=1\npriority=1\ngpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public\ntype=rpm-md\nrepo_gpgcheck=0' | sudo tee /etc/zypp/repos.d/datadog-beta.repo
  ```

2. Update your local zypper cache and install/update the agent
  
  ```shell
  sudo zypper refresh
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  sudo zypper install datadog-agent
  ```

## Troubleshooting

Run the info or status command to see the state of the Agent.
The Agent logs are located in the `/var/log/datadog/` directory:

* For Agent v6 all logs are in the `agent.log` file
* For Agent v5 logs are in:
    
    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

If you're still having trouble, [our support team](/help) will be glad to provide further assistance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}