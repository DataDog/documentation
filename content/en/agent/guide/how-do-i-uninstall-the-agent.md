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
**Agent v6 & v7**

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
--- 
**Agent v5**

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
---

## CentOS, RHEL, Fedora, and Amazon Linux
**Agent v6 & v7**

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
---


**Agent v5**

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
---

## openSUSE and SLES
**Agent v6**

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
---
**Agent v5**

```shell
sudo zypper remove datadog-agent
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
---

## macOS
**Agent v6 & v7**

1. Stop and close the Datadog Agent with the bone icon in the tray.
2. Drag the Datadog application from the application folder to the trash bin.
3. Run:

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
launchctl remove com.datadoghq.agent
sudo rm -rf /var/log/datadog
```

Then, reboot your machine for changes to take effect.

> This method removes the Agent, as well as all Agent configuration files.
---
**Agent v5**

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
---

## Windows
**Agent v6 & v7**

There are two different methods to uninstall the Agent on Windows. Both methods remove the Agent, but do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

### 1. Remove programs
  Uninstall the Agent using Add/Remove Programs.

### 2. Powershell
  Alternatively, use one of the following Powershell commands. 
  > **Note**: Some Agent versions may cause a forced reboot. To prevent this, add a no restart parameter using `REBOOT=ReallySuppress`:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber, 'REBOOT=ReallySuppress')
```

Using `/norestart`:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/norestart', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```
---
**Agent v5**

There are two different methods to uninstall the Agent on Windows. Both methods remove the Agent, but do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

> **Note**: For Agent < v5.12.0, it's important to uninstall the Agent with the **original account** used to install the Agent, otherwise it may not be cleanly removed.

### 1. Remove programs
  Uninstall the Agent using Add/Remove Programs.

### 2. Powershell
  Alternatively, use the Powershell command below.

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/norestart', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

---
