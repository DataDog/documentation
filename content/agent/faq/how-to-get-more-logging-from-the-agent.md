---
title: How to get more logging from the agent?
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
---

When hitting an issue you / Datadog support might need more logging from the Datadog agent to investigate on the possible causes.

To enable the full debug mode:

- modify your local datadog.conf (see [this page](/agent/faq/where-is-the-configuration-file-for-the-agent) to locate this configuration file on your instance)

- replace `# log_level: INFO` with `log_level: DEBUG` (make sure to get rid of # to uncomment the line)

- restart your Datadog Agent (see [that page](/agent/faq/start-stop-restart-the-datadog-agent) to find the restart command depending on your OS)

- wait a few minutes to generate some logs

[Look here](/agent/faq/log-locations) to find the location of the logs.

{{< partial name="whats-next/whats-next.html" >}}