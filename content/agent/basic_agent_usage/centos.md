---
title: Basic Agent Usage for CentOS
kind: documentation
platform: CentOS
aliases:
    - /guides/basic_agent_usage/centos/
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

The configuration files and folders for for the Agent are located in:

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

If you're still having trouble, [our support team][3] will be glad to provide further assistance.

## Adding a custom Python package to the Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

### Installing Python libraries

Run the embedded `pip` via the Agent:
```
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <package_name>
```

## Switch between Agent v5 and v6

### Upgrade to Agent 6

A script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format.

#### One-step install

##### Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

##### Fresh install

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

#### Manual install

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
    ```

2. Update your local Yum repo and install the Agent:
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copy the example config into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Restart the Agent:

    * Centos 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```
    sudo initctl restart datadog-agent
    ```

### Downgrade to Agent v5

1. Remove the Agent v6 repository and ensure that the `stable` repo is present:
    ```shell
    sudo rm /etc/yum.repos.d/datadog.repo [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

2. Update your local Yum cache and downgrade the Agent:
    ```
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```
3. Restart the Agent:

    * Centos 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```
    sudo initctl restart datadog-agent
    ```

## Uninstall the Agent

To uninstall the Agent, run: 

* For CentOS 5:
    ```
    sudo yum remove datadog-agent-base
    ```

* For CentOS 6:
    ```
    sudo yum remove datadog-agent
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/centos
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
