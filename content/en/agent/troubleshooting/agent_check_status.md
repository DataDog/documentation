---
title: Troubleshoot an Agent Check
description: "Learn how to test and troubleshoot Datadog Agent checks using commands and systemd tools to diagnose integration issues."
further_reading:
- link: "/agent/troubleshooting/debug_mode/"
  tag: "Documentation"
  text: "Agent Debug Mode"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent Flare"
---

If you are experiencing issues with an Agent Check, use these commands to get more troubleshooting information.

**Note**: Replace `<CHECK_NAME>` in the examples below with any Agent check. For example: `activemq`, `ceph`, or `elastic`. Review an [integration's documentation][1] to confirm the Agent check name.

**Note**: To temporarily disable a service check while troubleshooting, rename `/conf.d/<CHECK_NAME>.d/conf.yaml` to something other than the `.yaml` or `.yml` file extension, such as `conf.yaml.disable`.

## Linux

To test an Agent check, run:

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME>
```

If you want to include rate metrics, add `--check-rate` to your command, for instance for Agent v6.x run:

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME> --check-rate
```

If your issue continues, [reach out to the Datadog support team][3] with a [flare][2].

## Windows

Run the following script from an **elevated** (run as admin) PowerShell command line, with the proper `<CHECK_NAME>`:

For Agent versions >= 6.12:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <CHECK_NAME>
```

For Agent versions <= 6.11:
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <CHECK_NAME>
```

## Systemd

For systems using `systemd`, use `journalctl` to assist with debugging.

The following command shows the status of the Datadog Agent.

```shell
sudo systemctl status datadog-agent
```

If the Agent failed to start, and no further information is provided, use the following command to display all logs for the Datadog Agent service. If needed, use `-r` to print logs in reverse order.

```shell
sudo journalctl -u datadog-agent.service
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /agent/troubleshooting/send_a_flare/
[3]: /help
