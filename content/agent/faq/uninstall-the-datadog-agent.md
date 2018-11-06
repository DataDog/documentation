---
title: Uninstall to Datadog Agent
kind: faq
---

## Linux 

To uninstall the Datadog Agent on Linux platforms, run:

| Platform     | Command                                        |
| ---          | ---                                            |
| Amazon Linux | `sudo yum remove datadog-agent`                |
| CentOS 5     | `sudo yum remove datadog-agent-base`           |
| CentOS 6     | `sudo yum remove datadog-agent`                |
| Debian       | `sudo apt-get --purge remove datadog-agent -y` |
| Fedora       | `sudo yum remove datadog-agent`                |
| Red Hat 5    | `sudo yum remove datadog-agent-base`           |
| Red Hat 6    | `sudo yum remove datadog-agent`                |
| Ubuntu       | `sudo apt-get --purge remove datadog-agent -y` |

## MacOSx

To Uninstall the Datadog Agent on MacOSx platform, follow those steps:

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

## Windows

**It's important that the original account used to install the Agent is also used to remove it, otherwise it's possible remnants are left behind and it won't be cleanly removed.**

Uninstall the Agent on Windows using Add/Remove Programs, alternatively, it's possible to to use Powershell as well. Here is a one liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```