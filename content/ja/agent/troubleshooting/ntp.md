---
title: Network Time Protocol (NTP) issues
aliases:
    - /agent/faq/network-time-protocol-ntp-offset-issues
---

If you have noticed any of the following issues, they may be related to the NTP offset on the hosts that are reporting metrics through the Agent:

* Incorrect alert triggers
* Metric delays
* Gaps in graphs of metrics

To check the NTP offset for a host, run the Agent [status command][1], using the instructions appropriate for your OS, and look for the Clocks section:

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```

Any significant offset can have undesired effects. To prevent NTP issues, leverage Datadog's monitor for NTP offset to alert you when there is drift on a host thanks to the [NTP Integration][2].
Alternatively, use Datadog's [Check Summary page][3] and inspect the check `ntp.in_sync` to see the list of hosts that have NTP issues.

**Note**: Outgoing UDP traffic over the port `123` should be allowed so the Agent can confirm that the local server time is reasonably accurate according to the Datadog NTP servers.

## Further Reading

{{< whatsnext desc="Instructions for syncing the system clock with NTP vary based on the operating system being used:">}}
    {{< nextlink href="https://support.microsoft.com/en-us/help/816042/how-to-configure-an-authoritative-time-server-in-windows-server" tag="Windows" >}}How To Synchronize Microsoft Windows with a NTP Server{{< /nextlink >}}
    {{< nextlink href="http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp" tag="Linux" >}}How to force a clock update using NTP?{{< /nextlink >}}
    {{< nextlink href="http://www.freebsd.org/doc/en/books/handbook/network-ntp.html" tag="FreeBSD">}}Clock Synchronization with NTP{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /agent/configuration/agent-commands/#agent-status-and-information
[2]: /integrations/ntp/
[3]: https://app.datadoghq.com/check/summary
