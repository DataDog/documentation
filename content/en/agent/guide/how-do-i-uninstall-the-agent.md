---
title: Uninstalling the Agent
kind: guide
aliases:
  - /agent/faq/how-do-i-uninstall-the-agent/
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

Choose your platform to see dedicated instructions to uninstall the Agent:

## Debian and Ubuntu

{{< tabs >}}
{{% tab "Agent v6 and v7" %}}
```shell
sudo apt-get remove datadog-agent -y
```

> This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/datadog-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

> If you also want to remove these elements, use this command instead:

```shell
sudo apt-get remove --purge datadog-agent -y
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo apt-get remove datadog-agent -y
```

> This command removes the Agent, but does not remove:
* the `datadog.yaml` configuration file,
* user-created files in the `/etc/dd-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.
> If you also want to remove these elements, use this command instead:

```shell
sudo apt-get --purge remove datadog-agent -y
```
{{% /tab %}}
{{< /tabs >}}

## CentOS, RHEL, Fedora, and Amazon Linux
{{< tabs >}}
{{% tab "Agent v6 and v7" %}}


```shell
sudo yum remove datadog-agent
```

> This command removes the Agent, but does not remove:
* the `datadog.yaml` configuration file,
* user-created files in the `/etc/datadog-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

> If you also want to remove these elements and your Datadog log files, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo yum remove datadog-agent
```

> This command removes the Agent, but does not remove:

* the `datadog.yaml` configuration file,
* user-created files in the `/etc/dd-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

> If you also want to remove these elements and your Datadog log files, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}

## openSUSE and SLES
{{< tabs >}}
{{% tab "Agent v6 and v7" %}}
```shell
sudo zypper remove datadog-agent
```

> This command removes the Agent, but does not remove:
* the `datadog.yaml` configuration file,
* user-created files in the `/etc/datadog-agent` configuration folder,
* user-created files in the `/opt/datadog-agent` folder,
* the `dd-agent` user.

> If you also want to remove these elements and your Datadog log files, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
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

If you also want to remove these elements and your Datadog log files, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}
## macOS
{{< tabs >}}
{{% tab "Agent v6 and v7" %}}
**Single user installation**

To remove the Agent and all Agent configuration files:
1. Stop and close the Datadog Agent with the bone icon in the tray.
2. Drag the Datadog application from the application folder to the trash bin.
3. Run the following commands:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. Reboot your machine for the changes to take effect.

**System-wide LaunchDaemon installation**

To remove the Agent and all Agent configuration files:
1. Drag the Datadog application from the application folder to the trash bin.
2. To remove remaining files, run the following:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. Reboot your machine for the changes to take effect.
{{% /tab %}}

{{% tab "Agent v5" %}}
1. Stop and close the Datadog Agent with the bone icon in the tray.
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

> This method removes the Agent, as well as all Agent configuration files.
{{% /tab %}}
{{< /tabs >}}

## Windows

{{< tabs >}}
{{% tab "Agent v6 and v7" %}}

There are two different methods to uninstall the Agent on Windows. Both methods remove the Agent, but do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

### Add or remove programs

1. Press **CTRL** and **Esc** or use the Windows key to run Windows Search.
1. Search for `add` and click **Add or remove programs**.
1. Search for `Datadog Agent` and click **Uninstall**.

### PowerShell

**Note:** Enable WinRM to use the commands below.

Use one of the following PowerShell commands to uninstall the Agent without rebooting:
```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber, 'REBOOT=ReallySuppress')
```

Using `/norestart`:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}

{{% tab "Agent v5" %}}

There are two different methods to uninstall the Agent on Windows. Both methods remove the Agent, but do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

> **Note**: For Agent < v5.12.0, it's important to uninstall the Agent with the **original account** used to install the Agent, otherwise it may not be cleanly removed.

### Add or remove programs

1. Press **CTRL** and **Esc** or use the Windows key to run Windows Search.
1. Search for `add` and click **Add or remove programs**.
1. Search for `Datadog Agent` and click **Uninstall**.

### PowerShell

**Note:** Enable WinRM to use the commands below.

Use the following PowerShell command to uninstall the Agent without rebooting:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}
{{< /tabs >}}
