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

This page outlines the basic features of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent integration page][1].

The process to upgrade from the previous version of the Agent is to re-run the installation.

## Commands

Only the _lifecycle commands_ (i.e. `start`/`stop`/`restart`/`status` on the Agent service) run via `sudo service`/`sudo systemctl`. All other commands must be run via the `datadog-agent` command.

| Agent v5                                          | Agent v6                                               | Notes                              |
| -----------------------------------------------   | ---------------------------------------                | -----------------------------      |
| `sudo service datadog-agent start`                | `sudo service datadog-agent start`                     | Start Agent as a service           |
| `sudo service datadog-agent stop`                 | `sudo service datadog-agent stop`                      | Stop Agent running as a service    |
| `sudo service datadog-agent restart`              | `sudo service datadog-agent restart`                   | Restart Agent running as a service |
| `sudo service datadog-agent status`               | `sudo service datadog-agent status`                    | Status of Agent service            |
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | Status page of running Agent       |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Send flare                         |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Display command usage              |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent -- datadog-agent check <check_name>` | Run a check                        |

More information about the metrics, events, and service checks for an [integrations][2] can be retrieved with the `check` command:
```
sudo service datadog-agent check [integration]
```

Add the `check_rate` argument to get the most recent values for rates:
```
sudo service datadog-agent check [integration] check_rate
```

**Note**: If `service` is not available on your system, use:

* `upstart`-based systems: `sudo initctl start/stop/restart datadog-agent`
* `systemd`-based systems: `sudo systemctl start/stop/restart datadog-agent`

[Learn more about Service lifecycle commands][4]

## Configuration

The configuration files and folders for the Agent are located at:

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/datadog.conf`| `/etc/datadog-agent/datadog.yaml` |

Configuration files for [integrations][2]:

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/conf.d/`|`/etc/datadog-agent/conf.d/`|

## Troubleshooting

Run the info or status command to see the state of the Agent. Agent logs are located in the `/var/log/datadog/` directory:

* For Agent v6, all logs are consolidated in `agent.log`
* For Agent v5, logs are split into:
    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

If you're still having trouble, [our support team][3] will be glad to provide further assistance.

## Switch between Agent v5 and v6

### Upgrade to Agent 6

A script is available to automatically install or upgrade the new Agent. It sets up the repos and installs the package for you; in case of upgrade, the import tool also searches for an existing `datadog.conf` from a prior version and converts Agent and checks configurations according to the new file format and filesystem layout.

#### One-step install

##### Upgrade

The Agent v6 installer can automatically convert v5 configurations during upgrade:

```bash
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note**: The import process won't automatically move custom Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

##### Fresh install

To install on a clean box (or have an existing Agent 5 install from which you do not wish to import the configuration) provide an api key:

```bash
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

#### Manual install

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:

    ```ini
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/6/x86_64/
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

    ```bash
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Re-start the Agent.

    * Centos 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```
    sudo initctl start datadog-agent
    ```

### Downgrade to Agent v5

1. Add HTTPS compatibility to `apt`:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Remove the Agent v6 repository and ensure that the `stable` repo is present:

    ```bash
    sudo rm /etc/yum.repos.d/datadog.repo [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

3. Update `apt` and downgrade the Agent:

    ```
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

## Uninstall the Agent

To uninstall the Agent, run: 

* For CentOS 5:

    ```
    $ sudo yum remove datadog-agent-base
    ```

* For CentOS 6:

    ```
    $ sudo yum remove datadog-agent
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/centos
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
