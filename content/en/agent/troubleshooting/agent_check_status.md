---
title: Agent Check Status
kind: documentation
further_reading:
- link: "/agent/troubleshooting/debug_mode/"
  tag: "Agent Troubleshooting"
  text: "Agent Debug Mode"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Agent Troubleshooting"
  text: "Send an Agent Flare"
---

If you are experiencing issues with a given Agent Check, use these commands for your OS to get more troubleshooting information:

- [Linux](#linux)
- [Windows](#windows)
- [Systemd](#systemd)
- [Further Reading](#further-reading)

## Linux

To test an Agent check, run:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME>
```

If you want to include rate metrics, add `--check-rate` to your command, for instance for Agent v6.x run:

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME> --check-rate
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME>
```

If you want to include rate metrics, add `--check-rate` to your command, for instance for Agent v6.x run:

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME> --check-rate
```

{{% /tab %}}
{{< /tabs >}}

If your issue continues, [reach out to the Datadog support team][1] with a [flare][2].

## Windows

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Run the following script, with the proper `<CHECK_NAME>`:

For Agent versions >= 6.12:

```powershell
%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe check <CHECK_NAME>
```

For Agent versions <= 6.11:

```powershell
%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "Agent v<=5.11" %}}

The Agent install includes a file called `shell.exe` in your `Program Files` directory for the Datadog Agent. This file can be used to run Python within the Agent environment. Once your check (called `<CHECK_NAME>`) is written and you have the `.py` and `.yaml` files in their correct places, run the following in shell.exe:

```python
from checks import run_check
run_check('<CHECK_NAME>')
```

This outputs any metrics or events that the check returns.

{{% /tab %}}
{{% tab "Agent v>=5.12" %}}

Run the following script, with the proper `<CHECK_NAME>`:

`<INSTALL_DIR>/embedded/python.exe <INSTALL_DIR>agent/agent.py check <CHECK_NAME>`

For example, to run the disk check:

```powershell
C:\Program' 'Files\Datadog\Datadog' 'Agent\embedded\python.exe C:\Program' 'Files\Datadog\Datadog' 'Agent\agent\agent.py check disk
```

{{% /tab %}}
{{< /tabs >}}

## Systemd

For [systems using systemd][3], use `journalctl` to assist with debugging.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
The following command shows the status of the Datadog Agent.

```shell
sudo systemctl status datadog-agent
```

If the Agent failed to start, and no further information is provided, use the following command to display all logs for the Datadog Agent service. If needed, use `-r` to print logs in reverse order.

```shell
sudo journalctl -u datadog-agent.service
```

{{% /tab %}}
{{% tab "Agent v5" %}}
The following command shows the status of the Datadog Agent.

```shell
sudo systemctl status dd-agent
```

If the Agent failed to start, and no further information is provided, use the following command to display all logs for the Datadog Agent service. If needed, use `-r` to print logs in reverse order.

```shell
sudo journalctl -u dd-agent.service
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /agent/troubleshooting/send_a_flare/
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
