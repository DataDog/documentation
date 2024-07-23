---
title: Troubleshoot an Agent Check on Agent 5
disable_toc: false
---

This page covers troubleshooting an Agent Check on Agent 5. For information on the latest version of the Agent, see [Troubleshoot an Agent Check][4].

If you are experiencing issues with an Agent Check, use these commands to get more troubleshooting information.

**Notes**: 
- Replace `<CHECK_NAME>` in the examples below with any Agent check. For example: `activemq`, `ceph`, or `elastic`. Review an [integration's documentation][1] to confirm the Agent check name.
- To temporarily disable a service check while troubleshooting, rename `/conf.d/<CHECK_NAME>.d/conf.yaml` to something other than the `.yaml` or `.yml` file extension, such as `conf.yaml.disable`.

## Linux

To test an Agent check, run:

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME>
```

Replace `<CHECK_NAME>` with any Agent check. For example: `activemq`, `ceph`, or `elastic`. Review an [integration's documentation][1] to confirm the Agent check name.

If you want to include rate metrics, add `--check-rate` to your command, for instance for Agent v6.x run:

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME> --check-rate
```

If your issue continues, [reach out to the Datadog support team][2] with a [flare][3].

## Windows

{{< tabs >}}
{{% tab "Agent v<=5.11" %}}

The Agent install includes a file called `shell.exe` in your `Program Files` directory for the Datadog Agent. This file can be used to run Python within the Agent environment. After your check (called `<CHECK_NAME>`) is written and you have the `.py` and `.yaml` files in their correct places, run the following in shell.exe:

```python
from checks import run_check
run_check('<CHECK_NAME>')
```

This outputs any metrics or events that the check returns.

{{% /tab %}}
{{% tab "Agent v>=5.12" %}}

Run the following script from an **elevated** (run as admin) PowerShell command line, with the proper `<CHECK_NAME>`:

`<INSTALL_DIR>/embedded/python.exe <INSTALL_DIR>agent/agent.py check <CHECK_NAME>`

For example, to run the disk check:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" check disk
```

{{% /tab %}}
{{< /tabs >}}

## Systemd

For systems using `systemd`, use `journalctl` to assist with debugging.

The following command shows the status of the Datadog Agent.

```shell
sudo systemctl status dd-agent
```

If the Agent fails to start, and no further information is provided, use the following command to display all logs for the Datadog Agent service. If needed, use `-r` to print logs in reverse order.

```shell
sudo journalctl -u dd-agent.service
```

[1]: /integrations/
[2]: /help
[3]: /agent/guide/agent-5-flare/
[4]: /agent/troubleshooting/agent_check_status