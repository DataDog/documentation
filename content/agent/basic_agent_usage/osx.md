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

This page outlines the basic features of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[in the Datadog Agent Integration page][1].  

By default, your Agent is installed in its own sandbox located at `/opt/datadog-agent`. You're free to move this folder wherever you like.
However, we assume that the Agent is installed in its default location, so be sure to modify the instructions accordingly if you decide to move it to another location.

## Commands

_lifecycle commands_ (former `datadog-agent start`/`stop`/`restart`/`status` on the Agent 5) are replaced by `launchctl` commands on the `com.datadoghq.agent` service, and should be run under the logged-in user. For these commands, you can also use the Datadog Agent systray app, all the other commands can still be run with the `datadog-agent` command (located in the `PATH` (`/usr/local/bin/`) by default)

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

You can either download the DMG package and install it manually, or use the one-line install script.

### Manual installation

1. Download the DMG package of the latest Agent version, use the latest macOS release listed on the [release page][4] of the repository
2. Install the DMG package
3. Add your API key to `/opt/datadog-agent/etc/datadog.yaml`

Then start the Datadog Agent app (once started, you should see it in the system tray), and manage the Agent from there. The Agent6 also ships a web-based GUI to edit the Agent configuration files and much more, refer to the [changes and deprecations document][changes] document for more information.
### Install script
#### To Upgrade

The Agent 6.x installer can automatically convert your 5.x style Agent configuration at upgrade:  

```shell
  DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

#### To Install Fresh

In case you want to install on a clean box (or have an existing Agent 5 install
from which you do not wish to import the configuration) you have to provide an
api key:

```shell
 DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

### Downgrade to Agent v5

1. Stop the Agent with the systray app, if it's running
2. Exit the systray app
3. Uninstall the Datadog Agent application
4. [Install the Agent 5 DMG package using your preferred installation method][1]

## Uninstall the Agent

Stop and Close the Datadog Agent: via the bone icon in the Tray.

Drag the Datadog Application from the application folder to the Trash Bin.

```
$ sudo rm -rf /opt/datadog-agent
$ sudo rm -rf /usr/local/bin/datadog-agent
$ sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
```
If you ran the optional install commands to have the Agent run at boot time, run the following to finish uninstalling:

```
$ sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
$ sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/releases
