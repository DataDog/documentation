---
title: Basic Agent Usage for Fedora
kind: documentation
platform: Fedora
aliases:
    - /guides/basic_agent_usage/fedora/
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

This page outlines the basic features of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [in the Datadog Agent Integration page][1].

The process to upgrade from the previous version of the Agent is to re-run the installation.

## Commands

Datadog Agent has some commands and only the _lifecycle commands_ (i.e. `start`/`stop`/`restart`/`status` on the Agent service) should be run with `sudo service`/`sudo initctl`/`sudo systemctl`, all other commands need to be run with the `datadog-agent` command.

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

* on `upstart`-based systems: `sudo start/stop/restart datadog-agent`
* on `systemd`-based systems: `sudo systemctl start/stop/restart datadog-agent`
* on `initctl`-based systems: `sudo initctl start/stop/restart datadog-agent`

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
1. Set up Datadog's Yum repo on your system by creating /etc/yum.repos.d/datadog.repo with the contents:

    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
    ```

2. Update your local yum cache and install/update the Agent

    ```
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. Import existing configuration (optional)

    ```
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. Restart the Agent

    ```
    sudo systemctl restart datadog-agent.service
    ```

### Downgrade to Agent v5

1. Remove the Agent 6 Yum repo from your system:
    ```shell 
    rm  /etc/yum.repos.d/datadog.repo [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/\nenabled=1\ngpgcheck=1\npriority=1\ngpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public\n       https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

2. Update your local yum cache and downgrade the Agent
    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. Back-sync configurations and AutoDiscovery templates (optional):
    If you have made any changes to your configurations or templates, you might want to sync these back for Agent 5.

    Note: please beware that if you have made any changes to your configurations to support new Agent v6-only options, these will not work anymore with Agent v5.

4. Back-sync custom Agent checks (optional)
    If you made any changes or added any new custom Agent checks while testing Agent 6 you might want to enable them back on Agent 5. Note: you only need to copy back checks you changed.
    
    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<check>.py /etc/dd-agent/checks.d/
    ```

5. Restart the Agent
    ```shell
    # Systemd
    sudo systemctl restart datadog-agent
    # Upstart
    sudo /etc/init.d/datadog-agent restart
    ```

6. Clean out /etc/datadog-agent (optional)
    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

## Uninstall the Agent

```
$ sudo apt-get --purge remove datadog-agent -y
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/fedora
[2]: /integrations
[3]: /help
