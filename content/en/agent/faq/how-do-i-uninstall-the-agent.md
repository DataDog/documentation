---
title: How do I uninstall the Agent?
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

Choose your platform to see dedicated instructions to uninstall the Agent:

### Debian/Ubuntu

{{< tabs >}}
{{% tab "Agent v6" %}}

```
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}
{{< /tabs >}}

### CentOS/RHEL/Fedora/Amazon Linux

{{< tabs >}}
{{% tab "Agent v6" %}}

```
sudo yum remove datadog-agent
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```
sudo yum remove datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

### Mac OS

{{< tabs >}}
{{% tab "Agent v6" %}}

1. Stop and close the Datadog Agent via the bone icon in the tray.
2. Drag the Datadog application from the application folder to the trash bin.
3. Run:

```
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
```
Then, reboot your machine for changes to take effect.

{{% /tab %}}
{{% tab "Agent v5" %}}


1. Stop and close the Datadog Agent via the bone icon in the tray.
2. Drag the Datadog application from the application folder to the trash bin.
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

{{% /tab %}}
{{< /tabs >}}

### Windows

**It's important that the original account used to install the Agent is also used to remove it, otherwise it's possible remnants are left behind and it won't be cleanly removed.**

{{< tabs >}}
{{% tab "Agent v6" %}}

Uninstall the Agent using Add/Remove Programs; alternatively, it's possible to to use Powershell as well. Here is a one-liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

{{% /tab %}}
{{% tab "Agent v5" %}}

Uninstall the Agent using Add/Remove Programs, alternatively, it's possible to to use Powershell as well. Here is a one-liner:

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

{{% /tab %}}
{{< /tabs >}}
