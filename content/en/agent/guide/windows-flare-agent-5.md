---
title: Send an Agent 5 flare on Windows
kind: Guide
disable_toc: false
---

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