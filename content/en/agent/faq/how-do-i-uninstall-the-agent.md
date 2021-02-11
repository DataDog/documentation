---
title: How do I uninstall the Agent?
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

Choose your platform to see dedicated instructions to uninstall the Agent:

## Debian and Ubuntu

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

```shell
sudo apt-get remove datadog-agent -y
```

This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/datadog-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

If you also want to remove these elements, use this command instead:

```shell
sudo apt-get remove --purge datadog-agent -y
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo apt-get remove datadog-agent -y
```

This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/dd-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

If you also want to remove these elements, use this command instead:

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}
{{< /tabs >}}

## CentOS, RHEL, Fedora, and Amazon Linux

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

```shell
sudo yum remove datadog-agent
```

This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/datadog-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo yum remove datadog-agent
```

This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/dd-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

{{% /tab %}}
{{< /tabs >}}

## openSUSE and SLES

{{< tabs >}}
{{% tab "Agent v6" %}}

```shell
sudo zypper remove datadog-agent
```

This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/datadog-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo zypper remove datadog-agent
```

This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/dd-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

{{% /tab %}}
{{< /tabs >}}

## macOS

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

1. Stop and close the Datadog Agent via the bone icon in the tray.
2. Drag the Datadog application from the application folder to the trash bin.
3. Run:

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
launchctl remove com.datadoghq.agent
```

Then, reboot your machine for changes to take effect.

This method removes the Agent, as well as all Agent configuration files.

{{% /tab %}}
{{% tab "Agent v5" %}}

1. Stop and close the Datadog Agent via the bone icon in the tray.
2. Drag the Datadog application from the application folder to the trash bin.
3. Run:

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** #to remove broken symlinks
```

If you ran the optional install commands to have the Agent run at boot time, run the following to finish uninstalling:

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

This method removes the Agent, as well as all Agent configuration files.

{{% /tab %}}
{{< /tabs >}}

## Windows

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Uninstall the Agent using Add/Remove Programs.

Alternatively, use the Powershell command below. **Note**: Some Agent versions may cause a forced reboot. To prevent this, add a no restart parameter like `REBOOT=ReallySuppress`.

```powershell
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

Both methods remove the Agent, but they do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

{{% /tab %}}
{{% tab "Agent v5" %}}

**Note**: For versions of the agent less than 5.12.0 on Windows, It's important to uninstall the Agent with the **original account** used to install the Agent, otherwise it may not be cleanly removed.

Uninstall the Agent using Add/Remove Programs.

Alternatively, use the Powershell command below. **Note**: Some Agent versions may cause a forced reboot. To prevent this, add a no restart parameter like `REBOOT=ReallySuppress`.

```powershell
(Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName . ).Uninstall()
```

Both methods remove the Agent, but they do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

{{% /tab %}}
{{< /tabs >}}
