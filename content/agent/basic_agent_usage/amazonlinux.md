---
title: Basic Agent Usage for Amazon Linux
kind: documentation
platform: Amazon Linux
aliases:
    - /guides/basic_agent_usage/amazonlinux/
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

This page outlines the basic functionality of the Datadog Agent for Amazon linux.  
If you haven't installed the Agent yet, instructions can be found
[in the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent/aws)

## Commands

The service manager provided by the operating system is responsible for the Agent lifecycle: depending on which one is installed, `sudo service`, `sudo initctl` or `sudo systemctl` should be used to `start`, `stop` or `restart` the Agent.  
Other functionalities are provided by the Agent binary itself, globally available through the command `datadog-agent`: it's the case for example of the `status` and `flare` commands.

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

**NB**: If `service` is not available on your system, use:

* on `upstart`-based systems: `sudo initctl start/stop/restart datadog-agent`
* on `systemd`-based systems: `sudo systemctl start/stop/restart datadog-agent`

## Configuration

The configuration files and folders for for the Agent are located at:

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

## Adding a custom python package to the agent

The Python interpreter embedded with the Agent is located here:  
`/opt/datadog-agent/embedded/bin/python`.
The agent also comes with pip, install python libraries using:
```
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <package_name>
```

## Switch between Agent v5 and v6
### Upgrade to Agent 6

A script is available to automatically install or upgrade the new Agent. It sets up the repos and installs the package for you; in case of upgrade, the import tool also searches for an existing `datadog.conf` from a prior version and converts Agent and checks configurations according to the new file format and filesystem layout.
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
1. Set up Datadog's Yum repo on your system by creating /etc/yum.repos.d/datadog.repo with the contents:

    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
    ```

2. Update your local yum repo and install the Agent:

    ```
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. Copy the example config into place and plug in your API key:

    ```
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Re-start the Agent for Amazon linux 2.0:

    ```
    sudo systemctl restart datadog-agent.service
    ```

5. Re-start the Agent for Amazon linux 1.0:

    ```
    sudo initctl start datadog-agent
    ```

### Downgrade to Agent v5

1. Set up apt so it can download through https
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Remove the Agent 6 repository and Ensure the stable repository is present

    ```shell
    sudo rm /etc/yum.repos.d/datadog.repo [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 C7A7DA52
    ```

3. Update apt and downgrade the agent

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

## Uninstall the agent

To uninstall the agent run: 

```
$ sudo apt-get --purge remove datadog-agent -y
CentOS/RHEL/Amazon Linux
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}