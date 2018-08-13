---
title: Basic Agent Usage for Debian
kind: documentation
aliases:
    - /guides/basic_agent_usage/deb/
    - /agent/basic_agent_usage/install_debian_5/
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

This page outlines the basic features of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found [in the Datadog Agent Integration page][1].

The process to upgrade from the previous version of the Agent is to re-run the installation.

## Commands

Datadog Agent has some commands and only the _lifecycle commands_ (i.e. `start`/`stop`/`restart`/`status` on the Agent service) should be run with `sudo service`/`sudo systemctl`, all other commands need to be run with the `datadog-agent` command.

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

More information about the metrics, events, and service checks for an [Integrations][2] can be retrieved with the check command:
```shell
sudo service datadog-agent check [integration]
```

Add the check_rate argument to get the most recent values for rates:
```shell
sudo service datadog-agent check [integration] check_rate
```

**NB**: If `service` is not available on your system, use:

* on `systemd`-based systems: `sudo systemctl start/stop/restart datadog-agent`

[Learn more about Service lifecycle commands][4]

## Configuration

The configuration files and folders for the Agent are located at:

| Agent v5                     | Agent v6                          |
| :-----                       | :----                             |
| `/etc/dd-agent/datadog.conf` | `/etc/datadog-agent/datadog.yaml` |

Configuration files for [Integrations][2]:

| Agent v5                | Agent v6                     |
| :-----                  | :----                        |
| `/etc/dd-agent/conf.d/` | `/etc/datadog-agent/conf.d/` |

## Troubleshooting

Run the info or status command to see the state of the Agent.
The Agent logs are located in the `/var/log/datadog/` directory:

* For Agent v6 all logs are in the `agent.log` file
* For Agent v5 logs are in:
    
    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

If you're still having trouble, [our support team][3] will be glad to provide further assistance.

## Switch between Agent v5 and v6
### Upgrade to Agent 6

A script is available to automatically install or upgrade the new Agent. It sets up the repos and installs the package for you; in case of upgrade, the import tool also searches for an existing `datadog.conf` from a prior version and converts Agent and checks configurations according to the new file format and filesystem layout.
#### One-step install
##### To Upgrade

The Agent 6.x installer can automatically convert your 5.x style Agent configuration at upgrade:  

```shell
 DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** the import process won't automatically move custom Agent checks, this is by design since we cannot guarantee full backwards compatibility out of the box.

##### To Install Fresh

To install on a clean box (or have an existing Agent 5 install from which you do not wish to import the configuration) provide an API key:

```shell
 DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

#### Manual install

1. Set up apt so that it can download through https:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog deb repo on your system and import Datadog's apt key:

    ```
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

    Note: You might need to install `dirmngr` to add Datadog's apt key.

3. Update your local apt repo and install the Agent:

    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. Copy the example config into place and plug in your API key:

    ```
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml" 
    ```

5. Start the Agent:

    ```
    sudo systemctl restart datadog-agent.service
    ```

### Downgrade to Agent v5

1. Set up apt so it can download through https
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Remove Agent 6 Repo and Ensure the stable repo is present

    ```shell
    sudo rm /etc/apt/sources.list.d/datadog.list [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

3. Update apt and downgrade the Agent

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

## Uninstall the Agent

To uninstall the Agent, run: 

```
$ sudo apt-get --purge remove datadog-agent -y
CentOS/RHEL/Amazon Linux
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/debian
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
