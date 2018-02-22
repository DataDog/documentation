---
title: Basic Agent Usage for Fedora
kind: documentation
platform: Fedora
aliases:
    - /guides/basic_agent_usage/fedora/
---

## Overview

This page outlines the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[in the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent/fedora).

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

## Switch between Agent v5 and v6
### Upgrade to Agent 6
A script is available to automatically install or upgrade the new Agent. It sets up the repos and install the package for you; in case of upgrade, the import tool also searches for an existing `datadog.conf` from a prior version and converts Agent and checks configurations according to the new file format and filesystem layout.

#### One-step install
##### To Upgrade

The Agent 6.x installer can automatically convert your 5.x style agent configuration at upgrade:  

```shell
 DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** the import process won't automatically move custom checks, this is by
design since we cannot guarantee full backwards compatibility out of the box.

##### To Install Fresh

To install on a clean box (or have an existing agent 5 install from which you do not wish to import the configuration) provide an api key:

```shell
 DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

#### Manual install
1. Set up Datadog's Yum repo on your system

    ```
    [datadog-beta]
    name = Beta, Datadog, Inc.
    baseurl = https://yum.datadoghq.com/beta/x86_64/
    enabled=1
    gpgcheck=1
    priority=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

    use this command to do it directly:

    ```shell
    # Red Hat
    echo -e '[datadog-beta]\nname = Beta, Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/beta/x86_64/\nenabled=1\ngpgcheck=1\npriority=1\ngpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public\n       https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public' | sudo tee /etc/yum.repos.d/datadog-beta.repo
    ```

2. Update your local yum cache and install/update the agent

    ```shell
    sudo yum clean expire-cache
    sudo yum install datadog-agent
    ```

3. Import existing configuration (optional)

    If you ran the `install_script.sh` all agent and checks configuration should be already imported.

    If you didn't you can run manually the import command:

    ```shell
    /opt/datadog-agent/bin/agent/agent import /etc/dd-agent /etc/datadog-agent
    ```

4. Enable desired custom checks (optional)

    Since all custom checks might not work on Agent 6, we let you enable these manually. Copy them over to the `additional_checksd` location (defaults to `/etc/datadog-agent/checks.d/` for Agent 6):

    ```shell
    sudo -u dd-agent -- cp /etc/dd-agent/checks.d/<check>.py /etc/datadog-agent/checks.d/
    ```

    **Note:** custom checks now have a *lower* precedence than the checks bundled by default with the Agent. This affects your custom checks if they have the same name as a check in [integrations-core][https://github.com/DataDog/integrations-core].

5. Restart the agent

    ```shell
    # Systemd
    sudo systemctl restart datadog-agent
    # Upstart
    sudo restart datadog-agent
    ```

### Downgrade to Agent v5

1. Remove the Beta Yum repo from your system:
    ```shell 
    rm /etc/yum.repos.d/datadog-beta.repo [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/\nenabled=1\ngpgcheck=1\npriority=1\ngpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public\n       https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

2. Update your local yum cache and downgrade the agent
    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. Back-sync configurations and AutoDiscovery templates (optional):
    If you have made any changes to your configurations or templates, you might want to sync these back for agent 5.

    Note: please beware that if you have made any changes to your configurations to support new Agent v6-only options, these will not work anymore with Agent v5.

4. Back-sync custom checks (optional)
    If you made any changes or added any new custom checks while testing Agent 6 you might want to enable them back on Agent 5. Note: you only need to copy back checks you changed.
    
    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<check>.py /etc/dd-agent/checks.d/
    ```

5. Restart the agent
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

## Uninstall the agent

```
$ sudo apt-get --purge remove datadog-agent -y
CentOS/RHEL/Amazon Linux
```