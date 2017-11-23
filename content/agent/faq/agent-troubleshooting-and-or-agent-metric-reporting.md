---
title: Agent Troubleshooting and/or Agent Metric Reporting
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
- link: "/developers/metrics"
  tag: "Documentation"
  text: Learn more about Metrics
---

## Agent Troubleshooting

If you ended up at this page and have not yet installed the Datadog Agent, please go [here](/agent/) for installation instructions. If you just installed the Agent, it might take a few moments before you start seeing metrics appear. The first place you can check for metrics is the Metrics Explorer.

If you think you might be experiencing issues, the first thing to do is run the [info command](/agent/faq/agent-status-and-information) and check the [Agent logs](/agent/faq/log-locations).

## Issues getting the Agent installed

If you encountered an issue during the Agent installation that prevented any installation whatsoever from occurring, please reach out to [us](/help). Please send us:

* OS and version
* Method of installation
* Agent version
* Errors messages, logs or screenshots
* Output of [info command](/agent/faq/agent-status-and-information)

## Issues getting the Agent reporting

If you get the Agent installed but are not seeing any data in Datadog, you can troubleshoot in the following manner. First, run [the info command](/agent/faq/agent-status-and-information) - does running the info command show any errors?

If not, you should also [check the logs](/agent/faq/log-locations). Errors in the logs may also reveal the cause of any issues.

If not, please send both the full output of [the info command and the logs as attachments](/agent/faq/send-logs-and-configs-to-datadog-via-flare-command) to [us](/help)

## Check your machine's time

We have also seen a few cases where machines have their clock set further in the future or the past, which can sometimes cause problems with metric submission. To check for this, run:
```
date -u && curl -s -v https://app.datadoghq.com/intake 2>&1 | grep Date
```

This will output the current system’s date, and then make a request to our endpoint and grab the date on our end. If these are more than a few minutes apart, you may want to look at the time settings on your server.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}