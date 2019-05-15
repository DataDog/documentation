---
title: Agent Troubleshooting
kind: documentation
aliases:
    - /agent/faq/agent-s-are-no-longer-reporting-data
further_reading:
- link: "/agent/guide/agent-commands/?tab=agentv6"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "/agent/guide/agent-configuration-files/?tab=agentv6"
  tag: "FAQ"
  text: "Agent configuration files"
- link: "/agent/faq/common-windows-agent-installation-error-1721"
  tag: "FAQ"
  text: "Common Windows Agent Installation Error 1721"
- link: "/agent/faq/how-to-monitor-snmp-devices"
  tag: "FAQ"
  text: "How to monitor SNMP devices?"
- link: "/agent/faq/i-stoped-my-agent-but-i-m-still-seeing-the-host"
  tag: "FAQ"
  text: "I stopped my Agent but I'm still seeing the host in my Datadog account."
- link: "/agent/faq/network-time-protocol-ntp-offset-issues"
  tag: "FAQ"
  text: "Network Time Protocol (NTP) Offset Issues"
- link: "/agent/faq/how-to-solve-permission-denied-errors"
  tag: "FAQ"
  text: "How to solve Permission denied errors?"
- link: "/agent/faq/error-restarting-agent-already-listening-on-a-configured-port"
  tag: "FAQ"
  text: "Error Restarting Agent: Already Listening on a Configured Port"
- link: "/agent/faq/forwarder-logs-contain-599-response-code"
  tag: "FAQ"
  text: "Forwarder logs contain 599 response code"
- link: "/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13"
  tag: "FAQ"
  text: "Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)"
- link: "/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric"
  tag: "FAQ"
  text: "Why don't I see the 'system.processes.open_file_descriptors' metric?"
- link: "/agent/faq/how-is-the-system-mem-used-metric-calculated"
  tag: "FAQ"
  text: "How is the 'system.mem.used' metric calculated?"
- link: "/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity"
  tag: "FAQ"
  text: "How do I install the Agent on a server with limited internet connectivity?"
---

If you have not yet installed the Datadog Agent, go [to the dedicated Agent integration page][1] for installation instructions. If you just installed the Agent, it may take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer][2].

If you think you might be experiencing issues, follow this checklist first:

* Is your host connected to the internet or able to access it through a proxy?
* If using a proxy: is your [Agent configured for this proxy][3]?
* Is the Datadog API key set up in your `datadog.yaml` configuration file [the API key corresponding to your Datadog platform][4]?
* Is there only one Datadog Agent running on your host?
* Did you restart the Datadog Agent after editing a yaml configuration file?

If the answer to all questions above is `yes`, then [run the status command][5] for more details about your Agent and its integrations status. You can also check the [Agent logs][6] directly and enable debug mode to [get more logging from the Agent](#get-more-logging-from-the-agent).

If you're still unsure about the issue, you may reach out to the [Datadog support team][7] with [a flare](#send-a-flare) from your Agent.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /agent/proxy
[4]: https://app.datadoghq.com/account/settings#api
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: /agent/guide/agent-log-files
[7]: /help
