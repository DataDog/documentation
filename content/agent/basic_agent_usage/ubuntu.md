---
title: Basic Agent Usage for Ubuntu
kind: documentation
platform: Ubuntu
aliases:
    - /guides/basic_agent_usage/ubuntu/
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

This page outlines the basic features of the Datadog Agent for Ubuntu. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

**Note**: Supported OS version are Ubuntu 14.04 and above.

## Commands

In Agent v6, the service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run via the Agent binary directly. In Agent v5, almost everything is done via the service manager.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Description                        | Command                                                |
| --------------------               | --------------------                                   |
| Start Agent as a service           | `sudo service datadog-agent start`                     |
| Stop Agent running as a service    | `sudo service datadog-agent stop`                      |
| Restart Agent running as a service | `sudo service datadog-agent restart`                   |
| Status of Agent service            | `sudo service datadog-agent status`                    |
| Status page of running Agent       | `sudo datadog-agent status`                            |
| Send flare                         | `sudo datadog-agent flare`                             |
| Display command usage              | `sudo datadog-agent --help`                            |
| Run a check                        | `sudo -u dd-agent -- datadog-agent check <check_name>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                        | Command                                           |
| --------------------               | --------------------                              |
| Start Agent as a service           | `sudo service datadog-agent start`                |
| Stop Agent running as a service    | `sudo service datadog-agent stop`                 |
| Restart Agent running as a service | `sudo service datadog-agent restart`              |
| Status of Agent service            | `sudo service datadog-agent status`               |
| Status page of running Agent       | `sudo service datadog-agent info`                 |
| Send flare                         | `sudo service datadog-agent flare`                |
| Display command usage              | `sudo service datadog-agent`                      |
| Run a check                        | `sudo -u dd-agent -- dd-agent check <check_name>` |

{{% /tab %}}
{{< /tabs >}}

**Note**: If `service` is not available on your system, use:

* `upstart`-based systems: `initctl`
* `systemd`-based systems: `systemctl`

[Learn more about Service lifecycle commands][4]

## Configuration

{{< tabs >}}
{{% tab "Agent v6" %}}
The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml` 

Configuration files for [Integrations][2]:

* `/etc/datadog-agent/conf.d/` 

[2]: /integrations

{{% /tab %}}
{{% tab "Agent v5" %}}

The configuration files and folders for the Agent are located in:

* `/etc/dd-agent/datadog.conf`  

Configuration files for [Integrations][2]:

* `/etc/dd-agent/conf.d/` 

[2]: /integrations

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting
{{< tabs >}}
{{% tab "Agent v6" %}}

Run the `status` command to see the state of the Agent. The Agent logs are located in the `/var/log/datadog/` directory and are consolidated in the `agent.log` file.

If you're still having trouble, [our support team][3] is glad to provide further assistance.

[3]: /help

{{% /tab %}}
{{% tab "Agent v5" %}}

Run the `info` command to see the state of the Agent. The Agent logs are located in the `/var/log/datadog/` directory and are split into:

  * `datadog-supervisord.log`
  * `collector.log`
  * `dogstatsd.log`
  * `forwarder.log`

If you're still having trouble, [our support team][3] is glad to provide further assistance.

[3]: /help

{{% /tab %}}
{{< /tabs >}}

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][5] for more information.

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

1. Enable HTTPS support for APT:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog API repo on your system and import Datadog's APT key:
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

    Note: You might need to install `dirmngr` to import Datadog's APT key.

3. Update your local APT cache and install the Agent:
    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. Copy the example configuration into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml" 
    ```

5. Start the Agent:

    * Ubuntu 16.04 or higher:
    ```
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 or lower:
    ```
    sudo initctl start datadog-agent
    ```

### Downgrade to Agent v5

1. Enable HTTPS support for APT:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Remove the Agent v6 repository and ensure that the `stable` repository is present:
    ```shell
    sudo rm /etc/apt/sources.list.d/datadog.list [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

3. Update APT and downgrade the Agent:
    ```
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

4. Start the Agent:
    ```
    sudo service datadog-agent start
    ```

## Uninstall the Agent

To uninstall the Agent, run: 
```
$ sudo apt-get --purge remove datadog-agent -y
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/ubuntu
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
[5]: /agent/custom_python_package
