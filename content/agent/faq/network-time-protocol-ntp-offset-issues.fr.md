---
title: Problèmes de décalage du protocole NTP (Network Time Protocol)
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: En savoir plus sur l'Agent Datadog
- link: "integrations/ntp/"
  tag: "Integration"
  text: En savoir plus sur l'intégration Datadog-NTP
---

If you have noticed any of the following issues, they may be related to the NTP offset on the hosts that are reporting metrics through the Agent:

* Incorrect alert triggers
* Retards de métriques
* Gaps in graphs of metrics

To check the NTP offset for a host, you can run the Agent [info command][1], using the instructions appropriate for your OS, and look for the Clocks section:

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```

Any significant offset can have undesired effects, and we recommend keeping hosts in sync with NTP to ensure this does not cause issues, to help we also offer an [NTP Integration][2].

## Syncing a System Clock with NTP

Instructions for syncing the system clock with NTP vary based on the operating system being used. Here are some helpful links for different operating systems.

* **Windows**: [How To Synchronize Microsoft Windows with a NTP Server][3]
* **Linux**: [How to force a clock update using NTP?][4]
* **FreeBSD**: [Clock Synchronization with NTP][5]

## Prevent and check NTP issues

Pour éviter les problèmes de NTP, vous pouvez utiliser notre monitor pour l'offset NTP afin de vous alerter en cas de dérive sur un hôte.
{{< img src="agent/faq/monitor_ntp.png" alt="monitor ntp" responsive="true" popup="true">}}

Also, you can check over all the reporting hosts, the one that have offset issues.

To do so, use our [Check Summary page][6]. Inspect the check `ntp.in_sync` and see the list of the hosts that have NTP issues.

Also note that outgoing UDP traffic over the port 123 should be allowed so the Agent can confirm that the local server time is reasonably accurate according the Datadog NTP servers.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/agent-commands/#agent-status-and-information
[2]: /integrations/ntp
[3]: https://support.microsoft.com/en-us/help/816042/how-to-configure-an-authoritative-time-server-in-windows-server
[4]: http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp
[5]: http://www.freebsd.org/doc/en/books/handbook/network-ntp.html
[6]: https://app.datadoghq.com/check/summary
