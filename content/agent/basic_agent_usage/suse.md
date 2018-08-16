---
title: Basic Agent Usage for SUSE
kind: documentation
platform: SUSE
aliases:
    - /guides/basic_agent_usage/suse/
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

## Overview

This page outlines the basic features of the Datadog Agent for Amazon Linux. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

## Commands

In Agent v6, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run via the Agent binary directly. In Agent v5, almost everything is done via the service manager.

| Agent v5                                          | Agent v6                                               | Notes                              |
| ------------------------------------------------- | ------------------------------------------------------ | ---------------------------------- |
| `sudo service datadog-agent start`                | `sudo service datadog-agent start`                     | Start Agent as a service           |
| `sudo service datadog-agent stop`                 | `sudo service datadog-agent stop`                      | Stop Agent running as a service    |
| `sudo service datadog-agent restart`              | `sudo service datadog-agent restart`                   | Restart Agent running as a service |
| `sudo service datadog-agent status`               | `sudo service datadog-agent status`                    | Status of Agent service            |
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | Status page of running Agent       |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Send flare                         |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Display command usage              |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent -- datadog-agent check <check_name>` | Run a check                        |

**Note**: If `service` is not available on your system, use:

* `upstart`-based systems: `initctl`
* `systemd`-based systems: `systemctl`

[Learn more about Service lifecycle commands][4]

## Configuration

The configuration files and folders for the Agent are located in:

| Agent v5                     | Agent v6                          |
| :-----                       | :----                             |
| `/etc/dd-agent/datadog.conf` | `/etc/datadog-agent/datadog.yaml` |

Configuration files for [Integrations][2]:

| Agent v5                | Agent v6                     |
| :-----                  | :----                        |
| `/etc/dd-agent/conf.d/` | `/etc/datadog-agent/conf.d/` |


## Troubleshooting

Run the `status` (or `info` in v5) command to see the state of the Agent. The Agent logs are located in the `/var/log/datadog/` directory:

* For Agent v6, all logs are consolidated in `agent.log`
* For Agent v5, logs are split into:
  * `datadog-supervisord.log`
  * `collector.log`
  * `dogstatsd.log`
  * `forwarder.log`

If you're still having trouble, [our support team][3] is glad to provide further assistance.

## Adding a custom Python package to the Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

### Installing Python libraries

Run the embedded `pip` via the Agent:
```
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <package_name>
```

## Upgrade to Agent 6

1. Set up Datadog's Yum repo on your system by creating `/etc/zypp/repos.d/datadog.repo` with the contents:
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=0
  gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  ```

2. Update your local Zypper repo and install the Agent:
  ```
  sudo zypper refresh
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  sudo zypper install datadog-agent
  ```

3. Copy the example configuration into place and plug in your API key:
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. Re-start the Agent:
  ```
  sudo systemctl restart datadog-agent.service
  ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/suse
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
