---
title: How do I uninstall the agent?
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: Agent
  text: Learn more about the Datadog Agent
---

## Mac OS:

Stop and Close the Datadog Agent: via the bone icon in the Tray.

Drag the Datadog Application from the application folder to the Trash Bin.

* $ sudo rm -rf /opt/datadog-agent
* $ sudo rm -rf /usr/local/bin/datadog-agent
* $ sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks


If you ran the optional install commands to have the Agent run at boot time, you will also need to run the following to finish uninstalling:

* $ sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
* $ sudo  rm /Library/LaunchDaemons/com.datadoghq.agent.plist

## Debian/Ubuntu

```
$ sudo apt-get --purge remove datadog-agent -y
CentOS/RHEL/Amazon Linux
```

## CentOS 5:

```
$ sudo yum remove datadog-agent-base
```

## CentOS 6:

```
$ sudo yum remove datadog-agent
```

## Windows

**It's important that the original account used to install the agent is also used to remove it, otherwise it’s possible remnants will be left behind and it will not be cleanly removed.**

You can uninstall the agent using Add/Remove Programs, alternatively, it's possible to to use Powershell as well. Here is a one liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

## What's next?

{{< partial name="whats-next/whats-next.html" >}}