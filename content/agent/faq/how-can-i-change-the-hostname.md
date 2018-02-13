---
title: How can I change the hostname?
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
---

Change the hostname by updating your [agent’s configuration file](/agent/#configuration-file) called `datadog.conf`and replacing the value for the “hostname” key, then [restart the agent](/agent/faq/start-stop-restart-the-datadog-agent).

After renaming your host you'll continue to see the original hostname in the UI for the next 24 hours, however, this is removed once the data ages out. Don't worry, we're not billing you for two instances, only for the connected one!

To learn how hostnames are determined, [reference this article](/agent/faq/how-does-datadog-determine-the-agent-hostname).

{{< partial name="whats-next/whats-next.html" >}}