---
title: Agent Troubleshooting
kind: documentation
aliases:
    - /agent/faq/agent-s-are-no-longer-reporting-data
    - /agent/faq/common-windows-agent-installation-error-1721
further_reading:
- link: "/agent/troubleshooting/debug_mode"
  tag: "Agent Troubleshooting"
  text: "Agent Debug Mode"
- link: "/agent/troubleshooting/send_a_flare"
  tag: "Agent Troubleshooting"
  text: "Send an Agent Flare"
- link: "/agent/troubleshooting/permissions"
  tag: "Agent Troubleshooting"
  text: "Agent Permission Issues"
- link: "/agent/troubleshooting/ntp"
  tag: "Agent Troubleshooting"
  text: "Agent NTP issues"
- link: "/agent/troubleshooting/agent_check_status"
  tag: "Agent Troubleshooting"
  text: "Get the Status of an Agent Check"
---

If you have not yet installed the Datadog Agent, go [to the dedicated Agent integration page][1] for installation instructions. If you just installed the Agent, it may take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer][2].

If you think you might be experiencing issues, follow this checklist first:

* Is your host connected to the internet or able to access it through a proxy?
* If using a proxy: is your [Agent configured for this proxy][3]?
* Is the Datadog API key set up in your `datadog.yaml` configuration file [the API key corresponding to your Datadog platform][4]?
* Is there only one Datadog Agent running on your host?
* Did you restart the Datadog Agent after editing a yaml configuration file?

If the answer to all questions above is `yes`, then [run the status command][5] for more details about your Agent and its integrations status. You can also check the [Agent logs][6] directly and enable debug mode to [get more logging from the Agent][7].

If you're still unsure about the issue, you may reach out to the [Datadog support team][8] with [a flare][9] from your Agent.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /agent/proxy
[4]: https://app.datadoghq.com/account/settings#api
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: /agent/guide/agent-log-files
[7]: /agent/troubleshooting/debug_mode
[8]: /help
[9]: /agent/troubleshooting/send_a_flare
