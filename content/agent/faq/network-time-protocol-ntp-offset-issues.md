---
title: Network Time Protocol (NTP) Offset Issues
kind: faq
customnav: main_references
further_reading:
- link: "/agent/"
  tag: Logs
  text: Learn more about the Datadog Agent
- link: "/integrations/ntp/"
  tag: Integration
  text: Learn more about the Datadog-NTP integration
---

If you have noticed any of the following issues, they may be related to the NTP offset on the hosts that are reporting metrics through the Agent:

* Incorrect alert triggers
* Metric delays
* Gaps in graphs of metrics

To check the NTP offset for a host, you can run the Agent [info command](/agent/faq/agent-status-and-information), using the instructions appropriate for your OS, and look for the Clocks section:

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```


Any significant offset can have undesired effects, and we recommend keeping hosts in sync with NTP to ensure this does not cause issues, to help we also offer an [NTP Integration](/integrations/ntp).

## Syncing a System Clock with NTP

Instructions for syncing the system clock with NTP vary based on the operating system being used. Here are some helpful links for different operating systems.

* **Windows**: [How To Synchronize Microsoft Windows to a NTP Server](http://www.timetoolsglobal.com/2013/06/21/how-to-synchronize-microsoft-windows-to-a-ntp-server-1/)
* **Linux**: [How to force a clock update using NTP?](http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp)
* **FreeBSD**: [Clock Synchronization with NTP](http://www.freebsd.org/doc/en/books/handbook/network-ntp.html)

## Prevent and check NTP issues 

To prevent NTP issues, you can leverage our monitor for NTP offset to alert you when there is drift on a host.
{{< img src="agent/faq/monitor_ntp.png" alt="monitor ntp" responsive="true" popup="true">}}

Also, you can check over all the reporting hosts, the one that have offset issues.

To do so, use our [Check Summary page](https://app.datadoghq.com/check/summary), Inspect the check ntp.in_sync and you'll see a list of the hosts that have NTP issues.

Also note that outgoing UDP traffic over the port 123 should be allowed so the agent can confirm that the local server time is reasonably accurate according the datadog NTP servers.

## What's next?

{{< partial name="whats-next/whats-next.html" >}}