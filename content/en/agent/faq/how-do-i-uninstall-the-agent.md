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

It's important to uninstall the Agent with the **original account** used to install the Agent, otherwise it may not be cleanly removed.

{{< tabs >}}
{{% tab "Agent v6" %}}

Uninstall the Agent using Add/Remove Programs.

Alternatively, use the Powershell command below. **Note**: Some Agent versions may cause a forced reboot. To prevent this, add a no restart parameter like `REBOOT=ReallySuppress`.

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

{{% /tab %}}
{{% tab "Agent v5" %}}

Uninstall the Agent using Add/Remove Programs.

Alternatively, use the Powershell command below. **Note**: Some Agent versions may cause a forced reboot. To prevent this, add a no restart parameter like `REBOOT=ReallySuppress`.

```
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

{{% /tab %}}
{{< /tabs >}}
