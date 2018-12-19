---
title: How do I uninstall the Agent?
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

To uninstall the Datadog Agent run:

{{< tabs >}}
{{% tab "Agent v6" %}}

### Debian/Ubuntu
```
sudo apt-get --purge remove datadog-agent -y
```

### CentOS/RHEL/Fedora/Amazon Linux

```
sudo yum remove datadog-agent
```

### Mac OS

1. Stop and close the Datadog Agent: via the bone icon in the Tray.
2. Drag the Datadog Application from the application folder to the Trash Bin.
3. Run:

```
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
```

### Windows

**It's important that the original account used to install the Agent is also used to remove it, otherwise it's possible remnants are left behind and it won't be cleanly removed.**

Uninstall the Agent using Add/Remove Programs, alternatively, it's possible to to use Powershell as well. Here is a one liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

{{% /tab %}}
{{% tab "Agent v5" %}}

### Debian/Ubuntu

```
sudo apt-get --purge remove datadog-agent -y
```

### CentOS/RHEL/Fedora/Amazon Linux

```
sudo yum remove datadog-agent
```

### Mac OS

1. Stop and Close the Datadog Agent: via the bone icon in the Tray.
2. Drag the Datadog Application from the application folder to the Trash Bin.
3. Run:

```
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** #to remove broken symlinks
```

If you ran the optional install commands to have the Agent run at boot time, run the following to finish uninstalling:

```
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

### Windows

**It's important that the original account used to install the Agent is also used to remove it, otherwise it's possible remnants are left behind and it won't be cleanly removed.**

Uninstall the Agent using Add/Remove Programs, alternatively, it's possible to to use Powershell as well. Here is a one liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

{{% /tab %}}
{{< /tabs >}}

