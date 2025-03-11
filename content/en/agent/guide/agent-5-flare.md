---
title: Send an Agent 5 flare
disable_toc: false
aliases:
- agent/guide/windows-flare-agent-5
private: true
---

This page covers the ports used by Agent 5. For information on the latest version of the Agent, see [Send a Flare][1].

| Platform   | Command                                                                 |
|------------|-------------------------------------------------------------------------|
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    |
| macOS      | `datadog-agent flare <CASE_ID>`                                         |
| CentOS     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Debian     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Kubernetes | `kubectl exec <POD_NAME> -it /etc/init.d/datadog-agent flare <CASE_ID>` |
| Fedora     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Redhat     | `sudo service datadog-agent flare <CASE_ID>`                            |
| SUSE       | `sudo service datadog-agent flare <CASE_ID>`                            |
| Source     | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       |
| Windows    | See the [Windows section](#windows)                                             |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][3].

## Windows

To send Datadog support a copy of your Windows logs and configurations, do the following:

* Open the Datadog Agent Manager.

* Select Actions.

* Select Flare.

* Enter your ticket number (if you don't have one, leave the value as zero).

* Enter the email address you use to log in to Datadog.

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" style="width:70%;">}}

The flare command is available for PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

or cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### Flare fails to upload

The output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email. Common locations flare files are stored:
- Linux: `\tmp\`
- MacOS: `$TMPDIR`
- Windows: `C:\Users\<DDAGENTUSER>\AppData\Local\Temp\`

For older Agent versions on Windows, you can find the location of this file by running the following from the Agent's Python command prompt:

**Step 1**:

* Agent v5.12+:
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* Older Agent versions:
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**Step 2**:

```python
import tempfile
print tempfile.gettempdir()
```

Example:

{{< img src="agent/faq/flare_fail.png" alt="Flare Fail" style="width:70%;">}}

For information on the latest version of the Agent, consult the [Windows documentation][2].

[1]: /agent/troubleshooting/send_a_flare
[2]: /agent/basic_agent_usage/windows/#agent-v5
[3]: /agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands