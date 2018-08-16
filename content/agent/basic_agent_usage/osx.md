---
title: Basic Agent Usage for OS X
kind: documentation
platform: OS X
os: osx
aliases:
    - /guides/basic_agent_usage/osx/
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

By default, the Agent is installed in a sandbox located at `/opt/datadog-agent`. You're free to move this folder wherever you like; however, his documentation assumes a default installation location.

## Commands

In Agent v6, the `launchctl` service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run via the Agent binary directly. Alternatively, lifecycle commands can also be managed via the systray app, and other commands can be executed via the web GUI.

In Agent v5, everything is done via the binary directly. 

| Agent v5                           | Agent v6                                             | Notes                              |
| ---------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` or systray app | Start Agent as a service           |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` or systray app  | Stop Agent running as a service    |
| `datadog-agent restart`            | _run `stop` then `start`_ or systray app             | Restart Agent running as a service |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app  | Status of Agent service            |
| `datadog-agent info`               | `datadog-agent status` or web GUI                    | Status page of running Agent       |
| `datadog-agent flare`              | `datadog-agent flare` or web GUI                     | Send flare                         |
| _not implemented_                  | `datadog-agent --help`                               | Display command usage              |
| `datadog-agent check <check_name>` | `datadog-agent check <check_name>`                   | Run a check                        |

## Configuration

The configuration files and folders for the Agent are located at:

| Agent v5                        | Agent v6                        |
| :-----                          | :----                           |
| `~/.datadog-agent/datadog.conf` | `~/.datadog-agent/datadog.yaml` |

Configuration files for [Integrations][2]:

| Agent v5                   | Agent v6                   |
| :-----                     | :----                      |
| `~/.datadog-agent/conf.d/` | `~/.datadog-agent/conf.d/` |

## Troubleshooting

Run the `status` (or `info` in v5) command to see the state of the Agent. The Agent logs are located in the `/var/log/datadog/` directory:

* For Agent v6, all logs are consolidated in `agent.log`
* For Agent v5, logs are split into:
  * `datadog-supervisord.log`
  * `collector.log`
  * `dogstatsd.log`
  * `forwarder.log`

If you're still having trouble, [our support team][3] is glad to provide further assistance.

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][5] for more information.

## Switch between Agent v5 and v6

### Upgrade to Agent 6

You can either download the DMG package and install it manually, or use the one-line install script.

### Manual installation

1. Download the DMG package of the latest Agent version, use the latest macOS release listed on the [release page][4] of the repository
2. Install the DMG package
3. Add your API key to `/opt/datadog-agent/etc/datadog.yaml`

Then start the Datadog Agent app (once started, you should see it in the system tray), and manage the Agent from there. Agent v6 includes a web-based GUI to edit the Agent configuration files and much more.

### Install script

#### To Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### To Install Fresh

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

### Downgrade to Agent v5

1. Stop the Agent with the systray app, if it's running

2. Exit the systray app

3. Uninstall the Datadog Agent application

4. [Install the Agent 5 DMG package using your preferred installation method][1]

## Uninstall the Agent

1. Stop and close the Datadog Agent via the systray.

2. Drag the Datadog Application from the application folder to the Trash Bin.

3. Remove the system elements:
    ```
    $ sudo rm -rf /opt/datadog-agent
    $ sudo rm -rf /usr/local/bin/datadog-agent
    $ sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    ```
4. If you ran the optional install commands to have the Agent run at boot time, run the following to finish uninstalling:
    ```
    sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/releases
[5]: /agent/custom_python_package
